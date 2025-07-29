import React, { useMemo } from 'react'; // Adicionado useMemo para otimização
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Mail } from 'lucide-react';

// Importar imagens diretamente. Certifique-se de que os caminhos estão corretos
// e que seu bundler (ex: Vite, Webpack) está configurado para lidar com importações de imagens.
import imgEduarda from '@/assets/equipe/Eduarda.jpeg';
import imgVitoria from '@/assets/equipe/perfil.png';
import imgLuis from '@/assets/equipe/Luis.png';

// --- Interface do Membro da Equipe ---
interface Member {
  name: string;
  role: string;
  // A descrição agora é um array de strings para melhor formatação como lista
  description: string[]; 
  image: string; 
  linkedin: string;
  email: string;
}

// --- Dados dos Membros da Equipe (consolidados aqui) ---
const teamMembersData: Member[] = [
  {
    name: "Luis Guilherme",
    role: "Design & Front-end",
    // Descrição formatada como array de strings
    description: [ 
      "Colaboração no Figma (interface e experiência do usuário)",
      "Auxílio no desenvolvimento do site (código e integrações básicas)."
    ],
    image: imgLuis,
    linkedin: "#", 
    email: "luis.guilherme@fintech.com"
  },
  {
    name: "Maria Eduarda Sodré Alves",
    role: "Product Owner",
    description: [
      "Liderança do projeto e tomada de decisões estratégicas.",
      "Gerenciamento do Trello (tasks, prazos e prioridades).",
      "Desenvolvimento e atualização do Canvas (modelo de negócios e validação).",
      "Elaboração e refinamento do Business Model Canvas (BMC).",
      "Pesquisa de mercado e análise de viabilidade financeira."
    ],
    image: imgEduarda,
    linkedin: "http://www.linkedin.com/in/maria-eduarda-sodré-alves", 
    email: "mdudasodre@gmail.com"
  },
  {
    name: "Maria Vitoria",
    role: "Design & Front-end",
    description: [
      "Criação do protótipo no Figma (UI/UX Design).",
      "Desenvolvimento do site (implementação do frontend e backend)."
    ],
    image: imgVitoria,
    linkedin: "https://www.linkedin.com/in/maria-vit%C3%B3ria-ferreira-lopes-9865b7284", 
    email: "vitoria410df@gmail.com"
  },
];

interface TeamMemberCardProps {
  member: Member;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <CardContent className="p-8">
        <div className="relative mb-6">
          <img 
            src={member.image} 
            alt={`Foto de perfil de ${member.name}, ${member.role}`} // Alt text mais descritivo
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#1A247E]/20"
            loading="lazy" // Otimização de carregamento de imagem
          />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {member.name}
        </h3>
        
        <div className="text-[#1A247E] font-semibold mb-4">
          {member.role}
        </div>
        
        {/* Renderiza a descrição como uma lista não ordenada */}
        <ul className="text-gray-600 mb-6 text-sm leading-relaxed list-disc list-inside text-left">
          {member.description.map((item, idx) => (
            <li key={idx}>{item.trim().replace(/^-/, '')}</li> 
          ))}
        </ul>
        
        <div className="flex justify-center gap-4">
          <a 
            href={member.linkedin}
            target="_blank" // Abre o link em uma nova aba
            rel="noopener noreferrer" // Segurança adicional para links externos
            className="p-2 bg-[#1A247E] text-white rounded-full hover:bg-[#2D4DE0] transition-colors"
            aria-label={`Perfil de LinkedIn de ${member.name}`} // Acessibilidade
          >
            <Linkedin size={16} />
          </a>
          <a 
            href={`mailto:${member.email}`}
            className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
            aria-label={`Enviar e-mail para ${member.name}`} // Acessibilidade (corrigido do LinkedIn)
          >
            <Mail size={16} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Componente Principal Equipe ---
const Equipe = () => {
  // Memoiza os dados dos membros da equipe para evitar recriação desnecessária
  const teamMembers = useMemo(() => teamMembersData, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main> {/* Usado <main> para semântica */}
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
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))},
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
            <div className="grid sm:grid-cols-3 gap-8 mt-12"> {/* Ajustado para sm:grid-cols-3 */}
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
      </main>
    </div>
  );
};

export default Equipe;
