// src/api/auth.ts
import api from './index'; // Importa a instância do Axios configurada

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
    // Adicione outros campos do usuário que seu backend retorna
  };
}

interface UserCredentials {
  email: string;
  password?: string;
  // ... outros campos de login/registro
}

interface RegisterUserData {
    email: string;
    password: string;
    name: string;
    // ... outros campos necessários para o registro
}

interface RegisterResponse {
    message: string;
    userId: string;
    // ... qualquer outro dado que o backend retorne no sucesso do registro
}

// Interface para o objeto de usuário retornado por 'getSession'
interface SessionUser {
    id: string;
    email: string;
    name?: string;
    // Adicione aqui todos os campos que o objeto 'user' da sessão pode ter
}

export const authApi = {
  login: async (credentials: UserCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    // Salve o token após o login bem-sucedido
    if (response.data.token) {
      localStorage.setItem('jwt_token', response.data.token);
      localStorage.setItem('refresh_token', response.data.refreshToken); // Se você usa refresh tokens
    }
    return response.data;
  },

  register: async (userData: RegisterUserData): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Se o logout requer uma chamada de API para invalidar tokens no backend
    // await api.post('/auth/logout');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    // Você pode querer limpar outras informações do usuário aqui
  },

  // CORREÇÃO: Tipagem completa para o retorno de getSession
  getSession: async (): Promise<{ isAuthenticated: boolean; user?: SessionUser }> => {
    try {
      // Tipagem explícita para o que é esperado no data.user
      const response = await api.get<{ user: SessionUser }>('/auth/session');
      return { isAuthenticated: true, user: response.data.user };
    } catch (error) {
      console.error('Erro ao obter sessão:', error);
      return { isAuthenticated: false };
    }
  },
};