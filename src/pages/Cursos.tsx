
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUser, Users, User, ArrowRight, Play, Clock, Award, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Cursos = () => {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      // Simular carregamento de perfil do usuário
      setUserProfile({
        firstName: user.user_metadata?.first_name || 'Usuário',
        lastName: user.user_metadata?.last_name || '',
        email: user.email,
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
  };

  const courses = [
    {
      id: 1,
      title: "Gestão Financeira Pessoal",
      description: "Aprenda a gerir suas finanças pessoais de forma eficiente",
      duration: "8 horas",
      lessons: 24,
      level: "Iniciante",
      progress: 0,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["Orçamento familiar", "Controle de gastos", "Planejamento financeiro", "Reserva de emergência"],
      instructor: "Prof. Carlos Silva",
      rating: 4.8,
      enrolled: true
    },
    {
      id: 2,
      title: "Investimentos para Iniciantes",
      description: "Descubra como fazer seu dinheiro trabalhar para você",
      duration: "12 horas",
      lessons: 36,
      level: "Iniciante",
      progress: 0,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["Renda fixa", "Ações", "Fundos de investimento", "Diversificação de portfólio"],
      instructor: "Prof. Ana Santos",
      rating: 4.9,
      enrolled: true
    },
    {
      id: 3,
      title: "Planejamento de Aposentadoria",
      description: "Garanta um futuro financeiro tranquilo",
      duration: "15 horas",
      lessons: 45,
      level: "Intermediário",
      progress: 0,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["INSS", "Previdência privada", "Cálculos de aposentadoria", "Estratégias de longo prazo"],
      instructor: "Prof. Roberto Lima",
      rating: 4.7,
      enrolled: false
    },
    {
      id: 4,
      title: "Educação Financeira para Empreendedores",
      description: "Gerencie as finanças do seu negócio com sucesso",
      duration: "20 horas",
      lessons: 60,
      level: "Avançado",
      progress: 0,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      topics: ["Fluxo de caixa", "Capital de giro", "Análise financeira", "Investimento empresarial"],
      instructor: "Prof. Maria Fernanda",
      rating: 4.9,
      enrolled: false
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'text-green-600 bg-green-100';
      case 'Intermediário': return 'text-blue-600 bg-blue-100';
      case 'Avançado': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header com informações do usuário */}
        <section className="fintech-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  Olá, {userProfile?.firstName}!
                </h1>
                <p className="text-xl text-blue-100">
                  Continue sua jornada de educação financeira
                </p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1A247E]"
              >
                <LogOut className="mr-2" size={16} />
                Sair
              </Button>
            </div>

            {/* Dashboard de progresso */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <BookUser className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2</div>
                  <div className="text-blue-100">Cursos Inscritos</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">20h</div>
                  <div className="text-blue-100">Tempo de Estudo</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-blue-100">Certificados</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cursos Disponíveis */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Seus Cursos</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                    {course.enrolled && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                          Inscrito
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {course.description}
                    </CardDescription>
                    <div className="text-sm text-gray-500">
                      Por {course.instructor} • ⭐ {course.rating}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{course.lessons} aulas</span>
                        <span>{course.duration}</span>
                      </div>

                      {course.enrolled && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#1A247E] h-2 rounded-full" 
                              style={{width: `${course.progress}%`}}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Conteúdo do curso:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {course.topics.slice(0, 3).map((topic, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#1A247E] rounded-full"></div>
                              {topic}
                            </li>
                          ))}
                          {course.topics.length > 3 && (
                            <li className="text-[#1A247E] font-medium">
                              +{course.topics.length - 3} mais tópicos
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <Button 
                        className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] group"
                        onClick={() => toast.success(`${course.enrolled ? 'Continuando' : 'Iniciando'} curso: ${course.title}`)}
                      >
                        {course.enrolled ? (
                          <>
                            <Play className="mr-2" size={16} />
                            Continuar Curso
                          </>
                        ) : (
                          <>
                            Iniciar Curso
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Conquistas */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Próximas Conquistas
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Complete os cursos e ganhe certificados reconhecidos no mercado
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-700">Certificado Básico</h3>
                <p className="text-sm text-gray-500">Complete 2 cursos iniciantes</p>
              </div>
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-700">Especialista em Investimentos</h3>
                <p className="text-sm text-gray-500">Complete o curso de investimentos</p>
              </div>
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-700">Planejador Financeiro</h3>
                <p className="text-sm text-gray-500">Complete todos os cursos</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cursos;
