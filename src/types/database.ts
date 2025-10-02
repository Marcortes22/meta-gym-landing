// Tipos basados en las tablas de Supabase
export interface GymProfile {
  id?: string;
  tenant_id?: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  logo_url?: string;
  slug?: string;
  timezone?: string;
  currency?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Tenant {
  id?: string;
  meta_gym_id?: string;
  plan_id?: string;
  start_date?: string;
  end_date?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  created_at?: string;
  updated_at?: string;
}

export interface MetaGym {
  id?: string;
  auth_user_id?: string;
  name: string;
  email: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MetaGymPlan {
  id?: string;
  name: string;
  price: number;
  max_clients: number;
  description?: string;
  features?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Interfaces para los formularios del stepper
export interface RegistroGimnasio {
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  miembros_activos: string;
}

export interface RegistroAdministrador {
  nombre: string;
  apellido1: string;
  apellido2?: string;
  correo: string;
  telefono: string;
}

export interface RegistroMembresia {
  plan_id: string;
  plan_name: string;
  plan_price: number;
}

// Interface completa del registro
export interface RegistroCompleto {
  gimnasio: RegistroGimnasio;
  administrador: RegistroAdministrador;
  membresia: RegistroMembresia;
}

// Estados del stepper
export interface StepperState {
  currentStep: number;
  completedSteps: number[];
  isValid: boolean;
  isLoading: boolean;
}

// Respuestas de la API
export interface RegistroResponse {
  success: boolean;
  data?: {
    gym_profile_id: string;
    tenant_id: string;
    meta_gym_id: string;
    plan_name?: string;
    plan_price?: number;
  };
  error?: string;
}

export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: any;
}