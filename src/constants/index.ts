// Archivo de índice para exportar todas las constantes
export * from './navigation';
export * from './design';

// Configuración general de la aplicación
export const APP_CONFIG = {
  name: 'MetaGym',
  tagline: 'FITNESS STUDIO', 
  description: 'Tu gimnasio inteligente para alcanzar tus metas fitness',
  logo: {
    path: '/src/assets/image-removebg-preview.png',
    alt: 'MetaGym Logo',
    width: 53,
    height: 46
  }
} as const;