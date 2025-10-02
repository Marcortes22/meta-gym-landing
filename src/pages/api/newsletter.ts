import type { APIRoute } from 'astro';
import { addToNewsletter } from '../../utils/email';

export const prerender = false; // Importante: esto marca la página como server-side

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Content-Type debe ser application/json' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Obtener datos del body
    const body = await request.text();
    
    // Validar que el body no esté vacío
    if (!body.trim()) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Body de la petición está vacío' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    let email: string;
    try {
      const data = JSON.parse(body);
      email = data.email;
    } catch (parseError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'JSON inválido en el body de la petición' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Validar email
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email es requerido' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Formato de email inválido' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Procesando suscripción para email:', email);
    
    // Enviar email de confirmación usando Resend
    const result = await addToNewsletter(email);
    
    if (result.success) {
      console.log('Newsletter email enviado exitosamente');
      
      // Aquí podrías guardar en base de datos si tienes una
      // await saveToDatabase(email);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: '¡Suscripción exitosa! Revisa tu email para confirmar.' 
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    } else {
      console.error('Error enviando newsletter email:', result.error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Error interno del servicio de email' 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
  } catch (error) {
    console.error('Error interno en /api/newsletter:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error interno del servidor' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};

// Método OPTIONS para CORS (si es necesario)
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};