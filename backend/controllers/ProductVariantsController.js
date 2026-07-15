import {db} from '../config/db.js'

export const getAllProductVariants = async (req, res) => {
  try {
    const variants = await db.query('SELECT * FROM product_variants');
        res.json(variants.rows);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

