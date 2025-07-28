// src/pages/ForgotPassword.tsx
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
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

// --- Schemas e Tipos ---
const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'O e-mail é obrigatório'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Removida a interface ForgotPasswordFormProps, pois o componente será autônomo
// e não receberá 'onBack' ou 'onSuccess' como props.

// --- Componente ForgotPassword ---
// Renomeado para 'ForgotPassword' para corresponder ao nome do arquivo e à exportação padrão
const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate(); // Inicializa o hook de navegação

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
        toast.success('Instruções de recuperação de senha enviadas para o seu e-mail!');
        reset();
        // Redireciona para a página de login após o sucesso, pois o fluxo de "esqueci a senha" geralmente leva de volta para o login.
        navigate('/login'); 
      } else {
        toast.error(result.error || 'Ocorreu um erro ao enviar as instruções. Tente novamente.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado. Tente novamente.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Recuperar senha
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail para receber as instruções de recuperação
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p role="alert" className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar instruções'
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')} // Usa navigate para voltar para a rota de login
                className="text-sm text-primary hover:underline flex items-center gap-1 mx-auto"
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