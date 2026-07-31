import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import {Login} from "./pages/LogIn/index.jsx";
import {ChangePasswordForm} from "./pages/ChangePasswordForm/ChangePasswordForm.jsx"
import { Home } from "./pages/Home.jsx";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth.js";
import { AddProduct } from "./pages/AddProduct/index.jsx";
import { Admin } from "./pages/Admin/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {ProtectedRoute} from './pages/ProtectedRoute.jsx';
import './App.css';

function App() {
  
  return (
    <>
      {/*<MyApp />*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>} />
        <Route path="/addproduct/:id" element={<AddProduct />} />
         <Route path="/changepasswordform" element={<ChangePasswordForm />} />

      </Routes>
    </>
  );
}

export default App;
