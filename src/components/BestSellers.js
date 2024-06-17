import React, { useState, useEffect } from "react";
import "../styles/BestSellers.css";
import axiosInstance from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from 'react-bootstrap';

const BestSellers = () => {
    const token = localStorage.getItem('token');

    const [bestSellers, setBestSellers] = useState([]);
    const [genre, setGenre] = useState('소설'); // 초기값을 소설로 설정

    useEffect(() => {
        // genre 상태가 변경될 때마다 해당 장르의 베스트 셀러 목록을 가져옴
        if (token) {
            fetchBestSellers(genre);
        }
    }, [genre, token]);

    // 베스트 셀러 목록을 가져오는 GET 요청
    const fetchBestSellers = async (selectedGenre) => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/bestseller`, {
                params: { genre: selectedGenre },
                headers: {
                    'Content-Type': 'application/json'
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

    return (
        <div className="div-bestsellers">
            <h2 className="title">'{genre}' 베스트 셀러 목록</h2>
          <div className="bestsellers-container">
          <div className="genre-buttons">
            <Button variant="outline-dark" className={genre === '소설' ? 'selected' : ''} onClick={() => setGenre('소설')}>소설</Button>
            <Button variant="outline-dark" className={genre === '자연과학' ? 'selected' : ''} onClick={() => setGenre('자연과학')}>자연과학</Button>
            <Button variant="outline-dark" className={genre === '인문' ? 'selected' : ''} onClick={() => setGenre('인문')}>인문</Button>
            <Button variant="outline-dark" className={genre === '자기계발' ? 'selected' : ''} onClick={() => setGenre('자기계발')}>자기계발</Button>
            <Button variant="outline-dark" className={genre === '경제/경영' ? 'selected' : ''} onClick={() => setGenre('경제/경영')}>경제/경영</Button>
            <Button variant="outline-dark" className={genre === '시/에세이' ? 'selected' : ''} onClick={() => setGenre('시/에세이')}>시/에세이</Button>
         </div>
    
            <div className="bestsellers-list-container">
              {bestSellers.map((book, index) => (
                <Row key={index} className="book-item">
                  <Col xs={12} md={3} className="book-cover-container">
                    <img src={book.cover} alt="book_cover" className="book-cover" />
                  </Col>
                  <Col xs={12} md={5} className="book-details-container">
                    <div className="book-details">
                      <p>{book.title}</p>
                      <div>저자: {book.author}</div>
                      <div>출판사: {book.publisher}</div>
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
            <p>도서 DB 제공 : 알라딘 인터넷 서점(www.aladin.co.kr)</p>
          </div>
        </div>
      );
    };
    export default BestSellers;