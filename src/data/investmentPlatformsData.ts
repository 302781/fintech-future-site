// src/data/investmentPlatformsData.ts
import { FaMoneyBillAlt, FaChartLine, FaUniversity, FaBuilding } from 'react-icons/fa'; // Exemplo de ícones, você pode usar outros
import { TbPigMoney } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";

// Exportar a interface para ser usada no App.tsx, se necessário
export interface PlatformItem {
  id: string;
  name: string;
  description: string;
  link: string;
  icon?: string; // Nome do ícone como string, que será mapeado para o componente
}

// Os dados das plataformas
export const investmentPlatformsData: PlatformItem[] = [
  {
    id: "1",
    name: "XP Investimentos",
    description: "Uma das maiores plataformas de investimentos do Brasil, oferece ampla gama de produtos e assessoria.",
    link: "https://www.xpi.com.br",
    icon: "FaChartLine", // Nome do ícone que será usado no IconMap
  },
  {
    id: "2",
    name: "Itaú Corretora",
    description: "Plataforma de investimentos do Banco Itaú, com diversas opções para clientes do banco.",
    link: "https://www.itaucorretora.com.br",
    icon: "FaUniversity", 
  },
  {
    id: "3",
    name: "Rico",
    description: "Focada em investimentos descomplicados para iniciantes, com boa oferta de renda fixa e fundos.",
    link: "https://www.rico.com.br",
    icon: "TbPigMoney", 
  },
  {
    id: "4",
    name: "BTG Pactual Digital",
    description: "Plataforma do maior banco de investimentos da América Latina, com produtos sofisticados.",
    link: "https://www.btgpactual.com",
    icon: "FaBuilding", 
  },
  {
    id: "5",
    name: "NuInvest (Antiga Easynvest)",
    description: "Corretora do Nubank, com foco em facilidade e acesso a diversos investimentos.",
    link: "https://nuinvest.com.br",
    icon: "GiReceiveMoney", 
  },
  // Adicione mais plataformas conforme necessário
];

// Mapeamento dos nomes de string para os componentes de ícone reais
// Importante: As chaves devem corresponder exatamente aos valores da propriedade 'icon' acima.
export const InvestmentIconMap: { [key: string]: React.ElementType } = {
  FaMoneyBillAlt: FaMoneyBillAlt,
  FaChartLine: FaChartLine,
  FaUniversity: FaUniversity,
  FaBuilding: FaBuilding,
  TbPigMoney: TbPigMoney,
  GiReceiveMoney: GiReceiveMoney,
  // Adicione todos os ícones que você usar na lista de plataformas
};