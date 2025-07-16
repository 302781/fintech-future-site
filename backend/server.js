// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js'; // Importa a instância do banco de dados de db.js
import crypto from 'crypto'; // Para simular hashing de senha (USE BCRYPTJS EM PRODUÇÃO!)

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Helper para hashing SIMPLIFICADO (APENAS PARA DEMONSTRAÇÃO - NÃO SEGURO PARA PROD)
// USE UMA BIBLIOTECA COMO 'bcryptjs' EM PRODUÇÃO!
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Criação da tabela
// Adicionei 'password_hash' e 'plan_type', e 'user_metadata' para firstName/lastName
db.serialize(() => { // Usar serialize para garantir que as operações rodem em ordem
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        plan_type TEXT DEFAULT 'Escola Básica',
        user_metadata TEXT -- Para armazenar JSON como firstName, lastName
    )`, (err) => {
        if (err) console.error("Erro ao criar tabela 'users':", err.message);
        else console.log("Tabela 'users' verificada/criada.");
    });
});


// Rota de Cadastro (Signup)
app.post('/signup', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const passwordHash = hashPassword(password);
  const userMetadata = JSON.stringify({ first_name: firstName, last_name: lastName }); // Armazena como JSON

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
        user: { // Retorna o user no formato que o frontend espera
            id: String(this.lastID), // IDs devem ser string no frontend CustomUser
            email: email, 
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

// Rota de Login (Signin)
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const hashedPasswordInput = hashPassword(password);

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (err, user) => {
      if (err) {
        console.error('Erro no login:', err.message);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
      
      if (user.password_hash !== hashedPasswordInput) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      let userMetadata = {};
      try {
          userMetadata = JSON.parse(user.user_metadata || '{}');
      } catch (parseError) {
          console.warn('Erro ao parsear user_metadata:', parseError);
      }

      // Retorna um objeto 'user' no formato que o frontend espera
      res.json({ 
        success: true, 
        user: { 
            id: String(user.id), // IDs devem ser string no frontend CustomUser
            email: user.email, 
            user_metadata: {
                first_name: userMetadata.first_name, // Usar .first_name (do JSON)
                last_name: userMetadata.last_name,   // Usar .last_name (do JSON)
                plan_type: user.plan_type 
            }
        } 
      });
    }
  );
});

// Rota para obter usuário atual (simula supabase.auth.getUser())
// Para uma aplicação real, isso envolveria um token de sessão/JWT
app.get('/user', (req, res) => {
    // Isso é uma SIMULAÇÃO BÁSICA. Em uma aplicação real:
    // Você validaria um token JWT do cabeçalho Authorization
    // e buscaria o usuário no DB com base nesse token.
    // Como não há tokens ainda, vamos apenas retornar um usuário "mock" ou o último logado.
    // Ou, mais robusto, um token deve ser enviado no header ou cookie.
    
    // Para fins de teste e simulação:
    // Se o cliente enviar um 'Authorization: Bearer <ID_DO_USUARIO>', tentamos buscar
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const userId = authHeader.split(' ')[1]; // Supondo que o token é o user ID para simulação
        db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, user) => {
            if (err || !user) {
                return res.json({ data: { user: null } }); // Retorna null se não encontrar
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
    } else {
        res.json({ data: { user: null } }); // Ninguém logado ou token inválido
    }
});


// Rota para atualizar o plano do usuário
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

// Fechar a conexão do DB ao encerrar o servidor
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