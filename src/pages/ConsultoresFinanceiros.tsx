import React, { useCallback, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, MessageCircle, Award, Clock, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Importado useNavigate

// --- Interface do Consultor ---
interface Consultor {
  id: number;
  nome: string;
  especialidade: string;
  experiencia: string;
  rating: number;
  avaliacoes: number;
  certificacoes: string[];
  foto: string;
  descricao: string;
  valorConsulta: string;
  disponibilidade: string;
  // Adicionar número de WhatsApp para cada consultor (opcional, mas recomendado para individualizar o contato)
  whatsapp?: string; 
}

const consultoresData: Consultor[] = [
  {
    id: 1,
    nome: "Ana Paula Silva",
    especialidade: "Planejamento de Aposentadoria",
    experiencia: "8 anos",
    rating: 4.9,
    avaliacoes: 127,
    certificacoes: ["CFP", "CGA", "CNPI"],
    foto: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    descricao: "Especialista em planejamento de aposentadoria com foco em investimentos de longo prazo e previdência privada.",
    valorConsulta: "R$ 150,00",
    disponibilidade: "Segunda a Sexta, 9h às 18h",
    whatsapp: "5511987654321" // Exemplo de WhatsApp para Ana Paula
  },
  {
    id: 2,
    nome: "Carlos Eduardo Santos",
    especialidade: "Investimentos em Ações",
    experiencia: "12 anos",
    rating: 4.8,
    avaliacoes: 203,
    certificacoes: ["CPA-20", "CEA", "CNPI"],
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    descricao: "Analista experiente em mercado de ações, com especialização em análise fundamentalista e gestão de carteiras.",
    valorConsulta: "R$ 180,00",
    disponibilidade: "Segunda a Sábado, 8h às 17h",
    whatsapp: "5511998765432" // Exemplo de WhatsApp para Carlos
  },
  {
    id: 3,
    nome: "Mariana Costa",
    especialidade: "Planejamento Familiar",
    experiencia: "6 anos",
    rating: 4.7,
    avaliacoes: 89,
    certificacoes: ["CFP", "CPA-10"],
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    descricao: "Consultora especializada em planejamento financeiro familiar, educação financeira infantil e proteção patrimonial.",
    valorConsulta: "R$ 120,00",
    disponibilidade: "Terça a Sábado, 10h às 19h",
    whatsapp: "5511976543210" // Exemplo de WhatsApp para Mariana
  },
  {
    id: 4,
    nome: "Roberto Oliveira",
    especialidade: "Empreendedorismo",
    experiencia: "15 anos",
    rating: 4.9,
    avaliacoes: 156,
    certificacoes: ["CFA", "FRM", "PMP"],
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    descricao: "Consultor empresarial com vasta experiência em finanças corporativas, startups e gestão de riscos.",
    valorConsulta: "R$ 250,00",
    disponibilidade: "Segunda a Sexta, 14h às 20h",
    whatsapp: "5511965432109" // Exemplo de WhatsApp para Roberto
  },
  {
    id: 5,
    nome: "Fernanda Mendes",
    especialidade: "Renda Fixa",
    experiencia: "9 anos",
    rating: 4.6,
    avaliacoes: 94,
    certificacoes: ["CPA-20", "CFP"],
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    descricao: "Especialista em produtos de renda fixa, tesouro direto e estratégias conservadoras de investimento.",
    valorConsulta: "R$ 140,00",
    disponibilidade: "Segunda a Quinta, 9h às 16h",
    whatsapp: "5511954321098" // Exemplo de WhatsApp para Fernanda
  },
  {
    id: 6,
    nome: "Gabriel Ferreira",
    especialidade: "Criptomoedas",
    experiencia: "4 anos",
    rating: 4.5,
    avaliacoes: 67,
    certificacoes: ["CNPI", "CPA-10"],
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    descricao: "Consultor jovem especializado em criptomoedas, blockchain e investimentos em tecnologia.",
    valorConsulta: "R$ 200,00",
    disponibilidade: "Todos os dias, 19h às 22h",
    whatsapp: "5511943210987" // Exemplo de WhatsApp para Gabriel
  }
];

// --- Dados da Seção "Como Funciona" ---
interface HowItWorksStepItem {
  step: number;
  title: string;
  description: string;
}

const howItWorksSteps: HowItWorksStepItem[] = [
  {
    step: 1,
    title: "Escolha seu Consultor",
    description: "Selecione o especialista que melhor atende suas necessidades financeiras"
  },
  {
    step: 2,
    title: "Agende sua Sessão",
    description: "Escolha data e horário convenientes para sua consulta personalizada"
  },
  {
    step: 3,
    title: "Receba Orientação",
    description: "Obtenha estratégias personalizadas para alcançar seus objetivos financeiros"
  }
];

// --- Subcomponente para renderizar um Card de Consultor ---
interface ConsultorCardProps {
  consultor: Consultor;
  onAgendar: (consultorId: number) => void; // Altera para passar apenas o ID
  onEnviarMensagem: (consultor: Consultor) => void; // Nova prop para o WhatsApp
}

const ConsultorCard: React.FC<ConsultorCardProps> = ({ consultor, onAgendar, onEnviarMensagem }) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader className="text-center pb-4">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#1A247E] shadow-md">
          <img 
            src={consultor.foto} 
            alt={`Foto de ${consultor.nome}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <CardTitle className="text-xl font-bold">{consultor.nome}</CardTitle>
        <CardDescription className="text-[#1A247E] font-semibold">
          {consultor.especialidade}
        </CardDescription>
        
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-semibold" aria-label={`Avaliação ${consultor.rating} de 5 estrelas`}>{consultor.rating}</span>
          </div>
          <span className="text-gray-500" aria-label={`${consultor.avaliacoes} avaliações`}>({consultor.avaliacoes} avaliações)</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">{consultor.descricao}</p>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-[#1A247E]" />
            <span className="text-sm font-semibold">Certificações:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {consultor.certificacoes.map((cert, index) => (
              <Badge key={index} variant="secondary" className="text-xs" aria-label={`Certificação ${cert}`}>
                {cert}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#1A247E]" />
          <span className="text-sm">{consultor.experiencia} de experiência</span>
        </div>
        
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-[#1A247E] mt-0.5" />
          <span className="text-xs text-gray-600">Disponibilidade: {consultor.disponibilidade}</span>
        </div>
        
        <div className="text-center py-2 bg-gray-100 rounded-lg">
          <span className="text-lg font-bold text-[#1A247E]">{consultor.valorConsulta}</span>
          <span className="text-sm text-gray-600"> / sessão</span>
        </div>
        
        <div className="space-y-2">
          {/* Botão Agendar Consulta */}
          <Button 
            className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
            onClick={() => onAgendar(consultor.id)} // Passa o ID do consultor
            aria-label={`Agendar consulta com ${consultor.nome}`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Consulta
          </Button>

          {/* Botão Enviar Mensagem para WhatsApp */}
          <Button 
            variant="outline" 
            className="w-full border-[#1A247E] text-[#1A247E] hover:bg-[#1A247E] hover:text-white"
            onClick={() => onEnviarMensagem(consultor)} // Passa o objeto consultor
            aria-label={`Enviar mensagem para ${consultor.nome}`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Enviar Mensagem
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Subcomponente para renderizar um Passo da Seção "Como Funciona" ---
interface HowItWorksStepProps {
  step: HowItWorksStepItem;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ step }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-[#1A247E] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        <span className="text-white text-2xl font-bold">{step.step}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>
    </div>
  );
};

// --- Componente Principal ConsultoresFinanceirosContent ---
const ConsultoresFinanceirosContent = () => {
  const navigate = useNavigate(); // Hook para navegação programática

  const consultores = useMemo(() => consultoresData, []);
  const howItWorks = useMemo(() => howItWorksSteps, []);

  // Função para agendar consulta, usando useNavigate
  const handleAgendarConsulta = useCallback((consultorId: number) => {
    // Redireciona para a página de agendamento com o ID do consultor na URL
    navigate(`/agendamento?consultorId=${consultorId}`);
  }, [navigate]);

  // Função para enviar mensagem via WhatsApp
  const handleEnviarMensagem = useCallback((consultor: Consultor) => {
    if (consultor.whatsapp) {
      const message = `Olá ${consultor.nome}, gostaria de agendar uma consulta sobre ${consultor.especialidade}.`;
      const whatsappUrl = `https://wa.me/${consultor.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank'); // Abre em uma nova aba
    } else {
      // Caso o consultor não tenha um número de WhatsApp definido
      console.warn(`Número de WhatsApp não disponível para ${consultor.nome}`);
      // Você pode adicionar um toast ou modal aqui para o usuário
      alert("Este consultor não tem um número de WhatsApp configurado para contato direto.");
    }
  }, []);

  return (
    <>
      <main>
        {/* Header da Página */}
        <section className="fintech-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Nossos Consultores Financeiros
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Conecte-se com especialistas certificados para acelerar seus objetivos financeiros
            </p>
          </div>
        </section>

        {/* Seção de Consultores */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Encontre seu Especialista
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Escolha o consultor ideal para sua situação e agende uma sessão personalizada
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {consultores.map((consultor) => (
                <ConsultorCard 
                  key={consultor.id} 
                  consultor={consultor} 
                  onAgendar={handleAgendarConsulta} 
                  onEnviarMensagem={handleEnviarMensagem} // Passa a nova função
                />
              ))}
            </div>
          </div>
        </section>

        {/* Seção "Como Funciona" */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Como Funciona a Consultoria
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simples passos para você começar sua jornada rumo à independência financeira.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((stepItem) => (
                <HowItWorksStep key={stepItem.step} step={stepItem} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ConsultoresFinanceirosContent;