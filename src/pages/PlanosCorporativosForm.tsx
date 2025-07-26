import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const ContratarPlanoForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [planoSelecionado, setPlanoSelecionado] = useState('');
  const [formData, setFormData] = useState({
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
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    const plano = searchParams.get('plano');
    if (plano) {
      setPlanoSelecionado(plano);
    } else {
      navigate('/planos', { replace: true });
      toast.error('Nenhum plano selecionado. Por favor, escolha um plano para continuar.');
    }
  }, [searchParams, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    if (planoSelecionado === 'corporativo') {
      if (!formData.nomeResponsavel || !formData.emailContato || !formData.nomeInstituicao) {
        toast.error('Por favor, preencha os campos obrigatórios (marcados com *).');
        setIsSubmitting(false);
        return;
      }

      const templateParams = {
        plano_selecionado: 'Plano Corporativo',
        nome_responsavel: formData.nomeResponsavel,
        email_contato: formData.emailContato,
        telefone: formData.telefone,
        nome_instituicao: formData.nomeInstituicao,
        numero_aluno: formData.numeroAlunos ? String(formData.numeroAlunos) : 'Não especificado',
        mensagem: formData.mensagem || 'Nenhuma mensagem adicional.',
      };

      try {
        await emailjs.send('service_vf0ut1v', 'template_f0husmm', templateParams, 'SQiKfeM0LI9dmCjCw');
        setSubmissionSuccess(true);
        toast.success('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');
        
        setTimeout(() => {
          navigate(`/login`);
        }, 5000);

      } catch (error) {
        console.error('Erro ao enviar a solicitação:', error);
        toast.error('Houve um erro ao enviar sua solicitação. Tente novamente mais tarde.');
      } finally {
        setIsSubmitting(false);
      }
    } 
    // Lógica para planos de pagamento (Plano Básico e Premium)
    else if (planoSelecionado === 'basico' || planoSelecionado === 'premium') {
      const requiredFields = ['nomeResponsavel', 'cpf', 'planValue', 'paymentMethod'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast.error('Por favor, preencha todos os campos obrigatórios.');
        setIsSubmitting(false);
        return;
      }
      
      try {
  
        toast.success('Simulando pagamento...');

        // Exemplo de como você poderia redirecionar com os dados do recibo
        setTimeout(() => {
          navigate(`/recibo?plano=${planoSelecionado}&valor=${formData.planValue}&nome=${formData.nomeResponsavel}&data=${new Date().toISOString()}&id=TRANS_SIMULADO_123`);
        }, 2000);
      } catch (error) {
        console.error('Erro no pagamento:', error);
        toast.error('Não foi possível processar o pagamento. Tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Navigation />

      <div className="pt-20 py-16 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">
              Contratar Plano: {planoSelecionado || 'Carregando...'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Preencha os dados abaixo para continuar com a contratação.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submissionSuccess ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Solicitação Recebida!</h3>
                <p className="text-gray-700 mb-4">
                  Agradecemos seu interesse no plano **{planoSelecionado}**.
                  Sua solicitação foi enviada com sucesso e nossa equipe de suporte entrará em contato em breve.
                </p>
                <p className="text-gray-500 text-sm">Você será redirecionado em alguns segundos...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos Comuns */}
                <div>
                  <Label htmlFor="nomeResponsavel">Nome do Responsável <span className="text-red-500">*</span></Label>
                  <Input id="nomeResponsavel" value={formData.nomeResponsavel} onChange={handleChange} placeholder="Seu nome completo" required />
                </div>
                <div>
                  <Label htmlFor="emailContato">Email de Contato <span className="text-red-500">*</span></Label>
                  <Input id="emailContato" type="email" value={formData.emailContato} onChange={handleChange} placeholder="seu@email.com" required />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" value={formData.telefone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" />
                </div>

                {/* Campos do Plano Corporativo */}
                {planoSelecionado === 'corporativo' && (
                  <>
                    <div>
                      <Label htmlFor="nomeInstituicao">Nome da Instituição/Rede <span className="text-red-500">*</span></Label>
                      <Input id="nomeInstituicao" value={formData.nomeInstituicao} onChange={handleChange} placeholder="Nome da sua escola ou rede" required />
                    </div>
                    <div>
                      <Label htmlFor="numeroAlunos">Número Aproximado de Alunos/Usuários</Label>
                      <Input id="numeroAlunos" type="number" value={formData.numeroAlunos} onChange={handleChange} placeholder="Ex: 1000" />
                    </div>
                    <div>
                      <Label htmlFor="mensagem">Mensagem Adicional (Opcional)</Label>
                      <Textarea id="mensagem" value={formData.mensagem} onChange={handleChange} placeholder="Descreva suas necessidades ou tire dúvidas..." rows={4} />
                    </div>
                  </>
                )}

                {/* Campos de Pagamento para Planos Básico e Premium */}
                {(planoSelecionado === 'basico' || planoSelecionado === 'premium') && (
                  <>
                    <div>
                      <Label htmlFor="cpf">CPF do Responsável <span className="text-red-500">*</span></Label>
                      <Input id="cpf" value={formData.cpf} onChange={handleChange} placeholder="Ex: 987.654.321-00" required />
                    </div>
                    <div>
                      <Label htmlFor="planValue">Valor do Plano (R$)</Label>
                      <Input id="planValue" value={formData.planValue} onChange={handleChange} placeholder="Ex: 500,00" />
                    </div>
                    <div>
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
                  </>
                )}
                
                {submissionError && (
                  <p className="text-red-500 text-sm text-center font-medium">
                    {submissionError}
                  </p>
                )}

                <Button type="submit" className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContratarPlanoForm;