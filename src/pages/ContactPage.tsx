import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Certifique-se de que você tem este componente (shadcn/ui)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Ícones para contato
import { toast } from 'sonner'; // Para notificações de sucesso/erro

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage(null);
    setIsError(false);

    // Validação básica
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Por favor, preencha todos os campos do formulário.');
      setIsLoading(false);
      return;
    }

    // Validação de email simples
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Por favor, insira um endereço de e-mail válido.');
      setIsLoading(false);
      return;
    }

    try {
    
      const response = await fetch('/api/send-email', { // Substitua por sua rota de API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
        setResponseMessage('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
        setIsError(false);
        setFormData({ name: '', email: '', subject: '', message: '' }); // Limpa o formulário
      } else {
        const errorData = await response.json();
        const msg = errorData.message || 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.';
        toast.error(msg);
        setResponseMessage(msg);
        setIsError(true);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário de contato:', error);
      toast.error('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
      setResponseMessage('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navigation /> {/* Mantenha sua navegação */}

      <div className="w-full max-w-4xl mx-auto px-4 py-8">
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
                <span>mariavitoru349@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-[#1A247E] dark:text-blue-400" size={20} />
                <span>+55 (61) 98403-6278</span>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 text-[#1A247E] dark:text-blue-400 mt-1" size={20} />
                <span>
                  Brasilia-DF<br />
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
                    className="mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
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
                    className="mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
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
                    className="mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
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
                    className="mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                </div>

                {responseMessage && (
                  <p className={`text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
                    {responseMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
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
    </div>
  );
};

export default ContactPage;