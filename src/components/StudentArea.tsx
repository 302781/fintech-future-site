// src/components/StudentArea.tsx
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Trophy,
  Coins,
  Target,
  BookOpen,
  Award,
  Star,
  Lock,
} from "lucide-react";

import { children, childProgressData } from "@/data/studentData"; // Importe os dados

interface StudentAreaProps {
  childId: string; // Adiciona uma prop para o ID da criança
}

const StudentArea = ({ childId }: StudentAreaProps) => {
  // Encontra os dados da criança e seu progresso
  const currentChild = children.find((child) => child.id === childId);
  const currentChildProgress = childProgressData[childId];

  // Se a criança ou o progresso não forem encontrados, você pode renderizar um estado de erro ou loading
  if (!currentChild || !currentChildProgress) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Dados do estudante não encontrados.
      </div>
    );
  }

  // Use os dados do estado global em vez de estados locais fixos
  const studentCoins = currentChild.totalCoins;
  const currentLevel = currentChild.level;
  // O totalXP não está diretamente na interface Child, então vamos manter o estado ou calcular
  const [totalXP, setTotalXP] = useState(2450); // Pode ser calculado com base em cursos/aulas/quizzes completados

  const courses = currentChildProgress.courses;
  const achievements = currentChildProgress.achievements;
  const monthlyGoals = currentChildProgress.monthlyGoals;
  const monthlyStats = currentChildProgress.monthlyStats;

  return (
    <div className="min-h-screen bg-secondary/20 pt-20">
      {/* Header com mascote */}
      <div className="bg-gradient-to-r from-primary to-trust text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Olá, {currentChild.name}! 👋</h1>
              <p className="text-xl opacity-90">
                Pronto para mais uma aventura financeira?
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-2">{currentChild.avatar}</div>
              <div className="text-sm">Nível {currentLevel}</div>
            </div>
          </div>

          {/* Stats rápidas */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Coins className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{studentCoins}</div>
              <div className="text-sm opacity-80">Moedas</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">
                {achievements.filter((a) => a.earned).length}
              </div>
              <div className="text-sm opacity-80">Medalhas</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{totalXP}</div>
              <div className="text-sm opacity-80">XP Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">📚 Cursos</TabsTrigger>
            <TabsTrigger value="progress">📊 Progresso</TabsTrigger>
            <TabsTrigger value="achievements">🏆 Conquistas</TabsTrigger>
            <TabsTrigger value="goals">🎯 Metas</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className={`hover:shadow-lg transition-all ${
                    !course.unlocked ? "opacity-60" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">📖</div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {course.title}
                            {!course.unlocked && <Lock className="h-4 w-4" />}
                          </CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Coins className="h-3 w-3" />
                        {course.coins}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>
                            {course.completedLessons}/{course.lessons} aulas
                          </span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button
                        className="w-full"
                        disabled={!course.unlocked}
                        variant={course.unlocked ? "default" : "secondary"}
                      >
                        {course.unlocked ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Continuar Curso
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Bloqueado
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Meu Progresso do Mês</CardTitle>
                <CardDescription>Veja como você está indo! 🚀</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Progresso geral */}
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-2xl font-bold mb-2">Parabéns!</h3>
                    <p className="text-muted-foreground">
                      Você completou {monthlyStats.lessonsCompleted / (monthlyStats.lessonsCompleted + monthlyStats.quizzesTaken) * 100 || 0}% das suas atividades este mês
                    </p>
                    <Progress value={monthlyStats.lessonsCompleted / (monthlyStats.lessonsCompleted + monthlyStats.quizzesTaken) * 100 || 0} className="mt-4 h-3" />
                  </div>

                  {/* Métricas do mês */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">
                        {monthlyStats.lessonsCompleted}
                      </div>
                      <div className="text-sm text-muted-foreground">Aulas Feitas</div>
                    </div>
                    <div className="text-center p-4 bg-trust/10 rounded-lg">
                      <Target className="h-8 w-8 mx-auto mb-2 text-trust" />
                      <div className="text-2xl font-bold">
                        {monthlyStats.quizzesTaken}
                      </div>
                      <div className="text-sm text-muted-foreground">Quizzes</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-100 rounded-lg">
                      <Coins className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                      <div className="text-2xl font-bold">
                        {monthlyStats.coinsEarned}
                      </div>
                      <div className="text-sm text-muted-foreground">Moedas Ganhas</div>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <Trophy className="h-8 w-8 mx-auto mb-2 text-success" />
                      <div className="text-2xl font-bold">
                        {monthlyStats.medalsBadges}
                      </div>
                      <div className="text-sm text-muted-foreground">Medalhas</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`text-center transition-all ${
                    achievement.earned
                      ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
                      : "opacity-50"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    {achievement.earned ? (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        <Award className="h-3 w-3 mr-1" />
                        Conquistado!
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Em Progresso</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Metas do Mês</CardTitle>
                  <CardDescription>
                    Complete suas metas e ganhe recompensas especiais! 🎁
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {monthlyGoals.map((goal) => (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{goal.title}</h4>
                          <span className="text-sm text-muted-foreground">
                            {goal.current}/{goal.target}
                          </span>
                        </div>
                        <Progress
                          value={(goal.current / goal.target) * 100}
                          className="h-2"
                        />
                        {goal.current >= goal.target && (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            ✅ Concluída!
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentArea;