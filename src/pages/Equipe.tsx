
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Mail } from 'lucide-react';

const Equipe = () => {
  const founders = [
    {
      name: "Dr. Carlos Mendes",
      role: "CEO & Fundador",
      description: "PhD em Economia pela FGV, 25 anos de experiência no mercado financeiro. Ex-diretor do Banco Central.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      email: "carlos@fintech.com"
    },
    {
      name: "Dra. Ana Rodrigues",
      role: "CTO & Co-fundadora",
      description: "Mestre em Ciência da Computação pela USP, especialista em FinTech e blockchain. Ex-Google.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      email: "ana@fintech.com"
    }
  ];

  const team = [
    {
      name: "Roberto Silva",
      role: "Diretor de Investimentos",
      description: "CFA, 15 anos de experiência em gestão de patrimônio e fundos de investimento.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      email: "roberto@fintech.com"
    },
    {
      name: "Mariana Costa",
      role: "Diretora de Produto",
      description: "MBA pela Wharton, especialista em UX/UI e desenvolvimento de produtos digitais.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      email: "mariana@fintech.com"
    },
    {
      name: "Pedro Oliveira",
      role: "Diretor de Tecnologia",
      description: "Engenheiro de Software, especialista em arquitetura de sistemas e segurança digital.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      email: "pedro@fintech.com"
    },
    {
      name: "Luciana Santos",
      role: "Diretora de Marketing",
      description: "MBA em Marketing Digital, 12 anos de experiência em growth e acquisition.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b589?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      email: "luciana@fintech.com"
    },
    {
      name: "Fernando Lima",
      role: "Diretor Financeiro",
      description: "Controller certificado, especialista em planejamento financeiro e compliance.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      email: "fernando@fintech.com"
    },
    {
      name: "Carla Ferreira",
      role: "Diretora de Compliance",
      description: "Advogada especialista em direito financeiro e regulamentações do mercado de capitais.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      email: "carla@fintech.com"
    }
  ];

  const advisors = [
    {
      name: "Prof. Dr. José Ferreira",
      role: "Advisor - Ex-Presidente CVM",
      description: "Doutor em Direito, ex-presidente da Comissão de Valores Mobiliários.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Maria Helena Santana",
      role: "Advisor - Ex-Diretora Banco Central",
      description: "Economista, ex-diretora do Banco Central do Brasil.",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="fintech-gradient pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Nossa Equipe
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Conheça os especialistas que estão revolucionando a educação 
            financeira no Brasil
          </p>
        </div>
      </section>

      {/* Fundadores */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fundadores
            </h2>
            <p className="text-xl text-gray-600">
              Visionários que criaram a FinTech
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <img 
                    src={founder.image}
                    alt={founder.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                  <p className="text-[#1A247E] font-semibold mb-4">{founder.role}</p>
                  <p className="text-gray-600 mb-6">{founder.description}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={founder.linkedin} className="text-[#1A247E] hover:text-blue-600">
                      <Linkedin size={24} />
                    </a>
                    <a href={`mailto:${founder.email}`} className="text-[#1A247E] hover:text-blue-600">
                      <Mail size={24} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diretoria Executiva */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Diretoria Executiva
            </h2>
            <p className="text-xl text-gray-600">
              Especialistas que lideram nossas áreas estratégicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#1A247E] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                  <div className="flex justify-center space-x-3">
                    <a href={member.linkedin} className="text-[#1A247E] hover:text-blue-600">
                      <Linkedin size={20} />
                    </a>
                    <a href={`mailto:${member.email}`} className="text-[#1A247E] hover:text-blue-600">
                      <Mail size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conselho Consultivo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Conselho Consultivo
            </h2>
            <p className="text-xl text-gray-600">
              Grandes nomes do mercado financeiro que nos orientam
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <img 
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-28 h-28 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{advisor.name}</h3>
                  <p className="text-[#1A247E] font-semibold mb-4">{advisor.role}</p>
                  <p className="text-gray-600">{advisor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultura da Empresa */}
      <section className="py-20 fintech-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Nossa Cultura
            </h2>
            <p className="text-xl text-blue-100">
              Valores que nos unem e nos motivam todos os dias
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Inovação", description: "Sempre buscando novas soluções" },
              { title: "Transparência", description: "Clareza em tudo que fazemos" },
              { title: "Excelência", description: "Qualidade em cada detalhe" },
              { title: "Impacto", description: "Transformando vidas através da educação" }
            ].map((value, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-blue-100">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Equipe;
