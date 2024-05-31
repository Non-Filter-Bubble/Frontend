import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import '../styles/SearchPopup.css'; // Screen 컴포넌트의 스타일을 포함합니다.

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../images/bookImage.jpg';

const SearchPopup = ({ onClose, bookinfo, setBookinfo }) => {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 검색 버튼 클릭
  const handleSearch = async () => {  
    if (!input) {
      alert('책제목을 입력해주세요.');
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

      console.log('검색한 책의 리스트는', dataList);
      
      setSearchResults(dataList);
  
    } catch (error) {
      console.error('검색 실패:', error); // 오류가 발생한 경우 출력
    }
  }

  const handleSelectBook = async (book) => {
    console.log('책 선택:', book)

    setBookinfo(book);

    onClose();
  }


   // 엔터 키를 눌렀을 때 검색을 실행하는 함수
   const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }


  // 동적으로 스타일을 적용할 함수
  const getGroupStyle = (index) => {
    return {
      height: '160px',
      left: '48px',
      position: 'absolute',
      top: `${120 + index * 160}px`, // 각 그룹마다 상대적으로 위치를 변경합니다.
      width: '334px'
    };
  }

  return (
    <div className="div-search-popup">
      <div className="group">
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

        <div className="div-search-result">
          {searchResults.map((book, index) => (
            <div key={index} className="group-2" onClick={() => handleSelectBook(book)} style={getGroupStyle(index)}>
              <img className="img-2" alt=" " src={book.BOOK_COVER_URL !== "" ? book.BOOK_COVER_URL : DEFAULT_IMAGE_URL} />
              <div className="group-3">
                <div className="text-wrapper-2">{book.TITLE}</div>
                <div className="text-wrapper-3">{book.AUTHOR}</div>
                <div className="text-wrapper-4">{book.PUBLISHER}</div>
              </div>
              {/* <img className="line-div-search-book" alt="Line" src="/vector/line-search-popup.svg" /> */}
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default SearchPopup;








// 원래 코드
// <div className="div-search-popup">
//  <div className="group">
//    <div className="div-search">
//      <img className="line-div-search" alt="" src="/vector/line-div-search-popup.svg" />
//      <img className="btn-close" alt=" " src="/images/btn-close-popup.png" onClick={onClose} />
//      <img className="btn-search-popup" alt=" " src="/images/btn-search-popup.png" />
//      <input className="search-input" type="text" placeholder="검색어를 입력하세요" />  
//    </div>
//    <div className="div-search-result">
//      <div className="group-2">
//        <img className="img-2" alt=" " src="image-16.png" />
//        <div className="group-3">
//          <div className="text-wrapper-2">마케팅 불변의 법칙</div>
//          <div className="text-wrapper-3">알 리스,잭 트라우트</div>
//          <div className="text-wrapper-4">비즈니스맵</div>
//        </div>
//      </div>
//
//      <img className="line-div-search-book" alt="Line" src="/vector/line-search-popup.svg" />
//
//      <div className="group-4">
//        <div className="group-5">
//          <div className="text-wrapper-5">불변의 법칙</div>
//          <div className="text-wrapper-6">모건 하우절</div>
//          <div className="text-wrapper-7">서삼독</div>
//        </div>
//       <img className="img-2" alt="" src="rectangle-43.png" />
//      </div>
//    </div>
//  </div>
// </div>