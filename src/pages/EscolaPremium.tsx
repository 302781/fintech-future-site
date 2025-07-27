import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Play, Trophy, Star, Crown, MessageCircle, Users, Target,
  Gamepad2, Video, BookOpen, Search, Calendar, Medal,
  Settings, Bell, Loader2 // Adicionado Loader2 para o estado de carregamento
} from 'lucide-react';
import axios from 'axios'; // Mantido axios para consistência com o código original
import { toast } from 'sonner'; // Para notificações de sucesso/erro

// --- Interfaces de Dados ---
interface Mission {
  id: number;
  title: string;
  progress: number;
  total: number;
  xp: number;
  completed: boolean;
}

interface StudentRank {
  position: number;
  name: string;
  xp: number;
  avatar: string; // Pode ser um emoji, URL de imagem, ou outro identificador
  isMe?: boolean; // Opcional, para marcar o usuário logado
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string; // Mantido como string para emojis, mas LucideIcon também seria uma opção
  unlocked: boolean;
}

interface PremiumContentItem {
  id: string;
  type: 'game' | 'video' | 'collaborative'; // Tipagem específica para os tipos de conteúdo
  title: string;
  description: string;
  completed: boolean;
  // Propriedades opcionais baseadas no tipo
  phases?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  duration?: string;
  quizzes?: number;
  participants?: number;
}

interface Notification {
  id: number;
  text: string;
  time: string;
  type: 'mission' | 'chat' | 'ranking' | string; // Tipagem para tipos de notificação
}

// --- Dados Iniciais Mockados (seriam carregados via API em produção) ---
const mockWeeklyMissions: Mission[] = [
  { id: 1, title: 'Complete 3 jogos', progress: 2, total: 3, xp: 50, completed: false },
  { id: 2, title: 'Assista 5 vídeos', progress: 5, total: 5, xp: 30, completed: true },
  { id: 3, title: 'Faça 10 atividades', progress: 7, total: 10, xp: 100, completed: false }
];

const mockClassRanking: StudentRank[] = [
  { position: 1, name: 'Ana Silva', xp: 2100, avatar: '👩‍🎓' },
  { position: 2, name: 'Pedro Costa', xp: 1800, avatar: '👨‍🎓' },
  { position: 3, name: 'Maria Santos', xp: 1250, avatar: '👩‍🎓', isMe: true }, // Assumindo que este é o usuário logado
  { position: 4, name: 'João Oliveira', xp: 1100, avatar: '👨‍🎓' },
  { position: 5, name: 'Sofia Lima', xp: 950, avatar: '👩‍🎓' }
];

const mockAchievements: Achievement[] = [
  { id: 1, title: 'Economista Júnior', description: 'Complete 10 atividades de poupança', icon: '💰', unlocked: true },
  { id: 2, title: 'Investidor Iniciante', description: 'Termine todos os jogos de investimento', icon: '📈', unlocked: true },
  { id: 3, title: 'Consumidor Consciente', description: 'Acerte 90% das questões sobre consumo', icon: '🛒', unlocked: false },
  { id: 4, title: 'Mestre das Finanças', description: 'Alcance o nível 10', icon: '👑', unlocked: false }
];

const mockPremiumContent: PremiumContentItem[] = [
  {
    id: 'game-multi1',
    type: 'game',
    title: 'Simulador de Investimentos',
    description: 'Jogo com múltiplas fases sobre aplicações financeiras',
    phases: 5,
    difficulty: 'medium',
    completed: false
  },
  {
    id: 'video-quiz1',
    type: 'video',
    title: 'Planejamento Financeiro + Quiz',
    description: 'Vídeo interativo com perguntas durante a exibição',
    duration: '12min',
    quizzes: 3,
    completed: true
  },
  {
    id: 'collab1',
    type: 'collaborative',
    title: 'Projeto: Orçamento Familiar',
    description: 'Desafio colaborativo para criar um orçamento em grupo',
    participants: 4,
    completed: false
  }
];

const mockNotifications: Notification[] = [
  { id: 1, text: 'Nova missão semanal disponível!', time: '2h', type: 'mission' },
  { id: 2, text: 'Professor João respondeu sua pergunta', time: '1d', type: 'chat' },
  { id: 3, text: 'Você subiu para 3º lugar no ranking!', time: '2d', type: 'ranking' }
];

// --- Subcomponentes ---

interface MissionCardProps {
  mission: Mission;
}
const MissionCard: React.FC<MissionCardProps> = ({ mission }) => (
  <div key={mission.id} className={`p-4 rounded-lg border ${mission.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-semibold">{mission.title}</h4>
      <Badge variant={mission.completed ? 'default' : 'secondary'} className="bg-purple-500 hover:bg-purple-600">
        +{mission.xp} XP
      </Badge>
    </div>
    <div className="flex items-center gap-2">
      <Progress value={(mission.progress / mission.total) * 100} className="flex-1 h-2" />
      <span className="text-sm text-gray-600">{mission.progress}/{mission.total}</span>
    </div>
  </div>
);

interface PremiumContentCardProps {
  item: PremiumContentItem;
}
const PremiumContentCard: React.FC<PremiumContentCardProps> = ({ item }) => {
  const getIconForType = (type: PremiumContentItem['type']) => {
    switch (type) {
      case 'game': return <Gamepad2 className="w-5 h-5 text-purple-500" />;
      case 'video': return <Video className="w-5 h-5 text-red-500" />;
      case 'collaborative': return <Users className="w-5 h-5 text-blue-500" />;
      default: return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {getIconForType(item.type)}
          <Badge variant="outline" className="text-xs">Premium</Badge>
        </div>
        <h4 className="font-semibold mb-2">{item.title}</h4>
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

        {/* Renderização condicional de detalhes com base no tipo */}
        {item.type === 'game' && item.phases && item.difficulty && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>{item.phases} fases</span>
            <span>•</span>
            <span>Dificuldade: {item.difficulty === 'medium' ? 'Média' : 'Fácil'}</span>
          </div>
        )}
        {item.type === 'video' && item.duration && item.quizzes && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>{item.duration}</span>
            <span>•</span>
            <span>{item.quizzes} quizzes</span>
          </div>
        )}
        {item.type === 'collaborative' && item.participants && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>{item.participants} participantes</span>
          </div>
        )}

        <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white" variant={item.completed ? 'outline' : 'default'}>
          {item.completed ? 'Revisar' : 'Iniciar'}
        </Button>
      </CardContent>
    </Card>
  );
};

interface StudentRankCardProps {
  student: StudentRank;
}
const StudentRankCard: React.FC<StudentRankCardProps> = ({ student }) => (
  <div key={student.position} className={`flex items-center gap-3 p-2 rounded-lg ${student.isMe ? 'bg-purple-50 border border-purple-200' : ''}`}>
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold">
      {student.position}
    </div>
    <div className="text-2xl">{student.avatar}</div> {/* Emojis são renderizados como texto */}
    <div className="flex-1">
      <p className="font-medium text-sm">{student.name}</p>
      <p className="text-xs text-gray-500">{student.xp} XP</p>
    </div>
    {student.isMe && <Badge variant="secondary">Você</Badge>}
  </div>
);

interface AchievementCardProps {
  achievement: Achievement;
}
const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => (
  <div key={achievement.id} className={`p-3 rounded-lg border ${achievement.unlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
    <div className="flex items-center gap-3">
      <div className="text-2xl">{achievement.icon}</div> {/* Emojis como ícones */}
      <div>
        <p className="font-semibold text-sm">{achievement.title}</p>
        <p className="text-xs text-gray-600">{achievement.description}</p>
      </div>
    </div>
  </div>
);

// --- Componente Principal EscolaPremium ---
const EscolaPremium = () => {
  const { user } = useAuth(); // Obtém o usuário do contexto de autenticação

  const [currentLevel, setCurrentLevel] = useState(5);
  const [xpPoints, setXpPoints] = useState(1250);
  const [xpToNextLevel, setXpToNextLevel] = useState(1500);

  const [avatarCustomization, setAvatarCustomization] = useState({
    outfit: 'casual',
    background: 'classroom',
    name: 'Maria' // Nome inicial, será atualizado pelo fetch
  });

  // Estados para os dados carregados
  const [weeklyMissions, setWeeklyMissions] = useState<Mission[]>([]);
  const [classRanking, setClassRanking] = useState<StudentRank[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [premiumContent, setPremiumContent] = useState<PremiumContentItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para simular o carregamento de dados da API
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulação de delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Em um cenário real, você faria requisições axios/fetch para seus endpoints de API
        // Exemplo: const missionsResponse = await axios.get('/api/missions');
        setWeeklyMissions(mockWeeklyMissions);
        setClassRanking(mockClassRanking.map(rank => ({
            ...rank,
            isMe: rank.name === avatarCustomization.name // Marca o usuário atual no ranking
        })));
        setAchievements(mockAchievements);
        setPremiumContent(mockPremiumContent);
        setNotifications(mockNotifications);

        // Atualiza o nome do avatar com base no usuário logado (se houver)
        if (user?.user_metadata?.first_name) {
          setAvatarCustomization(prev => ({ ...prev, name: user.user_metadata.first_name as string }));
          // Em um cenário real, o nível e XP também viriam do backend
          // setCurrentLevel(user.user_metadata.level as number || 5);
          // setXpPoints(user.user_metadata.xp as number || 1250);
          // setXpToNextLevel(user.user_metadata.xpToNextLevel as number || 1500);
        }

      } catch (err: unknown) {
        console.error("Erro ao carregar dados do Escola Premium:", err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
        toast.error("Erro ao carregar o dashboard Premium.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [user, avatarCustomization.name]); // Depende do objeto 'user' e do nome do avatar do contexto de autenticação

  // Função para simular o clique no botão "Continuar"
  const handleContinue = useCallback(() => {
    toast.info("Função 'Continuar' a ser implementada!");
    // Aqui você pode adicionar a lógica para levar o usuário para a próxima aula/atividade
  }, []);

  // Renderiza tela de carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
        <p className="text-xl text-gray-700 ml-4">Carregando dashboard...</p>
      </div>
    );
  }

  // Renderiza tela de erro
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao Carregar Dados</h2>
        <p className="text-lg text-gray-700 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600 text-white">
          Recarregar Página
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <Navigation />

      <main className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Header Premium do Estudante */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              {/* Diálogo para personalizar avatar */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <Avatar className="w-20 h-20 border-2 border-purple-500 shadow-md">
                      <AvatarImage src="/placeholder-avatar.png" alt={`Avatar de ${avatarCustomization.name}`} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white text-2xl">
                        {avatarCustomization.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-purple-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Personalizar Avatar</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="avatar-name" className="block text-sm font-medium mb-2">Nome</label>
                      <input
                        id="avatar-name"
                        type="text"
                        value={avatarCustomization.name}
                        onChange={(e) => setAvatarCustomization({ ...avatarCustomization, name: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Roupa</label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={avatarCustomization.outfit === 'casual' ? 'default' : 'outline'}
                          onClick={() => setAvatarCustomization(prev => ({ ...prev, outfit: 'casual' }))}
                          aria-pressed={avatarCustomization.outfit === 'casual'}
                        >
                          Casual
                        </Button>
                        <Button
                          size="sm"
                          variant={avatarCustomization.outfit === 'formal' ? 'default' : 'outline'}
                          onClick={() => setAvatarCustomization(prev => ({ ...prev, outfit: 'formal' }))}
                          aria-pressed={avatarCustomization.outfit === 'formal'}
                        >
                          Formal
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">Olá, {avatarCustomization.name}!</h1>
                <p className="text-gray-600">Plano Escola Premium</p>
                <div className="flex items-center gap-2 mt-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-purple-600">Nível {currentLevel}</span>
                  <span className="text-gray-500">• {xpPoints} XP</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full md:w-auto"> {/* Ajustado para melhor responsividade */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso para Nível {currentLevel + 1}</span>
                <span className="text-sm text-gray-600" aria-live="polite">{xpPoints}/{xpToNextLevel} XP</span>
              </div>
              <Progress value={(xpPoints / xpToNextLevel) * 100} className="h-3 bg-gray-200" />
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0"> {/* Ajuste de margem responsiva */}
              <Button variant="outline" size="sm" className="relative" aria-label={`Você tem ${notifications.length} notificações`}>
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700" onClick={handleContinue} aria-label="Continuar a última atividade">
                <Play className="w-4 h-4 mr-2" />
                Continuar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Missões Semanais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Missões Semanais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyMissions.length > 0 ? (
                    weeklyMissions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhuma missão disponível no momento.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Conteúdo Premium */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Conteúdo Premium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {premiumContent.length > 0 ? (
                    premiumContent.map((item) => (
                      <PremiumContentCard key={item.id} item={item} />
                    ))
                  ) : (
                    <p className="col-span-full text-center text-muted-foreground">Nenhum conteúdo premium disponível no momento.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ranking da Turma */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Ranking da Turma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classRanking.length > 0 ? (
                    classRanking.map((student) => (
                      <StudentRankCard key={student.position} student={student} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhum aluno no ranking ainda.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Conquistas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-orange-500" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.length > 0 ? (
                    achievements.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhuma conquista disponível ainda.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Comunicação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  Comunicação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" aria-label="Abrir chat com professores">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat com Professores
                  </Button>
                  <Button variant="outline" className="w-full justify-start" aria-label="Ir para o fórum da turma">
                    <Users className="w-4 h-4 mr-2" />
                    Fórum da Turma
                  </Button>
                  <Button variant="outline" className="w-full justify-start" aria-label="Ver avisos da escola">
                    <Bell className="w-4 h-4 mr-2" />
                    Avisos da Escola
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Hook de autenticação mockado para ambiente de desenvolvimento/demo
interface UserMetadata {
  first_name: string;
  // Outros campos podem ser adicionados conforme necessário
  // level?: number;
  // xp?: number;
  // xpToNextLevel?: number;
}

interface User {
  user_metadata: UserMetadata;
}

function useAuth(): { user: User } {
  // Simula um usuário autenticado
  return {
    user: {
      user_metadata: {
        first_name: 'Maria',
        // Outros campos podem ser adicionados conforme necessário
        // level: 5,
        // xp: 1250,
        // xpToNextLevel: 1500,
      },
    },
  };
}

export default EscolaPremium;

