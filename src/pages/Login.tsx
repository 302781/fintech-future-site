
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login realizado com sucesso!');
    }, 2000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular cadastro
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Conta criada com sucesso! Verifique seu email.');
    }, 2000);
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
                      <a href="#" className="text-sm text-[#1A247E] hover:underline">
                        Esqueceu a senha?
                      </a>
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
                        type="tel"
                        placeholder="(11) 99999-9999"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="registerPassword">Senha</Label>
                      <div className="relative mt-1">
                        <Input
                          id="registerPassword"
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
                      <input type="checkbox" required className="mt-1" />
                      <span className="text-sm text-gray-600">
                        Aceito os{' '}
                        <a href="#" className="text-[#1A247E] hover:underline">
                          Termos de Uso
                        </a>{' '}
                        e{' '}
                        <a href="#" className="text-[#1A247E] hover:underline">
                          Política de Privacidade
                        </a>
                      </span>
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
