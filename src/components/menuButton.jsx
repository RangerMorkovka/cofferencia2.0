import React ,{useState, useRef, useEffect } from "react";
import { menuData } from "../data/data";


const MenuButton = ({menuDataObj, ref, onClick }) => {




  return (
    <li className="menu-item" tabIndex={1}  >
      <button className='menu-button'  onClick={onClick}
     ref={ref}
      >
        {menuDataObj.name}
        
      </button>
    </li>
  );
};
export default MenuButton;