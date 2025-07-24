// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom'; // Importe Navigate aqui
import { useAuth } from '../contexts/AuthContextHook'; // Importe useAuth aqui (ajuste o caminho se necessário)

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // SE O USUÁRIO NÃO ESTIVER LOGADO, REDIRECIONA PARA /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // SE O USUÁRIO ESTIVER LOGADO, MOSTRA O CONTEÚDO DA ROTA
  return <>{children}</>;
};

export default PrivateRoute; // Exporte o componente