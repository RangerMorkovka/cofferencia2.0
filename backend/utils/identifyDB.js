import jwt from 'jsonwebtoken';

export const identifyDB = (req, res, next)=>{

    try{
const token = (req.headers.authorization || '').trim();
        if(token)
            try {
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
                        req.user = {dbName : decoded.dbName};
                        req.userId = decoded.id;
                        console.log(decoded.dbName)
                       return next();
        }catch(jwtErr){
 console.log(jwtErr.message)
        }

        req.user = {dbName:'cofferencia'};
    return next();
    }catch(err){
        return res.status(500).json({message: 'Ошибка инициализации базы данных'})
    }
    
}