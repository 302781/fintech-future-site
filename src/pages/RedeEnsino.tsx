import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast"; // Para notificações de toast

import {
  Trophy, Crown, MessageCircle, Users, Target, Calendar,
  TrendingUp, Globe, Award, MapPin, Zap, BarChart3,
  QrCode, HeadphonesIcon, FileText, Brain, Lightbulb,
  CreditCard, ShieldAlert, CalendarCheck, Loader2, Gamepad, Video
} from 'lucide-react';

// --- Interfaces para Tipagem dos Dados ---
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
  icon: string; // Mantido como string para emojis (Unicode), ou LucideIcon para componentes Lucide
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

interface AdaptiveSuggestion {
  title: string;
  reason: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

interface NetworkChallenge {
  id: number;
  title: string;
  period: string;
  participants: number;
  prize: string;
  status: 'active' | 'upcoming' | 'completed';
}

interface LearningPath {
  id: number;
  title: string;
  region: string;
  progress: number;
  modules: number;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

interface GlobalSchoolRank {
  position: number;
  school: string;
  students: number;
  avgScore: number;
  isMe?: boolean;
}

interface Certificate {
  id: number;
  title: string;
  date: string;
  verified: boolean;
}

interface Notification {
  id: number;
  text: string;
  time: string;
  type: 'mission' | 'chat' | 'ranking' | string; // Tipagem para tipos de notificação
}

// --- Dados Iniciais (Consolidados aqui) ---
const mockWeeklyMissions: Mission[] = [
  { id: 1, title: 'Complete 3 jogos', progress: 2, total: 3, xp: 50, completed: false },
  { id: 2, title: 'Assista 5 vídeos', progress: 5, total: 5, xp: 30, completed: true },
  { id: 3, title: 'Faça 10 atividades', progress: 7, total: 10, xp: 100, completed: false }
];

const mockClassRanking: StudentRank[] = [
  { position: 1, name: 'Ana Silva', xp: 2100, avatar: '👩‍🎓' },
  { position: 2, name: 'Pedro Costa', xp: 1800, avatar: '👨‍🎓' },
  { position: 3, name: 'Maria Santos', xp: 1250, avatar: '👩‍🎓', isMe: true }, // Marcado como "Eu"
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

const mockAdaptiveSuggestions: AdaptiveSuggestion[] = [
  {
    title: 'Foque em Matemática Financeira',
    reason: 'Baseado no seu desempenho, você se beneficiaria destes exercícios',
    difficulty: 'medium',
    estimatedTime: '20 min'
  },
  {
    title: 'Revisão: Conceitos de Juros',
    reason: 'Identifiquei algumas dificuldades neste tópico',
    difficulty: 'easy',
    estimatedTime: '15 min'
  },
  {
    title: 'Desafio Avançado: Portfólio',
    reason: 'Você está pronto para conteúdos mais complexos',
    difficulty: 'hard',
    estimatedTime: '45 min'
  }
];

const mockNetworkChallenges: NetworkChallenge[] = [
  {
    id: 1,
    title: 'Campeonato Regional de Finanças',
    period: 'Dezembro 2024',
    participants: 850,
    prize: 'Certificado + Tablet',
    status: 'active'
  },
  {
    id: 2,
    title: 'Desafio Sustentabilidade',
    period: 'Janeiro 2025',
    participants: 1200,
    prize: 'Viagem Educativa',
    status: 'upcoming'
  }
];

const mockLearningPaths: LearningPath[] = [
  {
    id: 1,
    title: 'Trilha Sudeste: Empreendedorismo',
    region: 'SP, RJ, MG, ES',
    progress: 65,
    modules: 8,
    difficulty: 'intermediate'
  },
  {
    id: 2,
    title: 'Trilha Norte: Economia Local',
    region: 'AM, PA, AC, RO',
    progress: 30,
    modules: 6,
    difficulty: 'basic'
  }
];

const mockGlobalRanking: GlobalSchoolRank[] = [
  { position: 1, school: 'Colégio Santa Maria - SP', students: 145, avgScore: 94.5 },
  { position: 2, school: 'Instituto Federal - RJ', students: 280, avgScore: 92.1 },
  { position: 3, school: 'Escola Técnica - MG', students: 95, avgScore: 91.8 },
  { position: 4, school: 'Colégio Dom Bosco - RS', students: 180, avgScore: 89.5 },
  { position: 5, school: 'Nossa Escola - BA', students: 120, avgScore: 88.7, isMe: true }
];

const mockCertificates: Certificate[] = [
  { id: 1, title: 'Especialista em Investimentos Básicos', date: '2024-10-15', verified: true },
  { id: 2, title: 'Consumo Consciente Avançado', date: '2024-09-22', verified: true },
  { id: 3, title: 'Planejamento Financeiro Familiar', date: '2024-08-10', verified: false }
];

// --- Subcomponentes Reutilizáveis ---

interface MissionCardProps { mission: Mission; }
const MissionCard: React.FC<MissionCardProps> = React.memo(({ mission }) => (
  <div className={`p-4 rounded-lg border ${mission.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
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
));

interface PremiumContentCardProps { item: PremiumContentItem; }
const PremiumContentCard: React.FC<PremiumContentCardProps> = React.memo(({ item }) => (
  <Card className="cursor-pointer hover:shadow-md transition-all">
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-3">
        {item.type === 'game' && <Gamepad className="w-5 h-5 text-purple-500" />}
        {item.type === 'video' && <Video className="w-5 h-5 text-red-500" />}
        {item.type === 'collaborative' && <Users className="w-5 h-5 text-blue-500" />}
        <Badge variant="outline" className="text-xs">Premium</Badge>
      </div>
      <h4 className="font-semibold mb-2">{item.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
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
));

interface StudentRankCardProps { student: StudentRank; }
const StudentRankCard: React.FC<StudentRankCardProps> = React.memo(({ student }) => (
  <div className={`flex items-center gap-3 p-2 rounded-lg ${student.isMe ? 'bg-purple-50 border border-purple-200' : ''}`}>
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold">
      {student.position}
    </div>
    <div className="text-2xl">{student.avatar}</div>
    <div className="flex-1">
      <p className="font-medium text-sm">{student.name}</p>
      <p className="text-xs text-gray-500">{student.xp} XP</p>
    </div>
    {student.isMe && <Badge variant="secondary">Você</Badge>}
  </div>
));

interface AchievementCardProps { achievement: Achievement; }
const AchievementCard: React.FC<AchievementCardProps> = React.memo(({ achievement }) => (
  <div className={`p-3 rounded-lg border ${achievement.unlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
    <div className="flex items-center gap-3">
      <div className="text-2xl">{achievement.icon}</div>
      <div>
        <p className="font-semibold text-sm">{achievement.title}</p>
        <p className="text-xs text-gray-600">{achievement.description}</p>
      </div>
    </div>
  </div>
));

interface AdaptiveSuggestionCardProps { suggestion: AdaptiveSuggestion; }
const AdaptiveSuggestionCard: React.FC<AdaptiveSuggestionCardProps> = React.memo(({ suggestion }) => (
  <div className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer">
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-semibold flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-yellow-500" />
        {suggestion.title}
      </h4>
      <Badge variant={
        suggestion.difficulty === 'easy' ? 'secondary' :
          suggestion.difficulty === 'medium' ? 'default' :
            'destructive'
      }>
        {suggestion.difficulty === 'easy' ? 'Fácil' :
          suggestion.difficulty === 'medium' ? 'Médio' : 'Avançado'}
      </Badge>
    </div>
    <p className="text-sm text-gray-600 mb-3">{suggestion.reason}</p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">⏱ {suggestion.estimatedTime}</span>
      <Button size="sm">Começar</Button>
    </div>
  </div>
));

interface NetworkChallengeCardProps { challenge: NetworkChallenge; }
const NetworkChallengeCard: React.FC<NetworkChallengeCardProps> = React.memo(({ challenge }) => (
  <div className="p-4 border rounded-lg">
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-semibold">{challenge.title}</h4>
      <Badge variant={challenge.status === 'active' ? 'default' : 'secondary'}>
        {challenge.status === 'active' ? 'Ativo' : 'Em Breve'}
      </Badge>
    </div>
    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
      <div>📅 {challenge.period}</div>
      <div>👥 {challenge.participants} participantes</div>
      <div>🏆 {challenge.prize}</div>
    </div>
    <Button
      size="sm"
      className="w-full"
      disabled={challenge.status !== 'active'}
    >
      {challenge.status === 'active' ? 'Participar' : 'Aguardar'}
    </Button>
  </div>
));

interface LearningPathCardProps { path: LearningPath; }
const LearningPathCard: React.FC<LearningPathCardProps> = React.memo(({ path }) => (
  <div className="p-4 border rounded-lg">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h4 className="font-semibold">{path.title}</h4>
        <p className="text-sm text-gray-600">{path.region}</p>
      </div>
      <Badge variant="outline">{path.modules} módulos</Badge>
    </div>
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>Progresso</span>
        <span>{path.progress}%</span>
      </div>
      <Progress value={path.progress} className="h-2" />
    </div>
    <Button size="sm" className="w-full">
      Continuar Trilha
    </Button>
  </div>
));

interface GlobalRankingCardProps { schoolRank: GlobalSchoolRank; }
const GlobalRankingCard: React.FC<GlobalRankingCardProps> = React.memo(({ schoolRank }) => (
  <div className={`p-3 rounded-lg border ${schoolRank.isMe ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50'}`}>
    <div className="flex items-center gap-2 mb-1">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs font-bold">
        {schoolRank.position}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{schoolRank.school}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{schoolRank.students} alunos</span>
          <span>•</span>
          <span>{schoolRank.avgScore}% média</span>
        </div>
      </div>
      {schoolRank.isMe && <Badge variant="secondary" className="text-xs">Sua Escola</Badge>}
    </div>
  </div>
));

interface CertificateCardProps { cert: Certificate; }
const CertificateCard: React.FC<CertificateCardProps> = React.memo(({ cert }) => (
  <div className="p-3 border rounded-lg">
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-semibold text-sm">{cert.title}</h4>
      {cert.verified && (
        <Badge variant="default" className="text-xs">
          <Zap className="w-3 h-3 mr-1" />
          Verificado
        </Badge>
      )}
    </div>
    <p className="text-xs text-gray-500 mb-2">{cert.date}</p>
    <Button size="sm" variant="outline" className="w-full text-xs">
      Baixar PDF
    </Button>
  </div>
));

// --- Componente Principal RedeEnsino ---
const RedeEnsino = () => {
  const [globalRank, setGlobalRank] = useState(147);
  const [networkStats, setNetworkStats] = useState({
    totalSchools: 45,
    activeStudents: 12500,
    completedCourses: 45000
  });

  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'canceled' | 'expired'>('active');
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState('2025-12-31');
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Memoiza os dados iniciais
  const adaptiveSuggestions = useMemo(() => mockAdaptiveSuggestions, []);
  const networkChallenges = useMemo(() => mockNetworkChallenges, []);
  const learningPaths = useMemo(() => mockLearningPaths, []);
  const globalRanking = useMemo(() => mockGlobalRanking, []);
  const certificates = useMemo(() => mockCertificates, []);
  const premiumContent = useMemo(() => mockPremiumContent, []);
  const notifications = useMemo(() => mockNotifications, []);
  const weeklyMissions = useMemo(() => mockWeeklyMissions, []); // Adicionado para manter a consistência da estrutura de dados

  // Simula o carregamento de dados do backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        // Simulação de delay de rede
        await new Promise(resolve => setTimeout(resolve, 800));

        // Aqui você faria as chamadas reais à sua API, por exemplo:
        // const { data: missionsData } = await axios.get<Mission[]>('/api/missions');
        // setWeeklyMissions(missionsData);
        // ... e assim por diante para todos os outros dados

        // Para esta demonstração, apenas usamos os dados mockados
        // setWeeklyMissions(mockWeeklyMissions); // Já inicializado por useMemo
        // setClassRanking(mockClassRanking); // Já inicializado por useMemo
        // setAchievements(mockAchievements); // Já inicializado por useMemo
        // setPremiumContent(mockPremiumContent); // Já inicializado por useMemo
        // setNotifications(mockNotifications); // Já inicializado por useMemo
        // setAdaptiveSuggestions(mockAdaptiveSuggestions); // Já inicializado por useMemo
        // setNetworkChallenges(mockNetworkChallenges); // Já inicializado por useMemo
        // setLearningPaths(mockLearningPaths); // Já inicializado por useMemo
        // setGlobalRanking(mockGlobalRanking); // Já inicializado por useMemo
        // setCertificates(mockCertificates); // Já inicializado por useMemo

        // Simulação de dados do usuário (ex: de um hook useAuth ou contexto)
        // const userProfileResponse = await axios.get('/api/profile');
        // const userProfile = userProfileResponse.data as { firstName: string; level: number; xp: number; xpToNextLevel: number };
        // setAvatarCustomization(prev => ({ ...prev, name: userProfile.firstName }));
        // setCurrentLevel(userProfile.level);
        // setXpPoints(userProfile.xp);
        // setXpToNextLevel(userProfile.xpToNextLevel);

      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar dados da rede de ensino.';
        setFetchError(message);
        toast({
          title: "Erro de Carregamento",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [toast]); // Dependência em `toast` para garantir que o hook esteja disponível

  const handleCancelSubscription = useCallback(() => {
    setIsCancelling(true);
    // Em uma aplicação real, você faria uma chamada para sua API de backend:
    // Ex: await fetch('/api/rede-ensino/cancel-plan', { ... });

    // Simulação do cancelamento
    setTimeout(() => {
      setSubscriptionStatus('canceled');
      toast({
        title: "Cancelamento Solicitado!",
        description: `Seu plano foi cancelado e permanecerá ativo até ${new Date(currentPeriodEnd).toLocaleDateString('pt-BR')}.`,
        variant: "default",
      });
      setIsCancelling(false);
    }, 1500);
  }, [currentPeriodEnd, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1A247E] mr-2" />
        <p className="text-xl text-gray-700">Carregando painel da Rede de Ensino...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-4 text-center">
        <ShieldAlert className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Erro ao Carregar Dados</h2>
        <p className="text-lg mb-4">{fetchError}</p>
        <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white">
          Recarregar Página
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-100">
      <Navigation />

      <main className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Header Personalizado da Rede */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <img src="/placeholder-logo.png" alt="Logo da Rede" className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Bem-vindo, Rede de Ensino!</h1>
                <p className="text-emerald-100">Sua plataforma completa de educação financeira</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Ranking Global: #{globalRank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{networkStats.activeStudents.toLocaleString()} estudantes ativos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600" aria-label="Acessar login por QR Code">
                <QrCode className="w-4 h-4 mr-2" />
                QR Login
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600" aria-label="Entrar em contato com o suporte 24/7">
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Suporte 24/7
              </Button>
            </div>
          </div>

          {/* Estatísticas da Rede */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">{networkStats.totalSchools}</div>
                  <div className="text-emerald-100 text-sm">Escolas na Rede</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">{networkStats.completedCourses.toLocaleString()}</div>
                  <div className="text-emerald-100 text-sm">Cursos Concluídos</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-emerald-100 text-sm">Taxa de Satisfação</div>
                </div>
              </div>
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

            {/* Inteligência Adaptativa */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Sugestões Personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adaptiveSuggestions.length > 0 ? (
                    adaptiveSuggestions.map((suggestion, index) => (
                      <AdaptiveSuggestionCard key={index} suggestion={suggestion} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhuma sugestão disponível no momento.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trilhas Regionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Trilhas Regionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths.length > 0 ? (
                    learningPaths.map((path) => (
                      <LearningPathCard key={path.id} path={path} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhuma trilha regional disponível no momento.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Eventos e Campeonatos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  Eventos da Rede
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkChallenges.length > 0 ? (
                    networkChallenges.map((challenge) => (
                      <NetworkChallengeCard key={challenge.id} challenge={challenge} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhum evento ou campeonato disponível no momento.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ranking Global */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Ranking Global de Escolas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {globalRanking.length > 0 ? (
                    globalRanking.map((school) => (
                      <GlobalRankingCard key={school.position} schoolRank={school} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhuma escola no ranking ainda.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Certificados Digitais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Meus Certificados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certificates.length > 0 ? (
                    certificates.map((cert) => (
                      <CertificateCard key={cert.id} cert={cert} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhum certificado disponível ainda.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Gerenciamento de Assinatura */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  Gerenciar Assinatura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-indigo-50">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-semibold">Plano Rede de Ensino</h4>
                      <p className="text-sm text-gray-600">
                        Status: <span className={`font-bold ${
                          subscriptionStatus === 'active' ? 'text-green-600' :
                            subscriptionStatus === 'canceled' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {subscriptionStatus === 'active' ? 'Ativo' :
                            subscriptionStatus === 'canceled' ? 'Cancelado (Não renova)' : 'Expirado'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Ativo até:</div>
                    <div className="font-semibold text-sm">
                      {new Date(currentPeriodEnd).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                {subscriptionStatus === 'active' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full" aria-label="Abrir diálogo para cancelar plano premium">
                        <ShieldAlert className="w-4 h-4 mr-2" />
                        Cancelar Plano Premium
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                          <ShieldAlert className="w-6 h-6" />
                          Confirmar Cancelamento
                        </DialogTitle>
                        <DialogDescription>
                          Seu plano será cancelado e não será renovado automaticamente após o dia{" "}
                          <span className="font-bold">
                            {new Date(currentPeriodEnd).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </span>. Você ainda terá acesso a todos os recursos premium até essa data.
                          Lamentamos vê-lo partir!
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="reason">Por que você está cancelando? (Opcional)</Label>
                          <Textarea
                            id="reason"
                            placeholder="Seu feedback é importante para nós..."
                            value={cancellationReason}
                            onChange={(e) => setCancellationReason(e.target.value)}
                            aria-label="Motivo do cancelamento"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCancelling(false)} disabled={isCancelling}>
                          Manter Plano
                        </Button>
                        <Button
                          onClick={handleCancelSubscription}
                          disabled={isCancelling}
                          className="bg-destructive hover:bg-destructive/90"
                          aria-label={isCancelling ? "Processando cancelamento..." : "Sim, cancelar plano"}
                        >
                          {isCancelling ? "Cancelando..." : "Sim, Cancelar Plano"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {subscriptionStatus === 'canceled' && (
                  <div className="p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md flex items-center gap-3">
                    <CalendarCheck className="h-5 w-5" />
                    <p className="text-sm">
                      Seu plano está **cancelado** e não será renovado. O acesso premium permanece ativo até{" "}
                      <span className="font-semibold">
                        {new Date(currentPeriodEnd).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}.
                      </span>
                      {" "}Para reativar, entre em contato com o suporte.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Acesso Rápido */}
            <Card>
              <CardHeader>
                <CardTitle>Acesso Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm" aria-label="Abrir chat com suporte">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat com Suporte
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" aria-label="Acessar fórum da rede">
                    <Users className="w-4 h-4 mr-2" />
                    Fórum da Rede
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" aria-label="Visualizar relatórios detalhados">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Relatórios Detalhados
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" aria-label="Acessar portal da rede">
                    <Globe className="w-4 h-4 mr-2" />
                    Portal da Rede
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

export default RedeEnsino;
