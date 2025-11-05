
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
  name?: string; 
  created_at?: string;
  date?: string;
  state?: string;
}
export interface RegisterRequestResponse {
  success: boolean;
  error: string | null;
  data: RegisterRequest | null;
}

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