import React, { useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Certifique-se de que você tem este componente (shadcn/ui)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'; // Ícones para contato
import { toast } from 'sonner'; // Para notificações de sucesso/erro

// --- Interface para os dados do formulário ---
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  // Não precisamos de responseMessage e isError no estado se usarmos toast
  // const [responseMessage, setResponseMessage] = useState<string | null>(null);
  // const [isError, setIsError] = useState(false);

  // Estado para rastrear erros de validação de campo individualmente (para feedback visual)
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  // Função para lidar com a mudança nos inputs
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpa o erro para o campo atual assim que o usuário começa a digitar
    if (errors[name as keyof ContactFormData]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  }, [errors]);

  // Função de validação cliente-side mais robusta
  const validateForm = useCallback(() => {
    const newErrors: Partial<ContactFormData> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'O e-mail é obrigatório.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um endereço de e-mail válido.';
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'O assunto é obrigatório.';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'A mensagem é obrigatória.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  // Função para lidar com o envio do formulário
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }

    setIsLoading(true);
    // setResponseMessage(null); // Não necessário com toast
    // setIsError(false); // Não necessário com toast

    try {
      // Simulação de chamada de API
      // Em um projeto real, você faria uma chamada real para sua API de envio de e-mail:
      // const response = await fetch('/api/send-email', { 
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // Simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simular uma resposta de sucesso/erro
      const mockSuccess = Math.random() > 0.2; // 80% de chance de sucesso

      if (mockSuccess) { // response.ok em uma chamada real
        toast.success('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Limpa o formulário
        setErrors({}); // Limpa quaisquer erros restantes
      } else {
        // Simular diferentes mensagens de erro do backend
        const msg = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.';
        // const msg = 'O servidor de e-mail não respondeu. Tente novamente mais tarde.';
        toast.error(msg);
        // setResponseMessage(msg); // Não necessário com toast
        // setIsError(true); // Não necessário com toast
      }
    } catch (error: unknown) { // Use unknown para erros no catch
      console.error('Erro ao enviar formulário de contato:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
      toast.error(errorMessage);
      // setResponseMessage(errorMessage); // Não necessário com toast
      // setIsError(true); // Não necessário com toast
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]); // Dependências para useCallback

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navigation /> {/* Mantenha sua navegação */}

      <main className="w-full max-w-4xl mx-auto px-4 py-8"> {/* Usado <main> para semântica */}
        <h1 className="text-4xl font-bold text-center mb-6 text-[#1A247E] dark:text-blue-400">Entre em Contato</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-10">
          Tire suas dúvidas, faça sugestões ou solicite mais informações.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Seção de Informações de Contato */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-[#1A247E] dark:text-blue-400">
                <Mail className="mr-2" /> Informações
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Estamos aqui para ajudar!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <Mail className="mr-3 text-[#1A247E] dark:text-blue-400" size={20} />
                <a href="mailto:mariavitoru349@gmail.com" className="hover:underline">mariavitoru349@gmail.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-[#1A247E] dark:text-blue-400" size={20} />
                <a href="tel:+5561984036278" className="hover:underline">+55 (61) 98403-6278</a>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 text-[#1A247E] dark:text-blue-400 mt-1" size={20} />
                <span>
                  Brasilia-DF, Brasil
                </span>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Horário de Atendimento:</h3>
                <p>Suporte 24h</p>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Formulário de Contato */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1A247E] dark:text-blue-400">Envie uma Mensagem</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Preencha o formulário abaixo e entraremos em contato.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="dark:text-gray-200">Seu Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && <p id="name-error" className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="dark:text-gray-200">Seu Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${errors.email ? 'border-red-500 dark:border-red-400' : ''}`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="subject" className="dark:text-gray-200">Assunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Assunto da sua mensagem"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${errors.subject ? 'border-red-500 dark:border-red-400' : ''}`}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && <p id="subject-error" className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <Label htmlFor="message" className="dark:text-gray-200">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Escreva sua mensagem aqui..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className={`mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${errors.message ? 'border-red-500 dark:border-red-400' : ''}`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && <p id="message-error" className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.message}</p>}
                </div>

                {/* Mensagens de sucesso/erro agora são tratadas pelo 'sonner' toast */}
                {/* Removido: responseMessage e isError */}

                <Button
                  type="submit"
                  className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isLoading}
                  aria-label={isLoading ? "Enviando mensagem..." : "Enviar mensagem"}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Você pode adicionar um mapa aqui, se quiser */}
        {/*
        <div className="w-full max-w-4xl mx-auto mt-12 mb-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Nossa Localização</h2>
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            {/ * Placeholder para o mapa (ex: Google Maps iframe) * /}
            <p>Mapa aqui (ex: iframe do Google Maps)</p>
          </div>
        </div>
        */}

        {/* Rodapé (se você tiver um componente de rodapé separado, chame-o aqui) */}
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default ContactPage;
