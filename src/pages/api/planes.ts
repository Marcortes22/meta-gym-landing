import type { APIRoute } from 'astro';
import { getPlanes } from '../../utils/supabase';

export const GET: APIRoute = async () => {
  try {
    const planes = await getPlanes();
    
    return new Response(
      JSON.stringify({
        success: true,
        data: planes
      }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache por 5 minutos
        }
      }
    );

  } catch (error) {
    console.error('Error en API de planes:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error al cargar los planes. Inténtalo de nuevo más tarde.' 
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};