import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getErrorMessage } from '../utils/errorUtils'; 

// --- Interfaces de Tipagem ---
interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  planType?: string; 
}

// Tipos de retorno para as funções de autenticação
interface AuthResult {
  error: { message: string } | null;
  success?: boolean; // Opcional, usado mais para signUp
  message?: string; // Opcional, para mensagens de sucesso/erro
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<AuthResult>; // Corrigido o tipo de retorno
  signIn: (email: string, password: string) => Promise<AuthResult>; // Corrigido o tipo de retorno
  signOut: () => void;
  loading: boolean;
}
// --- Fim das Interfaces de Tipagem ---

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/signin', { email, password });

      const token = res.data.token;
      if (token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Adapta o objeto de usuário do backend para a interface User do frontend
        const backendUser = res.data.user;
        const formattedUser: User = {
            id: Number(backendUser.id),
            email: backendUser.email,
            firstName: backendUser.user_metadata?.first_name,
            lastName: backendUser.user_metadata?.last_name,
            planType: backendUser.user_metadata?.plan_type || backendUser.plan_type, // Ajuste para como seu backend retorna
        };
        setUser(formattedUser);

        setLoading(false);
        return { error: null };
      } else {
          // Caso o backend não retorne um token por algum motivo (mesmo com sucesso)
          setLoading(false);
          return { error: { message: "Login bem-sucedido, mas nenhum token recebido." } };
      }
    } catch (err) { // 'err' agora é inferido corretamente ou você pode tipá-lo como 'unknown'
      setLoading(false);
      const message = getErrorMessage(err);
      return { error: { message } };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/signup', { email, password, firstName, lastName });

      setLoading(false);
      // Sua rota de signup retorna 'success: true' e 'message' no backend.
      // Adapte a tipagem do retorno para combinar com o que o backend realmente envia.
      return {
        error: null,
        success: res.data.success, // O backend já envia isso
        message: res.data.message || "Cadastro realizado com sucesso! Agora você pode fazer login."
      };
    } catch (err) {
      setLoading(false);
      const message = getErrorMessage(err);
      return { error: { message } };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Configure o token para esta requisição específica
          const res = await axios.get('http://localhost:3001/user', { // Usando /user que já é protegida
            headers: { Authorization: `Bearer ${token}` }
          });

          // Seu backend /user retorna { data: { user: {...} } }
          const backendUser = res.data.data.user;
          if (backendUser) {
            const formattedUser: User = {
                id: Number(backendUser.id),
                email: backendUser.email,
                firstName: backendUser.user_metadata?.first_name,
                lastName: backendUser.user_metadata?.last_name,
                planType: backendUser.user_metadata?.plan_type,
            };
            setUser(formattedUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            console.warn('Backend /user retornou usuário nulo ou inválido.');
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Erro ao validar token ou carregar usuário:', error);
          localStorage.removeItem('authToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};