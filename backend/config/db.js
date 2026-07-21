import { Pool } from "pg";

const pool = /*process.env.DATABASE_URL
  ? new Pool({
      
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } 
    })
  : */ new Pool({
  // Этот блок продолжит работать на вашем КОМПЬЮТЕРЕ (все ваши данные остаются без изменений)
  user: "postgres",
  host: "localhost",
  database: "cofferencia",
  password: "123098qwe",
  port: "5432",
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
