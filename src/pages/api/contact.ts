import type { APIRoute } from 'astro';
import { sendContactFormEmail } from '../../utils/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message, phone } = await request.json();
    
    // Validaciones
    if (!name || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Por favor ingresa un nombre válido (mínimo 2 caracteres)' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Por favor ingresa un email válido' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!message || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Por favor ingresa un mensaje de al menos 10 caracteres' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'El formato del email no es válido' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Enviar email usando Resend
    const result = await sendContactFormEmail(
      name.trim(), 
      email.trim(), 
      message.trim(), 
      phone?.trim()
    );
    
    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: '¡Gracias por tu mensaje! Te responderemos pronto.' 
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    } else {
      console.error('Error enviando email de contacto:', result.error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.' 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
  } catch (error) {
    console.error('Error en API de contacto:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error interno del servidor. Por favor inténtalo más tarde.' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};