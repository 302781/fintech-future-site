// src/pages/ConsultoresPage.tsx
import React, { useState } from 'react';
import Navigation from '@/components/Navigation'; // Certifique-se de que este caminho está correto
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react'; // Ícone para o botão de enviar

// Definindo o tipo para uma mensagem de chat
interface ChatMessage {
  id: number;
  sender: 'user' | 'consultant';
  text: string;
  timestamp: string;
}

const ConsultoresPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'consultant', text: 'Olá! Bem-vindo ao chat com nossos consultores financeiros. Como posso ajudar você hoje?', timestamp: '14:30' },
    { id: 2, sender: 'user', text: 'Oi! Tenho algumas dúvidas sobre investimentos.', timestamp: '14:31' },
    { id: 3, sender: 'consultant', text: 'Excelente! Pode me dizer qual tipo de investimento você tem em mente ou qual é o seu objetivo financeiro?', timestamp: '14:32' },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  // Função para "enviar" uma nova mensagem (simulada)
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      
      const userMessage: ChatMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage.trim(),
        timestamp: time,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');

      // Simula uma resposta do consultor após um pequeno atraso
      setTimeout(() => {
        const consultantResponse: ChatMessage = {
          id: messages.length + 2,
          sender: 'consultant',
          text: 'Entendi. Nossos consultores especializados podem te orientar melhor. Qual seria o melhor horário para agendarmos uma conversa mais aprofundada?',
          timestamp: time,
        };
        setMessages((prevMessages) => [...prevMessages, consultantResponse]);
      }, 1500); // Responde após 1.5 segundos
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation /> {/* Sua barra de navegação */}

      <div className="flex-grow flex items-center justify-center p-4 pt-20"> {/* pt-20 para não sobrepor a nav */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-2xl h-[70vh] flex flex-col">
          {/* Cabeçalho do Chat */}
          <div className="bg-[#1A247E] text-white p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Chat com Consultores</h2>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm">Online</span>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                    message.sender === 'user'
                      ? 'bg-[#2D4DE0] text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className={`block text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'} text-right`}>
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Área de Input de Mensagem */}
          <div className="p-4 bg-gray-100 border-t border-gray-200 flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-grow"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="bg-[#1A247E] hover:bg-[#2D4DE0]">
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultoresPage;