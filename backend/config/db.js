import {Pool} from 'pg';


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cofferencia',
    password: '123098qwe',
    port: '5432',
});
pool.query('SELECT NOW()', (err,res) => {
    if(err){
        console.error('Ошибка', err);
       
    }else {
        console.log('Успешное подключение');
    }
})
export const db =  {
    query: (text, params) => pool.query(text, params),
};