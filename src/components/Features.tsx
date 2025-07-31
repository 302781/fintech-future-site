import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calculator, BookOpen, Users, Shield, Target, GraduationCap, Handshake, Lightbulb, Wallet } from "lucide-react"; // Importe mais ícones para ter opções

const Features = () => {
  // Define os dados de cada funcionalidade em um array para fácil manutenção.
  const features = [
    {
      // Ícone para Cursos Práticos. Preferível usar um componente para o ícone.
      icon: <GraduationCap className="h-9 w-9 text-[#1A247E] dark:text-[#2D4DE0]" />, // Cor primária/destaque
      title: "Cursos Práticos e Dinâmicos",
      description: "Aprenda do básico ao avançado com **aulas interativas** e exemplos reais, tornando o aprendizado divertido e eficaz."
    },
    {
      icon: <Calculator className="h-9 w-9 text-[#2D4DE0] dark:text-[#1A247E]" />, // Cor de destaque secundária
      title: "Ferramentas e Calculadoras",
      description: "Utilize nossas **ferramentas interativas** para simular investimentos, calcular juros compostos e otimizar seu planejamento financeiro."
    },
    {
      icon: <TrendingUp className="h-9 w-9 text-green-600 dark:text-green-400" />, // Cor para "Crescimento"
      title: "Estratégias de Investimento",
      description: "Domine as **melhores estratégias** para multiplicar seu capital, adaptadas aos seus objetivos e perfil de risco."
    },
    {
      icon: <Handshake className="h-9 w-9 text-[#1A247E] dark:text-[#2D4DE0]" />,
      title: "Comunidade e Networking",
      description: "Conecte-se a uma **comunidade vibrante** de investidores, troque experiências e amplie sua rede de contatos."
    },
    {
      icon: <Shield className="h-9 w-9 text-[#2D4DE0] dark:text-[#1A247E]" />,
      title: "Conteúdo Confiável e Atualizado",
      description: "Acesse **material exclusivo** desenvolvido por especialistas certificados, garantindo informações precisas e relevantes."
    },
    {
      icon: <Target className="h-9 w-9 text-green-600 dark:text-green-400" />,
      title: "Metas Financeiras Personalizadas",
      description: "Defina seus **objetivos financeiros** com clareza e utilize nossas ferramentas de acompanhamento para alcançá-los de forma consistente."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"> {/* ID para navegação, bg mais neutro, overflow-hidden */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight"> {/* Mais destaque e quebra de linha */}
            Por que Escolher a Nossa
            <span className="block text-[#1A247E] dark:text-[#2D4DE0]">Educação Financeira?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Oferecemos as melhores ferramentas e o conhecimento **essencial** para você conquistar sua **liberdade financeira** e transformar seu futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"> {/* Espaçamento maior em telas grandes */}
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group flex flex-col items-center p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700 rounded-xl
                         bg-white dark:bg-gray-800 transition-all duration-300
                         hover:shadow-xl hover:-translate-y-2 hover:border-[#1A247E] dark:hover:border-[#2D4DE0]" // Efeitos de hover mais pronunciados
              aria-labelledby={`feature-title-${index}`} // Acessibilidade
              aria-describedby={`feature-description-${index}`} // Acessibilidade
            >
              <CardHeader className="text-center pb-4 w-full">
                {/* Círculo de ícone com cor de fundo mais consistente e tamanho maior */}
                <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#EBF0FA] dark:bg-gray-700 flex items-center justify-center
                                 transition-colors duration-300 group-hover:bg-[#DDE5F5] dark:group-hover:bg-gray-600">
                  {feature.icon}
                </div>
                <CardTitle id={`feature-title-${index}`} className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow"> {/* Permite que o conteúdo expanda e mantenha cards do mesmo tamanho */}
                <CardDescription id={`feature-description-${index}`} className="text-center text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;