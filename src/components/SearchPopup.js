import React from 'react';
import '../styles/SearchPopup.css'; // Screen 컴포넌트의 스타일을 포함합니다.

const SearchPopup = () => {
  

    return (
        <div className="screen">
          <div className="group">
            <div className="overlap-group">
              <img className="line" alt="Line" src="line-25.svg" />
              <img className="rectangle" alt="Rectangle" src="rectangle-71.png" />
              <img className="image" alt="Image" src="image-15.png" />
              <img className="img" alt="Line" src="line-26.svg" />
              <div className="text-wrapper">불변</div>
              <div className="div">
                <img className="img-2" alt="Image" src="image-16.png" />
                <div className="group-2">
                  <div className="text-wrapper-2">마케팅 불변의 법칙</div>
                  <div className="text-wrapper-3">알 리스,잭 트라우트</div>
                  <div className="text-wrapper-4">비즈니스맵</div>
                </div>
              </div>
              <div className="group-3">
                <div className="group-4">
                  <div className="text-wrapper-5">불변의 법칙</div>
                  <div className="text-wrapper-6">모건 하우절</div>
                  <div className="text-wrapper-7">서삼독</div>
                </div>
                <img className="img-2" alt="Rectangle" src="rectangle-43.png" />
              </div>
            </div>
          </div>
        </div>
      );
    };

export default SearchPopup;
