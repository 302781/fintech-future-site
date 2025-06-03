
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "Como funciona a educação financeira para crianças?",
      answer: "Nossa metodologia combina jogos educativos, atividades práticas e histórias interativas para ensinar conceitos financeiros de forma lúdica e apropriada para cada idade."
    },
    {
      question: "Qual a idade mínima para participar dos cursos?",
      answer: "Nossos cursos são adaptados para diferentes faixas etárias, começando a partir dos 6 anos de idade com conteúdo específico para cada grupo."
    },
    {
      question: "Os cursos são presenciais ou online?",
      answer: "Oferecemos ambas as modalidades. Nossos cursos online são interativos e incluem materiais digitais, enquanto os presenciais são realizados em escolas parceiras."
    },
    {
      question: "Como posso acompanhar o progresso do meu filho?",
      answer: "Fornecemos relatórios periódicos e acesso a uma plataforma onde pais podem acompanhar o desenvolvimento e conquistas dos filhos."
    },
    {
      question: "Oferecem certificado de conclusão?",
      answer: "Sim, todos os nossos cursos oferecem certificado digital de conclusão reconhecido por instituições educacionais."
    },
    {
      question: "É possível cancelar a assinatura a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento através da nossa plataforma ou entrando em contato conosco."
    },
    {
      question: "Como solicitar um curso personalizado?",
      answer: "Entre em contato através do nosso formulário ou WhatsApp. Nossa equipe pedagógica criará um programa específico para suas necessidades."
    },
    {
      question: "Qual o investimento dos cursos?",
      answer: "Temos opções gratuitas e pagas. Os valores variam de acordo com o curso escolhido e podem ser consultados em nossa página de cursos."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
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

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleItem(index)}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </CardTitle>
                      {openItems.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-[#1A247E]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#1A247E]" />
                      )}
                    </div>
                  </CardHeader>
                  {openItems.includes(index) && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Não encontrou sua resposta?
              </h2>
              <p className="text-gray-600 mb-6">
                Nossa equipe está pronta para ajudar você
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#1A247E] hover:bg-[#2D4DE0]">
                  Falar no WhatsApp
                </Button>
                <Button variant="outline">
                  Enviar Email
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
