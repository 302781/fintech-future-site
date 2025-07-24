import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const useAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      // Simulação de uma chamada de API para o AI (substitua pela sua lógica real)
      const response = await new Promise<string>((resolve) => {
        setTimeout(() => {
          // Lógica simples para uma resposta da IA
          if (text.toLowerCase().includes('olá') || text.toLowerCase().includes('oi')) {
            resolve('Olá! Como posso ajudar você com suas finanças hoje?');
          } else if (text.toLowerCase().includes('investimento')) {
            resolve('Investimentos podem ser uma ótima forma de fazer seu dinheiro crescer. Você gostaria de saber mais sobre renda fixa, renda variável ou criptomoedas?');
          } else if (text.toLowerCase().includes('obrigado') || text.toLowerCase().includes('valeu')) {
            resolve('De nada! Se precisar de mais alguma coisa, estou aqui para ajudar.');
          } else {
            resolve('Desculpe, não entendi sua pergunta. Poderia reformular? Sou especializado em educação financeira.');
          }
        }, 1500); // Simula um atraso de rede
      });

      const newAIMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, newAIMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem para a IA:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Desculpe, houve um erro ao processar sua solicitação. Tente novamente mais tarde.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, sendMessage, isLoading };
};