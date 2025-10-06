import type { APIRoute } from 'astro';
import { crearSolicitudRegistro, verificarSolicitudExistente, verificarTenantNameExistente } from '../../utils/supabase';
import { sendWelcomeEmail } from '../../utils/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const tenantName = formData.get('tenant_name') as string;

    // Validaciones básicas
    if (!name || !email || !tenantName) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Nombre, email y nombre del gimnasio son requeridos' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Formato de email inválido' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar longitud del nombre del gimnasio
    if (tenantName.trim().length < 2) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'El nombre del gimnasio debe tener al menos 2 caracteres' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Verificar si ya existe una solicitud con este email
    const solicitudExiste = await verificarSolicitudExistente(email);
    if (solicitudExiste) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Ya existe una solicitud con este email' 
        }), 
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Verificar si ya existe una solicitud con este nombre de gimnasio
    const tenantNameExiste = await verificarTenantNameExistente(tenantName);
    if (tenantNameExiste) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Ya existe un gimnasio registrado con ese nombre. Por favor elige otro nombre.' 
        }), 
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Crear la solicitud de registro
    const resultado = await crearSolicitudRegistro(name, email, tenantName);
    
    if (!resultado.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: resultado.error || 'Error al crear la solicitud' 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Si la base de datos fue exitosa, intentar enviar email de bienvenida
    try {
      const emailResult = await sendWelcomeEmail(email, name);
      
      if (emailResult.success) {
        console.log('Email de bienvenida enviado exitosamente');
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: '¡Solicitud recibida! Te enviamos un email con los próximos pasos.',
            data: resultado.data
          }), 
          { 
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        console.error('Error enviando email de bienvenida:', emailResult.error);
        // Aún consideramos exitoso si se guardó en la BD
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Solicitud creada exitosamente. Te contactaremos pronto.',
            data: resultado.data
          }), 
          { 
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    } catch (emailError) {
      console.error('Error en servicio de email:', emailError);
      // Si falla el email, aún retornamos éxito porque la BD fue exitosa
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Solicitud creada exitosamente. Te contactaremos pronto.',
          data: resultado.data
        }), 
        { 
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Error en /api/register-request:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error interno del servidor' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};