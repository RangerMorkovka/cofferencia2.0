import React from "react";
import styles from './categories.module.css';

export const Categories = ({
 
    id,
    name,
    parent_id,
    onClick,
    isActive,
  }
)=> {

const liClassName =  parent_id !== null ? styles ['sub-menu-item'] :styles ['menu-item'];
const buttonClassName = parent_id !== null ? styles['sub-menu-button'] :styles ['menu-button'];
  return (
    <li className={liClassName} tabIndex={1}  >
      <button className= {buttonClassName}
   onClick = {onClick}
      >
        {name}
        
      </button>
    </li>
  );
};
