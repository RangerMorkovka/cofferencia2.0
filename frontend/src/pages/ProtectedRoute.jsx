import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import { selectIsAuth } from '../redux/slices/auth';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({children}) => {
    const isAuth = useSelector(selectIsAuth);
    const authStatus = useSelector((state) => state.auth.status);
    console.log(authStatus)
    const token = Boolean(window.localStorage.getItem('token'));
    const location = useLocation();

console.log('--- ПРОВЕРКА МАРШРУТА ---');
  console.log('1. Значение isAuth из Redux:', isAuth, typeof isAuth);
  console.log('2. Значение token в браузере:', token, typeof token);
  console.log('3. Текущий статус загрузки:', authStatus);
  console.log('-------------------------');


   
    


    if (!isAuth && !token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

    return children;
}