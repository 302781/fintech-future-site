// src/data/studentData.ts

export interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  level: number;
  totalCoins: number;
  coursesCompleted: number;
  lastAccess: string;
}

// Adaptação para o formato usado no componente StudentArea
export interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  coins: number;
  unlocked: boolean;
}

// Adaptação para o formato usado no componente StudentArea
export interface Achievement {
  id: number;
  title: string; // "name" mudou para "title"
  icon: string;
  earned: boolean; // "date" mudou para "earned" para indicar se foi conquistado
}

// Adaptação para o formato usado no componente StudentArea
export interface MonthlyGoal {
  id: number;
  title: string;
  current: number;
  target: number;
  type: "lessons" | "coins" | "quizzes";
}

export interface MonthlyStats {
  lessonsCompleted: number;
  quizzesTaken: number;
  coinsEarned: number;
  medalsBadges: number;
  studyTime: string;
  accessFrequency: number;
}

export interface RecentTopic {
  topic: string;
  completion: number;
  date: string;
}

export interface QuizResult {
  quiz: string;
  score: number;
  date: string;
}

export interface Certificate {
  id: string;
  name: string;
  dateIssued: string;
  courseName: string;
  status: "issued" | "pending" | "downloaded";
  downloadLink?: string;
}

export interface ChildProgress {
  courses: Course[]; // Adicionado para incluir os cursos
  achievements: Achievement[]; // Adicionado para incluir as conquistas
  monthlyGoals: MonthlyGoal[]; // Adicionado para incluir as metas mensais
  monthlyStats: MonthlyStats;
  recentTopics: RecentTopic[];
  quizResults: QuizResult[];
  certificates: Certificate[];
}

export const children: Child[] = [
  {
    id: "joao",
    name: "João",
    age: 10,
    avatar: "👦",
    level: 3,
    totalCoins: 850,
    coursesCompleted: 2,
    lastAccess: "Hoje, 16:30",
  },
  {
    id: "maria",
    name: "Maria",
    age: 8,
    avatar: "👧",
    level: 2,
    totalCoins: 420,
    coursesCompleted: 1,
    lastAccess: "Ontem, 19:15",
  },
];

export const childProgressData: Record<string, ChildProgress> = {
  joao: {
    courses: [
      {
        id: 1,
        title: "Mesada Inteligente",
        description: "Aprenda a usar sua mesada com sabedoria",
        progress: 75,
        lessons: 8,
        completedLessons: 6,
        coins: 120,
        unlocked: true,
      },
      {
        id: 2,
        title: "Poupança é Diversão",
        description: "Descubra como economizar pode ser divertido",
        progress: 45,
        lessons: 10,
        completedLessons: 4,
        coins: 200,
        unlocked: true,
      },
      {
        id: 3,
        title: "Pequeno Investidor",
        description: "Seus primeiros passos no mundo dos investimentos",
        progress: 0,
        lessons: 12,
        completedLessons: 0,
        coins: 300,
        unlocked: false,
      },
    ],
    achievements: [
      { id: 1, title: "Primeira Aula", icon: "🎓", earned: true },
      { id: 2, title: "Poupador Iniciante", icon: "🐷", earned: true },
      { id: 3, title: "Quiz Master", icon: "🧠", earned: true },
      { id: 4, title: "7 Dias Seguidos", icon: "🔥", earned: false },
      { id: 5, title: "Investidor Mirim", icon: "📈", earned: false },
      { id: 6, title: "Super Poupador", icon: "💎", earned: false },
    ],
    monthlyGoals: [
      { id: 1, title: "Completar 3 aulas", current: 2, target: 3, type: "lessons" },
      { id: 2, title: "Ganhar 500 moedas", current: 320, target: 500, type: "coins" },
      { id: 3, title: "Fazer 5 quizzes", current: 5, target: 5, type: "quizzes" },
    ],
    monthlyStats: {
      lessonsCompleted: 12,
      quizzesTaken: 8,
      coinsEarned: 650,
      medalsBadges: 3,
      studyTime: "10h 30m",
      accessFrequency: 20,
    },
    recentTopics: [
      { topic: "Gastos Essenciais", completion: 90, date: "2025-07-28" },
      { topic: "Tipos de Moedas", completion: 100, date: "2025-07-25" },
    ],
    quizResults: [
      { quiz: "Quiz Mesada", score: 85, date: "2025-07-29" },
      { quiz: "Quiz Poupança", score: 70, date: "2025-07-26" },
    ],
    certificates: [
      {
        id: "cert-joao-basico-dinheiro",
        name: "Certificado: Fundamentos do Dinheiro",
        dateIssued: "2024-01-05",
        courseName: "O que é Dinheiro?",
        status: "issued",
        downloadLink: "/certificados/joao_fundamentos_dinheiro.pdf",
      },
      {
        id: "cert-joao-mesada",
        name: "Certificado: Mesada Inteligente",
        dateIssued: "2024-02-10",
        courseName: "Mesada Inteligente",
        status: "pending",
      },
    ],
  },
  maria: {
    courses: [
      {
        id: 1,
        title: "Primeiro Dinheiro",
        description: "Entenda de onde vem o dinheiro",
        progress: 100,
        lessons: 5,
        completedLessons: 5,
        coins: 80,
        unlocked: true,
      },
      {
        id: 2,
        title: "Compras Conscientes",
        description: "Aprenda a fazer boas escolhas ao gastar",
        progress: 20,
        lessons: 7,
        completedLessons: 1,
        coins: 150,
        unlocked: true,
      },
      {
        id: 3,
        title: "História das Moedas",
        description: "Uma viagem no tempo para descobrir as moedas",
        progress: 0,
        lessons: 8,
        completedLessons: 0,
        coins: 100,
        unlocked: false,
      },
    ],
    achievements: [
      { id: 1, title: "Primeira Aula", icon: "🎓", earned: true },
      { id: 2, title: "Dona do Dinheiro", icon: "👑", earned: true },
      { id: 3, title: "Aventureira Financeira", icon: "🗺️", earned: false },
    ],
    monthlyGoals: [
      { id: 1, title: "Completar 1 aula", current: 1, target: 1, type: "lessons" },
      { id: 2, title: "Ganhar 200 moedas", current: 150, target: 200, type: "coins" },
    ],
    monthlyStats: {
      lessonsCompleted: 5,
      quizzesTaken: 3,
      coinsEarned: 200,
      medalsBadges: 2,
      studyTime: "5h 15m",
      accessFrequency: 10,
    },
    recentTopics: [
      { topic: "Origem do Dinheiro", completion: 100, date: "2025-07-27" },
      { topic: "Contando Moedas", completion: 80, date: "2025-07-24" },
    ],
    quizResults: [
      { quiz: "Quiz Primeiro Dinheiro", score: 90, date: "2025-07-28" },
      { quiz: "Quiz Compras", score: 60, date: "2025-07-25" },
    ],
    certificates: [
      {
        id: "cert-maria-primeiro-dinheiro",
        name: "Certificado: Meu Primeiro Dinheiro",
        dateIssued: "2024-03-15",
        courseName: "Primeiro Dinheiro",
        status: "issued",
        downloadLink: "/certificados/maria_primeiro_dinheiro.pdf",
      },
    ],
  },
};