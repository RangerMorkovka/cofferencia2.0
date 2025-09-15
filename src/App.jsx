import  { useState } from 'react'
import "./App.css"



function App() {
   

  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
function Header () {
  return(
    <header className='header'>
      <h1>Акции</h1>
      </header>
  )
}
function Main () {
  const [isOpenCoffee, setOpenCoffee] = useState(false);
  const [isOpenDrink, setOpenDrink] = useState(false);
  const toggleCoffee = () => setOpenCoffee(!isOpenCoffee);
  const toggleDrink = () => setOpenDrink(!isOpenDrink);

  return(
      <main className='main'>
        <ul>
        <MenuButton 
            name="Кофейная карта"
            onClick ={toggleCoffee} 
           />
       <div className={`sub-menu${isOpenCoffee ? "-active" : ""}`}>
       <ul className='sub-menu-list'>
        <SubmenuButton 
        name="Классика"
         />
         <SubmenuButton
        name="Авторский"
         />
         <SubmenuButton
        name="Сезонный"
         />
         </ul>
       </div>
               <MenuButton 
        name="Напитки"
        onClick = {toggleDrink}  />
         <div className={`sub-menu${isOpenDrink ? "-active" : ""}`}>
          <ul className="sub-menu-list">
        <SubmenuButton
        name="Матча"
         />
         <SubmenuButton
        name="Чайная карта"
         />
         <SubmenuButton
        name="Горячие напитки"
         />
         <SubmenuButton
        name="Холодные напитки"
         />
         </ul>
       </div>
        <MenuButton 
        name="Завтраки"  />
        <MenuButton 
        name="Закуски"  />
        <MenuButton 
        name="Первые блюда"  />
        <MenuButton 
        name="Вторые блюда"  />
        <MenuButton 
        name="Салаты"  />
        <MenuButton 
        name="Десерты"  />
        <MenuButton 
        name="Дополнительно"  />
        </ul>
      </main>
  )
}
const Footer = ()=>{
  return(
    <footer className='footer'>
      <div className='contacts'>
        <h2>Контакты</h2>
        <div className='contact-items'>
          <a href="#">
            <img src="/icon-instagram48.png" alt="Инстаграм" />
          </a>
        </div>

      </div>
    </footer>
  )
}

const MenuButton =  (props, onClick) => {
 
  return(
  <li className='menu-item'>
    <button className='menu-button' onClick= {props.onClick} >{props.name}</button>
  </li>
  );
}
const SubmenuButton = (props) => {
  return(
    <li className='sub-menu-item'>
      <button className='sub-menu-button'>{props.name}</button>
    </li>

  )
}

export default App
