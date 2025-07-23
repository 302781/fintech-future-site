// src/pages/PlanosPage.tsx
import React from 'react';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PlanosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-5xl font-bold text-[#1A247E] mb-6">Nossos Planos</h1>
        <p className="text-xl text-gray-700 mb-8">
          Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada financeira!
        </p>

        {/* Exemplo de plano simples - você vai expandir isso */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl">
          {/* Plano Básico */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Plano Individual</h2>
            <p className="text-gray-600 mb-4">Acesso a cursos básicos e ferramentas essenciais.</p>
            <p className="text-4xl font-bold text-green-600 mb-6">R$49<span className="text-xl font-normal">/mês</span></p>
            <Link to="/checkout?plano=individual"> {/* Exemplo: leva para checkout */}
                <Button className="bg-[#1A247E] hover:bg-[#2D4DE0]">
                    Contratar Individual
                </Button>
            </Link>
          </div>

          {/* Plano Premium */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Plano Premium</h2>
            <p className="text-gray-600 mb-4">Todos os recursos, mentorias e acesso exclusivo.</p>
            <p className="text-4xl font-bold text-green-600 mb-6">R$99<span className="text-xl font-normal">/mês</span></p>
            <Link to="/checkout?plano=premium">
                <Button className="bg-[#1A247E] hover:bg-[#2D4DE0]">
                    Contratar Premium
                </Button>
            </Link>
          </div>

          {/* Plano Corporativo (aponta para o seu PlanosCorporativos) */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Plano Corporativo</h2>
            <p className="text-gray-600 mb-4">Soluções personalizadas para empresas e instituições.</p>
            <p className="text-4xl font-bold text-green-600 mb-6">Sob Consulta</p>
            <Link to="/contratar-plano?plano=corporativo"> {/* Aponta para o seu PlanosCorporativos */}
                <Button className="bg-[#1A247E] hover:bg-[#2D4DE0]">
                    Solicitar Orçamento
                </Button>
            </Link>
          </div>
        </div>

        <p className="mt-10 text-gray-600">
          Precisa de ajuda para escolher? <Link to="/contato" className="text-[#1A247E] hover:underline">Entre em contato</Link> com nossa equipe!
        </p>
      </div>
    </div>
  );
};

export default PlanosPage;