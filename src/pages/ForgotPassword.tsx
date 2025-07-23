
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error('Erro ao solicitar redefinição: ' + (result.error || 'Erro desconhecido'));
      } else {
        toast.success('Se existir uma conta com este e-mail, um link de redefinição será enviado.');
      }
    } catch (error) {
      toast.error('Erro ao solicitar redefinição: ' + (error as Error).message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen fintech-gradient">
      <Navigation />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Esqueceu a Senha?
            </CardTitle>
            <CardDescription>
              Digite seu e-mail para receber um link para redefinir sua senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar link de redefinição"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <Link to="/login" className="text-[#1A247E] hover:underline">
                Voltar para o Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
