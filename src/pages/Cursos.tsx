// src/pages/Cursos.tsx
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Importe TODOS os ícones que você pode usar, incluindo User e Users
import { BookUser, Clock, Award, LogIn, GraduationCap, TrendingUp, DollarSign, Lightbulb, PiggyBank, Briefcase, Landmark, Handshake, Info, PlusCircle, CheckCircle, User, Users } from 'lucide-react'; 
import { useAuth } from '@/contexts/AuthContext'; // Certifique-se de que o caminho está correto
import { toast } from 'sonner';

import CourseContent from '@/components/CourseContent'; // Certifique-se de que o caminho está correto
import InvestmentPlatforms from '@/components/InvestmentPlatforms'; // Certifique-se de que o caminho está correto

// --- DEFINIÇÃO DAS INTERFACES (MOVIDAS PARA CÁ) ---
// Estas interfaces devem ser consistentes em todo o seu projeto onde são usadas.
// Idealmente, estariam em um arquivo de tipos compartilhado (ex: src/types/plan.ts)
interface CourseItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags: string[];
}

interface PlatformItem {
  id: string;
  name: string;
  description: string;
  link: string;
  icon?: string;
}

interface PlanSpecificDetails {
  description: string;
  maxStudents?: number;
  minStudents?: number;
  teacherTrainingSpots?: number;
  additionalFeatures: string[];
  accessDuration?: string;
  integrations?: string[];
  supportLevel?: string;
}

interface PlanContent {
  details: PlanSpecificDetails;
  courses: CourseItem[];
  investmentPlatforms: PlatformItem[];
  tips: string[];
}

interface AllPlansContent {
  'Escola Básica': PlanContent;
  'Escola Premium': PlanContent;
  'Rede de Ensino': PlanContent;
}

// Interface para o estado do perfil do usuário neste componente
interface UserProfileState {
  firstName: string;
  lastName: string;
  email: string | null;
  planType: keyof AllPlansContent; // Tipado para ser uma das chaves de AllPlansContent
}

// --- CONFIGURAÇÃO INICIAL DOS PLANOS (MOVIDA PARA CÁ) ---
// Em um projeto real, isso viria de uma API ou de um arquivo de dados dedicado.
const initialConfig: AllPlansContent = {
  'Escola Básica': {
    details: {
      description: 'O plano perfeito para iniciar sua jornada de educação financeira, com acesso a conteúdos essenciais.',
      maxStudents: 30,
      additionalFeatures: ['Acesso a cursos introdutórios', 'Comunidade básica', 'Suporte por e-mail'],
      accessDuration: '1 ano',
      supportLevel: 'E-mail'
    },
    courses: [
      { id: 'eb1', title: 'Fundamentos da Educação Financeira', description: 'Aprenda os conceitos básicos para gerenciar suas finanças.', icon: 'DollarSign', tags: ['Iniciante', 'Básico'] },
      { id: 'eb2', title: 'Orçamento Inteligente', description: 'Crie e siga um orçamento que funcione para você.', icon: 'PiggyBank', tags: ['Iniciante', 'Planejamento'] },
      { id: 'eb3', title: 'Primeiros Passos no Investimento', description: 'Entenda como começar a investir com segurança.', icon: 'TrendingUp', tags: ['Iniciante', 'Investimento'] },
    ],
    investmentPlatforms: [],
    tips: [
      'Comece pelo curso "Fundamentos da Educação Financeira" para ter uma base sólida.',
      'Utilize o modelo de orçamento disponível para organizar suas despesas e receitas.',
      'Defina metas financeiras claras para se manter motivado.',
    ],
  },
  'Escola Premium': {
    details: {
      description: 'Amplie seus conhecimentos com conteúdos avançados, treinamentos para professores e mais.',
      minStudents: 31, // Exemplo: para escolas com mais de X alunos
      maxStudents: 100, // Exemplo: limite superior para este plano
      teacherTrainingSpots: 5,
      additionalFeatures: ['Acesso a todos os cursos básicos e avançados', 'Comunidade premium', 'Workshops ao vivo mensais', 'Relatórios de progresso personalizados', 'Suporte prioritário via chat'],
      accessDuration: '2 anos',
      integrations: ['Ferramenta de análise de portfólio (simulado)'],
      supportLevel: 'Chat Prioritário'
    },
    courses: [
      { id: 'ep1', title: 'Introdução ao Mercado de Ações', description: 'Desvende o funcionamento da bolsa de valores.', icon: 'Briefcase', tags: ['Intermediário', 'Ações'] },
      { id: 'ep2', title: 'Renda Fixa Descomplicada', description: 'Explore as opções de investimento em renda fixa.', icon: 'Landmark', tags: ['Intermediário', 'Renda Fixa'] },
      { id: 'ep3', title: 'Investimento a Longo Prazo', description: 'Estratégias para construir patrimônio duradouro.', icon: 'Clock', tags: ['Avançado', 'Planejamento'] },
      { id: 'eb1', title: 'Fundamentos da Educação Financeira', description: 'Aprenda os conceitos básicos para gerenciar suas finanças.', icon: 'DollarSign', tags: ['Iniciante', 'Básico'] },
      { id: 'eb2', title: 'Orçamento Inteligente', description: 'Crie e siga um orçamento que funcione para você.', icon: 'PiggyBank', tags: ['Iniciante', 'Planejamento'] },
      { id: 'eb3', title: 'Primeiros Passos no Investimento', description: 'Entenda como começar a investir com segurança.', icon: 'TrendingUp', tags: ['Iniciante', 'Investimento'] },
    ],
    investmentPlatforms: [
      { id: 'p1', name: 'Plataforma A Invest', description: 'Ferramenta completa para análise de investimentos.', link: 'https://plataformaa.com', icon: 'TrendingUp' },
      { id: 'p2', name: 'Corretora X', description: 'Opções de investimento com taxas competitivas.', link: 'https://corretorax.com', icon: 'Handshake' },
    ],
    tips: [
      'Explore os cursos avançados para aprofundar seus conhecimentos em investimentos.',
      'Participe dos workshops mensais ao vivo para tirar dúvidas e aprender com especialistas.',
      'Considere o treinamento de professores para maximizar o impacto em sua escola.',
      'Analise os relatórios de progresso para identificar áreas de melhoria.',
    ],
  },
  'Rede de Ensino': {
    details: {
      description: 'Solução completa para grandes redes de ensino, com acesso ilimitado e suporte dedicado.',
      minStudents: 101, // Exemplo: para redes com mais de X alunos
      teacherTrainingSpots: 20,
      additionalFeatures: ['Acesso ilimitado a todo o conteúdo', 'Comunidade VIP', 'Consultoria personalizada', 'Integração com sistemas educacionais (LMS)', 'Dashboard de acompanhamento em tempo real', 'Suporte 24/7'],
      accessDuration: 'Ilimitado',
      integrations: ['Integração LMS', 'API de dados para relatórios avançados'],
      supportLevel: '24/7 Dedicado'
    },
    courses: [
      { id: 're1', title: 'Gestão de Carteiras Profissional', description: 'Estratégias avançadas para gerenciamento de grandes portfólios.', icon: 'Briefcase', tags: ['Profissional', 'Gestão'] },
      { id: 're2', title: 'Análise Fundamentalista Avançada', description: 'Aprenda a analisar empresas para investimentos de valor.', icon: 'Lightbulb', tags: ['Avançado', 'Análise'] },
      { id: 're3', title: 'Derivativos e Hedge', description: 'Compreenda os derivativos e estratégias de proteção.', icon: 'DollarSign', tags: ['Especializado', 'Risco'] },
      // Inclui todos os cursos dos planos anteriores
      { id: 'eb1', title: 'Fundamentos da Educação Financeira', description: 'Aprenda os conceitos básicos para gerenciar suas finanças.', icon: 'DollarSign', tags: ['Iniciante', 'Básico'] },
      { id: 'eb2', title: 'Orçamento Inteligente', description: 'Crie e siga um orçamento que funcione para você.', icon: 'PiggyBank', tags: ['Iniciante', 'Planejamento'] },
      { id: 'eb3', title: 'Primeiros Passos no Investimento', description: 'Entenda como começar a investir com segurança.', icon: 'TrendingUp', tags: ['Iniciante', 'Investimento'] },
      { id: 'ep1', title: 'Introdução ao Mercado de Ações', description: 'Desvende o funcionamento da bolsa de valores.', icon: 'Briefcase', tags: ['Intermediário', 'Ações'] },
      { id: 'ep2', title: 'Renda Fixa Descomplicada', description: 'Explore as opções de investimento em renda fixa.', icon: 'Landmark', tags: ['Intermediário', 'Renda Fixa'] },
      { id: 'ep3', title: 'Investimento a Longo Prazo', description: 'Estratégias para construir patrimônio duradouro.', icon: 'Clock', tags: ['Avançado', 'Planejamento'] },
    ],
    investmentPlatforms: [
      { id: 'p1', name: 'Plataforma A Invest', description: 'Ferramenta completa para análise de investimentos.', link: 'https://plataformaa.com', icon: 'TrendingUp' },
      { id: 'p2', name: 'Corretora X', description: 'Opções de investimento com taxas competitivas.', link: 'https://corretorax.com', icon: 'Handshake' },
      { id: 'p3', name: 'Gateway de Dados Financeiros', description: 'Acesso a dados em tempo real para análises aprofundadas.', link: 'https://gatewaydados.com', icon: 'PlusCircle' },
    ],
    tips: [
      'Aproveite a consultoria personalizada para adaptar o conteúdo às necessidades da sua rede.',
      'Utilize o dashboard de acompanhamento para monitorar o progresso dos alunos e professores.',
      'Explore as integrações com seu LMS para uma experiência fluida.',
      'Para dúvidas complexas, utilize o suporte 24/7 dedicado.',
    ],
  },
};

// Mapeamento de nomes de string para componentes de ícone reais do Lucide-React
const IconMap: { [key: string]: React.ElementType } = {
  BookUser: BookUser,
  Clock: Clock,
  Award: Award,
  LogIn: LogIn,
  GraduationCap: GraduationCap,
  TrendingUp: TrendingUp,
  DollarSign: DollarSign,
  Lightbulb: Lightbulb,
  PiggyBank: PiggyBank,
  Briefcase: Briefcase,
  Landmark: Landmark,
  Handshake: Handshake,
  Info: Info,
  PlusCircle: PlusCircle,
  CheckCircle: CheckCircle,
  User: User,   // Adicionado
  Users: Users, // Adicionado
};

const Cursos = () => {
  // O 'user' vindo de useAuth() agora deve ser tipado como 'User | null'
  // conforme a definição em src/contexts/AuthContext.tsx
  const { user, signOut } = useAuth(); 

  // Usando a nova interface UserProfileState
  const [userProfile, setUserProfile] = useState<UserProfileState | null>(null);
  const [userPlan, setUserPlan] = useState<keyof AllPlansContent>('Escola Básica'); 
  const [allContent, setAllContent] = useState<AllPlansContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- SIMULAÇÃO DE FETCH DE DADOS ---
        // Em um projeto real, você faria uma chamada real para sua API:
        // const response = await fetch('/api/plan-configs');
        // if (!response.ok) {
        //   throw new Error('Falha ao carregar as configurações dos planos.');
        // }
        // const data: AllPlansContent = await response.json();
        // setAllContent(data);

        // Por enquanto, usamos o `initialConfig` diretamente no arquivo
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula um delay de rede
        setAllContent(initialConfig); // Carrega os dados mockados
      } catch (err) {
        console.error("Erro ao carregar conteúdo:", err);
        setError("Não foi possível carregar o conteúdo. Tente novamente mais tarde.");
        toast.error("Erro ao carregar o conteúdo dos cursos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []); 

  useEffect(() => {
    if (user && allContent) {
      // user.user_metadata agora é corretamente tipado pela interface User em AuthContext.tsx
      // Não precisamos mais do 'as' aqui, pois o TypeScript já sabe o tipo
      const userMetadata = user.user_metadata; 
      
      // O 'plan_type' pode ser undefined, então fornecemos um fallback
      const detectedPlan = (userMetadata?.plan_type || 'Escola Básica') as keyof AllPlansContent; 
      
      if (!(detectedPlan in allContent)) {
        console.warn(`Plano "${detectedPlan}" não encontrado nas configurações. Usando "Escola Básica".`);
        setUserPlan('Escola Básica');
      } else {
        setUserPlan(detectedPlan);
      }

      setUserProfile({
        firstName: userMetadata?.first_name || 'Usuário',
        lastName: userMetadata?.last_name || '',
        email: user.email,
        planType: detectedPlan, // Já é do tipo correto
      });
    }
  }, [user, allContent]);

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {/* Adicione um spinner ou esqueleto de carregamento aqui para uma melhor UX */}
        <p className="text-xl text-gray-700">Carregando conteúdo dos cursos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600">
        <p className="text-xl mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Recarregar Página</Button>
      </div>
    );
  }

  // Conteúdo filtrado baseado no plano do usuário
  // allContent é AllPlansContent | null. Se for null, usamos um objeto vazio como fallback.
  const currentPlanContent: PlanContent = allContent?.[userPlan] || { 
    details: { description: '', additionalFeatures: [] }, 
    courses: [], 
    investmentPlatforms: [], 
    tips: [] 
  };
  
  // As variáveis abaixo já são corretamente tipadas devido ao currentPlanContent
  const currentPlanDetails = currentPlanContent.details; 
  const availableCourses = currentPlanContent.courses; // Tipo: CourseItem[]
  const availablePlatforms = currentPlanContent.investmentPlatforms; // Tipo: PlatformItem[]
  const planTips = currentPlanContent.tips;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header com informações do usuário */}
        <section className="fintech-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 text-center md:text-left">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  Olá, {userProfile?.firstName || 'Usuário'}!
                </h1>
                <p className="text-xl text-blue-100">
                  Seu plano atual: <span className="font-semibold">{userPlan}</span>
                </p>
                <p className="text-xl text-blue-100 mt-2">
                  Continue sua jornada de educação financeira
                </p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="mt-6 md:mt-0 border-white text-white hover:bg-white hover:text-[#1A247E] group"
              >
                <LogIn className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
                Sair
              </Button>
            </div>

            {/* Dashboard de progresso/resumo */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <BookUser className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{availableCourses.length}+</div>
                  <div className="text-blue-100">Cursos Disponíveis</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {/* Exibe duração do acesso se disponível, caso contrário, estimativa */}
                    {currentPlanDetails.accessDuration || (userPlan === 'Escola Básica' ? '10h+' : userPlan === 'Escola Premium' ? '25h+' : '50h+')}
                  </div>
                  <div className="text-blue-100">Conteúdo Total / Duração</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {currentPlanDetails.additionalFeatures.length + (currentPlanDetails.integrations?.length || 0)}
                  </div>
                  <div className="text-blue-100">Recursos Exclusivos</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Seção de Dicas Personalizadas */}
        {planTips.length > 0 && (
          <section className="py-10 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                <Info className="inline-block mr-2 w-6 h-6 text-[#1A247E]" />**Dicas para o seu Plano {userPlan}**
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {planTips.map((tip, index) => (
                  <Card key={index} className="p-4 bg-white shadow-sm border border-blue-200 hover:shadow-md transition-shadow">
                    <p className="text-gray-700 text-sm">{tip}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Conteúdo Principal com Abas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" />
                  Visão Geral do Plano
                </TabsTrigger>
                <TabsTrigger value="courses" className="flex items-center justify-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Aulas e Cursos
                </TabsTrigger>
                <TabsTrigger value="platforms" className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Plataformas de Investimento
                </TabsTrigger>
              </TabsList>
              
              {/* Aba de Visão Geral do Plano */}
              <TabsContent value="overview" className="space-y-8">
                <Card className="p-8 shadow-lg">
                  <h2 className="text-3xl font-bold text-[#1A247E] mb-4">Seu Plano: {userPlan}</h2>
                  <p className="text-gray-700 mb-6">{currentPlanDetails.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentPlanDetails.maxStudents && (
                      <div className="flex items-center gap-3">
                        <User className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          **Até {currentPlanDetails.maxStudents} alunos**
                        </p>
                      </div>
                    )}
                    {currentPlanDetails.minStudents && (
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          **Acima de {currentPlanDetails.minStudents} alunos**
                        </p>
                      </div>
                    )}
                    {currentPlanDetails.teacherTrainingSpots && (
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          **Treinamento para {currentPlanDetails.teacherTrainingSpots} professores**
                        </p>
                      </div>
                    )}
                    {currentPlanDetails.accessDuration && (
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          **Duração do Acesso:** {currentPlanDetails.accessDuration}
                        </p>
                      </div>
                    )}
                    {currentPlanDetails.supportLevel && (
                      <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          **Suporte:** {currentPlanDetails.supportLevel}
                        </p>
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Recursos Incluídos:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
                    {currentPlanDetails.additionalFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        {feature}
                      </li>
                    ))}
                    {currentPlanDetails.integrations && currentPlanDetails.integrations.map((integration, index) => (
                      <li key={`int-${index}`} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        {integration}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-8">
                {/* As props 'courses' e 'IconMap' são passadas com os tipos corretos */}
                <CourseContent courses={availableCourses} IconMap={IconMap} />
              </TabsContent>
              
              <TabsContent value="platforms" className="space-y-8">
                {/* As props 'platforms' e 'IconMap' são passadas com os tipos corretos */}
                <InvestmentPlatforms platforms={availablePlatforms} IconMap={IconMap} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cursos;
