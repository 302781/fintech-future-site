import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users,
  BookOpen,
  Trophy,
  Clock,
  Send,
  PlusCircle,
  Star,
  Target,
  BarChart3, // Adicionado para "Desempenho" na Tabs
  MessageSquare, // Adicionado para "Feedback" na Tabs
  FileText, // Adicionado para "Atividades" na Tabs
  ClipboardList, // Ícone para atividades
  CheckCircle, // Ícone para feedback positivo
  AlertTriangle, // Ícone para feedback de atenção
  Lightbulb, // Ícone para feedback construtivo
} from "lucide-react";

const EducatorArea = () => {
  const [selectedClass, setSelectedClass] = useState("turma-a"); // Estado para a turma selecionada
  const [activeTab, setActiveTab] = useState("students"); // Novo estado para a aba ativa

  const classes = [
    {
      id: "turma-a",
      name: "Turma A - 3º Ano",
      students: 24,
      averageProgress: 72,
      activeStudents: 22
    },
    {
      id: "turma-b",
      name: "Turma B - 4º Ano",
      students: 28,
      averageProgress: 85,
      activeStudents: 26
    },
    {
      id: "turma-c",
      name: "Turma C - 5º Ano",
      students: 22,
      averageProgress: 91,
      activeStudents: 20
    }
  ];

  const students = [
    {
      id: "joao",
      name: "João Silva",
      class: "turma-a",
      progress: 75,
      lastAccess: "Hoje",
      coinsEarned: 850,
      lessonsCompleted: 12,
      avgQuizScore: 85
    },
    {
      id: "maria",
      name: "Maria Santos",
      class: "turma-a",
      progress: 92,
      lastAccess: "Hoje",
      coinsEarned: 1240,
      lessonsCompleted: 18,
      avgQuizScore: 94
    },
    {
      id: "pedro",
      name: "Pedro Costa",
      class: "turma-a",
      progress: 45,
      lastAccess: "3 dias atrás",
      coinsEarned: 320,
      lessonsCompleted: 6,
      avgQuizScore: 68
    },
    {
      id: "ana",
      name: "Ana Oliveira",
      class: "turma-b",
      progress: 88,
      lastAccess: "2 dias atrás",
      coinsEarned: 1020,
      lessonsCompleted: 15,
      avgQuizScore: 90
    },
    {
      id: "carlos",
      name: "Carlos Mendes",
      class: "turma-b",
      progress: 60,
      lastAccess: "Ontem",
      coinsEarned: 500,
      lessonsCompleted: 8,
      avgQuizScore: 72
    }
  ];

  // Filtra os alunos com base na turma selecionada
  const currentClass = classes.find(c => c.id === selectedClass);
  const classStudents = students.filter(s => s.class === selectedClass);

  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    type: "",
    targetClass: "",
    dueDate: ""
  });

  const [feedbackMessage, setFeedbackMessage] = useState({
    student: "",
    message: "",
    type: "positive"
  });

  const createActivity = () => {
    if (!newActivity.title || !newActivity.description || !newActivity.type || !newActivity.targetClass || !newActivity.dueDate) {
      alert("Por favor, preencha todos os campos para criar a atividade.");
      return;
    }
    console.log("Criando atividade:", newActivity);
    alert("Atividade criada com sucesso!");
    setNewActivity({ title: "", description: "", type: "", targetClass: "", dueDate: "" });
  };

  const sendFeedback = () => {
    if (!feedbackMessage.student || !feedbackMessage.message || !feedbackMessage.type) {
      alert("Por favor, preencha todos os campos para enviar o feedback.");
      return;
    }
    console.log("Enviando feedback:", feedbackMessage);
    alert("Feedback enviado para os responsáveis!");
    setFeedbackMessage({ student: "", message: "", type: "positive" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20"> {/* Ajuste no fundo e dark mode */}
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A247E] to-[#5B7BF0] text-white py-12 shadow-lg"> {/* Cores FinanceEdu */}
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Painel do Educador</h1>
              <p className="text-lg md:text-xl opacity-90">Gerencie suas turmas e acompanhe o progresso dos alunos da FinanceEdu</p> {/* Contexto da marca */}
            </div>
            <div className="text-6xl md:text-7xl animate-pulse">👩‍🏫</div> {/* Animação no emoji */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Visão geral das turmas */}
        <div className="mb-12"> {/* Aumenta margem inferior */}
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Suas Turmas Ativas:</h3> {/* Título mais proeminente */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Gap e responsividade melhorados */}
            {classes.map((classItem) => (
              <Card
                key={classItem.id}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl
                            ${selectedClass === classItem.id ? 'ring-4 ring-[#1A247E] dark:ring-[#5B7BF0] bg-[#1A247E]/10 dark:bg-[#5B7BF0]/10' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}
                          `}
                onClick={() => setSelectedClass(classItem.id)}
              >
                <CardHeader className="pb-4"> {/* Padding ajustado */}
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white"> {/* Título maior */}
                    <Users className="h-6 w-6 text-[#1A247E] dark:text-[#5B7BF0]" /> {/* Ícone colorido */}
                    {classItem.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4"> {/* Padding ajustado */}
                  <div className="space-y-4"> {/* Espaçamento interno */}
                    <div className="flex justify-between items-center">
                      <span className="text-base text-gray-600 dark:text-gray-300">Total de Alunos:</span>
                      <span className="font-bold text-lg text-gray-800 dark:text-white">{classItem.students}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base text-gray-600 dark:text-gray-300">Alunos Ativos:</span>
                      <span className="font-bold text-lg text-green-600 dark:text-green-400">{classItem.activeStudents}</span>
                    </div>
                    <div className="space-y-2"> {/* Espaçamento para o progresso */}
                      <div className="flex justify-between items-center">
                        <span className="text-base text-gray-600 dark:text-gray-300">Progresso Médio da Turma:</span>
                        <span className="font-bold text-lg text-primary">{classItem.averageProgress}%</span>
                      </div>
                      <Progress value={classItem.averageProgress} className="h-3 bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-[#1A247E] dark:bg-[#5B7BF0]" /> {/* Progresso mais visível */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {currentClass && (
          <Tabs defaultValue="students" value={activeTab} onValueChange={setActiveTab} className="space-y-8"> {/* Controla a aba com estado */}
            <TabsList className="grid w-full grid-cols-4 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg shadow-sm"> {/* Estilo da lista de abas */}
              <TabsTrigger value="students" className="data-[state=active]:bg-[#1A247E] data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-[#5B7BF0] dark:data-[state=active]:text-gray-900 transition-colors py-2"> {/* Estilo das abas */}
                <Users className="h-5 w-5 mr-2" /> Alunos
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-[#1A247E] data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-[#5B7BF0] dark:data-[state=active]:text-gray-900 transition-colors py-2">
                <BarChart3 className="h-5 w-5 mr-2" /> Desempenho
              </TabsTrigger>
              <TabsTrigger value="activities" className="data-[state=active]:bg-[#1A247E] data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-[#5B7BF0] dark:data-[state=active]:text-gray-900 transition-colors py-2">
                <FileText className="h-5 w-5 mr-2" /> Atividades
              </TabsTrigger>
              <TabsTrigger value="feedback" className="data-[state=active]:bg-[#1A247E] data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-[#5B7BF0] dark:data-[state=active]:text-gray-900 transition-colors py-2">
                <MessageSquare className="h-5 w-5 mr-2" /> Feedback
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
                    <Users className="h-6 w-6 text-[#1A247E] dark:text-[#5B7BF0]" /> Alunos - {currentClass.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Gerencie e acompanhe o progresso individual de cada aluno da sua turma.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classStudents.length > 0 ? (
                      classStudents.map((student) => (
                        <Card key={student.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-700 dark:border-gray-600">
                          <div className="flex items-center gap-4 mb-4 sm:mb-0">
                            <div className="text-4xl">🧑‍🎓</div> {/* Emoji mais neutro */}
                            <div>
                              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{student.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Último acesso: <span className="font-medium">{student.lastAccess}</span>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center w-full sm:w-auto">
                            <div className="flex flex-col items-center">
                              <div className="text-xl font-bold text-[#1A247E] dark:text-[#5B7BF0]">{student.progress}%</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Progresso</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-xl font-bold text-yellow-500">{student.coinsEarned}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Moedas</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-xl font-bold text-green-600 dark:text-green-400">{student.lessonsCompleted}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Aulas C.</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <Badge
                                variant={student.avgQuizScore >= 80 ? "default" : "destructive"}
                                className={`text-sm px-3 py-1 rounded-full ${student.avgQuizScore >= 80 ? "bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800" : "bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-800"}`}
                              >
                                {student.avgQuizScore}% Quiz
                              </Badge>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Média Quiz</div>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">Nenhum aluno encontrado para esta turma.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid gap-6">
                <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
                      <BarChart3 className="h-6 w-6 text-[#1A247E] dark:text-[#5B7BF0]" /> Análise de Desempenho - {currentClass.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Métricas detalhadas de engajamento e conclusão para a turma selecionada.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-[#1A247E]/10 dark:bg-blue-900/20 rounded-lg flex flex-col items-center justify-center border border-[#1A247E]/20 dark:border-blue-900/30">
                        <BookOpen className="h-10 w-10 mb-2 text-[#1A247E] dark:text-[#5B7BF0]" />
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">156</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Aulas Concluídas</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex flex-col items-center justify-center border border-yellow-200 dark:border-yellow-900/30">
                        <Trophy className="h-10 w-10 mb-2 text-yellow-600 dark:text-yellow-400" />
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">89</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Medalhas Ganhas</div>
                      </div>
                      <div className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg flex flex-col items-center justify-center border border-green-200 dark:border-green-900/30">
                        <Target className="h-10 w-10 mb-2 text-green-600 dark:text-green-400" />
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">78%</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Taxa de Conclusão</div>
                      </div>
                      <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex flex-col items-center justify-center border border-blue-200 dark:border-blue-900/30">
                        <Clock className="h-10 w-10 mb-2 text-blue-600 dark:text-blue-400" />
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">4.2h</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Tempo Médio Ativo</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
                      <TrendingUp className="h-6 w-6 text-[#1A247E] dark:text-[#5B7BF0]" /> Progresso Individual
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Visualize o progresso de cada aluno da {currentClass.name}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {classStudents.length > 0 ? (
                        classStudents.map((student) => (
                          <div key={student.id} className="space-y-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-900 dark:text-white">{student.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-primary dark:text-[#5B7BF0]">{student.progress}%</span>
                                {student.progress >= 80 && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                              </div>
                            </div>
                            <Progress value={student.progress} className="h-2 bg-gray-200 dark:bg-gray-600" indicatorClassName="bg-[#1A247E] dark:bg-[#5B7BF0]" />
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground py-4">Nenhum aluno para exibir progresso nesta turma.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activities">
              <div className="grid gap-6">
                <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
                      <PlusCircle className="h-6 w-6 text-[#1A247E] dark:text-[#5B7BF0]" /> Criar Nova Atividade
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Desenvolva e atribua atividades personalizadas para seus alunos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6"> {/* Mais espaçamento */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Ajuste para responsividade */}
                        <div>
                          <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Título da Atividade</Label>
                          <Input
                            id="title"
                            value={newActivity.title}
                            onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                            placeholder="Ex: Quiz sobre Poupança e Investimentos"
                            className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type" className="text-gray-700 dark:text-gray-300">Tipo de Atividade</Label>
                          <Select
                            value={newActivity.type}
                            onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                          >
                            <SelectTrigger className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                              <SelectItem value="quiz">Quiz Interativo <Zap className="inline-block ml-2 h-4 w-4" /></SelectItem>
                              <SelectItem value="video">Vídeo Aula <BookOpen className="inline-block ml-2 h-4 w-4" /></SelectItem>
                              <SelectItem value="game">Jogo Educativo <Trophy className="inline-block ml-2 h-4 w-4" /></SelectItem>
                              <SelectItem value="exercise">Exercício Prático <FileText className="inline-block ml-2 h-4 w-4" /></SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Descrição Detalhada</Label>
                        <Textarea
                          id="description"
                          value={newActivity.description}
                          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                          placeholder="Descreva os objetivos, conteúdo e instruções da atividade. Ex: 'Este quiz aborda os fundamentos da poupança, conceitos de juros simples e compostos...'"
                          rows={4}
                          className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="targetClass" className="text-gray-700 dark:text-gray-300">Turma Alvo</Label>
                          <Select
                            value={newActivity.targetClass}
                            onValueChange={(value) => setNewActivity({ ...newActivity, targetClass: value })}
                          >
                            <SelectTrigger className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Selecione a turma" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                              {classes.map((classItem) => (
                                <SelectItem key={classItem.id} value={classItem.id}>
                                  {classItem.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="dueDate" className="text-gray-700 dark:text-gray-300">Data Limite de Entrega</Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={newActivity.dueDate}
                            onChange={(e) => setNewActivity({ ...newActivity, dueDate: e.target.value })}
                            className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          />
                        </div>
                      </div>

                      <Button onClick={createActivity} className="w-full bg-[#1A247E] hover:bg-[#2C3B90] text-white dark:bg-[#5B7BF0] dark:hover:bg-[#7a9cf5]">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Criar Nova Atividade
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
                      <ClipboardList className="h-6 w-6 text-[#1A247E] dark:text-[#5B7BF0]" /> Atividades Recentes
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Visão geral das atividades criadas e seu status de conclusão.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">🧠</div>
                          <div>
                            <h4 className="font-medium text-lg text-gray-900 dark:text-white">Quiz sobre Mesada e Orçamento</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Turma A - Criado em 15/07/2025</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm">18/24 Concluídos</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">🎮</div>
                          <div>
                            <h4 className="font-medium text-lg text-gray-900 dark:text-white">Jogo da Poupança Inteligente</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Turma B - Criado em 12/07/2025</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm">22/28 Concluídos</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">🎬</div>
                          <div>
                            <h4 className="font-medium text-lg text-gray-900 dark:text-white">Vídeo Aula: O Valor do Dinheiro</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Turma C - Criado em 08/07/2025</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 text-sm">20/22 Concluídos</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="feedback">
              <div className="grid gap-6">
                <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
                      <Send className="h-6 w-6 text-[#1A247E] dark:text-[#5B7BF0]" /> Enviar Feedback para Responsáveis
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Comunique-se diretamente com os pais ou responsáveis sobre o progresso e desenvolvimento dos alunos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="studentSelect" className="text-gray-700 dark:text-gray-300">Selecionar Aluno</Label>
                          <Select
                            value={feedbackMessage.student}
                            onValueChange={(value) => setFeedbackMessage({ ...feedbackMessage, student: value })}
                          >
                            <SelectTrigger className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Escolha um aluno" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                {classStudents.length > 0 ? (
                                    classStudents.map((student) => (
                                        <SelectItem key={student.id} value={student.id}>
                                            {student.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-2">Nenhum aluno disponível</p>
                                )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="feedbackType" className="text-gray-700 dark:text-gray-300">Tipo de Feedback</Label>
                          <Select
                            value={feedbackMessage.type}
                            onValueChange={(value) => setFeedbackMessage({ ...feedbackMessage, type: value })}
                          >
                            <SelectTrigger className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                              <SelectItem value="positive">Positivo <CheckCircle className="inline-block ml-2 h-4 w-4 text-green-500" /></SelectItem>
                              <SelectItem value="constructive">Construtivo <Lightbulb className="inline-block ml-2 h-4 w-4 text-yellow-500" /></SelectItem>
                              <SelectItem value="attention">Atenção necessária <AlertTriangle className="inline-block ml-2 h-4 w-4 text-orange-500" /></SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Mensagem do Feedback</Label>
                        <Textarea
                          id="message"
                          value={feedbackMessage.message}
                          onChange={(e) => setFeedbackMessage({ ...feedbackMessage, message: e.target.value })}
                          placeholder="Escreva seu feedback detalhado sobre o desempenho do aluno..."
                          rows={5}
                          className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                      </div>

                      <Button onClick={sendFeedback} className="w-full bg-[#1A247E] hover:bg-[#2C3B90] text-white dark:bg-[#5B7BF0] dark:hover:bg-[#7a9cf5]">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Feedback
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
                      <MessageSquare className="h-6 w-6 text-[#1A247E] dark:text-[#5B7BF0]" /> Mensagens Recentes
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Histórico dos feedbacks enviados aos responsáveis.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50/50 dark:bg-green-900/10 rounded-r-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-lg text-gray-900 dark:text-white">Para: Responsáveis de Maria Santos</h5>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              Maria tem demonstrado excelente progresso em educação financeira. Parabéns pelo incentivo em casa! Ela concluiu 92% das aulas.
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">15/07/2025</span>
                        </div>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50/50 dark:bg-orange-900/10 rounded-r-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-lg text-gray-900 dark:text-white">Para: Responsáveis de Pedro Costa</h5>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              Pedro está um pouco atrasado nas atividades (45% de progresso). Sugiro dedicar mais tempo ao estudo em casa para ele recuperar o ritmo.
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">12/07/2025</span>
                        </div>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 dark:bg-blue-900/10 rounded-r-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-lg text-gray-900 dark:text-white">Para: Responsáveis de João Silva</h5>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              João está se saindo bem nas aulas (75% de progresso) e tem participado ativamente. Ótimo trabalho!
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">10/07/2025</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default EducatorArea;