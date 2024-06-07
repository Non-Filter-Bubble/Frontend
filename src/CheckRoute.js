import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const validPaths = ['/', '/join', '/login', '/join/booktype', '/join/genre', '/complete-join', 
                    '/user', '/user/verify', '/bookpost', '/bookpostupdate', '/user/update', '/user/withdraw',
                    '/search', '/search/book']; 

const CheckRoute = () => {
    const location = useLocation();
    console.log(location.pathname);

    const isValidPath = validPaths.includes(location.pathname);

    return isValidPath ? <Outlet /> : <Navigate to="/" />;
}

export default CheckRoute;
    