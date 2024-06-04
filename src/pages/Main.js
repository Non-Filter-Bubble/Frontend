import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios';

import Slide from "../components/Slide";
import Button4 from "../components/Button4";
import NonFilter from "../components/NonFilter";
import Filter from "../components/Filter";
import BestSellers from "../components/BestSellers";

import "../styles/Main.css"

const Main = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    // 사용자가 로그인 했는지 확인
    useEffect(() => {
        if (!token) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        } else {
            // 장르 선택 여부 확인
            axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/verify-genre`, {
                headers: {
                    'authorization': `${token}`
                }
            }).then((res) => {
                console.log(res);
                // 메인 페이지로 이동
                // navigate("/");
                
            }).catch((err) => {
                console.log(err);
                // 장르 선택 페이지로 이동
                navigate("/join/booktype");
            }); 
        }
    }, [token, navigate]);

    return (
        <div className="div-main">
            <Slide />
            <Button4 />
            <NonFilter />
            <Filter />
            <BestSellers />
        </div>
    );
};

export default Main;
