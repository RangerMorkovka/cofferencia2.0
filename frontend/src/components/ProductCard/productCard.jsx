import React from "react";

import styles from "./productcard.module.css";



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
        
        {img_url && (
          <img
            className={styles.img}
            
            src="https://vercel-storage.com"
            alt={name}
          />
        )}

        <p className={styles.product_name}>{name}</p>

       
        <p className={styles.description}>{description}</p>

       
        <div className={styles.product_props}>
          {variantsArray.length > 0 && (
            <ul className={styles.volume}>
              {variantsArray.map((v) => (
                <li key={v.id}>
                  {v.volume && v.unit ? `${v.volume} ${v.unit}` : ""}
                </li>
              ))}
            </ul>
          )}

          <ul className={styles.price}>
            {variantsArray.map((v) => (
              <li key={v.id}>{v.price} руб.</li>
            ))}
          </ul>
        </div>

       
        {!is_available && <div className="not_available">Нет в наличии</div>}
      </div>
    </li>
  );
};
