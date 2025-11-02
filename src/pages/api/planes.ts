import type { APIRoute } from 'astro';
import { obtenerPlanes } from '../../utils/firebase';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const planes = await obtenerPlanes();
    
    if (planes.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          data: [],
          error: 'No se encontraron planes activos'
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: planes
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Error en API /planes:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        data: [],
        error: 'Error al obtener los planes'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
