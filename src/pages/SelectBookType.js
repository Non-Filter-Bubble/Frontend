import React from "react";
import '../styles/SelectBookType.css'; 

const SelectBookType = () => {

    return (
    <div className="div-select-booktype">
      <div className="view">
        <div className="overlap-group">
          <div className="text-wrapper">다음</div>
        </div>
      </div>
      <div className="group">
          <p className="text">
            <span className="span">000 님,<br/></span>
            <span className="span">선호하는 책 분야를 <br/></span>
            <span className="span">선택하세요 </span>
          </p>
        <p className="element">
          000님의 취향을 파악하는 데 도움을 드리고자합니다.<br />
          마음에 드는 콘텐츠를 골라주세요.
        </p>
        
      </div>
      <div className="div">
        <div className="group-2">
          <div className="group-3">
            <img className="rectangle"alt="" src=""/>
            <div className="text-wrapper-2">시/에세이</div>
          </div>
          <div className="group-4">
          <img className="rectangle"alt="" src=""/>
            <div className="text-wrapper-3">자기계발</div>
          </div>
          <div className="group-5">
          <img className="rectangle"alt="" src=""/>
            <div className="text-wrapper-2">경제/경영</div>
          </div>
        </div>
        <div className="group-6">
          <div className="group-3">
          <img className="rectangle"alt="" src=""/>
            <div className="text-wrapper-4">소설</div>
          </div>
          <div className="group-4">
          <img className="rectangle"alt="" src=""/>
            <div className="text-wrapper-4">과학</div>
          </div>
          <div className="group-7">
          <img className="rectangle"alt="" src=""/>
            <div className="text-wrapper-5">인문</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBookType;
