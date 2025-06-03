
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Wallet, Target } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <TrendingUp className="w-12 h-12 text-[#1A247E]" />,
      title: "Investimentos Inteligentes",
      description: "Plataforma de investimentos com análise automatizada e recomendações personalizadas para maximizar seus retornos."
    },
    {
      icon: <Wallet className="w-12 h-12 text-[#1A247E]" />,
      title: "Gestão Financeira",
      description: "Controle completo das suas finanças com categorização automática de gastos e relatórios detalhados."
    },
    {
      icon: <Target className="w-12 h-12 text-[#1A247E]" />,
      title: "Planejamento de Metas",
      description: "Defina e alcance seus objetivos financeiros com nossa ferramenta de planejamento inteligente."
    },
    {
      icon: <Shield className="w-12 h-12 text-[#1A247E]" />,
      title: "Segurança Total",
      description: "Proteção de dados de nível bancário com criptografia avançada e autenticação de dois fatores."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para transformar sua vida financeira
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
