// Configuración de diseño y tokens de design system
export const DESIGN_TOKENS = {
  // Colores del sistema
  colors: {
    primary: '#0a0a0a',
    accent: '#ef4444',
    success: '#22c55e',
    foreground: '#fefefe',
    muted: '#262626',
    'muted-foreground': '#a1a1aa',
    destructive: '#dc2626',
    border: '#262626'
  },
  
  // Espaciado
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem', 
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  
  // Tipografía
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem'
  },
  
  // Bordes y radio
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px'
  },
  
  // Z-index
  zIndex: {
    dropdown: 10,
    sticky: 20,
    header: 50,
    overlay: 100,
    modal: 1000
  }
} as const;

// Configuración de breakpoints responsive
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

// Configuración de animaciones
export const ANIMATIONS = {
  durations: {
    fast: '0.15s',
    normal: '0.2s',
    slow: '0.3s',
    slower: '0.5s'
  },
  easings: {
    default: 'ease',
    'in-out': 'ease-in-out', 
    out: 'ease-out',
    in: 'ease-in'
  }
} as const;