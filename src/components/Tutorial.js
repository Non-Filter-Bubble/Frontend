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
     {/*슬라이드*/}
        <Slider {...settings}>
          {/*슬라이드-1*/}
          <div className="slide-1">
            <p className="ment-big">BUBBLE POP은 <br />
                                    여러분의 독서 세계를 넓혀드립니다</p>
            <p className="ment-small">평소 읽지 않는 새로운 장르의 책을 발견해보세요. <br />
                                      호기심을 자극하는 한줄평을 클릭하면 그 숨겨진 이야기의 세계가 펼쳐집니다.</p>
          </div>

          {/*슬라이드-2*/}
          <div className="slide-2">
            <p className="ment-big">취향을 넓힐 시간, 이 책을 추천합니다!</p>
            <p className="ment-small">여러분의 독서 취향을 한 단계 넓혀줄 특별한 추천 서비스입니다. <br />
                                      평소 선호하는 장르와는 다른 책들을 선입견 없이 만나볼 수 있도록 도와줍니다.</p>
            <img className="nonfilter-img" alt ="" src="/images/tutorial-nonfilter.png"/>
          </div>

          {/*슬라이드-3*/}
          <div className="slide-3">
            <p className="ment-big">이 책과 함께라면, 독서가 더욱 즐거워질 거예요!</p>
            <p className="ment-small">마음을 사로잡을 책을 준비했습니다! 다른 독자들의 한줄평을 통해 이 책의 매력을 미리 엿보세요. <br/>
            이야기의 깊이와 감동이 여러분을 기다립니다. 여러분의 새로운 독서 여정을 시작해보실래요?</p>
            <img className="filter-img" alt ="" src="/images/tutorial-filter.png"/>
          </div>

          {/*슬라이드-4*/}
          <div className="slide-4">
            
          </div>

          {/*슬라이드-5*/}
          <div className="slide-5">
            
          </div>

          {/*슬라이드-6*/}
          <div className="slide-6">
            
          </div>

          {/*슬라이드-7*/}
          <div className="slide-7">
            
          </div>


          {/*슬라이드-8*/}
          <div className="slide-8">
            
          </div>
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
        className={`${className} prev-button`} // prev-button 클래스 추가
        style={{ 
            ...style,
            display: 'block',
            position: 'absolute',
            left: '20px',
            top: '55%',
            transform: 'translateY(-50%)',
            zIndex: '100',
            width: '20px',
            height: '50px',
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
        className={`${className} next-button`} // next-button 클래스 추가
        style={{ 
          ...style, 
          display: 'block', 
          position: 'absolute', 
          right: '20px', 
          top: '55%',
          transform: 'translateY(-50%)',
          zIndex: '100',
          width: '20px',  
          height: '50px', 
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