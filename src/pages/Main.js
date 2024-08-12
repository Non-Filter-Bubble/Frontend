import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../api/axios';

import Slide from "../components/Slide";
import MainHeader from "../components/MainHeader";
import NonFilter from "../components/NonFilter";
import Filter from "../components/Filter";
import BestSellers from "../components/BestSellers";
import BookDrawer from "../components/BookDrawer";

import "../styles/Main.css"

const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const initialRecommendData = location.state?.recommendData || {};
    const [recommendData, setRecommendData] = useState(initialRecommendData);

    const token = localStorage.getItem('token');
    const initialLoad = useRef(true);

    const nonFilterRef = useRef(null);
    const filterRef = useRef(null);
    const bestSellersRef = useRef(null);
    const bookDrawerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/login');
            } else {
                try {
                    await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/verify-genre`, {
                        headers: {
                            'authorization': `${token}`
                        }
                    });
                    
                    try {
                        const res = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/isbn_list`, {
                            headers: {
                                'authorization': `${token}`,
                                'Content-Type': 'application/json',
                            }
                        });
                        setRecommendData(res.data);
                    } catch (error) {
                        console.error('실패:', error);
                        navigate('/complete-join');
                    }
                } catch (error) {
                    console.error('실패:', error);
                    navigate("/join/booktype");
                }
            }
        };

        if (initialLoad.current) {
            fetchData();
            initialLoad.current = false;
        }
    }, [token, navigate]);

    const scrollToSection = (sectionRef) => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="div-main">
            <Slide />
            <MainHeader 
                scrollToNonFilter={() => scrollToSection(nonFilterRef)}
                scrollToFilter={() => scrollToSection(filterRef)}
                scrollToBestSellers={() => scrollToSection(bestSellersRef)}
                scrollToBookDrawer={() => scrollToSection(bookDrawerRef)}
            />
            <div ref={nonFilterRef}>
                <NonFilter nonfilterrecommend={recommendData.isbnNonFilter} />
            </div>
            <div ref={filterRef}>
                <Filter filterrecommend={recommendData.isbnFilter} />
            </div>
            <div ref={bestSellersRef}>
                <BestSellers />
            </div>
            <div ref={bookDrawerRef}>
                <BookDrawer token={token} navigate={navigate} />
            </div>
        </div>
    );
};

export default Main;
