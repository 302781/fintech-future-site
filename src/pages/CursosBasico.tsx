
import Navigation from '@/components/Navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Film, Puzzle, FileText, BarChart3, Award } from 'lucide-react';

const CursosBasico = () => {
  const monthlyContent = [
    {
      month: "1º MÊS",
      title: "Introdução e Importância da Educação Financeira",
      objective: "Compreender o que é dinheiro, para que ele serve e como ele faz parte do nosso dia a dia.",
      content: [
        "Origem e história do dinheiro",
        "Por que ele é importante",
        "Diferença entre desejo e necessidade",
        "Importância de poupar",
      ],
      activity: 'Jogo "Desejo vs. Necessidade" — divida a turma em grupos para dizer o que é preciso e o que é um desejo. Isso fortalece o aprendizado de forma lúdica.'
    },
    {
      month: "2º MÊS",
      title: "Orçamento e Planejamento",
      objective: "Compreender como fazer um orçamento, registrar receitas e despesas e planejar gastos.",
      content: [
        "Como usar um orçamento para controlar gastos",
        "Importância de registrar tudo o que entra e sai",
        "Como poupar para um objetivo (como comprar um brinquedo ou um livro)",
      ],
      activity: 'Peça para cada aluno preparar o próprio orçamento da mesada ou de um valor hipotético. Isso fortalece o aprendizado prático de organização financeira.'
    },
    {
      month: "3º MÊS",
      title: "Consumo Consciente e Metas",
      objective: "Estimular o consumo consciente e o estabelecimento de metas financeiras pessoais.",
      content: [
        "A importância de comprar o que é preciso",
        "Como dizer \"não\" ao consumismo",
        "Metas de poupança — como fazer uma e alcançá-la",
        "Diferença entre poupar para o futuro e gastar tudo no presente",
      ],
      activity: 'Proponha que cada aluno estabeleça uma meta de poupança, como comprar algo importante pra ele, e depois ele deve dizer quanto quer poupar a cada semana para alcançar o valor.'
    },
  ];

  const didacticMaterial = [
    { icon: <Film />, text: "Série de vídeos, textos e animações que ajudam a fixar o aprendizado." },
    { icon: <Puzzle />, text: "Seção de atividades (quiz, caça-palavras, palavras-cruzadas) para usar nas turmas." },
    { icon: <FileText />, text: "Apostila PDF pronta para imprimir, compartilhada pelo dashboard de professores." }
  ];

  const additionalTips = [
    { icon: <BarChart3 />, title: "Relatório de progresso", description: "Com ele, você consegue acompanhar o aprendizado de cada aluno, saber suas dificuldades e focar nas dúvidas." },
    { icon: <Award />, title: "Certificados", description: 'Sugira uma “formatura” ao final do período, emitindo o certificado digital pelo próprio painel. Isso fortalece o engajamento, reconhece o aprendizado e motiva tanto a turma quanto o(a) próprio(a) professor(a).' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20">
        <section className="fintech-gradient py-20 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Conteúdo do Plano Escola Básica
            </h1>
            <p className="text-xl text-blue-100">
              Sua jornada para a educação financeira começa aqui!
            </p>
          </div>
        </section>

        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Cronograma de Aulas
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {monthlyContent.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="bg-white rounded-lg shadow-sm border">
                  <AccordionTrigger className="p-6 text-lg font-semibold text-[#1A247E]">
                    {item.month} — {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="p-6 pt-0 text-gray-700 space-y-4">
                    <p><span className="font-semibold">Objetivo:</span> {item.objective}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Conteúdo:</h4>
                      <ul className="space-y-2 list-inside">
                        {item.content.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Atividade Sugerida:</h4>
                      <p>{item.activity}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Material Didático Digital</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {didacticMaterial.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-[#1A247E] mt-1">{item.icon}</div>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Dicas Adicionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {additionalTips.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="text-[#1A247E]">{item.icon}</div>
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 pl-9">{item.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CursosBasico;
