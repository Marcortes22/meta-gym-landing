import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  Timestamp,
  doc,
  getDoc 
} from "firebase/firestore";
import type { 
  RegisterRequest, 
  RegisterRequestResponse,
  SaasPlan 
} from '../types/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (solo en el cliente)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };

// Función para normalizar el tenant_name
export function normalizeTenantName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales excepto espacios y guiones
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
    .replace(/^-|-$/g, ''); // Remover guiones al inicio y final
}

// Función para crear una solicitud de registro
export async function crearSolicitudRegistro(
  data: {
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
  }
): Promise<RegisterRequestResponse> {
  try {
    // Verificar si el email ya existe
    const emailExists = await verificarEmailRegistroExistente(data.email);
    if (emailExists) {
      return {
        success: false,
        error: 'Este email ya está registrado',
        data: null
      };
    }

    // Crear el documento en Firestore
    const docRef = await addDoc(collection(db, 'register_requests'), {
      admin_name: data.admin_name.trim(),
      admin_surname1: data.admin_surname1.trim(),
      admin_surname2: data.admin_surname2?.trim() || '',
      admin_phone: data.admin_phone.trim(),
      email: data.email.trim().toLowerCase(),
      company_name: data.company_name.trim(),
      gym_name: data.gym_name.trim(),
      gym_phone: data.gym_phone.trim(),
      gym_address: data.gym_address.trim(),
      requested_plan: data.requested_plan,
      name: data.name?.trim() || data.admin_name.trim(), // Para compatibilidad
      state: 'pending',
      date: Timestamp.now(),
      createdAt: Timestamp.now()
    });

    return {
      success: true,
      error: null,
      data: {
        id: docRef.id,
        admin_name: data.admin_name.trim(),
        admin_surname1: data.admin_surname1.trim(),
        admin_surname2: data.admin_surname2?.trim() || '',
        admin_phone: data.admin_phone.trim(),
        email: data.email.trim().toLowerCase(),
        company_name: data.company_name.trim(),
        gym_name: data.gym_name.trim(),
        gym_phone: data.gym_phone.trim(),
        gym_address: data.gym_address.trim(),
        requested_plan: data.requested_plan,
        name: data.admin_name.trim(),
        state: 'pending',
        date: new Date().toISOString(),
        created_at: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error('Error en crearSolicitudRegistro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: null
    };
  }
}

// Función para verificar email existente
export async function verificarEmailRegistroExistente(email: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'register_requests'),
      where('email', '==', email.trim().toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error verificando email:', error);
    return false;
  }
}



// Función para agregar email al newsletter
export async function agregarEmailNewsletter(email: string): Promise<{ data: any | null; error: any }> {
  try {
    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), {
      email: email.trim().toLowerCase(),
      subscribed_at: Timestamp.now(),
      status: 'active'
    });

    return { data: { id: docRef.id, email }, error: null };
  } catch (error) {
    console.error('Error adding to newsletter:', error);
    return { data: null, error };
  }
}

// Función para obtener planes desde Firebase
export async function obtenerPlanes(): Promise<SaasPlan[]> {
  try {
    const planesCollection = collection(db, 'saas_plans');
    const q = query(planesCollection, where('is_active', '==', true));
    const querySnapshot = await getDocs(q);
    
    const planes: SaasPlan[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      planes.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        max_clients: data.max_clients,
        max_gyms: data.max_gyms,
        features: data.features || [],
        is_active: data.is_active,
        platform_config_id: data.platform_config_id,
        created_at: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      });
    });
    
    // Ordenar por precio
    planes.sort((a, b) => a.price - b.price);
    
    return planes;
    
  } catch (error) {
    console.error('Error obteniendo planes de Firebase:', error);
    return [];
  }
}

// Función para obtener un plan específico
export async function obtenerPlanPorId(planId: string): Promise<SaasPlan | null> {
  try {
    const planDoc = await getDoc(doc(db, 'saas_plans', planId));
    
    if (!planDoc.exists()) {
      return null;
    }
    
    const data = planDoc.data();
    return {
      id: planDoc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      max_clients: data.max_clients,
      max_gyms: data.max_gyms,
      features: data.features || [],
      is_active: data.is_active,
      platform_config_id: data.platform_config_id,
      created_at: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error obteniendo plan por ID:', error);
    return null;
  }
}
