import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { School, Building2, Users, BookOpen, Trophy, Heart, Gamepad2, Users2, Target } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';



const AssinaturaCorporativa = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        <section className="fintech-gradient py-20 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Planos de Assinatura Corporativa</h1>
            <p className="text-xl text-blue-100">
              Eleve a educação financeira da sua instituição com nossas soluções personalizadas.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Escolha o Plano Ideal para Sua Instituição</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Plano Escola Básica */}
              <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">Escola Básica</CardTitle>
                  <CardDescription className="text-gray-600">
                    Ideal para escolas com até 100 alunos.
                  </CardDescription>
                  <div className="text-4xl font-extrabold text-gray-900 mt-4">
                    R$ 299<span className="text-xl font-medium text-gray-500">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Acesso ao conteúdo educativo fundamental
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Dashboard básico para professores
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Relatórios de progresso simplificados
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Suporte técnico padrão
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Material didático digital
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  {/* Redireciona para o formulário, passando o plano na URL */}
                  <Button asChild className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3">
                    <Link to="/contratar-plano?plano=Escola Básica">Contratar Plano</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Plano Escola Premium */}
              <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#1A247E]">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">Escola Premium</CardTitle>
                  <CardDescription className="text-gray-600">
                    Solução completa para escolas com até 500 alunos.
                  </CardDescription>
                  <div className="text-4xl font-extrabold text-gray-900 mt-4">
                    R$ 599<span className="text-xl font-medium text-gray-500">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> **Todos os recursos do Plano Básico**
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Workshops presenciais mensais
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Capacitação avançada para professores
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Gamificação avançada e desafios
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Relatórios de desempenho personalizados
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Consultoria pedagógica especializada
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  {/* Redireciona para o formulário, passando o plano na URL */}
                  <Button asChild className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3">
                    <Link to="/contratar-plano?plano=Escola Premium">Contratar Plano</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Plano Rede de Ensino */}
              <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">Rede de Ensino</CardTitle>
                  <CardDescription className="text-gray-600">
                    Solução personalizada para grandes redes e corporações.
                  </CardDescription>
                  <div className="text-4xl font-extrabold text-gray-900 mt-4">
                    Preço: <span className="text-xl font-medium text-gray-500">Sob consulta</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> **Todos os recursos do Plano Premium**
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Implementação e integração personalizadas
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Gestor de conta dedicado
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Treinamentos especializados e on-demand
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> API para integração com sistemas existentes
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Suporte prioritário 24/7
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  {/* Redireciona para o formulário, passando o plano na URL */}
                  <Button asChild className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3">
                    <Link to="/contratar-plano?plano=Rede de Ensino">Solicitar Cotação</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AssinaturaCorporativa;