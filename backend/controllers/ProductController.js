
import { db} from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
     const schemaName = req.user?.schemaName || 'public';
    console.log(schemaName);
   
    const products = await db.query(`SELECT * FROM products ORDER BY created_at DESC;`,[], schemaName);
    res.json(products.rows);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить товары",
    });
  }
};
export const getOne = async (req, res) => {
    const schemaName = req.user?.schemaName || 'public';
  try {
   
    
    const id = parseInt(req.params.id, 10);
   
    const query = "SELECT * FROM products WHERE id = $1";

    const result = await db.query(query, [id], schemaName);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
};

export const create = async (req, res) => {
 
     const schemaName = req.user?.schemaName || 'public';
    const client = await db.getClient(schemaName);
    try{
    const { name, description, img_url, is_available, category_id, variants } =
      req.body;
    await client.query("BEGIN");
    let categoryId = null;

    const productQuery = `INSERT INTO products(name, description, img_url, is_available, category_id)
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING id;`;

    const productValues = [
      name,
      description,
      img_url,
      is_available,
      category_id,
    ];
    const productResult = await client.query(productQuery, productValues);
    const productId = productResult.rows[0].id;
    if (variants && variants.length > 0) {
      const variantValues = [];
      const variantRowsSql = [];
      let paramIndex = 1;

      variants.forEach((v) => {
        
        variantRowsSql.push(
          `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3})`,
        );

        variantValues.push(
          productId, 
          v.volume || null, 
          Number(v.price) || 0, 
          v.unit || "мл",
        );

        paramIndex += 4; 
      });

      const variantQuery = `
        INSERT INTO product_variants (product_id, volume, price, unit)
        VALUES ${variantRowsSql.join(", ")}
        RETURNING *;
      `;

      await client.query(variantQuery, variantValues);
    }

    
    await client.query("COMMIT");

    
    res.json({
      id: productId,
      message: "Товар и его варианты успешно созданы",
    });
  } catch (err) {
    
    await client.query("ROLLBACK");
    res.status(500).json({
      message: "Не удалось создать товар и его варианты",
    });
  }finally{
    client.release();
  }
};

export const update = async (req, res) => {
  const schemaName = req.user?.schemaName || 'public';
    const client = await db.getClient(schemaName);
  try {
    const { id } = req.params; 
    const { name, description, img_url, is_available, category_id, variants } =
      req.body;

    await client.query("BEGIN"); 
    
    const updateProductQuery = `
      UPDATE products 
      SET name = $1, description = $2, img_url = $3, is_available = $4, category_id = $5
      WHERE id = $6;
    `;
    await client.query(updateProductQuery, [
      name,
      description,
      img_url,
      is_available,
      category_id,
      id,
    ]);

    
    await client.query("DELETE FROM product_variants WHERE product_id = $1;", [id]);

    
    if (variants && variants.length > 0) {
      const variantValues = [];
      const variantRowsSql = [];
      let paramIndex = 1;

      variants.forEach((v) => {
        variantRowsSql.push(
          `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3})`,
        );
        variantValues.push(
          id,
          v.volume || null,
          Number(v.price) || 0,
          v.unit || "мл",
        );
        paramIndex += 4;
      });

      const variantQuery = `INSERT INTO product_variants (product_id, volume, price, unit) VALUES ${variantRowsSql.join(", ")}`;
      await client.query(variantQuery, variantValues);
    }

    await client.query("COMMIT"); 
    res.json({ message: "Товар успешно обновлен!" });
  } catch (err) {
    await db.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Не удалось обновить товар" });
  }finally{
    client.release();
  }
};

export const remove = async (req, res) => {
  const schemaName = req.user?.schemaName || 'public';
    const client = await db.getClient(schemaName);
  try {
    const { id } = req.params;

    const result = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *;",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    res.json({ message: "Товар и все его варианты успешно удалены из базы" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Не удалось удалить товар" });
  }finally{
    client.release();
  }
};
