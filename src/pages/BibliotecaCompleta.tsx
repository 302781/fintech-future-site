import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Gamepad2, Video, Puzzle, Lightbulb, GraduationCap, DollarSign, PiggyBank, ShoppingCart, TrendingUp, Calculator, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Interfaces de Dados ---
interface FeatureCardItem {
  icon: string; // Nome do ícone como string
  title: string;
  description: string;
}

interface LevelCardItem {
  icon: string; // Nome do ícone como string
  title: string;
  description: string;
}

// --- Mapeamento de Nomes de String para Componentes de Ícone Reais do Lucide-React ---
const IconMap: { [key: string]: React.ElementType } = {
  BookOpen: BookOpen,
  Gamepad2: Gamepad2,
  Video: Video,
  Puzzle: Puzzle,
  Lightbulb: Lightbulb,
  GraduationCap: GraduationCap,
  DollarSign: DollarSign,
  PiggyBank: PiggyBank,
  ShoppingCart: ShoppingCart,
  TrendingUp: TrendingUp,
  Calculator: Calculator,
  Target: Target,
  Award: Award,
};

// --- Dados para as Seções (consolidados aqui) ---
const featureCardsData: FeatureCardItem[] = [
  {
    icon: 'Gamepad2',
    title: 'Jogos Educativos',
    description: 'Aprenda finanças de forma divertida e interativa com nossos jogos que simulam situações reais.',
  },
  {
    icon: 'Video',
    title: 'Vídeos Explicativos',
    description: 'Aulas animadas e didáticas que descomplicam os conceitos mais complexos de educação financeira.',
  },
  {
    icon: 'Puzzle',
    title: 'Atividades Interativas',
    description: 'Desafios práticos, quizzes e exercícios para fixar o aprendizado e testar seus conhecimentos.',
  },
];

const levelCardsData: LevelCardItem[] = [
  {
    icon: 'GraduationCap',
    title: 'Ensino Fundamental I & II',
    description: 'Introdução ao dinheiro, poupança, orçamento familiar e consumo consciente com atividades lúdicas.',
  },
  {
    icon: 'Lightbulb',
    title: 'Ensino Médio',
    description: 'Planejamento financeiro pessoal, juros, dívidas, introdução a investimentos e empreendedorismo.',
  },
  {
    icon: 'BookOpen',
    title: 'Ensino Superior & Profissional',
    description: 'Investimentos avançados, finanças corporativas, mercado de capitais e gestão de portfólio.',
  },
];

// --- Subcomponente para renderizar um Card de Recurso ---
interface FeatureCardProps {
  item: FeatureCardItem;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ item }) => {
  const IconComponent = IconMap[item.icon];
  return (
    <Card className="flex flex-col items-center p-6 text-center hover:shadow-lg transition-shadow">
      {IconComponent && <IconComponent className="w-16 h-16 text-[#1A247E] mb-4" />}
      <CardTitle className="text-2xl font-bold mb-2">{item.title}</CardTitle>
      <CardDescription className="text-gray-600">
        {item.description}
      </CardDescription>
    </Card>
  );
};

// --- Subcomponente para renderizar um Card de Nível de Ensino ---
interface LevelCardProps {
  item: LevelCardItem;
}

const LevelCard: React.FC<LevelCardProps> = ({ item }) => {
  const IconComponent = IconMap[item.icon];
  return (
    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
      {IconComponent && <IconComponent className="w-12 h-12 text-[#1A247E] mx-auto mb-4" />}
      <CardTitle className="text-xl font-bold mb-2">{item.title}</CardTitle>
      <CardDescription className="text-gray-600">
        {item.description}
      </CardDescription>
    </Card>
  );
};

// --- Componente Principal BibliotecaCompleta ---
const BibliotecaCompleta = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20"> {/* Usado <main> para semântica */}
        {/* Header da Biblioteca */}
        <section className="fintech-gradient py-20 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Biblioteca Completa</h1>
            <p className="text-xl text-blue-100">
              Acesso ilimitado ao nosso universo de conhecimento financeiro, para todos os níveis de ensino.
            </p>
          </div>
        </section>

        {/* Seção de Visão Geral do Conteúdo */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">O que você vai encontrar em nossa Biblioteca?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featureCardsData.map((item, index) => (
                <FeatureCard key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Níveis de Ensino */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Conteúdo para Todos os Níveis</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {levelCardsData.map((item, index) => (
                <LevelCard key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Chamada para Ação */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pronto para Mergulhar no Conhecimento?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Nossa Biblioteca Completa está disponível em todos os nossos planos corporativos. Escolha o que melhor se adapta à sua instituição!
            </p>
            <Button asChild className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3 px-8">
              <Link to="/assinatura-corporativa" aria-label="Ver nossos planos de assinatura corporativa">Ver Nossos Planos</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BibliotecaCompleta;
