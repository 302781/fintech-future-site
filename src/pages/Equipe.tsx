
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Mail } from 'lucide-react';

import imgEduarda from '@/assets/equipe/Eduarda.jpeg';
import imgVitoria from '@/assets/equipe/perfil.png';
import imgLuis from '@/assets/equipe/Luis.png';

interface Member {
  name: string;
  role: string;
  description: string;
  image: string; 
  linkedin: string;
  email: string;
}
const Equipe = () => {
  const teamMembers = [
       {
      name: "Luis Guilherme",
      role: "Design & Front-end",
      description:[ 
        "- Colaboração no Figma (interface e experiência do usuário)",
        "-Auxílio no desenvolvimento do site (código e integrações básicas)."].join("-"),
      image: imgLuis,
      linkedin: "#",
      email: "luis.guilherme@fintech.com"
    },
    {
      name: "Maria Eduarda Sodré Alves",
      role: "Product Owner",
      description: [
        "- Liderança do projeto e tomada de decisões estratégicas. - Gerenciamento do Trello(tasks, prazos e prioridades).",
        "- Desenvolvimento e atualização do Canvas(modelo de negócios e validação).",
        "- Elaboração e refinamento do Business Model Canvas(BMC).",
        " -Pesquisa de mercado e análise de viabilidade financeira."
      ].join("-"),
      image: imgEduarda,
      linkedin: "#",
      email: "maria.eduarda@fintech.com"
    },
    {
      name: "Maria Vitoria",
      role: "Design & Front-end",
      description: ["-Criação do protótipo no Figma (UI/UX Design).",
        "-Desenvolvimento do site(implementação do frontend e backend)."].join("-"),
      image: imgVitoria,
      linkedin: "#",
      email: "maria.vitoria@fintech.com"
    },
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
            Conheça os profissionais dedicados que trabalham para transformar 
            a educação financeira no Brasil
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#1A247E]/20"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  
                  <div className="text-[#1A247E] font-semibold mb-4">
                    {member.role}
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <a 
                      href={member.linkedin}
                      className="p-2 bg-[#1A247E] text-white rounded-full hover:bg-[#2D4DE0] transition-colors"
                      aria-label={`LinkedIn de ${member.name}`} 
                    >
                      <Linkedin size={16} />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                      aria-label={`LinkedIn de ${member.name}`} 
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Trabalhamos Juntos por um Futuro Financeiro Melhor
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Nossa equipe multidisciplinar combina expertise em tecnologia, educação e 
            negócios para criar soluções inovadoras que transformam a relação das pessoas 
            com o dinheiro desde a infância.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1A247E] mb-2">3</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1A247E] mb-2">50K+</div>
              <div className="text-gray-600">Alunos Impactados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1A247E] mb-2">100+</div>
              <div className="text-gray-600">Escolas Parceiras</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Equipe;
