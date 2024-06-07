// 로그인한 사용자는 접근할 수 없는 Route

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const PublicRoute = () => {

    return isAuthenticated() ? <Navigate to="/" /> : <Outlet />; 
}

export default PublicRoute;
    