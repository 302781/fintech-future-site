import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '@/data/faqData';


export default function Faq() {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
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
                      {openItemId === (index) ? (
                        <ChevronUp className="w-5 h-5 text-[#1A247E]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#1A247E]" />
                      )}
                    </div>
                  </CardHeader>
                  {openItemId === index && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

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

