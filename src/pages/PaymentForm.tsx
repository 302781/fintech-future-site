import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox'; 

interface PaymentFormData {
  responsibleName: string;
  schoolName: string;
  schoolLocation: string;
  cpf: string;
  planValue: string;
  planType: string;
  paymentMethod: string;
  paymentDate: string;
  transactionLocation: string;
  additionalObservations: string;
  includeSignature: boolean;
}

const formatarCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatarValor = (valor: string): string => {
  return valor.replace(/\D/g, '')
              .replace(/(\d)(\d{2})$/, '$1,$2')
              .replace(/(?=(\d{3})+(\D))\B/g, '.');
};

export default function PaymentForm() {
  const [formData, setFormData] = useState<PaymentFormData>({
    responsibleName: '',
    schoolName: '',
    schoolLocation: '',
    cpf: '',
    planValue: '',
    planType: '',
    paymentMethod: '',
    paymentDate: new Date().toISOString().split('T')[0], // Melhor formatação de data
    transactionLocation: '',
    additionalObservations: '',
    includeSignature: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    let valor = value;
    if (id === 'cpf') {
      valor = formatarCPF(value).substring(0, 14); // Limita o tamanho do CPF formatado
    }
    if (id === 'planValue') {
      valor = formatarValor(value);
    }
    setFormData(prev => ({ ...prev, [id]: valor }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, includeSignature: checked }));
  };

  const handleSelectChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const requiredFields: Array<keyof PaymentFormData> = ['responsibleName', 'schoolName', 'cpf', 'planValue', 'planType', 'paymentMethod'];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        toast({
          title: 'Campos obrigatórios',
          description: 'Por favor, preencha todos os campos obrigatórios.',
          variant: 'destructive',
        });
        return;
      }

      // TODO: Integrate with Stripe when configured
      toast({
        title: 'Configuração necessária',
        description: 'Para processar pagamentos, é necessário configurar o Stripe primeiro.',
        variant: 'destructive',
      });
      return;

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Erro no pagamento',
        description: 'Não foi possível processar o pagamento. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Formulário de Pagamento</CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para processar o pagamento e gerar seu recibo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="responsibleName">Nome do Responsável <span className="text-red-500">*</span></Label>
                <Input
                  id="responsibleName"
                  placeholder="Ex: João da Silva"
                  value={formData.responsibleName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schoolName">Nome da Escola <span className="text-red-500">*</span></Label>
                <Input
                  id="schoolName"
                  placeholder="Ex: Maria Vitória Lopes"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolLocation">Localização da Escola</Label>
              <Input
                id="schoolLocation"
                placeholder="Ex: quadra 2 Cj 6 lote 12"
                value={formData.schoolLocation}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF do Responsável <span className="text-red-500">*</span></Label>
                <Input
                  id="cpf"
                  placeholder="Ex: 987.654.321-00"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planValue">Valor do Plano (R$) <span className="text-red-500">*</span></Label>
                <Input
                  id="planValue"
                  placeholder="Ex: 500,00"
                  value={formData.planValue}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planType">Tipo do Plano <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.planType}
                  onValueChange={(value) => handleSelectChange('planType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="escola-basica">Escola Básica</SelectItem>
                    <SelectItem value="escola-premium">Escola Premium</SelectItem>
                    <SelectItem value="sob-consulta">Sob Consulta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Forma de Pagamento <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a forma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cartao">Cartão</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Data do Pagamento</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionLocation">Local da Transação</Label>
                <Input
                  id="transactionLocation"
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
                placeholder="Ex: Pagamento efetuado à vista"
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
                className="rounded border-input"
              />
              <Label htmlFor="includeSignature">
                Incluir assinatura digital
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Processar Pagamento'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}