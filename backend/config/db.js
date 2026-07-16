import { Pool } from 'pg';

const pool = process.env.DATABASE_URL
  ? new Pool({
      
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } 
    })
  : new Pool({
      
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Ошибка подключения:', err);
  } else {
    console.log(process.env.DATABASE_URL ? 'Успешное подключение к облаку Render!' : 'Успешное подключение локально!');
  }
});

export const db = {
  query: (text, params) => pool.query(text, params),
};
