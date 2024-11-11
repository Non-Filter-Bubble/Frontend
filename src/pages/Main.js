import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../api/axios';

import Slide from "../components/Slide";
import MainHeader from "../components/MainHeader";
import NonFilter from "../components/NonFilter";
import Filter from "../components/Filter";
import BestSellers from "../components/BestSellers";
import BookDrawer from "../components/BookDrawer";
import Tutorial from '../components/Tutorial';

import "../styles/Main.css";

const Main = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const initialRecommendData = location.state?.recommendData || {};
    const [recommendData, setRecommendData] = useState(initialRecommendData);
    const initialLoad = useRef(true);

    const nonFilterRef = useRef(null);
    const filterRef = useRef(null);
    const bestSellersRef = useRef(null);
    const bookDrawerRef = useRef(null);
    const slide01Ref = useRef(null);  // Slide01 컴포넌트의 ref 생성

    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        const dontShowTutorial = localStorage.getItem('dontShowTutorial');
        if (dontShowTutorial !== 'true') {
            setShowTutorial(true);
        }
    }, []);
    
    const handleTutorialClose = (dontShowAgain) => {
        if (dontShowAgain) {
            localStorage.setItem('dontShowTutorial', 'true');
        }
        setShowTutorial(false);
    };

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
            const elementPosition = sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="div-main">
            {showTutorial && <Tutorial onClose={handleTutorialClose} />}
            {/* Slide01에 ref 전달 및 scrollToSlide01 함수 전달 */}
            <div ref={slide01Ref}>
                <Slide scrollToNonFilter={() => scrollToSection(nonFilterRef)} scrollToSlide01={() => scrollToSection(slide01Ref)} />
            </div>
            <MainHeader 
                scrollToNonFilter={() => scrollToSection(nonFilterRef)}
                scrollToFilter={() => scrollToSection(filterRef)}
                scrollToBestSellers={() => scrollToSection(bestSellersRef)}
                scrollToBookDrawer={() => scrollToSection(bookDrawerRef)}
            />
            <div ref={nonFilterRef}>
                <NonFilter nonfilterrecommend={recommendData.isbn_nonfilter} />
            </div>
            <div ref={filterRef}>
                <Filter filterrecommend={recommendData.isbn_filer} />
            </div>
            <div ref={bookDrawerRef}>
                <BookDrawer token={token} navigate={navigate} />
            </div>
            <div ref={bestSellersRef}>
                <BestSellers />
            </div>
        </div>
    );
};

export default Main;
