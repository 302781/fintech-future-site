import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'; // Importa dotenv para carregar variáveis de ambiente

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// --- Resolução de Caminho para ES Modules ---
// Em módulos ES (import/export), __dirname não existe globalmente como em CommonJS.
// Esta é a forma padrão e recomendada de obter o diretório atual do arquivo.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuração do Caminho do Banco de Dados ---
// O nome do arquivo do banco de dados deve ser configurável, idealmente via variável de ambiente.
// Isso permite que você use diferentes bancos de dados para desenvolvimento, teste e produção.
const DB_FILENAME = process.env.DB_FILENAME || 'fintech_app.sqlite3'; // Nome padrão do arquivo DB
const dbPath = path.resolve(__dirname, DB_FILENAME);

// --- Criação e Conexão com o Banco de Dados ---
// `sqlite3.Database` cria ou abre um arquivo de banco de dados.
// Usamos `sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE` para abrir o DB para leitura/escrita
// e criá-lo se não existir. Estes são os padrões, mas explicitá-los melhora a clareza.
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    // Se houver um erro na conexão, ele é CRÍTICO.
    // Registramos o erro e, em seguida, encerramos o processo para evitar que a aplicação
    // tente operar sem uma conexão funcional com o banco de dados.
    console.error('❌ ERRO CRÍTICO: Não foi possível conectar ao banco de dados SQLite:', err.message);
    process.exit(1); // Encerra o processo com um código de erro
  } else {
    // Mensagem de sucesso ao conectar.
    console.log(`✅ Conectado ao banco de dados SQLite em: ${dbPath}`);
  }
});

// --- Exporta a Instância do Banco de Dados ---
// A instância `db` é exportada para que possa ser utilizada por outras partes do seu backend
// para realizar operações de SQL (INSERT, SELECT, UPDATE, DELETE).
export default db;
