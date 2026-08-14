import { Pool } from "pg";

const pool = new Pool({
      
     /* connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } 
    });*/

   host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123098qwe',
  database: 'cofferencia',
  ssl: false,
});
 
const testPool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123098qwe',
  database: 'testdb',
  ssl: false,
  connectionTimeoutMillis: 3000,
})

const getPool = (dbName)=>{
  console.log({dbName})
  if(dbName === 'testdb') {
    
  console.log({dbName});
 
  return testPool;
}
return pool
}
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
testPool.query("SELECT NOW()",(err,res)=>{
  if(err) console.error(err);
  else{
    console.log(" Успешное подключени к тестовой БД")
  }
})
export const db = {
  query: async (text, params, dbName) =>{
    try{
    const currentPool = getPool(dbName);
    return await currentPool.query(text, params);
  }catch(err){
    console.error(err.message)
  }
 
},
 getClient: async (dbName) => {
    const currentPool = getPool(dbName); 
    return await currentPool.connect();
}

}
