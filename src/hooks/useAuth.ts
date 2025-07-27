// useAuth.ts (Frontend - React)
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast'; // Assumindo o mesmo toast de shadcn/ui

// Definir tipos para o usuário (pode ser mais detalhado com base no seu backend)
interface User {
  id: string;
  email: string;
  // Outras propriedades do usuário que seu backend retorna no login/registro
}

// Tipo de retorno padrão para operações de autenticação
interface AuthResult {
  success: boolean;
  error: string | null;
  user?: User | null; // Opcional, para login/registro bem-sucedidos
}

// Tipo para a resposta de erro da sua API (assumindo um formato JSON com "message")
interface ApiErrorResponse {
  message: string;
  // Outros campos de erro que sua API possa retornar
}

// URL base da sua API de autenticação
const API_BASE_URL = '/api/auth'; // Exemplo: seu servidor rodando em /api/auth

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Função auxiliar para lidar com as respostas da API e exibir toasts
  const handleApiResponse = async (response: Response, defaultErrorMessage: string): Promise<AuthResult> => {
    try {
      const data: ApiErrorResponse | User = await response.json(); // Tenta parsear como erro ou como User
      
      if (!response.ok) {
        // Se a resposta não for OK, assumimos que é um erro com uma mensagem
        const errorMessage = (data as ApiErrorResponse).message || defaultErrorMessage;
        toast({
          title: "Erro de Autenticação",
          description: errorMessage,
          variant: "destructive"
        });
        return { success: false, error: errorMessage };
      }
      // Se a resposta for OK, assumimos que é um sucesso e pode conter dados de usuário
      return { success: true, error: null, user: data as User };
    } catch (parseError) {
      // Se não for possível parsear o JSON ou ocorrer outro erro inesperado
      console.error("Erro ao processar resposta da API:", parseError);
      toast({
        title: "Erro de Comunicação",
        description: `Não foi possível processar a resposta do servidor: ${defaultErrorMessage}`,
        variant: "destructive"
      });
      return { success: false, error: `Erro de formato da resposta: ${defaultErrorMessage}` };
    }
  };

  // --- Efeito para verificar o status de login inicial ---
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Se você usa JWT
          },
        });

        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
        } else {
          // Se não estiver OK (ex: 401 Unauthorized), o usuário não está logado
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao verificar status de autenticação:", error);
        // Em caso de erro de rede ou similar, consideramos que o usuário não está logado
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // --- Funções de Autenticação (Comunicam com o Backend) ---

  const signUp = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await handleApiResponse(response, "Não foi possível realizar o cadastro.");
      if (result.success) {
        toast({
          title: "Cadastro realizado!",
          description: "Sua conta foi criada. Você pode fazer login agora."
        });
      }
      return result;
    } catch (err: unknown) { // Use 'unknown' para erros no catch
      const errorMessage = err instanceof Error ? err.message : "Erro inesperado ao cadastrar.";
      toast({ title: "Erro no cadastro", description: errorMessage, variant: "destructive" });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await handleApiResponse(response, "Credenciais inválidas ou erro no login.");
      if (result.success && result.user) {
        setUser(result.user);
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!"
        });
        // Se usar JWT, armazene o token aqui: localStorage.setItem('authToken', (result.user as any).token); // Ajuste se seu User tiver um token
      }
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro inesperado ao fazer login.";
      toast({ title: "Erro no login", description: errorMessage, variant: "destructive" });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<AuthResult> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
      });

      const result = await handleApiResponse(response, "Não foi possível sair da conta.");
      if (result.success) {
        setUser(null);
        // localStorage.removeItem('authToken');
        toast({
          title: "Logout realizado!",
          description: "Até logo!"
        });
      }
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro inesperado ao sair.";
      toast({ title: "Erro ao sair", description: errorMessage, variant: "destructive" });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await handleApiResponse(response, "Não foi possível enviar o e-mail de recuperação.");
      if (result.success) {
        toast({
          title: "E-mail enviado!",
          description: "Verifique sua caixa de entrada para redefinir a senha."
        });
      }
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro inesperado ao solicitar a redefinição de senha.";
      toast({ title: "Erro ao enviar e-mail", description: errorMessage, variant: "destructive" });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePassword = useCallback(async (token: string, newPassword: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await handleApiResponse(response, "Não foi possível redefinir sua senha.");
      if (result.success) {
        toast({ title: "Senha redefinida!", description: "Sua senha foi atualizada com sucesso. Você pode fazer login." });
      }
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro inesperado ao redefinir a senha.";
      toast({ title: "Erro ao redefinir senha", description: errorMessage, variant: "destructive" });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  };
};