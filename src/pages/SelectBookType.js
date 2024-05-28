import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/SelectBookType.css'; 

const SelectBookType = () => {
  const navigate = useNavigate();  

  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggleTypeSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prevSelected) =>
        prevSelected.filter((t) => t !== type)
      );
    } else if (selectedTypes.length < 2) {
      setSelectedTypes((prevSelected) => [...prevSelected, type]);
    }
  };

  const handleNextClick = () => {
    console.log("Next button clicked");
    console.log('선택한 분야는', selectedTypes)

    if (selectedTypes.length !== 2) {
      alert("2개의 분야를 선택해주세요.");
    } else {
      // 다음 페이지로 이동
      navigate('/join/genre', { state: { booktype: selectedTypes } });
    }
  };

  return (
    <div className="div-select-booktype">
      <div className="group-title">
        <p className="text-1">
          <span className="span">000 님,<br /></span>
          <span className="span">선호하는 책 분야를 <br /></span>
          <span className="span">2개 선택하세요 </span>
        </p>
        <p className="text-2">
          000님의 취향을 파악하는 데 도움을 드리고자합니다.<br />
          마음에 드는 콘텐츠를 골라주세요.
        </p>
      </div>
      <div className="div-select">
        <div className="group-line-1">
          <div className="group-3">
            <img
              className={`rectangle ${selectedTypes.includes("소설") ? "selected" : ""}`}
              alt=""
              src="/path/to/rectangle-image.png"
              onClick={() => toggleTypeSelection("소설")}
            />
            <div className="text-wrapper-4">소설</div>
          </div>
          <div className="group-4">
            <img
              className={`rectangle ${selectedTypes.includes("과학") ? "selected" : ""}`}
              alt=""
              src="/path/to/rectangle-image.png"
              onClick={() => toggleTypeSelection("과학")}
            />
            <div className="text-wrapper-4">과학</div>
          </div>
          <div className="group-7">
            <img
              className={`rectangle ${selectedTypes.includes("인문") ? "selected" : ""}`}
              alt=""
              src="/path/to/rectangle-image.png"
              onClick={() => toggleTypeSelection("인문")}
            />
            <div className="text-wrapper-5">인문</div>
          </div>
        </div>
        <div className="group-2">
          <div className="group-3">
            <img
              className={`rectangle ${selectedTypes.includes("시/에세이") ? "selected" : ""}`}
              alt=""
              src="/path/to/rectangle-image.png"
              onClick={() => toggleTypeSelection("시/에세이")}
            />
            <div className="text-wrapper-2">시/에세이</div>
          </div>
          <div className="group-4">
            <img
              className={`rectangle ${selectedTypes.includes("자기계발") ? "selected" : ""}`}
              alt=""
              src="/path/to/rectangle-image.png"
              onClick={() => toggleTypeSelection("자기계발")}
            />
            <div className="text-wrapper-3">자기계발</div>
          </div>
          <div className="group-5">
            <img
              className={`rectangle ${selectedTypes.includes("경제/경영") ? "selected" : ""}`}
              alt=""
              src="/path/to/rectangle-image.png"
              onClick={() => toggleTypeSelection("경제/경영")}
            />
            <div className="text-wrapper-2">경제/경영</div>
          </div>
        </div>
      </div>
      <div className="div-btn-next">
        <div className="btn-next" onClick={handleNextClick}>
          <div className="next">다음</div>
        </div>
      </div>
    </div>
  );
};

export default SelectBookType;