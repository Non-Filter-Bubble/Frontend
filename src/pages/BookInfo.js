// 도서관 정보 가지고 와야 함

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/BookInfo.css';
import commentSample from '../data/comment.json';

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../images/bookImage.jpg';

const BookInfo = () => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const location = useLocation();
  const bookinfo = location.state.bookinfo;
  // const [img, setImg] = useState('');
  // const [description, setDescription] = useState(''); 
  const [info, setInfo] = useState([]);;
  console.log('넘어온 값', bookinfo);
  console.log('네이버로 가져온 값', info);

  const [bookmarks, setBookmarks] = useState([]);
  console.log(bookmarks);

  const plotRef = useRef(null);
  const line2Ref = useRef(null);
  const commentRef = useRef(null);

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

  useEffect(() => {
    // 줄거리 가져오기
    const getPlot = async () => {
      const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-NaverBooks`, {
        params: { 
          type: 'isbn',
          value: bookinfo.ISBN_THIRTEEN_NO 
        },
        headers: {
          'authorization': `${token}`,
          'Content-Type': 'application/json'
        }
        
      });
      console.log(response.data.items[0]);
      // setDescription(response.data.items[0].description);
      // setImg(response.data.items[0].image);
      setInfo(response.data.items[0]);
    }
    getPlot();
  }, [bookinfo, token]);

  useEffect(() => {
    const dynamicPosition = () => {
      if (plotRef.current && line2Ref.current) {
        const plotHeight = plotRef.current.offsetHeight;
        const plotTop = plotRef.current.offsetTop;
        const line2Top = plotTop + plotHeight + 550;
        line2Ref.current.style.top = `${line2Top}px`;

        if (commentRef.current) {
          const commentTop = line2Top + 50;
          commentRef.current.style.top = `${commentTop}px`;
        }
      }
    };

    dynamicPosition();
    window.addEventListener('resize', dynamicPosition);

    return () => {
      window.removeEventListener('resize', dynamicPosition);
    };
  }, [info]);

  return (
    <div className="div-bookinfo">

      <img className="back-bookinfo" alt="" src="/vector/back.svg" onClick={handleBack}/>
      <div className="book-title">{bookinfo.TITLE}</div>
      <img className="line" alt="Line" src="/vector/line-book.svg" />
      
      <div className="book">
        <img className="book-img" alt={bookinfo.TITLE} src={bookinfo.BOOK_COVER_URL !== "" ? bookinfo.BOOK_COVER_URL : DEFAULT_IMAGE_URL}/>
        {/* <img className="book-img" alt={bookinfo.TITLE} src={bookinfo.BOOK_COVER_URL !== "" ? info.image : DEFAULT_IMAGE_URL}/> */}
        <img className="icon-cart" alt="Shopping cart" src="/images/icon-cart-white.png" onClick={() => handlePurchase(bookinfo)} />
        <img className="icon-heart" 
          alt="" 
          src={isBookmarked(bookinfo) ? "/images/filled-heart-big.png" : "/images/empty-heart-big.png"} 
          onClick={() => toggleFavorite(bookinfo)} />
      </div>
      
      <div className="div-content">
        <div className="group-7">
          <div className="div-name">
            <div className="text-wrapper-5">도서명</div>
            <div className="text-wrapper-6">{bookinfo.TITLE}</div>
          </div>
          <div className="div-author">
            <div className="author">저자</div>
            <div className="text-wrapper-6">{bookinfo.AUTHOR}</div>
            {/* <div className="text-wrapper-6">{info.author}</div> */}
          </div>
          <div className="div-company">
            <div className="text-wrapper-5">출판사</div>
            <div className="company">{bookinfo.PUBLISHER}</div>
            {/* <div className="company">{info.publisher}</div> */}
          </div>
        </div>
        <div className="div-plot">
          <div className="title-plot">줄거리</div>
          {/* <p className="plot">{description}</p> */}
          <p className="plot" ref={plotRef}>{info.description}</p>
        </div>
      </div>

      <img className="line-2" alt="Line" src="/vector/line-book.svg" ref={line2Ref}/>

      {/* 한줄평이 있는 경우만 보여줌 - 여기도 나중에 3개가 아닐 때를 고려해야함 */}
      {commentSample[bookinfo.ISBN_THIRTEEN_NO] && <div className="div-comment" ref={commentRef}>
        <div className="title-comment">한줄평</div>
        <div className="div-comment-box">
          {commentSample[bookinfo.ISBN_THIRTEEN_NO].map((comment, index) => (
            <div key={index} className="comment-box">
              <p className="comment">{comment}</p>
            </div>
          ))}
        </div>
      </div>}
      
    </div>
  );
};

export default BookInfo;
