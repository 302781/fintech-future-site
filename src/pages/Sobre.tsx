
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Award } from 'lucide-react';

const Sobre = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nossa História</h2>
              <p className="text-lg text-gray-600 mb-6">
                Fundada em 2025, a FinTech nasceu da necessidade de tornar a educação 
                financeira acessível a todos os brasileiros. Nossos desenvolvedores identificaram que a 
                falta de conhecimento financeiro era o principal obstáculo para a 
                prosperidade das pessoas.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Equipe trabalhando"
                className="rounded-2xl shadow-xl"
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
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <Target className="w-16 h-16 text-[#1A247E] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
                <p className="text-gray-600">
                  Democratizar o acesso à educação financeira, proporcionando 
                  ferramentas e conhecimento para que todos possam construir 
                  um futuro próspero.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <Eye className="w-16 h-16 text-[#1A247E] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
                <p className="text-gray-600">
                  Ser a principal referência em educação financeira na América 
                  Latina, transformando a vida de milhões de pessoas através 
                  do conhecimento.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <Award className="w-16 h-16 text-[#1A247E] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
                <p className="text-gray-600">
                  Transparência, excelência, inovação e compromisso com o 
                  desenvolvimento financeiro sustentável de nossos clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
