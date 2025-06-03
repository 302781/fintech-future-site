
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUser, Users, User, ArrowRight } from 'lucide-react';

const Cursos = () => {
  const courses = [
    {
      id: 1,
      title: "Primeiros Passos Financeiros",
      description: "Para quem está começando a vida financeira",
      duration: "4 semanas",
      level: "Iniciante",
      price: "Gratuito",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["Orçamento pessoal", "Controle de gastos", "Reserva de emergência"]
    },
    {
      id: 2,
      title: "Investimentos para Iniciantes",
      description: "Aprenda a fazer seu dinheiro trabalhar para você",
      duration: "6 semanas",
      level: "Intermediário",
      price: "R$ 197",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["Renda fixa", "Ações", "Fundos de investimento", "Diversificação"]
    },
    {
      id: 3,
      title: "Planejamento de Aposentadoria",
      description: "Garanta um futuro tranquilo financeiramente",
      duration: "8 semanas",
      level: "Avançado",
      price: "R$ 397",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["INSS", "Previdência privada", "Plano de aposentadoria", "Cálculos"]
    },
    {
      id: 4,
      title: "Educação Financeira Infantil",
      description: "Ensine suas crianças sobre dinheiro",
      duration: "3 semanas",
      level: "Para pais",
      price: "R$ 97",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["Mesada educativa", "Jogos financeiros", "Poupança para crianças"]
    },
    {
      id: 5,
      title: "Empreendedorismo Financeiro",
      description: "Crie e gerencie seu próprio negócio",
      duration: "10 semanas",
      level: "Avançado",
      price: "R$ 597",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["Plano de negócios", "Fluxo de caixa", "Investimento inicial"]
    },
    {
      id: 6,
      title: "Finanças para Adolescentes",
      description: "Prepare os jovens para a vida adulta",
      duration: "5 semanas",
      level: "Jovens",
      price: "R$ 147",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["Primeiro emprego", "Conta bancária", "Cartão de crédito"]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'text-green-600 bg-green-100';
      case 'Intermediário': return 'text-blue-600 bg-blue-100';
      case 'Avançado': return 'text-red-600 bg-red-100';
      case 'Para pais': return 'text-purple-600 bg-purple-100';
      case 'Jovens': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
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
              Nossos Cursos
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Desenvolva suas habilidades financeiras com nossos cursos especializados
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Duração: {course.duration}</span>
                        <span className="font-bold text-[#1A247E]">{course.price}</span>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">O que você vai aprender:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {course.topics.map((topic, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#1A247E] rounded-full"></div>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] group">
                        Inscrever-se
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Não encontrou o curso ideal?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Entre em contato conosco e criaremos um curso personalizado para suas necessidades
            </p>
            <Button size="lg" className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-4">
              Solicitar Curso Personalizado
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cursos;
