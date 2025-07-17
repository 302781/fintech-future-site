// db.js (versão ESModules)
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Emular __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'db.sqlite3');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err.message);
  } else {
    console.log(`Conectado ao banco de dados SQLite em: ${dbPath}`);
  }
});
app.use(cors({
  origin: 'http://localhost:5173', // Substitua pela porta do seu frontend se for diferente
  credentials: true
}));

export default db; // ← agora o import no server.js funciona
