import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner'; // Assumindo que você usa Sonner para toasts/notificações

// --- Schemas e Tipos ---
const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'O e-mail é obrigatório'), // Adicionado validação de campo vazio
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBack: () => void;
  // Adicionado uma prop opcional para exibir uma mensagem de sucesso,
  // caso o componente pai precise reagir ao sucesso do reset de senha.
  onSuccess?: () => void;
}

// --- Componente ForgotPasswordForm ---
export const ForgotPasswordForm = ({ onBack, onSuccess }: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth(); // Assume que resetPassword lida com a lógica de backend e erros.

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Adicionado para limpar o formulário após o sucesso
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur', // Valida ao sair do campo, melhorando a UX
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const result = await resetPassword(data.email); // Assume que resetPassword retorna { success, error }
      if (result.success) {
        toast.success('Instruções de recuperação de senha enviadas para o seu e-mail!'); // Notificação de sucesso
        reset(); // Limpa o formulário após o envio bem-sucedido
        onSuccess?.(); // Chama a função onSuccess se ela for fornecida
      } else {
        toast.error(result.error || 'Ocorreu um erro ao enviar as instruções. Tente novamente.'); // Notificação de erro do hook
      }
    } catch (error: unknown) {
      // Captura erros inesperados que não foram tratados pelo hook useAuth
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado. Tente novamente.';
      toast.error(errorMessage); // Notificação de erro genérica
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''} // Adicionado estilo de foco
              aria-invalid={errors.email ? 'true' : 'false'} // Melhoria de acessibilidade
            />
            {errors.email && (
              <p role="alert" className="text-sm text-destructive"> {/* Adicionado role="alert" para acessibilidade */}
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
              onClick={onBack}
              className="text-sm text-primary hover:underline flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao login
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};