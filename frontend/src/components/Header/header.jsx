import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

export const Header = ({ showLoginButton }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.header_text}>
        <p className={styles.cofferencia}>Cofferencia</p>
        <p className={styles.welcome}>Добро пожаловать!</p>
      </div>
      {showLoginButton && (
        <button
          className={`button ${styles.button_action_login}`}
          onClick={() => {
            navigate("/Login");
          }}
        >
          Вход
        </button>
      )}
    </header>
  );
};
