// src/providers/AuthProvider.tsx
// Este arquivo conterá apenas o componente AuthProvider.

import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
// Importe o AuthContext do novo arquivo dedicado
import { AuthContext } from '../contexts/AuthContext'; // <--- IMPORTAÇÃO CORRETA AQUI!

import {
  UserCredentials,
  AuthFetchResponse,
  UserDataFetchResponse,
  User,
  BackendErrorResponse,
} from '../types/api'; 
const API_BASE_BASE_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

// --- AuthProvider Componente ---
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    setLoading(true);
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwt_token');
    console.log('Usuário deslogado.');
    setLoading(false);
    navigate('/login');
  }, [navigate]);

  const loadUserFromStorage = useCallback(async () => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const response = await fetch(`${API_BASE_BASE_URL}/user`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                signOut();
                return;
            }
            throw await handleFetchError(response);
        }

        const data: UserDataFetchResponse = await response.json();

        if (data?.user) {
          setUser(data.user);
        } else {
          console.warn('Dados de usuário inválidos retornados pela API /user.');
          signOut();
        }
      } catch (error) {
        let message = 'Erro desconhecido ao verificar o token ou carregar dados do usuário.';
        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
            message = (error as { message: string }).message;
        }
        console.error(message, error);
        signOut();
      }
    }
    setLoading(false);
  }, [signOut]);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw await handleFetchError(response);
      }

      const data: AuthFetchResponse = await response.json();

      localStorage.setItem('jwt_token', data.token);
      setToken(data.token);
      setUser(data.user);

      console.log('Login bem-sucedido!', data.user);
      setLoading(false);
      return true;
    } catch (error) {
      let message = 'Erro desconhecido ao fazer login.';
      if (error instanceof Error) {
          message = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
          message = (error as { message: string }).message;
      }
      console.error(message, error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('jwt_token');
      setLoading(false);
      return false;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
      });

      if (!response.ok) {
        throw await handleFetchError(response);
      }

      const data: AuthFetchResponse = await response.json();

      localStorage.setItem('jwt_token', data.token);
      setToken(data.token);
      setUser(data.user);

      console.log('Cadastro bem-sucedido!', data.user);
      setLoading(false);
      return true;
    } catch (error) {
      let message = 'Erro desconhecido ao fazer cadastro.';
      if (error instanceof Error) {
          message = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
          message = (error as { message: string }).message;
      }
      console.error(message, error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('jwt_token');
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