import React, { useState, useEffect, useCallback, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import { API_BASE_BASE_URL, getAuthHeaders, handleFetchError } from '../utils/api'; 

import {
  AuthFetchResponse,
  UserDataFetchResponse,
  User,
} from '../types/api';

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

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