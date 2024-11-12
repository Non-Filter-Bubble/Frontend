// search-book으로 안나오는 게 있네

import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axios';
import '../styles/HeartPopup.css'; // Screen 컴포넌트의 스타일을 포함합니다.
import { GoHeartFill } from "react-icons/go";

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../images/bookImage-small.png';

const HeartPopup = ({ onClose }) => {
  const token = localStorage.getItem('token');

  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState([]);
  const resultsRef = useRef(null); // 검색 결과 컨테이너를 위한 참조 생성

  // 팝업 외부 클릭 시 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

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
          const bookmarks = response.data.map(bookmark => ({
            bookmarkId: bookmark.bookmarkid,
            isbn: bookmark.isbn
          }));
          // console.log('찜한 책 목록입니다.');
          console.log(bookmarks);
          setBookmarks(bookmarks);

          const dataList = [];

          for (const bookmark of bookmarks) {
            console.log(bookmark.isbn);
            
            // isbn으로 책 정보 가져오기
            try {
              const response1 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-books`, {
                params: {
                  type: 'isbn',
                  value: bookmark.isbn
                }
              });
              console.log(response1.data.docs);

              // 일단 찜은 AI에서 수집한 책의 정보만 보여주기로!!!!
              const combinedData = {
                bookmarkId: bookmark.bookmarkId,
                isbn: response1.data.docs[0].EA_ISBN,
                title: response1.data.docs[0].TITLE,
                author: response1.data.docs[0].AUTHOR,
                publisher: response1.data.docs[0].PUBLISHER,
                image: `https://contents.kyobobook.co.kr/sih/fit-in/100x0/pdt/${bookmark.isbn}.jpg`
              };
          
              dataList.push(combinedData);
            } catch (error) {              
              console.error(error);
            }
          }
          console.log('찜한 책 목록입니다.', dataList);
          setShowBookmarks(dataList);
        }
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchBookmarks();
  }, [token]);


  // 찜 취소
  const toggleHeart = async (book) => {
    // console.log(book);
    const confirmDelete = window.confirm(`정말로 [${book.title}] 책의 찜을 취소하시겠습니까?`);

    if (!confirmDelete) {
      return; // 사용자가 취소를 선택하면 함수 종료
    }

    let bookmark = bookmarks.find(b => parseInt(b.isbn, 10) === parseInt(book.isbn, 10));
    console.log(bookmark);

    try {
      console.log('책의 찜 삭제 버튼을 눌렀습니다.')
          const response = await axiosInstance.delete(`${process.env.REACT_APP_DB_HOST}/user/like/${bookmark.bookmarkId}`, {
            headers: {
              'authorization': `${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log(response);
          setBookmarks((prevBookmarks) => prevBookmarks.filter(b => b.bookmarkId !== bookmark.bookmarkId));
          setShowBookmarks(prevShowBookmarks => prevShowBookmarks.filter(b => b.isbn !== book.isbn));
    } catch (error) {
        console.error('API에 문제가 발생했습니다.', error);
    }
  };

  return (
    <div className="div-heart-popup" ref={resultsRef}>
        {showBookmarks.length === 0 ? 
        (
          <p>아직 찜한 도서가 없습니다.</p>
        ) : 
        (
          showBookmarks.map((book, index) => (
            <div key={index} className="group-book-wrapper">
              <div className="group-book">
                <img className="book-img" alt=" " src={book.image || DEFAULT_IMAGE_URL} />
                <div className="group-book-info">
                  <div className="title">{book.title}</div>
                  <div className="author">{book.author}</div>
                  <div className="company">{book.publisher}</div>
                </div>
                <div className="heart-icon" onClick={() => toggleHeart(book)}>
                  <GoHeartFill size={35} color='#D7443E' />
                </div>
              </div>
              {index < showBookmarks.length - 1 && (
                <img className="line-div-search-book" alt="Line" src="/vector/line-search-popup.svg" />
              )}
            </div>
          ))
        )}
    </div>

  );
};

export default HeartPopup;


// {/* <div className="screen">
// <div className="group">
//   <div className="group-3">
//     <p className="text-wrapper">
//       나는 메트로폴리탄 미술관의 <br />
//       경비원 입니다
//     </p>
//     <div className="text-wrapper-2">웅진 지식 하우스</div>
//     <div className="text-wrapper-3">패트릭 브링리</div>
//   </div>
//   <div className="image-wrapper">
//     <img
//       className="image"
//       alt=""
//       src={hearts[0] ? "images/filled-heart-small.png" : "images/empty-heart-small.png"}
//       onClick={() => toggleHeart(0)}
//     />
//   </div>
// </div>
// <div className="group-2">
//   <div className="group-3">
//     <p className="text-wrapper">
//       나는 메트로폴리탄 미술관의 <br />
//       경비원 입니다
//     </p>
//     <div className="text-wrapper-2">웅진 지식 하우스</div>
//     <div className="text-wrapper-3">패트릭 브링리</div>
//   </div>
//   <div className="img-wrapper">
//     <img
//       className="img"
//       alt=""
//       src={hearts[1] ? "images/filled-heart-small.png" : "images/empty-heart-small.png"}
//       onClick={() => toggleHeart(1)}
//     />
//   </div>
// </div>
// <div className="group-4">
//   <div className="group-3">
//     <p className="text-wrapper">
//       나는 메트로폴리탄 미술관의 <br />
//       경비원 입니다
//     </p>
//     <div className="text-wrapper-2">웅진 지식 하우스</div>
//     <div className="text-wrapper-3">패트릭 브링리</div>
//   </div>
//   <div className="group-5">
//     <img
//       className="img"
//       alt=""
//       src={hearts[2] ? "images/filled-heart-small.png" : "images/empty-heart-small.png"}
//       onClick={() => toggleHeart(2)}
//     />
//   </div>
// </div>
// <div className="group-6">
//   <div className="group-3">
//     <p className="text-wrapper">
//       나는 메트로폴리탄 미술관의 <br />
//       경비원 입니다
//     </p>
//     <div className="text-wrapper-2">웅진 지식 하우스</div>
//     <div className="text-wrapper-3">패트릭 브링리</div>
//   </div>
//   <div className="group-7">
//     <img
//       className="img"
//       alt=""
//       src={hearts[3] ? "images/filled-heart-small.png" : "images/empty-heart-small.png"}
//       onClick={() => toggleHeart(3)}
//     />
//   </div>
// </div>
// </div> */}
