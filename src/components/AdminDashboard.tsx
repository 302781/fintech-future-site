import React, { useState, useEffect } from 'react';
// Certifique-se que o nome da importação da Sidebar esteja correto
import { Sidebar } from "@/components/Sidebar"; // Corrigido de Siderbar para Sidebar
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dashboard } from "@/components/Dashboard";
import { ContentManager } from "@/components/ContentManager"; // Assumindo que você terá este componente
import { AISupport } from "@/components/AISupport"; // Assumindo que você terá este componente
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress'; // Para progresso individual de aluno, se aplicável
import {
  Search, Settings, Users, AlertCircle, AlertTriangle, Monitor, RefreshCw, Download, LogOut, Link as LinkIcon, HardDrive, BellRing, Send, Unlock, PlusCircle, CheckCircle, Building2, Filter, ListFilter, MoreHorizontal, XCircle, Info, Folder, Wrench, Zap, BookOpen // Adicione BookOpen para ContentManager
} from 'lucide-react'; // Ícones úteis

// --- Interfaces para Tipagem ---
interface User {
  id: string;
  name: string;
  email: string;
  type: 'Escola' | 'Professor' | 'Aluno' | 'Pai/Responsável' | 'Administrador';
  lastAccess: string;
  status: 'Ativo' | 'Inativo' | 'Bloqueado';
}

interface LogEntry {
  id: string;
  timestamp: string;
  page: string;
  error: string;
  details: string;
  level: 'error' | 'warning' | 'info';
}

const userTypes = ['Todos', 'Escola', 'Professor', 'Aluno', 'Pai/Responsável', 'Administrador'];
const userStatuses = ['Todos', 'Ativo', 'Inativo', 'Bloqueado'];

// --- Componente Principal: AdminDashboardPage ---
const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<User['type'] | 'Todos'>('Todos');
  const [filterStatus, setFilterStatus] = useState<User['status'] | 'Todos'>('Todos');

  // Dados mockados
  const [users, setUsers] = useState<User[]>([
    { id: '#0001', name: 'Escola Verde Luz', email: 'escola@verdeluz.com', type: 'Escola', lastAccess: '22/07/2025 08:13', status: 'Ativo' },
    { id: '#0002', name: 'Ana Carolina', email: 'ana.carolina@email.com', type: 'Professor', lastAccess: '22/07/2025 09:42', status: 'Ativo' },
    { id: '#0003', name: 'João Pedro', email: 'joao.pedro@email.com', type: 'Aluno', lastAccess: '21/07/2025 18:10', status: 'Ativo' },
    { id: '#0004', name: 'Marcos Silveira', email: 'marcos.silveira@email.com', type: 'Pai/Responsável', lastAccess: '20/07/2025 17:22', status: 'Ativo' },
    { id: '#0005', name: 'Maria Souza', email: 'maria.souza@email.com', type: 'Aluno', lastAccess: '19/07/2025 10:05', status: 'Inativo' },
    { id: '#0006', name: 'Centro Educacional Alfa', email: 'contato@cealfa.com', type: 'Escola', lastAccess: '22/07/2025 14:00', status: 'Ativo' },
    { id: '#0007', name: 'Carlos Santos', email: 'carlos.santos@email.com', type: 'Professor', lastAccess: '21/07/2025 11:30', status: 'Ativo' },
    { id: '#0008', name: 'Julia Martins', email: 'julia.martins@email.com', type: 'Aluno', lastAccess: '22/07/2025 10:15', status: 'Ativo' },
    { id: '#0009', name: 'Sofia Pereira', email: 'sofia.pereira@email.com', type: 'Pai/Responsável', lastAccess: '18/07/2025 09:00', status: 'Bloqueado' },
    { id: '#0010', name: 'Admin Geral', email: 'admin@email.com', type: 'Administrador', lastAccess: '23/07/2025 14:00', status: 'Ativo' },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'log1', timestamp: '22/07/2025 09:14', page: '/dashboard-estudante', error: 'Falha ao carregar gráfico de progresso', details: 'ChartJS not defined', level: 'error' },
    { id: 'log2', timestamp: '22/07/2025 08:57', page: '/login', error: 'Timeout na requisição de autenticação', details: 'API Supabase fora do ar por 3min', level: 'error' },
    { id: 'log3', timestamp: '21/07/2025 21:22', page: '/relatorios', error: 'PDF não gerado', details: 'Limite de requisições na API de geração de PDF atingido', level: 'warning' },
    { id: 'log4', timestamp: '23/07/2025 13:00', page: '/cadastro', error: 'Email já cadastrado', details: 'Tentativa de registro duplicado', level: 'info' },
  ]);

  // --- Funções de Lógica ---
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Todos' || user.type === filterType;
    const matchesStatus = filterStatus === 'Todos' || user.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAction = async (action: string, userId: string, userName: string) => {
    console.log(`Ação: ${action} no usuário ${userName} (ID: ${userId})`);

    // --- IMPORTANTE: Substitua esta lógica por chamadas reais à API ---
    // Você precisa de um cliente de API configurado (ex: axios, fetch, um SDK)
    // Exemplo: import axios from 'axios';
    // const api = axios.create({ baseURL: 'sua-api-url.com/api' });

    // Para fins de demonstração (mock):
    // if (action === 'Desativar') { await api.deactivateUser(userId); } // Isso causaria erro pois 'api' não existe
    // Removido a linha acima para evitar o erro 'api is not defined'.
    // Em um ambiente real, você faria:
    // try {
    //   if (action === 'Desativar') {
    //     await api.post(`/users/${userId}/deactivate`);
    //   } else if (action === 'Bloquear') {
    //     await api.post(`/users/${userId}/block`);
    //   }
    //   alert(`Ação "${action}" realizada com sucesso para ${userName}.`);
    // } catch (error) {
    //   console.error(`Erro ao realizar ação "${action}":`, error);
    //   alert(`Falha ao realizar a ação "${action}" para ${userName}.`);
    // }
    // --- FIM DA SEÇÃO IMPORTANTE ---

    alert(`Ação "${action}" solicitada para ${userName}. (Em um ambiente real, isso chamaria uma API)`);

    // Lógica de atualização de estado mock
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          if (action === 'Desativar') return { ...user, status: 'Inativo' };
          if (action === 'Bloquear') return { ...user, status: 'Bloqueado' };
          if (action === 'Ativar') return { ...user, status: 'Ativo' };
        }
        return user;
      })
    );
    // ... outras ações mockadas para 'Resetar Senha', 'Ver', etc.
  };

  // Métricas rápidas
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Ativo').length;
  const studentsOnline = 48; // Mocked
  const teachersOnline = 7; // Mocked
  const parentsConnected = 5; // Mocked
  const activeSchools = users.filter(u => u.type === 'Escola' && u.status === 'Ativo').length;
  // A data de hoje para filtrar logs
  const today = new Date().toLocaleDateString('pt-BR');
  const criticalErrorsToday = logs.filter(log => log.level === 'error' && log.timestamp.startsWith(today)).length;

  // Função para renderizar o conteúdo da aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "content":
        return <ContentManager />; // Você precisará criar este componente
      case "students":
        return (
          // Conteúdo da aba "Estudantes"
          <Card className="mb-8 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Gerenciamento de Usuários
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setUsers([...users])}> {/* Simula atualização */}
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar Lista
                </Button>
                <span className="text-sm text-gray-600">Total: {totalUsers} usuários</span>
              </div>
            </CardHeader>
            <CardContent>
              {/* Barra de Busca e Filtros */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome, e-mail ou tipo..."
                    className="pl-9 pr-4 py-2 border rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="w-4 h-4 mr-2" />
                      Tipo: {filterType === 'Todos' ? 'Todos' : filterType}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por Tipo</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userTypes.map(type => (
                      <DropdownMenuItem key={type} onClick={() => setFilterType(type as User['type'] | 'Todos')}>
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ListFilter className="w-4 h-4 mr-2" />
                      Status: {filterStatus === 'Todos' ? 'Todos' : filterStatus}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userStatuses.map(status => (
                      <DropdownMenuItem key={status} onClick={() => setFilterStatus(status as User['status'] | 'Todos')}>
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Tabela de Usuários */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Nome do Usuário</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Último Acesso</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.type === 'Escola' ? 'bg-blue-100 text-blue-800' :
                                user.type === 'Professor' ? 'bg-green-100 text-green-800' :
                                user.type === 'Aluno' ? 'bg-purple-100 text-purple-800' :
                                user.type === 'Pai/Responsável' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }
                            >
                              {user.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastAccess}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === 'Ativo' ? 'bg-green-500 text-white' :
                                user.status === 'Inativo' ? 'bg-yellow-500 text-white' :
                                'bg-red-500 text-white'
                              }
                            >
                              {user.status === 'Ativo' ? '✅ Ativo' : user.status === 'Inativo' ? '⏸️ Inativo' : '⛔ Bloqueado'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Abrir menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleAction('Ver', user.id, user.name)}>Ver</DropdownMenuItem>
                                {user.type !== 'Aluno' && user.type !== 'Pai/Responsável' && (
                                  <>
                                    <DropdownMenuItem onClick={() => handleAction('Editar', user.id, user.name)}>Editar</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('Resetar Senha', user.id, user.name)}>Resetar Senha</DropdownMenuItem>
                                  </>
                                )}
                                {user.type === 'Aluno' && (
                                  <DropdownMenuItem onClick={() => handleAction('Ver Progresso', user.id, user.name)}>Ver Progresso</DropdownMenuItem>
                                )}
                                {user.type === 'Pai/Responsável' && (
                                  <DropdownMenuItem onClick={() => handleAction('Ver Relatórios', user.id, user.name)}>Ver Relatórios</DropdownMenuItem>
                                )}
                                {user.status === 'Ativo' && (
                                  <DropdownMenuItem onClick={() => handleAction('Desativar', user.id, user.name)} className="text-yellow-600">Desativar</DropdownMenuItem>
                                )}
                                {user.status !== 'Bloqueado' && (
                                  <DropdownMenuItem onClick={() => handleAction('Bloquear', user.id, user.name)} className="text-red-600">Bloquear</DropdownMenuItem>
                                )}
                                {user.status !== 'Ativo' && (
                                  <DropdownMenuItem onClick={() => handleAction('Ativar', user.id, user.name)} className="text-green-600">Ativar</DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500" onClick={() => handleAction('Excluir', user.id, user.name)}>Excluir</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                          Nenhum usuário encontrado com os filtros aplicados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        );
      case "analytics":
        // return <Analytics />; // Você precisará criar este componente
        return <div className="p-4 text-center text-xl text-muted-foreground">Conteúdo de Analytics</div>;
      case "goals":
        // return <Goals />; // Você precisará criar este componente
        return <div className="p-4 text-center text-xl text-muted-foreground">Conteúdo de Metas</div>;
      case "finance":
        // return <Finance />; // Você precisará criar este componente
        return <div className="p-4 text-center text-xl text-muted-foreground">Conteúdo de Finanças</div>;
      case "growth":
        // return <Growth />; // Você precisará criar este componente
        return <div className="p-4 text-center text-xl text-muted-foreground">Conteúdo de Crescimento</div>;
      case "settings":
        // return <SettingsComponent />; // Você precisará criar este componente
        return <div className="p-4 text-center text-xl text-muted-foreground">Conteúdo de Configurações</div>;
      default:
        return <Dashboard />;
    }
  };

  // --- Renderização Principal do Componente AdminDashboardPage ---
  return (
    <div className="min-h-screen bg-background flex">
      {/* activeTab e onTabChange são passados para a Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        {/* Renderiza o conteúdo com base em activeTab */}
        {renderContent()}
      </main>
      {/* AISupport, se estiver presente */}
      <AISupport /> {/* Certifique-se de que este componente existe e está importado */}
    </div>
  );
};

export default AdminDashboardPage; // Exportação padrão do componente