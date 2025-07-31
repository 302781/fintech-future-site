// src/pages/Plans.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, MessageCircle } from 'lucide-react';

const Plans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planType: string) => {
    setSelectedPlan(planType);
    if (planType === 'consulta') {
      // WhatsApp redirect
      const message = encodeURIComponent('Olá! Tenho interesse em um plano personalizado para minha escola.');
      window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
    } else {
      // Navegar para o formulário de registro com o plano selecionado como search param
      navigate(`/school-registration?plano=${planType}`);
    }
  };

  const plans = [
    {
      id: 'escola-basica', // Renomeado para corresponder ao `availablePlans`
      title: 'Escola Básica',
      price: 'R$ 299/mês', // Preço adicionado para clareza
      color: 'bg-green-100 border-green-300',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      icon: '🟢',
      features: [
        'Acesso limitado aos módulos introdutórios',
        '1 perfil de educador',
        'Relatórios simples para pais',
        'Suporte por e-mail',
        'Até 10 alunos'
      ],
      description: 'Ideal para escolas que desejam experimentar nossa plataforma com até 10 alunos.'
    },
    {
      id: 'escola-premium', // Renomeado para corresponder ao `availablePlans`
      title: 'Escola Premium',
      price: 'R$ 599/mês',
      color: 'bg-yellow-100 border-yellow-300',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      icon: '🟡',
      features: [
        'Acesso completo para até 100 alunos',
        'Relatórios avançados e PDF mensal para pais',
        'Curso gamificado com progresso personalizado',
        'Suporte prioritário',
        'Dashboard completo'
      ],
      description: 'Perfeito para escolas que querem incluir educação financeira em larga escala.'
    },
    {
      id: 'consulta',
      title: 'Plano Sob Consulta',
      price: 'Consulte',
      color: 'bg-blue-100 border-blue-300',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      icon: '🔵',
      features: [
        'Projetos personalizados',
        'Número ilimitado de alunos',
        'Recursos customizados',
        'Suporte dedicado',
        'Integração personalizada'
      ],
      description: 'Projetos maiores ou personalizados? Fale com a gente!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🏫 Escolha o plano ideal para sua escola</h1>
          <p className="text-xl text-muted-foreground">
            Transforme a educação financeira dos seus alunos com nossa plataforma
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.color} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{plan.icon}</div>
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                <div className="text-3xl font-bold text-primary">{plan.price}</div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  {plan.id === 'consulta' ? (
                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full ${plan.buttonColor} text-white`}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Solicitar via WhatsApp
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full ${plan.buttonColor} text-white`}
                    >
                      Selecionar Plano
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Dúvidas? Entre em contato conosco pelo WhatsApp ou e-mail
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;