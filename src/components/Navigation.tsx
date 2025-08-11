import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, LayoutDashboard, LogIn, X } from 'lucide-react'; // Removi MenuIcon
import { useAuth } from '@/hooks/useAuth';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, loading, signOut } = useAuth(); // 'loading' pode ser útil para desabilitar botões enquanto autentica
  const navigate = useNavigate();

  const navItems = [
    { name: 'INÍCIO', path: '/' },
    { name: 'SOBRE-NÓS', path: '/sobre' },
    { name: 'SERVIÇOS', path: '/servicos' },
    { name: 'PORQUE NÓS?', path: '/porque-nos' },
    //{ name: 'EDUCAÇÃO & EMPRESAS', path: '/educacao-e-corporativo' },
    { name: 'EQUIPE', path: '/equipe' },
  ];

  const handleLogout = async () => {
    // Chame a função de signOut do seu hook de autenticação
    await signOut(); 
    navigate('/login'); // Redireciona para a página de login após o logout
    setIsMenuOpen(false); // Garante que o menu mobile feche
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1A247E] to-[#2D4DE0] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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

            {/* Renderização Condicional para Desktop (Login/Logout) */}
            {loading ? ( // Opcional: mostrar algo enquanto carrega o status do usuário
              <div className="text-white">Carregando...</div>
            ) : user ? (
              <>
                <Link to="/cursos">
                  <Button variant="ghost" className="text-white hover:bg-gray-700/50">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> MEUS CURSOS
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:bg-gray-700/50"
                >
                  <LogOut className="mr-2 h-4 w-4" /> SAIR
                </Button>
              </>
            ) : (
              <Link to="/login"> {/* Link de Login para Desktop */}
                <Button
                  variant="ghost"
                  className="text-white hover:bg-gray-700/50"
                >
                  <LogIn className="mr-2 h-4 w-4" /> ENTRAR
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
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
              {/* Renderização Condicional para Mobile (Login/Logout) */}
              {loading ? (
                <div className="block px-3 py-2 text-white">Carregando...</div>
              ) : user ? (
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
                      <LogIn className="mr-2 h-4 w-4" /> LOGIN
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