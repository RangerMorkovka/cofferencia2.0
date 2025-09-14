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
  const [isOpen, setOpen] = useState(false);
  const onClick = () => setOpen(!isOpen);


  return(
      <main className='main'>
        <MenuButton 
            name="Кофейная карта"
            onClick ={onClick} 
           />
       <div className={`sub-menu${isOpen ? "-active" : ""}`}>
        <SubmenuButton
        name="Классика"
         />
         <SubmenuButton
        name="Авторский"
         />
         <SubmenuButton
        name="Сезонный"
         />
       </div>
               <MenuButton 
        name="Напитки"  />
         <div className='sub-menu'>
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
