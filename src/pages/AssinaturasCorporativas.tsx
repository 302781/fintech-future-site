
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Building, School, Users, CheckCircle, Star, Mail, Phone, Gamepad2, Heart, BookOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';

const AssinaturasCorporativas = () => {
  const form = useForm({
    defaultValues: {
      nomeInstituicao: '',
      email: '',
      telefone: '',
      numeroAlunos: '',
      tipoInstituicao: 'escola'
    }
  });

  const planos = [
    {
      id: 'basico',
      nome: 'Plano Básico',
      preco: 'R$ 15',
      periodo: 'por aluno/mês',
      descricao: 'Ideal para escolas pequenas',
      alunos: 'Até 100 alunos',
      features: [
        'Acesso a todos os cursos básicos',
        'Material didático digital',
        'Relatórios mensais',
        'Suporte por email'
      ],
      cor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'premium',
      nome: 'Plano Premium',
      preco: 'R$ 12',
      periodo: 'por aluno/mês',
      descricao: 'Para instituições médias',
      alunos: '101 a 500 alunos',
      features: [
        'Todos os recursos do Básico',
        'Cursos avançados',
        'Simuladores interativos',
        'Treinamento para professores',
        'Dashboard personalizado',
        'Suporte prioritário'
      ],
      cor: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'enterprise',
      nome: 'Plano Enterprise',
      preco: 'R$ 8',
      periodo: 'por aluno/mês',
      descricao: 'Para grandes instituições',
      alunos: 'Mais de 500 alunos',
      features: [
        'Todos os recursos do Premium',
        'Conteúdo personalizado',
        'API de integração',
        'Gestor de conta dedicado',
        'Relatórios avançados',
        'Certificações'
      ],
      cor: 'from-green-500 to-emerald-500'
    }
  ];

  const onSubmit = (data: any) => {
    console.log('Dados do formulário:', data);
    // Aqui seria feita a integração com o backend
  };

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
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Transforme a educação financeira na sua instituição. Oferecemos planos especiais para escolas, universidades e empresas.
            </p>
          </div>
        </section>

        {/* Nossos Diferenciais */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossos Diferenciais
              </h2>
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#1A247E] to-[#2D4DE0] rounded-2xl p-8 text-white">
                <p className="text-lg leading-relaxed">
                  Nosso aplicativo se destaca pela combinação de gamificação, aprendizado prático e engajamento familiar. 
                  Além disso, oferecemos ferramentas para pais e escolas participarem ativamente da educação financeira dos jovens, 
                  criando um ecossistema completo de aprendizado.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Gamepad2 className="w-16 h-16 text-[#1A247E] mx-auto mb-4" />
                  <CardTitle>Gamificação Engajante</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Jogos e desafios que tornam o aprendizado financeiro divertido e motivador para crianças e adolescentes.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="w-16 h-16 text-[#1A247E] mx-auto mb-4" />
                  <CardTitle>Aprendizado Prático</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Simuladores e exercícios práticos que preparam os jovens para situações financeiras reais do dia a dia.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="w-16 h-16 text-[#1A247E] mx-auto mb-4" />
                  <CardTitle>Engajamento Familiar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ferramentas que conectam pais, professores e alunos, criando um ambiente colaborativo de aprendizado.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Por que escolher nossos planos corporativos?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <School className="w-16 h-16 text-[#1A247E] mx-auto mb-4" />
                  <CardTitle>Escolas e Instituições</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Prepare seus alunos para o futuro com educação financeira de qualidade, adaptada para cada faixa etária.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Building className="w-16 h-16 text-[#1A247E] mx-auto mb-4" />
                  <CardTitle>Empresas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ofereça educação financeira como benefício aos seus funcionários e aumente a satisfação da equipe.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="w-16 h-16 text-[#1A247E] mx-auto mb-4" />
                  <CardTitle>Investidores Sociais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Apoie projetos de impacto social através da educação financeira para comunidades e grupos específicos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Planos */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Escolha o plano ideal para sua instituição
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {planos.map((plano) => (
                <Card key={plano.id} className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${plano.popular ? 'border-2 border-[#1A247E] scale-105' : ''}`}>
                  {plano.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-[#1A247E] text-white text-center py-2 text-sm font-bold">
                      <Star className="inline w-4 h-4 mr-1" />
                      MAIS POPULAR
                    </div>
                  )}
                  
                  <div className={`bg-gradient-to-r ${plano.cor} p-6 text-white ${plano.popular ? 'pt-14' : ''}`}>
                    <h3 className="text-2xl font-bold mb-2">{plano.nome}</h3>
                    <p className="text-lg opacity-90 mb-4">{plano.descricao}</p>
                    <div className="text-center">
                      <span className="text-4xl font-bold">{plano.preco}</span>
                      <span className="text-lg opacity-90">/{plano.periodo}</span>
                    </div>
                    <p className="text-center text-sm opacity-90 mt-2">{plano.alunos}</p>
                  </div>
                  
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {plano.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full mt-6 bg-[#1A247E] hover:bg-[#2D4DE0]">
                      Solicitar Proposta
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário de Contato */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Entre em Contato
              </h2>
              <p className="text-xl text-gray-600">
                Preencha o formulário abaixo e nossa equipe entrará em contato para criar uma proposta personalizada
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="nomeInstituicao"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Instituição *</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o nome da sua instituição" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tipoInstituicao"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Instituição *</FormLabel>
                            <FormControl>
                              <select className="w-full p-2 border rounded-md" {...field}>
                                <option value="escola">Escola</option>
                                <option value="universidade">Universidade</option>
                                <option value="empresa">Empresa</option>
                                <option value="ong">ONG</option>
                                <option value="governo">Órgão Governamental</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Corporativo *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@instituicao.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone *</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="numeroAlunos"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Alunos/Funcionários *</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o número aproximado" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="text-center">
                      <Button type="submit" size="lg" className="bg-[#1A247E] hover:bg-[#2D4DE0] px-8 py-4">
                        Solicitar Proposta Personalizada
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Final */}
        <section className="fintech-gradient py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Tem dúvidas? Entre em contato diretamente
            </h2>
            <div className="flex justify-center gap-8 text-white">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>corporativo@fintech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>(11) 3000-0000</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AssinaturasCorporativas;
