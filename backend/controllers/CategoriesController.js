import {db} from '../config/db.js'

export const getAllCategories = async (req, res) => {
  try {
    const categories = await db.query('SELECT * FROM categories');
        res.json(categories.rows);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

