import React, { useState, useCallback, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

// --- Interface para um item de FAQ ---
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// --- Dados das FAQs (consolidados aqui) ---
const faqsData: FaqItem[] = [
  {
    id: 1,
    question: "Quais tipos de cursos de educação financeira vocês oferecem?",
    answer: "Oferecemos cursos para diversas faixas etárias: crianças (6-12 anos), adolescentes (13-17 anos) e adultos. Nossos temas incluem poupança, orçamento, investimentos básicos, controle de dívidas e planejamento para o futuro."
  },
  {
    id: 2,
    question: "Como funciona o acesso aos materiais educativos?",
    answer: "O acesso é feito através da nossa plataforma online. Para planos individuais, o acesso é direto após a inscrição. Para planos corporativos (Escola Premium, Rede de Ensino), as instituições recebem credenciais para seus alunos e professores."
  },
  {
    id: 3,
    question: "Existe suporte para dúvidas durante os cursos?",
    answer: "Sim! Dependendo do seu plano, oferecemos suporte por e-mail, chat prioritário e até mesmo um gestor de conta dedicado para planos corporativos maiores. Alunos e professores também podem participar de fóruns da comunidade e workshops ao vivo."
  },
  {
    id: 4,
    question: "Posso personalizar o conteúdo para minha escola/empresa?",
    answer: "Absolutamente. Nossos planos 'Rede de Ensino' e soluções corporativas são altamente personalizáveis. Podemos adaptar o conteúdo, oferecer treinamentos especializados e integrar nossa plataforma com os sistemas existentes da sua instituição."
  },
  {
    id: 5,
    question: "Como posso contratar uma consultoria financeira?",
    answer: "Você pode agendar uma consulta diretamente em nossa página 'Consultores Financeiros'. Lá você encontrará o perfil de cada especialista, suas áreas de atuação, valores e disponibilidade. Após a escolha, é só seguir os passos para agendar sua sessão."
  }
];

// --- Subcomponente para um item de FAQ ---
interface FaqCardProps {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ faq, isOpen, onToggle }) => {
  const contentId = `faq-content-${faq.id}`; // ID único para o conteúdo da resposta

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onToggle(faq.id)}
        role="button" // Indica que o elemento é clicável como um botão para tecnologias assistivas
        aria-expanded={isOpen} // Indica se o conteúdo está expandido ou colapsado
        aria-controls={contentId} // Associa o cabeçalho ao conteúdo que ele controla
      >
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {faq.question}
          </CardTitle>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-[#1A247E]" aria-hidden="true" /> // aria-hidden para ocultar do leitor de tela, pois o estado já é lido por aria-expanded
          ) : (
            <ChevronDown className="w-5 h-5 text-[#1A247E]" aria-hidden="true" /> // aria-hidden para ocultar do leitor de tela
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent id={contentId} className="pt-0" role="region" aria-labelledby={`faq-question-${faq.id}`}> {/* role="region" para acessibilidade e associa ao título */}
          <p className="text-gray-600">{faq.answer}</p>
        </CardContent>
      )}
    </Card>
  );
};

// --- Componente Principal Faq ---
export default function Faq() {
  // Estado para controlar qual item de FAQ está aberto (null se nenhum estiver aberto)
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  // Memoiza a lista de FAQs para evitar recriação desnecessária
  const faqs = useMemo(() => faqsData, []);

  // Função para alternar o estado de um item de FAQ, memoizada com useCallback
  const toggleItem = useCallback((id: number) => {
    setOpenItemId((prevOpenItemId) => (prevOpenItemId === id ? null : id));
  }, []); // Dependências vazias pois a função não depende de props ou estados que mudam

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20"> {/* Usado <main> para semântica */}
        {/* Header da Página */}
        <section className="fintech-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Encontre respostas para as principais dúvidas sobre nossos cursos e serviços
            </p>
          </div>
        </section>

        {/* Seção de Perguntas e Respostas */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <FaqCard 
                  key={faq.id} // Usar faq.id como key é mais robusto que index
                  faq={faq} 
                  isOpen={openItemId === faq.id} 
                  onToggle={toggleItem} 
                />
              ))}
            </div>

            {/* Seção de Contato para Dúvidas Não Respondidas */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Não encontrou sua resposta?
              </h2>
              <p className="text-gray-600 mb-6">
                Nossa equipe está pronta para ajudar você
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild /* Permite que o Button renderize um 'a' ou 'Link' */
                  className="bg-[#1A247E] hover:bg-[#2D4DE0]"
                >
                  {/* Link para WhatsApp - substitua o número pelo seu real */}
                  <a 
                    href="https://wa.me/5561984036278?text=Olá! Tenho uma pergunta sobre..." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Falar conosco via WhatsApp"
                  >
                    Falar no WhatsApp
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-[#1A247E] text-[#1A247E] hover:bg-[#1A247E] hover:text-white"
                >
                  {/* Link para Email - substitua o email pelo seu real */}
                  <a 
                    href="mailto:mariavitoru349@gmail.com?subject=Dúvida sobre os serviços" 
                    aria-label="Enviar um email para nós"
                  >
                    Enviar Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
