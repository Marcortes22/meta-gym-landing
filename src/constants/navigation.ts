import type { NavigationConfig } from '../types';

// Configuración de rutas principales
export const ROUTES = {
  HOME: '/',
  PLANS: '/planes',
  FEATURES: '/funciones', 
  GET_STARTED: '/comenzar',
  ABOUT: '/acerca',
  CONTACT: '/contacto',
} as const;

// Configuración de navegación principal
export const MAIN_NAVIGATION: NavigationConfig = {
  items: [
    {
      label: 'Planes',
      href: ROUTES.PLANS,
      description: 'Descubre nuestros planes de entrenamiento'
    },
    {
      label: 'Funciones',
      href: ROUTES.FEATURES,
      description: 'Conoce todas nuestras funcionalidades'
    }
  ],
  mobileBreakpoint: 768
};

// Configuración del CTA principal
export const PRIMARY_CTA = {
  label: 'Comenzar',
  href: ROUTES.GET_STARTED,
  ariaLabel: 'Comenzar entrenamiento'
} as const;