import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookUser, Clock, Award, LogIn, GraduationCap, TrendingUp, DollarSign, Lightbulb, PiggyBank, Briefcase, Landmark, Handshake, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import CourseContent from '@/components/CourseContent';
import InvestmentPlatforms from '@/components/InvestmentPlatforms';

const contentByPlan = {
  'Escola Básica': {
    courses: [
      { id: 'cb1', title: 'Fundamentos do Dinheiro', description: 'Entenda o básico sobre como o dinheiro funciona: origem, uso e importância.', icon: <DollarSign className="w-8 h-8 text-[#1A247E]" />, tags: ['Iniciante', 'Crianças'] },
      { id: 'cb2', title: 'Onde Guardar meu Dinheiro?', description: 'Aprenda sobre poupança, cofrinho e os primeiros passos para guardar dinheiro com segurança.', icon: <PiggyBank className="w-8 h-8 text-[#1A247E]" />, tags: ['Iniciante', 'Poupança'] },
      { id: 'cb3', title: 'Consumo Consciente para Crianças', description: 'Como fazer escolhas inteligentes, diferenciar desejo de necessidade e evitar desperdícios.', icon: <Lightbulb className="w-8 h-8 text-[#1A247E]" />, tags: ['Básico', 'Consumo'] },
      { id: 'cb4', title: 'Fazendo seu Primeiro Orçamento', description: 'Um guia simples para montar seu primeiro orçamento de mesada ou pequenos ganhos.', icon: <BookUser className="w-8 h-8 text-[#1A247E]" />, tags: ['Básico', 'Orçamento'] },
    ],
    investmentPlatforms: [], // Escola Básica não tem acesso direto a plataformas de investimento
    extraFeatures: ['Dashboard de Progresso Básico', 'Material Didático Digital', 'Jogos Educativos'],
    tips: [
        "Comece com os cursos mais básicos: 'Fundamentos do Dinheiro' é um ótimo ponto de partida!",
        "Incentive a participação nos jogos e desafios para fixar o aprendizado.",
        "Utilize o material didático complementar para reforçar os conceitos em sala de aula."
    ]
  },
  'Escola Premium': {
    courses: [
      // Inclui os cursos do plano básico
      { id: 'cb1', title: 'Fundamentos do Dinheiro', description: 'Entenda o básico sobre como o dinheiro funciona: origem, uso e importância.', icon: <DollarSign className="w-8 h-8 text-[#1A247E]" />, tags: ['Iniciante', 'Crianças'] },
      { id: 'cb2', title: 'Onde Guardar meu Dinheiro?', description: 'Aprenda sobre poupança, cofrinho e os primeiros passos para guardar dinheiro com segurança.', icon: <PiggyBank className="w-8 h-8 text-[#1A247E]" />, tags: ['Iniciante', 'Poupança'] },
      { id: 'cb3', title: 'Consumo Consciente para Crianças', description: 'Como fazer escolhas inteligentes, diferenciar desejo de necessidade e evitar desperdícios.', icon: <Lightbulb className="w-8 h-8 text-[#1A247E]" />, tags: ['Básico', 'Consumo'] },
      { id: 'cb4', title: 'Fazendo seu Primeiro Orçamento', description: 'Um guia simples para montar seu primeiro orçamento de mesada ou pequenos ganhos.', icon: <BookUser className="w-8 h-8 text-[#1A247E]" />, tags: ['Básico', 'Orçamento'] },

      // Cursos intermediários adicionais
      { id: 'cp1', title: 'Introdução aos Investimentos', description: 'Descubra os tipos de investimentos mais comuns (renda fixa e variável) e seus conceitos básicos.', icon: <TrendingUp className="w-8 h-8 text-[#1A247E]" />, tags: ['Intermediário', 'Investimentos'] },
      { id: 'cp2', title: 'Planejamento Financeiro Pessoal', description: 'Crie metas financeiras, organize seu orçamento de forma eficaz e comece a planejar o futuro.', icon: <Briefcase className="w-8 h-8 text-[#1A247E]" />, tags: ['Intermediário', 'Planejamento'] },
      { id: 'cp3', title: 'Entendendo Juros e Dívidas', description: 'Como os juros funcionam, os perigos das dívidas e estratégias para evitá-las ou eliminá-las.', icon: <Info className="w-8 h-8 text-[#1A247E]" />, tags: ['Intermediário', 'Dívidas'] },
    ],
    investmentPlatforms: [
      { id: 'ipp1', name: 'Simulador de Investimentos Júnior', description: 'Pratique investimentos com dinheiro fictício em um ambiente seguro e divertido.', link: '#', icon: <TrendingUp className="w-8 h-8 text-[#1A247E]" /> },
      { id: 'ipp2', name: 'Guia: Primeiras Aplicações Reais', description: 'Passo a passo para abrir sua primeira conta de investimento e fazer sua primeira aplicação.', link: '#', icon: <PiggyBank className="w-8 h-8 text-[#1A247E]" /> },
    ],
    extraFeatures: ['Workshops Presenciais Mensais', 'Capacitação para Professores', 'Gamificação Avançada', 'Relatórios Personalizados'],
    tips: [
        "Explore os 'Simuladores de Investimento Júnior' para experimentar sem riscos.",
        "Aproveite os workshops presenciais para aprofundar temas e tirar dúvidas com especialistas.",
        "Use os relatórios personalizados para identificar pontos fortes e fracos no aprendizado dos alunos."
    ]
  },
  'Rede de Ensino': {
    courses: [
      // Inclui os cursos do plano Premium (e por consequência, os do Básico)
      { id: 'cb1', title: 'Fundamentos do Dinheiro', description: 'Entenda o básico sobre como o dinheiro funciona: origem, uso e importância.', icon: <DollarSign className="w-8 h-8 text-[#1A247E]" />, tags: ['Iniciante', 'Crianças'] },
      { id: 'cb2', title: 'Onde Guardar meu Dinheiro?', description: 'Aprenda sobre poupança, cofrinho e os primeiros passos para guardar dinheiro com segurança.', icon: <PiggyBank className="w-8 h-8 text-[#1A247E]" />, tags: ['Iniciante', 'Poupança'] },
      { id: 'cb3', title: 'Consumo Consciente para Crianças', description: 'Como fazer escolhas inteligentes, diferenciar desejo de necessidade e evitar desperdícios.', icon: <Lightbulb className="w-8 h-8 text-[#1A247E]" />, tags: ['Básico', 'Consumo'] },
      { id: 'cb4', title: 'Fazendo seu Primeiro Orçamento', description: 'Um guia simples para montar seu primeiro orçamento de mesada ou pequenos ganhos.', icon: <BookUser className="w-8 h-8 text-[#1A247E]" />, tags: ['Básico', 'Orçamento'] },
      { id: 'cp1', title: 'Introdução aos Investimentos', description: 'Descubra os tipos de investimentos mais comuns (renda fixa e variável) e seus conceitos básicos.', icon: <TrendingUp className="w-8 h-8 text-[#1A247E]" />, tags: ['Intermediário', 'Investimentos'] },
      { id: 'cp2', title: 'Planejamento Financeiro Pessoal', description: 'Crie metas financeiras, organize seu orçamento de forma eficaz e comece a planejar o futuro.', icon: <Briefcase className="w-8 h-8 text-[#1A247E]" />, tags: ['Intermediário', 'Planejamento'] },
      { id: 'cp3', title: 'Entendendo Juros e Dívidas', description: 'Como os juros funcionam, os perigos das dívidas e estratégias para evitá-las ou eliminá-las.', icon: <Info className="w-8 h-8 text-[#1A247E]" />, tags: ['Intermediário', 'Dívidas'] },

      // Cursos avançados adicionais
      { id: 'cr1', title: 'Estratégias de Investimento Avançadas', description: 'Aprofunde-se em análise de ativos, derivativos, fundos de investimento e estratégias de alto nível.', icon: <TrendingUp className="w-8 h-8 text-[#1A247E]" />, tags: ['Avançado', 'Investimentos'] },
      { id: 'cr2', title: 'Finanças Corporativas e Gestão', description: 'Entenda contabilidade, fluxo de caixa, valuation e tomada de decisões financeiras em grandes organizações.', icon: <Landmark className="w-8 h-8 text-[#1A247E]" />, tags: ['Avançado', 'Corporativo'] },
      { id: 'cr3', title: 'Mercado Imobiliário e Outros Ativos', description: 'Explore investimentos em imóveis, criptomoedas e outras classes de ativos alternativas.', icon: <Handshake className="w-8 h-8 text-[#1A247E]" />, tags: ['Avançado', 'Ativos'] },
    ],
    investmentPlatforms: [
      { id: 'ipr1', name: 'Plataforma de Trading Profissional', description: 'Acesso a ferramentas avançadas para análise e execução de operações complexas.', link: '#', icon: <TrendingUp className="w-8 h-8 text-[#1A247E]" /> },
      { id: 'ipr2', name: 'Portfólio Modelo e Análise de Mercado', description: 'Exemplos de portfólios diversificados e análises diárias do mercado financeiro.', link: '#', icon: <BookUser className="w-8 h-8 text-[#1A247E]" /> },
      { id: 'ipp1', name: 'Simulador de Investimentos Júnior', description: 'Pratique investimentos com dinheiro fictício em um ambiente seguro e divertido.', link: '#', icon: <TrendingUp className="w-8 h-8 text-[#1A247E]" /> },
      { id: 'ipp2', name: 'Guia: Primeiras Aplicações Reais', description: 'Passo a passo para abrir sua primeira conta de investimento e fazer sua primeira aplicação.', link: '#', icon: <PiggyBank className="w-8 h-8 text-[#1A247E]" /> },
    ],
    extraFeatures: ['Gestor de Conta Dedicado', 'Suporte 24/7', 'API para Integração', 'Treinamentos Especializados'],
    tips: [
        "Comece explorando os cursos 'Avançados' para os alunos de nível mais elevado.",
        "Agende treinamentos especializados para a equipe pedagógica sobre os novos conteúdos.",
        "Utilize o gestor de conta dedicado para personalizar a implementação e integração da plataforma.",
        "Explore as plataformas de trading profissional para simulações e estudos de caso avançados."
    ]
  },
};

const Cursos = () => {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  // Default para 'Escola Básica' se o plano não for detectado
  const [userPlan, setUserPlan] = useState<string>('Escola Básica'); 

  useEffect(() => {
    if (user) {
      // **IMPORTANTE**: Adapte como o 'plan_type' é obtido do seu usuário.
      // Supondo que 'user_metadata' ou um campo similar armazene essa informação.
      // Ex: user.user_metadata?.plan_type || 'Escola Básica'
      const detectedPlan = user.user_metadata?.plan_type || 'Escola Básica'; 
      
      setUserProfile({
        firstName: user.user_metadata?.first_name || 'Usuário',
        lastName: user.user_metadata?.last_name || '',
        email: user.email,
        planType: detectedPlan, 
      });
      setUserPlan(detectedPlan); // Atualiza o estado do plano
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
  };

  // Conteúdo filtrado baseado no plano do usuário
  const currentPlanContent = contentByPlan[userPlan as keyof typeof contentByPlan] || { courses: [], investmentPlatforms: [], extraFeatures: [], tips: [] };
  const availableCourses = currentPlanContent.courses;
  const availablePlatforms = currentPlanContent.investmentPlatforms;
  const planTips = currentPlanContent.tips;

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
                  Seu plano atual: <span className="font-semibold">{userPlan}</span>
                </p>
                <p className="text-xl text-blue-100 mt-2">
                  Continue sua jornada de educação financeira
                </p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1A247E] group"
              >
                <LogIn className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
                Sair
              </Button>
            </div>

            {/* Dashboard de progresso - Atualizado para refletir o conteúdo disponível no plano */}
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
                    {/* Estima horas de conteúdo */}
                    {userPlan === 'Escola Básica' ? '10h+' : userPlan === 'Escola Premium' ? '25h+' : '50h+'}
                  </div>
                  <div className="text-blue-100">Conteúdo Total</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{currentPlanContent.extraFeatures.length}</div>
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
                  <Card key={index} className="p-4 bg-white shadow-sm border border-blue-200">
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
                <CourseContent courses={availableCourses} />
              </TabsContent>
              
              <TabsContent value="platforms" className="space-y-8">
                <InvestmentPlatforms platforms={availablePlatforms} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cursos;
