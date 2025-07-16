// Remova Navigation, div.min-h-screen, pt-20 e o Header section
// Mantenha apenas o conteúdo principal dos consultores e o "Como Funciona"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, MessageCircle, Award, Clock, Phone } from 'lucide-react';
// import { Link } from 'react-router-dom'; // Certifique-se que Link ainda é necessário se não houver navegação interna aqui

// **** ADICIONE ESTA INTERFACE AQUI ****
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
}

const ConsultoresFinanceirosContent = () => {
  // **** AGORA TIPAMOS O ARRAY consultores COM A INTERFACE ****
  const consultores: Consultor[] = [
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
      disponibilidade: "Segunda a Sexta, 9h às 18h"
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
      disponibilidade: "Segunda a Sábado, 8h às 17h"
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
      disponibilidade: "Terça a Sábado, 10h às 19h"
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
      disponibilidade: "Segunda a Sexta, 14h às 20h"
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
      disponibilidade: "Segunda a Quinta, 9h às 16h"
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
      disponibilidade: "Todos os dias, 19h às 22h"
    }
  ];

  // **** AGORA TIPAMOS O PARÂMETRO consultor COM A INTERFACE ****
  const handleAgendarConsulta = (consultor: Consultor) => {
    console.log(`Agendando consulta com ${consultor.nome}`);
    // Implementar lógica de agendamento, talvez redirecionar para uma página de agendamento
    // window.location.href = `/agendamento/${consultor.id}`;
  };

  return (
    <>
      {/* Opcional: Você pode manter uma "Chamada" específica para consultores se quiser */}
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
              <Card key={consultor.id} className="hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={consultor.foto} 
                      alt={consultor.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold">{consultor.nome}</CardTitle>
                  <CardDescription className="text-[#1A247E] font-semibold">
                    {consultor.especialidade}
                  </CardDescription>
                  
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{consultor.rating}</span>
                    </div>
                    <span className="text-gray-500">({consultor.avaliacoes} avaliações)</span>
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
                        <Badge key={index} variant="secondary" className="text-xs">
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
                    <span className="text-xs text-gray-600">{consultor.disponibilidade}</span>
                  </div>
                  
                  <div className="text-center py-2 bg-gray-100 rounded-lg">
                    <span className="text-lg font-bold text-[#1A247E]">{consultor.valorConsulta}</span>
                    <span className="text-sm text-gray-600"> / sessão</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]"
                      onClick={() => handleAgendarConsulta(consultor)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Consulta
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#1A247E] text-[#1A247E] hover:bg-[#1A247E] hover:text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
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
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1A247E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Escolha seu Consultor</h3>
              <p className="text-gray-600">Selecione o especialista que melhor atende suas necessidades financeiras</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1A247E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Agende sua Sessão</h3>
              <p className="text-gray-600">Escolha data e horário convenientes para sua consulta personalizada</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1A247E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Receba Orientação</h3>
              <p className="text-gray-600">Obtenha estratégias personalizadas para alcançar seus objetivos financeiros</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsultoresFinanceirosContent;