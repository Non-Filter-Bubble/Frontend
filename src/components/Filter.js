import React, { useCallback, useEffect, useState } from 'react';
import '../styles/Filter.css'; // CSS 파일 경로는 상황에 맞게 조정하세요
import axiosInstance from '../api/axios';

const Filter = ( {filterrecommend} ) => {
  const token = localStorage.getItem('token');

  const [bookcomment, setBookcomment] = useState();
  const [bookcover, setBookcover] = useState();

  const getBookComment = useCallback(async (isbn) => {
    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/comment`, {
        params: {
          isbn: isbn
        }, 
        headers: { 'authorization': `${token}` }
      });
      // console.log('response의 값은', response.data);

      setBookcomment(response.data);
    } catch (error) {
      // console.error(`ISBN ${isbn}에 대한 요청 실패:`, error);
      setBookcomment();
    }
  }, [token]);

  // 랜덤으로 책 정보 추출
  const getRandom = useCallback((list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    // console.log('랜덤으로 추출된 인덱스:', randomIndex);
    // console.log('랜덤으로 추출된 책의 ISBN:', list[randomIndex]);
    setBookcover(`https://contents.kyobobook.co.kr/sih/fit-in/230x0/pdt/${list[randomIndex]}.jpg`);
    getBookComment(list[randomIndex]);
    // getBookComment(9791190174756);
  }, [getBookComment]);

  // 랜덤으로 추출된 책 정보를 저장
  useEffect(() => {
    if (filterrecommend && filterrecommend.length > 0) {
      getRandom(filterrecommend);
    }
  }, [filterrecommend, getRandom]);

  // console.log('랜덤으로 추출된 책의 코멘트:', bookcomment);


  const handleFilterLeftClick = () => {
    if (filterrecommend && filterrecommend.length > 0) {
      getRandom(filterrecommend);
    }
  };  

  // 한줄평이 3개가 아닐 수 있잖아 그걸 해결해야 함
  // 3개 이상인 경우 어떤 한줄평을 가지고올건지
  // 3개 미만인 경우 보여지는 걸 1개, 2개만 보여줄 건지? 아님 3개로 보여주고 빈 칸은 없다고 할건지
  const renderComments = () => {
    return [0, 1, 2].map((index) => (
      <div key={index} className={`oneline-${index + 1}`}>
        <div className="oneline-3-back"></div>
        <div className="oneline-31">
          <div className="div2">
            <p className="filter-ment3">{bookcomment ? bookcomment[index] : "아직 다른 사용자가 한줄 평을 작성하지 않았어요!"}</p>
          </div>
        </div>
      </div>
    ));
  };


  return (
    <div className="filter">
      <div className="filter-ment1">이 책과 함께라면, 독서가 더욱 즐거워질 거예요!</div>
      <div className="filter-ment2">
        <p className="filter-ment3">마음을 사로잡을 책을 준비했습니다! 다른 독자들의 한줄평을 통해 이 책의 매력을 미리 엿보세요.</p>
        <p className="filter-ment3">이야기의 깊이와 감동이 여러분을 기다립니다. 여러분의 새로운 독서 여정을 시작해보실래요?</p>
      </div>
      <img className="filter-background" alt="" src="vector/filter-background.svg" />

      <div className="filter-right">
        {renderComments()}
        {/* <div className="oneline-1">
          <div className="oneline-3-back"></div>
          <div className="oneline-31">
            <div className="div2">
              <p className="filter-ment3">{bookcomment ? bookcomment["0"] : "로딩 중..."}</p>
            </div>
          </div>
        </div>
        <div className="oneline-2">
          <div className="oneline-3-back"></div>
          <div className="oneline-31">
            <div className="div2">
              <p className="filter-ment3">{bookcomment ? bookcomment["1"] : "로딩 중..."}</p>
            </div>
          </div>
        </div>
        <div className="oneline-3">
          <div className="oneline-3-back"></div>
          <div className="oneline-31">
            <div className="div2">
              <p className="filter-ment3">{bookcomment ? bookcomment["2"] : "로딩 중..."}</p>
            </div>
          </div>
        </div> */}
      </div>

      
      <div className="filterleft" id="filterLeftContainer" >
        <div className="filter-left">
          {/* <img className="filter-back-icon" alt="" src="Filter_back.svg" />
          <img className="filter-back-icon" alt="" src="images/filter-blur.svg" /> */}
          <div className="filter-book-wrapper">
            {bookcover && <img className="filter-book-icon" alt="" src={bookcover} />}
          </div>
        </div>
        {/* 다시 버튼을 불렀을 때 */}
        <img className="btn-reset-icon" alt="" src="images/btn-reset.png" onClick={handleFilterLeftClick} />
      </div>
    </div>
  );
};

export default Filter;
