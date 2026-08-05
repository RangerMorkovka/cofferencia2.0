import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

export const Header = () => {
 

  return (
    <header className={styles.header}>
      
     <img className={styles.header_img} src="/images/cofferencia.jpg"/>
      <div className={styles.headerText}>
         
        <h1>Cofferencia</h1>
        <span>Добро пожаловать!</span>
      </div>
    </header>
  );
};
