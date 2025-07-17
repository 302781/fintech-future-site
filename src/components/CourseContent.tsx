// src/components/CourseContent.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Clock } from 'lucide-react';
import LessonModal from './LessonModal'; 

interface Lesson {
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
}

// Dados mockados para as lições de cada curso
const gestaoFinanceiraLessons: Lesson[] = [
  {
    title: "Introdução à Gestão Financeira",
    description: "Conceitos básicos e importância da gestão financeira.",
    duration: "25 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_1"
  },
  {
    title: "Orçamento Pessoal",
    description: "Como criar e manter um orçamento eficaz.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_2"
  },
  {
    title: "Controle de Gastos",
    description: "Estratégias para controlar e reduzir seus gastos.",
    duration: "28 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_3"
  },
];

const planejamentoFinanceiroLessons: Lesson[] = [
  {
    title: "Definindo Metas Financeiras",
    description: "Como definir e alcançar suas metas financeiras.",
    duration: "22 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_4"
  },
  {
    title: "Planejamento de Aposentadoria",
    description: "Planeje sua aposentadoria de forma inteligente.",
    duration: "35 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_5"
  },
  {
    title: "Investimentos para o Futuro",
    description: "Melhores opções de investimentos para o longo prazo.",
    duration: "32 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_6"
  },
];

const fluxoCaixaLessons: Lesson[] = [
  {
    title: "Gerenciamento de Fluxo de Caixa",
    description: "Como gerenciar seu fluxo de caixa pessoal.",
    duration: "27 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_7"
  },
  {
    title: "Análise de Fluxo de Caixa",
    description: "Aprenda a analisar seu fluxo de caixa para tomar decisões.",
    duration: "31 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_8"
  },
  {
    title: "Estratégias para Melhorar o Fluxo de Caixa",
    description: "Dicas para aumentar seu fluxo de caixa.",
    duration: "29 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_9"
  },
];

const analiseInvestimentosLessons: Lesson[] = [
  {
    title: "Introdução aos Investimentos",
    description: "Conceitos básicos sobre investimentos.",
    duration: "24 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_10"
  },
  {
    title: "Análise de Risco",
    description: "Como avaliar o risco de diferentes investimentos.",
    duration: "33 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_11"
  },
  {
    title: "Diversificação de Carteira",
    description: "A importância da diversificação para reduzir riscos.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_12"
  },
];

const criancasLessons: Lesson[] = [
  {
    title: "O que é Dinheiro?",
    description: "Ensinando o valor do dinheiro para crianças.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_13"
  },
  {
    title: "Como Poupar?",
    description: "Dicas para crianças aprenderem a poupar.",
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_14"
  },
  {
    title: "Sonhos e Metas",
    description: "Ajudando crianças a definirem seus sonhos financeiros.",
    duration: "16 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_15"
  },
];

const adolescentesLessons: Lesson[] = [
  {
    title: "Primeiro Emprego",
    description: "Dicas para adolescentes que estão começando a trabalhar.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_16"
  },
  {
    title: "Gerenciando a Mesada",
    description: "Como usar a mesada de forma inteligente.",
    duration: "23 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_17"
  },
  {
    title: "Investimentos para Jovens",
    description: "Opções de investimentos para adolescentes.",
    duration: "21 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_18"
  },
];

const controleGastosLessons: Lesson[] = [
  {
    title: "Planilha de Gastos",
    description: "Como criar e usar uma planilha de gastos.",
    duration: "26 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_19"
  },
  {
    title: "Aplicativos de Controle Financeiro",
    description: "Melhores aplicativos para controlar seus gastos.",
    duration: "29 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_20"
  },
  {
    title: "Redução de Dívidas",
    description: "Estratégias para reduzir suas dívidas.",
    duration: "28 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_21"
  },
];

const paisLessons: Lesson[] = [
  {
    title: "Ensinando o Valor do Trabalho",
    description: "Como ensinar seus filhos sobre o valor do trabalho.",
    duration: "25 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_22"
  },
  {
    title: "Planejamento Familiar",
    description: "Planejando as finanças da família.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_23"
  },
  {
    title: "Investimentos para a Família",
    description: "Melhores opções de investimentos para famílias.",
    duration: "27 min",
    videoUrl: "https://www.youtube.com/embed/your_video_id_24"
  },
];

// Interface para as props do componente CourseContent
interface CourseItem { // Esta interface deve ser a mesma que em Cursos.tsx
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags: string[];
}

interface CourseContentProps {
  courses: CourseItem[]; // A prop 'courses' é um array de CourseItem
  IconMap: { [key: string]: React.ElementType }; // A prop 'IconMap' é um objeto de mapeamento de ícones
}

const CourseContent: React.FC<CourseContentProps> = ({ courses, IconMap }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleWatchLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const renderLessonCard = (lesson: Lesson, index: number) => (
    <Card key={index} className="hover:shadow-lg transition-all duration-300">
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

      <Tabs defaultValue="gestao" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="gestao">Gestão</TabsTrigger>
          <TabsTrigger value="planejamento">Planejamento</TabsTrigger>
          <TabsTrigger value="fluxo">Fluxo Caixa</TabsTrigger>
          <TabsTrigger value="investimentos">Investimentos</TabsTrigger>
          <TabsTrigger value="criancas">Crianças</TabsTrigger>
          <TabsTrigger value="adolescentes">Adolescentes</TabsTrigger>
          <TabsTrigger value="gastos">Controle Gastos</TabsTrigger>
          <TabsTrigger value="pais">Pais</TabsTrigger>
        </TabsList>

        <TabsContent value="gestao" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Gestão Financeira</h3>
            <p className="text-gray-600">Aprenda os fundamentos da gestão financeira pessoal e empresarial</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gestaoFinanceiraLessons.map((lesson, index) => renderLessonCard(lesson, index))}
          </div>
        </TabsContent>

        <TabsContent value="planejamento" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Planejamento Financeiro</h3>
            <p className="text-gray-600">Organize suas finanças e planeje seu futuro</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planejamentoFinanceiroLessons.map((lesson, index) => renderLessonCard(lesson, index))}
          </div>
        </TabsContent>

        <TabsContent value="fluxo" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Controle de Fluxo de Caixa</h3>
            <p className="text-gray-600">Domine o controle de entrada e saída de recursos</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fluxoCaixaLessons.map((lesson, index) => renderLessonCard(lesson, index))}
          </div>
        </TabsContent>

        <TabsContent value="investimentos" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Análise de Investimentos</h3>
            <p className="text-gray-600">Aprenda a analisar e escolher os melhores investimentos</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analiseInvestimentosLessons.map((lesson, index) => renderLessonCard(lesson, index))}
          </div>
        </TabsContent>

        <TabsContent value="criancas" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Educação Financeira Infantil</h3>
            <p className="text-gray-600">Ensine conceitos financeiros básicos para crianças de forma lúdica</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criancasLessons.map((lesson, index) => renderLessonCard(lesson, index))}
          </div>
        </TabsContent>

        <TabsContent value="adolescentes" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Finanças para Adolescentes</h3>
            <p className="text-gray-600">Primeiros passos no mundo financeiro para jovens</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adolescentesLessons.map((lesson, index) => renderLessonCard(lesson, index))}
          </div>
        </TabsContent>

        <TabsContent value="gastos" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Controle de Gastos</h3>
            <p className="text-gray-600">Técnicas eficazes para controlar e reduzir gastos</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controleGastosLessons.map((lesson, index) => renderLessonCard(lesson, index))}
          </div>
        </TabsContent>

        <TabsContent value="pais" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Educação Financeira para Pais</h3>
            <p className="text-gray-600">Como ensinar educação financeira para seus filhos</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paisLessons.map((lesson, index) => renderLessonCard(lesson, index))}
          </div>
        </TabsContent>
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
