
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, TrendingUp } from 'lucide-react';

const Index = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "50K+", label: "Clientes Ativos" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "R$ 2B+", label: "Patrimônio Gerido" },
    { icon: <Award className="w-8 h-8" />, number: "98%", label: "Satisfação" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      
      {/* Seção de Estatísticas */}
      <section className="py-20 fintech-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Números que Impressionam
            </h2>
            <p className="text-xl text-blue-100">
              Resultados que comprovam nossa excelência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center text-white mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pronto para Transformar suas Finanças?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se a milhares de pessoas que já descobriram o poder da educação financeira
          </p>
          <Button 
            size="lg" 
            className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-4 h-auto group"
          >
            Comece Gratuitamente
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
                <li>Sobre Nós</li>
                <li>Carreiras</li>
                <li>Contato</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Investimentos</li>
                <li>Planejamento</li>
                <li>Educação</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>FAQ</li>
                <li>Segurança</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinTech. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
