import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'; 
import { useAuth } from '@/hooks/useAuth'; 
import { Loader2, Mail, Lock, UserPlus } from 'lucide-react';
import { toast } from 'sonner'; 

const signUpSchema = z.object({
  firstName: z.string().min(1, 'O nome é obrigatório.'),
  lastName: z.string().min(1, 'O sobrenome é obrigatório.'),
  email: z.string().email('O e-mail fornecido é inválido.').min(1, 'O e-mail é obrigatório.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSignIn: () => void;
  onSignUpSuccess?: () => void;
}

export const SignUpForm = ({ onSignIn, onSignUpSuccess }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const {
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset, 
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), 
    mode: 'onBlur', 
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true); 
    try {
      const result = await signUp(data.email, data.password); 

      if (result.success) { 
        toast.success('Cadastro realizado com sucesso! Bem-vindo(a)!');
        reset(); 
        onSignUpSuccess?.(); 
      } else {
        toast.error(result.error || 'Falha no cadastro. Tente novamente.', {
          description: 'Não foi possível criar sua conta. Verifique os dados.',
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado. Tente novamente.';
      console.error('Erro inesperado durante o cadastro:', error); 
      toast.error(errorMessage, {
        description: 'Não foi possível completar sua solicitação de cadastro.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 md:p-8 shadow-lg">
      <CardHeader className="text-center pb-6"> 
        <CardTitle className="text-3xl font-extrabold text-[#1A247E]"> 
          Crie sua conta
        </CardTitle>
        <CardDescription className="text-base text-gray-600 mt-2">
          Junte-se a nós e comece sua jornada!
        </CardDescription>
      </CardHeader>
      <CardContent>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
              <Mail className="w-5 h-5 text-gray-500" />
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              // Classe condicional para erro, usando cor de borda de erro do Shadcn (destructive)
              className={errors.email ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
              aria-invalid={!!errors.email} // Melhoria de acessibilidade: converter para boolean explícito
              aria-describedby={errors.email ? 'email-error' : undefined} // Melhoria de acessibilidade
              disabled={isLoading} // Desabilitar inputs durante o carregamento
            />
            {errors.email && (
              // ID para aria-describedby e role="alert" para acessibilidade
              <p id="email-error" role="alert" className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo de Senha */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 font-medium">
              <Lock className="w-5 h-5 text-gray-500" />
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              disabled={isLoading}
            />
            {errors.password && (
              <p id="password-error" role="alert" className="text-sm text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
             <p className="text-xs text-gray-500 mt-1">
              Mínimo 6 caracteres
            </p>
          </div>

          {/* Campo de Confirmação de Senha */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-700 font-medium">
              <Lock className="w-5 h-5 text-gray-500" />
              Confirmar Senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" role="alert" className="text-sm text-destructive mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botão de Submissão */}
          <Button
            type="submit"
            // Usando as cores que parecem ser o azul principal do seu projeto.
            className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-white text-lg py-3 rounded-md transition-colors duration-200"
            disabled={isLoading}
            aria-label={isLoading ? 'Criando conta...' : 'Criar sua conta'}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> {/* Ícone maior */}
                Criando conta...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" /> {/* Ícone maior */}
                Criar conta
              </>
            )}
          </Button>

          {/* Link para Login */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 mt-2">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={onSignIn}
                disabled={isLoading} 
                className="text-[#1A247E] hover:underline font-medium transition-colors duration-200" // Cor direta
                aria-label="Ir para a página de login" // Melhoria de acessibilidade
              >
                Faça login
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};