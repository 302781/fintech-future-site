import {
  CheckoutSessionResponse,
  SubscriptionStatusResponse,
  CustomerPortalResponse,
  BackendErrorResponse // Para erros detalhados do backend
} from '../types/api'; // Ajuste o caminho

// Defina o BASE_URL da sua API. Isso é crucial e deve ser o mesmo usado em outros arquivos 'fetch'.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Função auxiliar para obter o token JWT (reutilizada de auth.ts, mas pode ser centralizada)
const getAuthHeaders = (): HeadersInit => {
  const jwtToken = localStorage.getItem('jwt_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`;
  }
  return headers;
};

// Função auxiliar para lidar com erros de resposta HTTP para fetch
const handleFetchError = async (response: Response): Promise<Error> => {
  let errorMessage = `Erro do servidor: ${response.status} ${response.statusText}`;
  try {
    const errorData: BackendErrorResponse = await response.json();
    if (errorData && errorData.message) {
      errorMessage = errorData.message;
    }
  } catch (parseError) {
    console.error('Falha ao parsear erro do servidor como JSON:', parseError);
  }
  return new Error(errorMessage);
};


export const paymentsApi = {
  createCheckoutSession: async (priceId: string, successPath?: string): Promise<CheckoutSessionResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: getAuthHeaders(), // Usa a função auxiliar para cabeçalhos
      body: JSON.stringify({ priceId, successPath }),
    });

    if (!response.ok) {
      throw await handleFetchError(response);
    }
    return await response.json() as CheckoutSessionResponse;
  },

  checkSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/assinatura/status`, {
      headers: getAuthHeaders(), // Usa a função auxiliar para cabeçalhos
    });

    if (!response.ok) {
      throw await handleFetchError(response);
    }
    return await response.json() as SubscriptionStatusResponse;
  },

  openStripeCustomerPortal: async (): Promise<CustomerPortalResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/stripe/customer-portal`, {
      method: 'POST',
      headers: getAuthHeaders(), // Usa a função auxiliar para cabeçalhos
    });

    if (!response.ok) {
      throw await handleFetchError(response);
    }
    return await response.json() as CustomerPortalResponse;
  },
};