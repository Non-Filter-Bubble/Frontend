import React, { useState, useEffect } from "react";
import "../styles/BestSellers.css";
import axiosInstance from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const BestSellers = () => {
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

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

            // 8개만 저장
            const bestSellersWithGenre = response.data.slice(0, 8).map((item, index) => ({
                ...item,
                rank: index + 1,
                GENRE_LV1: selectedGenre
            }));
            setBestSellers(bestSellersWithGenre);
        } catch (error) {
            console.error(`${selectedGenre} 베스트 셀러 목록을 가져오는 데 실패했습니다.`, error);
        }
    };

    const showDetail = async(index) => {
        const book = bestSellers[index];
        console.log('선택한 책:', book);

        try {
            const response1 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
                params: { isbn: parseInt(book.isbn, 10) },
            });

            const response2 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-books`, {
                params : { type: 'isbn', value: parseInt(book.isbn, 10) }
            });

            // 두 데이터 합치기
            const bookinfo = {...response1.data, ...response2.data.docs[0]};
            
            console.log(bookinfo);

            navigate('/search/book', { state: { bookinfo: bookinfo } });

            } catch (error) {
                console.error(`요청 실패:`, error);
            }
        }

    return (
        <div className="div-bestsellers">
            <p className="title">'{genre}' 베스트 셀러 </p>
            
                <div className="genre-buttons">
                    <Button variant="outline-dark" className={genre === '소설' ? 'selected' : ''} onClick={() => setGenre('소설')}>소설</Button>
                    <Button variant="outline-dark" className={genre === '자연과학' ? 'selected' : ''} onClick={() => setGenre('자연과학')}>자연과학</Button>
                    <Button variant="outline-dark" className={genre === '인문' ? 'selected' : ''} onClick={() => setGenre('인문')}>인문</Button>
                    <Button variant="outline-dark" className={genre === '자기계발' ? 'selected' : ''} onClick={() => setGenre('자기계발')}>자기계발</Button>
                    <Button variant="outline-dark" className={genre === '경제/경영' ? 'selected' : ''} onClick={() => setGenre('경제/경영')}>경제/경영</Button>
                    <Button variant="outline-dark" className={genre === '시/에세이' ? 'selected' : ''} onClick={() => setGenre('시/에세이')}>시/에세이</Button>
                </div>
            <div className="bestsellers-container">
                <div className="bestsellers-list-container">
                    {bestSellers.map((book, index) => (
                        <div key={index} className="book-item" onClick={() => showDetail(index)}>
                            <div className="book-rank">{book.rank}</div>
                            <div className="book-cover-container">
                                <img src={book.cover} alt="book_cover" className="book-cover" />
                            </div>
                            <div className="book-details-container">
                                <div className="book-details">
                                    <p className="title">{book.title}</p>
                                    <div className="author">저자: {book.author}</div>
                                    <div className="company">출판사: {book.publisher}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="info">도서 DB 제공 : 알라딘 인터넷 서점(www.aladin.co.kr)</p>
            </div>
        </div>
    );
};

export default BestSellers;
