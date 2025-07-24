// src/pages/SecuritySettingsPage.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast"; // Para notificações
import { useAuth } from "@/contexts/AuthContextHook"; // Assumindo que você tem este hook

// Importe ícones se estiver usando lucide-react ou outra biblioteca de ícones
import { KeyRound, ShieldCheck, Monitor } from 'lucide-react';

const SecuritySettingsPage: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth(); // Para exibir informações do usuário ou proteger a rota
  
  // Estados para o formulário de mudança de senha
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Estado para 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false); // Simulação

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);

    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Erro ao alterar senha",
        description: "A nova senha e a confirmação não coincidem.",
        variant: "destructive",
      });
      setIsChangingPassword(false);
      return;
    }

    if (newPassword.length < 6) { // Exemplo de validação mínima
        toast({
            title: "Erro ao alterar senha",
            description: "A nova senha deve ter pelo menos 6 caracteres.",
            variant: "destructive",
        });
        setIsChangingPassword(false);
        return;
    }

    try {
      // TODO: Implementar a lógica de chamada da API para alterar a senha
      // Exemplo de como seria a requisição para o seu backend:
      // const response = await fetch('/api/change-password', { // Crie esta rota no seu backend!
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}` // Envie o token JWT
      //   },
      //   body: JSON.stringify({ currentPassword, newPassword }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.error || 'Falha ao alterar senha.');
      // }

      // const data = await response.json();
      
      // Simulação de sucesso
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      toast({
        title: "Sucesso!",
        description: "Sua senha foi alterada com sucesso.",
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      toast({
        title: "Erro ao alterar senha",
        description: error.message || "Não foi possível alterar sua senha. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleToggleTwoFactor = async (checked: boolean) => {
    // TODO: Implementar a lógica de chamada da API para ativar/desativar 2FA
    setTwoFactorEnabled(checked); // Atualiza imediatamente para feedback visual
    
    try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulação de API
        if (checked) {
            toast({
                title: "Autenticação de Dois Fatores",
                description: "2FA ativada com sucesso! Você precisará configurar um app autenticador.",
                variant: "default"
            });
            // Aqui você idealmente mostraria um QR Code para configurar o 2FA
        } else {
            toast({
                title: "Autenticação de Dois Fatores",
                description: "2FA desativada.",
                variant: "destructive"
            });
        }
    } catch (error) {
        toast({
            title: "Erro",
            description: "Não foi possível alterar a configuração de 2FA.",
            variant: "destructive"
        });
        setTwoFactorEnabled(!checked); // Reverte o estado em caso de erro na API
    }
  };

  // Dados simulados para sessões ativas
  const activeSessions = [
    { id: 1, device: "Windows Chrome (Este dispositivo)", location: "São Paulo, Brasil", lastActivity: "Agora" },
    { id: 2, device: "Android App", location: "Rio de Janeiro, Brasil", lastActivity: "2 horas atrás" },
    { id: 3, device: "iPhone Safari", location: "Belo Horizonte, Brasil", lastActivity: "Ontem" },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Configurações de Segurança</h1>

      {/* Seção 1: Alterar Senha */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <KeyRound className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Alterar Senha</CardTitle>
            <CardDescription>Mantenha sua conta segura alterando sua senha regularmente.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirmar Nova Senha</Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Seção 2: Autenticação de Dois Fatores (2FA) */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Autenticação de Dois Fatores (2FA)</CardTitle>
            <CardDescription>Adicione uma camada extra de segurança à sua conta.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="two-factor-auth">Status: {twoFactorEnabled ? 'Ativado' : 'Desativado'}</Label>
            <Switch
              id="two-factor-auth"
              checked={twoFactorEnabled}
              onCheckedChange={handleToggleTwoFactor}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Quando ativado, você precisará de um código do seu aplicativo autenticador (ex: Google Authenticator) para fazer login.
          </p>
        </CardContent>
      </Card>

      {/* Seção 3: Sessões Ativas */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Monitor className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Sessões Ativas</CardTitle>
            <CardDescription>Revise e encerre sessões ativas em outros dispositivos.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {activeSessions.map((session) => (
              <li key={session.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">{session.device}</p>
                  <p className="text-sm text-muted-foreground">{session.location}</p>
                  <p className="text-xs text-muted-foreground">Última atividade: {session.lastActivity}</p>
                </div>
                {session.id !== 1 && ( // Não permite encerrar a sessão atual (ID 1 é simulado como este dispositivo)
                    <Button variant="outline" size="sm">Encerrar Sessão</Button>
                )}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Se você vir alguma sessão que não reconhece, encerre-a imediatamente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettingsPage;