import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import { selectIsAuth } from '../redux/slices/auth';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({children}) => {
    const isAuth = useSelector(selectIsAuth);
    const authStatus = useSelector((state) => state.auth.status);
    
    const token = Boolean(window.localStorage.getItem('token'));
    const location = useLocation();


    if (!isAuth && !token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

    return children;
}