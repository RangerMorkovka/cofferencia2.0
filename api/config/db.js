import { Pool } from "pg";

const pool = new Pool({
      
      host: 'aws-0-us-east-1.pooler.supabase.com',        // db.czbzenyqpajayvktijgr.supabase.co
  user: process.env.postgres_POSTGRES_USER,       // postgres
  password: process.env.postgres_POSTGRES_PASSWORD, // hXx3j3bAb9IUELXg
  database: process.env.postgres_POSTGRES_DATABASE, // postgres
  port: 6543,                               
      ssl: { rejectUnauthorized: false } 
    });
 

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Ошибка подключения:", err);
  } else {
    console.log(
      process.env.DATABASE_URL
        ? "Успешное подключение к облаку Render!"
        : "Успешное подключение локально!",
    );
  }
});

export const db = {
  query: (text, params) => pool.query(text, params),
};
