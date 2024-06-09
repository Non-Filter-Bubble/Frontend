import React, { useCallback, useEffect, useState } from 'react';
import '../styles/Filter.css'; // CSS 파일 경로는 상황에 맞게 조정하세요
import axiosInstance from '../api/axios';

const Filter = ( {filterrecommend} ) => {
  console.log("메인에서 넘어온 값입니다. 필터");
  console.log(filterrecommend);

  // const [randomIsbn, setRandomIsbn] = useState();
  const [bookinfo, setBookinfo] = useState();

  const getBookInfo = async (isbn) => {
    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
        params: {
          isbn: isbn
        }
      });
      console.log('response의 값은', response.data);
      setBookinfo(response.data);
    } catch (error) {
      // 근데 이건 AI에서 보내주는거라서 요청 실패하면 안되는거임
      console.error(`ISBN ${isbn}에 대한 요청 실패:`, error);
    }
  }

  // 랜덤으로 책 정보 추출
  const getRandom = useCallback((list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    console.log('랜덤으로 추출된 인덱스:', randomIndex);
    console.log('랜덤으로 추출된 책의 ISBN:', list[randomIndex]);
    // setRandomIsbn(list[randomIndex]);
    getBookInfo(list[randomIndex]);
    // return list[randomIndex];
  }, []);

  // 랜덤으로 추출된 책 정보를 저장
  useEffect(() => {
    if (filterrecommend && filterrecommend.length > 0) {
      getRandom(filterrecommend);
    }
  }, [filterrecommend, getRandom]);

  console.log('랜덤으로 추출된 책 정보:', bookinfo);

//   setRandomIsbn(getRandom(filterrecommend));

// useEffect(() => {
//   console.log('useEffecdt에서 실행된 값입니다.')
//   if (filterrecommend && filterrecommend.length > 0) {
//     // setRandomIsbn(getRandomIsbn(filterrecommend));
//     getRandom(filterrecommend)
//   }
//   console.log('randomIsbn의 값이 변경되었습니다.',randomIsbn);
// }, []);


const handleFilterLeftClick = () => {
  if (filterrecommend && filterrecommend.length > 0) {
    getRandom(filterrecommend);
  }
//   if (filterrecommend && filterrecommend.length > 0) {
//     setRandomIsbn(getRandom(filterrecommend));
//   }  
};  



// useEffect(() => {
//   if (randomIsbn) {
//     getBookInfo();
//   }
// }, [randomIsbn]);



  return (
    <div className="filter">
      <div className="filter-ment1">이 책과 함께라면, 독서가 더욱 즐거워질 거예요!</div>
      <div className="filter-ment2">
        <p className="filter-ment3">마음을 사로잡을 책을 준비했습니다! 다른 독자들의 한줄평을 통해 이 책의 매력을 미리 엿보세요.</p>
        <p className="filter-ment3">이야기의 깊이와 감동이 여러분을 기다립니다. 여러분의 새로운 독서 여정을 시작해보실래요?</p>
      </div>
      <img className="filter-background" alt="" src="vector/filter-background.svg" />

      <div className="filter-right">
        <div className="oneline-1">
          <div className="oneline-3-back"></div>
          <div className="oneline-31">
            <div className="div2">
              <p className="filter-ment3">도전과 모험, 새로운 시작을 하는 </p>
              <p className="filter-ment3">사람은 누구나 추락을 경험할 수 있다.</p>
            </div>
          </div>
        </div>
        <div className="oneline-2">
          <div className="oneline-3-back"></div>
          <div className="oneline-31">
            <div className="div2">
              <p className="filter-ment3">도전과 모험, 새로운 시작을 하는 </p>
              <p className="filter-ment3">사람은 누구나 추락을 경험할 수 있다.</p>
            </div>
          </div>
        </div>
        <div className="oneline-3">
          <div className="oneline-3-back"></div>
          <div className="oneline-31">
            <div className="div2">
              <p className="filter-ment3">도전과 모험, 새로운 시작을 하는 </p>
              <p className="filter-ment3">사람은 누구나 추락을 경험할 수 있다.</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="filterleft" id="filterLeftContainer" onClick={handleFilterLeftClick}>
        <div className="filter-left">
          {/* <img className="filter-back-icon" alt="" src="Filter_back.svg" />
          <img className="filter-back-icon" alt="" src="images/filter-blur.svg" /> */}
          <div className="filter-book-wrapper">
            {bookinfo && <img className="filter-book-icon" alt="" src={bookinfo.BOOK_COVER_URL} />}
          </div>
        </div>
        {/* 다시 버튼을 불렀을 때 */}
        <img className="btn-reset-icon" alt="" src="images/btn-reset.png" />
      </div>
    </div>
  );
};

export default Filter;
