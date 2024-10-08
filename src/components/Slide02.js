import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Slide02.css";

const Slide02 = () => {
  const navigate = useNavigate();

  const detailClick = () => {
    console.log('detail clicked');
    navigate('/user'); // Mypage로 이동
  };

  return (
    <div className="slide-02">

      <div className="slide02-ment1">
        북서랍을 채워나가며 책을 기록해보세요
      </div>
      <div className="slide02-ment2">
        <p className="ment">북서랍은 여러분의 독서 경험을 이미지로 기록해 줍니다.</p>
        <p className="ment">다양한 장르별 북서랍을 채워가며 도서 편식을 줄이고, 책 읽는 즐거움을 더 넓게 확장해보세요.</p>
        <p className="ment">각기 다른 이야기들로 채워진 서랍은 여러분의 독서 세계를 다채롭게 만들어줄 것입니다.</p>
      </div>
      <div className="btn-detail" onClick={detailClick}>
        <div className="detail-box"></div>
        <div className="detail">자세히 보기</div>
      </div>
      <div className="page-number">
        <span className="number-left">2</span>
        <span> / </span>
        <span className="number-right">2</span>
      </div>
    </div>
  );
};

export default Slide02;
