import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NonFilter.css";


const NonFilter = () => {
    const navigate = useNavigate(); // 네비게이션 함수를 사용할 준비

    // 이벤트 핸들러: 카드 ID를 받아 해당 도서 검색 결과 페이지로 이동
    const handleCardClick = (cardId) => {
      // 예: /book-detail/{cardId} 경로로 이동
      navigate(`/book-detail/${cardId}`);
    };
  
    return (
      <div className="nonfilter">
        {[1, 2, 3, 4, 5].map(cardId => (
          <div key={cardId} className={`card card-${cardId}`} onClick={() => handleCardClick(cardId)}>
            <div className="card-image">
              <img className="card-img" alt={`Cover for book ${cardId}`} src={`book_cover_${cardId}.png`} />
            </div>
            <div className="card-content">
              <p className="card-title">Book Title {cardId}</p>
              <p className="card-description">Description for book {cardId}</p>
            </div>
          </div>
        ))}
        <div className="footer">
          <p>취향을 넓힐 시간, 이 책을 추천합니다!</p>
          <p>선입견 없는 한줄평이 새로운 취향을 탐험하게 해줍니다. 미지의 책 속 숨은 메시지를 발견해보세요.</p>
        </div>
      </div>
    );
  };


export default NonFilter;