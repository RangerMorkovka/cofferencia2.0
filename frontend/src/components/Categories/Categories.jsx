import React, { forwardRef } from "react";
import styles from './categories.module.css';

export const Categories = forwardRef(({
 
    id,
    name,
    parent_id,
    onClick,
    isActive,
  }, ref
)=> {

const liClassName =  parent_id !== null ? styles ['sub-menu-item'] :styles ['menu-item'];
const buttonClassName = parent_id !== null ? styles['sub-menu-button'] :styles ['menu-button'];
  return (
    <li className={liClassName} tabIndex={1} ref={ref} >
      <button className= {buttonClassName}
   onClick = {onClick}
      >
        {name}
        
      </button>
    </li>
  );
});
