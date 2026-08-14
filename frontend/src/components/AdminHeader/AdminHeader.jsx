import React from "react";

import { useNavigate } from "react-router-dom";
import styles from "./adminheader.module.css";

import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

export const AdminHeader = ({handleLogout}) => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
     /*if(!isAuth) {
        return null;
    } */
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                     <img className={styles.header_img} src="/images/cofferencia.jpg"/>
                     <div className={styles.headerText}>
                    <h1 className={styles.h1}>Cofferencia</h1>
                    <span className={styles.span}>Добро пожаловать в админ-панель!</span>
                    </div>
            <div className={styles.btnContainer}> 
                <button 
        className={styles.addBtn}
        onClick ={ ()=> {
            navigate ("/AddProduct")
        }}
          >Добавить<br/>блюдо</button>

           <button 
        className={styles.logoutBtn}
        onClick ={()=> handleLogout()}
          >Выход</button>

           <button 
           disabled
        className={styles.changePasswordBtn}
        onClick ={ ()=> {
            navigate ("/ChangePasswordForm")
        }}
          >Сменить<br/>пароль</button>
          </div>
       

          </header>
          </div>
    )
    
};
