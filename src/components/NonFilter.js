import React from 'react';

import "../styles/NonFilter.css";


const NonFilter = () => {
    
    
  return (
    <div className="non-filter">
    <div className="div-nonfilter">
      <p className="ment-1">취향을 넓힐 시간, 이 책을 추천합니다!</p>
      <p className="ment-2">
        선입견 없는 한줄평이 새로운 취향을 탐험하게 해줍니다. 미지의 책 속 숨은 메시지를 발견해보세요
      </p>
      <img className="btn-reset" alt="" src="images/btn-reset.png" />

      <div className="div-card">
        {/*카드 - 1 */}
        <div className="card-1">
          <div className="card-blur">
            <img className="card-img" alt="" src="rectangle-28-4.svg" />
          </div>
            <div className="div-card-content">
                <p className="card-text">
                  도전과 모험,
                  <br />
                  새로운 시작을 하는 <br />
                  사람은 누구나 추락을 <br />
                  경험할 수 있다
                </p>
                <img className="line-division" alt="" src="/vector/line-filter.svg" />
              <div className="text-click">click!</div>
            </div>
            
        </div>
        {/*카드 -2 */}
        <div className="card-2">
          <div className="card-blur">
            <img className="card-img" alt="" src="rectangle-28-4.svg" />
          </div>
            <div className="div-card-content">
                <p className="card-text">
                  훌쩍 떠나온 것 나는
                  <br />
                  얼마나 기쁜 모른다!
                  <br />
                  친구여, 인간의
                  <br />
                  마음이란 대체
                  <br />
                  어떤 것일까!
                </p>
                <img className="line-division" alt="" src="/vector/line-filter.svg" />
              <div className="text-click">click!</div>
            </div>
        </div>

        {/* 카드-3 */}
        <div className="card-3">
          <div className="card-blur">
            <img className="card-img" alt="" src="rectangle-28-4.svg" />
          </div>
            <div className="div-card-content">
                <p className="card-text">
                  역사는 우리를 <br />
                  저버렸지만, <br />
                  그래도 상관없다.
                </p>
                <img className="line-division" alt="" src="/vector/line-filter.svg" />
              <div className="text-click">click!</div>
            </div>
        </div>

        {/* 카드-4 */}
        <div className="card-4">
          <div className="card-blur">
            <img className="card-img" alt="" src="rectangle-28-4.svg" />
          </div>
            <div className="div-card-content">
                <p className="card-text">
                  훌쩍 떠나온 것 나는
                  <br />
                  얼마나 기쁜 모른다!
                  <br /> <br />
                  마음이란 대체
                  <br />
                  어떤 것일까!
                </p>
              <img className="line-division" alt="" src="/vector/line-filter.svg" />
              <div className="text-click">click!</div>
            </div>
        </div>
        {/* 카드-5 */}
        <div className="card-5">
          <div className="card-blur">
            <img className="card-img" alt="" src="rectangle-28-4.svg" />
          </div>
           
            <div className="div-card-content">
                <p className="card-text">
                  훌쩍 떠나온 것 나는
                  <br />
                  얼마나 기쁜 모른다!
                  <br /> <br />
                  마음이란 대체
                  <br />
                  어떤 것일까!
                </p>
              <img className="line-division" alt="" src="/vector/line-filter.svg" />
              <div className="text-click">click!</div>
            </div>
        </div>
        
      </div>
      </div>
    </div>
  );
};
  
  export default NonFilter;