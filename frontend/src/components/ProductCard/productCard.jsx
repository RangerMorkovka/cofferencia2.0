import React from "react";
import { Link } from "react-router-dom";
import styles from './productcard.module.css';
export const ProductCard = ({
  id,
  name,
  description,
  img_url,
  is_available,
  category_id,
  variant = [], 
}) => {
  
  const variantsArray = Array.isArray(variant) ? variant : [];
  return (
    <li className={styles.li_products_card}>
      <div className={styles.product_card}>
        {/* Картинка товара */}
        {img_url && (
          <img
            className={styles.img}
           // src={img_url.startsWith('http') ? img_url : `http://localhost:5174/api${img_url}`}
            src={img_url.startsWith('http') ? img_url : `/api${img_url}`}
            height="150"
            width="150"
            alt={name}
          />
        )}
          
        
        
          <p className={styles.product_name}>{name}</p>
        

        {/* Описание (ингредиенты) */}
        <p className={styles.ingredients}>{description}</p>

        {/* Характеристики (объем и цена) */}
        <div className={styles.product_props}>
          {variantsArray.length > 0 && (
            <ul className={styles.volume}>
              {variantsArray.map((v) => (
                <li key={v.id}>{v.volume}</li>
              ))}
            </ul>
          )}

          <ul className={styles.price}>
            {variantsArray.map((v) => (
              <li key={v.id}>{v.price} руб.</li>
            ))}
          </ul>
        </div>

        {/* Статус наличия (опционально) */}
        {!is_available && <div className="not_available">Нет в наличии</div>}
      </div>
    </li>
  );
};
