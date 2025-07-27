import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Filter, BookOpen, Gamepad2, Video, CheckCircle, Smile, Frown, DollarSign, PiggyBank, Lightbulb, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContextHook';
import { Link, Outlet } from 'react-router-dom';

// --- Interfaces para Tipagem do Conteúdo ---
interface ContentItem {
  id: string;
  type: 'game' | 'video' | 'activity'; // Tipos específicos
  title: string;
  description: string;
  theme: string;
  // 'completed' será gerenciado pelo estado local e não mais parte da definição inicial
}

// Mapeamento de nomes de string para componentes de ícone reais do Lucide-React
const LocalIconMap: { [key: string]: React.ElementType } = {
  Gamepad2: Gamepad2,
  Video: Video,
  BookOpen: BookOpen,
  DollarSign: DollarSign,
  PiggyBank: PiggyBank,
  Lightbulb: Lightbulb,
  TrendingUp: TrendingUp,
  CheckCircle: CheckCircle,
  Smile: Smile,
  Frown: Frown,
  Play: Play,
  Filter: Filter,
};

// --- Dados da Biblioteca de Conteúdo (consolidados aqui) ---
const contentLibraryData: ContentItem[] = [
  { id: 'game1', type: 'game', title: 'Jogo da Poupança', description: 'Aprenda a guardar dinheiro de forma divertida', theme: 'poupança' },
  { id: 'game2', type: 'game', title: 'Mercadinho Virtual', description: 'Faça compras conscientes no mercado virtual', theme: 'consumo' },
  { id: 'video1', type: 'video', title: 'O que é Dinheiro?', description: 'Vídeo explicativo sobre moedas e notas', theme: 'moeda' },
  { id: 'video2', type: 'video', title: 'Necessidade vs Desejo', description: 'Aprenda a diferença entre o que precisamos e queremos', theme: 'consumo' },
  { id: 'activity1', type: 'activity', title: 'Quiz: Cofre ou Gasto?', description: 'Atividade de múltipla escolha sobre onde gastar', theme: 'poupança' },
  { id: 'activity2', type: 'activity', title: 'Arrastar Moedas', description: 'Organize as moedas do menor para o maior valor', theme: 'moeda' }
];

// --- Subcomponente para exibir um item de conteúdo ---
interface ContentCardProps {
  item: ContentItem;
  isCompleted: boolean;
  onComplete: (id: string) => void;
  getTypeIcon: (type: string) => JSX.Element;
  getThemeIcon: (theme: string) => JSX.Element | null;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, isCompleted, onComplete, getTypeIcon, getThemeIcon }) => {
  return (
    <Card
      key={item.id}
      className={`cursor-pointer transition-all hover:shadow-md ${isCompleted ? 'ring-2 ring-green-200' : ''}`}
      onClick={() => onComplete(item.id)}
      aria-label={`Conteúdo: ${item.title}. Tipo: ${item.type}. Tema: ${item.theme}. Status: ${isCompleted ? 'Concluído' : 'Não concluído'}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getTypeIcon(item.type)}
            <Badge variant="secondary" className="text-xs">
              {item.theme}
            </Badge>
          </div>
          {isCompleted && <LocalIconMap.CheckCircle className="w-5 h-5 text-green-500" aria-label="Concluído" />}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <Button
          size="sm"
          className="w-full"
          variant={isCompleted ? 'outline' : 'default'}
          aria-label={isCompleted ? `Revisar ${item.title}` : `Iniciar ${item.title}`}
        >
          {isCompleted ? 'Revisar' : 'Iniciar'}
        </Button>
      </CardContent>
    </Card>
  );
};

const EscolaBasica = () => {
  const { user } = useAuth(); // Obtém o usuário do contexto de autenticação

  const [currentProgress, setCurrentProgress] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('todos');
  // Usar um Set para completedActivities para melhor performance em buscas e remoções
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set(['game1', 'video1']));

  // Memoiza a biblioteca de conteúdo para evitar recriações desnecessárias
  const contentLibrary: ContentItem[] = useMemo(() => contentLibraryData, []);

  // Recalcular o progresso total baseado nas atividades concluídas
  useEffect(() => {
    const totalActivities = contentLibrary.length;
    const completedCount = completedActivities.size; // Usar .size para Set
    if (totalActivities > 0) {
      setCurrentProgress(Math.min(Math.round((completedCount / totalActivities) * 100), 100));
    } else {
      setCurrentProgress(0);
    }
  }, [completedActivities, contentLibrary]);

  const userName = user?.user_metadata?.first_name || 'Estudante';

  // Funções de auxílio para ícones e nomes
  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'game': return <LocalIconMap.Gamepad2 className="w-4 h-4" />;
      case 'video': return <LocalIconMap.Video className="w-4 h-4" />;
      case 'activity': return <LocalIconMap.BookOpen className="w-4 h-4" />;
      default: return <LocalIconMap.BookOpen className="w-4 h-4" />;
    }
  }, []);

  const getThemeIcon = useCallback((theme: string) => {
    switch (theme) {
      case 'poupança': return <LocalIconMap.PiggyBank className="w-5 h-5 mr-1" />;
      case 'consumo': return <LocalIconMap.Lightbulb className="w-5 h-5 mr-1" />;
      case 'moeda': return <LocalIconMap.DollarSign className="w-5 h-5 mr-1" />;
      case 'investimento': return <LocalIconMap.TrendingUp className="w-5 h-5 mr-1" />;
      default: return null;
    }
  }, []);

  // Lógica de filtragem memoizada
  const filteredContent = useMemo(() => {
    return contentLibrary.filter(item => {
      if (selectedFilter === 'todos') return true;
      return item.type === selectedFilter || item.theme === selectedFilter;
    });
  }, [selectedFilter, contentLibrary]);

  // Função para marcar/desmarcar atividade como completa
  const handleActivityComplete = useCallback((activityId: string) => {
    setCompletedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId); // Se já está, desmarca (opcional, dependendo da UX)
      } else {
        newSet.add(activityId); // Se não está, marca
      }
      return newSet;
    });
  }, []);

  // Determina a mensagem da seção de feedback
  const feedbackMessage = useMemo(() => {
    if (currentProgress === 100) {
      return { emoji: '🎉', text: 'Parabéns!', subtext: 'Você concluiu todas as atividades!' };
    } else if (currentProgress >= 75) {
      return { emoji: '🌟', text: 'Excelente!', subtext: 'Quase lá! Continue o bom trabalho.' };
    } else if (currentProgress >= 50) {
      return { emoji: '👍', text: 'Muito bem!', subtext: 'Você está no caminho certo!' };
    } else {
      return { emoji: '📚', text: 'Vamos começar!', subtext: 'Sua jornada está apenas começando!' };
    }
  }, [currentProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="pt-20 px-4 max-w-6xl mx-auto">
        {/* Header do Estudante */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Olá, {userName}!</h1>
              <p className="text-gray-600">Plano Escola Básica</p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progresso do Módulo</span>
              <span className="text-sm text-gray-600" aria-live="polite">{currentProgress}%</span> {/* aria-live para acessibilidade */}
            </div>
            <Progress value={currentProgress} className="h-3 bg-gray-200" />
          </div>

          {/* Botão Principal */}
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg" aria-label={currentProgress > 0 && currentProgress < 100 ? 'Continuar onde parei' : currentProgress === 100 ? 'Revisar Conteúdo' : 'Iniciar primeira aula'}>
            <LocalIconMap.Play className="w-5 h-5 mr-2" />
            {currentProgress > 0 && currentProgress < 100 ? 'Continuar onde parei' : currentProgress === 100 ? 'Revisar Conteúdo' : 'Iniciar primeira aula'}
          </Button>
        </div>

        {/* Filtros e Conteúdo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LocalIconMap.Filter className="w-5 h-5" />
              Biblioteca de Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {/* Botões de Filtro */}
              <Button
                variant={selectedFilter === 'todos' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('todos')}
                aria-pressed={selectedFilter === 'todos'}
                aria-label="Mostrar todos os conteúdos"
              >
                Todos
              </Button>
              <Button
                variant={selectedFilter === 'game' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('game')}
                aria-pressed={selectedFilter === 'game'}
                aria-label="Filtrar por jogos"
              >
                <LocalIconMap.Gamepad2 className="w-4 h-4 mr-1" />
                Jogos
              </Button>
              {/* Botão para Simuladores agora é um Link para a rota aninhada */}
              <Link to="simuladores" aria-label="Ir para a página de simuladores">
                <Button
                  variant="outline" // Sempre outline se for apenas navegação
                  size="sm"
                >
                  <LocalIconMap.Gamepad2 className="w-4 h-4 mr-1" /> {/* Mantém o ícone de jogo/simulador */}
                  Simuladores
                </Button>
              </Link>
              <Button
                variant={selectedFilter === 'video' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('video')}
                aria-pressed={selectedFilter === 'video'}
                aria-label="Filtrar por vídeos"
              >
                <LocalIconMap.Video className="w-4 h-4 mr-1" />
                Vídeos
              </Button>
              <Button
                variant={selectedFilter === 'activity' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('activity')}
                aria-pressed={selectedFilter === 'activity'}
                aria-label="Filtrar por atividades"
              >
                <LocalIconMap.BookOpen className="w-4 h-4 mr-1" />
                Atividades
              </Button>
              <Button
                variant={selectedFilter === 'poupança' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('poupança')}
                aria-pressed={selectedFilter === 'poupança'}
                aria-label="Filtrar por tema: Poupança"
              >
                {getThemeIcon('poupança')}Poupança
              </Button>
              <Button
                variant={selectedFilter === 'consumo' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('consumo')}
                aria-pressed={selectedFilter === 'consumo'}
                aria-label="Filtrar por tema: Consumo"
              >
                {getThemeIcon('consumo')}Consumo
              </Button>
              <Button
                variant={selectedFilter === 'moeda' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('moeda')}
                aria-pressed={selectedFilter === 'moeda'}
                aria-label="Filtrar por tema: Moeda"
              >
                {getThemeIcon('moeda')}Moeda
              </Button>
            </div>

            {/* Grid de Conteúdo */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    isCompleted={completedActivities.has(item.id)}
                    onComplete={handleActivityComplete}
                    getTypeIcon={getTypeIcon}
                    getThemeIcon={getThemeIcon}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-600">
                  <p>Nenhum conteúdo encontrado para os filtros selecionados.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Simples */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Meu Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">{feedbackMessage.emoji}</div>
                <p className="font-semibold text-gray-900">{feedbackMessage.text}</p>
                <p className="text-sm text-gray-600">{feedbackMessage.subtext}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <LocalIconMap.Smile className="w-8 h-8 text-green-500" />
                  <span className="text-2xl font-bold text-green-600">{Math.round((completedActivities.size / contentLibrary.length) * 100) || 0}%</span> {/* % de acertos (concluídos) */}
                </div>
                <p className="text-sm text-gray-600">Concluídos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <LocalIconMap.Frown className="w-8 h-8 text-red-400" />
                  <span className="text-2xl font-bold text-red-500">{100 - (Math.round((completedActivities.size / contentLibrary.length) * 100) || 0)}%</span> {/* % de pendentes */}
                </div>
                <p className="text-sm text-gray-600">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Simuladores (Rota Aninhada) */}
        <div className="mt-8 pt-8 border-t-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Simuladores de Finanças</h2>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default EscolaBasica;
