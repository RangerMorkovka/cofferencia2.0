import React, { useState, useEffect, useRef, useCallback, createRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MenuButton } from './menuButton.jsx';
import { SubmenuButton } from "./subMenuButton.jsx";
import { ProductCard } from "./productCard.jsx";
import { menuData, submenuData, productsDataCoffee, productsDataDrinks, productsDataBF, productsDataSnacks, productsDataSoup, productsDataMaincourse, productsDataSalad, productsDataOthers } from "../data/data.jsx";
import { Login } from "@mui/icons-material";

const MyApp = () => {
  return <Main />;
};

function Main() {
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton]= useState(null);


  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState(1);




  const handleClick = (item) => {
    setSelectedItem(selectedItem === item.id ? item.id : item.id); //рендер кнопок подменю
  };
  const toggleProducts = (item) => {
    setSelectedProducts(selectedProducts === item.id ? item.id : item.id);
    // рендер массива с продуктовыми карточками в зависимости от выбранной ссылки
  }
useEffect(()=>{
  //функция для проверки IP при загрузке страницы
  const checkIP = async() => {
    try {
      const response = await fetch ('/api/check-access');
      const data = await response.json();
      setShowLoginButton(data.showLoginButton);
    }
    catch(error){
      console.error ('Ошибка проверки IP', error);
    }
  };
  checkIP();
},[]);

  return (
    <div className="wrapper">
      <header className="header">
        <div className="header_text">
<p className="cofferencia">Cofferencia</p>
<p className="welcome">Добро пожаловать!</p>
</div>
{showLoginButton &&(
  <button
  onClick={() =>{navigate('/Login')}}>Вход</button>
)}

      </header>
<div className="location_container">
  
  <a href="https://yandex.ru/maps/-/CLdYnMpc" className="location">
  <img id='location' className='location_img' src="./icons/location.png" height={'20rem'} width={'20rem'} alt="локация" />
  <p className="location_text">Мы на карте</p></a>
  
  
    
  
</div>
      <nav className="menu" >

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
              {productsDataCoffee.slice(0, 7).map((item) => (
                <ProductCard key={item.id} productsDataObj={item} />
              ))}
            </ul>)}
        </section>
        <section id="author">
          {selectedProducts === 1 && (
            <ul className="ul_products_card">
              {productsDataCoffee.slice(7, 15).map((item) => (
                <ProductCard key={item.id} productsDataObj={item} />
              ))}
            </ul>)}
        </section>
        <section id="season">
          {selectedProducts === 1 && (
            <ul className="ul_products_card">
              {productsDataCoffee.slice([15]).map((item) => (
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
      </footer>
    </div>
  );
}


export default MyApp;
