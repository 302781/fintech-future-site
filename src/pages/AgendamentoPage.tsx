import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar'; // Certifique-se de ter o componente Calendar
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // E Popover, se usar
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Função utilitária para classes condicionais

const AgendamentoPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!nome || !email || !date) {
      toast.error('Por favor, preencha seu nome, email e selecione uma data.');
      setIsSubmitting(false);
      return;
    }

    // Lógica para enviar o agendamento (ex: para um backend ou EmailJS)
    // Por enquanto, vamos simular o envio.
    console.log({
      nome,
      email,
      telefone,
      date: date ? format(date, 'dd/MM/yyyy') : 'N/A',
      mensagem,
    });

    try {
      // Simula um atraso no envio
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Agendamento enviado com sucesso! Em breve entraremos em contato para confirmar.');
      // Limpa o formulário
      setNome('');
      setEmail('');
      setTelefone('');
      setMensagem('');
      setDate(undefined);
    } catch (error) {
      toast.error('Houve um erro ao enviar seu agendamento. Tente novamente.');
      console.error('Erro de agendamento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Navigation />
      <main className="pt-20 py-16 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg border-t-4 border-[#1A247E]">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">
              Agende sua Consultoria
            </CardTitle>
            <CardDescription className="text-gray-600">
              Escolha a melhor data e horário para conversar com um de nossos especialistas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nome">Nome Completo <span className="text-red-500">*</span></Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email de Contato <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone (Opcional)</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>

              <div>
                <Label htmlFor="date">Data do Agendamento <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="mensagem">Mensagem (Opcional)</Label>
                <Textarea
                  id="mensagem"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Detalhes sobre o que você gostaria de discutir..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Agendando...' : 'Agendar Consultoria'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      {/* Assumindo que você tem um componente de Rodapé */}
      {/* <Footer /> */} 
    </div>
  );
};

export default AgendamentoPage;