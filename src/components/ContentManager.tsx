import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Play,
  Users,
  Clock,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  MoreHorizontal,
} from "lucide-react";

export const ContentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: 1,
      title: "Investimentos para Iniciantes",
      description: "Aprenda os fundamentos dos investimentos e como começar sua jornada financeira.",
      status: "published",
      students: 456,
      duration: "4h 30min",
      rating: 4.8,
      lastUpdated: "2 dias atrás",
      category: "Investimentos",
    },
    {
      id: 2,
      title: "Planejamento Financeiro Pessoal",
      description: "Como organizar suas finanças e criar um plano para alcançar seus objetivos.",
      status: "draft",
      students: 0,
      duration: "3h 15min",
      rating: 0,
      lastUpdated: "1 semana atrás",
      category: "Planejamento",
    },
    {
      id: 3,
      title: "Renda Fixa vs Renda Variável",
      description: "Entenda as diferenças e quando investir em cada tipo de aplicação.",
      status: "published",
      students: 298,
      duration: "2h 45min",
      rating: 4.6,
      lastUpdated: "5 dias atrás",
      category: "Investimentos",
    },
    {
      id: 4,
      title: "Introdução às Criptomoedas",
      description: "O que são criptomoedas e como funcionam no mercado financeiro.",
      status: "review",
      students: 0,
      duration: "5h 20min",
      rating: 0,
      lastUpdated: "3 dias atrás",
      category: "Criptomoedas",
    },
  ];

  const getStatusBadge = (status: string) => {
    // Mapeia o status para as VARIANTS PERMITIDAS pelo componente Badge do shadcn/ui
    // 'success' -> 'default' ou 'outline' ou até mesmo um estilo personalizado via className
    // 'warning' -> 'secondary' ou 'outline'
    const variantMap = {
      published: "default", // Usaremos 'default' para publicado, ou 'outline'
      draft: "secondary",
      review: "outline", // Usaremos 'outline' para em revisão
    } as const;
    
    // Mapeia o status para o texto que aparece na Badge
    const labels = {
      published: "Publicado",
      draft: "Rascunho",
      review: "Em Revisão",
    } as const;

    const badgeVariant = variantMap[status as keyof typeof variantMap] || "secondary";

    // Adiciona classes personalizadas para cores, já que 'success' e 'warning' não são variantes diretas.
    // Isso é uma alternativa se você não quiser modificar o badge.tsx
    const customClasses = {
      published: "bg-green-500 text-white", // Exemplo de cor para 'published'
      draft: "bg-gray-400 text-white",     // Exemplo de cor para 'draft'
      review: "bg-yellow-500 text-white",   // Exemplo de cor para 'review'
    };

    return (
      <Badge
        variant={badgeVariant}
        className={customClasses[status as keyof typeof customClasses] || ""} // Aplica classes personalizadas
      >
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Conteúdo</h1>
          <p className="text-muted-foreground">
            Gerencie seus cursos e materiais educativos
          </p>
        </div>
        {/* Substituído variant="hero" por variant="default" (ou "primary" se você tiver customizado) */}
        <Button variant="default"> 
          <Plus className="w-4 h-4" />
          Novo Curso
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              Status
            </Button>
          </div>
        </div>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden group hover:shadow-soft transition-all duration-200 hover:scale-105">
            <div className="aspect-video bg-gradient-primary/10 flex items-center justify-center">
              <Play className="w-12 h-12 text-primary" />
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(course.status)}
                <Badge variant="outline">{course.category}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {course.students} alunos
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>
                {course.rating > 0 && (
                  <>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {course.rating} ⭐
                    </div>
                    <div className="text-right">
                      {course.lastUpdated}
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-3 h-3" />
                  Visualizar
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                  <Edit className="w-3 h-3" />
                  Editar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-foreground">47</h3>
          <p className="text-sm text-muted-foreground">Total de Cursos</p>
        </Card>
        <Card className="p-6 text-center">
          <Users className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-foreground">2,547</h3>
          <p className="text-sm text-muted-foreground">Total de Alunos</p>
        </Card>
        <Card className="p-6 text-center">
          <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-foreground">87%</h3>
          <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
        </Card>
      </div>
    </div>
  );
};