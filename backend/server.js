import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./db.sqlite3');

// Criação da tabela
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  firstName TEXT,
  lastName TEXT
)`);

// Cadastro
app.post('/signup', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  db.run(
    `INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`,
    [email, password, firstName, lastName],
    function (err) {
      if (err) {
        console.error('Erro no cadastro:', err.message);
        return res.status(400).json({ error: err.message });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Login
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password],
    (err, user) => {
      if (err || !user) {
        console.error('Erro no login:', err?.message);
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      res.json({ success: true, user });
    }
  );
});

app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
