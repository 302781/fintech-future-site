import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Importe useLocation
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContextHook';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // Manter para feedback direto no formulário, se quiser
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Hook para acessar a URL atual

  // Obter o caminho de redirecionamento da URL (ex: /login?redirect=/dashboard)
  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/dashboard';

  // Redirecionar se já estiver logado OU após login/cadastro bem-sucedido
  useEffect(() => {
    // Só redireciona se o usuário JÁ ESTIVER logado e não estiver em um estado de loading
    // Isso evita redirecionamentos indesejados durante o processo de autenticação
    if (user && !isLoading) {
      toast.success('Você já está logado!'); // Mensagem para feedback
      navigate(redirectPath, { replace: true }); // Redireciona para o caminho desejado
    }
  }, [user, isLoading, navigate, redirectPath]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Limpa erros anteriores

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos para fazer login.');
      setIsLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      // Se o login for bem-sucedido, o useEffect acima cuidará do redirecionamento
      toast.success('Login realizado com sucesso!');
    } catch (err: unknown) {
      const errorMessage = (err as Error).message || 'Falha no login. Verifique suas credenciais.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Erro capturado na UI de Login:", err);
    } finally {
      setIsLoading(false); // Garante que o loading seja desativado em caso de erro
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Limpa erros anteriores

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('registerEmail') as string;
    const password = formData.get('registerPassword') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    if (!email || !password || !firstName || !lastName) {
      toast.error('Por favor, preencha todos os campos obrigatórios para o cadastro.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      await signUp(email, password, firstName, lastName);
      // Se o cadastro for bem-sucedido, o useEffect acima cuidará do redirecionamento
      toast.success('Cadastro realizado com sucesso! Bem-vindo(a)!');
    } catch (err: unknown) {
      const errorMessage = (err as Error).message || 'Falha no cadastro. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Erro capturado na UI de Cadastro:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* A navegação já não tem o botão de login, então não há problema em mantê-la aqui */}
      <Navigation /> 
      <div className="w-full max-w-md mt-8">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>

          {/* Login */}
          <TabsContent value="login">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</CardTitle>
                <CardDescription>
                    {/* Mensagem customizada para usuários que acabaram de pagar */}
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
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">Lembrar-me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-[#1A247E] hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>} {/* Exibe erro */}

                  <Button
                    type="submit"
                    className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register */}
          <TabsContent value="register">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Crie sua conta</CardTitle>
                <CardDescription>
                    {/* Mensagem customizada para usuários que acabaram de pagar */}
                    {location.search.includes('redirect') 
                        ? 'Crie sua conta para ativar seu novo plano!' 
                        : 'Junte-se à FinTech e transforme sua vida financeira'
                    }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="João"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Silva"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input
                      id="registerEmail"
                      name="registerEmail"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <Label htmlFor="registerPassword">Senha</Label>
                    <div className="relative mt-1">
                      <Input
                        id="registerPassword"
                        name="registerPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma senha forte"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 8 caracteres com letras, números e símbolos
                    </p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      id="termos-privacidade-checkbox"
                      type="checkbox"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="termos-privacidade-checkbox" className="text-sm text-gray-600 cursor-pointer">
                      Aceito os{' '}
                      <a href="#" className="text-[#1A247E] hover:underline">Termos de Uso</a> e{' '}
                      <a href="#" className="text-[#1A247E] hover:underline">Política de Privacidade</a>
                    </label>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>} {/* Exibe erro */}

                  <Button
                    type="submit"
                    className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar conta"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Security Features */}
      <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md text-white">
        <div className="text-center">
          <Shield className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-semibold mb-1">100% Seguro</h3>
          <p className="text-sm text-blue-100">
            Seus dados estão protegidos com criptografia de nível bancário
          </p>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center text-xs">
            <Lock className="w-4 h-4 mr-1" />
            SSL 256-bit
          </div>
          <div className="text-xs">ISO 27001</div>
          <div className="text-xs">LGPD Compliant</div>
        </div>
      </div>
    </div>
  );
};

export default Login;