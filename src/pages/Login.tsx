import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Shield, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContextHook';

// --- Interfaces para Tipagem ---
interface LoginFormFields {
  email: string;
  password: string;
}

interface RegisterFormFields {
  firstName: string;
  lastName: string;
  registerEmail: string;
  phone: string;
  registerPassword: string;
  termsAccepted: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  registerEmail?: string;
  phone?: string;
  registerPassword?: string;
  termsAccepted?: string;
  general?: string; // Para erros gerais não atrelados a um campo específico
}

// --- Componente Login ---
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estados dos formulários
  const [loginForm, setLoginForm] = useState<LoginFormFields>({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState<RegisterFormFields>({
    firstName: '',
    lastName: '',
    registerEmail: '',
    phone: '',
    registerPassword: '',
    termsAccepted: false,
  });

  // Estados de erro para validação
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [registerErrors, setRegisterErrors] = useState<FormErrors>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obter o caminho de redirecionamento da URL (ex: /login?redirect=/dashboard)
  const redirectPath = useMemo(() => {
    return new URLSearchParams(location.search).get('redirect') || '/cursos'; // Redireciona para /cursos por padrão
  }, [location.search]);

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user && !isLoading) {
      toast.success('Você já está logado!');
      navigate(redirectPath, { replace: true });
    }
  }, [user, isLoading, navigate, redirectPath]);

  // Handlers de mudança para os inputs
  const handleLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [id]: value }));
    setLoginErrors((prev) => ({ ...prev, [id]: undefined })); // Limpa o erro ao digitar
  }, []);

  const handleRegisterChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setRegisterForm((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    setRegisterErrors((prev) => ({ ...prev, [id]: undefined })); // Limpa o erro ao digitar
  }, []);

  // --- Funções de Validação ---
  const validateLoginForm = useCallback(() => {
    const errors: FormErrors = {};
    if (!loginForm.email) {
      errors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
      errors.email = 'E-mail inválido.';
    }
    if (!loginForm.password) {
      errors.password = 'A senha é obrigatória.';
    }
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  }, [loginForm]);

  const validateRegisterForm = useCallback(() => {
    const errors: FormErrors = {};
    if (!registerForm.firstName) errors.firstName = 'O nome é obrigatório.';
    if (!registerForm.lastName) errors.lastName = 'O sobrenome é obrigatório.';
    if (!registerForm.registerEmail) {
      errors.registerEmail = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.registerEmail)) {
      errors.registerEmail = 'E-mail inválido.';
    }
    if (!registerForm.registerPassword) {
      errors.registerPassword = 'A senha é obrigatória.';
    } else if (registerForm.registerPassword.length < 8) {
      errors.registerPassword = 'A senha deve ter no mínimo 8 caracteres.';
    }
    // Validação de termos de privacidade
    if (!registerForm.termsAccepted) {
      errors.termsAccepted = 'Você deve aceitar os termos de uso e a política de privacidade.';
    }

    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  }, [registerForm]);

  // --- Handlers de Submissão ---
  const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginErrors({}); // Limpa erros anteriores
    setRegisterErrors({}); // Limpa erros de registro também, para evitar confusão

    if (!validateLoginForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn(loginForm.email, loginForm.password);

      if (!result) {
        setLoginErrors(prev => ({ ...prev, general: 'Falha no login. Verifique suas credenciais.' }));
        toast.error('Falha no login. Verifique suas credenciais.');
        console.error("Erro no login: Falha no login. Verifique suas credenciais.");
      } else {
        toast.success('Login realizado com sucesso!');
        // O useEffect acima cuidará do redirecionamento
      }
    } catch (err: unknown) {
      const errorMessage = (err instanceof Error) ? err.message : 'Erro inesperado ao fazer login.';
      setLoginErrors(prev => ({ ...prev, general: errorMessage }));
      toast.error(errorMessage);
      console.error("Erro capturado na UI de Login:", err);
    } finally {
      setIsLoading(false);
    }
  }, [loginForm, validateLoginForm, signIn]);

  const handleRegister = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterErrors({}); // Limpa erros anteriores
    setLoginErrors({}); // Limpa erros de login também

    if (!validateRegisterForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(
        registerForm.registerEmail,
        registerForm.registerPassword,
        registerForm.firstName,
        registerForm.lastName
      );

      if (!result) {
        setRegisterErrors(prev => ({ ...prev, general: 'Falha no cadastro. Tente novamente.' }));
        toast.error('Falha no cadastro. Tente novamente.');
        console.error("Erro no cadastro: Falha no cadastro. Tente novamente.");
      } else {
        toast.success('Cadastro realizado com sucesso! Bem-vindo(a)!');
        // Opcional: Mudar para a aba de login após o cadastro bem-sucedido
        // setCurrentTab('login'); // Se você tiver um estado para a aba atual
      }
    } catch (err: unknown) {
      const errorMessage = (err instanceof Error) ? err.message : 'Erro inesperado ao cadastrar.';
      setRegisterErrors(prev => ({ ...prev, general: errorMessage }));
      toast.error(errorMessage);
      console.error("Erro capturado na UI de Cadastro:", err);
    } finally {
      setIsLoading(false);
    }
  }, [registerForm, validateRegisterForm, signUp]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 pattern-dots-md pattern-blue-100 pattern-opacity-50">
      <Navigation />
      <div className="w-full max-w-md mt-8">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>

          {/* Login */}
          <TabsContent value="login">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</CardTitle>
                <CardDescription>
                  {location.search.includes('redirect')
                    ? 'Entre para acessar seu novo plano!'
                    : 'Entre com suas credenciais para acessar sua conta'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                      className={`mt-1 ${loginErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      aria-invalid={Boolean(loginErrors.email)}
                      aria-describedby={loginErrors.email ? "email-login-error" : undefined}
                    />
                    {loginErrors.email && <p id="email-login-error" className="text-red-500 text-sm mt-1">{loginErrors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        required
                        className={`mt-1 ${loginErrors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                        aria-invalid={!!loginErrors.password}
                        aria-describedby={loginErrors.password ? "password-login-error" : undefined}
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
                    {loginErrors.password && <p id="password-login-error" className="text-red-500 text-sm mt-1">{loginErrors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="mr-2 accent-[#1A247E]" />
                      <span>Lembrar-me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-[#1A247E] hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>

                  {loginErrors.general && <p className="text-red-500 text-sm text-center">{loginErrors.general}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                    disabled={isLoading}
                    aria-label={isLoading ? "Entrando..." : "Entrar na sua conta"}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register */}
          <TabsContent value="register">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Crie sua conta</CardTitle>
                <CardDescription>
                  {location.search.includes('redirect')
                    ? 'Crie sua conta para ativar seu novo plano!'
                    : 'Junte-se à FinTech e transforme sua vida financeira'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="João"
                        value={registerForm.firstName}
                        onChange={handleRegisterChange}
                        required
                        className={registerErrors.firstName ? 'border-red-500 focus:ring-red-500' : ''}
                        aria-invalid={!!registerErrors.firstName}
                        aria-describedby={registerErrors.firstName ? "first-name-error" : undefined}
                      />
                      {registerErrors.firstName && <p id="first-name-error" className="text-red-500 text-sm mt-1">{registerErrors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Silva"
                        value={registerForm.lastName}
                        onChange={handleRegisterChange}
                        required
                        className={registerErrors.lastName ? 'border-red-500 focus:ring-red-500' : ''}
                        aria-invalid={!!registerErrors.lastName}
                        aria-describedby={registerErrors.lastName ? "last-name-error" : undefined}
                      />
                      {registerErrors.lastName && <p id="last-name-error" className="text-red-500 text-sm mt-1">{registerErrors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input
                      id="registerEmail"
                      name="registerEmail"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerForm.registerEmail}
                      onChange={handleRegisterChange}
                      required
                      className={registerErrors.registerEmail ? 'border-red-500 focus:ring-red-500' : ''}
                      aria-invalid={!!registerErrors.registerEmail}
                      aria-describedby={registerErrors.registerEmail ? "email-register-error" : undefined}
                    />
                    {registerErrors.registerEmail && <p id="email-register-error" className="text-red-500 text-sm mt-1">{registerErrors.registerEmail}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={registerForm.phone}
                      onChange={handleRegisterChange}
                      className={registerErrors.phone ? 'border-red-500 focus:ring-red-500' : ''}
                      aria-invalid={!!registerErrors.phone}
                      aria-describedby={registerErrors.phone ? "phone-error" : undefined}
                    />
                    {registerErrors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{registerErrors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="registerPassword">Senha</Label>
                    <div className="relative mt-1">
                      <Input
                        id="registerPassword"
                        name="registerPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma senha forte"
                        value={registerForm.registerPassword}
                        onChange={handleRegisterChange}
                        required
                        className={registerErrors.registerPassword ? 'border-red-500 focus:ring-red-500' : ''}
                        aria-invalid={!!registerErrors.registerPassword}
                        aria-describedby={registerErrors.registerPassword ? "password-register-error" : undefined}
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
                    {registerErrors.registerPassword && <p id="password-register-error" className="text-red-500 text-sm mt-1">{registerErrors.registerPassword}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 8 caracteres com letras, números e símbolos
                    </p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      id="termos-privacidade-checkbox"
                      name="termsAccepted"
                      type="checkbox"
                      checked={registerForm.termsAccepted}
                      onChange={handleRegisterChange}
                      required
                      className={`mt-1 accent-[#1A247E] ${registerErrors.termsAccepted ? 'border-red-500' : ''}`}
                      aria-invalid={registerErrors.termsAccepted ? "true" : "false"}
                      aria-describedby={registerErrors.termsAccepted ? 'terms-error' : undefined}
                    />
                    <label htmlFor="termos-privacidade-checkbox" className="text-sm text-gray-600 cursor-pointer">
                      Aceito os{' '}
                      <a href="#" className="text-[#1A247E] hover:underline" aria-label="Termos de Uso (abre em nova aba)" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e{' '}
                      <a href="#" className="text-[#1A247E] hover:underline" aria-label="Política de Privacidade (abre em nova aba)" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
                    </label>
                  </div>
                  {registerErrors.termsAccepted && <p id="terms-error" className="text-red-500 text-sm text-center">{registerErrors.termsAccepted}</p>}


                  {registerErrors.general && <p className="text-red-500 text-sm text-center">{registerErrors.general}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                    disabled={isLoading}
                    aria-label={isLoading ? "Criando conta..." : "Criar sua conta"}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      "Criar conta"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Security Features */}
      <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md text-white border-t border-gray-200">
        <div className="text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 text-blue-300" />
          <h3 className="font-semibold mb-1 text-gray-800">100% Seguro</h3>
          <p className="text-sm text-gray-600">
            Seus dados estão protegidos com criptografia de nível bancário
          </p>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center text-xs text-gray-700">
            <Lock className="w-4 h-4 mr-1 text-gray-500" />
            SSL 256-bit
          </div>
          <div className="text-xs text-gray-700">ISO 27001</div>
          <div className="text-xs text-gray-700">LGPD Compliant</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
