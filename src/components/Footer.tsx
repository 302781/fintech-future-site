import React from 'react';
import { Link } from 'react-router-dom'; // Assumindo que você usa react-router-dom para navegação
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail } from "lucide-react"; // Importe todos os ícones necessários

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual dinamicamente

  return (
    // Usa uma cor de fundo sólida para o footer, alinhada com o tema azul do seu projeto.
    // O padding vertical foi ajustado para dar mais respiro.
    <footer className="bg-[#1A247E] text-white py-14 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto container"> {/* Centraliza e limita a largura do conteúdo */}
        {/* Seção principal do footer com grid para organização em colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 mb-10 border-b border-blue-700 dark:border-blue-900">
          {/* Coluna 1: Logo/Nome da Empresa e Descrição */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="text-3xl font-extrabold mb-4 text-white hover:text-blue-100 transition-colors" aria-label="Página inicial FinanceEdu">
              FinanceEdu {/* O nome do seu projeto */}
            </Link>
            <p className="text-blue-200 text-base leading-relaxed mb-6 max-w-xs">
              Transformando vidas através da **educação financeira** de qualidade e **ferramentas práticas**.
            </p>
            {/* Ícones de Redes Sociais */}
            <div className="flex space-x-5"> {/* Espaçamento maior entre os ícones */}
              <a href="https://facebook.com/seusite" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-300 hover:text-white transition-colors" aria-label="Visite nosso Facebook">
                <Facebook size={28} /> {/* Ícones maiores */}
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

          {/* Coluna 2: Cursos */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-5 text-white">Cursos</h3>
            <ul className="space-y-3"> {/* Espaçamento maior entre os itens da lista */}
              <li><Link to="/cursos/investimentos-basicos" className="text-blue-200 hover:text-white transition-colors text-base">Investimentos Básicos</Link></li>
              <li><Link to="/cursos/renda-fixa" className="text-blue-200 hover:text-white transition-colors text-base">Renda Fixa</Link></li>
              <li><Link to="/cursos/renda-variavel" className="text-blue-200 hover:text-white transition-colors text-base">Renda Variável</Link></li>
              <li><Link to="/cursos/criptomoedas" className="text-blue-200 hover:text-white transition-colors text-base">Criptomoedas</Link></li>
              <li><Link to="/cursos/fundos-imobiliarios" className="text-blue-200 hover:text-white transition-colors text-base">Fundos Imobiliários</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Ferramentas */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-5 text-white">Ferramentas</h3>
            <ul className="space-y-3">
              <li><Link to="/ferramentas/calculadora-juros" className="text-blue-200 hover:text-white transition-colors text-base">Calculadora de Juros Compostos</Link></li>
              <li><Link to="/ferramentas/simulador-aposentadoria" className="text-blue-200 hover:text-white transition-colors text-base">Simulador de Aposentadoria</Link></li>
              <li><Link to="/ferramentas/planejador-metas" className="text-blue-200 hover:text-white transition-colors text-base">Planejador de Metas</Link></li>
              <li><Link to="/ferramentas/analise-carteira" className="text-blue-200 hover:text-white transition-colors text-base">Análise de Carteira</Link></li>
              <li><Link to="/ferramentas/comparador-fundos" className="text-blue-200 hover:text-white transition-colors text-base">Comparador de Fundos</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Empresa e Contato */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-5 text-white">Empresa</h3>
            <ul className="space-y-3 mb-6">
              <li><Link to="/sobre" className="text-blue-200 hover:text-white transition-colors text-base">Sobre Nós</Link></li>
              <li><Link to="/blog" className="text-blue-200 hover:text-white transition-colors text-base">Blog</Link></li>
              <li><Link to="/contato" className="text-blue-200 hover:text-white transition-colors text-base">Contato</Link></li>
              <li><Link to="/politica-de-privacidade" className="text-blue-200 hover:text-white transition-colors text-base">Política de Privacidade</Link></li>
              <li><Link to="/termos-de-uso" className="text-blue-200 hover:text-white transition-colors text-base">Termos de Uso</Link></li>
            </ul>
            {/* Informação de Contato */}
            <h4 className="text-lg font-semibold mb-3 text-white">Fale Conosco</h4>
            <p className="text-blue-200 text-sm flex items-center justify-center md:justify-start">
              <Mail size={20} className="mr-2" />
              <a href="mailto:contato@financeedu.com" className="text-blue-200 hover:underline hover:text-white transition-colors">contato@financeedu.com</a>
            </p>
          </div>
        </div>

        {/* Seção de Copyright e Slogan Inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center text-blue-300 text-sm pt-4">
          <p className="mb-2 md:mb-0">
            &copy; {currentYear} FinanceEdu. Todos os direitos reservados.
          </p>
          <p>
            Educação financeira que transforma vidas.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;