import sqlite3 from 'sqlite3';
import dbpath from './database.db';
import { fileURLToPath } from 'url';

// __dirname equivalente para ESModules:
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

export default db;

