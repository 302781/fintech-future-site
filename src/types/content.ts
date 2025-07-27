import { JSX } from 'react'; // Importa JSX para o tipo de ícone

// Interface para um item de curso
export interface CourseItem {
  id: string; // ID único do curso
  title: string;
  description: string;
  icon: JSX.Element; // Ícone associado ao curso
  tags: string[];
  durationHours?: number; // Duração estimada do curso em horas (opcional)
}

// Interface para um item de plataforma de investimento
export interface PlatformItem {
  id: string; // ID único da plataforma
  name: string;
  description: string;
  link: string;
  icon: JSX.Element; // Ícone associado à plataforma
}

// Interface para o conteúdo de um plano específico, usando IDs para referência
export interface PlanContent {
  courses: string[]; // Array de IDs de cursos incluídos no plano
  investmentPlatforms: string[]; // Array de IDs de plataformas incluídas no plano
  extraFeatures: string[];
  tips: string[];
}