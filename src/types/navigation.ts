// Tipos centralizados para navegación
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  description?: string;
  isExternal?: boolean;
}

export interface NavigationConfig {
  items: NavItem[];
  mobileBreakpoint?: number;
}

// Props para componentes de navegación
export interface NavigationProps {
  items?: NavItem[];
  className?: string;
  currentPath?: string;
  variant?: 'desktop' | 'mobile';
}

export interface MobileNavigationProps extends NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}