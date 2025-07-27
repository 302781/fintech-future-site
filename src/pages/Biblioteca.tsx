import React, { useEffect, useState, useMemo, JSX } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Não usado, pode ser removido
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
  Users, // Importado mas não usado no corpo principal
  Target,
  TrendingUp,
  Award,
  Lightbulb,
  PiggyBank,
  DollarSign,
  Calculator,
  ShoppingCart,
  Loader2 // Adicionado para tela de carregamento
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContextHook';
import { toast } from 'sonner'; // Assumindo que 'sonner' é usado para toasts


// --- Interfaces de Conteúdo da Biblioteca ---
// Assumindo a estrutura do objeto 'user' vindo do useAuth,
// que geralmente reflete a interface User do Supabase, incluindo user_metadata.
interface AuthUser {
  id: string;
  email: string | undefined;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    plan_type?: string; // Ex: 'Escola Básica', 'Escola Premium', 'Rede de Ensino'
    [key: string]: unknown; // Para permitir outras propriedades de metadados
  };
  // Outras propriedades do Supabase User, se você as utiliza diretamente.
  // Ex: app_metadata, role, etc.
}

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'game' | 'activity';
  theme: string;
  duration: number; // em minutos
  difficulty: 'facil' | 'medio' | 'dificil';
  tags: string[];
  icon: string; // Agora um string que mapeia para o IconMap
  thumbnail?: string;
  completionRate?: number;
  likes?: number;
  isNew?: boolean;
  planAccess: string[]; // Planos que têm acesso a este item
}

interface ThemeItem {
  id: string;
  label: string;
  icon: string; // Agora um string que mapeia para o IconMap
}

// --- Mapeamento de Nomes de String para Componentes de Ícone Reais do Lucide-React ---
const IconMap: { [key: string]: React.ElementType } = {
  BookOpen: BookOpen,
  Play: Play,
  Gamepad2: Gamepad2,
  FileText: FileText,
  Clock: Clock,
  Star: Star,
  Heart: Heart,
  Users: Users,
  Target: Target,
  TrendingUp: TrendingUp,
  Award: Award,
  Lightbulb: Lightbulb,
  PiggyBank: PiggyBank,
  DollarSign: DollarSign,
  Calculator: Calculator,
  ShoppingCart: ShoppingCart,
  Search: Search, // Adicionado se usado em algum lugar (aqui, o Search está no Input)
  Filter: Filter,
};

// --- Dados da Biblioteca (consolidados aqui) ---
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
    icon: 'DollarSign', // Usando string para o ícone
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
    icon: 'PiggyBank', // Usando string para o ícone
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
    icon: 'ShoppingCart', // Usando string para o ícone
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
    icon: 'TrendingUp', // Usando string para o ícone
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
    icon: 'Target', // Usando string para o ícone
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
    icon: 'Calculator', // Usando string para o ícone
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
    icon: 'TrendingUp', // Usando string para o ícone
    completionRate: 43,
    likes: 312,
    planAccess: ['Rede de Ensino']
  },
  {
    id: 'game-rede-1',
    title: 'Trading Challenge',
    description: 'Compete com outros estudantes em simulações de trading em tempo real.',
    type: 'game',
    theme: 'investimentos-avançados', // Usando um tema mais específico
    duration: 45,
    difficulty: 'dificil',
    tags: ['Trading', 'Competição', 'Tempo Real'],
    icon: 'Award', // Usando string para o ícone
    completionRate: 38,
    likes: 456,
    planAccess: ['Rede de Ensino']
  }
];

const themes: ThemeItem[] = [
  { id: 'todos', label: 'Todos os Temas', icon: 'BookOpen' },
  { id: 'fundamentos', label: 'Fundamentos', icon: 'DollarSign' },
  { id: 'poupança', label: 'Poupança', icon: 'PiggyBank' },
  { id: 'consumo', label: 'Consumo', icon: 'ShoppingCart' },
  { id: 'investimentos', label: 'Investimentos', icon: 'TrendingUp' },
  { id: 'planejamento', label: 'Planejamento', icon: 'Calculator' },
  { id: 'empreendedorismo', label: 'Empreendedorismo', icon: 'Target' },
  { id: 'mercado-financeiro', label: 'Mercado Financeiro', icon: 'Award' },
  { id: 'investimentos-avançados', label: 'Investimentos Avançados', icon: 'TrendingUp' } // Novo tema
];


// --- useCallback Polyfill (no-op, just returns the function itself) ---
function useCallback<T extends (...args: unknown[]) => unknown>(fn: T, deps: unknown[]): T {
  return fn;
}

// --- Componente Principal Biblioteca ---
const Biblioteca = () => {
  // Tipagem para o 'user' retornado pelo useAuth
  const { user } = useAuth() as unknown as { user: AuthUser | null }; // Type assertion via unknown para evitar erro de incompatibilidade
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [userPlan, setUserPlan] = useState('Escola Básica'); // Default para 'Escola Básica'
  const [isLoading, setIsLoading] = useState(true); // Adicionado estado de carregamento
  const [error, setError] = useState<string | null>(null); // Adicionado estado de erro

  // Efeito para determinar o plano do usuário e simular carregamento de dados
  useEffect(() => {
    setIsLoading(true); // Inicia carregamento
    setError(null);

    const loadUserData = async () => {
      // Simula um delay de rede para carregar dados do usuário ou o conteúdo
      await new Promise(resolve => setTimeout(resolve, 300));

      if (user?.user_metadata?.plan_type) {
        setUserPlan(user.user_metadata.plan_type);
      } else {
        setUserPlan('Escola Básica'); // Fallback para plano básico se não houver user ou plan_type
      }
      setIsLoading(false); // Finaliza carregamento
    };

    loadUserData();
  }, [user]); // Depende do objeto 'user' para reagir a mudanças de autenticação

  // Usa useMemo para filtrar o conteúdo da biblioteca
  const filteredContent = useMemo(() => {
    // Começa com todo o conteúdo acessível pelo plano do usuário
    let filtered = libraryContent.filter(item => 
      item.planAccess.includes(userPlan)
    );

    // Aplica filtro de busca
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // Aplica filtro de tema
    if (selectedTheme !== 'todos') {
      filtered = filtered.filter(item => item.theme === selectedTheme);
    }

    // Aplica filtro de tipo (apenas para planos Premium e Rede)
    if ((userPlan === 'Escola Premium' || userPlan === 'Rede de Ensino') && selectedType !== 'todos') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    return filtered;
  }, [searchTerm, selectedTheme, selectedType, userPlan]);

  // Helper para obter o ícone do tipo de conteúdo
  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'game': return <Gamepad2 className="w-4 h-4" />;
      case 'activity': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  }, []); // Não tem dependências, então memoiza uma vez

  // Helper para obter o label do tipo de conteúdo
  const getTypeLabel = useCallback((type: string) => {
    switch (type) {
      case 'video': return 'Vídeo';
      case 'game': return 'Jogo';
      case 'activity': return 'Atividade';
      default: return 'Conteúdo';
    }
  }, []); // Não tem dependências, então memoiza uma vez

  // Helper para obter a cor da dificuldade
  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'bg-green-100 text-green-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'dificil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []); // Não tem dependências, então memoiza uma vez

  // Filtra temas disponíveis com base no conteúdo atualmente visível pelo plano do usuário
  const availableThemes = useMemo(() => {
    const accessibleThemes = new Set(filteredContent.map(item => item.theme));
    return themes.filter(theme => 
      theme.id === 'todos' || accessibleThemes.has(theme.id)
    );
  }, [filteredContent]); // Recalcula quando o conteúdo filtrado muda

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 mr-2 animate-spin text-[#1A247E]" />
        <p className="text-xl text-gray-700">Carregando biblioteca...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600 p-4 text-center">
        <p className="text-xl mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600 text-white">Recarregar Página</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20"> {/* Usado <main> para semântica */}
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
              <div className="relative flex-1 max-w-md w-full"> {/* Adicionado w-full */}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full" // Adicionado w-full
                  aria-label="Campo de busca de conteúdo"
                />
              </div>

              {/* Filtros */}
              <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto"> {/* Ajustado para responsividade */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Filtrar por:</span>
                </div>
                
                {/* Filtro de Tipo - Disponível para Premium e Rede */}
                {(userPlan === 'Escola Premium' || userPlan === 'Rede de Ensino') && (
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto" // Adicionado w-full sm:w-auto
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
            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start"> {/* Centralizado em mobile */}
              {availableThemes.map(theme => {
                const IconComponent = theme.icon ? IconMap[theme.icon] : null; // Pega o componente do ícone pelo nome
                return (
                  <Button
                    key={theme.id}
                    variant={selectedTheme === theme.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTheme(theme.id)}
                    className="flex items-center gap-2"
                    aria-label={`Filtrar por tema: ${theme.label}`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />} {/* Renderiza o ícone */}
                    {theme.label}
                  </Button>
                );
              })}
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
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"> {/* Adicionado flex-col para mobile */}
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredContent.length} conteúdo{filteredContent.length !== 1 ? 's' : ''} encontrado{filteredContent.length !== 1 ? 's' : ''}
                  </h2>
                  
                  {/* Estatísticas do Plano */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center sm:justify-end"> {/* Flex-wrap e centralizado */}
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
                  {filteredContent.map(item => {
                    const ItemIconComponent = item.icon ? IconMap[item.icon] : null; // Pega o componente do ícone do item
                    return (
                      <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              {ItemIconComponent && <ItemIconComponent className="w-6 h-6 text-[#1A247E]" />} {/* Renderiza o ícone do item */}
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
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Biblioteca;



