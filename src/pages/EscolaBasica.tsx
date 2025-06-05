
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, BookOpen, BarChart3, Headphones, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const EscolaBasica = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Acesso completo ao conteúdo educativo",
      description: "Todo o material didático disponível na plataforma"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Dashboard para professores",
      description: "Interface completa para acompanhamento dos alunos"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Relatórios de progresso",
      description: "Acompanhe o desenvolvimento de cada aluno"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Suporte técnico",
      description: "Atendimento especializado para resolver dúvidas"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Material didático digital",
      description: "Recursos educacionais interativos e atualizados"
    }
  ];

  const benefits = [
    "Até 100 alunos inclusos",
    "Acesso por 12 meses",
    "Atualizações gratuitas",
    "Certificado digital",
    "Suporte por email"
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
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Plano Escola Básica
            </h1>
            <div className="text-5xl font-bold text-white mb-4">
              R$ 299<span className="text-2xl">/mês</span>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ideal para escolas pequenas com até 100 alunos que desejam iniciar a educação financeira
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                O que está incluído
              </h2>
              <p className="text-xl text-gray-600">
                Todos os recursos essenciais para implementar educação financeira na sua escola
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
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
                Benefícios inclusos
              </h2>
            </div>

            <Card className="mb-8">
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
              <Link to="/pagamento">
                <Button className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-3">
                  Contratar Plano Básico
                </Button>
              </Link>
              <p className="text-sm text-gray-600 mt-4">
                Sem compromisso • Cancele quando quiser
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EscolaBasica;
