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

export interface Achievement {
  name: string;
  date: string;
  icon: string; 
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
  monthlyStats: MonthlyStats;
  recentTopics: RecentTopic[];
  quizResults: QuizResult[];
  achievements: Achievement[];
  certificates: Certificate[];
}

export const children: Child[] = [ // A array 'children' estava faltando
  {
    id: "joao",
    name: "João",
    age: 10,
    avatar: "👦",
    level: 3,
    totalCoins: 850,
    coursesCompleted: 2,
    lastAccess: "Hoje, 16:30"
  },
  {
    id: "maria",
    name: "Maria",
    age: 8,
    avatar: "👧",
    level: 2,
    totalCoins: 420,
    coursesCompleted: 1,
    lastAccess: "Ontem, 19:15"
  }
];

export const childProgress: Record<string, ChildProgress> = { 
  joao: { 
    monthlyStats: {
      lessonsCompleted: 0,
      quizzesTaken: 0,
      coinsEarned: 0,
      medalsBadges: 0,
      studyTime: '',
      accessFrequency: 0,
    },
    recentTopics: [],
    quizResults: [],
    achievements: [],
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
    monthlyStats: {
      lessonsCompleted: 0,
      quizzesTaken: 0,
      coinsEarned: 0,
      medalsBadges: 0,
      studyTime: '',
      accessFrequency: 0,
    },
    recentTopics: [],
    quizResults: [],
    achievements: [],
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
  
};