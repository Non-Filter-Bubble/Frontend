import React, {useEffect, useState, useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios';
import "../styles/NonFilter.css";

const NonFilter = ( {nonfilterrecommend} ) => {
  // console.log("메인에서 넘어온 값입니다. 논필터");
  // console.log(nonfilterrecommend);

  // const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [bookinfo, setBookinfo] = useState([]);

  const getBookInfo = useCallback(async (isbn) => {
    // console.log('책 정보 요청:', isbn)
    try {
      // "BOOK_COVER_URL", "GENRE_LV1", "GENRE_LV2", "INFO_TEXT_BOLD", ISBN_THIRTEEN_NO
      const response1 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
        params: { isbn: isbn }, 
        // headers: { 'authorization': `${token}` }
      });

      // // "AUTHOR", "EA_ISBN", "PUBLISHER", "TITLE"
      // const response2 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-books`, {
      //   params : { type: 'isbn', value: isbn }
      // });

      // "author", "description", "discount", "image", "isbn", "link", "pubdate", "publisher", "title"
      const response2 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-NaverBooks`, {
        params: { 
          type: 'isbn',
          value: isbn
        },
        headers: {
          'Content-Type': 'application/json'
        }        
      });
      // console.log(response2.data.items[0]);

      let response = { };
      if (response2.data.items.length === 0) {
        response = { ...response1.data, author: "", description : "", discount : "", image : "", isbn : "", link : "", pubdate : "", publisher : "", title : "" };
      } else {
        response = { ...response1.data, ...response2.data.items[0] };
      }

      setBookinfo(prevBookinfo => [...prevBookinfo, response]);
    } catch (error) {
      // load-book은 실패할 수 없음
      console.error(`ISBN ${isbn}에 대한 요청 실패:`, error);
      // setBookinfo();
    }
  // }, [token]);
  }, []);

  // 랜덤으로 책 정보 5개 추출
  const getRandom = useCallback((list) => {    
    const randomIndexs = []
    while (randomIndexs.length < 5) {
      const randomIndex = Math.floor(Math.random() * list.length);
      if (!randomIndexs.includes(randomIndex)) {
        randomIndexs.push(randomIndex);
      }
    }
    // console.log('랜덤으로 추출된 인덱스:', randomIndexs);
    // console.log('랜덤으로 추출된 책의 ISBN:', randomIndexs.map(index => list[index]));
    randomIndexs.forEach(index => getBookInfo(list[index]));
    
  }, [getBookInfo]);

  // 처음 로드 시 랜덤으로 추출된 책 정보를 저장
  useEffect(() => {
    setBookinfo([]);
    if (nonfilterrecommend && nonfilterrecommend.length > 0) {
      getRandom(nonfilterrecommend);
    }
  }, [nonfilterrecommend, getRandom]);

  // 다시 추천 버튼 클릭 시
  const handleFilterLeftClick = () => {
    setBookinfo([]);
    if (nonfilterrecommend && nonfilterrecommend.length > 0) {
      getRandom(nonfilterrecommend);
    }
  }; 

  console.log('랜덤으로 추출된 책의 정보:', bookinfo);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // 클릭 시
  const showDetail = async (index) => {
    console.log('책 상세정보');
    console.log(bookinfo[index]);

    navigate('/search/book', { state: { bookinfo: bookinfo[index] } });
  };
    
  return (
    <div className="non-filter">
      <div className="div-nonfilter">
        <p className="ment-1">취향을 넓힐 시간, 이 책을 추천합니다!</p>
        <p className="ment-2">
          선입견 없는 한줄평이 새로운 취향을 탐험하게 해줍니다. 미지의 책 속 숨은 메시지를 발견해보세요
        </p>
        <img className="btn-reset" alt="" src="images/btn-reset.png" onClick={handleFilterLeftClick} />

        <div className="div-card">
          {bookinfo.slice(0, 5).map((book, index) => (
            <div key={index} className={`card-${index + 1}`} onClick={() => showDetail(index)}>
              <div className="card-blur">
                <img className="card-img" alt="" src={book.image? book.image: book.BOOK_COVER_URL} />
              </div>
              <div className="div-card-content">
                <p className="card-text">
                {truncateText(book.INFO_TEXT_BOLD, 80)}
                </p>
                <img className="line-division" alt="" src="/vector/line-filter.svg" />
                <div className="text-click">click!</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonFilter;