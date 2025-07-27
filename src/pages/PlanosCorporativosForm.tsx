import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation'; // Assumindo que este caminho está correto
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner'; // Usando sonner para notificações
import emailjs from '@emailjs/browser'; // Para envio de e-mails

// --- Interfaces para Dados do Formulário ---
interface ContratarPlanoFormData {
  nomeResponsavel: string;
  emailContato: string;
  telefone?: string; // Telefone é opcional
  nomeInstituicao?: string; // Apenas para planos corporativos
  numeroAlunos?: string; // Apenas para planos corporativos, como string para input
  mensagem?: string; // Apenas para planos corporativos, opcional
  schoolLocation?: string; // Apenas para planos de pagamento, opcional
  cpf?: string; // Apenas para planos de pagamento
  planValue?: string; // Apenas para planos de pagamento
  paymentMethod?: string; // Apenas para planos de pagamento
  paymentDate?: string; // Apenas para planos de pagamento
  transactionLocation?: string; // Apenas para planos de pagamento, opcional
}

// --- Interfaces para Erros de Validação ---
interface FormErrors {
  [key: string]: string;
}

// --- Configuração do EmailJS ---
// Substitua estes valores pelos seus próprios Service ID, Template ID e Public Key do EmailJS
const EMAILJS_SERVICE_ID = 'service_vf0ut1v';
const EMAILJS_TEMPLATE_ID_CORPORATIVO = 'template_f0husmm';
const EMAILJS_PUBLIC_KEY = 'SQiKfeM0LI9dmCjCw';

// --- Dados dos Planos (Consolidados aqui) ---
interface PlanDetails {
  label: string;
  description: string;
  isCorporativo: boolean;
  requiredFields: Array<keyof ContratarPlanoFormData>;
}

const availablePlans: { [key: string]: PlanDetails } = {
  'escola-basica': {
    label: 'Escola Básica',
    description: 'Preencha os dados para ativar o plano Escola Básica.',
    isCorporativo: false,
    requiredFields: ['nomeResponsavel', 'emailContato', 'cpf', 'planValue', 'paymentMethod'],
  },
  'escola-premium': {
    label: 'Escola Premium',
    description: 'Preencha os dados para ativar o plano Escola Premium.',
    isCorporativo: false,
    requiredFields: ['nomeResponsavel', 'emailContato', 'cpf', 'planValue', 'paymentMethod'],
  },
  'rede-de-ensino': { // Adicionado como uma opção para o formulário de pagamento, se aplicável.
    label: 'Rede de Ensino',
    description: 'Preencha os dados para ativar o plano Rede de Ensino.',
    isCorporativo: false,
    requiredFields: ['nomeResponsavel', 'emailContato', 'cpf', 'planValue', 'paymentMethod'],
  },
  'corporativo': {
    label: 'Corporativo',
    description: 'Preencha os dados da sua instituição para solicitar uma cotação personalizada.',
    isCorporativo: true,
    requiredFields: ['nomeResponsavel', 'emailContato', 'nomeInstituicao'],
  },
  // 'solucoes-corporativas' para ser tratado como 'corporativo'
  'Soluções Corporativas': {
    label: 'Soluções Corporativas',
    description: 'Preencha os dados da sua instituição para solicitar uma cotação personalizada.',
    isCorporativo: true,
    requiredFields: ['nomeResponsavel', 'emailContato', 'nomeInstituicao'],
  },
};

/**
 * Formata um CPF adicionando pontos e traço.
 * @param cpf String de CPF a ser formatada.
 * @returns CPF formatado.
 */
const formatarCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

/**
 * Formata um valor numérico para o formato de moeda (Ex: 1.234,56).
 * @param valor String do valor a ser formatada.
 * @returns Valor formatado.
 */
const formatarValor = (valor: string): string => {
  return valor.replace(/\D/g, '')
              .replace(/(\d)(\d{2})$/, '$1,$2')
              .replace(/(?=(\d{3})+(\D))\B/g, '.');
};

/**
 * Componente ContratarPlanoForm
 * Este formulário permite aos usuários contratar planos ou solicitar cotações,
 * adaptando-se ao tipo de plano selecionado via URL.
 */
const ContratarPlanoForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [planoSelecionado, setPlanoSelecionado] = useState<string>('');
  const [formData, setFormData] = useState<ContratarPlanoFormData>({
    nomeResponsavel: '',
    emailContato: '',
    telefone: '',
    nomeInstituicao: '',
    numeroAlunos: '',
    mensagem: '',
    schoolLocation: '',
    cpf: '',
    planValue: '',
    paymentMethod: '',
    paymentDate: new Date().toISOString().split('T')[0],
    transactionLocation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({}); // Estado para erros de validação

  // Use useMemo para obter os detalhes do plano atual de forma eficiente
  const currentPlanDetails = useMemo(() => {
    const plano = planoSelecionado.toLowerCase().replace(/\s/g, '-'); // Normaliza para chave
    return availablePlans[plano] || { label: 'Plano Desconhecido', description: 'Plano não encontrado.', isCorporativo: false, requiredFields: [] };
  }, [planoSelecionado]);

  // Efeito para inicializar o plano selecionado da URL
  useEffect(() => {
    const planoParam = searchParams.get('plano');
    if (planoParam) {
      const normalizedPlano = planoParam.toLowerCase().replace(/\s/g, '-');
      if (availablePlans[normalizedPlano]) {
        setPlanoSelecionado(planoParam);
        // Se houver necessidade de preencher 'planType' no formData com o plano selecionado
        // setFormData(prev => ({ ...prev, planType: planoParam }));
      } else {
        toast.error(`Plano "${planoParam}" não reconhecido.`);
        navigate('/planos', { replace: true });
      }
    } else {
      navigate('/planos', { replace: true });
      toast.error('Nenhum plano selecionado. Por favor, escolha um plano para continuar.');
    }
  }, [searchParams, navigate]);

  /**
   * Valida os campos do formulário com base no tipo de plano.
   * @param data Os dados do formulário.
   * @returns Um objeto contendo mensagens de erro por campo.
   */
  const validateForm = useCallback((data: ContratarPlanoFormData, requiredFields: Array<keyof ContratarPlanoFormData>): FormErrors => {
    const newErrors: FormErrors = {};

    requiredFields.forEach(field => {
      if (!data[field]) {
        newErrors[field] = 'Este campo é obrigatório.';
      }
    });

    if (data.emailContato && !/\S+@\S+\.\S+/.test(data.emailContato)) {
      newErrors.emailContato = 'E-mail inválido.';
    }
    if (data.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.cpf)) {
      newErrors.cpf = 'CPF inválido. Use o formato XXX.XXX.XXX-XX.';
    }
    // Adicionar validação de valor se for um plano de pagamento e o campo estiver preenchido
    if (data.planValue && !/^\d{1,3}(?:\.\d{3})*,\d{2}$/.test(data.planValue)) {
      newErrors.planValue = 'Valor inválido. Use o formato 0,00 ou 0.000,00.';
    }

    return newErrors;
  }, []);

  /**
   * Lida com a mudança de valor em campos de input e textarea.
   * Aplica formatação para CPF e Valor do Plano.
   * @param e Evento de mudança.
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === 'cpf') {
      formattedValue = formatarCPF(value).substring(0, 14); // Limita o tamanho do CPF formatado
    } else if (id === 'planValue') {
      formattedValue = formatarValor(value);
    }

    setFormData((prev) => ({ ...prev, [id]: formattedValue }));
    setErrors((prev) => ({ ...prev, [id]: '' })); // Limpa o erro ao digitar
  }, []);

  /**
   * Lida com a mudança de valor em campos Select.
   * @param field Campo do formulário que está sendo alterado.
   * @param value Novo valor do campo.
   */
  const handleSelectChange = useCallback((field: keyof ContratarPlanoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // Limpa o erro ao mudar
  }, []);

  /**
   * Lida com o envio do formulário.
   * Dependendo do plano, envia um e-mail ou simula um pagamento.
   * @param e Evento de envio do formulário.
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); // Limpa erros anteriores
    setSubmissionSuccess(false);

    const planData = currentPlanDetails; // Use os detalhes do plano memoizados
    const currentErrors = validateForm(formData, planData.requiredFields);

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      toast.error('Por favor, preencha todos os campos obrigatórios e corrija os erros.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (planData.isCorporativo) {
        // Lógica de envio de e-mail para planos corporativos
        const templateParams = {
          plano_selecionado: planData.label,
          nome_responsavel: formData.nomeResponsavel,
          email_contato: formData.emailContato,
          telefone: formData.telefone || 'Não informado',
          nome_instituicao: formData.nomeInstituicao || 'Não informado',
          numero_aluno: formData.numeroAlunos || 'Não especificado',
          mensagem: formData.mensagem || 'Nenhuma mensagem adicional.',
        };

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_CORPORATIVO, templateParams, EMAILJS_PUBLIC_KEY);
        setSubmissionSuccess(true);
        toast.success('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');

        setTimeout(() => {
          navigate(`/login?redirect=/dashboard`); // Redireciona para login/dashboard
        }, 5000);

      } else {
        // Lógica de simulação de pagamento para planos individuais (basico, premium, rede-de-ensino)
        // Em um cenário real, aqui você integraria com um gateway de pagamento (ex: Stripe, PagSeguro)
        toast.success('Simulando pagamento...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula o processamento do pagamento

        setSubmissionSuccess(true);
        toast.success('Pagamento processado com sucesso! Você será redirecionado para o seu recibo.');

        // Redireciona para uma página de recibo com os dados do pedido
        navigate(`/recibo?plano=${planoSelecionado}&valor=${formData.planValue || ''}&nome=${formData.nomeResponsavel}&data=${new Date().toISOString()}&id=TRANS_SIMULADO_${Date.now()}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado ao processar sua solicitação.';
      console.error('Erro na submissão do formulário:', error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, planoSelecionado, currentPlanDetails, navigate, validateForm]); // Dependências do useCallback

  if (!planoSelecionado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Carregando plano...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Navigation />

      <main className="pt-20 py-16 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg border-t-4 border-[#1A247E]">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">
              Contratar Plano: {currentPlanDetails.label}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {currentPlanDetails.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submissionSuccess ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Solicitação Recebida!</h3>
                <p className="text-gray-700 mb-4">
                  Agradecemos seu interesse no plano **{currentPlanDetails.label}**.
                  Sua solicitação foi enviada com sucesso e nossa equipe de suporte entrará em contato em breve.
                </p>
                <p className="text-gray-500 text-sm">Você será redirecionado em alguns segundos...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos Comuns a todos os planos */}
                <div>
                  <Label htmlFor="nomeResponsavel">Nome do Responsável <span className="text-red-500">*</span></Label>
                  <Input
                    id="nomeResponsavel"
                    value={formData.nomeResponsavel}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    className={errors.nomeResponsavel ? 'border-red-500' : ''}
                    aria-invalid={errors.nomeResponsavel ? 'true' : 'false'}
                    aria-describedby={errors.nomeResponsavel ? 'nomeResponsavel-error' : undefined}
                  />
                  {errors.nomeResponsavel && <p id="nomeResponsavel-error" className="text-red-500 text-sm mt-1">{errors.nomeResponsavel}</p>}
                </div>
                <div>
                  <Label htmlFor="emailContato">Email de Contato <span className="text-red-500">*</span></Label>
                  <Input
                    id="emailContato"
                    type="email"
                    value={formData.emailContato}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className={errors.emailContato ? 'border-red-500' : ''}
                    aria-invalid={errors.emailContato ? 'true' : 'false'}
                    aria-describedby={errors.emailContato ? 'emailContato-error' : undefined}
                  />
                  {errors.emailContato && <p id="emailContato-error" className="text-red-500 text-sm mt-1">{errors.emailContato}</p>}
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone (Opcional)</Label>
                  <Input id="telefone" value={formData.telefone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" />
                </div>

                {/* Campos Específicos para Planos Corporativos */}
                {currentPlanDetails.isCorporativo && (
                  <>
                    <div>
                      <Label htmlFor="nomeInstituicao">Nome da Instituição/Rede <span className="text-red-500">*</span></Label>
                      <Input
                        id="nomeInstituicao"
                        value={formData.nomeInstituicao}
                        onChange={handleChange}
                        placeholder="Nome da sua escola ou rede"
                        required={currentPlanDetails.isCorporativo} // Obrigatório apenas para corporativo
                        className={errors.nomeInstituicao ? 'border-red-500' : ''}
                        aria-invalid={errors.nomeInstituicao ? 'true' : 'false'}
                        aria-describedby={errors.nomeInstituicao ? 'nomeInstituicao-error' : undefined}
                      />
                      {errors.nomeInstituicao && <p id="nomeInstituicao-error" className="text-red-500 text-sm mt-1">{errors.nomeInstituicao}</p>}
                    </div>
                    <div>
                      <Label htmlFor="numeroAlunos">Número Aproximado de Alunos/Usuários (Opcional)</Label>
                      <Input id="numeroAlunos" type="number" value={formData.numeroAlunos} onChange={handleChange} placeholder="Ex: 1000" />
                    </div>
                    <div>
                      <Label htmlFor="mensagem">Mensagem Adicional (Opcional)</Label>
                      <Textarea id="mensagem" value={formData.mensagem} onChange={handleChange} placeholder="Descreva suas necessidades ou tire dúvidas..." rows={4} />
                    </div>
                  </>
                )}

                {/* Campos de Pagamento para Planos Individuais (e 'Rede de Ensino' se for pago) */}
                {!currentPlanDetails.isCorporativo && (
                  <>
                    <div>
                      <Label htmlFor="cpf">CPF do Responsável <span className="text-red-500">*</span></Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        placeholder="Ex: 987.654.321-00"
                        required={!currentPlanDetails.isCorporativo}
                        maxLength={14}
                        className={errors.cpf ? 'border-red-500' : ''}
                        aria-invalid={errors.cpf ? 'true' : 'false'}
                        aria-describedby={errors.cpf ? 'cpf-error' : undefined}
                      />
                      {errors.cpf && <p id="cpf-error" className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                    </div>
                    <div>
                      <Label htmlFor="planValue">Valor do Plano (R$) <span className="text-red-500">*</span></Label>
                      <Input
                        id="planValue"
                        value={formData.planValue}
                        onChange={handleChange}
                        placeholder="Ex: 500,00 ou 1.250,00"
                        required={!currentPlanDetails.isCorporativo}
                        className={errors.planValue ? 'border-red-500' : ''}
                        aria-invalid={errors.planValue ? 'true' : 'false'}
                        aria-describedby={errors.planValue ? 'planValue-error' : undefined}
                      />
                      {errors.planValue && <p id="planValue-error" className="text-red-500 text-sm mt-1">{errors.planValue}</p>}
                    </div>
                    <div>
                      <Label htmlFor="paymentMethod">Forma de Pagamento <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                        required={!currentPlanDetails.isCorporativo}
                      >
                        <SelectTrigger className={errors.paymentMethod ? 'border-red-500' : ''} aria-invalid={errors.paymentMethod ? 'true' : 'false'} aria-describedby={errors.paymentMethod ? 'paymentMethod-error' : undefined}>
                          <SelectValue placeholder="Selecione a forma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cartao">Cartão de Crédito/Débito</SelectItem>
                          <SelectItem value="pix">PIX</SelectItem>
                          <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                          <SelectItem value="boleto">Boleto Bancário</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.paymentMethod && <p id="paymentMethod-error" className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
                    </div>
                    {/* Campos de data e localização da transação (opcionais, mas comuns em pagamentos) */}
                    <div>
                      <Label htmlFor="paymentDate">Data do Pagamento (Opcional)</Label>
                      <Input
                        id="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleChange}
                        type="date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="transactionLocation">Local da Transação (Opcional)</Label>
                      <Input
                        id="transactionLocation"
                        value={formData.transactionLocation}
                        onChange={handleChange}
                        placeholder="Ex: Brasília - DF"
                      />
                    </div>
                  </>
                )}

                {errors.form && ( // Erro geral do formulário, se houver
                  <p className="text-red-500 text-sm text-center font-medium">
                    {errors.form}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Enviando solicitação...' : (currentPlanDetails.isCorporativo ? 'Enviar Solicitação' : 'Prosseguir com Pagamento')}
                >
                  {isSubmitting ? 'Enviando...' : (currentPlanDetails.isCorporativo ? 'Enviar Solicitação' : 'Prosseguir com Pagamento')}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ContratarPlanoForm;
