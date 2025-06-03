
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, TrendingUp, Clock, Heart } from 'lucide-react';

const PorqueNos = () => {
  const reasons = [
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

  const testimonials = [
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

  return (
    <div className="min-h-screen">
      <Navigation />
      
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
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    {reason.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Números que Impressionam */}
      <section className="py-20 fintech-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Resultados que Falam por Si
            </h2>
            <p className="text-xl text-blue-100">
              Números que comprovam nossa excelência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50.000+", label: "Clientes Satisfeitos", description: "em todo o Brasil" },
              { number: "R$ 2B+", label: "Patrimônio Gerido", description: "com segurança total" },
              { number: "98%", label: "Taxa de Satisfação", description: "dos nossos clientes" },
              { number: "4,9/5", label: "Avaliação", description: "nas lojas de apps" }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-blue-100 mb-1">{stat.label}</div>
                  <div className="text-blue-200 text-sm">{stat.description}</div>
                </CardContent>
              </Card>
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
              <Card key={index} className="hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificações e Prêmios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Reconhecimento do Mercado
            </h2>
            <p className="text-xl text-gray-600">
              Prêmios e certificações que validam nossa qualidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Melhor FinTech 2023",
              "Certificação ISO 27001",
              "Top 10 Startups Brasil",
              "Prêmio Inovação Digital"
            ].map((award, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Award className="w-16 h-16 text-[#1A247E] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900">{award}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PorqueNos;
