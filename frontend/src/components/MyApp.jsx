import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createRef,
} from "react";
import { instance } from "../Axios.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Categories } from "./Categories/Categories.jsx";
import { SubmenuButton } from "./subMenuButton.jsx";
import { ProductCard } from "./ProductCard/productCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductVariants,
} from "../redux/slices/products.js";
import { fetchCategories } from "../redux/slices/categories.js";

import { Login } from "@mui/icons-material";
import styles from "./ProductCard/productcard.module.css";

const MyApp = () => {
  return <Main />;
};

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLoginButton, setShowLoginButton] = useState(false);
  const [activeParentId, setActiveParentId] = useState(1);
  const [activeSubCategoriesId, setActiveSubCategoriesId] = useState(null);

  //const [selectedItem, setSelectedItem] = useState(1);
  //const [selectedProducts, setSelectedProducts] = useState(1);

  const handleClick = (item) => {
    setSelectedItem(selectedItem === item.id ? item.id : item.id); //рендер кнопок подменю
  };
  const toggleProducts = (item) => {
    setSelectedProducts(selectedProducts === item.id ? item.id : item.id);
    // рендер массива с продуктовыми карточками в зависимости от выбранной ссылки
  };
  useEffect(() => {
    //функция для проверки IP при загрузке страницы
    const checkIP = async () => {
      try {
        const response = await instance.get("/check-access");

        setShowLoginButton(response.data.showLoginButton);
      } catch (error) {
        console.error("Ошибка проверки IP", error);
      }
    };
    checkIP();
  }, []);

  const { items: products, status: productsStatus } = useSelector(
    (state) => state.products.products,
  );
  const { items: categories, status: categoriesStatus } = useSelector(
    (state) => state.categories.categories,
  );
  const { items: variant, status: variantsStatus } = useSelector(
    (state) => state.products.variants,
  );
  const parentCategories = categories
    ? categories.filter((c) => c.parent_id === null)
    : [];
  const subCategories = categories
    ? categories.filter(
        (c) => c.parent_id !== null && c.parent_id === activeParentId,
      )
    : [];
  const filteredProducts = products
    ? products.filter((product) => {
        if (activeSubCategoriesId) {
          return product.category_id === activeSubCategoriesId;
        }
        if (activeParentId) {
          if (subCategories.length > 0) {
            return subCategories.some((sub) => sub.id === product.category_id);
          }
          return product.category_id === activeParentId;
        }
      })
    : [];
  // Делаем запрос к базе данных ОДИН раз при загрузке страницы, а не в каждой карточке
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchProductVariants());
  }, [dispatch]);

  useEffect(() => {
    setActiveSubCategoriesId(null);
  }, [activeParentId]);

  if (productsStatus === "loading") {
    return <div>Загрузка товаров...</div>;
  }

  if (productsStatus === "error") {
    return <div>Не удалось загрузить данные с сервера</div>;
  }

  if (categoriesStatus === "loading") {
    return <div>Загрузка категорий</div>;
  }
  if (categoriesStatus === "error") {
    return <div>Не удается загрузить категории</div>;
  }

  return (
    <div className="wrapper">
      <header className="header">
        <div className="header_text">
          <p className="cofferencia">Cofferencia</p>
          <p className="welcome">Добро пожаловать!</p>
        </div>
        {showLoginButton && (
          <button
            onClick={() => {
              navigate("/Login");
            }}
          >
            Вход
          </button>
        )}
      </header>
      <div className="location_container">
        <a href="https://yandex.ru/maps/-/CLdYnMpc" className="location">
          <img
            id="location"
            className="location_img"
            src="./icons/location.png"
            height={"20rem"}
            width={"20rem"}
            alt="локация"
          />
          <p className="location_text">Мы на карте</p>
        </a>
      </div>
      <nav className="menu">
        <ul className="ul_menu">
          {parentCategories.map((category) => (
            <Categories
              key={category.id}
              name={category.name}
              isActive={activeParentId === category.id}
              parent_id={category.parent_id}
              onClick={() => setActiveParentId(category.id)}
            />
          ))}
        </ul>
        <ul className="ul_sub-menu">
          {subCategories.map((subCategory) => (
            <Categories
              key={subCategory.id}
              id={subCategory.id}
              name={subCategory.name}
              isActive={activeSubCategoriesId === subCategory.id}
              parent_id={subCategory.parent_id}
              onClick={() => setActiveSubCategoriesId(subCategory.id)}
            />
          ))}
        </ul>
      </nav>
      <ul className={styles.products_list}>
        {filteredProducts.map((product) => {
          const variants = Array.isArray(variant)
            ? variant.filter((v) => v.product_id === product.id)
            : [];
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              img_url={product.img_url}
              is_available={product.is_available}
              category_id={product.category_id}
              variant={variants}
              // Передаем объект вариантов
            />
          );
        })}
      </ul>
      {/* <nav className="menu" >

        <ul className="ul_menu">
          {menuData.map((item, i) => (
            <MenuButton
              key={item.id}
              menuDataObj={item}

              onClick={() => [handleClick(item), toggleProducts(item)]}

            />


          ))}
        </ul>


        {selectedItem === 1 && (
          <ul className="ul_sub-menu">
            {submenuData.slice(0, 3).map((item) => (
              <SubmenuButton key={item.id} submenuDataObj={item} />

            ))}
          </ul>

        )
        }

        {selectedItem === 2 && (
          <ul className="ul_sub-menu">
            {submenuData.slice([3]).map((item, index) => (
              <SubmenuButton key={item.id} submenuDataObj={item} />
            ))}
          </ul>

        )}


      </nav>
      <section className="products_card_container">
        <section id="classic">
          {selectedProducts === 1 && (
            <ul className="ul_products_card">
              {products.slice(0, 7).map((item) => (
                <ProductCard key={item.id} productsObj={item} />
              ))}
            </ul>)}
        </section>
        <section id="author">
          {selectedProducts === 1 && (
            <ul className="ul_products_card">
              {products.slice(7, 15).map((item) => (
                <ProductCard key={item.id} productsObj={item} />
              ))}
            </ul>)}
        </section>
        <section id="season">
          {selectedProducts === 1 && (
            <ul className="ul_products_card">
              {products.slice([15]).map((item) => (
                <ProductCard key={item.id} productsDataObj={item} />
              ))}
            </ul>)}
        </section>
        <section id='matcha'>
          {selectedProducts === 2 && (
            <ul className="ul_products_card">
              {productsDataDrinks.slice(0, 8).map((item) => (
                <ProductCard key={item.id} productsDataObj={item} />
              ))}
            </ul>)}
        </section>
        <section id="tea">
          {selectedProducts === 2 && (
            <ul className="ul_products_card">
              {productsDataDrinks.slice(8, 14).map((item) => (
                <ProductCard key={item.id} productsDataObj={item} />
              ))}
            </ul>)}
        </section>
        <section id="hot_drinks">
          {selectedProducts === 2 && (
            <ul className="ul_products_card">
              {productsDataDrinks.slice(14, 17).map((item) => (
                <ProductCard key={item.id} productsDataObj={item} />
              ))}
            </ul>)}
        </section>
        <section id="cold_drinks">
          {selectedProducts === 2 && (
            <ul className="ul_products_card">
              {productsDataDrinks.slice([17]).map((item) => (
                <ProductCard key={item.id} productsDataObj={item} />
              ))}
            </ul>)}
        </section>
        {selectedProducts === 3 && (
          <ul className="ul_products_card">
            {productsDataBF.map((item) => (
              <ProductCard key={item.id} productsDataObj={item} />
            ))}
          </ul>)}
        {selectedProducts === 4 && (
          <ul className="ul_products_card">
            {productsDataSnacks.map((item) => (
              <ProductCard key={item.id} productsDataObj={item} />
            ))}
          </ul>)}
        {selectedProducts === 5 && (
          <ul className="ul_products_card">
            {productsDataSoup.map((item) => (
              <ProductCard key={item.id} productsDataObj={item} />
            ))}
          </ul>)}
        {selectedProducts === 6 && (
          <ul className="ul_products_card">
            {productsDataMaincourse.map((item) => (
              <ProductCard key={item.id} productsDataObj={item} />
            ))}
          </ul>)}
        {selectedProducts === 7 && (
          <ul className="ul_products_card">
            {productsDataSalad.map((item) => (
              <ProductCard key={item.id} productsDataObj={item} />
            ))}
          </ul>)}
        {selectedProducts === 8 && (
          <ul className="ul_products_card">
            {productsDataOthers.map((item) => (
              <ProductCard key={item.id} productsDataObj={item} />
            ))}
          </ul>)}

      </section>

      <footer className="footer">
        <div className="contacts">
          <h2>Контакты</h2>
          <div className="contact-items">
            <a href="https://www.instagram.com/cofferencia?igsh=MTZoemZuY3JjZHBxeQ==">
              <img
                className="icon_img" height={'45px'} width={'45px'}
                src="./icons/instagram.png"
                alt="Инстаграм"
              />
            </a>
            <p><a href="https://www.flaticon.com/free-icons/verified" title="verified icons">Verified icons created by Anggara - Flaticon</a></p>
          </div>
        </div>
      </footer>*/}
    </div>
  );
}

export default MyApp;
