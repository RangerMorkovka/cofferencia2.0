import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { AdminRow, AdminHeader } from "../../components/index";
import styles from './admin.module.css';
import { useNavigate } from "react-router-dom";
import instance from "../../Axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductVariants } from "../../redux/slices/products";
import { fetchCategories } from "../../redux/slices/categories";
import { fetchAuthMe, selectIsAuth } from "../../redux/slices/auth";

export const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
  const { items: products, status: productsStatus } = useSelector(
    (state) => state.products.products,
  );
  const { items: categories, status: categoriesStatus } = useSelector(
    (state) => state.categories.categories,
  );
  const { items: variants, status: variantsStatus } = useSelector(
      (state) => state.products.variants,
    );

  

 

useEffect(() => {
    const token = window.localStorage.getItem('token');
    if(!token){
      navigate('/');
      return;
    }

        dispatch(fetchAuthMe());
        dispatch(fetchCategories());
        dispatch(fetchProducts());
        dispatch(fetchProductVariants());
       
        
   
},[dispatch]);


     
  
  
  if (productsStatus === "loading") {
    return (
      <TableContainer
        component={Paper}
        className={styles.tableContainer}
      >
        <CircularProgress />
        <p>Загрузка данных админ-панели...</p>
      </TableContainer>
    );
  }

  return (
    <>
      <AdminHeader />
      <TableContainer
        component={Paper}
        className={styles.tableContainer}
      >
        <Table size="small">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell >Имя</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell >Изображение</TableCell>
              <TableCell>Доступность</TableCell>
              <TableCell sx={{minWidth:'80px'}}>Объем</TableCell>
              <TableCell sx={{minWidth:'80px'}}>Цена</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableElement}>
            {Array.isArray(products) &&
              products.map((product) => {
                const productVariants = Array.isArray(variants)
                  ? variants.filter((v) => v.product_id === product.id)
                  : [];
                  
                const currentCategory = Array.isArray(categories)
                  ? categories.find((cat) => cat.id === product.category_id)
                  : null;
                return (
                  <AdminRow
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    img_url={product.img_url}
                    is_available={product.is_available}
                    categoryName={currentCategory ? currentCategory.name : ""}
                    variant={productVariants}
                    // Передаем объект вариантов
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
