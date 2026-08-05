import { Pool } from "pg";

const pool = new Pool({
      
      connectionString: process.env.DATABASE_URL,
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
