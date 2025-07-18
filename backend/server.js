import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'super_secreto_e_forte_chave_aqui_12345';

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Formato esperado: 'Bearer TOKEN_AQUI'
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // console.log('Token não fornecido.');
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

app.post('/signup', (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const passwordHash = hashPassword(password);
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
      res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso!',
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
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  console.log(`Tentativa de login para o e-mail: ${email}`);
  console.log(`Senha recebida (texto claro): ${password}`);

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const hashedPasswordInput = hashPassword(password);
  console.log(`Senha de entrada hashed: ${hashedPasswordInput}`);

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (err, user) => {
      if (err) {
        console.error('Erro no login:', err.message);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
      }
      if (user) {
        console.log(`Usuário encontrado no DB: ${user.email}`);
        console.log(`Hash da senha armazenada no DB: ${user.password_hash}`);
      } else {
        console.log(`Usuário com e-mail ${email} NÃO encontrado no DB.`);
      }
      if (!user || user.password_hash !== hashedPasswordInput) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      let userMetadata = {};
      try {
        userMetadata = JSON.parse(user.user_metadata || '{}');
      } catch (parseError) {
        console.warn('Erro ao parsear user_metadata:', parseError);
      }

      res.json({
        success: true,
        user: {
          id: String(user.id),
          email: user.email,
          user_metadata: {
            first_name: userMetadata.first_name,
            last_name: userMetadata.last_name,
            plan_type: user.plan_type
          }
        }
      });
    }
  );
});

app.get('/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const userId = authHeader.split(' ')[1];
    db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, user) => {
      if (err || !user) return res.json({ data: { user: null } });

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
  } else {
    res.json({ data: { user: null } });
  }
});

app.put('/users/:id/plan', (req, res) => {
  const userId = req.params.id;
  const { plan_type } = req.body;

  if (!plan_type) {
    return res.status(400).json({ error: 'O tipo de plano é obrigatório.' });
  }

  db.run(
    `UPDATE users SET plan_type = ? WHERE id = ?`,
    [plan_type, userId],
    function (err) {
      if (err) {
        console.error('Erro ao atualizar plano:', err.message);
        return res.status(500).json({ error: 'Erro ao atualizar plano do usuário.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      res.json({ success: true, message: 'Plano atualizado com sucesso.' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

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

