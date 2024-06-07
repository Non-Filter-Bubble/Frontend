// 이거는 우리가 구현하지 않은 경로에 들어가면 홈으로 리다이렉트 시키는거
// 그래서 로그인을 한 사람이면 홈으로 가는거고 로그인을 안한 사람이면 홈으로 갔다가 홈에서 토큰 확인하고 로그인 페이지로 보내

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const validPaths = ['/', '/join', '/login', '/join/booktype', '/join/genre', '/complete-join', 
                    '/user', '/user/verify', '/bookpost', '/bookpostupdate', '/user/update', '/user/withdraw',
                    '/search', '/search/book']; 

const CheckRoute = () => {
    const location = useLocation();

    const isValidPath = validPaths.includes(location.pathname);

    return isValidPath ? <Outlet /> : <Navigate to="/" />;
}

export default CheckRoute;
    