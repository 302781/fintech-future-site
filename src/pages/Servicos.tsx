import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Wallet, Target, BookOpen, Users, BarChart, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

// Importe o componente de consultores
import ConsultoresFinanceirosContent from '@/pages/ConsultoresFinanceiros'; // Ajuste o caminho se necessário

const Servicos = () => {
  const mainServices = [
    {
      icon: <TrendingUp className="w-16 h-16 text-[#1A247E]" />,
      title: "Investimentos Inteligentes",
      description: "Plataforma completa de investimentos com análise automatizada, recomendações personalizadas e acompanhamento em tempo real.",
      features: ["Carteiras automatizadas", "Análise de risco", "Rebalanceamento automático", "Relatórios detalhados"]
    },
    {
      icon: <Wallet className="w-16 h-16 text-[#1A247E]" />,
      title: "Gestão Financeira Pessoal",
      description: "Controle total das suas finanças com categorização automática, alertas inteligentes e metas personalizadas.",
      features: ["Controle de gastos", "Planejamento orçamentário", "Alertas automáticos", "Análise de padrões"]
    },
    {
      icon: <Target className="w-16 h-16 text-[#1A247E]" />,
      title: "Planejamento Financeiro",
      description: "Defina e alcance seus objetivos com nossa ferramenta de planejamento inteligente e simuladores avançados.",
      features: ["Simuladores de aposentadoria", "Planejamento de metas", "Projeções futuras", "Cenários otimistas/pessimistas"]
    }
  ];

  const additionalServices = [
    {
      icon: <BookOpen className="w-12 h-12 text-[#1A247E]" />,
      title: "Educação Financeira",
      description: "Cursos, webinars e conteúdo exclusivo para desenvolver sua inteligência financeira."
    },
    {
      icon: <Users className="w-12 h-12 text-[#1A247E]" />,
      title: "Consultoria Personalizada", // Este serviço aqui pode ser ajustado para ser um "Chamada" para a seção de consultores abaixo
      description: "Acesso a especialistas certificados para orientação financeira individual."
    },
    {
      icon: <BarChart className="w-12 h-12 text-[#1A247E]" />,
      title: "Análise de Carteira",
      description: "Avaliação completa dos seus investimentos com sugestões de otimização."
    },
    {
      icon: <Smartphone className="w-12 h-12 text-[#1A247E]" />,
      title: "App Mobile",
      description: "Acesse todas as funcionalidades pelo nosso aplicativo mobile intuitivo."
    },
    {
      icon: <Shield className="w-12 h-12 text-[#1A247E]" />,
      title: "Segurança Premium",
      description: "Proteção de dados com criptografia militar e autenticação biométrica."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
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
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    {service.icon}
                    <h3 className="text-3xl font-bold text-gray-900 ml-4">{service.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-[#1A247E] rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/sobre">
                    <Button className="bg-[#1A247E] hover:bg-[#2D4DE0]">
                      Saiba Mais
                    </Button>
                  </Link>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img 
                    src={`https://images.unsplash.com/photo-${
                      index === 0 ? '1551288049-bebda4e38f71' : // Imagem para Investimentos Inteligentes
                      index === 1 ? '1460925895917-afdab827c52f' : // Imagem para Gestão Financeira Pessoal
                      'ck0i9Dnjtj0' // Imagem para Planejamento Financeiro
                    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={service.title}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
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
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Consultores Financeiros Integrada */}
      <ConsultoresFinanceirosContent />

      {/* Adicione o Footer se ele não estiver no seu layout principal */}
      {/* Exemplo de Footer para manter a consistência se ele não estiver sendo importado */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">FinTech</h3>
              <p className="text-gray-400">
                Transformando vidas através da educação financeira
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                <li><Link to="/equipe" className="hover:text-white transition-colors">Equipe</Link></li>
                <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/servicos" className="hover:text-white transition-colors">Investimentos</Link></li>
                <li><Link to="/servicos" className="hover:text-white transition-colors">Planejamento</Link></li>
                <li><Link to="/educacao" className="hover:text-white transition-colors">Educação</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/faq" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/seguranca" className="hover:text-white transition-colors">Segurança</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinTech. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      */}
    </div>
  );
};

export default Servicos;