
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from 'src/lib/db';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; 
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    // This component relies on the onAuthStateChange in AuthContext to handle
    // the PASSWORD_RECOVERY event and establish a session when the user
    // arrives from a password recovery link.
  }, [session]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }
    if (password.length < 8) {
        toast.error('A senha deve ter no mínimo 8 caracteres.');
        return;
    }

    setIsLoading(true);

    const { error } = await SQLite.auth.updateUser({ password });

    if (error) {
      toast.error('Erro ao atualizar a senha: ' + error.message);
    } else {
      toast.success('Senha atualizada com sucesso! Você pode fazer login agora.');
      await MySql.auth.signOut();
      navigate('/login');
    }

    setIsLoading(false);
  };

  if (!session) {
      return (
        <div className="min-h-screen fintech-gradient">
          <Navigation />
          <div className="flex items-center justify-center min-h-screen pt-20 px-4">
              <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm text-center">
                  <CardHeader>
                      <CardTitle>Link Inválido ou Expirado</CardTitle>
                      <CardDescription>Para redefinir sua senha, por favor, solicite um novo link.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Link to="/forgot-password">
                          <Button>Solicitar Novo Link</Button>
                      </Link>
                  </CardContent>
              </Card>
          </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen fintech-gradient">
      <Navigation />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Redefinir Senha
            </CardTitle>
            <CardDescription>
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
                        onChange={(e) => setPassword(e.target.value)}
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
              <div>
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirme sua nova senha"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Mínimo 8 caracteres.
              </p>
              <Button
                type="submit"
                className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                disabled={isLoading}
              >
                {isLoading ? "Atualizando..." : "Atualizar Senha"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;
