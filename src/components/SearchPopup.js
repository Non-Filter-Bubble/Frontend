import React, { useState, useRef } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchPopup.css'; // Screen 컴포넌트의 스타일을 포함합니다.

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../images/bookImage-small.png';

const SearchPopup = ({ onClose, bookinfo, setBookinfo }) => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const resultsRef = useRef(null); // 검색 결과 컨테이너를 위한 참조 생성

  // 검색 버튼 클릭
  const handleSearch = async () => {  
    if (!input) {
      alert('책 제목을 입력해주세요.');
      return;
    }

    // 제목만 검색
    try {
      const response1 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-books`, {
        params: {
          type: 'title',
          value: input
        }
      });

      const dataList1 = response1.data.docs;   
      const dataList2 = [];

      for (const data of dataList1) {
        try {
          const response2 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
            params: {
              isbn: parseInt(data.EA_ISBN, 10)
            }
          });
          dataList2.push(response2.data);
        } catch (error) {
          dataList2.push({ ISBN_THIRTEEN_NO: parseInt(data.EA_ISBN, 10), GENRE_LV1: "", GENRE_LV2: "", INFO_TEXT: "", BOOK_COVER_URL: ""});
        }
      }

      // 두 데이터 합치기
      const dataList = dataList1.map(data1 => {
        const data2 = dataList2.find(data2 => parseInt(data1.EA_ISBN, 10) === data2.ISBN_THIRTEEN_NO);
        return { ...data1, ...data2 };
      });

      // console.log('검색한 책의 리스트는', dataList);
      
      setSearchResults(dataList);
      if (resultsRef.current) {
        resultsRef.current.scrollTop = 0; // 스크롤을 맨 위로 이동
      }
  
    } catch (error) {
      console.error('검색 실패:', error); // 오류가 발생한 경우 출력
    }
  }

  const handleSelectBook = async (book) => {
    // console.log('책 선택:', book)

    // 선택한 책이 이미 등록되어있는지 확인
    const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/bookbox/mybook`, {
      headers: {
        authorization: `${token}`,
      },
    });
    
    const isbnList = response.data.map(book => book.isbn);
    // console.log('등록한 책의 ISBN 목록:', isbnList);

    if (isbnList.includes(parseInt(book.EA_ISBN, 10))) {
      alert('이미 등록된 책입니다. 북 서랍에서 확인해주세요.');
      navigate('/user')
    }

    setBookinfo(book);

    onClose();
  }


   // 엔터 키를 눌렀을 때 검색을 실행하는 함수
   const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="div-search-popup">
      <div className="search-popup">
        <div className="div-search">
          <img className="line-div-search" alt="" src="/vector/line-div-search-popup.svg" />
          <img className="btn-close" alt=" " src="/images/btn-close-popup.png" onClick={onClose} />
          <img className="btn-search-popup" alt=" " src="/images/btn-search-popup.png" onClick={handleSearch} />
          <input
            className="search-input"
            type="text"
            placeholder="검색어를 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress} // 엔터 키 감지 이벤트 추가
          />  
        </div>
        
        <div className="div-search-result" ref={resultsRef}>
          {searchResults.map((book, index) => (
            <div key={index} className="group-book-wrapper">
              <div className="group-book" onClick={() => handleSelectBook(book)}>
                <img className="book-img" alt=" " src={book.BOOK_COVER_URL || DEFAULT_IMAGE_URL} />
                <div className="group-book-info">
                  <div className="title">{book.TITLE}</div>
                  <div className="author">{book.AUTHOR}</div>
                  <div className="company">{book.PUBLISHER}</div>
                </div>
              </div>
              {index < searchResults.length - 1 && (
                <img className="line-div-search-book" alt="Line" src="/vector/line-search-popup.svg" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;








