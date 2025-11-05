import type { APIRoute } from 'astro';
import { addToNewsletter } from '../../utils/email';

export const prerender = false; 

export const POST: APIRoute = async ({ request }) => {
  try {
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

    const body = await request.text();
    
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
    
    const { agregarEmailNewsletter } = await import('../../utils/firebase');
    const dbResult = await agregarEmailNewsletter(email);
    
    if (dbResult.error) {
      console.error('Error guardando en Firebase:', dbResult.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Error al guardar la suscripción' 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    const result = await addToNewsletter(email);
    
    if (result.success) {
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