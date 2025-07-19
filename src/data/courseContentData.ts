// src/data/courseContentData.ts
import { FaGraduationCap, FaBookOpen, FaLightbulb, FaDollarSign, FaChartBar } from 'react-icons/fa'; // Exemplo de ícones
import { GiMoneyStack } from "react-icons/gi";

// Exportar a interface para ser usada no App.tsx, se necessário
export interface CourseItem {
  id: string;
  title: string;
  description: string;
  icon?: string; // Nome do ícone como string
  tags: string[];
}

// Os dados dos cursos
export const courseContentData: CourseItem[] = [
  {
    id: "curso-iniciante-1",
    title: "Primeiros Passos no Mundo dos Investimentos",
    description: "Entenda os conceitos básicos de investimentos, riscos e retornos.",
    icon: "FaGraduationCap",
    tags: ["Iniciante", "Renda Fixa", "Básico"],
  },
  {
    id: "curso-intermediario-2",
    title: "Fundos de Investimento: Guia Completo",
    description: "Aprenda sobre os diferentes tipos de fundos, como escolher e os custos.",
    icon: "FaBookOpen",
    tags: ["Intermediário", "Fundos", "Diversificação"],
  },
  {
    id: "curso-avancado-3",
    title: "Análise Técnica para Traders",
    description: "Técnicas e ferramentas para operar no mercado de ações de curto prazo.",
    icon: "FaChartBar",
    tags: ["Avançado", "Trade", "Ações"],
  },
  {
    id: "curso-planejamento-4",
    title: "Planejamento Financeiro para Famílias",
    description: "Crie um orçamento eficaz, poupe e alcance metas financeiras em família.",
    icon: "FaDollarSign",
    tags: ["Planejamento", "Família", "Orçamento"],
  },
  {
    id: "curso-cripto-5",
    title: "Introdução às Criptomoedas",
    description: "Explore o universo das moedas digitais, blockchain e como investir com segurança.",
    icon: "GiMoneyStack",
    tags: ["Cripto", "Blockchain", "Tecnologia"],
  },
  {
    id: "curso-imoveis-6",
    title: "Investindo em Imóveis: Fundos Imobiliários e mais",
    description: "Guia completo sobre como investir no mercado imobiliário através de FIIs e outras modalidades.",
    icon: "FaLightbulb",
    tags: ["Imóveis", "FIIs", "Patrimônio"],
  },
  // Adicione mais cursos conforme necessário
];

// Mapeamento dos nomes de string para os componentes de ícone reais
export const CourseIconMap: { [key: string]: React.ElementType } = {
  FaGraduationCap: FaGraduationCap,
  FaBookOpen: FaBookOpen,
  FaLightbulb: FaLightbulb,
  FaDollarSign: FaDollarSign,
  FaChartBar: FaChartBar,
  GiMoneyStack: GiMoneyStack,
  // Adicione todos os ícones que você usar na lista de cursos
};