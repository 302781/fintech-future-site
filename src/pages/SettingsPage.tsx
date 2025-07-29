import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Trash2, Edit, Save, X, Loader2 } from 'lucide-react'; // Adicionado Loader2
import { toast } from 'sonner';
import { FooterSection } from './Index';

// --- Interfaces de Conteúdo (Consolidadas aqui) ---
interface CourseItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags: string[];
  durationHours?: number;
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

// --- Dados Iniciais Mockados (Consolidados aqui) ---
// Dados mestres de cursos e plataformas, conforme a estrutura dos seus outros componentes
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

const allPlatformsData: PlatformItem[] = [
  { id: 'simulador-junior', name: 'Simulador de Investimentos Júnior', description: 'Pratique investimentos com dinheiro fictício em um ambiente seguro e divertido.', link: '#', icon: 'TrendingUp' },
  { id: 'guia-aplicacoes', name: 'Guia: Primeiras Aplicações Reais', description: 'Passo a passo para abrir sua primeira conta de investimento e fazer sua primeira aplicação.', link: '#', icon: 'PiggyBank' },
  { id: 'plataforma-trading', name: 'Plataforma de Trading Profissional', description: 'Acesso a ferramentas avançadas para análise e execução de operações complexas.', link: '#', icon: 'TrendingUp' },
  { id: 'portfolio-modelo', name: 'Portfólio Modelo e Análise de Mercado', description: 'Exemplos de portfólios diversificados e análises diárias do mercado financeiro.', link: '#', icon: 'BookUser' },
  { id: 'gateway-dados', name: 'Gateway de Dados Financeiros', description: 'Acesso a dados em tempo real para análises aprofundadas.', link: 'https://gatewaydados.com', icon: 'PlusCircle' },
];

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
    ].filter((item): item is CourseItem => item !== undefined),
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
      ...(allCoursesData.filter(c => ['fundamentos-dinheiro', 'onde-guardar', 'consumo-consciente', 'primeiro-orcamento', 'introducao-investimentos', 'planejamento-pessoal', 'juros-dividas'].includes(c.id))),
    ].filter((item): item is CourseItem => item !== undefined),
    investmentPlatforms: [
      allPlatformsData.find(p => p.id === 'simulador-junior')!,
      allPlatformsData.find(p => p.id === 'guia-aplicacoes')!,
    ].filter((item): item is PlatformItem => item !== undefined),
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
      ...(allCoursesData.filter(c => ['fundamentos-dinheiro', 'onde-guardar', 'consumo-consciente', 'primeiro-orcamento', 'introducao-investimentos', 'planejamento-pessoal', 'juros-dividas', 'estrategias-avancadas', 'financas-corporativas', 'mercado-imobiliario'].includes(c.id))),
    ].filter((item): item is CourseItem => item !== undefined),
    investmentPlatforms: [
      ...(allPlatformsData.filter(p => ['simulador-junior', 'guia-aplicacoes', 'plataforma-trading', 'portfolio-modelo', 'gateway-dados'].includes(p.id))),
    ].filter((item): item is PlatformItem => item !== undefined),
    tips: [
      'Aproveite a consultoria personalizada para adaptar o conteúdo às necessidades da sua rede.',
      'Utilize o dashboard de acompanhamento para monitorar o progresso dos alunos e professores.',
      'Explore as integrações com seu LMS para uma experiência fluida.',
      'Para dúvidas complexas, utilize o suporte 24/7 dedicado.',
    ],
  },
};


// --- Componente principal SettingsPage ---
const SettingsPage: React.FC = () => {
  const [currentConfig, setCurrentConfig] = useState<AllPlansContent | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<keyof AllPlansContent>('Escola Básica');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para controlar a edição de itens específicos
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingPlatformId, setEditingPlatformId] = useState<string | null>(null);
  const [editingFeatureIndex, setEditingFeatureIndex] = useState<number | null>(null);
  const [editingTipIndex, setEditingTipIndex] = useState<number | null>(null);
  const [editingDetailField, setEditingDetailField] = useState<string | null>(null); // Para campos diretos de detalhes do plano

  // Efeito para carregar a configuração inicial (simulando API)
  useEffect(() => {
    const fetchConfig = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulação de delay de rede
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Em um projeto real:
        // const response = await fetch('/api/settings');
        // if (!response.ok) throw new Error('Failed to fetch settings');
        // const data: AllPlansContent = await response.json();
        setCurrentConfig(initialConfig); // Usando os dados mockados
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar configurações.';
        setError(errorMessage);
        toast.error(`Erro: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  // --- Funções de CRUD (Create, Read, Update, Delete) ---

  // Lidar com o salvamento das configurações (simulando API)
  const handleSaveConfig = useCallback(() => {
    if (!currentConfig) return;
    // Em um projeto real:
    // fetch('/api/settings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(currentConfig),
    // })
    //   .then(response => {
    //     if (!response.ok) throw new Error('Failed to save settings');
    //     return response.json();
    //   })
    //   .then(data => toast.success('Configurações salvas com sucesso!'))
    //   .catch(err => toast.error(`Erro ao salvar: ${err.message}`));

    console.log("Configurações salvas:", currentConfig);
    toast.success('Configurações salvas com sucesso!');
  }, [currentConfig]);

  // Atualizar campos diretos de detalhes do plano
  const updatePlanDetail = useCallback((field: keyof PlanSpecificDetails, value: string | number | string[]) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const updatedDetails = {
        ...prev[selectedPlan].details,
        [field]: value,
      };
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          details: updatedDetails,
        },
      };
    });
  }, [selectedPlan]);

  // Funções para Recursos Adicionais (additionalFeatures)
  const addAdditionalFeature = useCallback(() => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const currentFeatures = prev[selectedPlan].details.additionalFeatures || [];
      const newIndex = currentFeatures.length;
      const updatedFeatures = [...currentFeatures, ''];
      setEditingFeatureIndex(newIndex);
      setEditingDetailField('additionalFeatures');
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          details: {
            ...prev[selectedPlan].details,
            additionalFeatures: updatedFeatures,
          },
        },
      };
    });
  }, [selectedPlan]);

  const updateAdditionalFeature = useCallback((index: number, value: string) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const updatedFeatures = prev[selectedPlan].details.additionalFeatures.map((feature, i) =>
        i === index ? value : feature
      );
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          details: {
            ...prev[selectedPlan].details,
            additionalFeatures: updatedFeatures,
          },
        },
      };
    });
  }, [selectedPlan]);

  const deleteAdditionalFeature = useCallback((index: number) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const updatedFeatures = prev[selectedPlan].details.additionalFeatures.filter((_, i) => i !== index);
      toast.info('Recurso adicional removido.');
      setEditingFeatureIndex(null);
      setEditingDetailField(null);
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          details: {
            ...prev[selectedPlan].details,
            additionalFeatures: updatedFeatures,
          },
        },
      };
    });
  }, [selectedPlan]);

  // Funções para Integrações (integrations)
  const addIntegration = useCallback(() => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const currentIntegrations = prev[selectedPlan].details.integrations || [];
      const newIndex = currentIntegrations.length;
      const updatedIntegrations = [...currentIntegrations, ''];
      setEditingFeatureIndex(newIndex); // Reutilizando para integrações
      setEditingDetailField('integrations');
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          details: {
            ...prev[selectedPlan].details,
            integrations: updatedIntegrations,
          },
        },
      };
    });
  }, [selectedPlan]);

  const updateIntegration = useCallback((index: number, value: string) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const updatedIntegrations = (prev[selectedPlan].details.integrations || []).map((integration, i) =>
        i === index ? value : integration
      );
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          details: {
            ...prev[selectedPlan].details,
            integrations: updatedIntegrations,
          },
        },
      };
    });
  }, [selectedPlan]);

  const deleteIntegration = useCallback((index: number) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const updatedIntegrations = (prev[selectedPlan].details.integrations || []).filter((_, i) => i !== index);
      toast.info('Integração removida.');
      setEditingFeatureIndex(null);
      setEditingDetailField(null);
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          details: {
            ...prev[selectedPlan].details,
            integrations: updatedIntegrations,
          },
        },
      };
    });
  }, [selectedPlan]);

  // Funções para Cursos
  const addCourse = useCallback(() => {
    const newCourseId = `new-${Date.now()}`;
    const newCourse: CourseItem = {
      id: newCourseId,
      title: '',
      description: '',
      tags: [],
      icon: '',
    };
    setCurrentConfig((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          courses: [...prev[selectedPlan].courses, newCourse],
        },
      };
    });
    setEditingCourseId(newCourseId);
  }, [selectedPlan]);

  const updateCourse = useCallback((id: string, field: keyof CourseItem, value: string | string[] | number | undefined) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          courses: prev[selectedPlan].courses.map((course) =>
            course.id === id ? { ...course, [field]: value } : course
          ),
        },
      };
    });
  }, [selectedPlan]);

  const deleteCourse = useCallback((id: string) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      toast.info('Curso removido.');
      setEditingCourseId(null);
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          courses: prev[selectedPlan].courses.filter((course) => course.id !== id),
        },
      };
    });
  }, [selectedPlan]);

  // Funções para Plataformas
  const addPlatform = useCallback(() => {
    const newPlatformId = `new-plat-${Date.now()}`;
    const newPlatform: PlatformItem = {
      id: newPlatformId,
      name: '',
      description: '',
      link: '',
      icon: '',
    };
    setCurrentConfig((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          investmentPlatforms: [...prev[selectedPlan].investmentPlatforms, newPlatform],
        },
      };
    });
    setEditingPlatformId(newPlatformId);
  }, [selectedPlan]);

  const updatePlatform = useCallback((id: string, field: keyof PlatformItem, value: string) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          investmentPlatforms: prev[selectedPlan].investmentPlatforms.map((platform) =>
            platform.id === id ? { ...platform, [field]: value } : platform
          ),
        },
      };
    });
  }, [selectedPlan]);

  const deletePlatform = useCallback((id: string) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      toast.info('Plataforma removida.');
      setEditingPlatformId(null);
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          investmentPlatforms: prev[selectedPlan].investmentPlatforms.filter((platform) => platform.id !== id),
        },
      };
    });
  }, [selectedPlan]);

  // Funções para Dicas
  const addTip = useCallback(() => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const newIndex = prev[selectedPlan].tips.length;
      const updatedTips = [...prev[selectedPlan].tips, ''];
      setEditingTipIndex(newIndex);
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          tips: updatedTips,
        },
      };
    });
  }, [selectedPlan]);

  const updateTip = useCallback((index: number, value: string) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      const updatedTips = prev[selectedPlan].tips.map((tip, i) =>
        i === index ? value : tip
      );
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          tips: updatedTips,
        },
      };
    });
  }, [selectedPlan]);

  const deleteTip = useCallback((index: number) => {
    setCurrentConfig((prev) => {
      if (!prev) return null;
      toast.info('Dica removida.');
      setEditingTipIndex(null);
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          tips: prev[selectedPlan].tips.filter((_, i) => i !== index),
        },
      };
    });
  }, [selectedPlan]);

  // Se a configuração ainda não foi carregada, exibe tela de carregamento/erro
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 mr-2 animate-spin text-[#1A247E]" />
        <p className="text-xl text-gray-700">Carregando configurações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Erro ao Carregar Configurações</h2>
        <p className="text-lg mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white">
          Recarregar Página
        </Button>
      </div>
    );
  }

  // Garante que currentPlanDetails não seja null, pois currentConfig já foi verificado
  const currentPlanDetails = currentConfig![selectedPlan].details;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pt-20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">
                Configurações de Planos e Conteúdo
              </CardTitle>
              <CardDescription className="text-gray-600">
                Gerencie cursos, plataformas, recursos e dicas para cada plano de assinatura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="plan-select" className="text-lg font-semibold">
                  Selecionar Plano:
                </Label>
                <select
                  id="plan-select"
                  className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#1A247E] focus:border-[#1A247E] sm:text-sm rounded-md"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value as keyof AllPlansContent)}
                  aria-label="Selecionar Plano"
                >
                  {Object.keys(currentConfig!).map((planKey) => (
                    <option key={planKey} value={planKey}>
                      {planKey}
                    </option>
                  ))}
                </select>
              </div>

              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="details">Detalhes do Plano</TabsTrigger>
                  <TabsTrigger value="courses">Cursos</TabsTrigger>
                  <TabsTrigger value="platforms">Plataformas</TabsTrigger>
                  <TabsTrigger value="tips">Dicas</TabsTrigger>
                </TabsList>

                {/* Aba de Detalhes do Plano */}
                <TabsContent value="details" className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Detalhes do Plano {selectedPlan}</h3>
                  <Card className="p-4 shadow-sm space-y-4">
                    {/* Descrição do Plano */}
                    <div>
                      <Label htmlFor="plan-description">Descrição do Plano</Label>
                      {editingDetailField === 'description' ? (
                        <div className="flex gap-2 items-center">
                          <Textarea
                            id="plan-description"
                            value={currentPlanDetails.description}
                            onChange={(e) => updatePlanDetail('description', e.target.value)}
                            aria-label="Editar descrição do plano"
                            className="flex-grow"
                          />
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Salvar descrição"><Save className="w-5 h-5 text-green-600" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Cancelar edição de descrição"><X className="w-5 h-5 text-red-500" /></Button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">{currentPlanDetails.description}</p>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('description')} aria-label="Editar descrição"><Edit className="w-5 h-5 text-blue-500" /></Button>
                        </div>
                      )}
                    </div>

                    {/* Máximo de Alunos (para Escola Básica e Premium) */}
                    {(selectedPlan === 'Escola Básica' || selectedPlan === 'Escola Premium') && (
                      <div>
                        <Label htmlFor="max-students">Máximo de Alunos</Label>
                        {editingDetailField === 'maxStudents' ? (
                          <div className="flex gap-2 items-center">
                            <Input
                              id="max-students"
                              type="number"
                              value={currentPlanDetails.maxStudents || ''}
                              onChange={(e) => updatePlanDetail('maxStudents', parseInt(e.target.value) || 0)}
                              aria-label="Editar máximo de alunos"
                              className="flex-grow"
                            />
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Salvar máximo de alunos"><Save className="w-5 h-5 text-green-600" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Cancelar edição de máximo de alunos"><X className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p className="text-gray-700">{currentPlanDetails.maxStudents || 'Não especificado'}</p>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('maxStudents')} aria-label="Editar máximo de alunos"><Edit className="w-5 h-5 text-blue-500" /></Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Mínimo de Alunos (apenas para Escola Premium e Rede de Ensino) */}
                    {(selectedPlan === 'Escola Premium' || selectedPlan === 'Rede de Ensino') && (
                      <div>
                        <Label htmlFor="min-students">Mínimo de Alunos</Label>
                        {editingDetailField === 'minStudents' ? (
                          <div className="flex gap-2 items-center">
                            <Input
                              id="min-students"
                              type="number"
                              value={currentPlanDetails.minStudents || ''}
                              onChange={(e) => updatePlanDetail('minStudents', parseInt(e.target.value) || 0)}
                              aria-label="Editar mínimo de alunos"
                              className="flex-grow"
                            />
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Salvar mínimo de alunos"><Save className="w-5 h-5 text-green-600" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Cancelar edição de mínimo de alunos"><X className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p className="text-gray-700">{currentPlanDetails.minStudents || 'Não especificado'}</p>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('minStudents')} aria-label="Editar mínimo de alunos"><Edit className="w-5 h-5 text-blue-500" /></Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Vagas para Treinamento de Professores (apenas para Escola Premium e Rede de Ensino) */}
                    {(selectedPlan === 'Escola Premium' || selectedPlan === 'Rede de Ensino') && (
                      <div>
                        <Label htmlFor="teacher-training-spots">Vagas para Treinamento de Professores</Label>
                        {editingDetailField === 'teacherTrainingSpots' ? (
                          <div className="flex gap-2 items-center">
                            <Input
                              id="teacher-training-spots"
                              type="number"
                              value={currentPlanDetails.teacherTrainingSpots || ''}
                              onChange={(e) => updatePlanDetail('teacherTrainingSpots', parseInt(e.target.value) || 0)}
                              aria-label="Editar vagas para treinamento de professores"
                              className="flex-grow"
                            />
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Salvar vagas para treinamento de professores"><Save className="w-5 h-5 text-green-600" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Cancelar edição de vagas para treinamento de professores"><X className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p className="text-gray-700">{currentPlanDetails.teacherTrainingSpots || 'Não especificado'}</p>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('teacherTrainingSpots')} aria-label="Editar vagas para treinamento de professores"><Edit className="w-5 h-5 text-blue-500" /></Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Duração do Acesso */}
                    <div>
                      <Label htmlFor="access-duration">Duração do Acesso</Label>
                      {editingDetailField === 'accessDuration' ? (
                        <div className="flex gap-2 items-center">
                          <Input
                            id="access-duration"
                            value={currentPlanDetails.accessDuration || ''}
                            onChange={(e) => updatePlanDetail('accessDuration', e.target.value)}
                            aria-label="Editar duração do acesso"
                            className="flex-grow"
                          />
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Salvar duração do acesso"><Save className="w-5 h-5 text-green-600" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Cancelar edição de duração do acesso"><X className="w-5 h-5 text-red-500" /></Button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">{currentPlanDetails.accessDuration || 'Não especificado'}</p>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('accessDuration')} aria-label="Editar duração do acesso"><Edit className="w-5 h-5 text-blue-500" /></Button>
                        </div>
                      )}
                    </div>

                    {/* Nível de Suporte */}
                    <div>
                      <Label htmlFor="support-level">Nível de Suporte</Label>
                      {editingDetailField === 'supportLevel' ? (
                        <div className="flex gap-2 items-center">
                          <Input
                            id="support-level"
                            value={currentPlanDetails.supportLevel || ''}
                            onChange={(e) => updatePlanDetail('supportLevel', e.target.value)}
                            aria-label="Editar nível de suporte"
                            className="flex-grow"
                          />
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Salvar nível de suporte"><Save className="w-5 h-5 text-green-600" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)} aria-label="Cancelar edição de nível de suporte"><X className="w-5 h-5 text-red-500" /></Button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">{currentPlanDetails.supportLevel || 'Não especificado'}</p>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('supportLevel')} aria-label="Editar nível de suporte"><Edit className="w-5 h-5 text-blue-500" /></Button>
                        </div>
                      )}
                    </div>

                    {/* Recursos Adicionais do Plano */}
                    <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Recursos Adicionais:</h4>
                    {currentPlanDetails.additionalFeatures.length === 0 && (
                      <p className="text-gray-500">Nenhum recurso adicional cadastrado para este plano.</p>
                    )}
                    {currentPlanDetails.additionalFeatures.map((feature, index) => (
                      <Card key={`feat-${index}`} className="p-4 flex items-center justify-between shadow-sm mb-2">
                        {editingFeatureIndex === index && editingDetailField === 'additionalFeatures' ? (
                          <div className="flex-grow flex items-center gap-2">
                            <Input
                              value={feature}
                              onChange={(e) => updateAdditionalFeature(index, e.target.value)}
                              aria-label={`Editar recurso adicional ${index + 1}`}
                            />
                            <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(null); setEditingDetailField(null); }} aria-label="Salvar recurso adicional"><Save className="w-5 h-5 text-green-600" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(null); setEditingDetailField(null); }} aria-label="Cancelar edição de recurso adicional"><X className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        ) : (
                          <p className="flex-grow text-gray-700">{feature}</p>
                        )}
                        <div className="flex space-x-2 ml-4">
                          <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(index); setEditingDetailField('additionalFeatures'); }} aria-label={`Editar recurso adicional ${index + 1}`}><Edit className="w-5 h-5 text-blue-500" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteAdditionalFeature(index)} aria-label={`Remover recurso adicional ${index + 1}`}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                        </div>
                      </Card>
                    ))}
                    <Button onClick={addAdditionalFeature} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2" aria-label="Adicionar novo recurso adicional">
                      <PlusCircle className="mr-2" size={16} /> Adicionar Recurso Adicional
                    </Button>

                    {/* Integrações (apenas para Rede de Ensino) */}
                    {selectedPlan === 'Rede de Ensino' && (
                      <>
                        <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Integrações:</h4>
                        {(currentPlanDetails.integrations || []).length === 0 && (
                          <p className="text-gray-500">Nenhuma integração cadastrada para este plano.</p>
                        )}
                        {(currentPlanDetails.integrations || []).map((integration, index) => (
                          <Card key={`int-${index}`} className="p-4 flex items-center justify-between shadow-sm mb-2">
                            {editingFeatureIndex === index && editingDetailField === 'integrations' ? (
                              <div className="flex-grow flex items-center gap-2">
                                <Input
                                  value={integration}
                                  onChange={(e) => updateIntegration(index, e.target.value)}
                                  aria-label={`Editar integração ${index + 1}`}
                                />
                                <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(null); setEditingDetailField(null); }} aria-label="Salvar integração"><Save className="w-5 h-5 text-green-600" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(null); setEditingDetailField(null); }} aria-label="Cancelar edição de integração"><X className="w-5 h-5 text-red-500" /></Button>
                              </div>
                            ) : (
                              <p className="flex-grow text-gray-700">{integration}</p>
                            )}
                            <div className="flex space-x-2 ml-4">
                              <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(index); setEditingDetailField('integrations'); }} aria-label={`Editar integração ${index + 1}`}><Edit className="w-5 h-5 text-blue-500" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteIntegration(index)} aria-label={`Remover integração ${index + 1}`}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                            </div>
                          </Card>
                        ))}
                        <Button onClick={addIntegration} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2" aria-label="Adicionar nova integração">
                          <PlusCircle className="mr-2" size={16} /> Adicionar Integração
                        </Button>
                      </>
                    )}
                  </Card>
                </TabsContent>

                {/* Aba de Cursos */}
                <TabsContent value="courses" className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Cursos do Plano {selectedPlan}</h3>
                  {currentConfig[selectedPlan].courses.length === 0 && (
                    <p className="text-gray-500">Nenhum curso cadastrado para este plano.</p>
                  )}
                  {currentConfig[selectedPlan].courses.map((course) => (
                    <Card key={course.id} className="p-4 shadow-sm">
                      {editingCourseId === course.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`course-title-${course.id}`}>Título</Label>
                            <Input
                              id={`course-title-${course.id}`}
                              value={course.title}
                              onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                              aria-label={`Editar título do curso ${course.title}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`course-description-${course.id}`}>Descrição</Label>
                            <Textarea
                              id={`course-description-${course.id}`}
                              value={course.description}
                              onChange={(e) => updateCourse(course.id, 'description', e.target.value)}
                              aria-label={`Editar descrição do curso ${course.title}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`course-icon-${course.id}`}>Ícone (Nome Lucide-React)</Label>
                            <Input
                              id={`course-icon-${course.id}`}
                              value={course.icon || ''}
                              onChange={(e) => updateCourse(course.id, 'icon', e.target.value)}
                              aria-label={`Editar ícone do curso ${course.title}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`course-tags-${course.id}`}>Tags (separadas por vírgula)</Label>
                            <Input
                              id={`course-tags-${course.id}`}
                              value={course.tags.join(', ')}
                              onChange={(e) => updateCourse(course.id, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                              aria-label={`Editar tags do curso ${course.title}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`course-duration-${course.id}`}>Duração (horas)</Label>
                            <Input
                              id={`course-duration-${course.id}`}
                              type="number"
                              value={course.durationHours || ''}
                              onChange={(e) => updateCourse(course.id, 'durationHours', parseInt(e.target.value) || undefined)}
                              aria-label={`Editar duração do curso ${course.title}`}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingCourseId(null)} aria-label="Cancelar edição de curso"><X className="w-5 h-5 text-red-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingCourseId(null)} aria-label="Salvar curso"><Save className="w-5 h-5 text-green-600" /></Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-lg font-semibold">{course.title}</p>
                            <p className="text-sm text-gray-600">{course.description}</p>
                            {course.icon && <p className="text-xs text-gray-500 mt-1">Ícone: {course.icon}</p>}
                            {course.tags.length > 0 && (
                              <p className="text-xs text-gray-500 mt-1">Tags: {course.tags.join(', ')}</p>
                            )}
                            {course.durationHours && <p className="text-xs text-gray-500 mt-1">Duração: {course.durationHours}h</p>}
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button variant="ghost" size="icon" onClick={() => setEditingCourseId(course.id)} aria-label={`Editar curso ${course.title}`}><Edit className="w-5 h-5 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteCourse(course.id)} aria-label={`Remover curso ${course.title}`}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                  <Button onClick={addCourse} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2" aria-label="Adicionar novo curso">
                    <PlusCircle className="mr-2" size={16} /> Adicionar Curso
                  </Button>
                </TabsContent>

                {/* Aba de Plataformas */}
                <TabsContent value="platforms" className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Plataformas de Investimento do Plano {selectedPlan}</h3>
                  {currentConfig[selectedPlan].investmentPlatforms.length === 0 && (
                    <p className="text-gray-500">Nenhuma plataforma de investimento cadastrada para este plano.</p>
                  )}
                  {currentConfig[selectedPlan].investmentPlatforms.map((platform) => (
                    <Card key={platform.id} className="p-4 shadow-sm">
                      {editingPlatformId === platform.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`platform-name-${platform.id}`}>Nome</Label>
                            <Input
                              id={`platform-name-${platform.id}`}
                              value={platform.name}
                              onChange={(e) => updatePlatform(platform.id, 'name', e.target.value)}
                              aria-label={`Editar nome da plataforma ${platform.name}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`platform-description-${platform.id}`}>Descrição</Label>
                            <Textarea
                              id={`platform-description-${platform.id}`}
                              value={platform.description}
                              onChange={(e) => updatePlatform(platform.id, 'description', e.target.value)}
                              aria-label={`Editar descrição da plataforma ${platform.name}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`platform-link-${platform.id}`}>Link</Label>
                            <Input
                              id={`platform-link-${platform.id}`}
                              value={platform.link}
                              onChange={(e) => updatePlatform(platform.id, 'link', e.target.value)}
                              aria-label={`Editar link da plataforma ${platform.name}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`platform-icon-${platform.id}`}>Ícone (Nome Lucide-React)</Label>
                            <Input
                              id={`platform-icon-${platform.id}`}
                              value={platform.icon || ''}
                              onChange={(e) => updatePlatform(platform.id, 'icon', e.target.value)}
                              aria-label={`Editar ícone da plataforma ${platform.name}`}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingPlatformId(null)} aria-label="Cancelar edição de plataforma"><X className="w-5 h-5 text-red-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingPlatformId(null)} aria-label="Salvar plataforma"><Save className="w-5 h-5 text-green-600" /></Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-lg font-semibold">{platform.name}</p>
                            <p className="text-sm text-gray-600">{platform.description}</p>
                            <p className="text-sm text-gray-600">Link: <a href={platform.link} target="_blank" rel="noopener noreferrer" className="text-[#1A247E] hover:underline" aria-label={`Acessar link da plataforma ${platform.name}`}>{platform.link}</a></p>
                            {platform.icon && <p className="text-xs text-gray-500 mt-1">Ícone: {platform.icon}</p>}
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button variant="ghost" size="icon" onClick={() => setEditingPlatformId(platform.id)} aria-label={`Editar plataforma ${platform.name}`}><Edit className="w-5 h-5 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => deletePlatform(platform.id)} aria-label={`Remover plataforma ${platform.name}`}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                  <Button onClick={addPlatform} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2" aria-label="Adicionar nova plataforma">
                    <PlusCircle className="mr-2" size={16} /> Adicionar Plataforma
                  </Button>
                </TabsContent>

                {/* Aba de Dicas */}
                <TabsContent value="tips" className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Dicas do Plano {selectedPlan}</h3>
                  {currentConfig[selectedPlan].tips.length === 0 && (
                    <p className="text-gray-500">Nenhuma dica cadastrada para este plano.</p>
                  )}
                  {currentConfig[selectedPlan].tips.map((tip, index) => (
                    <Card key={`tip-${index}`} className="p-4 flex items-center justify-between shadow-sm mb-2">
                      {editingTipIndex === index ? ( // Check if this tip is currently being edited
                        <div className="flex-grow flex items-center gap-2">
                          <Input
                            value={tip}
                            onChange={(e) => updateTip(index, e.target.value)}
                            aria-label={`Editar dica ${index + 1}`}
                          />
                          <Button variant="ghost" size="icon" onClick={() => setEditingTipIndex(null)} aria-label="Salvar dica"><Save className="w-5 h-5 text-green-600" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => setEditingTipIndex(null)} aria-label="Cancelar edição de dica"><X className="w-5 h-5 text-red-500" /></Button>
                        </div>
                      ) : (
                        <p className="flex-grow text-gray-700">{tip}</p>
                      )}
                      <div className="flex space-x-2 ml-4">
                        <Button variant="ghost" size="icon" onClick={() => setEditingTipIndex(index)} aria-label={`Editar dica ${index + 1}`}><Edit className="w-5 h-5 text-blue-500" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteTip(index)} aria-label={`Remover dica ${index + 1}`}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                      </div>
                    </Card>
                  ))}
                  <Button onClick={addTip} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2" aria-label="Adicionar nova dica">
                    <PlusCircle className="mr-2" size={16} /> Adicionar Dica
                  </Button>
                </TabsContent>
              </Tabs>
              <div className="mt-8 text-center">
                <Button onClick={handleSaveConfig} className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
                  Salvar Todas as Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
/**
 * Dados para as seções do rodapé.
 */
export const footerSectionsData: FooterSection[] = [
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", to: "/sobre" },
      { label: "Equipe", to: "/equipe" },
      { label: "Contato", to: "/contato" },
    ],
  },
  {
    title: "Produtos",
    links: [
      { label: "Serviços", to: "/servicos" },
      { label: "Por Que Nós?", to: "/porque-nos" },
      { label: "Educação & Empresas", to: "/educacao-e-corporativo" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de Ajuda", to: "/faq" },
      { label: "Configurações de Segurança", to: "/" },
    ],
  },
];
