import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Play, 
  Gamepad2, 
  FileText, 
  Clock, 
  Star,
  Heart,
  Users,
  Target,
  TrendingUp,
  Award,
  Lightbulb,
  PiggyBank,
  DollarSign,
  Calculator,
  ShoppingCart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContextHook';

// Tipos de conteúdo da biblioteca
interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'game' | 'activity';
  theme: string;
  duration: number; // em minutos
  difficulty: 'facil' | 'medio' | 'dificil';
  tags: string[];
  icon: React.ReactNode;
  thumbnail?: string;
  completionRate?: number;
  likes?: number;
  isNew?: boolean;
  planAccess: string[];
}

const libraryContent: LibraryItem[] = [
  // Conteúdo Básico
  {
    id: 'vid-basic-1',
    title: 'O que é Dinheiro?',
    description: 'Descubra como o dinheiro surgiu e por que ele é importante no nosso dia a dia.',
    type: 'video',
    theme: 'fundamentos',
    duration: 8,
    difficulty: 'facil',
    tags: ['Básico', 'História', 'Conceitos'],
    icon: <DollarSign className="w-6 h-6" />,
    completionRate: 85,
    likes: 124,
    planAccess: ['Escola Básica', 'Escola Premium', 'Rede de Ensino']
  },
  {
    id: 'game-basic-1',
    title: 'Jogo do Cofrinho',
    description: 'Ajude a Mia a juntar moedas no cofrinho e aprender sobre poupança.',
    type: 'game',
    theme: 'poupança',
    duration: 15,
    difficulty: 'facil',
    tags: ['Jogo', 'Poupança', 'Interativo'],
    icon: <PiggyBank className="w-6 h-6" />,
    completionRate: 92,
    likes: 203,
    isNew: true,
    planAccess: ['Escola Básica', 'Escola Premium', 'Rede de Ensino']
  },
  {
    id: 'act-basic-1',
    title: 'Quero ou Preciso?',
    description: 'Atividade para distinguir entre desejos e necessidades básicas.',
    type: 'activity',
    theme: 'consumo',
    duration: 12,
    difficulty: 'facil',
    tags: ['Atividade', 'Consumo', 'Decisão'],
    icon: <ShoppingCart className="w-6 h-6" />,
    completionRate: 78,
    likes: 156,
    planAccess: ['Escola Básica', 'Escola Premium', 'Rede de Ensino']
  },

  // Conteúdo Premium
  {
    id: 'vid-prem-1',
    title: 'Investimentos para Jovens',
    description: 'Aprenda os conceitos básicos de investimento de forma simples e divertida.',
    type: 'video',
    theme: 'investimentos',
    duration: 12,
    difficulty: 'medio',
    tags: ['Investimentos', 'Intermediário', 'Futuro'],
    icon: <TrendingUp className="w-6 h-6" />,
    completionRate: 67,
    likes: 189,
    planAccess: ['Escola Premium', 'Rede de Ensino']
  },
  {
    id: 'game-prem-1',
    title: 'Simulador de Negócios',
    description: 'Gerencie uma lojinha virtual e tome decisões financeiras inteligentes.',
    type: 'game',
    theme: 'empreendedorismo',
    duration: 25,
    difficulty: 'medio',
    tags: ['Simulação', 'Negócios', 'Estratégia'],
    icon: <Target className="w-6 h-6" />,
    completionRate: 54,
    likes: 267,
    isNew: true,
    planAccess: ['Escola Premium', 'Rede de Ensino']
  },
  {
    id: 'act-prem-1',
    title: 'Planejando Meu Orçamento',
    description: 'Crie seu primeiro orçamento pessoal com nossa ferramenta interativa.',
    type: 'activity',
    theme: 'planejamento',
    duration: 20,
    difficulty: 'medio',
    tags: ['Orçamento', 'Planejamento', 'Prática'],
    icon: <Calculator className="w-6 h-6" />,
    completionRate: 71,
    likes: 198,
    planAccess: ['Escola Premium', 'Rede de Ensino']
  },

  // Conteúdo Rede de Ensino
  {
    id: 'vid-rede-1',
    title: 'Mercado Financeiro Brasileiro',
    description: 'Entenda como funciona a bolsa de valores e os principais indicadores econômicos.',
    type: 'video',
    theme: 'mercado-financeiro',
    duration: 18,
    difficulty: 'dificil',
    tags: ['Avançado', 'Bolsa', 'Economia'],
    icon: <TrendingUp className="w-6 h-6" />,
    completionRate: 43,
    likes: 312,
    planAccess: ['Rede de Ensino']
  },
  {
    id: 'game-rede-1',
    title: 'Trading Challenge',
    description: 'Compete com outros estudantes em simulações de trading em tempo real.',
    type: 'game',
    theme: 'investimentos-avançados',
    duration: 45,
    difficulty: 'dificil',
    tags: ['Trading', 'Competição', 'Tempo Real'],
    icon: <Award className="w-6 h-6" />,
    completionRate: 38,
    likes: 456,
    planAccess: ['Rede de Ensino']
  }
];

const themes = [
  { id: 'todos', label: 'Todos os Temas', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'fundamentos', label: 'Fundamentos', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'poupança', label: 'Poupança', icon: <PiggyBank className="w-4 h-4" /> },
  { id: 'consumo', label: 'Consumo', icon: <ShoppingCart className="w-4 h-4" /> },
  { id: 'investimentos', label: 'Investimentos', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'planejamento', label: 'Planejamento', icon: <Calculator className="w-4 h-4" /> },
  { id: 'empreendedorismo', label: 'Empreendedorismo', icon: <Target className="w-4 h-4" /> },
  { id: 'mercado-financeiro', label: 'Mercado Financeiro', icon: <Award className="w-4 h-4" /> }
];

const Biblioteca = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [filteredContent, setFilteredContent] = useState<LibraryItem[]>([]);
  const [userPlan, setUserPlan] = useState('Escola Básica');

  useEffect(() => {
    if (user) {
      const detectedPlan = user.user_metadata?.plan_type || 'Escola Básica';
      setUserPlan(detectedPlan);
    }
  }, [user]);

  useEffect(() => {
    let filtered = libraryContent.filter(item => 
      item.planAccess.includes(userPlan)
    );

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTheme !== 'todos') {
      filtered = filtered.filter(item => item.theme === selectedTheme);
    }

    if (selectedType !== 'todos') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    setFilteredContent(filtered);
  }, [searchTerm, selectedTheme, selectedType, userPlan]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'game': return <Gamepad2 className="w-4 h-4" />;
      case 'activity': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Vídeo';
      case 'game': return 'Jogo';
      case 'activity': return 'Atividade';
      default: return 'Conteúdo';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'bg-green-100 text-green-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'dificil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const availableThemes = themes.filter(theme => {
    if (theme.id === 'todos') return true;
    return filteredContent.some(item => item.theme === theme.id);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <section className="fintech-gradient py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                📚 Biblioteca Educativa
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Explore nossa coleção de vídeos, jogos e atividades
              </p>
              <p className="text-lg text-blue-200">
                Plano atual: <span className="font-semibold">{userPlan}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Filtros e Busca */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Busca */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtros */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Filtrar por:</span>
                </div>
                
                {/* Filtro de Tipo - Disponível para Premium e Rede */}
                {(userPlan === 'Escola Premium' || userPlan === 'Rede de Ensino') && (
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                    aria-label="Filtrar por tipo de conteúdo" 
                  >
                    <option value="todos">Todos os Tipos</option>
                    <option value="video">Vídeos</option>
                    <option value="game">Jogos</option>
                    <option value="activity">Atividades</option>
                  </select>
                )}
              </div>
            </div>

            {/* Filtros de Tema */}
            <div className="mt-6 flex flex-wrap gap-2">
              {availableThemes.map(theme => (
                <Button
                  key={theme.id}
                  variant={selectedTheme === theme.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTheme(theme.id)}
                  className="flex items-center gap-2"
                >
                  {theme.icon}
                  {theme.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Conteúdo da Biblioteca */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredContent.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum conteúdo encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou termos de busca
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredContent.length} conteúdo{filteredContent.length !== 1 ? 's' : ''} encontrado{filteredContent.length !== 1 ? 's' : ''}
                  </h2>
                  
                  {/* Estatísticas do Plano */}
                  <div className="flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {filteredContent.filter(item => item.type === 'video').length} vídeos
                    </div>
                    <div className="flex items-center gap-1">
                      <Gamepad2 className="w-4 h-4" />
                      {filteredContent.filter(item => item.type === 'game').length} jogos
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {filteredContent.filter(item => item.type === 'activity').length} atividades
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent.map(item => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <Badge variant="secondary" className="flex items-center gap-1">
                              {getTypeIcon(item.type)}
                              {getTypeLabel(item.type)}
                            </Badge>
                          </div>
                          
                          {item.isNew && (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              Novo!
                            </Badge>
                          )}
                        </div>
                        
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">
                          {item.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDifficultyColor(item.difficulty)}`}
                          >
                            {item.difficulty === 'facil' ? 'Fácil' : 
                             item.difficulty === 'medio' ? 'Médio' : 'Difícil'}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.duration} min
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {item.completionRate && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                {item.completionRate}%
                              </div>
                            )}
                            
                            {item.likes && (
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-red-500" />
                                {item.likes}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          {item.type === 'video' ? 'Assistir' : 
                           item.type === 'game' ? 'Jogar' : 'Iniciar'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Biblioteca;