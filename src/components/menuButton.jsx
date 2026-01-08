import React ,{useState, useRef, useEffect } from "react";
import { menuData } from "../data/data";


export const MenuButton = ({menuDataObj, onClick ,ref}) => {



  return (
    <li className= "menu-item"  tabIndex={1}  >
      <button className = 'menu-button' onClick={onClick}
   
      >
        {menuDataObj.name}
        
      </button>
    </li>
  );
};
