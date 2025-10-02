import type { APIRoute } from 'astro';
import { crearRegistroCompleto, verificarEmailExistente, verificarNombreGimnasio } from '../../utils/supabase';
import type { RegistroCompleto } from '../../types/database';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as RegistroCompleto;
    
    // Validaciones básicas
    if (!body.gimnasio?.nombre || !body.administrador?.correo || !body.membresia?.plan_id) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Datos incompletos. Verifica todos los campos requeridos.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Verificar si el email ya está registrado
    const emailExiste = await verificarEmailExistente(body.administrador.correo);
    if (emailExiste) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Este email ya está registrado. Usa otro email o inicia sesión.' 
        }),
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Verificar si el nombre del gimnasio ya está registrado
    const nombreExiste = await verificarNombreGimnasio(body.gimnasio.nombre);
    if (nombreExiste) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Este nombre de gimnasio ya está registrado. Elige otro nombre.' 
        }),
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Crear el registro completo
    const resultado = await crearRegistroCompleto(body);
    
    if (resultado.success) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Registro completado exitosamente. Revisa tu email para las instrucciones de pago.',
          data: resultado.data
        }),
        { 
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: resultado.error || 'Error interno del servidor' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Error en API de registro:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error interno del servidor. Inténtalo de nuevo más tarde.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Permitir solicitudes OPTIONS para CORS
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