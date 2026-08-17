import { Pool } from "pg";

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } 
    });

/*host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123098qwe",
  database: "cofferencia",
  ssl: false,
});*/

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

const validateSchema = (schemaName) => {
  const allowedSchemas = ["public", "test"];
  return allowedSchemas.includes(schemaName) ? schemaName : "public";
};

export const db = {
  query: async (text, params = [], schemaName = "public") => {
    const client = await pool.connect();
    try {
      const currentSchema = validateSchema(schemaName);
      await client.query(`SET search_path TO ${currentSchema}`);
      return await client.query(text, params);
    } catch (err) {
      console.error(err.message);
      throw err;
    } finally {
      client.release();
    }
  },
  getClient: async (schemaName = "public") => {
    const client = await pool.connect();
    try {
      const currentSchema = validateSchema(schemaName);
      await client.query(`SET search_path TO ${currentSchema}`);
      return client;
    } catch (err) {
      client.release();
      throw err;
    }
  },
};
