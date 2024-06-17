import React, { useState, useEffect, useRef } from 'react';
import Slide01 from './Slide01';
import Slide02 from './Slide02';
import "../styles/Slide.css";


const Slide = ({ scrollToNonFilter }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null); // interval을 관리할 ref

  // 자동 슬라이드 전환 설정
  useEffect(() => {
    startSlideTimer();
    return () => clearInterval(intervalRef.current); // Cleanup
  }, []);

  const startSlideTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // 기존 타이머 클리어
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % 2); // 다음 슬라이드로 이동
    }, 7000); // 7초 간격
  };


  const goToNextSlide = () => {
    setCurrentSlide(1);
    startSlideTimer(); // 타이머 다시 시작
  };

  const goToPrevSlide = () => {
    setCurrentSlide(0);
    startSlideTimer(); // 타이머 다시 시작
  };



  // 슬라이드 인덱스에 따라 transform 값을 조정
  const slideStyle = {
    transform: `translateX(-${currentSlide * 50}%)`
  };

  return (
    <div className="slideshow">
      <div className="slide-container" style={slideStyle}>
        <div className="slide"><Slide01 scrollToNonFilter={scrollToNonFilter} /></div>
        <div className="slide"><Slide02 /></div>
        
      </div>
      <img className="btn-left" alt="Previous" src="vector/slide-btn-left.svg" onClick={goToPrevSlide} />
      <img className="btn-right" alt="Next" src="vector/slide-btn-right.svg" onClick={goToNextSlide} />
    </div>
  );
};

export default Slide;
