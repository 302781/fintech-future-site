import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'; 
import { Card, CardContent } from '@/components/ui/card';
import {
  Play, Pause, Volume2, VolumeX, Fullscreen, Maximize, Loader2,
} from 'lucide-react'; 


// --- Interfaces para Tipagem ---
interface VideoPlayerProps {
  src: string; // URL do vídeo a ser reproduzido
  title?: string; // Título opcional para exibição
  poster?: string; // URL da imagem de capa do vídeo (thumbnail)
  autoPlay?: boolean; // Se o vídeo deve começar a tocar automaticamente
  loop?: boolean; // Se o vídeo deve repetir
  controls?: boolean; // Se os controles nativos do HTML5 devem ser exibidos (além dos customizados)
  className?: string; // Classes CSS adicionais para o container do player
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  autoPlay = false,
  loop = false,     
  controls = false, 
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); 
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Erro ao tentar reproduzir o vídeo:", error);
          // Pode adicionar feedback ao usuário aqui, ex: toast
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Atualiza o tempo atual do vídeo
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  // Define a duração total do vídeo quando metadados são carregados
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false); // Vídeo carregado
    }
  }, []);

  // Lida com a busca na barra de progresso
  const handleSeek = useCallback((value: number[]) => {
    if (videoRef.current) {
      const newTime = value[0];
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  // Lida com a mudança de volume
  const handleVolumeChange = useCallback((value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  }, []);

  // Alterna o mute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (videoRef.current.muted) {
        setVolume(0); // Garante que o slider mostre 0
      } else {
        setVolume(1); // Ou o último volume antes de mutar
      }
    }
  }, []);

  // Alterna fullscreen
  const toggleFullScreen = useCallback(() => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen().catch(err => {
          console.error(`Erro ao tentar entrar em fullscreen: ${err.message}`);
        });
      }
    }
  }, []);

  // Formata o tempo para exibição (HH:MM:SS)
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const pad = (num: number) => num.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  // --- Efeitos ---

  // Configura event listeners no carregamento do componente
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.addEventListener('ended', () => setIsPlaying(false)); // Quando o vídeo termina
      videoElement.addEventListener('waiting', () => setIsLoading(true)); // Quando está carregando/buffering
      videoElement.addEventListener('playing', () => setIsLoading(false)); // Quando começa a tocar
      videoElement.addEventListener('canplay', () => setIsLoading(false)); // Quando pode começar a tocar

      // Inicializa o estado do player com base no autoPlay
      if (autoPlay) {
        videoElement.play().catch(error => console.error("AutoPlay falhou:", error));
      }

      return () => {
        // Limpa os event listeners ao desmontar o componente
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.removeEventListener('ended', () => setIsPlaying(false));
        videoElement.removeEventListener('waiting', () => setIsLoading(true));
        videoElement.removeEventListener('playing', () => setIsLoading(false));
        videoElement.removeEventListener('canplay', () => setIsLoading(false));
      };
    }
  }, [handleTimeUpdate, handleLoadedMetadata, autoPlay]);

  // Garante que o volume do slider e do vídeo estejam sincronizados ao iniciar
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);


  return (
    <Card className={`w-full max-w-4xl mx-auto shadow-xl overflow-hidden ${className}`}>
      <CardContent className="p-0 relative bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          controls={controls} // Para fallback ou para usar os controles nativos se customizados falharem
          className="w-full h-auto max-h-[60vh] object-contain" // Use object-contain para evitar cortes em algumas proporções
          aria-label={title}
        >
          Seu navegador não suporta o elemento de vídeo.
        </video>

        {/* Controles Customizados */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 flex flex-col gap-2">
          {/* Barra de Progresso */}
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-mono select-none">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleSeek}
              className="flex-grow [&>span:first-child]:bg-blue-500 [&>span:first-child]:shadow-none [&>span:first-child]:rounded-full [&>span:first-child]:h-2 [&>span:first-child>span]:bg-white" // Customiza o estilo do slider
            />
            <span className="text-white text-sm font-mono select-none">{formatTime(duration)}</span>
          </div>

          {/* Botões de Controle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={togglePlayPause} className="text-white hover:bg-gray-700/50">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>

              {/* Controle de Volume */}
              <div className="flex items-center gap-2 group">
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-gray-700/50">
                  {isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-24 [&>span:first-child]:bg-blue-500 [&>span:first-child]:shadow-none [&>span:first-child]:rounded-full [&>span:first-child]:h-2 [&>span:first-child>span]:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            </div>

            {/* Título do Vídeo (Opcional, movido para dentro dos controles para não cobrir o vídeo) */}
            {title && (
                <span className="text-white text-md font-semibold truncate max-w-[50%] mr-4">{title}</span>
            )}

            <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="text-white hover:bg-gray-700/50">
              {document.fullscreenElement ? <Maximize className="h-6 w-6" /> : <Fullscreen className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;