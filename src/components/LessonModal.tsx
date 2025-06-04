
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Play, X } from 'lucide-react';

interface Lesson {
  title: string;
  duration: string;
  description: string;
  videoUrl?: string;
  reference?: string;
}

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
}

const LessonModal = ({ lesson, isOpen, onClose }: LessonModalProps) => {
  if (!lesson) return null;

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      const videoId = url.includes('youtu.be/') 
        ? url.split('youtu.be/')[1].split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{lesson.title}</DialogTitle>
          <DialogDescription>{lesson.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Duração: {lesson.duration}</span>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4 mr-1" />
              Fechar
            </Button>
          </div>

          {lesson.videoUrl ? (
            <div className="space-y-4">
              <div className="aspect-video w-full">
                <iframe
                  src={getEmbedUrl(lesson.videoUrl)}
                  title={lesson.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleExternalLink(lesson.videoUrl!)}
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Assistir no YouTube
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center space-y-4">
              <Play className="w-16 h-16 text-gray-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Conteúdo da Aula</h3>
                <p className="text-gray-600 mt-2">{lesson.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Esta aula está baseada em conteúdo educativo de qualidade sobre educação financeira.
                </p>
              </div>
              {lesson.reference && (
                <Button 
                  onClick={() => handleExternalLink(lesson.reference)}
                  variant="outline"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Ver Fonte Original
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonModal;
