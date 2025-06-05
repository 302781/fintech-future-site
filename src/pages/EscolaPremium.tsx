
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Building2, BookOpen, BarChart3, Headphones, FileText, Calendar, GraduationCap, Gamepad2, Settings, MessageSquare } from 'lucide-react';
import { useStripe } from '@/hooks/useStripe';

const EscolaPremium = () => {
  const { redirectToCheckout, loading } = useStripe();

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Todos os recursos do Básico",
      description: "Acesso completo ao conteúdo educativo, dashboard e relatórios"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Workshops presenciais mensais",
      description: "Encontros mensais com especialistas em educação financeira"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Capacitação para professores",
      description: "Treinamento especializado para educadores"
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Gamificação avançada",
      description: "Recursos interativos e jogos educacionais premium"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Relatórios personalizados",
      description: "Relatórios detalhados e customizáveis"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Consultoria pedagógica",
      description: "Acompanhamento pedagógico especializado"
    }
  ];

  const benefits = [
    "Até 500 alunos inclusos",
    "Workshop mensal presencial",
    "Treinamento para 10 professores",
    "Suporte prioritário",
    "Consultoria pedagógica trimestral",
    "Relatórios avançados",
    "Gamificação premium",
    "Acesso por 12 meses"
  ];

  const handleSubscribe = () => {
    // ID do preço do Stripe para o plano premium (você deve configurar isso no dashboard do Stripe)
    redirectToCheckout('price_escola_premium_mensal');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <section className="fintech-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <Building2 className="w-16 h-16 text-white" />
            </div>
            <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold mb-4">
              MAIS POPULAR
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Plano Escola Premium
            </h1>
            <div className="text-5xl font-bold text-white mb-4">
              R$ 599<span className="text-2xl">/mês</span>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Solução completa para escolas médias com até 500 alunos
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Recursos Premium
              </h2>
              <p className="text-xl text-gray-600">
                Todos os recursos do plano básico + funcionalidades avançadas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all border-2 border-[#1A247E]/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-[#1A247E]">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tudo que você precisa
              </h2>
            </div>

            <Card className="mb-8 border-2 border-[#1A247E]">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-3"
              >
                {loading ? 'Processando...' : 'Contratar Plano Premium'}
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Sem compromisso • Cancele quando quiser • Suporte prioritário
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EscolaPremium;
