import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { School, Building2, Users, BookOpen, Trophy, Heart, Gamepad2, Users2, Target } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PlanFeature {
  text: string;
}
export interface Plan {
  id: string;
  title: string;
  description: string;
  price: string;
  priceUnit?: string; // Por exemplo, "/mês"
  features: PlanFeature[];
  buttonText: string;
  buttonLink: string;
  isFeatured?: boolean; // Para destacar um plano, se houver
}

export const corporatePlans: Plan[] = [
  {
    id: 'escola-basica',
    title: 'Escola Básica',
    description: 'Ideal para escolas com até 100 alunos.',
    price: '299',
    priceUnit: '/mês',
    features: [
      { text: 'Acesso ao conteúdo educativo fundamental' },
      { text: 'Dashboard básico para professores' },
      { text: 'Relatórios de progresso simplificados' },
      { text: 'Suporte técnico padrão' },
      { text: 'Material didático digital' },
    ],
    buttonText: 'Contratar Plano',
    buttonLink: '/contratar-plano?plano=escola-basica',
    isFeatured: false,
  },
  {
    id: 'escola-premium',
    title: 'Escola Premium',
    description: 'Solução completa para escolas com até 500 alunos.',
    price: '599',
    priceUnit: '/mês',
    features: [
      { text: '**Todos os recursos do Plano Básico**' },
      { text: 'Workshops presenciais mensais' },
      { text: 'Capacitação avançada para professores' },
      { text: 'Gamificação avançada e desafios' },
      { text: 'Relatórios de desempenho personalizados' },
      { text: 'Consultoria pedagógica especializada' },
    ],
    buttonText: 'Contratar Plano',
    buttonLink: '/contratar-plano?plano=escola-premium',
    isFeatured: true, // Destaca este plano
  },
  {
    id: 'rede-de-ensino',
    title: 'Rede de Ensino',
    description: 'Solução personalizada para grandes redes e corporações.',
    price: 'Sob consulta',
    features: [
      { text: '**Todos os recursos do Plano Premium**' },
      { text: 'Implementação e integração personalizadas' },
      { text: 'Gestor de conta dedicado' },
      { text: 'Treinamentos especializados e on-demand' },
      { text: 'API para integração com sistemas existentes' },
      { text: 'Suporte prioritário 24/7' },
    ],
    buttonText: 'Solicitar Cotação',
    buttonLink: '/contratar-plano?plano=rede-de-ensino',
    isFeatured: false,
  },
];
