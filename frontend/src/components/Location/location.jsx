import React from "react";
import styles from './location.module.css';

export const Location = () => {

    return(
       <div className={styles.location_container}>
       <div>
        
        <a href="https://yandex.ru/maps/-/CLdYnMpc" className={styles.location}>
        <label htmlFor="location" className={styles.location}>
          <img
            id="location"
            className={styles.location_img}
            src="./icons/location.png"
           
            alt="локация"
          />
          <span>Мы на карте</span></label>
          
        </a>
        </div>
   
      <div>
        <a href="tel: +71234567890">
          <label htmlFor="phone" className={styles.phoneNumber}>
      <img 
      className={styles.phone_img}
      id ="phone"
      src="./icons/phone.png" 
      alt="Телефон" />
     
       <span>Телефон для связи</span>
       </label>
        </a>
      </div>
       
      </div>
      )

}





