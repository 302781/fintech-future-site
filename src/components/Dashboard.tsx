import { MetricCard } from "@/components/MetricCard"; // Certifique-se de que o caminho está correto!
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Target,
  Play,
  BarChart3,
  Clock,
} from "lucide-react";

export const Dashboard = () => {
  const metrics = [
    {
      title: "Estudantes Ativos",
      value: "2,547",
      change: "+12% este mês",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Cursos Publicados",
      value: "47",
      change: "+3 novos",
      trend: "up" as const,
      icon: BookOpen,
    },
    {
      title: "Taxa de Conclusão",
      value: "87%",
      change: "+5% vs mês anterior",
      trend: "up" as const,
      icon: Target,
      gradient: true,
    },
    {
      title: "Receita Mensal",
      value: "R$ 28.450",
      change: "+18% este mês",
      trend: "up" as const,
      icon: DollarSign,
    },
  ];

  const recentActivities = [
    { user: "Maria Silva", action: "completou", course: "Investimentos para Iniciantes", time: "2 min atrás" },
    { user: "João Santos", action: "iniciou", course: "Planejamento Financeiro", time: "5 min atrás" },
    { user: "Ana Costa", action: "completou", course: "Renda Fixa vs Variável", time: "10 min atrás" },
    { user: "Pedro Lima", action: "iniciou", course: "Criptomoedas Básico", time: "15 min atrás" },
  ];

  const topCourses = [
    { name: "Investimentos para Iniciantes", students: 456, completion: 92 },
    { name: "Planejamento Financeiro Pessoal", students: 342, completion: 87 },
    { name: "Renda Fixa vs Renda Variável", students: 298, completion: 84 },
    { name: "Introdução às Criptomoedas", students: 215, completion: 78 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do seu projeto de educação financeira
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4" />
            Relatórios
          </Button>
          {/* Alterado 'hero' para 'default' ou 'primary' se tiver essa variante */}
          <Button variant="default"> 
            <Play className="w-4 h-4" />
            Novo Curso
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            gradient={metric.gradient}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Atividade Recente</h3>
            <Button variant="ghost" size="sm">Ver todas</Button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-foreground">{activity.user}</span>
                    {" "}<span className="text-muted-foreground">{activity.action}</span>
                    {" "}<span className="font-medium text-foreground">"{activity.course}"</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Courses */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Cursos Populares</h3>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground line-clamp-1">
                    {course.name}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {course.students} alunos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {course.completion}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col gap-2">
            <BookOpen className="w-6 h-6" />
            <span>Criar Curso</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Users className="w-6 h-6" />
            <span>Gerenciar Alunos</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <TrendingUp className="w-6 h-6" />
            <span>Ver Analytics</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <DollarSign className="w-6 h-6" />
            <span>Relatório Financeiro</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};