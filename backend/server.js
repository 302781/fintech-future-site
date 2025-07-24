import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js'; // Assumindo que db.js configura a conexão SQLite
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Para IDs de mensagens no chat AI, se aplicável

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Configurações Iniciais ---
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'SeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
const SALT_ROUNDS = 10;

// --- Funções de Autenticação e Autorização ---
const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Middleware de Autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Erro de verificação do token:', err.message);
            return res.status(403).json({ error: 'Token de autenticação inválido ou expirado.' });
        }
        req.user = user; // Anexa as informações do usuário ao objeto de requisição
        next();
    });
};

// Middleware de Autorização (para roles)
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Acesso negado: Você não tem permissão para esta ação.' });
        }
        next();
    };
};

// --- Inicialização do Banco de Dados ---
db.serialize(() => {
    // Tabela 'users'
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            plan_type TEXT DEFAULT 'Escola Básica',
            user_metadata TEXT,
            role TEXT DEFAULT 'user' -- Adicionado campo role
        )
    `, (err) => {
        if (err) console.error("Erro ao criar tabela 'users':", err.message);
        else console.log("Tabela 'users' verificada/criada.");
    });

    // Tabela 'courses'
    db.run(`
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'draft', -- 'draft', 'published', 'archived'
            category TEXT,
            duration TEXT,
            rating REAL DEFAULT 0,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
            created_by INTEGER,
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
        )
    `, (err) => {
        if (err) console.error("Erro ao criar tabela 'courses':", err.message);
        else console.log("Tabela 'courses' verificada/criada.");
    });

    // Tabela 'modules'
    db.run(`
        CREATE TABLE IF NOT EXISTS modules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            module_order INTEGER,
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) console.error("Erro ao criar tabela 'modules':", err.message);
        else console.log("Tabela 'modules' verificada/criada.");
    });

    // Tabela 'lessons'
    db.run(`
        CREATE TABLE IF NOT EXISTS lessons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            module_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT,
            lesson_order INTEGER,
            video_url TEXT,
            duration_minutes INTEGER,
            FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) console.error("Erro ao criar tabela 'lessons':", err.message);
        else console.log("Tabela 'lessons' verificada/criada.");
    });

    // Tabela 'enrollments'
    db.run(`
        CREATE TABLE IF NOT EXISTS enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            course_id INTEGER NOT NULL,
            enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            completion_date DATETIME,
            progress REAL DEFAULT 0, -- 0.0 a 1.0
            status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed'
            UNIQUE(user_id, course_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) console.error("Erro ao criar tabela 'enrollments':", err.message);
        else console.log("Tabela 'enrollments' verificada/criada.");
    });

    // Opcional: Adicionar um usuário admin se não existir
    db.get(`SELECT COUNT(*) as count FROM users WHERE email = 'admin@example.com'`, async (err, row) => {
        if (err) {
            console.error("Erro ao verificar admin:", err.message);
            return;
        }
        if (row.count === 0) {
            const adminPasswordHash = await hashPassword('admin123'); // Senha padrão para o admin
            const adminMetadata = JSON.stringify({ first_name: 'Admin', last_name: 'User' });
            db.run(
                `INSERT INTO users (email, password_hash, plan_type, user_metadata, role) VALUES (?, ?, ?, ?, ?)`,
                ['admin@example.com', adminPasswordHash, 'Premium', adminMetadata, 'admin'],
                (err) => {
                    if (err) console.error("Erro ao inserir usuário admin padrão:", err.message);
                    else console.log("Usuário admin padrão 'admin@example.com' criado.");
                }
            );
        }
    });
});

// --- Rotas de Autenticação ---

// Rota de Cadastro de Usuário
app.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'Todos os campos (e-mail, senha, primeiro nome, último nome) são obrigatórios.' });
    }

    try {
        const passwordHash = await hashPassword(password);
        const userMetadata = JSON.stringify({ first_name: firstName, last_name: lastName });

        db.run(
            `INSERT INTO users (email, password_hash, plan_type, user_metadata, role) VALUES (?, ?, ?, ?, ?)`,
            [email, passwordHash, 'Escola Básica', userMetadata, 'user'], // Define 'user' como role padrão
            function (err) {
                if (err) {
                    console.error('Erro no cadastro:', err.message);
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ error: 'E-mail já cadastrado.' });
                    }
                    return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
                }

                const token = jwt.sign(
                    { id: this.lastID, email, plan_type: 'Escola Básica', role: 'user' }, // Inclui role no token
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.status(201).json({
                    success: true,
                    message: 'Usuário cadastrado com sucesso!',
                    token,
                    user: {
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
        console.error('Erro ao fazer hash da senha:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao processar senha.' });
    }
});

// Rota de Login
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    try {
        db.get(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            async (err, user) => {
                if (err) {
                    console.error('Erro no login(db.get):', err.message);
                    return res.status(500).json({ error: 'Erro interno do servidor' });
                }

                if (!user) {
                    console.log(`Tentativa de login para ${email}: usuário não encontrado.`);
                    return res.status(401).json({ error: 'Credenciais inválidas.' });
                }

                const hashedPasswordFromDb = user.password_hash;
                
                if (hashedPasswordFromDb === undefined || hashedPasswordFromDb === null) {
                    console.error(`[Login Erro] Hash da senha não encontrado para o usuário: ${email}. Verifique o DB.`);
                    return res.status(500).json({ error: 'Erro interno do servidor: hash da senha ausente.' });
                }

                const isPasswordValid = await comparePassword(password, hashedPasswordFromDb);

                if (!isPasswordValid) {
                    return res.status(401).json({ error: 'Credenciais inválidas' });
                }

                let userMetadata = {};
                try {
                    userMetadata = JSON.parse(user.user_metadata || '{}');
                } catch (parseError) {
                    console.warn('Erro ao parsear user_metadata:', parseError);
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email, plan_type: user.plan_type, role: user.role }, // Inclui role no token
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.json({
                    success: true,
                    token,
                    user: {
                        id: String(user.id),
                        email: user.email,
                        user_metadata: {
                            first_name: userMetadata.first_name,
                            last_name: userMetadata.last_name,
                            plan_type: user.plan_type,
                            role: user.role // Incluído para consistência
                        }
                    }
                });
            }
        );
    } catch (error) {
        console.error('Erro inesperado no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para obter informações do usuário logado
app.get('/user', authenticateToken, (req, res) => {
    const userFromToken = req.user;

    db.get(`SELECT * FROM users WHERE id = ?`, [userFromToken.id], (err, user) => {
        if (err || !user) {
            console.error('Erro ao buscar usuário por ID do token:', err ? err.message : 'Usuário não encontrado.');
            return res.status(404).json({ error: 'Usuário autenticado não encontrado no banco de dados.' });
        }

        let userMetadata = {};
        try {
            userMetadata = JSON.parse(user.user_metadata || '{}');
        } catch (parseError) {
            console.warn('Erro ao parsear user_metadata para /user:', parseError);
        }

        res.json({
            data: {
                user: {
                    id: String(user.id),
                    email: user.email,
                    user_metadata: {
                        first_name: userMetadata.first_name,
                        last_name: userMetadata.last_name,
                        plan_type: user.plan_type,
                        role: user.role // Inclui role no retorno
                    }
                }
            }
        });
    });
});

// Rota Protegida para Atualizar Plano do Usuário
app.put('/users/:id/plan', authenticateToken, (req, res) => {
    const userIdFromToken = req.user.id;
    const userIdFromParams = parseInt(req.params.id, 10);
    const { plan_type } = req.body;

    if (userIdFromToken !== userIdFromParams) {
        return res.status(403).json({ error: 'Acesso negado: Você não tem permissão para atualizar o plano de outro usuário.' });
    }

    if (!plan_type) {
        return res.status(400).json({ error: 'O tipo de plano é obrigatório.' });
    }

    db.run(
        `UPDATE users SET plan_type = ? WHERE id = ?`,
        [plan_type, userIdFromParams],
        function (err) {
            if (err) {
                console.error('Erro ao atualizar plano:', err.message);
                return res.status(500).json({ error: 'Erro ao atualizar plano do usuário.' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado ou plano já era o mesmo.' });
            }
            res.json({ success: true, message: 'Plano atualizado com sucesso.' });
        }
    );
});

// --- Rotas de Gerenciamento de Cursos (Admin) ---

// Rota para criar um novo curso (apenas Admin)
app.post('/courses', authenticateToken, authorizeRoles(['admin']), (req, res) => {
    const { title, description, category, duration, status } = req.body;
    const created_by = req.user.id; // Usuário logado é o criador

    if (!title || !description || !category || !duration) {
        return res.status(400).json({ error: 'Título, descrição, categoria e duração são obrigatórios.' });
    }

    db.run(
        `INSERT INTO courses (title, description, category, duration, status, created_by) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, category, duration, status || 'draft', created_by],
        function (err) {
            if (err) {
                console.error('Erro ao criar curso:', err.message);
                return res.status(500).json({ error: 'Erro ao criar curso.' });
            }
            res.status(201).json({ success: true, message: 'Curso criado com sucesso!', courseId: this.lastID });
        }
    );
});

// Rota para listar cursos (com filtros opcionais)
app.get('/courses', authenticateToken, (req, res) => {
    const { category, status, searchTerm } = req.query;
    let sql = `SELECT c.*, u.email as created_by_email FROM courses c LEFT JOIN users u ON c.created_by = u.id WHERE 1=1`;
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
            console.error('Erro ao buscar cursos:', err.message);
            return res.status(500).json({ error: 'Erro ao buscar cursos.' });
        }
        res.json({ success: true, courses: rows });
    });
});

// Rota para obter um curso específico por ID
app.get('/courses/:id', authenticateToken, (req, res) => {
    const courseId = req.params.id;

    db.get(
        `SELECT c.*, u.email as created_by_email FROM courses c LEFT JOIN users u ON c.created_by = u.id WHERE c.id = ?`,
        [courseId],
        (err, course) => {
            if (err) {
                console.error('Erro ao buscar curso:', err.message);
                return res.status(500).json({ error: 'Erro ao buscar curso.' });
            }
            if (!course) {
                return res.status(404).json({ error: 'Curso não encontrado.' });
            }
            res.json({ success: true, course });
        }
    );
});

// Rota para atualizar um curso (apenas Admin ou criador)
app.put('/courses/:id', authenticateToken, authorizeRoles(['admin']), (req, res) => {
    const courseId = req.params.id;
    const { title, description, category, duration, status, rating } = req.body;
    const userId = req.user.id; // ID do usuário que está fazendo a atualização

    db.run(
        `UPDATE courses SET title = ?, description = ?, category = ?, duration = ?, status = ?, rating = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?`,
        [title, description, category, duration, status, rating, courseId],
        function (err) {
            if (err) {
                console.error('Erro ao atualizar curso:', err.message);
                return res.status(500).json({ error: 'Erro ao atualizar curso.' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Curso não encontrado ou nenhum dado alterado.' });
            }
            res.json({ success: true, message: 'Curso atualizado com sucesso.' });
        }
    );
});

// Rota para deletar um curso (apenas Admin)
app.delete('/courses/:id', authenticateToken, authorizeRoles(['admin']), (req, res) => {
    const courseId = req.params.id;

    db.run(`DELETE FROM courses WHERE id = ?`, [courseId], function (err) {
        if (err) {
            console.error('Erro ao deletar curso:', err.message);
            return res.status(500).json({ error: 'Erro ao deletar curso.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }
        res.json({ success: true, message: 'Curso deletado com sucesso.' });
    });
});

// --- Rotas de Módulos e Aulas (Admin) ---

// Adicionar Módulo a um Curso
app.post('/courses/:courseId/modules', authenticateToken, authorizeRoles(['admin']), (req, res) => {
    const { courseId } = req.params;
    const { title, description, module_order } = req.body;

    if (!title || !module_order) {
        return res.status(400).json({ error: 'Título e ordem do módulo são obrigatórios.' });
    }

    db.run(
        `INSERT INTO modules (course_id, title, description, module_order) VALUES (?, ?, ?, ?)`,
        [courseId, title, description, module_order],
        function (err) {
            if (err) {
                console.error('Erro ao adicionar módulo:', err.message);
                return res.status(500).json({ error: 'Erro ao adicionar módulo.' });
            }
            res.status(201).json({ success: true, message: 'Módulo adicionado com sucesso!', moduleId: this.lastID });
        }
    );
});

// Listar Módulos de um Curso
app.get('/courses/:courseId/modules', authenticateToken, (req, res) => {
    const { courseId } = req.params;

    db.all(
        `SELECT * FROM modules WHERE course_id = ? ORDER BY module_order ASC`,
        [courseId],
        (err, modules) => {
            if (err) {
                console.error('Erro ao listar módulos:', err.message);
                return res.status(500).json({ error: 'Erro ao listar módulos.' });
            }
            res.json({ success: true, modules });
        }
    );
});

// Adicionar Aula a um Módulo
app.post('/modules/:moduleId/lessons', authenticateToken, authorizeRoles(['admin']), (req, res) => {
    const { moduleId } = req.params;
    const { title, content, lesson_order, video_url, duration_minutes } = req.body;

    if (!title || !content || !lesson_order) {
        return res.status(400).json({ error: 'Título, conteúdo e ordem da aula são obrigatórios.' });
    }

    db.run(
        `INSERT INTO lessons (module_id, title, content, lesson_order, video_url, duration_minutes) VALUES (?, ?, ?, ?, ?, ?)`,
        [moduleId, title, content, lesson_order, video_url, duration_minutes],
        function (err) {
            if (err) {
                console.error('Erro ao adicionar aula:', err.message);
                return res.status(500).json({ error: 'Erro ao adicionar aula.' });
            }
            res.status(201).json({ success: true, message: 'Aula adicionada com sucesso!', lessonId: this.lastID });
        }
    );
});

// Listar Aulas de um Módulo
app.get('/modules/:moduleId/lessons', authenticateToken, (req, res) => {
    const { moduleId } = req.params;

    db.all(
        `SELECT * FROM lessons WHERE module_id = ? ORDER BY lesson_order ASC`,
        [moduleId],
        (err, lessons) => {
            if (err) {
                console.error('Erro ao listar aulas:', err.message);
                return res.status(500).json({ error: 'Erro ao listar aulas.' });
            }
            res.json({ success: true, lessons });
        }
    );
});


// --- Rotas de Inscrição em Cursos (Usuário) ---

// Inscrever um usuário em um curso
app.post('/enrollments', authenticateToken, (req, res) => {
    const { course_id } = req.body;
    const user_id = req.user.id;

    if (!course_id) {
        return res.status(400).json({ error: 'ID do curso é obrigatório para inscrição.' });
    }

    db.run(
        `INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)`,
        [user_id, course_id],
        function (err) {
            if (err) {
                console.error('Erro ao inscrever usuário:', err.message);
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: 'Usuário já inscrito neste curso.' });
                }
                return res.status(500).json({ error: 'Erro ao inscrever usuário no curso.' });
            }
            res.status(201).json({ success: true, message: 'Inscrição realizada com sucesso!', enrollmentId: this.lastID });
        }
    );
});

// Listar cursos em que o usuário está inscrito
app.get('/enrollments/my-courses', authenticateToken, (req, res) => {
    const user_id = req.user.id;

    db.all(
        `SELECT e.*, c.title, c.description, c.category, c.duration FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.user_id = ?`,
        [user_id],
        (err, enrollments) => {
            if (err) {
                console.error('Erro ao listar cursos inscritos:', err.message);
                return res.status(500).json({ error: 'Erro ao listar cursos inscritos.' });
            }
            res.json({ success: true, enrollments });
        }
    );
});

// Desinscrever um usuário de um curso
app.delete('/enrollments/:courseId', authenticateToken, (req, res) => {
    const courseId = req.params.courseId;
    const user_id = req.user.id;

    db.run(
        `DELETE FROM enrollments WHERE user_id = ? AND course_id = ?`,
        [user_id, courseId],
        function (err) {
            if (err) {
                console.error('Erro ao desinscrever usuário:', err.message);
                return res.status(500).json({ error: 'Erro ao desinscrever usuário.' });
            }
            if (this.changes === 0) {
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
        // Simulação de resposta da IA
        const aiResponse = await new Promise(resolve => {
            setTimeout(() => {
                let responseText = 'Olá! Sou seu assistente de IA para educação financeira. Como posso ajudar hoje?';
                if (message.toLowerCase().includes('investimento')) {
                    responseText = 'Investimento é a alocação de recursos com a expectativa de gerar renda ou ganho futuro. Que tipo de investimento te interessa?';
                } else if (message.toLowerCase().includes('renda fixa')) {
                    responseText = 'Renda fixa são investimentos que possuem regras de rendimento definidas no momento da aplicação, como CDBs e Tesouro Direto.';
                } else if (message.toLowerCase().includes('criptomoeda')) {
                    responseText = 'Criptomoedas são moedas digitais descentralizadas que utilizam criptografia para segurança. Bitcoin e Ethereum são exemplos populares.';
                }
                resolve({ reply: responseText, id: uuidv4(), timestamp: new Date() });
            }, 1000); // Simula o tempo de processamento da IA
        });

        res.json({ success: true, aiMessage: aiResponse });
    } catch (error) {
        console.error('Erro ao interagir com a IA:', error.message);
        res.status(500).json({ error: 'Erro ao processar sua solicitação com a IA.' });
    }
});


// --- Início do Servidor ---
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// --- Graceful Shutdown do Banco de Dados ---
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o banco de dados:', err.message);
        } else {
            console.log('Conexão com o banco de dados SQLite fechada.');
        }
        process.exit(0);
    });
});