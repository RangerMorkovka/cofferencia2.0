import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import styles from "./adminrow.module.css"

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
      
        
        <TableCell>Редактировать</TableCell>
        <TableCell>Удалить</TableCell>
      </TableRow>
    )
}


