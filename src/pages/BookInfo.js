import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/BookInfo.css'; 
import axios from 'axios';

const BookInfo = () => {

    const navigate = useNavigate();

    const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
    }

    // 하트 아이콘
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };
   

    return (
      <div className="div-bookinfo">
        <img className="back-bookinfo" alt="" src="/vector/back.svg" onClick={handleBack}/>
        <div className="book-title">역행자</div>
        <img className="line" alt="Line" src="/vector/line-book.svg" />
        <img className="line-2" alt="Line" src="/vector/line-book.svg" />
        <div className="div-content">
          <div className="group-7">
            <div className="div-name">
              <div className="text-wrapper-5">도서명</div>
              <div className="text-wrapper-6">불변의 법칙</div>
            </div>
            <div className="div-author">
              <div className="author">저자</div>
              <div className="text-wrapper-6">모건 하우절</div>
              
            </div>
            <div className="div-company">
              <div className="text-wrapper-5">출판사</div>
              <div className="company">서삼독</div>
            </div>
          </div>
          <div className="div-plot">
            <div className="title-plot">줄거리</div>
            <p className="plot">
              1000년 후에도 유효할 인간의 행동양식과 반복패턴에 대한 <br />
              흥미로운 역사 스토리와 일화들을 들려준다. <br />
              워런 버핏의 스니커즈, 빌 게이츠의 숨겨진 불안, <br />
              유발 하라리가 받은 뜻밖의 비난, 게임스탑 사태의 보이지 않는 변수,&nbsp;&nbsp;
              <br />
              벌지 전투의 최후, 마술사 후디니의 죽음 등, 한 편 한 편의 이야기가 <br />
              마치 다큐소설처럼 펼쳐진다.
            </p>
          </div>
        </div>
        <div className="book">
        <img className="book-img" alt="" src=""/>
          <img className="icon-cart" alt="Shopping cart" src="/images/icon-cart-white.png" />
          <img className="icon-heart" 
            alt="" 
            src={isFavorite ? "/images/filled-heart-big.png" : "/images/empty-heart-big.png"} 
            onClick={toggleFavorite} />
        </div>
      </div>
      );
    };
export default BookInfo;
