import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Importe Link do react-router-dom
import { cn } from "@/lib/utils"; // Supondo que você tenha um utilitário cn para classes condicionais

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lista de links de navegação
  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Cursos", path: "/cursos" }, // Sugestão para uma página de cursos gerais
    { name: "Ferramentas", path: "/ferramentas" }, // Sugestão para uma página de ferramentas
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-[#1A247E] to-[#2D4DE0] bg-clip-text text-transparent" aria-label="FinanceEdu - Página Inicial">
            FinanceEdu
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 dark:text-gray-300 hover:text-[#1A247E] dark:hover:text-[#2D4DE0] transition-colors font-medium text-base"
            >
              {link.name}
            </Link>
          ))}
          {/* Links específicos que podem levar para áreas logadas ou autenticação */}
          <Link to="/auth" className="text-gray-700 dark:text-gray-300 hover:text-[#1A247E] dark:hover:text-[#2D4DE0] transition-colors font-medium text-base">
            Login
          </Link>
          <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-[#1A247E] dark:hover:text-[#2D4DE0] transition-colors font-medium text-base">
            Dashboard
          </Link>
        </div>

        {/* Desktop CTA Buttons (Ação Principal) */}
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild variant="ghost" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1A247E] dark:hover:text-[#2D4DE0]">
            <Link to="/auth/login">Entrar</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-[#1A247E] to-[#2D4DE0] hover:from-[#1A247E]/90 hover:to-[#2D4DE0]/90 text-white font-semibold shadow-md">
            <Link to="/auth/register">Cadastre-se Grátis</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-300 hover:text-[#1A247E] dark:hover:text-[#2D4DE0] focus:outline-none focus:ring-2 focus:ring-[#1A247E] rounded-md p-1"
            aria-controls="mobile-menu"
            aria-expanded={isOpen ? "true" : "false"}
            aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden" // Animação de expansão/recolhimento
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)} // Fecha o menu ao clicar em um link
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1A247E] dark:hover:text-[#2D4DE0] rounded-md text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
          {/* Links e botões para Mobile */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-2 space-y-2">
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1A247E] dark:hover:text-[#2D4DE0] rounded-md text-base font-medium">
              Acessar Dashboard
            </Link>
            <Button asChild variant="ghost" className="w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1A247E] dark:hover:text-[#2D4DE0]">
              <Link to="/auth/login" onClick={() => setIsOpen(false)}>Entrar</Link>
            </Button>
            <Button asChild className="w-full bg-gradient-to-r from-[#1A247E] to-[#2D4DE0] hover:from-[#1A247E]/90 hover:to-[#2D4DE0]/90 text-white font-semibold">
              <Link to="/auth/register" onClick={() => setIsOpen(false)}>Cadastre-se Grátis</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;