import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlanosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-[#1A247E] sm:text-5xl">
              Escolha o Plano Ideal para Você
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Assine um de nossos planos e comece a transformar sua vida financeira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Básico */}
            <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-[#1A247E]">Plano Básico</CardTitle>
                <CardDescription className="mt-2 text-gray-500">
                  Ideal para começar nas financias.
                </CardDescription>
                <p className="mt-4 text-4xl font-bold text-gray-900">
                  Gratuito<span className="text-lg font-normal text-gray-500"></span>
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Acesso a cursos ilimitados
                  </li>
                  <li className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                  Aulas interativas
                  </li>
                  <li className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    Suporte 24h
                  </li>
                  <li className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    Ferramentas avançadas
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/login" className="w-full">
                  <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg">
                    Assinar
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#1A247E]">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-[#1A247E]">Plano Escola Basica</CardTitle>
                <CardDescription className="mt-2 text-gray-500">
                  Ideal para escolas pequenas com até 100 alunos que desejam iniciar a educação financeira
                </CardDescription>
                <p className="mt-4 text-4xl font-bold text-gray-900">
                  R$ 299<span className="text-lg font-normal text-gray-500">/mês</span>
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Biblioteca Completa
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Dashboard Intuitivo
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Suporte Técnico 
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Material Técnico
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/checkout" className="w-full">
                  <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg">
                    Comprar
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plano Premium */}
            <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#1A247E]">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-[#1A247E]">Plano Premium</CardTitle>
                <CardDescription className="mt-2 text-gray-500">
                  Solução completa para escolas médias com até 500 alunos.
                </CardDescription>
                <p className="mt-4 text-4xl font-bold text-gray-900">
                  R$ 599<span className="text-lg font-normal text-gray-500">/mês</span>
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Todos os recursos do Básico.
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Workshops presenciais mensais.
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Capacitação para professores
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Gamificação avançada
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Relatórios personalizados
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Consultoria pedagógica
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/" className="w-full">
                  <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg">
                    Comprar
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plano Corporativo */}
            <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-[#1A247E]">Plano Corporativo</CardTitle>
                <CardDescription className="mt-2 text-gray-500">
                  Soluções personalizadas para empresas e instituições de ensino.
                </CardDescription>
                <p className="mt-4 text-4xl font-bold text-gray-900">
                  Sob Consulta
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Plataforma customizada
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Workshops e palestras
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Relatórios de desempenho
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Suporte dedicado
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/contratar-plano?plano=corporativo" className="w-full">
                  <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg">
                    Solicitar Orçamento
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanosPage;