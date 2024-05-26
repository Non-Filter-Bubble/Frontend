import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css'; 
import axios from 'axios';

const Search = () => {
   

    return (
        <div className="div-search">
          <p className="title">‘불변의 법칙'에 대한 2건의 검색 결과</p>
            <div className="div-search-box">
            <div className="search-box" />
            <div className="div-btn-search">
              <div className="btn-search">
                <div className="search">검색</div>
              </div>
            </div>
          </div>
          <img className="line-search" alt="Line" src="/vector/line-search.svg" />
          <div className="book-1">
            <img className="img-book-1" alt="" src=""/>
            <div className="book-1-info">
                <div className="book-title">불변의 법칙</div>
             
              <div className="book-author">모건 하우절</div>
              <div className="book-company">서삼독</div>
            </div>
            <div className="book-service">
              <img className="icon-heart" alt="" src="/images/empty-heart-search.png" />
              <img className="icon-cart" alt="" src="/images/icon-cart.png" />
            </div>
            <img className="line-book" alt=" " src="/vector/line-search-division.svg" />
          </div>
          <div className="book-2">
            <img className="img-book-1" alt="" src=""/>
            <div className="book-2-info">
                <div className="book-title">마케팅 불변의 법칙</div>
              <div className="book-author">알 리스, 잭 트라우트</div>
              <div className="book-company">비즈니스맵</div>
            </div>
            <div className="book-service">
              <img className="icon-heart" alt="" src="/images/empty-heart-search.png" />
              <img className="icon-cart" alt="" src="/images/icon-cart.png" />
            </div>
            <img className="line-book" alt=" " src="/vector/line-search-division.svg" />
          </div>
        </div>
      );
    };
export default Search;
