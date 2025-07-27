import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, CreditCard, Calendar, Lock, User, Loader2, Info } from 'lucide-react'; // Adicionados ícones
import { useSearchParams } from 'react-router-dom'; // Para ler parâmetros da URL
import { toast } from 'sonner'; // Para notificações

// --- Interfaces de Dados do Plano ---
interface Feature {
  text: string;
  included: boolean; // Indica se o recurso está incluído (true para Check, false para X)
}

interface PlanDetails {
  id: string;
  title: string;
  description: string;
  price: string;
  priceUnit?: string;
  features: Feature[];
}

// --- Dados Mockados dos Planos (Consolidados aqui) ---
// Estes dados simulariam a busca de informações de um backend
const allAvailablePlans: PlanDetails[] = [
  {
    id: 'basico',
    title: 'Plano Básico',
    description: 'Ideal para quem está começando a organizar suas finanças pessoais, com acesso a conteúdos essenciais.',
    price: '0.00',
    priceUnit: '',
    features: [
      { text: 'Acesso a cursos introdutórios', included: true },
      { text: 'Ferramenta de orçamento pessoal', included: true },
      { text: 'Comunidade básica de usuários', included: true },
      { text: 'Suporte por e-mail', included: true },
      { text: 'Aulas interativas', included: false },
      { text: 'Suporte 24h', included: false },
      { text: 'Ferramentas avançadas', included: false },
    ],
  },
  {
    id: 'premium',
    title: 'Plano Premium',
    description: 'A solução completa para o seu desenvolvimento financeiro, com acesso a todos os cursos e ferramentas.',
    price: '49.90',
    priceUnit: '/mês',
    features: [
      { text: 'Todos os recursos do Plano Básico', included: true },
      { text: 'Aulas interativas e personalizadas', included: true },
      { text: 'Suporte prioritário 24/7', included: true },
      { text: 'Ferramentas avançadas de gestão e análise', included: true },
      { text: 'Comunidade exclusiva', included: true },
      { text: 'Consultoria financeira inicial', included: true },
      { text: 'Workshops mensais ao vivo', included: true },
    ],
  },
  {
    id: 'corporativo',
    title: 'Plano Corporativo (Sob Consulta)',
    description: 'Soluções personalizadas para grandes empresas e instituições de ensino.',
    price: 'Sob Consulta',
    features: [
      { text: 'Plataforma customizada', included: true },
      { text: 'Workshops e palestras exclusivas', included: true },
      { text: 'Relatórios de desempenho detalhados', included: true },
      { text: 'Suporte dedicado 24/7', included: true },
      { text: 'Integração com sistemas existentes (LMS, ERP)', included: true },
      { text: 'Gestor de conta dedicado', included: true },
    ],
  },
];

const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  // Efeito para buscar os detalhes do plano com base no parâmetro da URL
  useEffect(() => {
    const planId = searchParams.get('plano'); // Obtém o ID do plano da URL
    if (planId) {
      // Simula uma busca assíncrona dos detalhes do plano
      setTimeout(() => {
        const foundPlan = allAvailablePlans.find(p => p.id === planId);
        if (foundPlan) {
          setSelectedPlan(foundPlan);
          // Preenche o email se for um plano gratuito e tiver user no useAuth
          if (foundPlan.id === 'basico') {
            // Se você tiver useAuth aqui, poderia preencher com user.email
            // Ex: const { user } = useAuth(); setEmail(user?.email || '');
          }
        } else {
          toast.error("Plano não encontrado. Por favor, selecione um plano válido.");
        }
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
      toast.info("Nenhum plano selecionado. Por favor, volte e escolha um plano.");
    }
  }, [searchParams]);

  // Função para validar o formulário (simplificada para o exemplo)
  const validateForm = () => {
    if (selectedPlan?.id === 'basico' && selectedPlan.price === '0.00') {
      // Para o plano gratuito, apenas o email pode ser obrigatório (ou nenhum campo de pagamento)
      if (!email) {
        toast.error("Por favor, digite seu e-mail.");
        return false;
      }
      return true;
    }

    // Para planos pagos
    if (!email || !cardNumber || !expiryDate || !cvv || !cardHolderName) {
      toast.error("Por favor, preencha todos os campos do formulário de pagamento.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Formato de e-mail inválido.");
      return false;
    }
    // Adicionar validação de formato de cartão de crédito, data de validade, CVV etc.
    // Ex: Validar se o número do cartão tem 16 dígitos e é numérico
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      toast.error("Número do cartão inválido. Deve ter 16 dígitos.");
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        toast.error("Data de validade inválida. Use o formato MM/AA.");
        return false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
        toast.error("CVV inválido. Geralmente 3 ou 4 dígitos.");
        return false;
    }

    return true;
  };

  // Função para simular o processamento do pagamento
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsProcessingPayment(true);
    try {
      // Simula uma chamada de API para processar o pagamento
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos de delay
      
      if (selectedPlan?.id === 'corporativo') {
        toast.success("Sua solicitação de orçamento foi enviada com sucesso! Entraremos em contato em breve.");
        // Redirecionar para uma página de agradecimento ou home
        // window.location.href = '/agradecimento-corporativo';
      } else if (selectedPlan?.price === '0.00') {
        toast.success("Plano Básico ativado com sucesso! Bem-vindo!");
        // Redirecionar para o dashboard de cursos
        // window.location.href = '/cursos';
      } else {
        // Simular sucesso ou falha baseada em alguma lógica, se necessário
        const paymentSuccessful = Math.random() > 0.1; // 90% de chance de sucesso
        if (paymentSuccessful) {
          toast.success("Pagamento realizado com sucesso! Seu plano foi ativado.");
          // Redirecionar para o dashboard de cursos
          // window.location.href = '/cursos';
        } else {
          toast.error("Falha no pagamento. Por favor, verifique seus dados ou tente outro método.");
        }
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
      toast.error("Ocorreu um erro inesperado ao finalizar a compra. Tente novamente.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 mr-2 animate-spin text-[#1A247E]" />
        <p className="text-xl text-gray-700">Carregando detalhes do plano...</p>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600 p-4 text-center">
        <Info className="w-16 h-16 mb-4" />
        <p className="text-xl mb-4">Nenhum plano selecionado ou encontrado. Por favor, volte e escolha um plano.</p>
        <Button onClick={() => window.history.back()} className="bg-blue-500 hover:bg-blue-600 text-white">Voltar para Planos</Button>
      </div>
    );
  }

  const isFreePlan = selectedPlan.price === '0.00';
  const isCorporatePlan = selectedPlan.id === 'corporativo';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-20 py-16 flex justify-center items-center min-h-[calc(100vh-80px)]"> {/* Ajuste para altura total */}
        <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg p-6 md:p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">
                {isCorporatePlan ? 'Solicitar Orçamento' : 'Finalizar Compra'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {isCorporatePlan 
                  ? 'Preencha os dados para que possamos entrar em contato e discutir uma solução personalizada para sua instituição.'
                  : `Você está prestes a ${isFreePlan ? 'ativar' : 'comprar'} o ${selectedPlan.title}.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Resumo do Pedido */}
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Detalhes do Plano</h3>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.title}</h4>
                <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
                <div className="text-lg font-semibold text-gray-800 flex justify-between items-center border-t pt-3 mt-3">
                  <span>Preço:</span>
                  <span className="text-[#1A247E]">
                    {selectedPlan.price !== 'Sob Consulta' ? `R$ ${selectedPlan.price}` : 'Sob Consulta'}
                    {selectedPlan.priceUnit && selectedPlan.price !== '0.00' && selectedPlan.price !== 'Sob Consulta' ? selectedPlan.priceUnit : ''}
                  </span>
                </div>
                {!isCorporatePlan && (
                  <ul className="space-y-2 text-gray-700 mt-4">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="text-red-500">•</span> // Usar um ícone X se desejar
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Formulário de Pagamento/Contato */}
              <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" /> E-mail
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Seu endereço de e-mail"
                  />
                </div>

                {!isFreePlan && !isCorporatePlan && (
                  <>
                    <div>
                      <Label htmlFor="cardNumber" className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-4 h-4" /> Número do Cartão
                      </Label>
                      <Input 
                        id="cardNumber" 
                        type="text" 
                        placeholder="XXXX XXXX XXXX XXXX" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())} // Formata o número do cartão
                        maxLength={19} // 16 dígitos + 3 espaços
                        required
                        aria-label="Número do cartão de crédito"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4" /> Validade (MM/AA)
                        </Label>
                        <Input 
                          id="expiryDate" 
                          type="text" 
                          placeholder="MM/AA" 
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').replace(/^(\d{2})(\d{0,2})$/, '$1/$2').slice(0, 5))} // Formata validade
                          maxLength={5}
                          required
                          aria-label="Data de validade do cartão"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="flex items-center gap-2 mb-1">
                          <Lock className="w-4 h-4" /> CVV
                        </Label>
                        <Input 
                          id="cvv" 
                          type="text" 
                          placeholder="XXX" 
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))} // Apenas números
                          maxLength={4}
                          required
                          aria-label="Código de segurança do cartão (CVV)"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardHolderName" className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4" /> Nome no Cartão
                      </Label>
                      <Input 
                        id="cardHolderName" 
                        type="text" 
                        placeholder="Nome Completo" 
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        required
                        aria-label="Nome completo conforme no cartão"
                      />
                    </div>
                  </>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3"
                  disabled={isProcessingPayment}
                  aria-label={isProcessingPayment ? "Processando..." : (isCorporatePlan ? "Enviar Solicitação" : "Finalizar Compra")}
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    isCorporatePlan ? 'Enviar Solicitação' : `Finalizar Compra - R$ ${selectedPlan.price}`
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500 mt-4">
              {isCorporatePlan ? (
                <p>Ao clicar em "Enviar Solicitação", você concorda que nossa equipe entre em contato para discutir as necessidades da sua instituição.</p>
              ) : isFreePlan ? (
                <p>Ao ativar o Plano Básico, você concorda com nossos <a href="/termos" className="underline hover:text-[#1A247E]">Termos de Serviço</a> e <a href="/privacidade" className="underline hover:text-[#1A247E]">Política de Privacidade</a>.</p>
              ) : (
                <p>Ao finalizar a compra, você concorda com nossos <a href="/termos" className="underline hover:text-[#1A247E]">Termos de Serviço</a> e <a href="/privacidade" className="underline hover:text-[#1A247E]">Política de Privacidade</a>. Seu pagamento é seguro.</p>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
