// src/contexts/AuthContext.tsx (apenas a parte relevante)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'; // Exemplo, se você usa Supabase

// Supondo que você já tem o supabaseClient configurado
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface AuthContextType {
  user: any; // Ajuste para o tipo de usuário real do Supabase ou sua autenticação
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  // Nova função para "ativar" o plano do usuário no contexto
  activateUserPlan: (planType: string) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setLoading(false);
    navigate('/'); // Redireciona para a home ou tela de login
  };

  // --- NOVA FUNÇÃO PARA ATIVAR O PLANO (SIMULAÇÃO) ---
  const activateUserPlan = (planType: string) => {
    if (user) {
      // Simula a atualização do metadata do usuário com o novo plano
      setUser((prevUser: any) => ({
        ...prevUser,
        user_metadata: {
          ...prevUser.user_metadata,
          plan_type: planType, // Define o novo plano
        },
      }));
      // Em uma aplicação real, você faria uma chamada ao backend para persistir isso
      // e o backend informaria a ativação do plano
      console.log(`Plano '${planType}' ativado para o usuário (simulação frontend).`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, activateUserPlan }}>
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