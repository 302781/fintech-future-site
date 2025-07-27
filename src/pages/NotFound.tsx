import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Importado Link do react-router-dom

/**
 * Componente NotFound
 * Exibe uma página de erro 404 (Página Não Encontrada) quando o usuário tenta acessar uma rota inexistente.
 * Registra a tentativa de acesso no console para fins de depuração.
 */
const NotFound: React.FC = () => {
  const location = useLocation(); // Hook para acessar informações da URL atual

  /**
   * Efeito para registrar o erro 404 no console.
   * Dispara apenas uma vez na montagem do componente e quando o pathname muda.
   */
  useEffect(() => {
    console.error(
      "Erro 404: Usuário tentou acessar a rota inexistente:",
      location.pathname
    );
  }, [location.pathname]); // Dependência em location.pathname para reagir a mudanças de rota

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4 animate-bounce-slow">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Oops! Página não encontrada</p>
        <p className="text-lg text-gray-600 mb-8">
          A página que você está procurando pode ter sido removida, ter tido seu nome alterado ou está temporariamente indisponível.
        </p>
        {/* Usar o componente Link do react-router-dom para navegação interna,
            melhorando a experiência do usuário (evita recarregamento total da página)
            e otimizando a performance. */}
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#1A247E] hover:bg-[#2D4DE0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A247E] transition-colors"
          aria-label="Retornar para a página inicial" // Melhoria de acessibilidade
        >
          Retornar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
