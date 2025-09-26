// Tipos centralizados para botones y elementos interactivos
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

// Props base para botones
export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
}

// Props específicas para CTAButton
export interface CTAButtonProps extends BaseButtonProps {
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  onClick?: () => void;
}

// Props para Logo
export interface LogoProps {
  size?: ComponentSize;
  className?: string;
  href?: string;
  showBrandText?: boolean;
  showSubtext?: boolean;
}