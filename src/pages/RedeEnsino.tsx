
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Building2, Calendar, GraduationCap, Gamepad2, Settings, MessageSquare, Cog, User, Zap, Code, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RedeEnsino = () => {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Todos os recursos Premium",
      description: "Acesso completo a todas as funcionalidades do plano Premium"
    },
    {
      icon: <Cog className="w-6 h-6" />,
      title: "Implementação personalizada",
      description: "Customização completa da plataforma conforme suas necessidades"
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Gestor de conta dedicado",
      description: "Profissional exclusivo para atender sua instituição"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Treinamentos especializados",
      description: "Capacitação avançada para toda sua equipe"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "API para integração",
      description: "Integração completa com seus sistemas existentes"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Suporte 24/7",
      description: "Atendimento especializado disponível 24 horas por dia"
    }
  ];

  const benefits = [
    "Acima de 1000 alunos",
    "Implementação personalizada",
    "Gestor de conta dedicado",
    "Treinamentos ilimitados",
    "API completa para integração",
    "Suporte técnico 24/7",
    "Consultoria pedagógica mensal",
    "Relatórios executivos",
    "Customizações sob demanda",
    "SLA garantido",
    "Backup e segurança avançada",
    "Acesso vitalício a atualizações"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <section className="fintech-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <Users className="w-16 h-16 text-white" />
            </div>
            <div className="inline-block bg-purple-400 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              ENTERPRISE
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Plano Rede de Ensino
            </h1>
            <div className="text-5xl font-bold text-white mb-4">
              Sob consulta
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Solução enterprise para grandes redes de ensino com mais de 1000 alunos
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Solução Enterprise Completa
              </h2>
              <p className="text-xl text-gray-600">
                Recursos avançados para grandes instituições de ensino
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all border-2 border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-purple-600">
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
                Benefícios Exclusivos
              </h2>
              <p className="text-lg text-gray-600">
                Tudo que sua rede de ensino precisa para implementar educação financeira em larga escala
              </p>
            </div>

            <Card className="mb-8 border-2 border-purple-500">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Link to="/consultores">
                <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
                  Solicitar Proposta Personalizada
                </Button>
              </Link>
              <p className="text-sm text-gray-600 mt-4">
                Entre em contato para uma proposta personalizada • Suporte dedicado 24/7
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Precisa de uma solução personalizada?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Nossa equipe de especialistas está pronta para desenvolver uma solução específica para sua rede de ensino
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Consultoria Gratuita</h4>
                  <p className="text-sm text-gray-600">Análise das suas necessidades</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Implementação Rápida</h4>
                  <p className="text-sm text-gray-600">Deploy em até 30 dias</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Suporte Contínuo</h4>
                  <p className="text-sm text-gray-600">Acompanhamento permanente</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RedeEnsino;
