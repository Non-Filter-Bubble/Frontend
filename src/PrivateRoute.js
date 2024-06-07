// 로그인한 사용자만 접근할 수 있는 Route
// 근데 보면 장르랑 분야 선택할 때가 약간 오류임 ㅠ

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const PrivateRoute = () => {
    
    // 로그인이 되어 있으면 Outlet을 반환, 로그인이 안되어 있으면 로그인 페이지로 Redirect
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />; 
}

export default PrivateRoute;
    