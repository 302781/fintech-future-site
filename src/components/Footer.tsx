import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react'; // Ícones para redes sociais

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Para o ano dinâmico no copyright

  return (
    <footer className="bg-[#1A247E] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-blue-700 pb-8 mb-8">
        {/* Seção 1: Logo/Nome da Empresa e Descrição Curta */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Seu Projeto</h3>
          <p className="text-blue-200 text-sm">
            Transformando sua relação com o dinheiro através de educação financeira e ferramentas inovadoras.
          </p>
        </div>

        {/* Seção 2: Links Úteis */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-blue-200 hover:text-white transition-colors">Início</Link></li>
            <li><Link to="/planos" className="text-blue-200 hover:text-white transition-colors">Planos</Link></li>
            <li><Link to="/sobre" className="text-blue-200 hover:text-white transition-colors">Sobre Nós</Link></li>
            <li><Link to="/contato" className="text-blue-200 hover:text-white transition-colors">Contato</Link></li>
            {/* Adicione outros links, como blog, FAQ, termos de uso, política de privacidade */}
            <li><Link to="/politica-de-privacidade" className="text-blue-200 hover:text-white transition-colors">Política de Privacidade</Link></li>
          </ul>
        </div>

        {/* Seção 3: Contato e Redes Sociais */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Fale Conosco</h4>
          <p className="text-blue-200 text-sm mb-4">
            Dúvidas ou sugestões? Estamos aqui para ajudar!
            <br />
            Email: <a href="mailto:contato@seusite.com" className="text-blue-200 hover:underline">contato@seusite.com</a>
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com/seusite" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com/seusite" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com/company/seusite" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:contato@seusite.com" className="text-blue-200 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Seção de Copyright */}
      <div className="text-center text-blue-300 text-sm">
        <p>&copy; {currentYear} Seu Projeto. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;