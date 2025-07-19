import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT =  process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'uma_chave_secreta_padrao_muito_forte_e_longa_para_desenvolvimento';
const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticação inválido ou expirado.' });
    }
    req.user = user;
    next();
  });
};

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    plan_type TEXT DEFAULT 'Escola Básica',
    user_metadata TEXT
  )`, (err) => {
    if (err) console.error("Erro ao criar tabela 'users':", err.message);
    else console.log("Tabela 'users' verificada/criada.");
  });
});

app.post('/signup', async (req, res) => { // Tornar a função assíncrona
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Todos os campos (e-mail, senha, primeiro nome, último nome) são obrigatórios.' });
  }

  try {
    const passwordHash = await hashPassword(password); // Usar hashPassword assíncrono
    const userMetadata = JSON.stringify({ first_name: firstName, last_name: lastName });

    db.run(
      `INSERT INTO users (email, password_hash, plan_type, user_metadata) VALUES (?, ?, ?, ?)`,
      [email, passwordHash, 'Escola Básica', userMetadata],
      function (err) {
        if (err) {
          console.error('Erro no cadastro:', err.message);
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'E-mail já cadastrado.' });
          }
          return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }
        
        // Gerar token após cadastro bem-sucedido
        const token = jwt.sign(
          { id: this.lastID, email, plan_type: 'Escola Básica' },
          JWT_SECRET,
          { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.status(201).json({
          success: true,
          message: 'Usuário cadastrado com sucesso!',
          token, // Enviar o token de volta
          user: {
            id: String(this.lastID),
            email,
            user_metadata: {
              first_name: firstName,
              last_name: lastName,
              plan_type: 'Escola Básica'
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
app.post('/signin', async (req, res) => { // Tornar a função assíncrona
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      async (err, user) => { // Callback também assíncrono para await comparePassword
        if (err) {
          console.error('Erro no login:', err.message);
          return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
        
        if (!user) {
          return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Usar comparePassword assíncrono
        const isPasswordValid = await comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        let userMetadata = {};
        try {
          userMetadata = JSON.parse(user.user_metadata || '{}');
        } catch (parseError) {
          console.warn('Erro ao parsear user_metadata:', parseError);
        }

        // Gerar JWT após login bem-sucedido
        const token = jwt.sign(
          { id: user.id, email: user.email, plan_type: user.plan_type },
          JWT_SECRET,
          { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.json({
          success: true,
          token, // Enviar o token de volta para o frontend
          user: {
            id: String(user.id),
            email: user.email,
            user_metadata: {
              first_name: userMetadata.first_name,
              last_name: userMetadata.last_name,
              plan_type: user.plan_type // Incluído para consistência
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
// --- Fim das Rotas de Autenticação ---

// --- Rota Protegida para Obter Detalhes do Usuário Logado ---
// Agora esta rota usa o middleware authenticateToken para verificar o JWT
app.get('/user', authenticateToken, (req, res) => {
  // As informações do usuário estão em req.user (decodificadas do JWT)
  const userFromToken = req.user; 

  db.get(`SELECT * FROM users WHERE id = ?`, [userFromToken.id], (err, user) => {
    if (err || !user) {
      console.error('Erro ao buscar usuário por ID do token:', err ? err.message : 'Usuário não encontrado.');
      // Se chegou aqui, o token foi válido mas o usuário não está no DB. Erro grave ou token obsoleto.
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
            plan_type: user.plan_type
          }
        }
      }
    });
  });
});
// --- Fim da Rota Protegida ---

// --- Rota Protegida para Atualizar Plano do Usuário ---
app.put('/users/:id/plan', authenticateToken, (req, res) => {
  const userIdFromToken = req.user.id; // ID do usuário que fez a requisição (do JWT)
  const userIdFromParams = parseInt(req.params.id, 10); // ID do usuário a ser atualizado (da URL)
  const { plan_type } = req.body;

  // Garantir que um usuário só pode atualizar o próprio plano (ou implementar lógica de admin)
  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({ error: 'Acesso negado: Você não tem permissão para atualizar o plano de outro usuário.' });
  }

  if (!plan_type) {
    return res.status(400).json({ error: 'O tipo de plano é obrigatório.' });
  }

  db.run(
    `UPDATE users SET plan_type = ? WHERE id = ?`,
    [plan_type, userIdFromParams], // Usar userIdFromParams aqui, que já é um número
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
// --- Fim da Rota de Atualização de Plano ---


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

