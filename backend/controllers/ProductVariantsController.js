import {db} from '../config/db.js'

export const getAllProductVariants = async (req, res) => {
  const dbName = req.user?.dbName || "cofferencia";
  
  try {
    
    const variants = await db.query('SELECT * FROM product_variants;', [], dbName);
        res.json(variants.rows);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

export const getOne = async (req,res) => {
  const dbName = req.user?.dbName || "cofferencia";
  
  try{
    const id = parseInt(req.params.id, 10);
    
    const variants = await db.query('SELECT * FROM product_variants WHERE product_id = $1',[id],dbName);
    res.json(variants.rows);
  }
     catch (err){
  console.log(err);
  res.status(500).json({
    message: 'Не удалось получить'
  })
};
}