import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Shield, Lock, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContextHook';

const loginSchema = z.object({
  email: z.string().email('O e-mail fornecido é inválido.').min(1, 'O e-mail é obrigatório.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

const registerSchema = z.object({
  firstName: z.string().min(1, 'O nome é obrigatório.'),
  lastName: z.string().min(1, 'O sobrenome é obrigatório.'),
  registerEmail: z.string().email('O e-mail fornecido é inválido.').min(1, 'O e-mail é obrigatório.'),
  phone: z.string().optional(),
  registerPassword: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  confirmPassword: z.string().min(1, 'Confirme sua senha.'),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos de uso e a política de privacidade.',
  }),
}).refine((data) => data.registerPassword === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
});


type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = useMemo(() => {
    return new URLSearchParams(location.search).get('redirect') || '/cursos';
  }, [location.search]);

  useEffect(() => {
    if (user && !isLoading) {
      toast.success('Você já está logado!');
      navigate(redirectPath, { replace: true });
    }
  }, [user, isLoading, navigate, redirectPath]);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegisterForm,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmitLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn(data.email, data.password);

      if (result.success) {
        toast.success('Login realizado com sucesso!');
        resetLoginForm();
      } else {
        toast.error(result.error || 'Credenciais inválidas. Tente novamente.', {
          description: 'Verifique seu e-mail e senha, ou tente novamente mais tarde.',
        });
      }
    } catch (err: unknown) {
      const errorMessage = (err instanceof Error) ? err.message : 'Ocorreu um erro inesperado. Tente novamente.';
      console.error('Erro inesperado durante o login:', err);
      toast.error(errorMessage, {
        description: 'Não foi possível completar sua solicitação de login.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const result = await signUp(
        data.registerEmail,
        data.registerPassword,
        data.firstName,
        data.lastName
      );

      if (result.success) {
        toast.success('Cadastro realizado com sucesso! Bem-vindo(a)!');
        resetRegisterForm();
        setActiveTab('login');
      } else {
        toast.error(result.error || 'Falha no cadastro. Tente novamente.', {
          description: 'Por favor, verifique os dados e tente novamente.',
        });
      }
    } catch (err: unknown) {
      const errorMessage = (err instanceof Error) ? err.message : 'Ocorreu um erro inesperado ao cadastrar.';
      console.error('Erro inesperado durante o cadastro:', err);
      toast.error(errorMessage, {
        description: 'Não foi possível completar sua solicitação de cadastro.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 pattern-dots-md pattern-blue-100 pattern-opacity-50">
      <Navigation />
      <div className="w-full max-w-md mt-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-200 rounded-lg shadow-inner">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-[#1A247E] data-[state=active]:text-white transition-all duration-200"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-[#1A247E] data-[state=active]:text-white transition-all duration-200"
            >
              Cadastrar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl p-6 md:p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-extrabold text-gray-900">Bem-vindo de volta!</CardTitle>
                <CardDescription className="text-base text-gray-600 mt-2">
                  {location.search.includes('redirect')
                    ? 'Entre para acessar seu novo plano!'
                    : 'Entre com suas credenciais para acessar sua conta.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoginSubmit(onSubmitLogin)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Mail className="w-5 h-5 text-gray-500" />
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...registerLogin('email')}
                      className={loginErrors.email ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                      aria-invalid={!!loginErrors.email}
                      aria-describedby={loginErrors.email ? 'email-login-error' : undefined}
                      disabled={isLoading}
                    />
                    {loginErrors.email && (
                      <p id="email-login-error" role="alert" className="text-sm text-destructive mt-1">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Lock className="w-5 h-5 text-gray-500" />
                      Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...registerLogin('password')}
                        className={loginErrors.password ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                        aria-invalid={!!loginErrors.password}
                        aria-describedby={loginErrors.password ? 'password-login-error' : undefined}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p id="password-login-error" role="alert" className="text-sm text-destructive mt-1">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="remember-me" className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input id="remember-me" type="checkbox" className="mr-2 accent-[#1A247E]" disabled={isLoading} />
                      <span>Lembrar-me</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#1A247E] hover:underline transition-colors duration-200"
                      tabIndex={isLoading ? -1 : 0}
                      aria-disabled={isLoading}
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-white text-lg py-3 rounded-md transition-colors duration-200"
                    disabled={isLoading}
                    aria-label={isLoading ? 'Entrando na sua conta...' : 'Entrar na sua conta'}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl p-6 md:p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-extrabold text-gray-900">Crie sua conta</CardTitle>
                <CardDescription className="text-base text-gray-600 mt-2">
                  {location.search.includes('redirect')
                    ? 'Crie sua conta para ativar seu novo plano!'
                    : 'Junte-se à FinTech e transforme sua vida financeira.'
                  }
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleRegisterSubmit(onSubmitRegister)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">Nome</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="João"
                        {...registerRegister('firstName')}
                        className={registerErrors.firstName ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                        aria-invalid={!!registerErrors.firstName}
                        aria-describedby={registerErrors.firstName ? 'first-name-error' : undefined}
                        disabled={isLoading}
                      />
                      {registerErrors.firstName && (
                        <p id="first-name-error" role="alert" className="text-sm text-destructive mt-1">
                          {registerErrors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">Sobrenome</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Silva"
                        {...registerRegister('lastName')}
                        className={registerErrors.lastName ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                        aria-invalid={!!registerErrors.lastName}
                        aria-describedby={registerErrors.lastName ? 'last-name-error' : undefined}
                        disabled={isLoading}
                      />
                      {registerErrors.lastName && (
                        <p id="last-name-error" role="alert" className="text-sm text-destructive mt-1">
                          {registerErrors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Mail className="w-5 h-5 text-gray-500" />
                      E-mail
                    </Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="seu@email.com"
                      {...registerRegister('registerEmail')}
                      className={registerErrors.registerEmail ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                      aria-invalid={!!registerErrors.registerEmail}
                      aria-describedby={registerErrors.registerEmail ? 'email-register-error' : undefined}
                      disabled={isLoading}
                    />
                    {registerErrors.registerEmail && (
                      <p id="email-register-error" role="alert" className="text-sm text-destructive mt-1">
                        {registerErrors.registerEmail.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Telefone (Opcional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(DD) 9XXXX-XXXX"
                      {...registerRegister('phone')}
                      className={registerErrors.phone ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                      aria-invalid={!!registerErrors.phone}
                      aria-describedby={registerErrors.phone ? 'phone-error' : undefined}
                      disabled={isLoading}
                    />
                    {registerErrors.phone && (
                      <p id="phone-error" role="alert" className="text-sm text-destructive mt-1">
                        {registerErrors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerPassword" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Lock className="w-5 h-5 text-gray-500" />
                      Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="registerPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Crie uma senha forte"
                        {...registerRegister('registerPassword')}
                        className={registerErrors.registerPassword ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                        aria-invalid={!!registerErrors.registerPassword}
                        aria-describedby={registerErrors.registerPassword ? 'password-register-error' : undefined}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {registerErrors.registerPassword && (
                      <p id="password-register-error" role="alert" className="text-sm text-destructive mt-1">
                        {registerErrors.registerPassword.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 8 caracteres
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Lock className="w-5 h-5 text-gray-500" />
                      Confirme sua Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        {...registerRegister('confirmPassword')}
                        className={registerErrors.confirmPassword ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E]'}
                        aria-invalid={!!registerErrors.confirmPassword}
                        aria-describedby={registerErrors.confirmPassword ? 'confirm-password-error' : undefined}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {registerErrors.confirmPassword && (
                      <p id="confirm-password-error" role="alert" className="text-sm text-destructive mt-1">
                        {registerErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>


                  <div className="flex items-start space-x-2">
                    <input
                      id="termsAccepted"
                      type="checkbox"
                      {...registerRegister('termsAccepted')}
                      className={`mt-1 accent-[#1A247E] ${registerErrors.termsAccepted ? 'border-destructive' : ''}`}
                      aria-invalid={!!registerErrors.termsAccepted}
                      aria-describedby={registerErrors.termsAccepted ? 'terms-error' : undefined}
                      disabled={isLoading}
                    />
                    <label htmlFor="termsAccepted" className="text-sm text-gray-600 cursor-pointer">
                      Aceito os{' '}
                      <a href="#" className="text-[#1A247E] hover:underline" aria-label="Termos de Uso (abre em nova aba)" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e{' '}
                      <a href="#" className="text-[#1A247E] hover:underline" aria-label="Política de Privacidade (abre em nova aba)" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
                    </label>
                  </div>
                  {registerErrors.termsAccepted && (
                    <p id="terms-error" role="alert" className="text-sm text-destructive text-center">{registerErrors.termsAccepted.message}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-white text-lg py-3 rounded-md transition-colors duration-200"
                    disabled={isLoading}
                    aria-label={isLoading ? 'Criando conta...' : 'Criar sua conta'}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      'Criar conta'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full max-w-2xl mt-12 mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl text-white text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-10 h-10 mr-3 text-white" />
          <h2 className="text-4xl font-extrabold">100% Seguro</h2>
        </div>
        <p className="text-lg md:text-xl text-blue-100 mb-6 px-4">
          Seus dados estão protegidos com criptografia de nível bancário.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-blue-200 text-lg md:text-xl font-semibold">
          <span className="flex items-center gap-1">
            <Lock className="w-4 h-4" /> SSL 256-bit
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-4 h-4" /> ISO 27001
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-4 h-4" /> LGPD Compliant
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;