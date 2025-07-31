// src/pages/SchoolRegistration.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
// Se você for usar o Loader2, descomente e instale:
// import { Loader2 } from 'lucide-react';

// --- Interfaces, Schemas, etc. ---
interface SchoolRegistrationFormData {
  nomeResponsavel: string;
  emailContato: string;
  telefone?: string;
  nomeInstituicao: string; // Obrigatório para planos escolares
  numeroAlunos?: string;
  mensagem?: string;
  planValue?: string; // Valor do plano (para Escola Básica/Premium)
}

interface FormErrors {
  [key: string]: string;
}

const EMAILJS_SERVICE_ID = 'service_vf0ut1v';
const EMAILJS_TEMPLATE_ID_CORPORATIVO = 'template_f0husmm'; // Usar o template corporativo
const EMAILJS_PUBLIC_KEY = 'SQiKfeM0LI9dmCjCw';

interface PlanDetails {
  label: string;
  description: string;
  price?: string;
  requiredFields: Array<keyof SchoolRegistrationFormData>;
}

const availablePlans: { [key: string]: PlanDetails } = {
  'escola-basica': {
    label: 'Plano Escola Básica',
    description: 'Preencha os dados da sua instituição para solicitar o Plano Escola Básica por R$ 299/mês.',
    price: '299,00',
    requiredFields: ['nomeResponsavel', 'emailContato', 'nomeInstituicao'],
  },
  'escola-premium': {
    label: 'Plano Escola Premium',
    description: 'Preencha os dados da sua instituição para solicitar o Plano Escola Premium por R$ 599/mês.',
    price: '599,00',
    requiredFields: ['nomeResponsavel', 'emailContato', 'nomeInstituicao'],
  },
  'consulta': { // 'consulta' ou 'plano-sob-consulta' do Plans.tsx
    label: 'Plano Sob Consulta',
    description: 'Preencha os dados da sua instituição para solicitar uma cotação personalizada.',
    price: 'A combinar',
    requiredFields: ['nomeResponsavel', 'emailContato', 'nomeInstituicao'],
  },
  // Você pode adicionar outros planos corporativos aqui, se houver
  // 'rede-de-ensino': { ... },
  // 'solucoes-corporativas': { ... },
};

const SchoolRegistration: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [planoSelecionadoKey, setPlanoSelecionadoKey] = useState<string>(''); // Mudado para refletir a chave

  const [formData, setFormData] = useState<SchoolRegistrationFormData>({
    nomeResponsavel: '',
    emailContato: '',
    telefone: '',
    nomeInstituicao: '',
    numeroAlunos: '',
    mensagem: '',
    planValue: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const currentPlanDetails = useMemo(() => {
    return availablePlans[planoSelecionadoKey] || { label: 'Plano Desconhecido', description: 'Plano não encontrado.', requiredFields: [] };
  }, [planoSelecionadoKey]);

  useEffect(() => {
    const planoParam = searchParams.get('plano');
    if (planoParam) {
      const normalizedPlanoKey = planoParam.toLowerCase().replace(/\s/g, '-');
      const planDetails = availablePlans[normalizedPlanoKey];

      if (planDetails) {
        setPlanoSelecionadoKey(normalizedPlanoKey);
        // Preenche o valor do plano se for fixo
        if (planDetails.price && planDetails.price !== 'A combinar') {
          setFormData(prev => ({ ...prev, planValue: planDetails.price }));
        } else {
          setFormData(prev => ({ ...prev, planValue: 'A combinar' })); // Garante que esteja preenchido para "consulta"
        }
      } else {
        toast.error(`Plano "${planoParam}" não reconhecido. Redirecionando para a página de planos.`);
        navigate('/planos', { replace: true });
      }
    } else {
      navigate('/planos', { replace: true });
      toast.error('Nenhum plano selecionado. Por favor, escolha um plano para continuar.');
    }
  }, [searchParams, navigate]);

  const validateForm = useCallback((data: SchoolRegistrationFormData, requiredFields: Array<keyof SchoolRegistrationFormData>): FormErrors => {
    const newErrors: FormErrors = {};

    requiredFields.forEach(field => {
      if (!data[field]) {
        newErrors[field] = 'Este campo é obrigatório.';
      }
    });

    if (data.emailContato && !/\S+@\S+\.\S+/.test(data.emailContato)) {
      newErrors.emailContato = 'E-mail inválido.';
    }

    return newErrors;
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmissionSuccess(false);

    const planData = currentPlanDetails;
    const currentErrors = validateForm(formData, planData.requiredFields);

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      toast.error('Por favor, preencha todos os campos obrigatórios e corrija os erros.');
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        plano_selecionado: planData.label,
        nome_responsavel: formData.nomeResponsavel,
        email_contato: formData.emailContato,
        telefone: formData.telefone || 'Não informado',
        nome_instituicao: formData.nomeInstituicao || 'Não informado',
        numero_aluno: formData.numeroAlunos || 'Não especificado',
        mensagem: formData.mensagem || 'Nenhuma mensagem adicional.',
        valor_plano: planData.price && planData.price !== 'A combinar' ? `R$ ${planData.price}/mês` : 'Cotação necessária',
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_CORPORATIVO, templateParams, EMAILJS_PUBLIC_KEY);
      setSubmissionSuccess(true);
      toast.success('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');

      setTimeout(() => {
        navigate(`/login?redirect=/dashboard`); // Redireciona para o login ou dashboard
      }, 2000);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado ao processar sua solicitação.';
      console.error('Erro na submissão do formulário:', error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, planoSelecionadoKey, currentPlanDetails, navigate, validateForm]);

  if (!planoSelecionadoKey) {
    return null; // Não renderiza o formulário até que um plano seja selecionado via URL
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

                {/* Campos específicos para planos corporativos */}
                <div>
                  <Label htmlFor="nomeInstituicao">Nome da Instituição/Rede <span className="text-red-500">*</span></Label>
                  <Input
                    id="nomeInstituicao"
                    value={formData.nomeInstituicao}
                    onChange={handleChange}
                    placeholder="Nome da sua escola ou rede"
                    required={true}
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
                {currentPlanDetails.price && currentPlanDetails.price !== 'A combinar' ? (
                  <div>
                    <Label htmlFor="planValue">Valor do Plano (R$)</Label>
                    <Input
                      id="planValue"
                      value={`R$ ${formData.planValue || ''}/mês`}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="planValue">Valor do Plano (R$)</Label>
                     <Input
                      id="planValue"
                      value={formData.planValue}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                      aria-label="Valor do plano, preenchido automaticamente"
                    />
                     <p className="text-sm text-muted-foreground mt-1">Este plano requer uma cotação. O valor será definido após contato.</p>
                  </div>
                )}
                <div>
                  <Label htmlFor="mensagem">Mensagem Adicional (Opcional)</Label>
                  <Textarea id="mensagem" value={formData.mensagem} onChange={handleChange} placeholder="Descreva suas necessidades ou tire dúvidas..." rows={4} />
                </div>

                {errors.form && (
                  <p className="text-red-500 text-sm text-center font-medium">
                    {errors.form}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Enviando solicitação...' : 'Enviar Solicitação'}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SchoolRegistration;