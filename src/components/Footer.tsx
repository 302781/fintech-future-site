// src/components/Footer.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail } from "lucide-react";
import { footerSectionsData } from '@/data/footerData'; // <--- Importe os dados do novo arquivo

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const sections = useMemo(() => footerSectionsData, []); // Use os dados memoizados

  return (
    <footer className="bg-[#1A247E] text-white py-14 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 mb-10 border-b border-blue-700 dark:border-blue-900">
          {/* Coluna 1: Logo/Nome da Empresa e Descrição */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="text-3xl font-extrabold mb-4 text-white hover:text-blue-100 transition-colors" aria-label="Página inicial FinanceEdu">
              FinTech
            </Link>
            <p className="text-blue-200 text-base leading-relaxed mb-6 max-w-xs">
              Transformando vidas através da educação financeira de qualidade e ferramentas práticas.
            </p>
            <div className="flex space-x-5">
              <a href="https://facebook.com/seusite" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-300 hover:text-white transition-colors" aria-label="Visite nosso Facebook">
                <Facebook size={28} />
              </a>
              <a href="https://instagram.com/seusite" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-300 hover:text-white transition-colors" aria-label="Visite nosso Instagram">
                <Instagram size={28} />
              </a>
              <a href="https://twitter.com/seusite" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-300 hover:text-white transition-colors" aria-label="Visite nosso Twitter">
                <Twitter size={28} />
              </a>
              <a href="https://youtube.com/seusite" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-300 hover:text-white transition-colors" aria-label="Visite nosso Youtube">
                <Youtube size={28} />
              </a>
              <a href="https://linkedin.com/company/seusite" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-300 hover:text-white transition-colors" aria-label="Visite nosso LinkedIn">
                <Linkedin size={28} />
              </a>
            </div>
          </div>

          {/* Renderiza as seções dinamicamente */}
          {sections.map((section, index) => (
            <div key={index} className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-5 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.to}
                      className="text-blue-200 hover:text-white transition-colors text-base"
                      aria-label={`${link.label} da seção ${section.title}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Coluna de Contato (se desejar manter separado ou adicionar aqui) */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-3 text-white">Fale Conosco</h4>
            <p className="text-blue-200 text-sm flex items-center justify-center md:justify-start">
              <Mail size={20} className="mr-2" />
              <a href="mailto:contato@financeedu.com" className="text-blue-200 hover:underline hover:text-white transition-colors">vitoria410df@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-blue-300 text-sm">
          <p>&copy; {currentYear} FinTech. Todos os direitos reservados.</p>
          <p>Educação financeira que transforma vidas.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;