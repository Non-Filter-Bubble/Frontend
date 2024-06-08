import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../api/axios';

import Slide from "../components/Slide";
import Button4 from "../components/Button4";
import NonFilter from "../components/NonFilter";
import Filter from "../components/Filter";
import BestSellers from "../components/BestSellers";

import "../styles/Main.css"

const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const initialRecommendData = location.state?.recommendData || {};
    console.log('값이 있으면 회원가입하고 바로 메인에 들어온거임', initialRecommendData);
    const [recommendData, setRecommendData] = useState(initialRecommendData);
    console.log('recommendData변수에 저장된 값 확인', recommendData);

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
            }).then( async (res) => {
                // console.log(res);
                // 여기서 DB에 저장된 추천 도서 불러오기
                console.log('장르 선택 완료한 사용자야 디비에서 추천 도서 가져올거임');
                
                try {
                    await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/isbn_list`, {
                        headers: {
                            'authorization': `${token}`,
                            'Content-Type': 'application/json',
                        }}
                    ).then((res) => {
                        console.log(res.data);
                        setRecommendData(res.data);
                        console.log('디비에서 가져온 정보를 저장한 후에 확인', recommendData);

                    });
                } catch (error) {
                    console.error('실패:', error);
                }
                
            }).catch((err) => {
                // console.log(err);
                // 장르 선택 페이지로 이동
                navigate("/join/booktype");
            }); 
        }
    }, [token, navigate]);

    return (
        <div className="div-main">
            <Slide />
            <Button4 />
            <NonFilter nonfilterrecommend={recommendData.isbnNonFilter}/>
            <Filter filterrecommend={recommendData.isbnFilter}/>
            <BestSellers />
        </div>
    );
};

export default Main;
