import { createClient } from '@supabase/supabase-js';
import type { 
  GymProfile, 
  Tenant, 
  MetaGym, 
  MetaGymPlan, 
  RegistroCompleto,
  RegistroResponse 
} from '../types/database';
import { sendRegistroConfirmacion } from './email';

// Configuración del cliente Supabase
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Función para obtener todos los planes disponibles
export async function getPlanes(): Promise<MetaGymPlan[]> {
  try {
    const { data, error } = await supabase
      .from('meta_gym_plans')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPlanes:', error);
    return [];
  }
}

// Función principal para crear el registro completo
export async function crearRegistroCompleto(registro: RegistroCompleto): Promise<RegistroResponse> {
  try {
    console.log('Iniciando registro completo...', registro);

    // 1. Crear el MetaGym (usuario administrador)
    // auth_user_id será null hasta que implementemos autenticación completa
    const { data: metaGymData, error: metaGymError } = await supabase
      .from('meta_gym')
      .insert([
        {
          auth_user_id: null, // NULL hasta implementar autenticación completa
          name: `${registro.administrador.nombre} ${registro.administrador.apellido1}`,
          email: registro.administrador.correo,
          phone: registro.administrador.telefono,
        }
      ])
      .select()
      .single();

    if (metaGymError) {
      console.error('Error creating MetaGym:', metaGymError);
      throw metaGymError;
    }

    console.log('MetaGym creado:', metaGymData);

    // 2. Crear el Tenant
    const { data: tenantData, error: tenantError } = await supabase
      .from('tenant')
      .insert([
        {
          meta_gym_id: metaGymData.id,
          plan_id: registro.membresia.plan_id,
          status: 'pending', // Pending hasta que se confirme el pago
          start_date: new Date().toISOString(),
          // end_date se calculará después del pago
        }
      ])
      .select()
      .single();

    if (tenantError) {
      console.error('Error creating Tenant:', tenantError);
      throw tenantError;
    }

    console.log('Tenant creado:', tenantData);

    // 3. Crear el GymProfile
    const { data: gymProfileData, error: gymProfileError } = await supabase
      .from('gym_profiles')
      .insert([
        {
          tenant_id: tenantData.id,
          nombre: registro.gimnasio.nombre,
          direccion: registro.gimnasio.direccion,
          telefono: registro.gimnasio.telefono,
          email: registro.gimnasio.correo,
          slug: registro.gimnasio.nombre.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, ''),
          timezone: 'America/Costa_Rica',
          currency: 'USD',
        }
      ])
      .select()
      .single();

    if (gymProfileError) {
      console.error('Error creating GymProfile:', gymProfileError);
      throw gymProfileError;
    }

    console.log('GymProfile creado:', gymProfileData);

    // 4. Obtener información del plan seleccionado para el email
    const { data: planData, error: planError } = await supabase
      .from('meta_gym_plans')
      .select('*')
      .eq('id', registro.membresia.plan_id)
      .single();

    if (planError) {
      console.error('Error fetching plan data:', planError);
      throw planError;
    }

    // 5. Enviar email de confirmación
    try {
      const emailResult = await sendRegistroConfirmacion(
        registro.administrador.correo,
        `${registro.administrador.nombre} ${registro.administrador.apellido1}`,
        registro.gimnasio.nombre,
        planData.name,
        planData.price,
        tenantData.id
      );

      if (!emailResult.success) {
        console.error('Error enviando email de confirmación:', emailResult.error);
        // No fallar el registro por el email, solo logear el error
      } else {
        console.log('Email de confirmación enviado exitosamente');
      }
    } catch (emailError) {
      console.error('Error en envío de email:', emailError);
      // No fallar el registro por el email
    }

    return {
      success: true,
      data: {
        gym_profile_id: gymProfileData.id,
        tenant_id: tenantData.id,
        meta_gym_id: metaGymData.id,
        plan_name: planData.name,
        plan_price: planData.price,
      }
    };

  } catch (error) {
    console.error('Error en crearRegistroCompleto:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

// Función para verificar si un email ya está registrado
export async function verificarEmailExistente(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('meta_gym')
      .select('id')
      .eq('email', email)
      .single();

    // Si encuentra un registro, el email ya existe
    return !error && data !== null;
  } catch (error) {
    console.error('Error verificando email:', error);
    return false;
  }
}

// Función para verificar si un nombre de gimnasio ya está registrado
export async function verificarNombreGimnasio(nombre: string): Promise<boolean> {
  try {
    const slug = nombre.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const { data, error } = await supabase
      .from('gym_profiles')
      .select('id')
      .eq('slug', slug)
      .single();

    // Si encuentra un registro, el nombre ya existe
    return !error && data !== null;
  } catch (error) {
    console.error('Error verificando nombre gimnasio:', error);
    return false;
  }
}

// Función para actualizar el estado del tenant después del pago
export async function activarTenant(tenantId: string): Promise<boolean> {
  try {
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 mes de servicio

    const { error } = await supabase
      .from('tenant')
      .update({
        status: 'active',
        end_date: endDate.toISOString()
      })
      .eq('id', tenantId);

    if (error) {
      console.error('Error activating tenant:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in activarTenant:', error);
    return false;
  }
}