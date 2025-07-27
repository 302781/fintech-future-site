import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js'; // Assumindo que db.js configura a conexão SQLite
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Para IDs de mensagens no chat AI, se aplicável

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Porta do servidor, padrão 3001

// --- Configurações Iniciais do Express ---

// Middleware CORS: Permite que seu frontend (em um domínio/porta diferente)
// faça requisições para este backend. Em produção, considere restringir as origens.
// Exemplo: cors({ origin: 'http://seu-dominio-frontend.com' })
app.use(cors());

// Middleware bodyParser: Analisa corpos de requisição JSON.
app.use(bodyParser.json());

// JWT_SECRET: Chave secreta para assinar e verificar JSON Web Tokens.
// CRÍTICO: Em produção, essa chave deve ser MUITO complexa e armazenada de forma SEGURA
// em variáveis de ambiente, nunca diretamente no código.
const JWT_SECRET = process.env.JWT_SECRET || 'umaChaveSecretaMuitoForteEAleatoriaQueNinguemVaiAdivinhar!@#$12345';
if (JWT_SECRET === 'umaChaveSecretaMuitoForteEAleatoriaQueNinguemVaiAdivinhar!@#$12345') {
  console.warn('AVISO: A variável de ambiente JWT_SECRET não está definida. Usando uma chave padrão. Por favor, defina JWT_SECRET em seu arquivo .env para produção.');
}

// SALT_ROUNDS para bcrypt: Define a complexidade do hashing da senha.
// Um valor de 10 é um bom equilíbrio entre segurança e desempenho para a maioria dos casos.
const SALT_ROUNDS = 10;

// --- Funções de Autenticação e Autorização ---

/**
 * Hasheia uma senha usando bcrypt.
 * @param {string} password - A senha em texto puro.
 * @returns {Promise<string>} O hash da senha.
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compara uma senha em texto puro com um hash de senha.
 * @param {string} password - A senha em texto puro.
 * @param {string} hash - O hash da senha armazenado.
 * @returns {Promise<boolean>} True se as senhas coincidirem, false caso contrário.
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Middleware de Autenticação: Verifica a validade do token JWT na requisição.
 * Anexa as informações do usuário (contidas no token) a `req.user`.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função para passar o controle para o próximo middleware.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Erro de verificação do token JWT:', err.message);
      // Erros comuns: TokenExpiredError, JsonWebTokenError
      return res.status(403).json({ error: 'Token de autenticação inválido ou expirado.' });
    }
    // Anexa as informações decodificadas do token (id, email, plan_type, role) a req.user
    req.user = user;
    next(); // Continua para a próxima função middleware/rota
  });
};

/**
 * Middleware de Autorização: Verifica se o usuário tem uma das roles permitidas.
 * Deve ser usado APÓS `authenticateToken`.
 * @param {string[]} roles - Um array de roles permitidas (ex: ['admin', 'editor']).
 * @returns {express.RequestHandler} Um middleware de Express.
 */
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    // req.user é populado por authenticateToken
    if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado: Você não tem permissão para esta ação.' });
    }
    next();
  };
};

// --- Inicialização do Banco de Dados SQLite ---
// Garante que as tabelas existam antes de iniciar o servidor
db.serialize(() => {
  // Tabela 'users': Armazena informações dos usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      plan_type TEXT DEFAULT 'Escola Básica', -- Tipo de plano do usuário (Ex: 'Escola Básica', 'Escola Premium', 'Rede de Ensino')
      user_metadata TEXT, -- Campo para armazenar dados JSON adicionais (primeiro nome, último nome, etc.)
      role TEXT DEFAULT 'user' -- Role do usuário (ex: 'user', 'admin') para controle de acesso
    )
  `, (err) => {
    if (err) console.error("Erro ao criar tabela 'users':", err.message);
    else console.log("Tabela 'users' verificada/criada.");
  });

  // Tabela 'courses': Armazena informações sobre os cursos educativos
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'draft', -- 'draft', 'published', 'archived'
      category TEXT, -- Ex: 'Investimentos', 'Poupança', 'Orçamento'
      duration TEXT, -- Ex: '10 horas', '2 semanas'
      rating REAL DEFAULT 0, -- Avaliação média do curso
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_by INTEGER, -- ID do usuário que criou o curso
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `, (err) => {
    if (err) console.error("Erro ao criar tabela 'courses':", err.message);
    else console.log("Tabela 'courses' verificada/criada.");
  });

  // Tabela 'modules': Organiza cursos em módulos
  db.run(`
    CREATE TABLE IF NOT EXISTS modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      module_order INTEGER, -- Ordem dos módulos dentro de um curso
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) console.error("Erro ao criar tabela 'modules':", err.message);
    else console.log("Tabela 'modules' verificada/criada.");
  });

  // Tabela 'lessons': Conteúdo individual das aulas
  db.run(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      module_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT, -- Conteúdo HTML/Markdown da aula
      lesson_order INTEGER, -- Ordem das aulas dentro de um módulo
      video_url TEXT, -- URL para vídeos da aula
      duration_minutes INTEGER, -- Duração da aula em minutos
      FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) console.error("Erro ao criar tabela 'lessons':", err.message);
    else console.log("Tabela 'lessons' verificada/criada.");
  });

  // Tabela 'enrollments': Rastreia as inscrições dos usuários em cursos
  db.run(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      completion_date DATETIME, -- Data de conclusão do curso
      progress REAL DEFAULT 0, -- Progresso do usuário no curso (0.0 a 1.0)
      status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed'
      UNIQUE(user_id, course_id), -- Garante que um usuário só pode se inscrever uma vez em um curso
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) console.error("Erro ao criar tabela 'enrollments':", err.message);
    else console.log("Tabela 'enrollments' verificada/criada.");
  });

  // Inserção de um usuário admin padrão (se não existir)
  db.get(`SELECT COUNT(*) as count FROM users WHERE email = 'admin@example.com'`, async (err, row) => {
    if (err) {
      console.error("Erro ao verificar admin existente:", err.message);
      return;
    }
    if (row.count === 0) {
      const adminPasswordHash = await hashPassword(process.env.ADMIN_DEFAULT_PASSWORD || 'admin123'); // Senha padrão para o admin
      const adminMetadata = JSON.stringify({ first_name: 'Admin', last_name: 'User' });
      db.run(
        `INSERT INTO users (email, password_hash, plan_type, user_metadata, role) VALUES (?, ?, ?, ?, ?)`,
        ['admin@example.com', adminPasswordHash, 'Rede de Ensino', adminMetadata, 'admin'], // Admin tem o plano mais alto por padrão
        (insertErr) => {
          if (insertErr) console.error("Erro ao inserir usuário admin padrão:", insertErr.message);
          else console.log("Usuário admin padrão 'admin@example.com' criado.");
        }
      );
    }
  });
});

// --- Rotas de Autenticação ---

// Rota POST /signup: Registra um novo usuário
app.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validação de entrada básica
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Todos os campos (e-mail, senha, primeiro nome, último nome) são obrigatórios.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres.' });
  }

  try {
    const passwordHash = await hashPassword(password);
    const userMetadata = JSON.stringify({ first_name: firstName, last_name: lastName });

    db.run(
      `INSERT INTO users (email, password_hash, plan_type, user_metadata, role) VALUES (?, ?, ?, ?, ?)`,
      [email, passwordHash, 'Escola Básica', userMetadata, 'user'], // Define 'user' como role padrão
      function (err) { // Usar função tradicional para acessar `this.lastID`
        if (err) {
          console.error('Erro no cadastro (DB):', err.message);
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'E-mail já cadastrado.' });
          }
          return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }

        // Gera JWT para o novo usuário
        const token = jwt.sign(
          { id: this.lastID, email, plan_type: 'Escola Básica', role: 'user' },
          JWT_SECRET,
          { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.status(201).json({
          success: true,
          message: 'Usuário cadastrado com sucesso!',
          token, // Envia o token para o frontend
          user: { // Retorna dados do usuário logado para o frontend
            id: String(this.lastID),
            email,
            user_metadata: {
              first_name: firstName,
              last_name: lastName,
              plan_type: 'Escola Básica',
              role: 'user'
            }
          }
        });
      }
    );
  } catch (error) {
    console.error('Erro ao fazer hash da senha ou erro inesperado no signup:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao processar o cadastro.' });
  }
});

// Rota POST /signin: Autentica um usuário existente
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Validação de entrada
  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      async (err, user) => {
        if (err) {
          console.error('Erro no login (DB query):', err.message);
          return res.status(500).json({ error: 'Erro interno do servidor.' });
        }

        // Se o usuário não for encontrado ou a senha for inválida, retorne uma mensagem genérica por segurança
        if (!user || !user.password_hash) {
          console.log(`Tentativa de login para ${email}: usuário não encontrado ou hash de senha ausente.`);
          return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const isPasswordValid = await comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
          console.log(`Tentativa de login para ${email}: senha inválida.`);
          return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Tenta parsear user_metadata, se existir
        let userMetadata = {};
        try {
          userMetadata = JSON.parse(user.user_metadata || '{}');
        } catch (parseError) {
          console.warn('Erro ao parsear user_metadata para login:', parseError);
          // Opcional: Você pode querer retornar um erro 500 aqui se metadados corrompidos forem críticos
        }

        // Gera JWT para o usuário logado
        const token = jwt.sign(
          { id: user.id, email: user.email, plan_type: user.plan_type, role: user.role },
          JWT_SECRET,
          { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.json({
          success: true,
          token, // Envia o token para o frontend
          user: { // Retorna dados do usuário logado para o frontend
            id: String(user.id),
            email: user.email,
            user_metadata: {
              first_name: userMetadata.first_name,
              last_name: userMetadata.last_name,
              plan_type: user.plan_type,
              role: user.role
            }
          }
        });
      }
    );
  } catch (error) {
    console.error('Erro inesperado no signin:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota GET /user: Obtém informações do usuário logado
// Protegida pelo middleware authenticateToken
app.get('/user', authenticateToken, (req, res) => {
  const userFromToken = req.user; // Informações do usuário do token (id, email, plan_type, role)

  db.get(`SELECT * FROM users WHERE id = ?`, [userFromToken.id], (err, user) => {
    if (err || !user) {
      console.error('Erro ao buscar usuário por ID do token (DB):', err ? err.message : 'Usuário não encontrado.');
      return res.status(404).json({ error: 'Usuário autenticado não encontrado no banco de dados.' });
    }

    let userMetadata = {};
    try {
      userMetadata = JSON.parse(user.user_metadata || '{}');
    } catch (parseError) {
      console.warn('Erro ao parsear user_metadata para /user:', parseError);
    }

    res.json({
      data: { // Formato 'data: { user: { ... } }' para consistência com algumas APIs
        user: {
          id: String(user.id),
          email: user.email,
          user_metadata: {
            first_name: userMetadata.first_name,
            last_name: userMetadata.last_name,
            plan_type: user.plan_type,
            role: user.role
          }
        }
      }
    });
  });
});

// Rota PUT /users/:id/plan: Atualiza o tipo de plano de um usuário
// Protegida por autenticação e garante que o usuário só pode atualizar seu próprio plano
app.put('/users/:id/plan', authenticateToken, (req, res) => {
  const userIdFromToken = req.user.id; // ID do usuário do token
  const userIdFromParams = parseInt(req.params.id, 10); // ID do usuário na URL
  const { plan_type } = req.body; // Novo tipo de plano a ser definido

  // Garante que o usuário só pode atualizar o próprio plano, a menos que seja um admin
  // (Para admin, adicionar authorizeRoles(['admin']) aqui ou uma lógica mais complexa)
  if (userIdFromToken !== userIdFromParams && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado: Você não tem permissão para atualizar o plano de outro usuário.' });
  }

  if (!plan_type) {
    return res.status(400).json({ error: 'O tipo de plano é obrigatório.' });
  }

  db.run(
    `UPDATE users SET plan_type = ? WHERE id = ?`,
    [plan_type, userIdFromParams],
    function (err) { // Usar função tradicional para acessar `this.changes`
      if (err) {
        console.error('Erro ao atualizar plano (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao atualizar plano do usuário.' });
      }
      if (this.changes === 0) { // Se 0 linhas foram afetadas, o usuário não foi encontrado ou o plano já era o mesmo
        return res.status(404).json({ error: 'Usuário não encontrado ou plano já era o mesmo.' });
      }
      res.json({ success: true, message: 'Plano atualizado com sucesso.' });
    }
  );
});

// Rota POST /reset-password-request: Solicita um link de redefinição de senha
app.post('/reset-password-request', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório para solicitar redefinição de senha.' });
  }

  db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) {
      console.error('Erro ao buscar usuário para redefinição de senha:', err.message);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }

    if (!user) {
      // Por segurança, sempre retorne uma mensagem de sucesso, mesmo se o e-mail não existir.
      // Isso evita a enumeração de usuários.
      console.log(`Solicitação de redefinição de senha para e-mail não cadastrado: ${email}`);
      return res.json({ success: true, message: 'Se o e-mail estiver cadastrado, um link de redefinição de senha foi enviado.' });
    }

    // Geração de um token de uso único para redefinição de senha (curta duração)
    const resetToken = jwt.sign(
      { id: user.id, type: 'passwordReset' },
      JWT_SECRET,
      { expiresIn: '15m' } // Token expira em 15 minutos
    );

    // TODO: Enviar e-mail ao usuário com o link de redefinição
    // O link deve ser algo como: `http://seu-frontend.com/update-password?token=${resetToken}`
    // Você precisará integrar com um serviço de envio de e-mails (SendGrid, Mailgun, Nodemailer, etc.)
    console.log(`Link de redefinição de senha (exemplo): http://seu-frontend.com/update-password?token=${resetToken}`);
    res.json({ success: true, message: 'Se o e-mail estiver cadastrado, um link de redefinição de senha foi enviado.' });
  });
});

// Rota POST /update-password: Redefine a senha usando um token de redefinição
app.post('/update-password', async (req, res) => {
  const { token, newPassword } = req.body; // Ou `userId` se a requisição vier de um usuário logado

  // Se o token for usado (para fluxos de "esqueceu a senha")
  if (token) {
    if (!token || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'Token e nova senha (mínimo 8 caracteres) são obrigatórios.' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.error('Erro de verificação do token de redefinição:', err.message);
        return res.status(403).json({ error: 'Link de redefinição inválido ou expirado.' });
      }

      if (decodedToken.type !== 'passwordReset') {
        return res.status(403).json({ error: 'Tipo de token inválido para esta operação.' });
      }

      const userId = decodedToken.id;
      const newPasswordHash = await hashPassword(newPassword);

      db.run(
        `UPDATE users SET password_hash = ? WHERE id = ?`,
        [newPasswordHash, userId],
        function (updateErr) {
          if (updateErr) {
            console.error('Erro ao atualizar senha no DB (token):', updateErr.message);
            return res.status(500).json({ error: 'Erro ao redefinir a senha.' });
          }
          if (this.changes === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado ou senha não foi alterada.' });
          }
          res.json({ success: true, message: 'Senha redefinida com sucesso!' });
        }
      );
    });
  }
  // Se a requisição vier de um usuário JÁ logado que quer mudar a senha
  // Assumimos que o middleware authenticateToken já anexou req.user
  else if (req.user && newPassword) {
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'A nova senha deve ter no mínimo 8 caracteres.' });
    }
    const userId = req.user.id;
    const newPasswordHash = await hashPassword(newPassword);

    db.run(
      `UPDATE users SET password_hash = ? WHERE id = ?`,
      [newPasswordHash, userId],
      function (updateErr) {
        if (updateErr) {
          console.error('Erro ao atualizar senha no DB (logado):', updateErr.message);
          return res.status(500).json({ error: 'Erro ao redefinir a senha.' });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Usuário não encontrado ou senha não foi alterada.' });
        }
        res.json({ success: true, message: 'Senha atualizada com sucesso!' });
      }
    );
  } else {
    return res.status(400).json({ error: 'Requisição inválida para atualização de senha.' });
  }
});


// --- Rotas de Gerenciamento de Cursos (Admin/Criador) ---

// Rota POST /courses: Cria um novo curso
app.post('/courses', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  const { title, description, category, duration, status } = req.body;
  const created_by = req.user.id; // ID do usuário que criou o curso (do token)

  if (!title || !description || !category || !duration) {
    return res.status(400).json({ error: 'Título, descrição, categoria e duração são obrigatórios.' });
  }

  db.run(
    `INSERT INTO courses (title, description, category, duration, status, created_by) VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, category, duration, status || 'draft', created_by],
    function (err) {
      if (err) {
        console.error('Erro ao criar curso (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao criar curso.' });
      }
      res.status(201).json({ success: true, message: 'Curso criado com sucesso!', courseId: this.lastID });
    }
  );
});

// Rota GET /courses: Lista cursos (com filtros opcionais)
// Acessível a usuários autenticados (verificar permissões de acesso ao conteúdo no frontend)
app.get('/courses', authenticateToken, (req, res) => {
  const { category, status, searchTerm } = req.query;
  let sql = `SELECT c.*, u.email as created_by_email, u.role as created_by_role FROM courses c LEFT JOIN users u ON c.created_by = u.id WHERE 1=1`;
  const params = [];

  if (category) {
    sql += ` AND c.category = ?`;
    params.push(category);
  }
  if (status) {
    sql += ` AND c.status = ?`;
    params.push(status);
  }
  if (searchTerm) {
    sql += ` AND (c.title LIKE ? OR c.description LIKE ?)`;
    params.push(`%${searchTerm}%`, `%${searchTerm}%`);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error('Erro ao buscar cursos (DB):', err.message);
      return res.status(500).json({ error: 'Erro ao buscar cursos.' });
    }
    res.json({ success: true, courses: rows });
  });
});

// Rota GET /courses/:id: Obtém um curso específico por ID
app.get('/courses/:id', authenticateToken, (req, res) => {
  const courseId = req.params.id;

  db.get(
    `SELECT c.*, u.email as created_by_email, u.role as created_by_role FROM courses c LEFT JOIN users u ON c.created_by = u.id WHERE c.id = ?`,
    [courseId],
    (err, course) => {
      if (err) {
        console.error('Erro ao buscar curso por ID (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao buscar curso.' });
      }
      if (!course) {
        return res.status(404).json({ error: 'Curso não encontrado.' });
      }
      res.json({ success: true, course });
    }
  );
});

// Rota PUT /courses/:id: Atualiza um curso
// Apenas Admin pode atualizar. Se o criador puder, adicione lógica adicional.
app.put('/courses/:id', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  const courseId = req.params.id;
  const { title, description, category, duration, status, rating } = req.body;
  // const userId = req.user.id; // Se quiser verificar o criador

  // Validação de entrada
  if (!title || !description || !category || !duration) {
    return res.status(400).json({ error: 'Título, descrição, categoria e duração são obrigatórios para atualização.' });
  }

  db.run(
    `UPDATE courses SET title = ?, description = ?, category = ?, duration = ?, status = ?, rating = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?`,
    [title, description, category, duration, status, rating, courseId],
    function (err) {
      if (err) {
        console.error('Erro ao atualizar curso (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao atualizar curso.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Curso não encontrado ou nenhum dado alterado.' });
      }
      res.json({ success: true, message: 'Curso atualizado com sucesso.' });
    }
  );
});

// Rota DELETE /courses/:id: Deleta um curso
app.delete('/courses/:id', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  const courseId = req.params.id;

  db.run(`DELETE FROM courses WHERE id = ?`, [courseId], function (err) {
    if (err) {
      console.error('Erro ao deletar curso (DB):', err.message);
      return res.status(500).json({ error: 'Erro ao deletar curso.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }
    res.json({ success: true, message: 'Curso deletado com sucesso.' });
  });
});

// --- Rotas de Módulos e Aulas (Admin) ---

// Rota POST /courses/:courseId/modules: Adiciona um módulo a um curso
app.post('/courses/:courseId/modules', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  const { courseId } = req.params;
  const { title, description, module_order } = req.body;

  if (!title || typeof module_order === 'undefined' || module_order === null) {
    return res.status(400).json({ error: 'Título e ordem do módulo são obrigatórios.' });
  }

  db.run(
    `INSERT INTO modules (course_id, title, description, module_order) VALUES (?, ?, ?, ?)`,
    [courseId, title, description, module_order],
    function (err) {
      if (err) {
        console.error('Erro ao adicionar módulo (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao adicionar módulo.' });
      }
      res.status(201).json({ success: true, message: 'Módulo adicionado com sucesso!', moduleId: this.lastID });
    }
  );
});

// Rota GET /courses/:courseId/modules: Lista módulos de um curso
app.get('/courses/:courseId/modules', authenticateToken, (req, res) => {
  const { courseId } = req.params;

  db.all(
    `SELECT * FROM modules WHERE course_id = ? ORDER BY module_order ASC`,
    [courseId],
    (err, modules) => {
      if (err) {
        console.error('Erro ao listar módulos (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao listar módulos.' });
      }
      res.json({ success: true, modules });
    }
  );
});

// Rota POST /modules/:moduleId/lessons: Adiciona uma aula a um módulo
app.post('/modules/:moduleId/lessons', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  const { moduleId } = req.params;
  const { title, content, lesson_order, video_url, duration_minutes } = req.body;

  if (!title || !content || typeof lesson_order === 'undefined' || lesson_order === null) {
    return res.status(400).json({ error: 'Título, conteúdo e ordem da aula são obrigatórios.' });
  }

  db.run(
    `INSERT INTO lessons (module_id, title, content, lesson_order, video_url, duration_minutes) VALUES (?, ?, ?, ?, ?, ?)`,
    [moduleId, title, content, lesson_order, video_url, duration_minutes],
    function (err) {
      if (err) {
        console.error('Erro ao adicionar aula (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao adicionar aula.' });
      }
      res.status(201).json({ success: true, message: 'Aula adicionada com sucesso!', lessonId: this.lastID });
    }
  );
});

// Rota GET /modules/:moduleId/lessons: Lista aulas de um módulo
app.get('/modules/:moduleId/lessons', authenticateToken, (req, res) => {
  const { moduleId } = req.params;

  db.all(
    `SELECT * FROM lessons WHERE module_id = ? ORDER BY lesson_order ASC`,
    [moduleId],
    (err, lessons) => {
      if (err) {
        console.error('Erro ao listar aulas (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao listar aulas.' });
      }
      res.json({ success: true, lessons });
    }
  );
});

// --- Rotas de Inscrição em Cursos (Usuário) ---

// Rota POST /enrollments: Inscreve um usuário em um curso
app.post('/enrollments', authenticateToken, (req, res) => {
  const { course_id } = req.body;
  const user_id = req.user.id; // ID do usuário do token

  if (!course_id) {
    return res.status(400).json({ error: 'ID do curso é obrigatório para inscrição.' });
  }

  db.run(
    `INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)`,
    [user_id, course_id],
    function (err) {
      if (err) {
        console.error('Erro ao inscrever usuário (DB):', err.message);
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ error: 'Usuário já inscrito neste curso.' });
        }
        return res.status(500).json({ error: 'Erro ao inscrever usuário no curso.' });
      }
      res.status(201).json({ success: true, message: 'Inscrição realizada com sucesso!', enrollmentId: this.lastID });
    }
  );
});

// Rota GET /enrollments/my-courses: Lista cursos em que o usuário está inscrito
app.get('/enrollments/my-courses', authenticateToken, (req, res) => {
  const user_id = req.user.id; // ID do usuário do token

  db.all(
    `SELECT e.*, c.title, c.description, c.category, c.duration FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.user_id = ?`,
    [user_id],
    (err, enrollments) => {
      if (err) {
        console.error('Erro ao listar cursos inscritos (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao listar cursos inscritos.' });
      }
      res.json({ success: true, enrollments });
    }
  );
});

// Rota DELETE /enrollments/:courseId: Desinscreve um usuário de um curso
app.delete('/enrollments/:courseId', authenticateToken, (req, res) => {
  const courseId = req.params.courseId;
  const user_id = req.user.id; // ID do usuário do token

  db.run(
    `DELETE FROM enrollments WHERE user_id = ? AND course_id = ?`,
    [user_id, courseId],
    function (err) {
      if (err) {
        console.error('Erro ao desinscrever usuário (DB):', err.message);
        return res.status(500).json({ error: 'Erro ao desinscrever usuário.' });
      }
      if (this.changes === 0) { // Se 0 linhas afetadas, a inscrição não foi encontrada
        return res.status(404).json({ error: 'Inscrição não encontrada.' });
      }
      res.json({ success: true, message: 'Usuário desinscrito do curso com sucesso.' });
    }
  );
});

// --- Rota de Suporte AI (Exemplo simples) ---
// Adapte isso para a sua real integração com IA, talvez uma API externa
app.post('/ai-chat', authenticateToken, async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Mensagem é obrigatória.' });
  }

  try {
    // Simulação de resposta da IA (substituir por chamada à API de IA real)
    const aiResponse = await new Promise(resolve => {
      setTimeout(() => {
        let responseText = 'Olá! Sou seu assistente de IA para educação financeira. Como posso ajudar hoje?';
        if (message.toLowerCase().includes('investimento')) {
          responseText = 'Investimento é a alocação de recursos com a expectativa de gerar renda ou ganho futuro. Que tipo de investimento te interessa?';
        } else if (message.toLowerCase().includes('renda fixa')) {
          responseText = 'Renda fixa são investimentos que possuem regras de rendimento definidas no momento da aplicação, como CDBs e Tesouro Direto.';
        } else if (message.toLowerCase().includes('criptomoeda')) {
          responseText = 'Criptomoedas são moedas digitais descentralizadas que utilizam criptografia para segurança. Bitcoin e Ethereum são exemplos populares.';
        } else if (message.toLowerCase().includes('olá') || message.toLowerCase().includes('oi')) {
          responseText = `Olá ${req.user.email}! Como posso te auxiliar com suas finanças hoje?`;
        }
        resolve({ reply: responseText, id: uuidv4(), timestamp: new Date() });
      }, 1000); // Simula o tempo de processamento da IA
    });

    res.json({ success: true, aiMessage: aiResponse });
  } catch (error) {
    console.error('Erro ao interagir com a IA:', error); // Loga o erro completo para depuração
    res.status(500).json({ error: 'Erro ao processar sua solicitação com a IA.' });
  }
});


// --- Início do Servidor ---
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

// --- Graceful Shutdown do Banco de Dados ---
// Garante que a conexão com o banco de dados seja fechada de forma limpa
// ao receber um sinal de interrupção (ex: Ctrl+C)
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err.message);
    } else {
      console.log('Conexão com o banco de dados SQLite fechada.');
    }
    process.exit(0); // Sai do processo com sucesso
  });
});
