import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/BookPost.css'; 
import SearchPopup from '../components/SearchPopup'; 

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../../bookImage.jpg';

const BookPost = () => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [comment, setComment] = useState('');
  const [review, setReview] = useState('');
  const [bookinfo, setBookinfo] = useState({});
  
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

  // console.log('선택한 책의 결과:', bookinfo);

  const handlePost = async (e) => {
    e.preventDefault();
    console.log('북포스트 등록 버튼 누름');

    // 필수로 입력해야하는 것들 체크
    if (!comment) {
      alert('한줄평을 입력해주세요.');
      return;
    }
    if (!selectedButton) {
      alert('평가를 선택해주세요.');
      return;
    }

    await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/bookboxid`, {
      headers: {
        'authorization': `${token}`
      }
    }).then( async (res) => {
      console.log('북박스 아이디를 가져오는데 성공했습니다.', res);

      const matchingBookbox = res.data.find(item => item.genre === bookinfo.GENRE_LV1);
      console.log(matchingBookbox);

      try {
        const response = await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/user/bookbox/mybook/post`, {
          bookboxid: matchingBookbox.bookboxid,
          isbn: bookinfo.EA_ISBN,
          comment: comment,
          review: review,
          evaluation: selectedButton === 'good' ? 1 : selectedButton === 'bad' ? 0 : -1,
          title: bookinfo.TITLE,
          author: bookinfo.AUTHOR,
          publisher: bookinfo.PUBLISHER,
        }, {
          headers: {
              'authorization': `${token}`,
              'Content-Type': 'application/json'
          }
      });
        console.log('북포스트가 성공적으로 등록되었습니다.', response);

        // 등록 후 마이 페이지로 이동
        navigate('/user');
        
      } catch (error) {
        console.error('북포스트 등록에 실패했습니다.', error);
        
      }
    }).catch((error) => {
      console.error('북박스 아이디를 가져오는데 실패했습니다.', error);
    }
    )
    
  };

  return (
    <div className="div-bookpost">

      <div className="div-bookpost-title">
        <div className="bookpost-title">북서랍 등록</div>
        <img className="back-book" alt="" src="/vector/back.svg" onClick={handleBack} />
      </div>

      <img className="line-bookpost" alt="" src="/vector/line-book.svg" />
      
      
      {/* 책 커버 이미지 */}
      <img className="book-cover" alt="" src={bookinfo.BOOK_COVER_URL || DEFAULT_IMAGE_URL} />
          
      <div className="book-info-container">
      {/* 도서명 */}
      <div className="group-bookname">
        <p className="title-bookname">
          <span className="subtitle">도서명</span>
          <span className="star">*</span>
        </p>
        <div className="rect-bookname">{bookinfo.TITLE}</div>
      </div>

      {/* 도서 검색 버튼 */}
      <div className="div-searchbook-btn">
        <div className="searchbook-btn" onClick={togglePopup}>
          <div className="searchbook">도서 검색</div>
        </div>
      </div>

      {/* 저자 */}
      <div className="group-author">
        <div className="rect-author">{bookinfo.AUTHOR}</div>
        <p className="title-author">
          <span className="subtitle">저자</span>
          <span className="star">*</span>
        </p>
      </div>
      
      {/* 출판사 */}
      <div className="group-company">
        <div className="rect-company">{bookinfo.PUBLISHER}</div>
        <p className="title-company">
          <span className="subtitle">출판사</span>
          <span className="star">*</span>
        </p>
      </div>

      {/* 한줄평 */}
      <div className="div-one-line">
        <div className="one-line-notice">50자 이내</div>
        <div className="overlap-4">
          <textarea className="rect-one-line" type="text" 
          placeholder="다른 사람에게 책을 소개해주세요" 
          maxLength="50" value={comment} onChange={(e) => setComment(e.target.value)} required/>
          <p className="title-one-line">
            <span className="subtitle">한줄평</span>
            <span className="star">*</span>
          </p>
        </div>
      </div>      

      {/* 독서 후기 */}
      <div className="div-review">
        <textarea className="rect-review" type="text" placeholder="" value={review} onChange={(e) => setReview(e.target.value)}/>
        <div className="subtitle-review">독서 후기</div>
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

      <div className="div-submit">
        <div className="subit-btn" onClick={handlePost}>
          <div className="submit">등록</div>
        </div>
      </div>

      {isPopupVisible && <SearchPopup onClose={togglePopup} bookinfo={bookinfo} setBookinfo={setBookinfo}/>}
    </div>
    </div>
  );
};

export default BookPost;
