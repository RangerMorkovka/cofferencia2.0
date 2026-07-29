import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Login from "./pages/LogIn/index.jsx";
import {ChangePasswordForm} from "./pages/ChangePasswordForm/ChangePasswordForm.jsx"
import { Home } from "./pages/Home.jsx";
import { fetchAuthMe } from "./redux/slices/auth.js";
import { AddProduct } from "./pages/AddProduct/index.jsx";
import { Admin } from "./pages/Admin/index.jsx";
import { useDispatch } from "react-redux";
import './App.css';

function App() {
  return (
    <>
      {/*<MyApp />*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addproduct/:id" element={<AddProduct />} />
         <Route path="/changepasswordform" element={<ChangePasswordForm />} />
      </Routes>
    </>
  );
}

export default App;
