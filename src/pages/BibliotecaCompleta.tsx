// src/pages/BibliotecaCompleta.tsx

import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Gamepad2, Video, Puzzle, Lightbulb, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const BibliotecaCompleta = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header da Biblioteca */}
        <section className="fintech-gradient py-20 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Biblioteca Completa</h1>
            <p className="text-xl text-blue-100">
              Acesso ilimitado ao nosso universo de conhecimento financeiro, para todos os níveis de ensino.
            </p>
          </div>
        </section>

        {/* Seção de Visão Geral do Conteúdo */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">O que você vai encontrar em nossa Biblioteca?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="flex flex-col items-center p-6 text-center hover:shadow-lg transition-shadow">
                <Gamepad2 className="w-16 h-16 text-[#1A247E] mb-4" />
                <CardTitle className="text-2xl font-bold mb-2">Jogos Educativos</CardTitle>
                <CardDescription className="text-gray-600">
                  Aprenda finanças de forma divertida e interativa com nossos jogos que simulam situações reais.
                </CardDescription>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center hover:shadow-lg transition-shadow">
                <Video className="w-16 h-16 text-[#1A247E] mb-4" />
                <CardTitle className="text-2xl font-bold mb-2">Vídeos Explicativos</CardTitle>
                <CardDescription className="text-gray-600">
                  Aulas animadas e didáticas que descomplicam os conceitos mais complexos de educação financeira.
                </CardDescription>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center hover:shadow-lg transition-shadow">
                <Puzzle className="w-16 h-16 text-[#1A247E] mb-4" />
                <CardTitle className="text-2xl font-bold mb-2">Atividades Interativas</CardTitle>
                <CardDescription className="text-gray-600">
                  Desafios práticos, quizzes e exercícios para fixar o aprendizado e testar seus conhecimentos.
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* Seção de Níveis de Ensino */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Conteúdo para Todos os Níveis</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Nível Básico */}
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <GraduationCap className="w-12 h-12 text-[#1A247E] mx-auto mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Ensino Fundamental I & II</CardTitle>
                <CardDescription className="text-gray-600">
                  Introdução ao dinheiro, poupança, orçamento familiar e consumo consciente com atividades lúdicas.
                </CardDescription>
              </Card>
              {/* Nível Intermediário */}
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Lightbulb className="w-12 h-12 text-[#1A247E] mx-auto mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Ensino Médio</CardTitle>
                <CardDescription className="text-gray-600">
                  Planejamento financeiro pessoal, juros, dívidas, introdução a investimentos e empreendedorismo.
                </CardDescription>
              </Card>
              {/* Nível Avançado */}
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <BookOpen className="w-12 h-12 text-[#1A247E] mx-auto mb-4" />
                <CardTitle className="text-xl font-bold mb-2">Ensino Superior & Profissional</CardTitle>
                <CardDescription className="text-gray-600">
                  Investimentos avançados, finanças corporativas, mercado de capitais e gestão de portfólio.
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* Seção de Chamada para Ação */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pronto para Mergulhar no Conhecimento?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Nossa Biblioteca Completa está disponível em todos os nossos planos corporativos. Escolha o que melhor se adapta à sua instituição!
            </p>
            <Button asChild className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3 px-8">
              <Link to="/assinatura-corporativa">Ver Nossos Planos</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BibliotecaCompleta;