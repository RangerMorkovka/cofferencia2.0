import React from "react";

import { useNavigate } from "react-router-dom";
import styles from "./adminheader.module.css";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

export const AdminHeader = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
     /*if(!isAuth) {
        return null;
    } */
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.h1}>Cofferencia</h1>
                    <p className={styles.p}>Добро пожаловать в админ-панель!</p>
            <div className={styles.btnContainer}> 
                <button 
        className={styles.addBtn}
        onClick ={ ()=> {
            navigate ("/AddProduct")
        }}
          >Добавить<br/>блюдо</button>
           <button 
        className={styles.logoutBtn}
        onClick ={ ()=> {
            navigate ("/")
        }}
          >Выход</button>
          </div>
       

          </header>
          </div>
    )
    
};
