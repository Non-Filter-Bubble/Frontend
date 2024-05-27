import React, { useState } from "react";
import '../styles/Search.css'; 

const Search = () => {
  const [books, setBooks] = useState([
    {
      title: "불변의 법칙",
      author: "모건 하우절",
      company: "서삼독",
      isFavorite: false,
      imgSrc: ""
    },
    {
      title: "마케팅 불변의 법칙",
      author: "알 리스, 잭 트라우트",
      company: "비즈니스맵",
      isFavorite: false,
      imgSrc: ""
    }
  ]);

  const toggleFavorite = (index) => {
    const newBooks = [...books];
    newBooks[index].isFavorite = !newBooks[index].isFavorite;
    setBooks(newBooks);
  };

  return (
    <div className="div-search">
      <p className="title">‘불변의 법칙'에 대한 2건의 검색 결과</p>
      <div className="div-search-box">
        <input className="search-box" alt="" placeholder="Search"/>
        <div className="div-btn-search">
          <div className="btn-search">
            <div className="search">검색</div>
          </div>
        </div>
      </div>
      <img className="line-search" alt="Line" src="/vector/line-search.svg" />
      {books.map((book, index) => (
        <div key={index} className={`book-${index + 1}`}>
          <img className="img-book-1" alt="" src={book.imgSrc}/>
          <div className={`book-${index + 1}-info`}>
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
            <div className="book-company">{book.company}</div>
          </div>
          <div className="book-service">
            <img
              className="icon-heart"
              alt=""
              src={book.isFavorite ? "/images/filled-heart-search.png" : "/images/empty-heart-search.png"}
              onClick={() => toggleFavorite(index)}
            />
            <img className="icon-cart" alt="" src="/images/icon-cart.png" />
          </div>
          <img className="line-book" alt=" " src="/vector/line-search-division.svg" />
        </div>
      ))}
    </div>
  );
};

export default Search;
