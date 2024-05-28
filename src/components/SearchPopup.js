import React from 'react';
import '../styles/SearchPopup.css'; // Screen 컴포넌트의 스타일을 포함합니다.

const SearchPopup = ({ onClose }) => {
  return (
    <div className="div-search-popup">
      <div className="group">
        <div className="div-search">
          <img className="line-div-search" alt="" src="/vector/line-div-search-popup.svg" />
          <img className="btn-close" alt=" " src="/images/btn-close-popup.png" onClick={onClose} />
          <img className="btn-search-popup" alt=" " src="/images/btn-search-popup.png" />
          <input className="search-input" type="text" placeholder="검색어를 입력하세요" />  
        </div>
        <div className="div-search-result">
        <div className="group-2">
          <img className="img-2" alt=" " src="image-16.png" />
          <div className="group-3">
            <div className="text-wrapper-2">마케팅 불변의 법칙</div>
            <div className="text-wrapper-3">알 리스,잭 트라우트</div>
            <div className="text-wrapper-4">비즈니스맵</div>
          </div>
        </div>

        <img className="line-div-search-book" alt="Line" src="/vector/line-search-popup.svg" />

        <div className="group-4">
          <div className="group-5">
            <div className="text-wrapper-5">불변의 법칙</div>
            <div className="text-wrapper-6">모건 하우절</div>
            <div className="text-wrapper-7">서삼독</div>
          </div>
          <img className="img-2" alt="" src="rectangle-43.png" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default SearchPopup;
