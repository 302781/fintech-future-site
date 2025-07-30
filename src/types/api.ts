// src/types/api.ts

// =====================================
// Interfaces Comuns de Resposta/Erro
// =====================================

export interface BackendErrorResponse {
  message: string;
  statusCode?: number;
  error?: string; // Ex: "Bad Request", "Unauthorized"
  details?: { [key: string]: string | string[] }; // Detalhes de validação, etc.
}

// =====================================
// Interfaces para Autenticação (auth.ts e AuthContext)
// =====================================

export interface UserCredentials {
  email: string;
  password?: string;
}

// DEFINIÇÕES FALTANTES E AGORA INCLUÍDAS:
export interface UserMetadata {
  first_name: string;
  last_name: string;
  plan_type: 'Escola Básica' | 'Premium' | 'Rede de Ensino' | string;
}

// DEFINIÇÃO FALTANTE E AGORA INCLUÍDA:
export interface User {
  id: string;
  email: string;
  user_metadata: UserMetadata;
  level?: number;
  xp?: number;
}

// Adaptação para a resposta direta do backend via fetch para login/cadastro
// O backend agora deve retornar diretamente { token, user } ou { token, refreshToken, user }
export interface AuthFetchResponse {
  token: string;
  refreshToken?: string; // Se aplicável
  user: User; // Agora usa a interface User
}

// Adaptação para a resposta direta do backend via fetch para obter dados de usuário (ex: /user)
export interface UserDataFetchResponse {
  user: User; // Agora usa a interface User
}

export interface LoginResponse { // Usado em auth.ts, mas AuthContext usa AuthFetchResponse
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
}


// =====================================
// Interfaces para Pagamentos (payments.ts / useStripe.ts)
// =====================================

export interface CheckoutSessionResponse {
  url: string;
  sessionId?: string;
}

export interface SubscriptionStatusResponse {
  subscribed: boolean;
  planId?: string;
  status?: 'active' | 'canceled' | 'trialing' | 'past_due' | 'unpaid' | string;
  currentPeriodEnd?: number; // Timestamp do fim do período atual (UNIX timestamp)
}

export interface CustomerPortalResponse {
  url: string;
}

// =====================================
// Interfaces para Assinaturas (subscriptions.ts)
// =====================================

export interface ChangeSubscriptionPlanRequest {
  newPlanId: string;
}

export interface ChangeSubscriptionPlanResponse {
  success: boolean;
  message: string;
  newStatus?: string;
}

export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
}

// =====================================
// Outras Interfaces (que você incluiu)
// =====================================

export interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
  currency: string;
}