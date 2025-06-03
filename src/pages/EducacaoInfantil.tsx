
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUser, Users, User } from 'lucide-react';

const EducacaoInfantil = () => {
  const [selectedAge, setSelectedAge] = useState('criancas');

  const ageGroups = {
    criancas: {
      title: "Educação Financeira para Crianças (6-12 anos)",
      description: "Aprenda brincando sobre dinheiro e poupança",
      color: "from-pink-500 to-purple-500",
      icon: <BookUser className="w-12 h-12 text-white" />,
      lessons: [
        "O que é dinheiro e para que serve",
        "Diferença entre necessidade e desejo",
        "Como guardar dinheiro no cofrinho",
        "Jogos de compras conscientes",
        "Mesada e primeiras responsabilidades"
      ]
    },
    adolescentes: {
      title: "Educação Financeira para Adolescentes (13-17 anos)",
      description: "Prepare-se para a vida financeira adulta",
      color: "from-blue-500 to-cyan-500",
      icon: <Users className="w-12 h-12 text-white" />,
      lessons: [
        "Planejamento financeiro pessoal",
        "Primeiro emprego e direitos trabalhistas",
        "Conta no banco e cartão de débito",
        "Investimentos para jovens",
        "Armadilhas do consumismo"
      ]
    },
    adultos: {
      title: "Educação Financeira para Adultos",
      description: "Conquiste sua independência financeira",
      color: "from-green-500 to-emerald-500",
      icon: <User className="w-12 h-12 text-white" />,
      lessons: [
        "Orçamento familiar completo",
        "Quitação de dívidas",
        "Investimentos diversificados",
        "Planejamento para aposentadoria",
        "Empreendedorismo financeiro"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <section className="fintech-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Educação Financeira
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Aprenda sobre finanças de forma adequada para sua idade
            </p>
          </div>
        </section>

        {/* Age Selection */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-12">
              <div className="flex bg-white rounded-lg shadow-lg p-2">
                {Object.entries(ageGroups).map(([key, group]) => (
                  <Button
                    key={key}
                    onClick={() => setSelectedAge(key)}
                    variant={selectedAge === key ? "default" : "ghost"}
                    className={`mx-1 ${selectedAge === key ? 'bg-[#1A247E] text-white' : ''}`}
                  >
                    {key === 'criancas' ? 'Crianças' : key === 'adolescentes' ? 'Adolescentes' : 'Adultos'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Age Content */}
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className={`bg-gradient-to-r ${ageGroups[selectedAge].color} p-8 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    {ageGroups[selectedAge].icon}
                    <div>
                      <h2 className="text-3xl font-bold">{ageGroups[selectedAge].title}</h2>
                      <p className="text-lg opacity-90">{ageGroups[selectedAge].description}</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">O que você vai aprender:</h3>
                  <div className="grid gap-4">
                    {ageGroups[selectedAge].lessons.map((lesson, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#1A247E] text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{lesson}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button size="lg" className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-4">
                      Começar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EducacaoInfantil;
