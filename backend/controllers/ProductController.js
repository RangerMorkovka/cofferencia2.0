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
export const create = async (req, res) => {
  
  try {
    const { name, description, img_url, is_available, category_id, variants } = req.body;
    await db.query('BEGIN');
    let categoryId = null;

    const productQuery = `INSERT INTO products(name, description, img_url, is_available, category_id)
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING id;`;
    
                            const productValues = [
                               name,
                               description,
                               img_url,
                               is_available,
                               category_id
                            ];
                            const productResult = await db.query(productQuery, productValues);
                            const productId = productResult.rows[0].id;
                            if (variants && variants.length > 0) {
      const variantValues = [];
      const variantRowsSql = [];
      let paramIndex = 1;

      variants.forEach((v) => {
        // Формируем структуру параметров ($1, $2, $3), ($4, $5, $6)...
        variantRowsSql.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2})`);
        
        variantValues.push(
          productId,           // Ссылка на родительский товар (product_id)
          v.volume || '',      // Объём (строка "250 мл" или пустая)
          Number(v.price) || 0 // Цена (принудительно число)
        );
        
        paramIndex += 3; // Сдвигаем индекс для следующей тройки параметров
      });

      const variantQuery = `
        INSERT INTO product_variants (product_id, volume, price)
        VALUES ${variantRowsSql.join(', ')}
        RETURNING *;
      `;

      await db.query(variantQuery, variantValues);
    }

    // Если оба шага успешны — фиксируем изменения в PostgreSQL
    await db.query('COMMIT');

    // Возвращаем фронтенду ID товара, чтобы сработал редирект navigate(`/products/${productId}`)
    res.json({ 
      id: productId, 
      message: 'Товар и его варианты успешно созданы' 
    });

  } catch (err) {
    // Если произошел сбой — полностью откатываем транзакцию (база останется чистой)
    await db.query('ROLLBACK');
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать товар и его варианты',
    });
  } 
};


    
    

    
