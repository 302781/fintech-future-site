import React, { useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Award } from 'lucide-react';

// --- Interfaces para Tipagem dos Dados ---
interface PrincipleItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HistorySectionData {
  title: string;
  paragraph: string;
  imageUrl: string;
  imageAlt: string;
}

// --- Dados Consolidados da Página "Sobre" ---

const historyData: HistorySectionData = {
  title: "Nossa História",
  paragraph: "Fundada em 2025, a FinTech nasceu da necessidade de tornar a educação financeira acessível a todos os brasileiros. Nossos desenvolvedores identificaram que a falta de conhecimento financeiro era o principal obstáculo para a prosperidade das pessoas.",
  imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  imageAlt: "Equipe trabalhando em um escritório moderno, simbolizando o início da FinTech."
};

const principlesData: PrincipleItem[] = [
  {
    icon: <Target className="w-16 h-16 text-[#1A247E] mx-auto mb-6" />,
    title: "Missão",
    description: "Democratizar o acesso à educação financeira, proporcionando ferramentas e conhecimento para que todos possam construir um futuro próspero."
  },
  {
    icon: <Eye className="w-16 h-16 text-[#1A247E] mx-auto mb-6" />,
    title: "Visão",
    description: "Ser a principal referência em educação financeira na América Latina, transformando a vida de milhões de pessoas através do conhecimento."
  },
  {
    icon: <Award className="w-16 h-16 text-[#1A247E] mx-auto mb-6" />,
    title: "Valores",
    description: "Transparência, excelência, inovação e compromisso com o desenvolvimento financeiro sustentável de nossos clientes."
  }
];

// --- Subcomponente para renderizar um Card de Princípio (Missão, Visão, Valores) ---
interface PrincipleCardProps {
  principle: PrincipleItem;
}

const PrincipleCard: React.FC<PrincipleCardProps> = React.memo(({ principle }) => (
  <Card className="text-center hover:shadow-xl transition-all duration-300">
    <CardContent className="p-8">
      {principle.icon}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{principle.title}</h3>
      <p className="text-gray-600">{principle.description}</p>
    </CardContent>
  </Card>
));

// --- Componente Principal Sobre ---
const Sobre: React.FC = () => {
  // Memoiza os dados para evitar recriação desnecessária em cada renderização
  const history = useMemo(() => historyData, []);
  const principles = useMemo(() => principlesData, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main> {/* Usado <main> para semântica */}
        {/* Hero Section */}
        <section className="fintech-gradient pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Sobre a FinTech
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Somos uma empresa dedicada a democratizar o acesso à educação financeira e 
              transformar a relação das pessoas com o dinheiro
            </p>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{history.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{history.paragraph}</p>
              </div>
              <div>
                <img 
                  src={history.imageUrl}
                  alt={history.imageAlt} // Alt text descritivo e acessível
                  className="rounded-2xl shadow-xl w-full h-auto object-cover" // w-full h-auto object-cover para responsividade
                  loading="lazy" // Otimização de carregamento de imagem
                />
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nossos Princípios
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Valores que guiam nossa jornada para transformar vidas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, index) => (
                <PrincipleCard key={index} principle={principle} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Sobre;
