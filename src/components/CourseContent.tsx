
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Users, Target, TrendingUp, Shield } from 'lucide-react';
import { toast } from 'sonner';

const CourseContent = () => {
  const handlePlayLesson = (title: string) => {
    toast.success(`Iniciando aula: ${title}`);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  const courseCategories = [
    {
      id: 'gestao-financeira',
      title: 'Gestão Financeira',
      description: 'Curso completo baseado no conteúdo do Cursou',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-blue-500',
      lessons: [
        {
          title: 'Introdução à Gestão Financeira',
          duration: '15 min',
          description: 'Conceitos básicos de gestão financeira pessoal e empresarial'
        },
        {
          title: 'Planejamento Financeiro',
          duration: '20 min',
          description: 'Como criar e manter um planejamento financeiro eficaz'
        },
        {
          title: 'Controle de Fluxo de Caixa',
          duration: '18 min',
          description: 'Técnicas para controlar entradas e saídas de dinheiro'
        },
        {
          title: 'Análise de Investimentos',
          duration: '25 min',
          description: 'Como analisar oportunidades de investimento'
        }
      ]
    },
    {
      id: 'criancas',
      title: 'Educação Financeira para Crianças',
      description: 'Baseado na série do Sicredi',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-pink-500',
      lessons: [
        {
          title: 'Ep1: O que é dinheiro?',
          duration: '10 min',
          description: 'Introdução ao conceito de dinheiro de forma lúdica',
          videoUrl: 'https://youtu.be/eLEhKXwv37Y'
        },
        {
          title: 'Ep2: Como ganhar dinheiro?',
          duration: '12 min',
          description: 'Formas de ganhar dinheiro adequadas para crianças',
          videoUrl: 'https://youtu.be/ggv25nDDApA'
        },
        {
          title: 'Ep3: Poupando dinheiro',
          duration: '11 min',
          description: 'A importância de poupar e como fazer isso',
          videoUrl: 'https://youtu.be/pnaSmwKDcGc'
        },
        {
          title: 'Ep4: Gastando com sabedoria',
          duration: '13 min',
          description: 'Como fazer escolhas inteligentes na hora de gastar',
          videoUrl: 'https://youtu.be/1VYXQwrDNXs'
        },
        {
          title: 'Ep5: Planejando o futuro',
          duration: '14 min',
          description: 'Conceitos básicos de planejamento financeiro para crianças',
          videoUrl: 'https://youtu.be/VfVnSzop7F0'
        },
        {
          title: 'Ep6: Compartilhando e ajudando',
          duration: '10 min',
          description: 'A importância da solidariedade e responsabilidade social',
          videoUrl: 'https://youtu.be/uiUacwn9TOs'
        }
      ]
    },
    {
      id: 'adolescentes',
      title: 'Educação Financeira para Adolescentes',
      description: 'Conteúdo especializado para jovens',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-500',
      lessons: [
        {
          title: 'Primeiros passos nas finanças',
          duration: '20 min',
          description: 'Baseado no Me Poupe - Como começar a se organizar financeiramente',
          reference: 'https://mepoupe.com'
        },
        {
          title: 'Economizando na adolescência',
          duration: '18 min',
          description: 'Dicas do Economirna para jovens economizarem',
          reference: 'https://economirna.com.br'
        },
        {
          title: 'Investimentos para jovens',
          duration: '25 min',
          description: 'Yubb - Como começar a investir sendo jovem',
          reference: 'https://yubb.com.br'
        },
        {
          title: 'Educação financeira prática',
          duration: '22 min',
          description: 'Dinheirama - Conceitos práticos para o dia a dia',
          reference: 'https://dinheirama.com'
        }
      ]
    },
    {
      id: 'controle-gastos',
      title: 'Controle de Gastos',
      description: 'Baseado no conteúdo do Serasa',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-green-500',
      lessons: [
        {
          title: 'Como organizar suas finanças',
          duration: '15 min',
          description: 'Métodos eficazes para organizar sua vida financeira'
        },
        {
          title: 'Controle de gastos mensais',
          duration: '18 min',
          description: 'Técnicas para acompanhar e controlar gastos mensais'
        },
        {
          title: 'Eliminando gastos desnecessários',
          duration: '20 min',
          description: 'Como identificar e eliminar gastos supérfluos'
        },
        {
          title: 'Criando uma reserva de emergência',
          duration: '22 min',
          description: 'Passo a passo para construir sua reserva de emergência'
        }
      ]
    },
    {
      id: 'pais',
      title: 'Educação Financeira para Pais',
      description: 'Baseado no conteúdo da Modal Mais',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-500',
      lessons: [
        {
          title: 'Como ensinar finanças aos filhos',
          duration: '25 min',
          description: 'Estratégias para educar financeiramente as crianças'
        },
        {
          title: 'Mesada: sim ou não?',
          duration: '18 min',
          description: 'Como usar a mesada como ferramenta educativa'
        },
        {
          title: 'Planejamento familiar',
          duration: '22 min',
          description: 'Como envolver toda a família no planejamento financeiro'
        },
        {
          title: 'Preparando os filhos para o futuro',
          duration: '20 min',
          description: 'Investimentos e planejamento para o futuro dos filhos'
        }
      ]
    }
  ];

  const youtubeChannels = [
    {
      name: 'Primo Rico',
      description: 'Canal focado em investimentos e educação financeira',
      url: 'https://www.youtube.com/@primorico',
      subscribers: '4M+ inscritos'
    },
    {
      name: 'XP Finanças',
      description: 'Conteúdo sobre mercado financeiro e investimentos',
      url: 'https://www.youtube.com/@xpfinancas3982',
      subscribers: '500K+ inscritos'
    },
    {
      name: 'Primo Pobre',
      description: 'Educação financeira com foco em economia pessoal',
      url: 'https://www.youtube.com/@PrimoPobre',
      subscribers: '1M+ inscritos'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Categorias de Cursos */}
      {courseCategories.map((category) => (
        <div key={category.id} className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className={`${category.color} p-2 rounded-lg text-white`}>
              {category.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.lessons.map((lesson, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {lesson.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                    {lesson.reference && (
                      <span className="text-xs text-blue-600">Fonte disponível</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handlePlayLesson(lesson.title)}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Assistir
                    </Button>
                    {(lesson.videoUrl || lesson.reference) && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExternalLink(lesson.videoUrl || lesson.reference || '')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Canais do YouTube Recomendados */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Canais Recomendados do YouTube</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {youtubeChannels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{channel.name}</CardTitle>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{channel.subscribers}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleExternalLink(channel.url)}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Visitar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
