import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'O e-mail é obrigatório'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const result = await resetPassword(data.email);

      if (result.success) {
        toast.success('Instruções de recuperação de senha enviadas para o seu e-mail!', {
          description: 'Verifique sua caixa de entrada, spam ou lixo eletrônico.',
        });
        reset();
        navigate('/login');
      } else {
        toast.error(result.error || 'Ocorreu um erro ao enviar as instruções. Tente novamente.', {
          description: 'Verifique o e-mail digitado e sua conexão, ou tente novamente mais tarde.',
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado. Tente novamente.';
      console.error('Erro inesperado ao solicitar recuperação de senha:', error);
      toast.error(errorMessage, {
        description: 'Não foi possível completar a sua solicitação.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fintech-bg-dark py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto p-6 md:p-8 shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-4xl font-extrabold text-fintech-light-blue md:text-5xl">
            Recuperar Senha
          </CardTitle>
          <CardDescription className="text-base text-gray-600 mt-2">
            Digite seu e-mail para receber as instruções de recuperação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
                <Mail className="w-5 h-5 text-gray-500" />
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                className={errors.email ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (

                <p id="email-error" role="alert" className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-fintech-light-blue hover:bg-fintech-accent-blue text-white text-lg py-3 rounded-md transition-colors duration-200"
              disabled={isLoading}
              aria-label={isLoading ? 'Enviando instruções...' : 'Enviar instruções'}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar instruções'
              )}
            </Button>

            <div className="text-center pt-4"> {/* Espaçamento superior para separar do botão de envio */}
              <button
                type="button"
                onClick={() => navigate('/login')} // Usa navigate para voltar para a rota de login
                disabled={isLoading} // Desabilitar enquanto envia
                className="inline-flex items-center gap-2 text-sm text-[#1A247E] hover:underline transition-colors duration-200" // Cor direta, flexbox
                aria-label="Voltar para a tela de login" // Melhoria de acessibilidade
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword; // Exportação padrão final para a página