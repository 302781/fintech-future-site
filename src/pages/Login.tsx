import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from 'src/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Agora importamos 'signUp' do useAuth
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user) {
      navigate('/cursos');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validação básica no frontend
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos para fazer login.');
      setIsLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      // O navigate('/cursos') e o toast.success já são tratados dentro de signIn no AuthContext
    } catch (err: unknown) {
      // Erro já tratado e tostado no AuthContext
      console.error("Erro capturado na UI de Login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('registerEmail') as string;
    const password = formData.get('registerPassword') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    // O campo 'phone' está presente no formulário, mas não é enviado para o backend no modelo atual.
    // Se precisar dele, o backend e o `signUp` no AuthContext/sqliteClient precisarão ser atualizados.
    // const phone = formData.get('phone') as string; 

    // Validações básicas no frontend para o cadastro
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
    // Adicione mais validações de senha (números, símbolos, etc.) se desejar

    try {
      // Chamada para a função signUp do AuthContext
      await signUp(email, password, firstName, lastName);
      // O navigate('/cursos') e o toast.success/error já são tratados dentro de signUp no AuthContext
    } catch (err: unknown) {
      // Erro já tratado e tostado no AuthContext
      console.error("Erro capturado na UI de Cadastro:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen fintech-gradient">
      <Navigation />

      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Bem-vindo de volta!
                  </CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para acessar sua conta
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

                    <Button
                      type="submit"
                      className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        Google
                      </Button>
                      <Button variant="outline" className="w-full">
                        Apple
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Crie sua conta
                  </CardTitle>
                  <CardDescription>
                    Junte-se à FinTech e transforme sua vida financeira
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
                          className="mt-1"
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
                          className="mt-1"
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
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        // Removi 'required' aqui, pois o backend atual não usa o telefone no signup.
                        // Se for necessário no futuro, adicione 'required' e atualize o backend.
                        className="mt-1"
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
                      {/* 1. Adicionamos um ID único ao input */}
                      <input
                        id="termos-privacidade-checkbox" // ID único para o checkbox
                        type="checkbox"
                        required
                        className="mt-1"
                      />
                      {/* 2. Envolvemos o texto em um <label> e o associamos ao input pelo 'htmlFor' */}
                      <label htmlFor="termos-privacidade-checkbox" className="text-sm text-gray-600 cursor-pointer">
                        Aceito os{' '}
                        <a href="#" className="text-[#1A247E] hover:underline">
                          Termos de Uso
                        </a>{' '}
                        e{' '}
                        <a href="#" className="text-[#1A247E] hover:underline">
                          Política de Privacidade
                        </a>
                      </label>
                    </div>

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

          {/* Security Features */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-center text-white">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">100% Seguro</h3>
              <p className="text-sm text-blue-100">
                Seus dados estão protegidos com criptografia de nível bancário
              </p>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-4 text-white">
              <div className="flex items-center text-xs">
                <Lock className="w-4 h-4 mr-1" />
                SSL 256-bit
              </div>
              <div className="text-xs">ISO 27001</div>
              <div className="text-xs">LGPD Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;