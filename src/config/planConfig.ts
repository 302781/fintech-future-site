export interface CourseItem {
  id: string;
  title: string;
  description: string;
  icon?: string; // Icone como string (nome do Lucide-React)
  tags: string[];
}

export interface PlatformItem {
  id: string;
  name: string;
  description: string;
  link: string;
  icon?: string; // Icone como string
}

// NOVO: Detalhes específicos de cada plano
export interface PlanSpecificDetails {
  description: string;
  maxStudents?: number; // Para Escola Básica e Premium
  minStudents?: number; // Para Rede de Ensino
  teacherTrainingSpots?: number; // Para Premium
  additionalFeatures: string[]; // Itens como "Consultoria pedagógica trimestral", "Suporte prioritário"
  accessDuration?: string; // "Acesso por 12 meses", "Acesso vitalício"
  integrations?: string[]; // Para Rede de Ensino
  supportLevel?: string; // "Suporte Técnico", "Suporte prioritário", "Suporte 24/7"
}

export interface PlanContent {
  details: PlanSpecificDetails; // NOVO: Campo para detalhes do plano
  courses: CourseItem[];
  investmentPlatforms: PlatformItem[];
  tips: string[];
}

export interface AllPlansContent {
  'Escola Básica': PlanContent;
  'Escola Premium': PlanContent;
  'Rede de Ensino': PlanContent;
}

export const initialConfig: AllPlansContent = {
  'Escola Básica': {
    details: {
      description: "Este plano é ideal para escolas com até 100 alunos, focado em educação financeira fundamental.",
      maxStudents: 100,
      additionalFeatures: [
        "Cadastro por aluno individual",
        "Dashboard para Professores: Interface intuitiva para acompanhar o progresso dos alunos",
        "Relatórios de Progresso: Dados detalhados sobre o aprendizado e áreas de melhoria",
        "Material Didático Digital: Recursos complementares para professores e alunos",
        "Acesso Completo ao Conteúdo: Biblioteca de jogos, vídeos e atividades interativas"
      ],
      supportLevel: "Atendimento especializado durante o horário comercial"
    },
    courses: [
      { id: 'cb1', title: 'Fundamentos do Dinheiro', description: 'Entenda o básico sobre como o dinheiro funciona.', icon: 'DollarSign', tags: ['Iniciante', 'Crianças'] },
      { id: 'cb2', title: 'Onde Guardar meu Dinheiro?', description: 'Aprenda sobre poupança e cofrinho.', icon: 'PiggyBank', tags: ['Iniciante', 'Poupança'] },
      { id: 'cb3', title: 'Consumo Consciente para Crianças', description: 'Como fazer escolhas inteligentes.', icon: 'Lightbulb', tags: ['Básico', 'Consumo'] },
      { id: 'cb4', title: 'Fazendo seu Primeiro Orçamento', description: 'Um guia simples para montar seu orçamento.', icon: 'BookUser', tags: ['Básico', 'Orçamento'] },
    ],
    investmentPlatforms: [], // Basicamente, não há plataformas específicas para este plano
    tips: ["Comece com os cursos mais básicos: 'Fundamentos do Dinheiro' é um ótimo ponto de partida!", "Incentive a participação nos jogos e desafios para fixar o aprendizado."]
  },
  'Escola Premium': {
    details: {
      description: "Todos os recursos do plano básico com funcionalidades avançadas para escolas maiores.",
      maxStudents: 500,
      teacherTrainingSpots: 10,
      accessDuration: "12 meses",
      additionalFeatures: [
        "Todos os recursos do Básico",
        "Treinamento para 10 professores",
        "Consultoria pedagógica trimestral",
        "Gamificação premium",
        "Workshop mensal presencial: Encontros mensais com especialistas em educação financeira",
        "Relatórios avançados: Relatórios detalhados e customizáveis",
        "Capacitação para professores: Treinamento especializado para educadores"
      ],
      supportLevel: "Suporte prioritário"
    },
    courses: [
      { id: 'cb1', title: 'Fundamentos do Dinheiro', description: 'Entenda o básico sobre como o dinheiro funciona.', icon: 'DollarSign', tags: ['Iniciante', 'Crianças'] },
      { id: 'cb2', title: 'Onde Guardar meu Dinheiro?', description: 'Aprenda sobre poupança e cofrinho.', icon: 'PiggyBank', tags: ['Iniciante', 'Poupança'] },
      { id: 'cb3', title: 'Consumo Consciente para Crianças', description: 'Como fazer escolhas inteligentes.', icon: 'Lightbulb', tags: ['Básico', 'Consumo'] },
      { id: 'cb4', title: 'Fazendo seu Primeiro Orçamento', description: 'Um guia simples para montar seu orçamento.', icon: 'BookUser', tags: ['Básico', 'Orçamento'] },
      { id: 'cp1', title: 'Introdução aos Investimentos', description: 'Descubra os tipos de investimentos mais comuns.', icon: 'TrendingUp', tags: ['Intermediário', 'Investimentos'] },
      { id: 'cp2', title: 'Planejamento Financeiro Pessoal', description: 'Crie metas financeiras e organize seu orçamento.', icon: 'Briefcase', tags: ['Intermediário', 'Planejamento'] },
      { id: 'cp3', title: 'Entendendo Juros e Dívidas', description: 'Como os juros funcionam, os perigos das dívidas.', icon: 'Info', tags: ['Intermediário', 'Dívidas'] },
    ],
    investmentPlatforms: [
      { id: 'ipp1', name: 'Simulador de Investimentos Júnior', description: 'Pratique investimentos com dinheiro fictício.', link: '#', icon: 'TrendingUp' },
      { id: 'ipp2', name: 'Guia: Primeiras Aplicações Reais', description: 'Passo a passo para abrir sua primeira conta.', link: '#', icon: 'PiggyBank' },
    ],
    tips: ["Explore os 'Simuladores de Investimento Júnior' para experimentar sem riscos.", "Aproveite os workshops presenciais para aprofundar temas e tirar dúvidas."]
  },
  'Rede de Ensino': {
    details: {
      description: "Solução enterprise para grandes redes de ensino, com customização completa e suporte dedicado.",
      minStudents: 1000,
      accessDuration: "Acesso vitalício a atualizações",
      additionalFeatures: [
        "Todos os recursos Premium",
        "Implementação personalizada: Customização completa da plataforma conforme suas necessidades",
        "Gestor de conta dedicado: Profissional exclusivo para atender sua instituição",
        "Treinamentos especializados: Capacitação avançada para toda sua equipe",
        "Consultoria pedagógica mensal",
        "Customizações sob demanda",
        "Backup e segurança avançada",
        "Treinamentos ilimitados",
        "Relatórios executivos",
        "SLA garantido",
        "Tudo que sua rede de ensino precisa para implementar educação financeira em larga escala"
      ],
      integrations: ["API para integração: Integração completa com seus sistemas existentes"],
      supportLevel: "Suporte 24/7: Atendimento especializado disponível 24 horas por dia"
    },
    courses: [
      { id: 'cb1', title: 'Fundamentos do Dinheiro', description: 'Entenda o básico sobre como o dinheiro funciona.', icon: 'DollarSign', tags: ['Iniciante', 'Crianças'] },
      { id: 'cb2', title: 'Onde Guardar meu Dinheiro?', description: 'Aprenda sobre poupança e cofrinho.', icon: 'PiggyBank', tags: ['Iniciante', 'Poupança'] },
      { id: 'cb3', title: 'Consumo Consciente para Crianças', description: 'Como fazer escolhas inteligentes.', icon: 'Lightbulb', tags: ['Básico', 'Consumo'] },
      { id: 'cb4', title: 'Fazendo seu Primeiro Orçamento', description: 'Um guia simples para montar seu orçamento.', icon: 'BookUser', tags: ['Básico', 'Orçamento'] },
      { id: 'cp1', title: 'Introdução aos Investimentos', description: 'Descubra os tipos de investimentos mais comuns.', icon: 'TrendingUp', tags: ['Intermediário', 'Investimentos'] },
      { id: 'cp2', title: 'Planejamento Financeiro Pessoal', description: 'Crie metas financeiras e organize seu orçamento.', icon: 'Briefcase', tags: ['Intermediário', 'Planejamento'] },
      { id: 'cp3', title: 'Entendendo Juros e Dívidas', description: 'Como os juros funcionam, os perigos das dívidas.', icon: 'Info', tags: ['Intermediário', 'Dívidas'] },
      { id: 'cr1', title: 'Estratégias de Investimento Avançadas', description: 'Aprofunde-se em análise de ativos, derivativos, fundos.', icon: 'TrendingUp', tags: ['Avançado', 'Investimentos'] },
      { id: 'cr2', title: 'Finanças Corporativas e Gestão', description: 'Entenda contabilidade, fluxo de caixa, valuation.', icon: 'Landmark', tags: ['Avançado', 'Corporativo'] },
      { id: 'cr3', title: 'Mercado Imobiliário e Outros Ativos', description: 'Explore investimentos em imóveis, criptomoedas.', icon: 'Handshake', tags: ['Avançado', 'Ativos'] },
    ],
    investmentPlatforms: [
      { id: 'ipr1', name: 'Plataforma de Trading Profissional', description: 'Acesso a ferramentas avançadas.', link: '#', icon: 'TrendingUp' },
      { id: 'ipr2', name: 'Portfólio Modelo e Análise de Mercado', description: 'Exemplos de portfólios diversificados.', link: '#', icon: 'BookUser' },
      { id: 'ipp1', name: 'Simulador de Investimentos Júnior', description: 'Pratique investimentos com dinheiro fictício.', link: '#', icon: 'TrendingUp' },
      { id: 'ipp2', name: 'Guia: Primeiras Aplicações Reais', description: 'Passo a passo para abrir sua primeira conta.', link: '#', icon: 'PiggyBank' },
    ],
    tips: ["Comece explorando os cursos 'Avançados' para os alunos de nível mais elevado.", "Agende treinamentos especializados para a equipe pedagógica sobre os novos conteúdos."]
  },
};