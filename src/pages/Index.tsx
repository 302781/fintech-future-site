import React, { useMemo } from 'react';
import Navigation from '@/components/Navigation'; 
import Hero from '@/components/Hero'; 
import Services from '@/components/Services'; 
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { footerSectionsData } from './SettingsPage';

/**
 * @interface FooterSectionLink
 * @property {string} label 
 * @property {string} to 
 */
interface FooterSectionLink {
  label: string;
  to: string;
}

/**
 * @interface FooterSection
 * @property {string} title - O título da seção do rodapé.
 * @property {FooterSectionLink[]} links - Um array de objetos de link para a seção.
 */
export interface FooterSection {
  title: string;
  links: FooterSectionLink[];
}

const Footer: React.FC = () => {

  const sections = useMemo(() => footerSectionsData, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Seção de Branding do Rodapé */}
          <div>
            <h3 className="text-2xl font-bold mb-4">FinTech</h3>
            <p className="text-gray-400">
              Transformando vidas através da educação financeira
            </p>
          </div>

          {/* Renderiza as seções dinamicamente */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.to}
                      className="hover:text-white transition-colors"
                      aria-label={`${link.label} da seção ${section.title}`} // Melhoria de acessibilidade
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Direitos Autorais */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FinTech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col"> {/* Use flex-col para o layout */}
      <Navigation /> {/* Sua barra de navegação */}
      
      <main className="flex-grow"> {/* main ocupa o espaço restante */}
        <Hero /> {/* O seu componente Hero */}
        <Services /> {/* O seu componente Services */}

        {/* Seção de Chamada para Ação (CTA) */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pronto para Transformar suas Finanças?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Junte-se a milhares de pessoas que já descobriram o poder da educação financeira
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-4 h-auto group"
            >
              <Link to="/planos" className="flex items-center" aria-label="Explore nossos planos de educação financeira">
                Explore Nossos Planos
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
