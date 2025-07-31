import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Adicionado Loader2 para o estado de carregamento
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContextHook';

// --- Interfaces para Tipagem ---
// Definir uma interface para o objeto de sessão esperado do seu useAuth
interface SessionUser {
  userId: string;
  email: string;
  // Adicione outras propriedades da sessão/usuário que seu useAuth possa retornar
  // Ex: firstName?: string;
}

// Interface para os erros de validação do formulário
interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

// --- Componente UpdatePassword ---
const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({}); // Estado para erros de validação

  const navigate = useNavigate();
  // Assume que useAuth retorna um objeto com 'user' (logado) ou 'session' (se for um objeto de sessão específico)
  // Se o seu useAuth retornar 'user', ajuste aqui para '{ user }'
  const { user } = useAuth(); // Usando 'user' como o objeto do usuário logado

  // Efeito para redirecionar se não houver usuário/sessão logada
  useEffect(() => {
    // Verifique se o usuário está autenticado. Se o seu useAuth usa 'session', use 'session' aqui.
    if (!user) {
      // Se não houver usuário, redirecione para a página de forgot-password
      // A lógica da página de forgot-password deveria enviar um email com um link de token
      // e o componente UpdatePassword deveria verificar esse token na URL para permitir a redefinição.
      // Atualmente, ele depende de 'session' estar ativo para um usuário já logado.
      // Para um cenário de redefinição de senha *sem login*, você precisaria extrair o token da URL
      // e validá-lo no backend.
      navigate('/forgot-password', { replace: true });
      toast.error('Sua sessão expirou ou o link é inválido/expirado. Solicite uma nova redefinição de senha.');
    }
  }, [user, navigate]);

  // Função para validar o formulário de senha
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};

    if (password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
    }
    // Adicionar validações mais complexas, se necessário (letras, números, símbolos)
    // Ex: if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}/.test(password)) {
    //   newErrors.password = 'A senha deve conter maiúsculas, minúsculas, números e símbolos.';
    // }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [password, confirmPassword]);

  // Handler para atualizar a senha
  const handleUpdatePassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Limpa erros anteriores

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Aqui, você chamaria a função do seu useAuth para atualizar a senha do usuário
      // Se o seu useAuth não tiver 'updatePasswordForUser', você precisaria
      // de um endpoint de API no seu backend para lidar com isso.
      // Ex: await useAuth().updatePasswordForUser(password); // Se existir no seu hook
      // Ou:
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Se precisar de autenticação para esta rota, inclua o token do usuário logado
          // 'Authorization': `Bearer ${user?.token}` // Exemplo, se o token estiver em 'user'
        },
        body: JSON.stringify({ userId: user?.id, email: user?.email, newPassword: password }),
      });

      const result = await response.json(); // Certifique-se de que sua API retorna um JSON

      if (!response.ok) {
        // Se a API retornar um erro, use a mensagem do erro da API
        const errorMessage = result.error || 'Erro desconhecido ao atualizar a senha.';
        toast.error('Erro ao atualizar a senha: ' + errorMessage);
        setErrors(prev => ({ ...prev, general: errorMessage })); // Exibir erro geral se não for específico de campo
        console.error("Erro da API ao atualizar senha:", result);
      } else {
        toast.success('Senha atualizada com sucesso! Você pode fazer login agora.');
        // Após a atualização bem-sucedida, você pode querer deslogar o usuário ou redirecioná-lo
        // para a página de login para que ele entre com a nova senha.
        // await useAuth().signOut(); // Opcional, se o token antigo precisar ser invalidado
        navigate('/login', { replace: true });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao atualizar a senha.';
      toast.error('Erro ao atualizar a senha: ' + errorMessage);
      setErrors(prev => ({ ...prev, general: errorMessage }));
      console.error("Erro no cliente ao atualizar senha:", error);
    } finally {
      setIsLoading(false);
    }
  }, [password, validateForm, navigate, user]); // Depende do user para enviar userId/email

  // Exibe uma mensagem se o usuário não estiver logado (ou se a sessão for inválida)
  if (!user) {
    return (
      <div className="min-h-screen fintech-gradient">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen pt-20 px-4">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Link Inválido ou Expirado</CardTitle>
              <CardDescription className="text-gray-600">
                Para redefinir sua senha, por favor, solicite um novo link.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/forgot-password">
                <Button className="bg-[#1A247E] hover:bg-[#2D4DE0]">Solicitar Novo Link</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Formulário de redefinição de senha
  return (
    <div className="min-h-screen fintech-gradient">
      <Navigation />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Redefinir Senha
            </CardTitle>
            <CardDescription className="text-gray-600">
              Crie uma nova senha para sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <Label htmlFor="new-password">Nova Senha</Label>
                <div className="relative mt-1">
                  <Input
                    id="new-password"
                    name="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua nova senha"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors(prev => ({ ...prev, password: undefined })); // Limpa o erro ao digitar
                    }}
                    className={errors.password ? "border-red-500 focus:ring-red-500" : ""}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme sua nova senha"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors(prev => ({ ...prev, confirmPassword: undefined })); // Limpa o erro ao digitar
                  }}
                  className={errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
                {errors.confirmPassword && <p id="confirm-password-error" className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

             <p className="text-xs text-gray-500 mt-1">
                Mínimo 8 caracteres.
              </p>
              {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>} {/* Exibe erro geral */}
              <Button
                type="submit"
                className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                disabled={isLoading}
                aria-label={isLoading ? "Atualizando senha..." : "Atualizar Senha"}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  "Atualizar Senha"
                )}
              </Button> 
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;
