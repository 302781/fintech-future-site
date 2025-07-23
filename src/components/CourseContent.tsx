import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Clock, Star, PlayCircle } from 'lucide-react';
import LessonModal from './LessonModal'; 
import { useAuth } from '@/contexts/AuthContextHook'; 
import { Link } from 'react-router-dom'; 
interface Lesson {
  id: string; 
  title: string;
  description: string;
  duration: string;
  videoUrl: string;

}

interface CourseItem { 
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags: string[];
  requiredPlan?: 'Escola Básica' | 'Premium' | 'Rede de Ensino';
}

interface CourseContentProps {
  courses: CourseItem[]; 
  IconMap: { [key: string]: React.ElementType }; 
}


const gestaoFinanceiraLessons: Lesson[] = [
  { id: "gf1", title: "Introdução à Gestão Financeira", description: "Conceitos básicos e importância da gestão financeira.", duration: "25 min", videoUrl: "https://www.youtube.com/embed/your_video_id_1" },
  { id: "gf2", title: "Orçamento Pessoal", description: "Como criar e manter um orçamento eficaz.", duration: "30 min", videoUrl: "https://www.youtube.com/embed/your_video_id_2" },
  { id: "gf3", title: "Controle de Gastos", description: "Estratégias para controlar e reduzir seus gastos.", duration: "28 min", videoUrl: "https://www.youtube.com/embed/your_video_id_3" },
];

const planejamentoFinanceiroLessons: Lesson[] = [
  { id: "pf1", title: "Definindo Metas Financeiras", description: "Como definir e alcançar suas metas financeiras.", duration: "22 min", videoUrl: "https://www.youtube.com/embed/your_video_id_4" },
  { id: "pf2", title: "Planejamento de Aposentadoria", description: "Planeje sua aposentadoria de forma inteligente.", duration: "35 min", videoUrl: "https://www.youtube.com/embed/your_video_id_5" },
  { id: "pf3", title: "Investimentos para o Futuro", description: "Melhores opções de investimentos para o longo prazo.", duration: "32 min", videoUrl: "https://www.youtube.com/embed/your_video_id_6" },
];

const fluxoCaixaLessons: Lesson[] = [
  { id: "fc1", title: "Gerenciamento de Fluxo de Caixa", description: "Como gerenciar seu fluxo de caixa pessoal.", duration: "27 min", videoUrl: "https://www.youtube.com/embed/your_video_id_7" },
  { id: "fc2", title: "Análise de Fluxo de Caixa", description: "Aprenda a analisar seu fluxo de caixa para tomar decisões.", duration: "31 min", videoUrl: "https://www.youtube.com/embed/your_video_id_8" },
  { id: "fc3", title: "Estratégias para Melhorar o Fluxo de Caixa", description: "Dicas para aumentar seu fluxo de caixa.", duration: "29 min", videoUrl: "https://www.youtube.com/embed/your_video_id_9" },
];

const analiseInvestimentosLessons: Lesson[] = [
  { id: "ai1", title: "Introdução aos Investimentos", description: "Conceitos básicos sobre investimentos.", duration: "24 min", videoUrl: "https://www.youtube.com/embed/your_video_id_10" },
  { id: "ai2", title: "Análise de Risco", description: "Como avaliar o risco de diferentes investimentos.", duration: "33 min", videoUrl: "https://www.youtube.com/embed/your_video_id_11" },
  { id: "ai3", title: "Diversificação de Carteira", description: "A importância da diversificação para reduzir riscos.", duration: "30 min", videoUrl: "https://www.youtube.com/embed/your_video_id_12" },
];

const criancasLessons: Lesson[] = [
  { id: "cr1", title: "O que é Dinheiro?", description: "Ensinando o valor do dinheiro para crianças.", duration: "15 min", videoUrl: "https://www.youtube.com/embed/your_video_id_13" },
  { id: "cr2", title: "Como Poupar?", description: "Dicas para crianças aprenderem a poupar.", duration: "18 min", videoUrl: "https://www.youtube.com/embed/your_video_id_14" },
  { id: "cr3", title: "Sonhos e Metas", description: "Ajudando crianças a definirem seus sonhos financeiros.", duration: "16 min", videoUrl: "https://www.youtube.com/embed/your_video_id_15" },
];

const adolescentesLessons: Lesson[] = [
  { id: "ad1", title: "Primeiro Emprego", description: "Dicas para adolescentes que estão começando a trabalhar.", duration: "20 min", videoUrl: "https://www.youtube.com/embed/your_video_id_16" },
  { id: "ad2", title: "Gerenciando a Mesada", description: "Como usar a mesada de forma inteligente.", duration: "23 min", videoUrl: "https://www.youtube.com/embed/your_video_id_17" },
  { id: "ad3", title: "Investimentos para Jovens", description: "Opções de investimentos para adolescentes.", duration: "21 min", videoUrl: "https://www.youtube.com/embed/your_video_id_18" },
];

const controleGastosLessons: Lesson[] = [
  { id: "cg1", title: "Planilha de Gastos", description: "Como criar e usar uma planilha de gastos.", duration: "26 min", videoUrl: "https://www.youtube.com/embed/your_video_id_19" },
  { id: "cg2", title: "Aplicativos de Controle Financeiro", description: "Melhores aplicativos para controlar seus gastos.", duration: "29 min", videoUrl: "https://www.youtube.com/embed/your_video_id_20" },
  { id: "cg3", title: "Redução de Dívidas", description: "Estratégias para reduzir suas dívidas.", duration: "28 min", videoUrl: "https://www.youtube.com/embed/your_video_id_21" },
];

const paisLessons: Lesson[] = [
  { id: "ps1", title: "Ensinando o Valor do Trabalho", description: "Como ensinar seus filhos sobre o valor do trabalho.", duration: "25 min", videoUrl: "https://www.youtube.com/embed/your_video_id_22" },
  { id: "ps2", title: "Planejamento Familiar", description: "Planejando as finanças da família.", duration: "30 min", videoUrl: "https://www.youtube.com/embed/your_video_id_23" },
  { id: "ps3", title: "Investimentos para a Família", description: "Melhores opções de investimentos para famílias.", duration: "27 min", videoUrl: "https://www.youtube.com/embed/your_video_id_24" },
];

const courseLessonsMap: { [key: string]: Lesson[] } = {
  gestao: gestaoFinanceiraLessons,
  planejamento: planejamentoFinanceiroLessons,
  fluxo: fluxoCaixaLessons,
  investimentos: analiseInvestimentosLessons,
  criancas: criancasLessons,
  adolescentes: adolescentesLessons,
  gastos: controleGastosLessons,
  pais: paisLessons,
};

// Definição dos cursos principais com suas permissões de plano
const allMainCourses: CourseItem[] = [
  { id: "1", title: "Gestão Financeira", description: "Aprenda os fundamentos da gestão financeira pessoal e empresarial", icon: "DollarSign", tags: ["Básico", "Adultos"], requiredPlan: 'Escola Básica' },
  { id: "2", title: "Planejamento Financeiro", description: "Organize suas finanças e planeje seu futuro", icon: "Calendar", tags: ["Intermediário", "Adultos"], requiredPlan: 'Premium' },
  { id: "3", title: "Controle de Fluxo de Caixa", description: "Domine o controle de entrada e saída de recursos", icon: "TrendingUp", tags: ["Intermediário", "Empresarial"], requiredPlan: 'Rede de Ensino' },
  { id: "4", title: "Análise de Investimentos", description: "Aprenda a analisar e escolher os melhores investimentos", icon: "LineChart", tags: ["Avançado", "Adultos"], requiredPlan: 'Premium' },
  { id: "5", title: "Educação Financeira Infantil", description: "Ensine conceitos financeiros básicos para crianças de forma lúdica", icon: "Smile", tags: ["Crianças", "Pais"], requiredPlan: 'Escola Básica' },
  { id: "6", title: "Finanças para Adolescentes", description: "Primeiros passos no mundo financeiro para jovens", icon: "User", tags: ["Adolescentes"], requiredPlan: 'Premium' },
  { id: "7", title: "Controle de Gastos", description: "Técnicas eficazes para controlar e reduzir gastos", icon: "ShoppingCart", tags: ["Básico", "Adultos"], requiredPlan: 'Escola Básica' },
  { id: "8", title: "Educação Financeira para Pais", description: "Como ensinar educação financeira para seus filhos", icon: "Users", tags: ["Pais"], requiredPlan: 'Premium' },
];


const CourseContent: React.FC<CourseContentProps> = ({ IconMap }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const { user, isAuthenticated } = useAuth(); 
  const userPlan = isAuthenticated ? user?.user_metadata?.plan_type : null;

  const accessibleMainCourses = allMainCourses.filter(course => {
    if (!course.requiredPlan) return true;
    return userPlan === course.requiredPlan;
  });

  if (accessibleMainCourses.length === 0) {
    const isGuest = !isAuthenticated;
    const isBasicUser = userPlan === 'Escola Básica';

    let message = 'Nenhum curso disponível para o seu plano no momento.';
    let subMessage = 'Acreditamos que a educação financeira deve ser acessível a todos. Temos cursos para diversas idades!';
    let actionButton = null;

    if (isGuest) {
      message = 'Faça login ou cadastre-se para acessar nossos cursos!';
      subMessage = 'Explore nossos planos para ver as opções de cursos disponíveis para você.';
      actionButton = (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/signin">Fazer Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/planos">Ver Planos</Link>
          </Button>
        </div>
      );
    } else if (isBasicUser) {
      message = 'Seu plano atual oferece cursos básicos. Considere fazer um upgrade para ter acesso a mais conteúdo!';
      subMessage = 'Temos cursos avançados de planejamento e investimento disponíveis nos planos Premium e Rede de Ensino.';
      actionButton = (
        <Button asChild variant="outline">
          <Link to="/planos">Ver Planos Premium</Link>
        </Button>
      );
    } else { 
      message = `Não há cursos disponíveis no momento para o seu plano (${userPlan}). Entre em contato com o suporte para mais informações.`;
      subMessage = 'Estamos sempre adicionando novos conteúdos para enriquecer sua jornada financeira.';
      actionButton = (
        <Button variant="outline">
          Falar com Suporte
        </Button>
      );
    }

    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <PlayCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {message}
          </h3>
          <p className="text-muted-foreground mb-6">
            {subMessage}
          </p>
          {actionButton}
        </div>
      </div>
    );
  }

  const defaultTabValue = accessibleMainCourses.length > 0 ? accessibleMainCourses[0].id : "gestao"; 
  const handleWatchLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const renderLessonCard = (lesson: Lesson, index: number) => (
    <Card key={lesson.id || index} className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">{lesson.title}</CardTitle>
            <CardDescription className="text-gray-600 mb-3">
              {lesson.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            <Clock className="w-3 h-3 mr-1" />
            {lesson.duration}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => handleWatchLesson(lesson)}
          className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
        >
          <Play className="w-4 h-4 mr-2" />
          Assistir
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cursos de Educação Financeira</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Desenvolva sua inteligência financeira com nossos cursos especializados para cada faixa etária e necessidade
        </p>
      </div>

      <Tabs defaultValue={defaultTabValue} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {accessibleMainCourses.map(course => (
            <TabsTrigger key={course.id} value={course.id}>
              {course.title.split(' ')[0]} 
            </TabsTrigger>
          ))}
        </TabsList>

        {accessibleMainCourses.map(course => (
          <TabsContent key={course.id} value={course.id} className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
              {courseLessonsMap[course.id.toLowerCase()] ? ( 
                courseLessonsMap[course.id.toLowerCase()].map((lesson, index) => renderLessonCard(lesson, index))
              ) : (
                <div className="col-span-full text-center text-muted-foreground">
                  Nenhuma aula disponível para este curso no momento.
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {selectedLesson && (
        <LessonModal
          isOpen={!!selectedLesson}
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
};

export default CourseContent;