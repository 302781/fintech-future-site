import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Filter, BookOpen, Gamepad2, Video, CheckCircle, Smile, Frown } from 'lucide-react';

const EscolaBasica = () => {
  const [currentProgress, setCurrentProgress] = useState(35);
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [completedActivities, setCompletedActivities] = useState(['game1', 'video1']);

  const contentLibrary = [
    { id: 'game1', type: 'game', title: 'Jogo da Poupança', description: 'Aprenda a guardar dinheiro de forma divertida', theme: 'poupança', completed: true },
    { id: 'game2', type: 'game', title: 'Mercadinho Virtual', description: 'Faça compras conscientes no mercado virtual', theme: 'consumo', completed: false },
    { id: 'video1', type: 'video', title: 'O que é Dinheiro?', description: 'Vídeo explicativo sobre moedas e notas', theme: 'moeda', completed: true },
    { id: 'video2', type: 'video', title: 'Necessidade vs Desejo', description: 'Aprenda a diferença entre o que precisamos e queremos', theme: 'consumo', completed: false },
    { id: 'activity1', type: 'activity', title: 'Quiz: Cofre ou Gasto?', description: 'Atividade de múltipla escolha sobre onde gastar', theme: 'poupança', completed: false },
    { id: 'activity2', type: 'activity', title: 'Arrastar Moedas', description: 'Organize as moedas do menor para o maior valor', theme: 'moeda', completed: false }
  ];

  const filteredContent = contentLibrary.filter(item => {
    if (selectedFilter === 'todos') return true;
    return item.type === selectedFilter || item.theme === selectedFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'game': return <Gamepad2 className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'activity': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleActivityComplete = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
      setCurrentProgress(prev => Math.min(prev + 10, 100));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="pt-20 px-4 max-w-6xl mx-auto">
        {/* Header do Estudante */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              J
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Olá, João!</h1>
              <p className="text-gray-600">Plano Escola Básica</p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progresso do Módulo</span>
              <span className="text-sm text-gray-600">{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-3" />
          </div>

          {/* Botão Principal */}
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg">
            <Play className="w-5 h-5 mr-2" />
            {currentProgress > 0 ? 'Continuar onde parei' : 'Iniciar primeira aula'}
          </Button>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Biblioteca de Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              <Link to="simuladores">
              <Button 
                variant={selectedFilter === 'todos' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('todos')}
              >
                Todos
              </Button>
              <Button 
                variant={selectedFilter === 'game' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('game')}
              >
                <Gamepad2 className="w-4 h-4 mr-1" />
                Jogos
              </Button>
              <Gamepad3 className="w-4 h-4 mr-1" /> 
                  Simuladores
              <Button 
                variant={selectedFilter === 'video' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('video')}
              >
                <Video className="w-4 h-4 mr-1" />
                Vídeos
              </Button>
              <Button 
                variant={selectedFilter === 'activity' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('activity')}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Atividades
              </Button>
              <Button 
                variant={selectedFilter === 'poupança' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('poupança')}
              >
                Poupança
              </Button>
              <Button 
                variant={selectedFilter === 'consumo' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('consumo')}
              >
                Consumo
              </Button>
              <Button 
                variant={selectedFilter === 'moeda' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('moeda')}
              >
                Moeda
              </Button>
              </Link>
            </div>

            {/* Grid de Conteúdo */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContent.map((item) => (
                <Card key={item.id} className={`cursor-pointer transition-all hover:shadow-md ${item.completed ? 'ring-2 ring-green-200' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <Badge variant="secondary" className="text-xs">
                          {item.theme}
                        </Badge>
                      </div>
                      {item.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={item.completed ? 'outline' : 'default'}
                      onClick={() => handleActivityComplete(item.id)}
                    >
                      {item.completed ? 'Revisar' : 'Iniciar'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Simples */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Meu Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-semibold text-gray-900">Muito bem!</p>
                <p className="text-sm text-gray-600">Continue assim!</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Smile className="w-8 h-8 text-green-500" />
                  <span className="text-2xl font-bold text-green-600">75%</span>
                </div>
                <p className="text-sm text-gray-600">Acertos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Frown className="w-8 h-8 text-red-400" />
                  <span className="text-2xl font-bold text-red-500">25%</span>
                </div>
                <p className="text-sm text-gray-600">Erros</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 pt-8 border-t-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Simuladores de Finanças</h2>
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default EscolaBasica;