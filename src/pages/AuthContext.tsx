// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// 1. Definir a interface para o objeto de usuário
interface User {
  id: string;
  name: string;
  email: string;
  user_metadata?: { // Esta propriedade é fundamental para o erro 'user_metadata'
    plan_type?: string;
    first_name?: string;
    last_name?: string;
  };
  // Adicione outras propriedades do usuário conforme necessário
}

// 2. Definir a interface para o tipo do contexto de autenticação
interface AuthContextType {
  user: User | null; // Agora tipado como User ou null
  signIn: (credentials: { email: string; password: string }) => Promise<void>; // Tipagem mais específica para credenciais
  signOut: () => Promise<void>;
  isLoading: boolean;
}

// Criar o contexto de autenticação
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // Usando User | null
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao parsear usuário do localStorage:", error);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    checkAuthStatus();
  }, []);

  const signIn = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      const fakeUser: User = { 
        id: '123', 
        name: 'Usuário Teste', 
        email: credentials.email,
        user_metadata: { 
          plan_type: 'Escola Básica',
          first_name: 'Usuário',
          last_name: 'Teste'
        }
      };
      setUser(fakeUser);
      localStorage.setItem('user', JSON.stringify(fakeUser));
    } else {
      console.error("Credenciais inválidas.");
      setUser(null);
    }
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('user');
    setIsLoading(false);
  };

  const contextValue: AuthContextType = {
    user,
    signIn,
    signOut,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
