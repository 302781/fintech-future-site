import React from 'react';
import { Card, CardContent } from '@/components/ui/card'; 
import styles from './GamePlayer.module.css';
interface GamePlayerProps {
  userName?: string; 
  className?: string; 
}

const GamePlayer: React.FC<GamePlayerProps> = ({ userName = 'Amigo(a)', className }) => {
  return (
    <div
      data-layer="Biblioteca" // Usado para identificação semântica ou testes
      className={`gameplayer-main-container ${className}`} // Usa classe CSS externa
    >
      <div
        data-layer="FinTech"
        className="absolute left-12 top-9 text-white text-6xl font-normal font-['Inter']"
      >
        FinTech
      </div>

      {/* Saudação ao Usuário */}
      <div
        data-layer="Olá, [Nome]!"
        className="absolute left-12 top-58 text-white text-7xl font-normal font-['Inter']" // Ajustei o tamanho da fonte para ser mais legível
      >
        Olá, {userName}!
      </div>

      {/* Mensagem de Continuidade */}
      <div
        data-layer="Continue sua jornada de educação financeira"
        className="absolute left-12 top-76 text-white text-4xl font-normal font-['Inter']" // Ajustei o tamanho da fonte
      >
        Continue sua jornada de educação financeira
      </div>

      {/* Seção Inferior Branca com Conteúdo do Jogo/Interface */}
      <div
        data-layer="Desktop - 1"
        className="gameplayer-bottom-section" // Usa classe CSS externa
      >
        <Card className="absolute left-1/2 -translate-x-1/2 top-10 w-[320px] h-[358px] border-2 border-black">
          <CardContent className="p-0">
            <img
              data-layer="Rectangle"
              className="w-full h-full object-cover" // Ajusta a imagem para cobrir o card
              src="/placeholder-image.png" // Use um caminho de imagem estático ou importe-a
              alt="Placeholder para o conteúdo do jogo/curso"
            />
          </CardContent>
        </Card>

        {/* Exemplo de Texto ou Botão na Seção Branca */}
        <div className="absolute top-[400px] left-1/2 -translate-x-1/2 text-center text-gray-800 text-2xl font-semibold">
          Clique aqui para começar o desafio!
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;