import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Users, Target, TrendingUp, Shield } from 'lucide-react';
import LessonModal from './LessonModal';

const CourseContent = () => {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
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
          title: 'Ep1: Fundamentos da Gestão Financeira',
          duration: '20 min',
          description: 'Introdução aos conceitos básicos de gestão financeira',
          videoUrl: 'https://youtu.be/CxIsRGh28nI'
        },
        {
          title: 'Ep2: Planejamento Financeiro Estratégico',
          duration: '18 min',
          description: 'Como desenvolver um planejamento financeiro eficaz',
          videoUrl: 'https://youtu.be/EaMtjoOZls4'
        },
        {
          title: 'Ep3: Análise de Fluxo de Caixa',
          duration: '22 min',
          description: 'Técnicas para análise e controle do fluxo de caixa',
          videoUrl: 'https://youtu.be/g6LqGWuNIRU'
        },
        {
          title: 'Ep4: Gestão de Riscos Financeiros',
          duration: '25 min',
          description: 'Como identificar e gerenciar riscos financeiros',
          videoUrl: 'https://youtu.be/l5KCRvho4-o'
        },
        {
          title: 'Ep5: Indicadores Financeiros',
          duration: '19 min',
          description: 'Principais indicadores para análise financeira',
          videoUrl: 'https://youtu.be/smb3N7N5m2k'
        },
        {
          title: 'Ep6: Tomada de Decisões Financeiras',
          duration: '23 min',
          description: 'Processo de tomada de decisões baseadas em dados',
          videoUrl: 'https://youtu.be/qHlzruXgRPY'
        },
        {
          title: 'Ep7: Orçamento e Controle',
          duration: '21 min',
          description: 'Elaboração e controle de orçamentos empresariais',
          videoUrl: 'https://youtu.be/m1FSFxmWsRw'
        },
        {
          title: 'Ep8: Financiamento e Investimento',
          duration: '24 min',
          description: 'Estratégias de financiamento e decisões de investimento',
          videoUrl: 'https://youtu.be/mt4YTN8zmwQ'
        },
        {
          title: 'Ep9: Gestão do Capital de Giro',
          duration: '26 min',
          description: 'Otimização do capital de giro empresarial',
          videoUrl: 'https://youtu.be/-UGVURXszKA'
        }
      ]
    },
    {
      id: 'planejamento-financeiro',
      title: 'Planejamento Financeiro',
      description: 'Aprenda a organizar suas finanças pessoais',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-indigo-500',
      lessons: [
        {
          title: 'Controle seus Gastos',
          duration: '15 min',
          description: 'Como controlar e monitorar seus gastos diários',
          videoUrl: 'https://youtu.be/in0XbfQEm2A'
        },
        {
          title: 'Como se Organizar Financeiramente',
          duration: '18 min',
          description: 'Métodos práticos para organizar sua vida financeira',
          videoUrl: 'https://youtu.be/xIIa3A3kY-k'
        }
      ]
    },
    {
      id: 'fluxo-caixa',
      title: 'Controle de Fluxo de Caixa',
      description: 'Domine o controle do seu fluxo de caixa',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-teal-500',
      lessons: [
        {
          title: 'O que é e Como Fazer seu Controle',
          duration: '20 min',
          description: 'Fundamentos do controle de fluxo de caixa',
          videoUrl: 'https://youtu.be/osWhV1BqlBM'
        },
        {
          title: 'Exemplos e Dicas Práticas',
          duration: '16 min',
          description: 'Exemplos práticos e dicas para melhorar seu controle',
          videoUrl: 'https://youtu.be/ctHGseRyxTg'
        }
      ]
    },
    {
      id: 'analise-investimentos',
      title: 'Análise de Investimentos',
      description: 'Aprenda a analisar oportunidades de investimento',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-emerald-500',
      lessons: [
        {
          title: 'Princípios e Análises',
          duration: '25 min',
          description: 'Fundamentos da análise de investimentos',
          videoUrl: 'https://youtu.be/ejAfEVYCh5A'
        },
        {
          title: 'Riscos de Mercado',
          duration: '22 min',
          description: 'Como identificar e avaliar riscos de mercado',
          videoUrl: 'https://youtu.be/uW0BvgtJQPM'
        },
        {
          title: 'Riscos de Liquidez',
          duration: '18 min',
          description: 'Entendendo e gerenciando riscos de liquidez',
          videoUrl: 'https://youtu.be/wjt05_dl92I'
        },
        {
          title: 'Índice Sharpe',
          duration: '20 min',
          description: 'Como usar o índice Sharpe na análise de investimentos',
          videoUrl: 'https://youtu.be/DHUJ0n3EoU8'
        },
        {
          title: 'Análise de Rentabilidade',
          duration: '23 min',
          description: 'Métodos para avaliar a rentabilidade de investimentos',
          videoUrl: 'https://youtu.be/38OOw2xCmEk'
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
          title: 'Primeiros Passos nas Finanças',
          duration: '18 min',
          description: 'Como começar a se organizar financeiramente',
          videoUrl: 'https://youtu.be/t0RzA9-9RX0'
        },
        {
          title: 'Planejamento Financeiro para Jovens',
          duration: '20 min',
          description: 'Fundamentos do planejamento financeiro na juventude',
          videoUrl: 'https://youtu.be/dSLhykOui3Y'
        },
        {
          title: 'Economizando na Adolescência',
          duration: '16 min',
          description: 'Dicas práticas para economizar sendo jovem',
          videoUrl: 'https://youtu.be/SWd4hGsLn1U'
        },
        {
          title: 'Os 5 Melhores Investimentos para Jovens',
          duration: '22 min',
          description: 'Investimentos adequados para o perfil jovem',
          videoUrl: 'https://youtu.be/kXfjzvrcWf0'
        },
        {
          title: 'Investimentos para Cada Fase da Vida',
          duration: '25 min',
          description: 'Como adequar investimentos às diferentes fases',
          videoUrl: 'https://youtu.be/jXztjivu1G4'
        },
        {
          title: 'Método 50-30-20',
          duration: '14 min',
          description: 'Regra prática para distribuição de renda',
          videoUrl: 'https://youtu.be/Wyi4sPBPiCQ'
        },
        {
          title: 'Aplicativo Dinheirama',
          duration: '12 min',
          description: 'Como usar aplicativos para controle financeiro',
          videoUrl: 'https://youtu.be/G1fU4DOj-9A'
        },
        {
          title: 'Como Funciona o Mercado Financeiro',
          duration: '19 min',
          description: 'Introdução ao funcionamento do mercado financeiro',
          videoUrl: 'https://youtu.be/FY7q6weT1Tg'
        },
        {
          title: 'Como Lidar com Dívidas',
          duration: '17 min',
          description: 'Estratégias para evitar e quitar dívidas',
          videoUrl: 'https://youtu.be/zYqfRzmPWtY'
        }
      ]
    },
    {
      id: 'controle-gastos',
      title: 'Controle de Gastos',
      description: 'Aprenda a controlar e reduzir seus gastos',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-green-500',
      lessons: [
        {
          title: 'Como Organizar suas Finanças',
          duration: '15 min',
          description: 'Métodos eficazes para organizar sua vida financeira',
          videoUrl: 'https://youtu.be/in0XbfQEm2A'
        },
        {
          title: 'Planilha de Excel para Controle',
          duration: '20 min',
          description: 'Como criar e usar planilhas para controle financeiro',
          videoUrl: 'https://youtu.be/I8XXptohLJQ'
        },
        {
          title: 'Como Gastar Menos',
          duration: '16 min',
          description: 'Estratégias práticas para reduzir gastos',
          videoUrl: 'https://youtu.be/WvNcL-HpQik'
        },
        {
          title: 'Eliminando Gastos Desnecessários',
          duration: '18 min',
          description: 'Como identificar e eliminar gastos supérfluos',
          videoUrl: 'https://youtu.be/NgSnsZjjsC8'
        },
        {
          title: 'Quanto Guardar na Reserva de Emergência',
          duration: '14 min',
          description: 'Como calcular o valor ideal para sua reserva',
          videoUrl: 'https://youtu.be/RBpvCwvshnc'
        },
        {
          title: 'Métodos Práticos de Economia',
          duration: '22 min',
          description: 'Técnicas práticas para economizar no dia a dia',
          videoUrl: 'https://youtu.be/bFLp81P4C-U'
        }
      ]
    },
    {
      id: 'pais',
      title: 'Educação Financeira para Pais',
      description: 'Como educar financeiramente seus filhos',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-500',
      lessons: [
        {
          title: 'Como Ensinar Finanças às Crianças',
          duration: '20 min',
          description: 'Estratégias para educar financeiramente as crianças',
          videoUrl: 'https://youtu.be/8mMIJwfE3Ik'
        },
        {
          title: 'Métodos Inválidos de Educação',
          duration: '15 min',
          description: 'Erros comuns na educação financeira infantil',
          videoUrl: 'https://youtu.be/LmgjSavgVEg'
        },
        {
          title: 'Mesada: Como Implementar',
          duration: '18 min',
          description: 'Como usar a mesada como ferramenta educativa',
          videoUrl: 'https://youtu.be/cnvEdeO4dJs'
        },
        {
          title: 'Planejamento Financeiro Familiar',
          duration: '22 min',
          description: 'Como envolver toda a família no planejamento financeiro',
          videoUrl: 'https://youtu.be/sfvn3K328aw'
        },
        {
          title: 'Planejando a Faculdade dos Filhos',
          duration: '25 min',
          description: 'Como se preparar financeiramente para a educação superior',
          videoUrl: 'https://youtu.be/ymgQ_NhLkGc'
        },
        {
          title: 'Investimentos para os Filhos',
          duration: '19 min',
          description: 'Como investir pensando no futuro dos filhos',
          videoUrl: 'https://youtu.be/6_QmHeTqqTM'
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
                      onClick={() => handlePlayLesson(lesson)}
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

      {/* Modal para exibir as aulas */}
      <LessonModal 
        lesson={selectedLesson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CourseContent;
