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
    <li className="li_products_card">
      <div className="product_card">
        {/* Картинка товара */}
        {img_url && (
          <img
            className="img"
            src={img_url.startsWith('http') ? img_url : `/api${img_url}`}
            height="150"
            width="150"
            alt={name}
          />
        )}

        {/* Ссылка на детальную страницу товара по ID */}
        <Link to={`/products/${id}`} className="product_name_link">
          <p className="product_name">{name}</p>
        </Link>

        {/* Описание (ингредиенты) */}
        <p className="ingredients">{description}</p>

        {/* Характеристики (объем и цена) */}
        <div className="product_props">
          {variantsArray.length > 0 && (
            <ul className="volume">
              {variantsArray.map((v) => (
                <li key={v.id}>{v.volume}</li>
              ))}
            </ul>
          )}

          <ul className="price">
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
