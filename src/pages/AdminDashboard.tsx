import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress'; // Para progresso individual de aluno, se aplicável
import {
  Search, Settings, Users, AlertCircle, AlertTriangle, Monitor, RefreshCw, Download, LogOut, Link as LinkIcon, HardDrive, BellRing, Send, Unlock, PlusCircle, CheckCircle, Building2, Filter, ListFilter, MoreHorizontal, XCircle, Info, Folder, Wrench, Zap
} from 'lucide-react'; // Ícones úteis

// --- Interfaces para Tipagem ---
interface User {
  id: string;
  name: string;
  email: string; // Adicionado e-mail para busca
  type: 'Escola' | 'Professor' | 'Aluno' | 'Pai/Responsável' | 'Administrador';
  lastAccess: string; // Formato string para simplificar
  status: 'Ativo' | 'Inativo' | 'Bloqueado';
}

interface LogEntry {
  id: string; // ID único para a chave
  timestamp: string;
  page: string;
  error: string;
  details: string;
  level: 'error' | 'warning' | 'info'; // Nível do log
}

const userTypes = ['Todos', 'Escola', 'Professor', 'Aluno', 'Pai/Responsável', 'Administrador'];
const userStatuses = ['Todos', 'Ativo', 'Inativo', 'Bloqueado'];

const AdminDashboard: React.FC = () => {
  // --- Estados do Componente ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<User['type'] | 'Todos'>('Todos');
  const [filterStatus, setFilterStatus] = useState<User['status'] | 'Todos'>('Todos');

  // Dados Mock para demonstração. Em um ambiente real, viriam de uma API.
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

  const handleAction = (action: string, userId: string, userName: string) => {
    console.log(`Ação: ${action} no usuário ${userName} (ID: ${userId})`);
    // Lógica para chamar APIs reais aqui.
    // Ex: if (action === 'Desativar') { await api.deactivateUser(userId); }
    alert(`Ação "${action}" solicitada para ${userName}. (Em um ambiente real, isso chamaria uma API)`);

    // Lógica de atualização de estado mock, se necessário
    if (action === 'Desativar') {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, status: 'Inativo' } : user
        )
      );
    } else if (action === 'Bloquear') {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, status: 'Bloqueado' } : user
        )
      );
    } else if (action === 'Resetar Senha') {
      // Simula a mudança de status ou exibe uma mensagem
    }
    // ... outras ações
  };

  // Métricas rápidas
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Ativo').length;
  const studentsOnline = 48; // Mocked
  const teachersOnline = 7; // Mocked
  const parentsConnected = 5; // Mocked
  const activeSchools = users.filter(u => u.type === 'Escola' && u.status === 'Ativo').length;
  const criticalErrorsToday = logs.filter(log => log.level === 'error' && log.timestamp.startsWith(new Date().toLocaleDateString('pt-BR'))).length; // Conta erros de hoje

  // --- Renderização ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header do Painel */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          <Monitor className="w-8 h-8 text-blue-600" />
          Painel de Administração
        </h1>
        <Button variant="outline" className="text-blue-600 hover:text-blue-700">
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      {/* Cartões de Métricas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-gray-500">+20% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Usuários Ativos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" /> {/* Ícone adicionado */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-gray-500">Online agora: {studentsOnline + teachersOnline + parentsConnected}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Escolas Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" /> {/* Ícone adicionado */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSchools}</div>
            <p className="text-xs text-gray-500">Novas: 2 no último mês</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Erros Críticos Hoje</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" /> {/* Ícone adicionado */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalErrorsToday}</div>
            <p className="text-xs text-gray-500">Verifique os logs abaixo</p>
          </CardContent>
        </Card>
      </div>

      ---

      {/* Seção de Usuários Ativos */}
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
                  <ListFilter className="w-4 h-4 mr-2" /> {/* Ícone adicionado */}
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
                            {user.type !== 'Aluno' && user.type !== 'Pai/Responsável' && ( // Ações específicas para não-alunos/pais
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
                            {/* Adicione outras ações conforme necessário */}
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

      ---

      {/* Seção de Logs de Erros Recentes */}
      <Card className="mb-8 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            Logs de Erros Recentes
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Folder className="w-4 h-4 mr-2" /> {/* Ícone adicionado */}
              Ver Todos os Logs
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Baixar Relatório (.CSV)
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div key={log.id} className={`p-4 border rounded-md ${
                  log.level === 'error' ? 'border-red-200 bg-red-50' :
                  log.level === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {log.level === 'error' && <XCircle className="w-4 h-4 text-red-600" />}
                    {log.level === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                    {log.level === 'info' && <Info className="w-4 h-4 text-blue-600" />}
                    <span className="text-gray-700">{log.timestamp}</span>
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700">{log.page}</Badge>
                  </div>
                  <p className="font-semibold text-gray-900 mt-2">{log.error}</p>
                  <p className="text-sm text-gray-600">{log.details}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                Nenhum log de erro recente encontrado.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      ---

      {/* Seção de Ações Rápidas */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Wrench className="w-6 h-6 text-green-600" /> {/* Ícone substituído */}
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center justify-center gap-2 py-6 text-md h-auto">
              <BellRing className="w-5 h-5" />
              Resetar notificações
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 py-6 text-md h-auto">
              <Send className="w-5 h-5" />
              Forçar envio de relatórios
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 py-6 text-md h-auto">
              <Unlock className="w-5 h-5" />
              Sair de todas as sessões
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 py-6 text-md h-auto">
              <PlusCircle className="w-5 h-5" />
              Conectar nova escola
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 py-6 text-md h-auto">
              <RefreshCw className="w-5 h-5" />
              Sincronizar com DB
            </Button>
            {/* Exemplo de botão com lógica condicional */}
            {criticalErrorsToday > 0 && (
                <Button variant="destructive" className="flex items-center justify-center gap-2 py-6 text-md h-auto">
                    <Zap className="w-5 h-5" /> {/* Ícone adicionado */}
                    Resolver erros críticos
                </Button>
            )}
            {/* Adicione mais botões conforme necessário */}
          </div>
        </CardContent>
      </Card>

      ---

      {/* Footer do Painel */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>Logado como: <span className="font-semibold text-gray-800">Dev Maria V.</span></span>
        <span>Sessão: <span className="font-semibold text-gray-800">25 min</span></span>
        <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
          <LogOut className="w-4 h-4 mr-1" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;