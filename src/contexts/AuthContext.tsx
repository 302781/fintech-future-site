// src/context/AuthContext.ts
// Este arquivo conterá apenas a definição do contexto e seu hook personalizado.

import { createContext, useContext } from 'react';
import { User } from '../types/api'; // <--- Verifique o caminho. Se este arquivo estiver em src/context, o caminho para src/types/api.ts será '../types/api'

// --- Interface para o Contexto de Autenticação ---
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  signOut: () => void;
}

// Criar o Contexto
// Definimos o valor padrão como 'undefined' e o tipo do contexto pode ser 'AuthContextType | undefined'
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Lança um erro se o hook for usado fora do AuthProvider
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};