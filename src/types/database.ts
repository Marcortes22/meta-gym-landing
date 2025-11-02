// Tipos para la colección register_requests en Firebase
export interface RegisterRequest {
  id?: string;
  admin_name: string;
  admin_surname1: string;
  admin_surname2?: string;
  admin_phone: string;
  email: string;
  company_name: string;
  gym_name: string;
  gym_phone: string;
  gym_address: string;
  requested_plan: string;
  name?: string; // Para compatibilidad
  created_at?: string;
  date?: string;
  state?: string;
}

// Tipos para la respuesta de la API
export interface RegisterRequestResponse {
  success: boolean;
  error: string | null;
  data: RegisterRequest | null;
}

// Tipo para crear una nueva solicitud (solo campos requeridos)
export interface CreateRegisterRequest {
  admin_name: string;
  admin_surname1: string;
  admin_surname2?: string;
  admin_phone: string;
  email: string;
  company_name: string;
  gym_name: string;
  gym_phone: string;
  gym_address: string;
  requested_plan: string;
  name?: string;
}

// Tipos para la colección saas_plans
export interface SaasPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  max_clients: number;
  max_gyms: number;
  features: string[];
  is_active: boolean;
  platform_config_id: string | null;
  created_at: string;
}

// Tipo para respuesta de planes
export interface PlanesResponse {
  success: boolean;
  data: SaasPlan[];
  error?: string;
}
