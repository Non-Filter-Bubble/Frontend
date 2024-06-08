import React from 'react';
import '../styles/Filter.css'; // CSS 파일 경로는 상황에 맞게 조정하세요

const Filter = ( {filterrecommend} ) => {
  // console.log("메인에서 넘어온 값입니다. 필터");
  // console.log(filterrecommend);



  const handleFilterLeftClick = () => {
    // 여기에 클릭 시 실행할 코드
    console.log('Filter Left Container clicked');
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
          <img className="filter-back-icon" alt="" src="Filter_back.svg" />
          <img className="filter-back-icon" alt="" src="images/filter-blur.svg" />
          <div className="filter-book-wrapper">
            <img className="filter-book-icon" alt="" src="Filter_book.png" />
          </div>
        </div>
        <img className="btn-reset-icon" alt="" src="images/btn-reset.png" />
      </div>
    </div>
  );
};

export default Filter;
