// backend/src/config/db.ts (Exemplo de localização no seu backend)
import mysql from 'mysql2/promise';

// É CRUCIAL usar variáveis de ambiente para credenciais de banco de dados
// Carregue-as usando 'dotenv' no seu ponto de entrada do backend
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'sua_senha_do_mysql'; // Substitua com sua senha real, mas NÃO A EXPOR.
const DB_DATABASE = process.env.DB_DATABASE || 'fintech';

export const getConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    });
    console.log('Conexão MySQL estabelecida com sucesso!');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao MySQL:', error);
    // O ideal é relançar o erro ou encerrar a aplicação se a conexão for vital
    throw error;
  }
};
