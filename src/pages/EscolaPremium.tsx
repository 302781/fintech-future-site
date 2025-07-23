import { useState } from 'react';
import { useEffect } from 'react';
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
  Settings, Bell
} from 'lucide-react';
import axios from 'axios';

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

// --- Fim das Interfaces ---
const EscolaPremium = () => {
  const [currentLevel, setCurrentLevel] = useState(5);
  const [xpPoints, setXpPoints] = useState(1250);
  const [xpToNextLevel, setXpToNextLevel] = useState(1500);

  const [avatarCustomization, setAvatarCustomization] = useState({
    outfit: 'casual',
    background: 'classroom',
    name: 'Maria'
  });

  const [weeklyMissions, setWeeklyMissions] = useState<Mission[]>([
    { id: 1, title: 'Complete 3 jogos', progress: 2, total: 3, xp: 50, completed: false },
    { id: 2, title: 'Assista 5 vídeos', progress: 5, total: 5, xp: 30, completed: true },
    { id: 3, title: 'Faça 10 atividades', progress: 7, total: 10, xp: 100, completed: false }
  ]);

  const [classRanking, setClassRanking] = useState<StudentRank[]>([
    { position: 1, name: 'Ana Silva', xp: 2100, avatar: '👩‍🎓' },
    { position: 2, name: 'Pedro Costa', xp: 1800, avatar: '👨‍🎓' },
    { position: 3, name: 'Maria Santos', xp: 1250, avatar: '👩‍🎓', isMe: true },
    { position: 4, name: 'João Oliveira', xp: 1100, avatar: '👨‍🎓' },
    { position: 5, name: 'Sofia Lima', xp: 950, avatar: '👩‍🎓' }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 1, title: 'Economista Júnior', description: 'Complete 10 atividades de poupança', icon: '💰', unlocked: true },
    { id: 2, title: 'Investidor Iniciante', description: 'Termine todos os jogos de investimento', icon: '📈', unlocked: true },
    { id: 3, title: 'Consumidor Consciente', description: 'Acerte 90% das questões sobre consumo', icon: '🛒', unlocked: false },
    { id: 4, title: 'Mestre das Finanças', description: 'Alcance o nível 10', icon: '👑', unlocked: false }
  ]);
  const [premiumContent, setPremiumContent] = useState<PremiumContentItem[]>([
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
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: 'Nova missão semanal disponível!', time: '2h', type: 'mission' },
    { id: 2, text: 'Professor João respondeu sua pergunta', time: '1d', type: 'chat' },
    { id: 3, text: 'Você subiu para 3º lugar no ranking!', time: '2d', type: 'ranking' }
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const missionsResponse = await axios.get('/api/missions');
        setWeeklyMissions(missionsResponse.data as Mission[]);

        const rankingResponse = await axios.get('/api/ranking');
        setClassRanking(rankingResponse.data as StudentRank[]);

        const achievementsResponse = await axios.get('/api/achievements');
        setAchievements(achievementsResponse.data as Achievement[]);

        const contentResponse = await axios.get('/api/premium-content');
        setPremiumContent(contentResponse.data as PremiumContentItem[]);

        const notificationsResponse = await axios.get('/api/notifications');
        setNotifications(notificationsResponse.data as Notification[]);

        const userProfileResponse = await axios.get('/api/profile');
        const userProfile = userProfileResponse.data as { firstName: string; level: number; xp: number; xpToNextLevel: number };
        setAvatarCustomization(prev => ({ ...prev, name: userProfile.firstName }));
        setCurrentLevel(userProfile.level);
        setXpPoints(userProfile.xp);
        setXpToNextLevel(userProfile.xpToNextLevel);

      } catch (error) {
        console.error("Erro ao carregar dados do Escola Premium:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <Navigation />

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Header Premium do Estudante */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <Avatar className="w-20 h-20">
                      {/* 3. Acessibilidade: Adicionado alt text */}
                      <AvatarImage src="/placeholder-avatar.png" alt={`Avatar de ${avatarCustomization.name}`} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white text-2xl">
                        {/* Garante que o fallback seja a primeira letra do nome */}
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
                        id="avatar-name" // Adicionado ID para acessibilidade
                        type="text"
                        value={avatarCustomization.name}
                        onChange={(e) => setAvatarCustomization({ ...avatarCustomization, name: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Roupa</label>
                      <div className="flex gap-2">
                        {/* 4. Funcionalidade: Adicionado onClick para botões de roupa */}
                        <Button
                          size="sm"
                          variant={avatarCustomization.outfit === 'casual' ? 'default' : 'outline'}
                          onClick={() => setAvatarCustomization(prev => ({ ...prev, outfit: 'casual' }))}
                        >
                          Casual
                        </Button>
                        <Button
                          size="sm"
                          variant={avatarCustomization.outfit === 'formal' ? 'default' : 'outline'}
                          onClick={() => setAvatarCustomization(prev => ({ ...prev, outfit: 'formal' }))}
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

            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso para Nível {currentLevel + 1}</span>
                <span className="text-sm text-gray-600">{xpPoints}/{xpToNextLevel} XP</span>
              </div>
              <Progress value={(xpPoints / xpToNextLevel) * 100} className="h-3" />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              </Button>
              {/* 5. Funcionalidade: Adicionar um onClick ao botão "Continuar" */}
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
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
                  {weeklyMissions.map((mission) => (
                    <div key={mission.id} className={`p-4 rounded-lg border ${mission.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{mission.title}</h4>
                        <Badge variant={mission.completed ? 'default' : 'secondary'}>
                          +{mission.xp} XP
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={(mission.progress / mission.total) * 100} className="flex-1 h-2" />
                        <span className="text-sm text-gray-600">{mission.progress}/{mission.total}</span>
                      </div>
                    </div>
                  ))}
                  {weeklyMissions.length === 0 && (
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
                  {premiumContent.map((item) => (
                    <Card key={item.id} className="cursor-pointer hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          {item.type === 'game' && <Gamepad2 className="w-5 h-5 text-purple-500" />}
                          {item.type === 'video' && <Video className="w-5 h-5 text-red-500" />}
                          {item.type === 'collaborative' && <Users className="w-5 h-5 text-blue-500" />}
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

                        <Button size="sm" className="w-full" variant={item.completed ? 'outline' : 'default'}>
                          {item.completed ? 'Revisar' : 'Iniciar'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {premiumContent.length === 0 && (
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
                  {classRanking.map((student) => (
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
                  ))}
                  {classRanking.length === 0 && (
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
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-3 rounded-lg border ${achievement.unlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div> {/* Emojis como ícones */}
                        <div>
                          <p className="font-semibold text-sm">{achievement.title}</p>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {achievements.length === 0 && (
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
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat com Professores
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Fórum da Turma
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Avisos da Escola
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EscolaPremium;