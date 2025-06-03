
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Wallet, Target, BookOpen, Users, BarChart, Smartphone } from 'lucide-react';

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
      title: "Consultoria Personalizada",
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
                  <Button className="bg-[#1A247E] hover:bg-[#2D4DE0]">
                    Saiba Mais
                  </Button>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1551288049-bebda4e38f71' : index === 1 ? '1460925895917-afdab827c52f' : '1554224154-26032fced8bd'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
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

      {/* Planos e Preços */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-gray-600">
              Opções flexíveis para cada perfil de investidor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Básico",
                price: "Gratuito",
                features: ["Gestão básica de gastos", "3 metas financeiras", "Relatórios mensais", "Suporte por email"]
              },
              {
                name: "Premium",
                price: "R$ 29,90/mês",
                features: ["Todos os recursos básicos", "Investimentos automatizados", "Consultoria mensal", "App mobile premium", "Relatórios avançados"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "R$ 99,90/mês",
                features: ["Todos os recursos premium", "Consultoria semanal", "Gestor dedicado", "Análises personalizadas", "Acesso prioritário"]
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all ${plan.popular ? 'border-[#1A247E] border-2' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#1A247E] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-[#1A247E] mt-4">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-[#1A247E] hover:bg-[#2D4DE0]' : 'bg-gray-900 hover:bg-gray-800'}`}>
                    {plan.price === "Gratuito" ? "Começar Grátis" : "Assinar Agora"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
