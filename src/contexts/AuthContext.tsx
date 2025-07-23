import React, { useState, useEffect, ReactNode } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContextHook';
import api from '@/api/index';
export interface UserMetadata {
  first_name: string;
  last_name: string;
  plan_type: 'Escola Básica' | 'Premium' | 'Rede de Ensino' | string;
}

export interface User {
  id: string;
  email: string;
  user_metadata: UserMetadata;
  level?: number;
  xp?: number;
}

interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
}

interface UserDataResponse {
  data: {
    user: User;
  };
}

// --- AuthProvider Componente ---
interface AuthProviderProps {
  children: ReactNode;
}
interface CustomAxiosError extends Error {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status?: number;
    statusText?: string;
     headers?: unknown;
  };
  config?: unknown;
  code?: string;
  request?: unknown;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleAxiosError = useCallback((error: unknown, action: string) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    const axiosError = error as CustomAxiosError;
    console.error(
      `Erro da API ao ${action}:`,
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Erro desconhecido da API'
    );
  } else if (error instanceof Error) {
    console.error(`Erro inesperado ao ${action}:`, error.message);
  } else {
    console.error(`Erro desconhecido ao ${action}:`, error);
  }
}, []);

  const signOut = useCallback(() => {
    setLoading(true);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    console.log('Usuário deslogado.');
    setLoading(false);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await api.get<UserDataResponse>('/user');

          if (response.data?.data?.user) {
            setUser(response.data.data.user);
          } else {
            console.warn('Dados de usuário inválidos retornados pela API /user.');
            signOut();
          }
        } catch (error: unknown) {
          handleAxiosError(error, 'verificar o token ou carregar dados do usuário');
          signOut();
        }
      }
      setLoading(false);
    };

    loadUserFromStorage();
  }, [signOut, handleAxiosError]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.post<AuthResponse>('/signin', { email, password });

      const { token: newToken, user: userData } = response.data.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);

      console.log('Login bem-sucedido!', userData);
      setLoading(false);
      return true;
    } catch (error: unknown) {
      handleAxiosError(error, 'login');
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      setLoading(false);
      return false;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.post<AuthResponse>('/signup', { email, password, first_name: firstName, last_name: lastName });

      const { token: newToken, user: userData } = response.data.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);

      console.log('Cadastro bem-sucedido!', userData);
      setLoading(false);
      return true;
    } catch (error: unknown) {
      handleAxiosError(error, 'cadastro');
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      setLoading(false);
      return false;
    }
  };

  const contextValue = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/* api export moved to api.ts */