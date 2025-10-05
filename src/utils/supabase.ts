import { createClient } from '@supabase/supabase-js';
import type { RegisterRequest, RegisterRequestResponse, CreateRegisterRequest } from '../types/database';

// Configuración del cliente Supabase
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Función para crear una solicitud de registro con solo nombre y email
export async function crearSolicitudRegistro(name: string, email: string): Promise<RegisterRequestResponse> {
  try {
    const { data, error } = await supabase
      .from('register_request')
      .insert([
        { 
          name: name,
          email: email,
          // Los demás campos (data, state, created_at) se manejan por defecto en la base de datos
        }
      ])
      .select();

    if (error) {
      console.error('Error creating register request:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }

    console.log('Solicitud de registro creada exitosamente:', data);
    return {
      success: true,
      error: null,
      data: data[0]
    };

  } catch (error) {
    console.error('Error en crearSolicitudRegistro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: null
    };
  }
}

// Función para verificar si un email ya tiene una solicitud pendiente
export async function verificarSolicitudExistente(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('register_request')
      .select('id')
      .eq('email', email)
      .single();

    // Si encuentra un registro, ya existe una solicitud
    return !error && data !== null;
  } catch (error) {
    console.error('Error verificando solicitud existente:', error);
    return false;
  }
}

// Función para obtener todas las solicitudes de registro
export async function obtenerSolicitudesRegistro() {
  try {
    const { data, error } = await supabase
      .from('register_request')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching register requests:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }

    return {
      success: true,
      error: null,
      data: data || []
    };

  } catch (error) {
    console.error('Error en obtenerSolicitudesRegistro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: []
    };
  }
}

// Función para actualizar el estado de una solicitud
export async function actualizarEstadoSolicitud(id: string, estado: string) {
  try {
    const { data, error } = await supabase
      .from('register_request')
      .update({ state: estado })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating register request state:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }

    return {
      success: true,
      error: null,
      data: data[0]
    };

  } catch (error) {
    console.error('Error en actualizarEstadoSolicitud:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: null
    };
  }
}