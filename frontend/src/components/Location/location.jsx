import React from "react";
import styles from './location.module.css';

export const Location = () => {

    return(
    <div className={styles.location_container}>
        <a href="https://yandex.ru/maps/-/CLdYnMpc" className={styles.location}>
          <img
            id="location"
            className={styles.location_img}
            src="./icons/location.png"
            height={"20rem"}
            width={"20rem"}
            alt="локация"
          />
          <p className={styles.location_text}>Мы на карте</p>
        </a>
      </div>
      )

}





