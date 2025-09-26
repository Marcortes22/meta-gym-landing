// Archivo de índice para exportar todos los tipos
export * from './navigation';
export * from './components';

// Tipos genéricos comunes
export interface BaseProps {
  className?: string;
  id?: string;
}

export interface WithChildren {
  children?: any;
}

// Tipos para Astro
export interface AstroProps extends BaseProps {
  'data-testid'?: string;
}