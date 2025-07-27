import React, { useState, useCallback, useMemo } from 'react';
import Navigation from '@/components/Navigation'; // Assumindo que este caminho está correto
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast'; // Usando useToast de shadcn/ui
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react'; // Ícone de carregamento

// --- Interfaces para Dados do Formulário ---
interface PaymentFormData {
  responsibleName: string;
  schoolName: string;
  schoolLocation: string; // Pode ser opcional, dependendo da necessidade
  cpf: string;
  planValue: string;
  planType: string;
  paymentMethod: string;
  paymentDate: string;
  transactionLocation: string; // Pode ser opcional
  additionalObservations: string; // Pode ser opcional
  includeSignature: boolean;
}

// --- Interfaces para Erros de Validação ---
interface FormErrors {
  [key: string]: string;
}

// --- Funções Auxiliares de Formatação ---

/**
 * Formata um CPF adicionando pontos e traço.
 * @param cpf String de CPF a ser formatada.
 * @returns CPF formatado.
 */
const formatarCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '') // Remove tudo que não é dígito
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
};

/**
 * Formata um valor numérico para o formato de moeda (Ex: 1.234,56).
 * @param valor String do valor a ser formatada.
 * @returns Valor formatado.
 */
const formatarValor = (valor: string): string => {
  return valor.replace(/\D/g, '') // Remove tudo que não é dígito
              .replace(/(\d)(\d{2})$/, '$1,$2') // Adiciona a vírgula para centavos
              .replace(/(?=(\d{3})+(\D))\B/g, '.'); // Adiciona pontos para milhares
};

/**
 * Componente PaymentForm
 * Este formulário é utilizado para processar pagamentos de planos corporativos.
 * Inclui validação de campos, formatação e feedback ao usuário.
 */
export default function PaymentForm() {
  const [formData, setFormData] = useState<PaymentFormData>({
    responsibleName: '',
    schoolName: '',
    schoolLocation: '',
    cpf: '',
    planValue: '',
    planType: '',
    paymentMethod: '',
    paymentDate: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
    transactionLocation: '',
    additionalObservations: '',
    includeSignature: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({}); // Estado para armazenar erros de validação
  const { toast } = useToast(); // Hook para exibir notificações

  /**
   * Valida os campos do formulário.
   * @param data Dados atuais do formulário.
   * @returns Um objeto contendo mensagens de erro para cada campo inválido.
   */
  const validateForm = useCallback((data: PaymentFormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.responsibleName) {
      newErrors.responsibleName = 'O nome do responsável é obrigatório.';
    }
    if (!data.schoolName) {
      newErrors.schoolName = 'O nome da escola é obrigatório.';
    }
    if (!data.cpf) {
      newErrors.cpf = 'O CPF é obrigatório.';
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.cpf)) {
      newErrors.cpf = 'CPF inválido. Use o formato XXX.XXX.XXX-XX.';
    }
    if (!data.planValue) {
      newErrors.planValue = 'O valor do plano é obrigatório.';
    } else if (!/^\d{1,3}(?:\.\d{3})*,\d{2}$/.test(data.planValue)) {
      newErrors.planValue = 'Valor inválido. Use o formato 0,00 ou 0.000,00.';
    }
    if (!data.planType) {
      newErrors.planType = 'O tipo do plano é obrigatório.';
    }
    if (!data.paymentMethod) {
      newErrors.paymentMethod = 'A forma de pagamento é obrigatória.';
    }

    return newErrors;
  }, []);

  /**
   * Lida com a mudança de valor em campos de texto e textarea.
   * Aplica formatação para CPF e Valor do Plano.
   * @param e Evento de mudança.
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === 'cpf') {
      formattedValue = formatarCPF(value).substring(0, 14); // Limita o tamanho do CPF formatado
    } else if (id === 'planValue') {
      formattedValue = formatarValor(value);
    }

    setFormData(prev => ({ ...prev, [id]: formattedValue }));
    setErrors(prev => ({ ...prev, [id]: '' })); // Limpa o erro ao digitar
  }, []);

  /**
   * Lida com a mudança de estado do checkbox.
   * @param checked Novo estado do checkbox.
   */
  const handleCheckboxChange = useCallback((checked: boolean) => {
    setFormData(prev => ({ ...prev, includeSignature: checked }));
    setErrors(prev => ({ ...prev, includeSignature: '' })); // Limpa o erro ao mudar
  }, []);

  /**
   * Lida com a mudança de valor em campos Select.
   * @param field Campo do formulário que está sendo alterado.
   * @param value Novo valor do campo.
   */
  const handleSelectChange = useCallback((field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' })); // Limpa o erro ao mudar
  }, []);

  /**
   * Lida com o envio do formulário.
   * Realiza validação e simula o processamento do pagamento.
   * @param e Evento de envio do formulário.
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Limpa erros anteriores

    const currentErrors = validateForm(formData);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      toast({
        title: 'Falha na validação',
        description: 'Por favor, corrija os campos destacados.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      // --- SIMULAÇÃO DE INTEGRAÇÃO DE PAGAMENTO ---
      // Em um projeto real, você faria uma chamada para o seu backend
      // que se integraria com um gateway de pagamento (ex: Stripe, PagSeguro).
      //
      // const response = await fetch('/api/process-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Erro desconhecido no pagamento.');
      // }
      //
      // const result = await response.json();
      // console.log('Pagamento processado:', result);

      // Simula um delay de rede para o processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Pagamento processado com sucesso!',
        description: 'Seu recibo será enviado por e-mail em breve.',
        variant: 'default', // Pode ser 'success' se você tiver uma variante para isso
      });
      // Limpa o formulário após o sucesso
      setFormData({
        responsibleName: '',
        schoolName: '',
        schoolLocation: '',
        cpf: '',
        planValue: '',
        planType: '',
        paymentMethod: '',
        paymentDate: new Date().toISOString().split('T')[0],
        transactionLocation: '',
        additionalObservations: '',
        includeSignature: false,
      });

    } catch (error: unknown) { // Usar 'unknown' para erros no catch
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado ao processar o pagamento.';
      console.error('Erro no processamento de pagamento:', error);
      toast({
        title: 'Erro no pagamento',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="max-w-2xl w-full">
          <Card className="shadow-lg border-t-4 border-[#1A247E]">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-gray-900">Formulário de Pagamento Corporativo</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Preencha os dados abaixo para processar o pagamento e gerar seu recibo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsibleName">Nome do Responsável <span className="text-red-500">*</span></Label>
                    <Input
                      id="responsibleName"
                      name="responsibleName"
                      placeholder="Ex: João da Silva"
                      value={formData.responsibleName}
                      onChange={handleInputChange}
                      required
                      className={errors.responsibleName ? 'border-red-500' : ''}
                      aria-invalid={errors.responsibleName ? 'true' : 'false'}
                      aria-describedby={errors.responsibleName ? 'responsibleName-error' : undefined}
                    />
                    {errors.responsibleName && <p id="responsibleName-error" className="text-red-500 text-sm mt-1">{errors.responsibleName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">Nome da Escola <span className="text-red-500">*</span></Label>
                    <Input
                      id="schoolName"
                      name="schoolName"
                      placeholder="Ex: Colégio Aprender Mais"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      required
                      className={errors.schoolName ? 'border-red-500' : ''}
                      aria-invalid={errors.schoolName ? 'true' : 'false'}
                      aria-describedby={errors.schoolName ? 'schoolName-error' : undefined}
                    />
                    {errors.schoolName && <p id="schoolName-error" className="text-red-500 text-sm mt-1">{errors.schoolName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolLocation">Localização da Escola</Label>
                  <Input
                    id="schoolLocation"
                    name="schoolLocation"
                    placeholder="Ex: Rua das Flores, 123 - Centro, Brasília - DF"
                    value={formData.schoolLocation}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF do Responsável <span className="text-red-500">*</span></Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      placeholder="Ex: 987.654.321-00"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                      maxLength={14} // Limita o input para o CPF formatado
                      className={errors.cpf ? 'border-red-500' : ''}
                      aria-invalid={errors.cpf ? 'true' : 'false'}
                      aria-describedby={errors.cpf ? 'cpf-error' : undefined}
                    />
                    {errors.cpf && <p id="cpf-error" className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="planValue">Valor do Plano (R$) <span className="text-red-500">*</span></Label>
                    <Input
                      id="planValue"
                      name="planValue"
                      placeholder="Ex: 500,00 ou 1.250,00"
                      value={formData.planValue}
                      onChange={handleInputChange}
                      required
                      className={errors.planValue ? 'border-red-500' : ''}
                      aria-invalid={errors.planValue ? 'true' : 'false'}
                      aria-describedby={errors.planValue ? 'planValue-error' : undefined}
                    />
                    {errors.planValue && <p id="planValue-error" className="text-red-500 text-sm mt-1">{errors.planValue}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="planType">Tipo do Plano <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.planType}
                      onValueChange={(value) => handleSelectChange('planType', value)}
                      required
                    >
                      <SelectTrigger className={errors.planType ? 'border-red-500' : ''} aria-invalid={errors.planType ? 'true' : 'false'} aria-describedby={errors.planType ? 'planType-error' : undefined}>
                        <SelectValue placeholder="Selecione o plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="escola-basica">Escola Básica</SelectItem>
                        <SelectItem value="escola-premium">Escola Premium</SelectItem>
                        <SelectItem value="rede-de-ensino">Rede de Ensino</SelectItem> {/* Adicionei como opção, se aplicável */}
                        <SelectItem value="sob-consulta">Sob Consulta</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.planType && <p id="planType-error" className="text-red-500 text-sm mt-1">{errors.planType}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Forma de Pagamento <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                      required
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentDate">Data do Pagamento</Label>
                    <Input
                      id="paymentDate"
                      name="paymentDate"
                      type="date"
                      value={formData.paymentDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transactionLocation">Local da Transação</Label>
                    <Input
                      id="transactionLocation"
                      name="transactionLocation"
                      placeholder="Ex: Brasília - DF"
                      value={formData.transactionLocation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalObservations">Observações Adicionais</Label>
                  <Textarea
                    id="additionalObservations"
                    name="additionalObservations"
                    placeholder="Ex: Pagamento efetuado à vista, necessidade de NF etc."
                    value={formData.additionalObservations}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeSignature"
                    checked={formData.includeSignature}
                    onCheckedChange={handleCheckboxChange}
                    className={`rounded border-input ${errors.includeSignature ? 'border-red-500' : ''}`}
                    aria-invalid={errors.includeSignature ? 'true' : 'false'}
                    aria-describedby={errors.includeSignature ? 'signature-error' : undefined}
                  />
                  <Label htmlFor="includeSignature">
                    Incluir assinatura digital no recibo
                  </Label>
                  {errors.includeSignature && <p id="signature-error" className="text-red-500 text-sm mt-1">{errors.includeSignature}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-white py-2 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    'Processar Pagamento'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
