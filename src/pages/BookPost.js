import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookPost.css'; 
import SearchPopup from '../components/SearchPopup'; 

const BookPost = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const toggleGoodBtn = () => {
    setSelectedButton(selectedButton === 'good' ? null : 'good');
  };

  const toggleBadBtn = () => {
    setSelectedButton(selectedButton === 'bad' ? null : 'bad');
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="div-bookpost">
      <div className="div-bookpost-title">
        <div className="bookpost-title">북서랍 등록</div>
        <img className="back-book" alt="" src="/vector/back.svg" onClick={handleBack} />
      </div>
      <img className="line-bookpost" alt="" src="/vector/line-book.svg" />
      <div className="group-author">
        <div className="rect-author" />
        <p className="title-author">
          <span className="subtitle">저자</span>
          <span className="star">*</span>
        </p>
      </div>
      <div className="group-company">
        <div className="rect-company" />
        <p className="title-company">
          <span className="subtitle">출판사</span>
          <span className="star">*</span>
        </p>
      </div>
      <div className="group-bookname">
        <p className="title-bookname">
          <span className="subtitle">도서명</span>
          <span className="star">*</span>
        </p>
        <div className="rect-bookname" />
      </div>
      <div className="div-review">
        <textarea className="rect-review" type="text" placeholder="" />
        <div className="subtitle-review">독서 후기</div>
      </div>
      <div className="div-searchbook-btn">
        <div className="searchbook-btn" onClick={togglePopup}>
          <div className="searchbook">도서 검색</div>
        </div>
      </div>
      <div className="div-submit">
        <div className="subit-btn">
          <div className="submit">등록</div>
        </div>
      </div>
      <div className="div-good">
        <img 
          className="btn-good" 
          alt="" 
          src={selectedButton === 'good' ? "/images/filled-good-btn.png" : "/images/empty-good-btn.png"} 
          onClick={toggleGoodBtn} 
        />
      </div>
      <div className="div-bad">
        <img 
          className="btn-bad" 
          alt="" 
          src={selectedButton === 'bad' ? "/images/filled-bad-btn.png" : "/images/empty-bad-btn.png"} 
          onClick={toggleBadBtn} 
        />
      </div>
      <div className="div-one-line">
        <div className="one-line-notice">50자 이내</div>
        <div className="overlap-4">
          <textarea className="rect-one-line" type="text" placeholder="다른 사람에게 책을 소개해주세요" />
          <p className="title-one-line">
            <span className="subtitle">한줄평</span>
            <span className="star">*</span>
          </p>
        </div>
      </div>
      <img className="line-division" alt="" src="vector/line-book.svg" />
      {isPopupVisible && <SearchPopup onClose={togglePopup} />}
    </div>
  );
};

export default BookPost;
