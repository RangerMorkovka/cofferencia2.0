import express from 'express';
const app = express();
const port = process.env.port || 5174;
app.use(express.json());
app.set ('trust proxy', true);
const ALLOWED_IPS = ['::ffff:172.29.112.1','::ffff:10.59.23.207'];

app.get ('/api/check-access', (req,res) => {
const clientIP = req.ip || req.socket.remoteAddress;
//console.log(clientIP);
const isAllowed = ALLOWED_IPS.includes(clientIP);
console.log(`[БЭКЕНД] Клиент: ${clientIP} | Доступ: ${isAllowed}`);
res.json({showLoginButton: isAllowed, debugIp: clientIP});

});
app.listen(port, ()=> {
    console.log(`сервер запущен' ${port}`);
})