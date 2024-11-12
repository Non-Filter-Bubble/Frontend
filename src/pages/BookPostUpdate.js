import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/BookPost.css'; 

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../../bookImage.jpg';

const BookPostUpdate = () => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const location = useLocation();
  const bookinfoshow = location.state?.bookinfoshow || {};

  const [comment, setComment] = useState(bookinfoshow.comment);
    const [review, setReview] = useState(bookinfoshow.review);
  
  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // console.log('선택한 책의 결과:', bookinfo);

  // 수정 버튼 누름
  const handleUpdate = async () => {
    if (!comment || !review) {
      alert('빈칸 없이 채워주세요.');
      return;
    }

    try {
      const response = await axiosInstance.put(`${process.env.REACT_APP_DB_HOST}/user/bookbox/${bookinfoshow.mybookid}`, {
        comment: comment,
        review: review
      }, {
        headers: {
          'authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('책포스트 정보 업데이트 성공:', response);
      navigate('/user');
    } catch (error) {
      console.error('책포스트 정보 업데이트 실패:', error);
    }
  };


  return (
    <div className="div-bookpost">

      <div className="div-bookpost-title">
        <img className="back-book" alt="" src="/vector/back.svg" onClick={handleBack} />
        <div className="bookpost-title">북서랍 수정</div>
      </div>
      
      
      {/* 책 커버 이미지 */}
      <img className="book-cover" alt="" src={bookinfoshow.imageUrl || DEFAULT_IMAGE_URL} />
          
      <div className="book-info-container">
      {/* 도서명 */}
      <div className="group-bookname">
        <p className="title-bookname">
          <span className="subtitle">도서명</span>
          <span className="star">*</span>
        </p>
        <div className="rect-bookname">{bookinfoshow.title}</div>
      </div>

      {/* 저자 */}
      <div className="group-author">
        <p className="title-author">
          <span className="subtitle">저자</span>
          <span className="star">*</span>
        </p>
        <div className="rect-author">{bookinfoshow.author}</div>
      </div>
      
      {/* 출판사 */}
      <div className="group-company">
        <p className="title-company">
          <span className="subtitle">출판사</span>
          <span className="star">*</span>
        </p>
        <div className="rect-company">{bookinfoshow.publisher}</div>
      </div>

      {/* 한줄평 */}
      <div className="div-one-line">
          <p className="title-one-line">
            <span className="subtitle">한줄평</span>
            <span className="star">*</span>
          </p>
        <div className="one-line-notice">50자 이내</div>
        <div className="overlap-4">
          <textarea className="rect-one-line" type="text" 
          placeholder="다른 사람에게 책을 소개해주세요" 
          value={comment} onChange={(e) => setComment(e.target.value)} required/>
        </div>
      </div>      

      {/* 독서 후기 */}
      <div className="div-review">
        <textarea className="rect-review" type="text" placeholder="" value={review} onChange={(e) => setReview(e.target.value)}/>
        <div className="subtitle-review">독서 후기</div>
      </div>

      <div className="div-good">
        <img className="btn-good" alt="" src={bookinfoshow.evaluation === true ? "/images/filled-good-btn.png" : "/images/empty-good-btn.png"} />
      </div>
      <div className="div-bad">
        <img className="btn-bad" alt="" src={bookinfoshow.evaluation === false ? "/images/filled-bad-btn.png" : "/images/empty-bad-btn.png"} /> 
      </div>

      <div className="div-submit">
        <div className="subit-btn" onClick={handleUpdate}>
          <div className="submit">수정</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookPostUpdate;
