
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { School, Building2, Users, BookOpen, Trophy, Heart, Gamepad2, Users2, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssinaturasCorporativas = () => {
  const plans = [
    {
      name: "Escola Básica",
      price: "R$ 299/mês",
      description: "Até 100 alunos",
      features: [
        "Acesso completo ao conteúdo educativo",
        "Dashboard para professores",
        "Relatórios de progresso",
        "Suporte técnico",
        "Material didático digital"
      ],
      icon: <School className="w-8 h-8" />,
      popular: false
    },
    {
      name: "Escola Premium",
      price: "R$ 599/mês",
      description: "Até 500 alunos",
      features: [
        "Todos os recursos do Básico",
        "Workshops presenciais mensais",
        "Capacitação para professores",
        "Gamificação avançada",
        "Relatórios personalizados",
        "Consultoria pedagógica"
      ],
      icon: <Building2 className="w-8 h-8" />,
      popular: true
    },
    {
      name: "Rede de Ensino",
      price: "Sob consulta",
      description: "Acima de 1000 alunos",
      features: [
        "Todos os recursos Premium",
        "Implementação personalizada",
        "Gestor de conta dedicado",
        "Treinamentos especializados",
        "API para integração",
        "Suporte 24/7"
      ],
      icon: <Users className="w-8 h-8" />,
      popular: false
    }
  ];

  const differentials = [
    {
      icon: <Gamepad2 className="w-12 h-12 text-[#1A247E]" />,
      title: "Gamificação",
      description: "Aprendizado através de jogos e desafios que mantêm os alunos engajados"
    },
    {
      icon: <Target className="w-12 h-12 text-[#1A247E]" />,
      title: "Aprendizado Prático",
      description: "Exercícios reais que simulam situações do dia a dia financeiro"
    },
    {
      icon: <Users2 className="w-12 h-12 text-[#1A247E]" />,
      title: "Engajamento Familiar",
      description: "Ferramentas que conectam pais e responsáveis no processo educativo"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <section className="fintech-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Assinaturas Corporativas
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transforme a educação financeira em sua escola ou instituição com nossos planos especializados
            </p>
          </div>
        </section>

        {/* Nossos Diferenciais */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nossos Diferenciais
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nosso aplicativo se destaca pela combinação de gamificação, aprendizado prático e engajamento familiar. 
                Além disso, oferecemos ferramentas para pais e escolas participarem ativamente da educação financeira dos jovens, 
                criando um ecossistema completo de aprendizado.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {differentials.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Planos */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Planos para Instituições
              </h2>
              <p className="text-xl text-gray-600">
                Escolha o plano ideal para sua escola ou instituição
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative hover:shadow-xl transition-all ${plan.popular ? 'border-[#1A247E] border-2 scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#1A247E] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div className="flex justify-center text-[#1A247E] mb-4">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-[#1A247E] mt-2">{plan.price}</div>
                    <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/pagamento">
                      <Button className={`w-full ${plan.popular ? 'bg-[#1A247E] hover:bg-[#2D4DE0]' : 'bg-gray-900 hover:bg-gray-800'}`}>
                        Solicitar Proposta
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Por que escolher nossa plataforma?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <BookOpen className="w-12 h-12" />, title: "Conteúdo Especializado", desc: "Material desenvolvido por especialistas em educação financeira" },
                { icon: <Users className="w-12 h-12" />, title: "Foco na Faixa Etária", desc: "Conteúdo adaptado para crianças e adolescentes" },
                { icon: <Trophy className="w-12 h-12" />, title: "Resultados Comprovados", desc: "Melhoria significativa na educação financeira dos alunos" },
                { icon: <Heart className="w-12 h-12" />, title: "Suporte Completo", desc: "Acompanhamento pedagógico e técnico especializado" }
              ].map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-center text-[#1A247E] mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário de Contato */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Solicite uma Demonstração
              </h2>
              <p className="text-lg text-gray-600">
                Preencha o formulário e nossa equipe entrará em contato para agendar uma apresentação personalizada
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Nome do Responsável</Label>
                      <Input id="name" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="institution">Nome da Instituição</Label>
                      <Input id="institution" placeholder="Nome da escola/empresa" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(11) 99999-9999" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="students">Número de Alunos</Label>
                      <Input id="students" placeholder="Ex: 150 alunos" />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" placeholder="Sua cidade" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Conte-nos mais sobre suas necessidades e objetivos"
                      rows={4}
                    />
                  </div>

                  <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3">
                    Solicitar Demonstração
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AssinaturasCorporativas;
