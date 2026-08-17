import {db} from '../config/db.js'

export const getAllProductVariants = async (req, res) => {
  const schemaName = req.user?.schemaName || 'public';
  
  try {
    
    const variants = await db.query('SELECT * FROM product_variants;', [], schemaName);
        res.json(variants.rows);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

export const getOne = async (req,res) => {
  const schemaName = req.user?.schemaName || 'public';
  
  try{
    const id = parseInt(req.params.id, 10);
    
    const variants = await db.query('SELECT * FROM product_variants WHERE product_id = $1',[id],schemaName);
    res.json(variants.rows);
  }
     catch (err){
  console.log(err);
  res.status(500).json({
    message: 'Не удалось получить'
  })
};
}