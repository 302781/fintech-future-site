
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookUser, Clock, Award, LogOut, GraduationCap, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import CourseContent from '@/components/CourseContent';
import InvestmentPlatforms from '@/components/InvestmentPlatforms';

const Cursos = () => {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setUserProfile({
        firstName: user.user_metadata?.first_name || 'Usuário',
        lastName: user.user_metadata?.last_name || '',
        email: user.email,
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header com informações do usuário */}
        <section className="fintech-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  Olá, {userProfile?.firstName}!
                </h1>
                <p className="text-xl text-blue-100">
                  Continue sua jornada de educação financeira
                </p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1A247E]"
              >
                <LogOut className="mr-2" size={16} />
                Sair
              </Button>
            </div>

            {/* Dashboard de progresso */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <BookUser className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">25+</div>
                  <div className="text-blue-100">Aulas Disponíveis</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">10h+</div>
                  <div className="text-blue-100">Conteúdo Total</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-blue-100">Categorias</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conteúdo Principal com Abas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="courses" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Aulas e Cursos
                </TabsTrigger>
                <TabsTrigger value="platforms" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Plataformas de Investimento
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="space-y-8">
                <CourseContent />
              </TabsContent>
              
              <TabsContent value="platforms" className="space-y-8">
                <InvestmentPlatforms />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cursos;
