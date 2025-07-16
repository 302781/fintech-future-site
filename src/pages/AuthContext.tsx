// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@/lib/sqliteClient'; // Certifique-se de que este caminho está correto
import { toast } from 'sonner';

// A URL do seu backend Node.js
const sqliteClient = createClient(
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
);

// --- DEFINIÇÃO DAS INTERFACES PARA O USUÁRIO E SEU METADATA ---
interface UserMetadata {
  plan_type?: string;
  first_name?: string;
  last_name?: string;
}

interface CustomUser {
  id: string;
  email: string | null;
  user_metadata?: UserMetadata;
}

// O tipo de retorno esperado do signIn/signOut/getUser/signUp do seu sqliteClient (frontend)
interface AuthResponse {
  data: {
    user: CustomUser | null;
  };
  error: {
    message: string;
  } | null;
}

interface AuthContextType {
  user: CustomUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>; // Adicionado signUp
  signOut: () => Promise<void>;
  activateUserPlan: (planType: string) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error }: AuthResponse = await sqliteClient.auth.getUser();
      if (error) {
        console.error("Erro ao buscar usuário na inicialização:", error.message);
      }
      setUser(data.user); 
      setLoading(false);
    };

    fetchUser();

    // A callback precisa ser tipada para evitar 'any'
    const { data: authListener } = sqliteClient.auth.onAuthStateChange((_event: string, session: { user: CustomUser | null } | null) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error }: AuthResponse = await sqliteClient.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Erro ao fazer login:", error.message);
        toast.error(error.message || 'Erro ao fazer login. Tente novamente.');
        throw new Error(error.message || 'Erro de autenticação');
      }
      
      if (data.user) {
        setUser(data.user);
        toast.success('Login realizado com sucesso!');
        navigate('/cursos');
      } else {
        toast.error('Dados de usuário não retornados após o login.');
        throw new Error('Dados de usuário ausentes após o login.');
      }
    } catch (err: unknown) {
      let errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Erro inesperado no login:", err);
      if (!errorMessage.includes('Erro de autenticação')) {
        toast.error(errorMessage);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- NOVA FUNÇÃO: signUp ---
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    try {
      // Chama o método signUp do seu cliente SQLite customizado
      const { data, error }: AuthResponse = await sqliteClient.auth.signUp({ email, password, firstName, lastName });

      if (error) {
        console.error("Erro ao registrar:", error.message);
        toast.error(error.message || 'Erro ao criar conta. Tente novamente.');
        throw new Error(error.message || 'Erro de registro');
      }
      
      // Se o cadastro foi bem-sucedido, o backend já pode ter retornado o usuário
      if (data.user) {
          setUser(data.user);
          toast.success('Conta criada com sucesso! Você já está logado.');
          navigate('/cursos'); // Redireciona após o cadastro e login automático
      } else {
          // Caso o backend não retorne o user diretamente após o signup,
          // o usuário precisaria fazer login manualmente.
          // Por simplicidade aqui, assumimos que o backend retorna o user e já logamos.
          toast.success('Conta criada com sucesso! Por favor, faça login.');
          // Opcional: navegar para a aba de login ou para uma página de sucesso
      }

    } catch (err: unknown) {
      let errorMessage = 'Ocorreu um erro inesperado ao criar a conta.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Erro inesperado no cadastro:", err);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error }: AuthResponse = await sqliteClient.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error.message);
        toast.error(error.message || 'Erro ao fazer logout. Tente novamente.');
        throw new Error(error.message || 'Erro ao sair');
      }
      setUser(null);
      toast.success('Você foi desconectado.');
      navigate('/'); 
    } catch (err: unknown) {
      let errorMessage = 'Ocorreu um erro inesperado ao desconectar.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Erro inesperado no logout:", err);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const activateUserPlan = async (planType: string) => {
    if (!user || !user.id) {
        toast.error('Usuário não autenticado para ativar o plano.');
        return;
    }

    setLoading(true);
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/users/${user.id}/plan`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan_type: planType }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha ao atualizar o plano no backend.');
        }

        setUser((prevUser) => {
            if (!prevUser) return null; 
            return {
                ...prevUser,
                user_metadata: {
                    ...(prevUser.user_metadata || {}),
                    plan_type: planType, 
                },
            };
        });
        console.log(`Plano '${planType}' ativado para o usuário e backend atualizado.`);
        toast.success(`Plano atualizado para ${planType}!`);
    } catch (err: unknown) {
        let errorMessage = 'Erro ao atualizar plano: Tente novamente.';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        console.error("Erro ao ativar plano:", err);
        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, activateUserPlan }}> {/* Adicionado signUp ao value */}
      {loading ? <div>Carregando autenticação...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};