import React from 'react';
import Slider from 'react-slick';
import '../styles/Tutorial.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Tutorial = ({ onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <Slider {...settings}>
          <div className="slide">
            <h1>BUBBLE POP은 여러분의 독서 세계를 넓혀드립니다</h1>
            <p>평소 읽지 않는 새로운 장르의 책을 발견해보세요. 호기심을 자극하는 한줄평을 클릭하면 그 숨겨진 이야기의 세계가 펼쳐집니다.</p>
          </div>
          <div className="slide">
            <h1>취향을 넓힐 시간, 이 책을 추천합니다!</h1>
            <p>여러분의 독서 취향을 한 단계 넓혀줄 특별한 추천 서비스입니다. 평소 선호하는 장르와는 다른 책들을 선입견 없이 만나볼 수 있도록 도와줍니다.</p>
            <div className="slide-image-container">
              <img src="path_to_your_image_1" alt="추천 책 1" />
              <img src="path_to_your_image_2" alt="추천 책 2" />
              <img src="path_to_your_image_3" alt="추천 책 3" />
              <img src="path_to_your_image_4" alt="추천 책 4" />
              <img src="path_to_your_image_5" alt="추천 책 5" />
            </div>
          </div>
          {[...Array(6)].map((_, index) => (
            <div className="slide" key={index}>
              <h1>슬라이드 {index + 3}</h1>
              <p>여기에 슬라이드 {index + 3} 내용이 들어갑니다.</p>
            </div>
          ))}
        </Slider>
        <div className="tutorial-controls">
          <button onClick={() => onClose(true)}>다시보지 않기</button>
          <button onClick={() => onClose(false)}>닫기</button>
        </div>
      </div>
    </div>
  );
};




/*이전 버튼*/
const PrevButton = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} prev-button`} // custom-prev 클래스 추가
        style={{ 
            ...style,
            display: 'block',
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: '100',
            width: '30px',
            height: '30px',
            backgroundImage: 'url(vector/slide-btn-left.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            cursor: 'pointer',
        }}
        onClick={onClick}
      />
    );
  };

  /*다음 버튼*/
const NextButton = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, 
          display: 'block', 
          position: 'absolute', 
          right: '10px', 
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: '100',
          width: '30px',  // 추가: 버튼 크기 설정
          height: '30px', // 추가: 버튼 크기 설정
          backgroundImage: 'url(vector/slide-btn-right.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer',
          }}
        onClick={onClick}
      />
    );
  };
  
  
export default Tutorial;
