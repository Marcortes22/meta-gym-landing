import type { APIRoute } from 'astro';
import { crearSolicitudRegistro } from '../../utils/firebase';
import { sendWelcomeEmail } from '../../utils/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const adminName = formData.get('admin_name') as string;
    const adminSurname1 = formData.get('admin_surname1') as string;
    const adminSurname2 = formData.get('admin_surname2') as string;
    const adminPhone = formData.get('admin_phone') as string;
    const email = formData.get('email') as string;
    const companyName = formData.get('company_name') as string;
    const gymName = formData.get('gym_name') as string;
    const gymPhone = formData.get('gym_phone') as string;
    const gymAddress = formData.get('gym_address') as string;
    const requestedPlan = formData.get('requested_plan') as string;
      const name = formData.get('name') as string || adminName;

    if (!adminName || !adminSurname1 || !email || !companyName || !gymName || !requestedPlan) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Todos los campos marcados con * son requeridos' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!adminPhone || !gymPhone || !gymAddress) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Todos los campos requeridos deben estar completos' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

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

    const resultado = await crearSolicitudRegistro({
      admin_name: adminName,
      admin_surname1: adminSurname1,
      admin_surname2: adminSurname2 || '',
      admin_phone: adminPhone,
      email: email,
      company_name: companyName,
      gym_name: gymName,
      gym_phone: gymPhone,
      gym_address: gymAddress,
      requested_plan: requestedPlan,
      name: name
    });
    
    if (!resultado.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: resultado.error || 'Error al crear la solicitud' 
        }), 
        { 
          status: resultado.error?.includes('ya está') ? 409 : 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    try {
      const emailResult = await sendWelcomeEmail(email, name);
      
      if (emailResult.success) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: '¡Solicitud recibida! Te enviamos un email con los próximos pasos.'
          }), 
          { 
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        console.error('Error enviando email de bienvenida:', emailResult.error);
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Solicitud creada exitosamente. Te contactaremos pronto.'
          }), 
          { 
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    } catch (emailError) {
      console.error('Error en servicio de email:', emailError);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Solicitud creada exitosamente. Te contactaremos pronto.'
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