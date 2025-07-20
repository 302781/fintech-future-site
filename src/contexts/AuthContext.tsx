import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- Definindo Tipos (Interfaces) ---

interface User {
  id: string;
  email: string;
  user_metadata: {
    first_name: string;
    last_name: string;
    plan_type: string;
  };
  level?: number;
  xp?: number;
}

// *** IMPORTANTE: AJUSTE ESTAS INTERFACES CONFORME A RESPOSTA REAL DO SEU BACKEND ***
//
// Opção 1: Se o seu backend retorna { token: "...", user: {...} } DIRETAMENTE na resposta.data
// interface AuthResponse {
//   token: string;
//   user: User;
// }
// interface UserDataResponse {
//   user: User;
// }
//
// Opção 2 (ATUALMENTE SELECIONADA): Se o seu backend retorna { data: { token: "...", user: {...} } } aninhado em "data".
// Mantemos esta como padrão com base em discussões anteriores.
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
// ***********************************************************************************


interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  signOut: () => void;
}

// --- Criar o Contexto ---
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Configuração da Instância do Axios (Centralizada) ---
const api = axios.create({
  baseURL: 'http://localhost:3001', // <<< AQUI: Confirme a porta do seu backend!
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- AuthProvider Componente ---
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
  }, []);

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
      const response = await api.post<AuthResponse>('/signup', { email, password, firstName, lastName });
      
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

  const signOut = () => {
    setLoading(true);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization']; 
    console.log('Usuário deslogado.');
    setLoading(false);
    navigate('/login');
  };

  // Função robusta para lidar com erros do Axios ou erros genéricos
  const handleAxiosError = (error: unknown, action: string) => {
    // Primeiro, verifique se é um erro do Axios (mais comum para chamadas de API)
    // Para resolver 'isAxiosError' não existe, usamos uma verificação mais genérica,
    // já que 'axios.isAxiosError' pode não ser reconhecido em alguns ambientes.
    // Tentamos acessar 'response' e 'message' apenas se o erro tiver a estrutura esperada.
    if (typeof error === 'object' && error !== null && 'response' in error) {
      // O erro é um objeto e tem a propriedade 'response'
      const axiosError = error as { response?: { data?: { error?: string } }, message?: string };
      console.error(`Erro da API ao ${action}:`, axiosError.response?.data?.error || axiosError.message || 'Erro desconhecido da API');
    } else if (error instanceof Error) {
      // É um erro JavaScript padrão (ex: TypeError, Network error que não vem do Axios com resposta)
      console.error(`Erro inesperado ao ${action}:`, error.message);
    } else {
      // É algo totalmente inesperado (um tipo primitivo, null, etc.)
      console.error(`Erro desconhecido ao ${action}:`, error);
    }
  };

  const contextValue: AuthContextType = {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export { api };