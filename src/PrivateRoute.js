import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const PrivateRoute = () => {
    console.log('왔다감')

    // 로그인이 되어 있으면 Outlet을 반환, 로그인이 안되어 있으면 로그인 페이지로 Redirect
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />; 
}

export default PrivateRoute;
    