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
export const getOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log(id)
    const query = 'SELECT * FROM products WHERE id = $1';
                                    
   const result = await db.query(query, [id])
   res.json(result.rows[0]);
    }catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
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
          v.volume || null,      // Объём (строка "250 мл" или пустая)
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

export const update = async (req, res) => {
  try {
    const { id } = req.params; // ID товара
    const { name, description, img_url, is_available, category_id, variants } = req.body;

    await db.query('BEGIN'); // Старт транзакции

    // 1. Обновляем базовые инпуты товара
    const updateProductQuery = `
      UPDATE products 
      SET name = $1, description = $2, img_url = $3, is_available = $4, category_id = $5
      WHERE id = $6;
    `;
    await db.query(updateProductQuery, [name, description, img_url, is_available, category_id, id]);

    // 2. Удаляем ВСЕ старые варианты этого товара
    await db.query('DELETE FROM product_variants WHERE product_id = $1;', [id]);

    // 3. Записываем новые варианты из формы заново пачкой (как при создании)
    if (variants && variants.length > 0) {
      const variantValues = [];
      const variantRowsSql = [];
      let paramIndex = 1;

      variants.forEach((v) => {
        variantRowsSql.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2})`);
        variantValues.push(id, v.volume || null, Number(v.price) || 0);
        paramIndex += 3;
      });

      const variantQuery = `INSERT INTO product_variants (product_id, volume, price) VALUES ${variantRowsSql.join(', ')}`;
      await db.query(variantQuery, variantValues);
    }

    await db.query('COMMIT'); // Фиксируем изменения
    res.json({ message: 'Товар успешно обновлен!' });

  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Не удалось обновить товар' });
  }
};


    export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *;', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    res.json({ message: 'Товар и все его варианты успешно удалены из базы' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось удалить товар' });
  }
};

    

    
