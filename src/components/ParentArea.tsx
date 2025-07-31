// ParentArea.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { children, childProgress } from "@/data/studentData";
import {
  Download,
  Mail,
  MessageCircle,
  Calendar,
  BookOpen,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  Award,
  Bell,
  FileText,
  Star,
  ReceiptText, // Novo ícone para certificados
  ExternalLink // Ícone para link externo
} from "lucide-react";

import Navigation from '@/components/Navigation';

const ParentArea = () => {
  const [selectedChild, setSelectedChild] = useState(children[0]?.id || "");
  
  const currentChild = children.find(child => child.id === selectedChild);
  const currentProgress = currentChild ? childProgress[selectedChild as keyof typeof childProgress] : undefined;

  const generatePDFReport = () => {
    // Em uma aplicação real, aqui você faria uma chamada API para gerar e enviar o relatório.
    alert("Relatório PDF está sendo gerado e será enviado por email!");
  };

  const handleDownloadCertificate = (downloadLink: string | undefined) => {
    if (downloadLink) {
      // Abre o link do PDF em uma nova aba para download ou visualização
      window.open(downloadLink, '_blank');
      // Opcional: Você pode querer alertar o usuário ou mudar o status do certificado para "downloaded"
      alert("Seu certificado está sendo baixado!");
    } else {
      alert("Certificado ainda não disponível para download ou link inválido.");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 pt-20">
      {/* <Navigation /> */} 

      {/* Header */}
      <div className="bg-gradient-to-r from-trust to-primary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Área dos Responsáveis</h1>
              <p className="text-xl opacity-90">Acompanhe o progresso do seu filho</p>
            </div>
            <div className="text-6xl">👨‍👩‍👧‍👦</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Seletor de filho */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Selecione o filho:</h3>
          <div className="flex gap-4 flex-wrap">
            {children.map((child) => (
              <Card 
                key={child.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedChild === child.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedChild(child.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{child.avatar}</div>
                  <div className="font-semibold">{child.name}</div>
                  <div className="text-sm text-muted-foreground">{child.age} anos</div>
                  <Badge variant="secondary" className="mt-2">
                    Nível {child.level}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {currentChild && currentProgress ? (
          <>
            {/* Resumo geral */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{currentChild.avatar}</span>
                  Progresso de {currentChild.name}
                </CardTitle>
                <CardDescription>Visão geral do desempenho este mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{currentProgress.monthlyStats.lessonsCompleted}</div>
                    <div className="text-sm text-muted-foreground">Aulas Concluídas</div>
                  </div>
                  <div className="text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-2xl font-bold">{currentProgress.monthlyStats.medalsBadges}</div>
                    <div className="text-sm text-muted-foreground">Medalhas</div>
                  </div>
                  <div className="text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-trust" />
                    <div className="text-2xl font-bold">{currentProgress.monthlyStats.studyTime}</div>
                    <div className="text-sm text-muted-foreground">Tempo de Estudo</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold">{currentProgress.monthlyStats.accessFrequency}</div>
                    <div className="text-sm text-muted-foreground">Dias Ativos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="progress" className="space-y-8">
              {/* Ajuste o grid-cols para incluir a nova aba */}
              <TabsList className="grid w-full grid-cols-6"> 
                <TabsTrigger value="progress">📊 Progresso</TabsTrigger>
                <TabsTrigger value="topics">📚 Tópicos</TabsTrigger>
                <TabsTrigger value="quizzes">🧠 Quizzes</TabsTrigger>
                <TabsTrigger value="achievements">🏆 Conquistas</TabsTrigger>
                <TabsTrigger value="certificates">📜 Certificados</TabsTrigger> {/* NOVA ABA */}
                <TabsTrigger value="communication">💬 Comunicação</TabsTrigger>
              </TabsList>

              <TabsContent value="progress">
                {/* Conteúdo de Progresso (inalterado) */}
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequência de Acesso</CardTitle>
                      <CardDescription>Últimos 30 dias</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <TrendingUp className="h-16 w-16 mx-auto mb-4 text-success" />
                        <h3 className="text-2xl font-bold mb-2">Excelente frequência!</h3>
                        <p className="text-muted-foreground mb-4">
                          {currentChild.name} acessou a plataforma {currentProgress.monthlyStats.accessFrequency} dos últimos 30 dias
                        </p>
                        <Progress value={(currentProgress.monthlyStats.accessFrequency / 30) * 100} className="max-w-md mx-auto" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Relatórios</CardTitle>
                      <CardDescription>Baixe relatórios detalhados ou configure notificações</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={generatePDFReport} className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar Relatório PDF
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Mail className="h-4 w-4 mr-2" />
                          Notificações por Email
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Bell className="h-4 w-4 mr-2" />
                          Configurar Alertas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="topics">
                {/* Conteúdo de Tópicos (inalterado) */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tópicos Estudados</CardTitle>
                    <CardDescription>Progresso detalhado por módulo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentProgress.recentTopics.map((topic, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{topic.topic}</h4>
                              <p className="text-sm text-muted-foreground">Estudado em {topic.date}</p>
                            </div>
                            <Badge 
                              variant={topic.completion === 100 ? "default" : "secondary"}
                              className={topic.completion === 100 ? "bg-success" : ""}
                            >
                              {topic.completion}%
                            </Badge>
                          </div>
                          <Progress value={topic.completion} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quizzes">
                {/* Conteúdo de Quizzes (inalterado) */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resultados dos Quizzes</CardTitle>
                    <CardDescription>Desempenho nas avaliações</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentProgress.quizResults.map((quiz, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">📝</div>
                            <div>
                              <h4 className="font-medium">{quiz.quiz}</h4>
                              <p className="text-sm text-muted-foreground">{quiz.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              quiz.score >= 90 ? 'text-success' : 
                              quiz.score >= 70 ? 'text-yellow-600' : 'text-destructive'
                            }`}>
                              {quiz.score}%
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${
                                    i < Math.ceil(quiz.score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                {/* Conteúdo de Conquistas (inalterado) */}
                <Card>
                  <CardHeader>
                    <CardTitle>Conquistas Desbloqueadas</CardTitle>
                    <CardDescription>Medalhas e certificados conquistados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {currentProgress.achievements.map((achievement, index) => (
                        <div key={index} className="text-center p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
                          <div className="text-4xl mb-2">{achievement.icon}</div>
                          <h4 className="font-semibold mb-1">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                          <Badge className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                            <Award className="h-3 w-3 mr-1" />
                            Conquistado
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* NOVA ABA DE CERTIFICADOS */}
              <TabsContent value="certificates">
                <Card>
                  <CardHeader>
                    <CardTitle>Certificados Emitidos</CardTitle>
                    <CardDescription>
                      Visualize e baixe os certificados de conclusão dos cursos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentProgress.certificates.length > 0 ? (
                      <div className="grid gap-4">
                        {currentProgress.certificates.map((cert) => (
                          <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                            <div className="flex items-center gap-4">
                              <ReceiptText className="h-8 w-8 text-primary" />
                              <div>
                                <h4 className="font-semibold">{cert.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Curso: {cert.courseName} | Emitido em: {cert.dateIssued}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {cert.status === "issued" && cert.downloadLink ? (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleDownloadCertificate(cert.downloadLink)}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Baixar PDF
                                </Button>
                              ) : cert.status === "pending" ? (
                                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pendente
                                </Badge>
                              ) : (
                                <Badge variant="secondary">
                                  Status: {cert.status}
                                </Badge>
                              )}
                              {/* Opcional: botão para ver detalhes, se o certificado tiver uma página própria */}
                              {/* <Button variant="ghost" size="icon">
                                <ExternalLink className="h-4 w-4" />
                              </Button> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-4">
                        Nenhum certificado emitido para {currentChild.name} ainda.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="communication">
                {/* Conteúdo de Comunicação (inalterado) */}
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Canal de Comunicação</CardTitle>
                      <CardDescription>Conecte-se com educadores e receba feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full justify-start" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Conversar com o Professor
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Feedback Recebido
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar Reunião
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Últimas Mensagens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-primary pl-4">
                          <h5 className="font-medium">Professora Ana Silva</h5>
                          <p className="text-sm text-muted-foreground mb-1">João está indo muito bem! Parabéns pelo empenho na área de poupança.</p>
                          <span className="text-xs text-muted-foreground">15/01/2024</span>
                        </div>
                        <div className="border-l-4 border-trust pl-4">
                          <h5 className="font-medium">Coordenação Pedagógica</h5>
                          <p className="text-sm text-muted-foreground mb-1">Relatório mensal disponível para download. Excelente progresso!</p>
                          <span className="text-xs text-muted-foreground">10/01/2024</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <p className="text-center text-lg text-muted-foreground">Selecione um filho para ver o progresso.</p>
        )}
      </div>
    </div>
  );
};

export default ParentArea;