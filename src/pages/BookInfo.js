// 다른 사용자의 한줄평을 가지고 와야함
// 줄거리 어떻게 가지고 와야하나.

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/BookInfo.css';

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../images/bookImage.jpg';

const BookInfo = () => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const location = useLocation();
  const bookinfo = location.state.bookinfo;
  console.log(bookinfo);

  const [bookmarks, setBookmarks] = useState([]);
  console.log(bookmarks);

  const handleBack = () => {
  navigate(-1); // 이전 페이지로 이동
  }

  useEffect(() => {
    console.log('Updated bookmarks:', bookmarks);
  }, [bookmarks]);

  // 구매하기 버튼
  const handlePurchase = (bookinfo) => {
    window.open(`https://search.shopping.naver.com/book/search?bookTabType=ALL&pageIndex=1&pageSize=40&query=${bookinfo.TITLE}&sort=REL`, '_blank');
  };

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

  // 찜하기
  const toggleFavorite = async (bookinfo) => {
    console.log(`찜하기 클릭`);
    console.log(bookinfo);

    let bookmark = bookmarks.find(b => parseInt(b.isbn, 10) === parseInt(bookinfo.EA_ISBN, 10));
    console.log(bookmark);

    try {
      if (!bookmark) { // 찜하지 않은 책을 찜한 경우
        console.log('찜하지 않은 책을 찜에 대해 찜 버튼을 눌렀습니다.');

        const response = await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/user/like`, { 
          isbn: bookinfo.EA_ISBN,
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
          setBookmarks((prevBookmarks) => [...prevBookmarks, { bookmarkId, isbn: parseInt(bookinfo.EA_ISBN, 10) }]);
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
   
  const isBookmarked = (bookinfo) => bookmarks.some(b => parseInt(b.isbn, 10) === parseInt(bookinfo.EA_ISBN, 10));

  return (
    <div className="div-bookinfo">
      <img className="back-bookinfo" alt="" src="/vector/back.svg" onClick={handleBack}/>
      <div className="book-title">{bookinfo.TITLE}</div>
      <img className="line" alt="Line" src="/vector/line-book.svg" />
      <img className="line-2" alt="Line" src="/vector/line-book.svg" />
      <div className="div-content">
        <div className="group-7">
          <div className="div-name">
            <div className="text-wrapper-5">도서명</div>
            <div className="text-wrapper-6">{bookinfo.TITLE}</div>
          </div>
          <div className="div-author">
            <div className="author">저자</div>
            <div className="text-wrapper-6">{bookinfo.AUTHOR}</div>
            
          </div>
          <div className="div-company">
            <div className="text-wrapper-5">출판사</div>
            <div className="company">{bookinfo.PUBLISHER}</div>
          </div>
        </div>
        <div className="div-plot">
          <div className="title-plot">줄거리</div>
          <p className="plot">
            dlrjdlkfjdsklfjaskldfasdljksdhfjlasdfladshf<br />
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
      <img className="book-img" alt={bookinfo.TITLE} src={bookinfo.BOOK_COVER_URL !== "" ? bookinfo.BOOK_COVER_URL : DEFAULT_IMAGE_URL}/>
        <img className="icon-cart" alt="Shopping cart" src="/images/icon-cart-white.png" onClick={() => handlePurchase(bookinfo)} />
        <img className="icon-heart" 
          alt="" 
          src={isBookmarked(bookinfo) ? "/images/filled-heart-big.png" : "/images/empty-heart-big.png"} 
          onClick={() => toggleFavorite(bookinfo)} />
      </div>
    </div>
  );
};

export default BookInfo;
