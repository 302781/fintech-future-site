import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookUser, Clock, Award, LogIn, GraduationCap, TrendingUp, DollarSign,
  Lightbulb, PiggyBank, Briefcase, Landmark, Handshake, Info, PlusCircle,
  CheckCircle, User, Users, Loader2 // Usar Loader2 para o spinner
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContextHook';
import { toast } from 'sonner';

// --- Interfaces de Conteúdo ---
// Interface para um item de curso
interface CourseItem {
  id: string; // ID único do curso
  title: string;
  description: string;
  icon?: string; // Nome do ícone como string, será mapeado para o componente React
  tags: string[];
  durationHours?: number; // Duração estimada do curso em horas (opcional)
}

// Interface para um item de plataforma de investimento
interface PlatformItem {
  id: string; // ID único da plataforma
  name: string;
  description: string;
  link: string;
  icon?: string; // Nome do ícone como string, será mapeado para o componente React
}

// Interface para detalhes específicos de um plano (Escola Básica, Premium, Rede)
interface PlanSpecificDetails {
  description: string;
  maxStudents?: number;
  minStudents?: number;
  teacherTrainingSpots?: number;
  additionalFeatures: string[];
  accessDuration?: string;
  supportLevel?: string;
  integrations?: string[]; // Adicionado para consistência
}

// Interface para o conteúdo completo de um plano, incluindo cursos, plataformas e detalhes
interface PlanContent {
  details: PlanSpecificDetails;
  courses: CourseItem[]; // Agora são os objetos CourseItem completos
  investmentPlatforms: PlatformItem[]; // Agora são os objetos PlatformItem completos
  tips: string[];
}

// Interface para a estrutura de todos os planos
interface AllPlansContent {
  'Escola Básica': PlanContent;
  'Escola Premium': PlanContent;
  'Rede de Ensino': PlanContent;
}

// Interface para o estado do perfil do usuário neste componente
// Reflete a estrutura esperada do 'user' vindo do useAuth, incluindo user_metadata
interface UserProfileState {
  firstName: string;
  lastName: string;
  email: string | null;
  planType: keyof AllPlansContent;
}

// Definição de tipo para user_metadata e para o objeto user esperado do useAuth
interface UserMetadata {
  first_name?: string;
  last_name?: string;
  plan_type?: string;
  [key: string]: unknown; // Permite outras propriedades
}

interface AuthUserFromHook {
  email: string | null;
  user_metadata?: UserMetadata;
  [key: string]: unknown; // Permite outras propriedades
}

// --- Dados Mestres de Cursos e Plataformas (consolidados aqui) ---
// Lista mestre de TODOS os cursos disponíveis
const allCoursesData: CourseItem[] = [
  { id: 'fundamentos-dinheiro', title: 'Fundamentos do Dinheiro', description: 'Entenda o básico sobre como o dinheiro funciona: origem, uso e importância.', icon: 'DollarSign', tags: ['Iniciante', 'Crianças'], durationHours: 2 },
  { id: 'onde-guardar', title: 'Onde Guardar meu Dinheiro?', description: 'Aprenda sobre poupança, cofrinho e os primeiros passos para guardar dinheiro com segurança.', icon: 'PiggyBank', tags: ['Iniciante', 'Poupança'], durationHours: 3 },
  { id: 'consumo-consciente', title: 'Consumo Consciente para Crianças', description: 'Como fazer escolhas inteligentes, diferenciar desejo de necessidade e evitar desperdícios.', icon: 'Lightbulb', tags: ['Básico', 'Consumo'], durationHours: 2 },
  { id: 'primeiro-orcamento', title: 'Fazendo seu Primeiro Orçamento', description: 'Um guia simples para montar seu primeiro orçamento de mesada ou pequenos ganhos.', icon: 'BookUser', tags: ['Básico', 'Orçamento'], durationHours: 3 },
  { id: 'introducao-investimentos', title: 'Introdução aos Investimentos', description: 'Descubra os tipos de investimentos mais comuns (renda fixa e variável) e seus conceitos básicos.', icon: 'TrendingUp', tags: ['Intermediário', 'Investimentos'], durationHours: 5 },
  { id: 'planejamento-pessoal', title: 'Planejamento Financeiro Pessoal', description: 'Crie metas financeiras, organize seu orçamento de forma eficaz e comece a planejar o futuro.', icon: 'Briefcase', tags: ['Intermediário', 'Planejamento'], durationHours: 6 },
  { id: 'juros-dividas', title: 'Entendendo Juros e Dívidas', description: 'Como os juros funcionam, os perigos das dívidas e estratégias para evitá-las ou eliminá-las.', icon: 'Info', tags: ['Intermediário', 'Dívidas'], durationHours: 4 },
  { id: 'estrategias-avancadas', title: 'Estratégias de Investimento Avançadas', description: 'Aprofunde-se em análise de ativos, derivativos, fundos de investimento e estratégias de alto nível.', icon: 'TrendingUp', tags: ['Avançado', 'Investimentos'], durationHours: 8 },
  { id: 'financas-corporativas', title: 'Finanças Corporativas e Gestão', description: 'Entenda contabilidade, fluxo de caixa, valuation e tomada de decisões financeiras em grandes organizações.', icon: 'Landmark', tags: ['Avançado', 'Corporativo'], durationHours: 7 },
  { id: 'mercado-imobiliario', title: 'Mercado Imobiliário e Outros Ativos', description: 'Explore investimentos em imóveis, criptomoedas e outras classes de ativos alternativas.', icon: 'Handshake', tags: ['Avançado', 'Ativos'], durationHours: 5 },
];

// Lista mestre de TODAS as plataformas de investimento disponíveis
const allPlatformsData: PlatformItem[] = [
  { id: 'simulador-junior', name: 'Simulador de Investimentos Júnior', description: 'Pratique investimentos com dinheiro fictício em um ambiente seguro e divertido.', link: '#', icon: 'TrendingUp' },
  { id: 'guia-aplicacoes', name: 'Guia: Primeiras Aplicações Reais', description: 'Passo a passo para abrir sua primeira conta de investimento e fazer sua primeira aplicação.', link: '#', icon: 'PiggyBank' },
  { id: 'plataforma-trading', name: 'Plataforma de Trading Profissional', description: 'Acesso a ferramentas avançadas para análise e execução de operações complexas.', link: '#', icon: 'TrendingUp' },
  { id: 'portfolio-modelo', name: 'Portfólio Modelo e Análise de Mercado', description: 'Exemplos de portfólios diversificados e análises diárias do mercado financeiro.', link: '#', icon: 'BookUser' },
  { id: 'gateway-dados', name: 'Gateway de Dados Financeiros', description: 'Acesso a dados em tempo real para análises aprofundadas.', link: 'https://gatewaydados.com', icon: 'PlusCircle' },
];

// --- Mapeamento de Nomes de String para Componentes de Ícone Reais do Lucide-React ---
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
  User: User,
  Users: Users,
  Loader2: Loader2, // Adicionado Loader2 ao mapa
};

// --- Configuração Inicial de Todos os Planos (consolidados aqui) ---
// Mapeamento que define quais IDs de cursos e plataformas pertencem a cada plano
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
      allCoursesData.find(c => c.id === 'fundamentos-dinheiro')!,
      allCoursesData.find(c => c.id === 'onde-guardar')!,
      allCoursesData.find(c => c.id === 'consumo-consciente')!,
      allCoursesData.find(c => c.id === 'primeiro-orcamento')!,
    ].filter(Boolean) as CourseItem[],
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
      minStudents: 31,
      maxStudents: 100,
      teacherTrainingSpots: 5,
      additionalFeatures: ['Acesso a todos os cursos básicos e avançados', 'Comunidade premium', 'Workshops ao vivo mensais', 'Relatórios de progresso personalizados', 'Suporte prioritário via chat'],
      accessDuration: '2 anos',
      integrations: ['Ferramenta de análise de portfólio (simulado)'],
      supportLevel: 'Chat Prioritário'
    },
    courses: [
      ...[ // Inclui cursos do plano básico
        'fundamentos-dinheiro', 'onde-guardar', 'consumo-consciente', 'primeiro-orcamento'
      ].map(id => allCoursesData.find(c => c.id === id)!),
      // Cursos intermediários adicionais
      allCoursesData.find(c => c.id === 'introducao-investimentos')!,
      allCoursesData.find(c => c.id === 'planejamento-pessoal')!,
      allCoursesData.find(c => c.id === 'juros-dividas')!,
    ].filter(Boolean) as CourseItem[],
    investmentPlatforms: [
      allPlatformsData.find(p => p.id === 'simulador-junior')!,
      allPlatformsData.find(p => p.id === 'guia-aplicacoes')!,
    ].filter(Boolean) as PlatformItem[],
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
      minStudents: 101,
      teacherTrainingSpots: 20,
      additionalFeatures: ['Acesso ilimitado a todo o conteúdo', 'Comunidade VIP', 'Consultoria personalizada', 'Integração com sistemas educacionais (LMS)', 'Dashboard de acompanhamento em tempo real', 'Suporte 24/7'],
      accessDuration: 'Ilimitado',
      integrations: ['Integração LMS', 'API de dados para relatórios avançados'],
      supportLevel: '24/7 Dedicado'
    },
    courses: [
      ...[ // Inclui cursos do plano premium
        'fundamentos-dinheiro', 'onde-guardar', 'consumo-consciente', 'primeiro-orcamento',
        'introducao-investimentos', 'planejamento-pessoal', 'juros-dividas'
      ].map(id => allCoursesData.find(c => c.id === id)!),
      // Cursos avançados adicionais
      allCoursesData.find(c => c.id === 'estrategias-avancadas')!,
      allCoursesData.find(c => c.id === 'financas-corporativas')!,
      allCoursesData.find(c => c.id === 'mercado-imobiliario')!,
    ].filter(Boolean) as CourseItem[],
    investmentPlatforms: [
      ...[ // Inclui plataformas do plano premium
        'simulador-junior', 'guia-aplicacoes'
      ].map(id => allPlatformsData.find(p => p.id === id)!),
      // Plataformas adicionais
      allPlatformsData.find(p => p.id === 'plataforma-trading')!,
      allPlatformsData.find(p => p.id === 'portfolio-modelo')!,
      allPlatformsData.find(p => p.id === 'gateway-dados')!,
    ].filter(Boolean) as PlatformItem[],
    tips: [
      'Aproveite a consultoria personalizada para adaptar o conteúdo às necessidades da sua rede.',
      'Utilize o dashboard de acompanhamento para monitorar o progresso dos alunos e professores.',
      'Explore as integrações com seu LMS para uma experiência fluida.',
      'Para dúvidas complexas, utilize o suporte 24/7 dedicado.',
    ],
  },
};

// --- Sub-componente para exibir a lista de cursos ---
interface CourseContentProps {
  courses: CourseItem[];
  IconMap: { [key: string]: React.ElementType }; // Passa o IconMap como prop
}
const CourseContent: React.FC<CourseContentProps> = ({ courses, IconMap }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => {
        const IconComponent = course.icon ? IconMap[course.icon] : null; // Pega o componente do ícone pelo nome
        return (
          <Card key={course.id} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-3">
                {IconComponent && <IconComponent className="w-8 h-8 text-[#1A247E]" />} {/* Renderiza o ícone */}
                <h3 className="text-xl font-semibold text-foreground">{course.title}</h3>
              </div>
              <p className="text-muted-foreground mb-3">{course.description}</p>
              <div className="flex flex-wrap gap-2">
                {course.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
      {courses.length === 0 && (
        <p className="col-span-full text-center text-muted-foreground">Nenhum curso disponível para este plano.</p>
      )}
    </div>
  );
};

// --- Sub-componente para exibir a lista de plataformas de investimento ---
interface InvestmentPlatformsProps {
  platforms: PlatformItem[];
  IconMap: { [key: string]: React.ElementType }; // Passa o IconMap como prop
}
const InvestmentPlatforms: React.FC<InvestmentPlatformsProps> = ({ platforms, IconMap }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {platforms.map(platform => {
        const IconComponent = platform.icon ? IconMap[platform.icon] : null; // Pega o componente do ícone pelo nome
        return (
          <Card key={platform.id} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-3">
                {IconComponent && <IconComponent className="w-8 h-8 text-[#1A247E]" />} {/* Renderiza o ícone */}
                <h3 className="text-xl font-semibold text-foreground">{platform.name}</h3>
              </div>
              <p className="text-muted-foreground mb-3">{platform.description}</p>
              {platform.link && (
                <Button variant="link" asChild>
                  <a href={platform.link} target="_blank" rel="noopener noreferrer" aria-label={`Explorar a plataforma ${platform.name}`}>
                    Explorar Plataforma
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
      {platforms.length === 0 && (
        <p className="col-span-full text-center text-muted-foreground">Nenhuma plataforma de investimento disponível para este plano.</p>
      )}
    </div>
  );
};

// --- Componente Principal Cursos ---
const Cursos = () => {
  // O 'user' vindo de useAuth() agora deve ser tipado corretamente
  const { user, signOut } = useAuth();

  // Usando a nova interface UserProfileState para o perfil de usuário local
  const [userProfile, setUserProfile] = useState<UserProfileState | null>(null);
  // O tipo do userPlan agora é restrito às chaves de AllPlansContent
  const [userPlan, setUserPlan] = useState<keyof AllPlansContent>('Escola Básica');
  const [allContent, setAllContent] = useState<AllPlansContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para carregar o conteúdo dos planos (simulado ou via API)
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- SIMULAÇÃO DE FETCH DE DADOS ---
        // Em um projeto real, você faria uma chamada real para sua API para buscar `allCoursesData`, `allPlatformsData`
        // e `planContentMapping` do seu backend, e então construiria `initialConfig`.
        // Exemplo:
        // const response = await fetch('/api/plan-configs');
        // if (!response.ok) {
        //   throw new Error('Falha ao carregar as configurações dos planos.');
        // }
        // const data = await response.json(); // Esta 'data' conteria allCourses, allPlatforms, e o mapeamento de planos do backend
        //
        // // Você precisaria re-montar a 'initialConfig' aqui com os dados do backend
        // const backendConfig: AllPlansContent = { /* lógica para construir com 'data' */ };
        // setAllContent(backendConfig);

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
  }, []); // Executa apenas uma vez na montagem

  // Efeito para determinar o plano do usuário e preencher o perfil
  useEffect(() => {
    // Garante que 'user' e 'allContent' estejam disponíveis antes de prosseguir
    if (user && allContent) {
      // Tipando corretamente o user para acessar user_metadata
      const typedUser = user as unknown as AuthUserFromHook;
      const userMetadata = typedUser.user_metadata;

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
        email: typedUser.email,
        planType: detectedPlan,
      });
    } else if (!user) {
      // Se não houver usuário logado, redefinir o perfil e definir o plano padrão
      setUserProfile(null);
      setUserPlan('Escola Básica');
    }
  }, [user, allContent]); // Depende de 'user' (do useAuth) e 'allContent' (dados carregados)

  // Função para lidar com o logout do usuário
  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao realizar logout. Tente novamente.');
    }
  }, [signOut]);

  // Memoiza o conteúdo do plano atual para evitar recálculos desnecessários
  const currentPlanContent: PlanContent = useMemo(() => {
    return allContent?.[userPlan] || {
      details: { description: 'Detalhes do plano não disponíveis.', additionalFeatures: [] },
      courses: [],
      investmentPlatforms: [],
      tips: []
    };
  }, [allContent, userPlan]);

  // Calcula a duração total dos cursos disponíveis para o plano atual
  const totalContentHours = useMemo(() => {
    return currentPlanContent.courses.reduce((sum, course) => sum + (course.durationHours || 0), 0);
  }, [currentPlanContent.courses]);

  const currentPlanDetails = currentPlanContent.details;
  const availableCourses = currentPlanContent.courses;
  const availablePlatforms = currentPlanContent.investmentPlatforms;
  const planTips = currentPlanContent.tips;

  // Exibe tela de carregamento enquanto os dados são buscados
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 mr-2 animate-spin text-[#1A247E]" />
        <p className="text-xl text-gray-700">Carregando conteúdo dos cursos...</p>
      </div>
    );
  }

  // Exibe mensagem de erro se o carregamento falhar
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600 p-4 text-center">
        <p className="text-xl mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600 text-white">Recarregar Página</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pt-20"> {/* Usado <main> para semântica */}
        {/* Header com informações do usuário */}
        <section className="fintech-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 text-center md:text-left">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2">
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
                aria-label="Sair da conta"
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
                    {currentPlanDetails.accessDuration || `${totalContentHours}h+`}
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
                <Info className="inline-block mr-2 w-6 h-6 text-[#1A247E]" />Dicas para o seu Plano {userPlan}
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
                          <strong>Até {currentPlanDetails.maxStudents} alunos</strong>
                        </p>
                      </div>
                    )}
                    {currentPlanDetails.minStudents && (
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          <strong>Acima de {currentPlanDetails.minStudents} alunos</strong>
                        </p>
                      </div>
                    )}
                    {currentPlanDetails.teacherTrainingSpots && (
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          <strong>Treinamento para {currentPlanDetails.teacherTrainingSpots} professores</strong>
                        </p>
                      </div>
                    )}
                    {currentPlanDetails.accessDuration && (
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          <strong>Duração do Acesso:</strong> {currentPlanDetails.accessDuration}
                        </p>
                      </div>
                    )}
                    {currentPlanDetails.supportLevel && (
                      <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-blue-600" />
                        <p className="text-lg text-gray-800">
                          <strong>Suporte:</strong> {currentPlanDetails.supportLevel}
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
      </main>
    </div>
  );
};

export default Cursos;
