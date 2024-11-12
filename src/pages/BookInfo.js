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

  // const bookinfo = location.state?.bookinfo || {}; // 도서 정보
  const bookinfo = location.state.bookinfo; // 도서 정보

  const [finalBookInfo, setFinalBookInfo] = useState(bookinfo); // 사용할 도서 정보

  const [bookmarks, setBookmarks] = useState([]); // 찜 목록

  const [library, setLibrary] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const plotRef = useRef(null);
  const line2Ref = useRef(null);
  const commentRef = useRef(null);
  const libraryRef = useRef(null);

  const handleBack = () => {
  navigate(-1); // 이전 페이지로 이동
  }

  useEffect(() => {
    console.log('Updated bookmarks:', bookmarks);
  }, [bookmarks]);

  // 구매하기 버튼
  const handlePurchase = (finalBookInfo) => {
    window.open(`https://search.shopping.naver.com/book/search?bookTabType=ALL&pageIndex=1&pageSize=40&query=${finalBookInfo.TITLE ? finalBookInfo.TITLE : finalBookInfo.title}&sort=REL`, '_blank');
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
          // console.log('찜한 책을 가져오는데 성공했습니다.');

          const bookmarks = response.data.map(bookmark => ({
            bookmarkId: bookmark.bookmarkid,
            isbn: bookmark.isbn
          }));
          // console.log('찜한 책 목록입니다.');
          // console.log(bookmarks);
          setBookmarks(bookmarks);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmarks();
  }, [token]);

  // 찜하기 버틑 클릭
  const toggleFavorite = async (finalBookInfo) => {

    let bookmark = bookmarks.find(b => parseInt(b.isbn, 10) === finalBookInfo.ISBN_THIRTEEN_NO); // 찜 되어 있는 거 확인
    console.log(bookmark); // bookmarkId, isbn

    try {
      if (!bookmark) { // 찜하지 않은 책을 찜한 경우
        // console.log('찜하지 않은 책을 찜에 대해 찜 버튼을 눌렀습니다.');

        const response = await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/user/like`, { 
          isbn: finalBookInfo.ISBN_THIRTEEN_NO,
          main_screen_selected: false,
          search_screen_selected: true
        }, {
            headers: {
              'authorization': `${token}`,
              'Content-Type': 'application/json'
            }
        });

        const responseText = response.data;
        // console.log(response.data); // Bookmark saved successfully with ID: 19
        const bookmarkIdMatch = responseText.match(/Bookmark saved successfully with ID: (\d+)/);
        // console.log(bookmarkIdMatch);
        const bookmarkId = bookmarkIdMatch ? parseInt(bookmarkIdMatch[1], 10) : null;

        if (bookmarkId) {
          setBookmarks((prevBookmarks) => [...prevBookmarks, { bookmarkId, isbn: finalBookInfo.ISBN_THIRTEEN_NO }]);
        } else {
          console.error('찜 실패');
        }

      } else { // 이미 찜한 책을 또 누른 경우
          // console.log('이미 찜이 되어있는 책의 찜 삭제 버튼을 눌렀습니다.')
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
   
  const isBookmarked = (finalBookInfo) => bookmarks.some(b => parseInt(b.isbn, 10) === bookinfo.ISBN_THIRTEEN_NO);

  useEffect(() => {
    // 없는 값들 채우기
    const getInfo = async () => {
      const response1 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-NaverBooks`, {
        params: { type: 'isbn', value: bookinfo.ISBN_THIRTEEN_NO },
        headers: { 'Content-Type': 'application/json' }
      });

      const response2 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-books`, {
        params : { type: 'isbn', value: bookinfo.ISBN_THIRTEEN_NO }
      });

      console.log(response1.data.items[0]);
      console.log(response2.data.docs[0]);

      let response = { };
      if (response1.data.items.length === 0 && response2.data.docs.length !== 0) {
        response = { author: "", description : "", discount : "", image : "", isbn : "", link : "", pubdate : "", publisher : "", title : "", ...response2.data.docs[0] };
      } else if (response1.data.items.length !== 0 && response2.data.docs.length === 0) {
        response = { ...response1.data.items[0], AUTHOR: "", EA_ISBN:"" , PUBLISHER:"", TITLE:"" };
      } else if (response1.data.items.length === 0 && response2.data.docs.length === 0) {
        alert('도서 정보를 가져오는데 실패했습니다.');
        navigate(-1);
        return;
        // response = { author: "", description : "", discount : "", image : "", isbn : "", link : "", pubdate : "", publisher : "", title : "", AUTHOR: "", EA_ISBN:"" , PUBLISHER:"", TITLE:"" };
      }

      // 가지고 온 값과 가져온 값을 합쳐서 저장
      setFinalBookInfo(prevState => ({ ...prevState, ...response }));
      
      // setFinalBookInfo(response);
    }
    getInfo();
  }, [bookinfo.ISBN_THIRTEEN_NO, navigate]);

  console.log('finalBookInfo:', finalBookInfo);

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

        if (libraryRef.current && commentRef.current) {
          const commentTop = line2Top + 50;
          const commentBoxHeight = commentRef.current.offsetHeight;
          const libraryTop = commentTop + commentBoxHeight + 50;
          libraryRef.current.style.top = `${libraryTop}px`;
        }

        if (!commentRef.current && libraryRef.current) {
          const libraryTop = line2Top + 50;
          libraryRef.current.style.top = `${libraryTop}px`;
        }
      }
    };

    dynamicPosition();
    window.addEventListener('resize', dynamicPosition);

    return () => {
      window.removeEventListener('resize', dynamicPosition);
    };
  }, [finalBookInfo]);

  // 도서관 정보 가져오기 - 일단 서울로 함
  useEffect(() => {
    const handleLibrary = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/searchLibraryByBook`, {
          params: { 
            isbn: finalBookInfo.ISBN_THIRTEEN_NO,
            region: 11 
        },
          headers: {
            // 'authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });
        // console.log(response.data.libs.lib);
        setLibrary(response.data.libs.lib);

      } catch (error) {
        console.error(error);
      }
    };

    handleLibrary();
  }, [finalBookInfo.ISBN_THIRTEEN_NO]);

  // console.log('도서관 정보', library);

  const nextSlide = () => {
    if (currentSlide < Math.ceil(library.length / 3) - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="div-bookinfo">
      <div className="header">
        <img className="back-bookinfo" alt="" src="/vector/back.svg" onClick={handleBack}/>
        <div className="book-title">{finalBookInfo.TITLE ? finalBookInfo.TITLE : finalBookInfo.title}</div>
      </div>
  
      <div className="content-wrapper">
        <div className="book">
          <img className="book-img" alt={finalBookInfo.title} src={finalBookInfo.BOOK_COVER_URL !== "" ? finalBookInfo.BOOK_COVER_URL : DEFAULT_IMAGE_URL}/>
          
          <div className="book-actions">
            <img className="icon-cart" alt="Shopping cart" src="/images/icon-cart-white.png" onClick={() => handlePurchase(finalBookInfo)} />
            <img className="icon-heart" 
              alt="" 
              src={isBookmarked(finalBookInfo) ? "/images/filled-heart-big.png" : "/images/empty-heart-big.png"} 
              onClick={() => toggleFavorite(finalBookInfo)} />
          </div>
        </div>
        
        <div className="div-content">
          <div className="group-7">
            <div className="div-name">
              <div className="text-wrapper-5">도서명</div>
              <div className="text-wrapper-6">{finalBookInfo.title}</div>
            </div>
            <div className="div-author">
              <div className="author">저자</div>
              <div className="text-wrapper-6">{finalBookInfo.author}</div>
            </div>
            <div className="div-company">
              <div className="text-wrapper-5">출판사</div>
              <div className="company">{finalBookInfo.publisher}</div>
            </div>
            <div className="div-plot">
              <div className="title-plot">줄거리</div>
              <p className="plot" ref={plotRef}>{finalBookInfo.description}</p>
          </div>
          </div>
          
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
  
      <div className="div-library" ref={libraryRef}>
        <div className="title-library">도서관 정보</div>
        <div className="div-library-box">
          <button className="prev-button" onClick={prevSlide}>&lt;</button>
          {library.slice(currentSlide * 3, (currentSlide + 1) * 3).map((lib, index) => (
            <div key={index} className="library-box">
              <img src='../images/library.png' alt="도서관 이미지" />
              <div className="library">{lib.libName}</div>              
            </div>
          ))}
          <button className="next-button" onClick={nextSlide}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
