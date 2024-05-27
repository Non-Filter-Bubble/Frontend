import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axiosInstance from '../api/axios';

import Slide from "../components/Slide";
import Button4 from "../components/Button4";
import NonFilter from "../components/NonFilter";
import Filter from "../components/Filter";

import "../styles/Main.css"

const Main = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const [bestSellers, setBestSellers] = useState([]);
    const [genre, setGenre] = useState('소설'); // 초기값을 소설로 설정


    // // 사용자가 로그인 했는지 확인
    // useEffect(() => {
    //     if (!token) {
    //         alert('로그인이 필요한 서비스입니다.');
    //         // 로그인 기능 다 되면 주석 해제
    //         // window.location.href = '/login';
    //     } else {
    //         // 장르 선택 여부 확인
    //         axiosInstance.get('/verify-genre', {
    //             headers: {
    //                 'authorization': `${token}`
    //             }
    //         }).then((res) => {
    //             console.log(res);
    //             // 메인 페이지로 이동
    //             // navigate("/");
    //         }).catch((err) => {
    //             console.log(err);
    //             // 장르 선택 페이지로 이동
    //             navigate("/booktype");
    //         });

    //         fetchBestSellers('소설');
    //     }
    // }, [token]);

    useEffect(() => {
        // genre 상태가 변경될 때마다 해당 장르의 베스트 셀러 목록을 가져옴
        if (token) {
            fetchBestSellers(genre);
        }
    }, [genre, token]);

    // 베스트 셀러 목록을 가져오는 GET 요청
    const fetchBestSellers = async (selectedGenre) => {
        try {
            const response = await axiosInstance.get(`/bestseller`, {
                params: { genre: selectedGenre },
                headers: {
                    // 토큰이 없어도 되네?
                    // 'authorization': `${token}`
                }
            });
            console.log(`${selectedGenre} 베스트 셀러 목록:`, response.data);

            // 1o개만 저장
            const bestSellersWithGenre = response.data.slice(0, 10).map(item => ({
                ...item,
                GENRE_LV1: selectedGenre
            }));
            setBestSellers(bestSellersWithGenre);
        } catch (error) {
            console.error(`${selectedGenre} 베스트 셀러 목록을 가져오는 데 실패했습니다.`, error);
        }
    };

    // 책 등록 페이지로 이동
    const handleBookRegister = (book) => {
        console.log('책 등록 페이지로 이동');
        console.log(book);

        navigate('/bookpost', { state: { bookinfoMain: book } });
    };

    return (
        <div className="div-main">
            <Slide />
            <Button4 />
            <NonFilter />
            <Filter />

            <div>
                <Button variant="outline-dark" onClick={() => setGenre('소설')}>소설</Button>
                <Button variant="outline-dark" onClick={() => setGenre('자연과학')}>자연과학</Button>
                <Button variant="outline-dark" onClick={() => setGenre('인문')}>인문</Button>
                <Button variant="outline-dark" onClick={() => setGenre('자기계발')}>자기계발</Button>
                <Button variant="outline-dark" onClick={() => setGenre('경제/경영')}>경제/경영</Button>
                <Button variant="outline-dark" onClick={() => setGenre('시/에세이')}>시/에세이</Button>
            </div>

            <h2>{genre}베스트 셀러 목록</h2>

            <Container>
                {bestSellers.map((book, index) => (
                    <Row key={index} className="book-item">
                        <Col xs={12} md={3}>
                            <img src={book.cover} alt="book_cover" className="book-cover" />
                        </Col>
                        <Col xs={12} md={9}>
                            <div className="book-details">
                                <h3>{book.title}</h3>
                                <p>저자: {book.author}</p>
                                <p>출판사: {book.publisher}</p>
                                <p>ISBN: {book.isbn}</p>
                                <Button variant="outline-dark" onClick={() => handleBookRegister(book)}>책 등록</Button>
                            </div>
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>

    );
};

export default Main;
