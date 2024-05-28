// 책 정보가 2권 이상일 때 디자인 바꿔야함

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios';
import '../styles/Search.css'; 

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../../bookImage.jpg';

const Search = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const location = useLocation();
  const dataList = location.state.dataList;
  const searchInput = location.state.searchInput;

  const [bookmarks, setBookmarks] = useState([]);

  // 찜한 책 목록 가져오기
  useEffect(() => {   
    const fetchBookmarks = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/like`, {
          headers: {
            'authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          console.log('찜한 책을 가져오는데 성공했습니다.');

          const bookmarks = response.data.map(bookmark => ({
            bookmarkId: bookmark.bookmarkid,
            isbn: bookmark.isbn
          }));
          console.log('찜한 책 목록입니다.');
          console.log(bookmarks);
          setBookmarks(bookmarks);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmarks();
  }, [token]);


  // 구매하기 버튼
  const handlePurchase = (book) => {
    window.open(`https://search.shopping.naver.com/book/search?bookTabType=ALL&pageIndex=1&pageSize=40&query=${book.TITLE}&sort=REL`, '_blank');
  };

  // 찜 버튼
  const toggleFavorite = async (book) => {
    console.log(`찜하기 클릭`);
    console.log(book);

    let bookmark = bookmarks.find(b => parseInt(b.isbn, 10) === parseInt(book.EA_ISBN, 10));
    console.log(bookmark);

    try {
      if (!bookmark) { // 찜하지 않은 책을 찜한 경우
        console.log('찜하지 않은 책을 찜에 대해 찜 버튼을 눌렀습니다.');

        const response = await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/user/like`, { 
          isbn: book.EA_ISBN,
          main_screen_selected: false,
          search_screen_selected: true
        }, {
            headers: {
              'authorization': `${token}`,
              'Content-Type': 'application/json'
            }
        });

        const responseText = response.data;
        const bookmarkIdMatch = responseText.match(/Bookmark saved successfully with ID: (\d+)/);
        const bookmarkId = bookmarkIdMatch ? parseInt(bookmarkIdMatch[1], 10) : null;

        if (bookmarkId) {
          setBookmarks((prevBookmarks) => [...prevBookmarks, { bookmarkId, isbn: parseInt(book.EA_ISBN, 10) }]);
        } else {
          console.error('Failed to parse bookmarkId');
        }

      } else { // 이미 찜한 책을 또 누른 경우
          console.log('이미 찜이 되어있는 책의 찜 삭제 버튼을 눌렀습니다.')
          const response = await axiosInstance.delete(`${process.env.REACT_APP_DB_HOST}/user/like/${bookmark.bookmarkId}`, {
            headers: {
              'authorization': `${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log(response);
          setBookmarks((prevBookmarks) => prevBookmarks.filter(b => b.bookmarkId !== bookmark.bookmarkId));
      }
    } catch (error) {
        console.error('API에 문제가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    console.log('Updated bookmarks:', bookmarks);
  }, [bookmarks]);

  const isBookmarked = (book) => bookmarks.some(b => parseInt(b.isbn, 10) === parseInt(book.EA_ISBN, 10));

  return (
    <div className="div-search">
      <p className="title">'{searchInput}'에 대한 2건의 검색 결과</p>
      {/* <div className="div-search-box">
        <input className="search-box" alt="" placeholder="Search"/>
        <div className="div-btn-search">
          <div className="btn-search">
            <div className="search">검색</div>
          </div>
        </div>
      </div> */}
      <img className="line-search" alt="Line" src="/vector/line-search.svg" />
      {dataList.map((book, index) => (
        <div key={index} className={`book-${index + 1}`} onClick={() => navigate("/search/book", { state: { bookinfo: book } }) }>
          <img className="img-book-1" alt={book.TITLE} src={book.BOOK_COVER_URL !== "" ? book.BOOK_COVER_URL : DEFAULT_IMAGE_URL} />
          <div className={`book-${index + 1}-info`}>
            <div className="book-title">{book.TITLE}</div>
            <div className="book-author">{book.AUTHOR}</div>
            <div className="book-company">{book.PUBLISHER}</div>
          </div>
          <div className="book-service">
            <img
              className="icon-heart"
              alt=""
              src={isBookmarked(book) ? "/images/filled-heart-search.png" : "/images/empty-heart-search.png"}
              onClick={() => toggleFavorite(book)}
            />
            <img className="icon-cart" alt="" src="/images/icon-cart.png" onClick={() => handlePurchase(book)} />
          </div>
          <img className="line-book" alt=" " src="/vector/line-search-division.svg" />
        </div>
      ))}
    </div>
  );
};

export default Search;
