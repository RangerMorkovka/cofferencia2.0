
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React,{ useEffect } from "react";
import Login from "./pages/LogIn/index.jsx";
import MyApp from "./components/MyApp.jsx";
import { fetchAuthMe } from "./redux/slices/auth.js";
import { AddProduct } from "./pages/AddProduct/index.jsx";
import { Admin } from "./pages/Admin/index.jsx";
import { useDispatch } from "react-redux";

function App() {

  
  
  return (
    <>
      {/*<MyApp />*/}
      <Routes>
        <Route path="/" element={<MyApp />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/AddProduct" element = {<AddProduct />} />
        <Route path = "/admin" element = {<Admin />} />
         <Route path = "/addproduct/:id" element = {<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
