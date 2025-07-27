import React, { useMemo } from 'react'; // Adicionado useMemo para otimização
import Navigation from '@/components/Navigation'; // Certifique-se de que este caminho está correto para o seu componente de navegação
import Hero from '@/components/Hero'; // Importa o seu componente Hero
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer'; // Importa o seu componente Footer

// --- Interface para um item de plano resumido ---
interface PlanSummaryItem {
  id: string;
  title: string;
  description: string;
  price: string;
  priceUnit?: string; // Opcional, para "/mês"
  buttonText: string;
  buttonLink: string;
}

// --- Dados dos Planos Resumidos (consolidados aqui) ---
const plansData: PlanSummaryItem[] = [
  {
    id: 'individual',
    title: "Plano Individual",
    description: "Ideal para quem busca começar a organizar suas finanças pessoais.",
    price: "R$49",
    priceUnit: "/mês",
    buttonText: "Ver Detalhes",
    buttonLink: "/planos"
  },
  {
    id: 'premium',
    title: "Plano Premium",
    description: "Para quem busca acompanhamento e ferramentas avançadas de investimento.",
    price: "R$99",
    priceUnit: "/mês",
    buttonText: "Ver Detalhes",
    buttonLink: "/planos" // Altere para a rota do seu plano premium se for diferente
  },
  {
    id: 'corporativo',
    title: "Plano Corporativo",
    description: "Soluções educacionais financeiras personalizadas para escolas e empresas.",
    price: "Sob Consulta",
    buttonText: "Solicitar Orçamento",
    buttonLink: "/contratar-plano?plano=corporativo"
  }
];

// --- Subcomponente para renderizar um Cartão de Resumo de Plano ---
interface PlanSummaryCardProps {
  plan: PlanSummaryItem;
}

const PlanSummaryCard: React.FC<PlanSummaryCardProps> = ({ plan }) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-2xl font-semibold mb-2 text-gray-800">{plan.title}</h3>
      {/* Usando flex e h-20 para manter o alinhamento da descrição consistente */}
      <p className="text-gray-600 mb-4 h-20 flex items-center justify-center text-center">{plan.description}</p>
      <span className="text-3xl font-bold text-green-600">{plan.price}</span>
      {plan.priceUnit && <span className="text-lg text-gray-600">{plan.priceUnit}</span>}
      <Link to={plan.buttonLink} className="block mt-6" aria-label={`${plan.buttonText} do plano ${plan.title}`}>
        <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]">{plan.buttonText}</Button>
      </Link>
    </div>
  );
};

// --- Seção de Planos ---
const PlanosSection: React.FC = () => {
  // Memoiza os dados dos planos para evitar recriação desnecessária
  const plans = useMemo(() => plansData, []);

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold text-[#1A247E] mb-8">Conheça Nossos Planos</h2>
      <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
        Oferecemos planos flexíveis para indivíduos, famílias e instituições. Encontre o ideal para você e comece a transformar suas finanças!
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <PlanSummaryCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
};

// --- Componente da Página Inicial Principal ---
const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100"> {/* Fundo leve para a página */}
      <Navigation /> {/* Sua barra de navegação */}
      <Hero /> {/* O seu componente Hero, que é a primeira seção */}
      <PlanosSection /> {/* A seção resumida dos planos */}
      {/* Aqui você pode adicionar outras seções da sua home page, como: */}
      {/* <AboutUsSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <ContactCallToAction /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
