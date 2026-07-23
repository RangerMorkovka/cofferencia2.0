import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchRemoveProducts } from "../../redux/slices/products";
import styles from "./adminrow.module.css"
import { Update } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {AddProduct} from "../../pages/AddProduct/index"
export const AdminRow = ({
     id,
  name,
  description,
  img_url,
  is_available,
  categoryName,
  variant = [],
}) => {
  const variantsArray = Array.isArray(variant)? variant : [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickRemove = () => {
    if(window.confirm("Вы действительно хотите удалить?")){
    dispatch(fetchRemoveProducts(id));
  }};
  
const editForm = () => {
    navigate(`/addproduct/${id}`);
    
  }
  
  
  
    return (
      <TableRow className={styles.mobileRow}>
        <TableCell className={styles.mobileCell}>{id}</TableCell>
        <TableCell>{categoryName}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell >{description}</TableCell>
        <TableCell >{img_url && (
          <img 
            className={styles.img}
           // src={img_url.startsWith('http') ? img_url : `http://localhost:5174/api${img_url}`}
            src={img_url.startsWith('http') ? img_url : `/api${img_url}`}
            height="100"
            width="100"
            alt={name}
          />
        )}</TableCell>
        <TableCell>{is_available ? "В наличии" : "Нет в наличии"}</TableCell>
        {variantsArray.length>0 && (
          <TableCell >
          {variantsArray.map((v) => (
            <div key={v.id}>{ v.volume ? v.volume + ' мл' : '' }
</div>
          ))}
             
        </TableCell>
        )}
        
     
        
          <TableCell>
            {variantsArray.map((v) => (
              <div key={v.id}>{v.price} ₽</div>
            ))}
          </TableCell>
      
        
        <TableCell>
          <button onClick ={()=>editForm(id)}>Редактировать</button>
        </TableCell>
        <TableCell>
          <button onClick={onClickRemove}>Удалить</button></TableCell>
      </TableRow>
    )
}


