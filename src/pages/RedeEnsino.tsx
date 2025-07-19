import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, Crown, MessageCircle, Users, Target, Calendar,
  TrendingUp, Globe, Award, MapPin, Zap, BarChart3,
  QrCode, HeadphonesIcon, FileText, Brain, Lightbulb
} from 'lucide-react';

const RedeEnsino = () => {
  const [globalRank, setGlobalRank] = useState(147);
  const [networkStats, setNetworkStats] = useState({
    totalSchools: 45,
    activeStudents: 12500,
    completedCourses: 45000
  });

  const adaptiveSuggestions = [
    { 
      title: 'Foque em Matemática Financeira', 
      reason: 'Baseado no seu desempenho, você se beneficiaria destes exercícios',
      difficulty: 'medium',
      estimatedTime: '20 min'
    },
    { 
      title: 'Revisão: Conceitos de Juros', 
      reason: 'Identifiquei algumas dificuldades neste tópico',
      difficulty: 'easy',
      estimatedTime: '15 min'
    },
    { 
      title: 'Desafio Avançado: Portfólio', 
      reason: 'Você está pronto para conteúdos mais complexos',
      difficulty: 'hard',
      estimatedTime: '45 min'
    }
  ];

  const networkChallenges = [
    { 
      id: 1, 
      title: 'Campeonato Regional de Finanças', 
      period: 'Dezembro 2024',
      participants: 850,
      prize: 'Certificado + Tablet',
      status: 'active'
    },
    { 
      id: 2, 
      title: 'Desafio Sustentabilidade', 
      period: 'Janeiro 2025',
      participants: 1200,
      prize: 'Viagem Educativa',
      status: 'upcoming'
    }
  ];

  const learningPaths = [
    { 
      id: 1, 
      title: 'Trilha Sudeste: Empreendedorismo', 
      region: 'SP, RJ, MG, ES',
      progress: 65,
      modules: 8,
      difficulty: 'intermediate'
    },
    { 
      id: 2, 
      title: 'Trilha Norte: Economia Local', 
      region: 'AM, PA, AC, RO',
      progress: 30,
      modules: 6,
      difficulty: 'basic'
    }
  ];

  const globalRanking = [
    { position: 1, school: 'Colégio Santa Maria - SP', students: 145, avgScore: 94.5 },
    { position: 2, school: 'Instituto Federal - RJ', students: 280, avgScore: 92.1 },
    { position: 3, school: 'Escola Técnica - MG', students: 95, avgScore: 91.8 },
    { position: 4, school: 'Colégio Dom Bosco - RS', students: 180, avgScore: 89.5 },
    { position: 5, school: 'Nossa Escola - BA', students: 120, avgScore: 88.7, isMe: true }
  ];

  const certificates = [
    { id: 1, title: 'Especialista em Investimentos Básicos', date: '2024-10-15', verified: true },
    { id: 2, title: 'Consumo Consciente Avançado', date: '2024-09-22', verified: true },
    { id: 3, title: 'Planejamento Financeiro Familiar', date: '2024-08-10', verified: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-100">
      <Navigation />
      
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Header Personalizado da Rede */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <img src="/placeholder-logo.png" alt="Logo da Rede" className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Bem-vindo, Estudante!</h1>
                <p className="text-emerald-100">Rede Nacional de Educação Financeira</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Ranking Global: #{globalRank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{networkStats.activeStudents.toLocaleString()} estudantes ativos</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                <QrCode className="w-4 h-4 mr-2" />
                QR Login
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Suporte 24/7
              </Button>
            </div>
          </div>

          {/* Estatísticas da Rede */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">{networkStats.totalSchools}</div>
                  <div className="text-emerald-100 text-sm">Escolas na Rede</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">{networkStats.completedCourses.toLocaleString()}</div>
                  <div className="text-emerald-100 text-sm">Cursos Concluídos</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-emerald-100 text-sm">Taxa de Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Inteligência Adaptativa */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Sugestões Personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adaptiveSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          {suggestion.title}
                        </h4>
                        <Badge variant={
                          suggestion.difficulty === 'easy' ? 'secondary' : 
                          suggestion.difficulty === 'medium' ? 'default' : 
                          'destructive'
                        }>
                          {suggestion.difficulty === 'easy' ? 'Fácil' : 
                           suggestion.difficulty === 'medium' ? 'Médio' : 'Avançado'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{suggestion.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">⏱ {suggestion.estimatedTime}</span>
                        <Button size="sm">Começar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trilhas Regionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Trilhas Regionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths.map((path) => (
                    <div key={path.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{path.title}</h4>
                          <p className="text-sm text-gray-600">{path.region}</p>
                        </div>
                        <Badge variant="outline">{path.modules} módulos</Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progresso</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                      <Button size="sm" className="w-full">
                        Continuar Trilha
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eventos e Campeonatos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  Eventos da Rede
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <Badge variant={challenge.status === 'active' ? 'default' : 'secondary'}>
                          {challenge.status === 'active' ? 'Ativo' : 'Em Breve'}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>📅 {challenge.period}</div>
                        <div>👥 {challenge.participants} participantes</div>
                        <div>🏆 {challenge.prize}</div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        disabled={challenge.status !== 'active'}
                      >
                        {challenge.status === 'active' ? 'Participar' : 'Aguardar'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ranking Global */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Ranking Global de Escolas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {globalRanking.map((school) => (
                    <div key={school.position} className={`p-3 rounded-lg border ${school.isMe ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs font-bold">
                          {school.position}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{school.school}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{school.students} alunos</span>
                            <span>•</span>
                            <span>{school.avgScore}% média</span>
                          </div>
                        </div>
                        {school.isMe && <Badge variant="secondary" className="text-xs">Sua Escola</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificados Digitais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Meus Certificados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{cert.title}</h4>
                        {cert.verified && (
                          <Badge variant="default" className="text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{cert.date}</p>
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        Baixar PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Acesso Rápido */}
            <Card>
              <CardHeader>
                <CardTitle>Acesso Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat com Suporte
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    Fórum da Rede
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Relatórios Detalhados
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Portal da Rede
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeEnsino;