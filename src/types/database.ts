// Tipos para la tabla register_request
export interface RegisterRequest {
  id: string;
  name: string;
  email: string;
  tenant_name?: string | null;
  data?: Date | null;
  state?: string | null;
  created_at: string;
}

// Tipos para la respuesta de la API
export interface RegisterRequestResponse {
  success: boolean;
  error: string | null;
  data: RegisterRequest | null;
}

// Tipo para crear una nueva solicitud (solo campos requeridos)
export interface CreateRegisterRequest {
  name: string;
  email: string;
  tenant_name: string;
}
