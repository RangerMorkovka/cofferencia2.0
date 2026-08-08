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
import { useNavigate , Navigate} from "react-router-dom";

import instance from "../../Axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductVariants } from "../../redux/slices/products";
import { fetchCategories } from "../../redux/slices/categories";
import { fetchAuth, fetchAuthMe, selectIsAuth } from "../../redux/slices/auth";
import {logout} from '../../redux/slices/auth';
import {Login} from "../LogIn/index.jsx";

export const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const [selectedCategory, setSelectedCategory]= useState(()=> {
      return window.localStorage.getItem('selected_category') || ""
    });
  const { items: products, status: productsStatus } = useSelector(
    (state) => state.products.products,
  );
  const { items: categories, status: categoriesStatus } = useSelector(
    (state) => state.categories.categories,
  );
  const { items: variants, status: variantsStatus } = useSelector(
      (state) => state.products.variants,
    );

   const handleCategoryChange = (e)=> {
    const value = e.target.value;
    setSelectedCategory(value);
    window.localStorage.setItem('selected_category', value);
   } 

const handleLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());//  очистка state.data и удаление токена
      navigate('/'); 
     
    }

  };
  

 

useEffect(() => {
    const token = window.localStorage.getItem('token');
    if(!token){
      navigate('/login');
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

  const filteredProducts = Array.isArray(products) ? products.filter((product)=> {
    if (selectedCategory==="")return true;
    return Number(product.category_id) === Number(selectedCategory)
  }):[];
  return (
    <>
   
      <AdminHeader handleLogout={handleLogout}/>
      <TableContainer
        component={Paper}
        className={styles.tableContainer}
        
      >
        <Table size="small" stickyHeader>
          <TableHead className={styles.tableHead}>
            <TableRow sx={{'& .MuiTableCell-root':{textAlign: "center"}}}>
              <TableCell>ID</TableCell>
              <TableCell><div><select
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                              className={styles.categorySelect}
                              required
                            >
                              <option value="" >
                                Все категории
                              </option>
              
                              {Array.isArray(categories) &&
                                categories
              
                                  .filter(
                                    (cat) => Number(cat.id) !== 1 && Number(cat.id) !== 2,
                                  )
              
                                  .map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                      {cat.name}
                                    </option>
                                  ))}
                            </select>
                          </div>
                          </TableCell>
              <TableCell >Имя</TableCell>
              <TableCell  >Описание</TableCell>
              <TableCell >Изображение</TableCell>
              <TableCell>Доступность</TableCell>
              <TableCell sx={{minWidth:'80px'}}>Объем</TableCell>
              <TableCell sx={{minWidth:'80px'}}>Цена</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableElement}>
            {filteredProducts.map((product) => {
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
