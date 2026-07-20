import {db} from '../config/db.js'

export const getAllProducts = async (req, res) => {
  try {
    const products = await db.query(`SELECT * FROM products
                                    ORDER BY id ASC;`);
        res.json(products.rows);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

