import React, { useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Award, Users, TrendingUp, Clock, Heart, Star } from 'lucide-react'; // Certifique-se de importar Star também

// --- Interfaces para Tipagem dos Dados ---
interface ReasonItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  image: string;
}

// --- Dados Consolidados para a Seção "Nossos Diferenciais" ---
const reasonsData: ReasonItem[] = [
  {
    icon: <Award className="w-16 h-16 text-[#1A247E]" />,
    title: "Experiência Comprovada",
    description: "Mais de 20 anos de experiência no mercado financeiro, com track record comprovado em educação financeira e gestão de patrimônio."
  },
  {
    icon: <Shield className="w-16 h-16 text-[#1A247E]" />,
    title: "Segurança Máxima",
    description: "Utilizamos as mais avançadas tecnologias de segurança, com criptografia de nível bancário e certificações internacionais."
  },
  {
    icon: <Users className="w-16 h-16 text-[#1A247E]" />,
    title: "Atendimento Humanizado",
    description: "Nossa equipe de especialistas está sempre disponível para orientar você em sua jornada financeira, com atendimento personalizado."
  },
  {
    icon: <TrendingUp className="w-16 h-16 text-[#1A247E]" />,
    title: "Resultados Comprovados",
    description: "Nossos clientes obtêm em média 23% de melhoria em sua organização financeira nos primeiros 6 meses."
  },
  {
    icon: <Clock className="w-16 h-16 text-[#1A247E]" />,
    title: "Inovação Constante",
    description: "Investimos continuamente em tecnologia e inovação para oferecer sempre as melhores soluções do mercado."
  },
  {
    icon: <Heart className="w-16 h-16 text-[#1A247E]" />,
    title: "Compromisso Social",
    description: "Acreditamos que educação financeira deve ser acessível a todos, por isso oferecemos conteúdo gratuito e programas sociais."
  }
];

// --- Dados Consolidados para a Seção "Depoimentos" ---
const testimonialsData: TestimonialItem[] = [
  {
    name: "Maria Silva",
    role: "Empresária",
    content: "Em 8 meses consegui organizar minhas finanças e já estou investindo. A FinTech mudou minha vida!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b589?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "João Santos",
    role: "Engenheiro",
    content: "O suporte é excepcional. Sempre que preciso, tenho um especialista me orientando. Recomendo muito!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Ana Costa",
    role: "Médica",
    content: "Finalmente encontrei uma plataforma que me ensina a investir de forma segura e inteligente.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

// --- Subcomponente para renderizar um Card de Diferencial ---
interface ReasonCardProps {
  reason: ReasonItem;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ reason }) => {
  return (
    <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <CardContent className="p-8">
        <div className="flex justify-center mb-6">
          {reason.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{reason.title}</h3>
        <p className="text-gray-600">{reason.description}</p>
      </CardContent>
    </Card>
  );
};

// --- Subcomponente para renderizar um Card de Depoimento ---
interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card className="hover:shadow-xl transition-all">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <img
            src={testimonial.image}
            alt={`Foto de perfil de ${testimonial.name}, ${testimonial.role}`} // Alt text aprimorado
            className="w-16 h-16 rounded-full mr-4 object-cover"
            loading="lazy" // Otimização de carregamento de imagem
          />
          <div>
            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        </div>
        <p className="text-gray-700 italic">"{testimonial.content}"</p>
        <div className="flex text-yellow-400 mt-4" aria-label="Avaliação de 5 estrelas">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" /> // Usando ícone Star e fill-current
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// --- Componente Principal PorqueNos ---
const PorqueNos: React.FC = () => {
  // Memoiza os dados para evitar recriação em cada renderização
  const reasons = useMemo(() => reasonsData, []);
  const testimonials = useMemo(() => testimonialsData, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main> {/* Usado <main> para semântica */}
        {/* Hero Section */}
        <section className="fintech-gradient pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Por Que Escolher a FinTech?
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Descubra os diferenciais que fazem da FinTech a melhor escolha 
              para sua educação e planejamento financeiro
            </p>
          </div>
        </section>

        {/* Nossos Diferenciais */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nossos Diferenciais
              </h2>
              <p className="text-xl text-gray-600">
                O que nos torna únicos no mercado
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((reason, index) => (
                <ReasonCard key={index} reason={reason} /> // Usa o subcomponente
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                O Que Nossos Clientes Dizem
              </h2>
              <p className="text-xl text-gray-600">
                Histórias reais de transformação financeira
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} /> // Usa o subcomponente
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PorqueNos;
