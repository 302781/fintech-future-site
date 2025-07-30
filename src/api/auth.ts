import {
  LoginResponse,
  UserCredentials,
  RegisterUserData,
  RegisterResponse,
  SessionUser,
  BackendErrorResponse // Para erros detalhados do backend
} from '..types/api'; 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Função auxiliar para obter o token JWT
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


export const authApi = {
  login: async (credentials: UserCredentials): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // No login/registro, geralmente não envia o token ainda
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw await handleFetchError(response);
    }

    const data: LoginResponse = await response.json();
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
      if (data.refreshToken) {
        localStorage.setItem('refresh_token', data.refreshToken);
      }
    }
    return data;
  },

  register: async (userData: RegisterUserData): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw await handleFetchError(response);
    }
    return await response.json() as RegisterResponse;
  },

  logout: async (): Promise<void> => {
    // Se o logout precisa de uma chamada de API para invalidar token no backend
    // await fetch(`${API_BASE_URL}/auth/logout`, {
    //   method: 'POST',
    //   headers: getAuthHeaders(),
    // });
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
  },

  getSession: async (): Promise<{ isAuthenticated: boolean; user?: SessionUser }> => {
    const jwtToken = localStorage.getItem('jwt_token');
    if (!jwtToken) {
        return { isAuthenticated: false }; // Sem token, não autenticado
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/session`, {
        headers: getAuthHeaders(), // Usa a função auxiliar para cabeçalhos
      });

      if (!response.ok) {
        // Se a sessão não for válida (ex: 401), retorna não autenticado sem lançar erro severo
        if (response.status === 401 || response.status === 403) {
            return { isAuthenticated: false };
        }
        throw await handleFetchError(response); // Lança outros erros
      }

      const data: { user: SessionUser } = await response.json();
      return { isAuthenticated: true, user: data.user };
    } catch (error) {
      console.error('Erro ao obter sessão:', error);
      // Aqui você pode decidir limpar o token se for um erro de autenticação/expiração
      // if (error instanceof Error && error.message.includes('401')) { localStorage.removeItem('jwt_token'); }
      return { isAuthenticated: false };
    }
  },
};