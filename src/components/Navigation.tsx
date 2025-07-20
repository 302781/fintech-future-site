// src/components/ui/navigation.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'; // Importa novos ícones
import { useAuth } from '@/contexts/AuthContext'; // <--- IMPORTANTE: Importar useAuth

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user,loading, signOut } = useAuth(); // <--- Usar o hook de autenticação

  const navItems = [
    { name: 'INÍCIO', path: '/' },
    { name: 'SOBRE-NÓS', path: '/sobre' },
    { name: 'SERVIÇOS', path: '/servicos' },
    { name: 'PORQUE NÓS?', path: '/porque-nos' },
    { name: 'EDUCAÇÃO & EMPRESAS', path: '/educacao-e-corporativo' },
    { name: 'CURSOS', path: '/cursos' },
    { name: 'SIMULADORES', path: '/simuladores' },
    { name: 'EQUIPE', path: '/equipe' },
  ];

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false); // Fecha o menu mobile após o logout
    // O navigate('/') já está no signOut do AuthContext
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1A247E] to-[#2D4DE0] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-white text-3xl lg:text-4xl font-bold hover:scale-105 transition-transform">
            FinTech
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white font-medium hover:text-blue-200 transition-colors relative group text-sm ${
                  location.pathname === item.path ? 'text-blue-200' : ''
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {user ? ( // <--- Renderização condicional
              <>
                <Link to="/cursos"> {/* Exemplo: botão para o painel do usuário */}
                  <Button className="bg-white text-[#1A247E] hover:bg-blue-50 font-semibold px-6">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> MEUS CURSOS
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white hover:bg-red-600 font-semibold px-6"
                >
                  <LogOut className="mr-2 h-4 w-4" /> SAIR
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-white text-[#1A247E] hover:bg-blue-50 font-semibold px-6">
                  LOGIN
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1A247E]/95 rounded-b-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 text-white hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? ( // <--- Renderização condicional para mobile
                <>
                  <Link to="/cursos" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full mt-2 bg-white text-[#1A247E] hover:bg-blue-50">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> MEUS CURSOS
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout} 
                    className="w-full mt-2 bg-red-500 text-white hover:bg-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> SAIR
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full mt-2 bg-white text-[#1A247E] hover:bg-blue-50">
                    LOGIN
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;