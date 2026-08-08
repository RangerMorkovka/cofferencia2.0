import React from "react";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer>
      
      <h4>Контакты</h4>
      <address>
      <a href="https://www.instagram.com/cofferencia?igsh=MTZoemZuY3JjZHBxeQ==">
        <img 
        src="./icons/instagram.png" 
        alt="Инстаграм" />
      </a>
      <span className={styles.phone}>Телефон для связи <br/>+7 (123) 456-78-90</span>
       </address>

      <div className={styles.icons8}>
      <span>Icons by</span>
      <a href="https://icons8.ru/">icons8</a>
      </div>
    </footer>
  );
};
