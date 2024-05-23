import React, { useState } from 'react';
import '../styles/HeartPopup.css'; // Screen 컴포넌트의 스타일을 포함합니다.

const HeartPopup = () => {
  const [hearts, setHearts] = useState([true, true, true, true]);

  const toggleHeart = (index) => {
    const newHearts = [...hearts];
    newHearts[index] = !newHearts[index];
    setHearts(newHearts);
  };

  return (
    <div className="screen">
      <div className="group">
        <div className="div">
          <p className="text-wrapper">
            나는 메트로폴리탄 미술관의 <br />
            경비원 입니다
          </p>
          <div className="text-wrapper-2">웅진 지식 하우스</div>
          <div className="text-wrapper-3">패트릭 브링리</div>
        </div>
        <div className="image-wrapper">
          <img
            className="image"
            alt=""
            src={hearts[0] ? "images/filled-heart-small.png" : "images/empty-heart-small.png"}
            onClick={() => toggleHeart(0)}
          />
        </div>
      </div>
      <div className="group-2">
        <div className="group-3">
          <p className="text-wrapper">
            나는 메트로폴리탄 미술관의 <br />
            경비원 입니다
          </p>
          <div className="text-wrapper-2">웅진 지식 하우스</div>
          <div className="text-wrapper-3">패트릭 브링리</div>
        </div>
        <div className="img-wrapper">
          <img
            className="img"
            alt=""
            src={hearts[1] ? "images/filled-heart-small.png" : "images/empty-heart-small.png"}
            onClick={() => toggleHeart(1)}
          />
        </div>
      </div>
      <div className="group-4">
        <div className="group-3">
          <p className="text-wrapper">
            나는 메트로폴리탄 미술관의 <br />
            경비원 입니다
          </p>
          <div className="text-wrapper-2">웅진 지식 하우스</div>
          <div className="text-wrapper-3">패트릭 브링리</div>
        </div>
        <div className="group-5">
          <img
            className="img"
            alt=""
            src={hearts[2] ? "images/filled-heart-small.png" : "images/empty-heart-small.png"}
            onClick={() => toggleHeart(2)}
          />
        </div>
      </div>
      <div className="group-6">
        <div className="group-3">
          <p className="text-wrapper">
            나는 메트로폴리탄 미술관의 <br />
            경비원 입니다
          </p>
          <div className="text-wrapper-2">웅진 지식 하우스</div>
          <div className="text-wrapper-3">패트릭 브링리</div>
        </div>
        <div className="group-7">
          <img
            className="img"
            alt=""
            src={hearts[3] ? "images/filled-heart-small.png" : "images/empty-heart-small.png"}
            onClick={() => toggleHeart(3)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeartPopup;
