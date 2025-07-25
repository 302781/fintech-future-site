import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    const plano = searchParams.get('plano');
    if (plano === 'corporativo') {
      setPlanoSelecionado('Plano Corporativo');
    } else {
      navigate('/planos');
      toast.error('Nenhum plano selecionado. Por favor, escolha um plano.');
    }
  }, [searchParams, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.nomeResponsavel || !formData.emailContato || !formData.nomeInstituicao) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        'service_vf0ut1v',
        'template_f0husmm',
        {
          plano_selecionado: planoSelecionado,
          nome_responsavel: formData.nomeResponsavel,
          email_contato: formData.emailContato,
          telefone: formData.telefone,
          nome_instituicao: formData.nomeInstituicao,
          numero_aluno: formData.numeroAlunos || 'Não especificado',
          mensagem: formData.mensagem || 'Nenhuma mensagem adicional.',
        },
        'SQiKfeM0LI9dmCjCw' 
      );

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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">
                Solicitar Plano: {planoSelecionado || 'Carregando...'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                Preencha os dados abaixo e nossa equipe entrará em contato para finalizar a contratação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissionSuccess ? (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">Solicitação Recebida!</h3>
                  <p className="text-gray-700 mb-4">
                    Agradecemos seu interesse no plano **{planoSelecionado}**.
                    Sua solicitação foi enviada com sucesso e nossa equipe de suporte entrará em contato em breve para os próximos passos.
                  </p>
                  <p className="text-gray-500 text-sm">Você será redirecionado para a tela de login em alguns segundos...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                  <div>
                    <Label htmlFor="nomeInstituicao">Nome da Instituição/Rede <span className="text-red-500">*</span></Label>
                    <Input id="nomeInstituicao" value={formData.nomeInstituicao} onChange={handleChange} placeholder="Nome da sua escola ou rede" required />
                  </div>
                  
                  {planoSelecionado === 'Plano Corporativo' && (
                    <div>
                      <Label htmlFor="numeroAlunos">Número Aproximado de Alunos/Usuários</Label>
                      <Input id="numeroAlunos" type="number" value={formData.numeroAlunos} onChange={handleChange} placeholder="Ex: 1000" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="mensagem">Mensagem Adicional (Opcional)</Label>
                    <Textarea id="mensagem" value={formData.mensagem} onChange={handleChange} placeholder="Descreva suas necessidades ou tire dúvidas..." rows={4} />
                  </div>

                  <Button type="submit" className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContratarPlanoForm;