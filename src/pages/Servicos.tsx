import React, { useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Wallet, Target, BookOpen, Users, BarChart, Smartphone, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Importa o componente de Consultores Financeiros (assumindo que ele já foi refatorado para não ter seu próprio Navigation/Footer)
import ConsultoresFinanceirosContent from '@/pages/ConsultoresFinanceiros'; 

// --- Interfaces para Tipagem dos Dados ---
interface MainServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  imageUrl: string; // Adicionado para as imagens dinâmicas
  link: string; // Adicionado para o botão "Saiba Mais"
}

interface AdditionalServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string; // Adicionado link para serviços adicionais
}

interface FooterSectionItem {
  title: string;
  links: {
    label: string;
    to: string;
  }[];
}

// --- Dados Consolidados para Serviços Principais ---
const mainServicesData: MainServiceItem[] = [
  {
    icon: <TrendingUp className="w-16 h-16 text-[#1A247E]" />,
    title: "Investimentos Inteligentes",
    description: "Plataforma completa de investimentos com análise automatizada, recomendações personalizadas e acompanhamento em tempo real.",
    features: ["Carteiras automatizadas", "Análise de risco", "Rebalanceamento automático", "Relatórios detalhados"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/sobre"
  },
  {
    icon: <Wallet className="w-16 h-16 text-[#1A247E]" />,
    title: "Gestão Financeira Pessoal",
    description: "Controle total das suas finanças com categorização automática, alertas inteligentes e metas personalizadas.",
    features: ["Controle de gastos", "Planejamento orçamentário", "Alertas automáticos", "Análise de padrões"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/sobre"
  },
  {
    icon: <Target className="w-16 h-16 text-[#1A247E]" />,
    title: "Planejamento Financeiro",
    description: "Defina e alcance seus objetivos com nossa ferramenta de planejamento inteligente e simuladores avançados.",
    features: ["Simuladores de aposentadoria", "Planejamento de metas", "Projeções futuras", "Cenários otimistas/pessimistas"],
    imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b93f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/sobre"
  }
];

// --- Dados Consolidados para Serviços Adicionais ---
const additionalServicesData: AdditionalServiceItem[] = [
  {
    icon: <BookOpen className="w-12 h-12 text-[#1A247E]" />,
    title: "Educação Financeira",
    description: "Cursos, webinars e conteúdo exclusivo para desenvolver sua inteligência financeira.",
    link: "/educacao-e-corporativo" // Link para a página de educação
  },
  {
    icon: <Users className="w-12 h-12 text-[#1A247E]" />,
    title: "Consultoria Personalizada",
    description: "Acesso a especialistas certificados para orientação financeira individual.",
    link: "/consultores" // Link para a seção de consultores
  },
  {
    icon: <BarChart className="w-12 h-12 text-[#1A247E]" />,
    title: "Análise de Carteira",
    description: "Avaliação completa dos seus investimentos com sugestões de otimização."
    // Sem link específico, pois pode ser uma funcionalidade interna
  },
  {
    icon: <Smartphone className="w-12 h-12 text-[#1A247E]" />,
    title: "App Mobile",
    description: "Acesse todas as funcionalidades pelo nosso aplicativo mobile intuitivo."
    // Sem link específico, pode ser para uma página de download/informações
  },
  {
    icon: <Shield className="w-12 h-12 text-[#1A247E]" />,
    title: "Segurança Premium",
    description: "Proteção de dados com criptografia militar e autenticação biométrica.",
    link: "/seguranca" // Exemplo de link para página de segurança
  }
];

// --- Dados Consolidados para Seções do Rodapé ---
const footerSectionsData: FooterSectionItem[] = [
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
      { label: "Nossos Planos", to: "/planos" },
      { label: "Educação", to: "/educacao-e-corporativo" }, // Link mais direto para a página de educação
      { label: "Serviços", to: "/servicos" }, // Link para a própria página de serviços ou sub-serviços
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de Ajuda", to: "/faq" },
      { label: "Segurança", to: "/seguranca" },
    ],
  },
];

// --- Subcomponente para renderizar um Card de Serviço Principal ---
interface MainServiceCardProps {
  service: MainServiceItem;
  index: number;
}

const MainServiceCard: React.FC<MainServiceCardProps> = React.memo(({ service, index }) => (
  <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
      <div className="flex items-center mb-6">
        {service.icon}
        <h3 className="text-3xl font-bold text-gray-900 ml-4">{service.title}</h3>
      </div>
      <p className="text-lg text-gray-600 mb-6">{service.description}</p>
      <ul className="space-y-3 mb-8">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <div className="w-2 h-2 bg-[#1A247E] rounded-full mr-3 flex-shrink-0"></div> {/* flex-shrink-0 para evitar encolhimento */}
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Link to={service.link} aria-label={`Saiba mais sobre ${service.title}`}>
        <Button className="bg-[#1A247E] hover:bg-[#2D4DE0]">
          Saiba Mais
        </Button>
      </Link>
    </div>
    <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
      <img 
        src={service.imageUrl} 
        alt={service.title} // Alt text descritivo
        className="rounded-2xl shadow-xl w-full h-auto object-cover" // w-full h-auto object-cover para responsividade
        loading="lazy" // Otimização de carregamento de imagem
      />
    </div>
  </div>
));

// --- Subcomponente para renderizar um Card de Serviço Adicional ---
interface AdditionalServiceCardProps {
  service: AdditionalServiceItem;
}

const AdditionalServiceCard: React.FC<AdditionalServiceCardProps> = React.memo(({ service }) => (
  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
    <CardHeader className="text-center">
      <div className="flex justify-center mb-4">
        {service.icon}
      </div>
      <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-center text-gray-600 mb-4">
        {service.description}
      </CardDescription>
      {service.link && ( // Renderiza o botão apenas se houver um link
        <div className="text-center">
          <Link to={service.link} aria-label={`Saiba mais sobre ${service.title}`}>
            <Button variant="link" className="text-[#1A247E] hover:text-[#2D4DE0]">
              Explorar <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </CardContent>
  </Card>
));

// --- Subcomponente para renderizar uma Seção do Rodapé ---
interface FooterSectionProps {
  section: FooterSectionItem;
}

const FooterSection: React.FC<FooterSectionProps> = React.memo(({ section }) => (
  <div>
    <h4 className="font-semibold mb-4">{section.title}</h4>
    <ul className="space-y-2 text-gray-400">
      {section.links.map((link, idx) => (
        <li key={idx}>
          <Link to={link.to} className="hover:text-white transition-colors" aria-label={link.label}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
));

// --- Componente de Rodapé Consolidado ---
const Footer: React.FC = React.memo(() => {
  const sections = useMemo(() => footerSectionsData, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">FinTech</h3>
            <p className="text-gray-400">
              Transformando vidas através da educação financeira
            </p>
          </div>
          {sections.map((section, index) => (
            <FooterSection key={index} section={section} />
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FinTech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
});

// --- Componente Principal Servicos ---
const Servicos: React.FC = () => {
  // Memoiza os dados para evitar recriação em cada renderização
  const mainServices = useMemo(() => mainServicesData, []);
  const additionalServices = useMemo(() => additionalServicesData, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main> {/* Usado <main> para semântica */}
        {/* Hero Section */}
        <section className="fintech-gradient pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Nossos Serviços
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Soluções completas para transformar sua vida financeira e 
              conquistar a independência que você sempre sonhou
            </p>
          </div>
        </section>

        {/* Serviços Principais */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Principais Serviços
              </h2>
              <p className="text-xl text-gray-600">
                Ferramentas poderosas para sua jornada financeira
              </p>
            </div>

            <div className="space-y-20">
              {mainServices.map((service, index) => (
                <MainServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Serviços Adicionais */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Serviços Complementares
              </h2>
              <p className="text-xl text-gray-600">
                Recursos extras para potencializar seus resultados
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <AdditionalServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Chamada para Consultores Financeiros */}
        <ConsultoresFinanceirosContent />

      </main>

      {/* Rodapé da Página */}
      <Footer />
    </div>
  );
};

export default Servicos;
