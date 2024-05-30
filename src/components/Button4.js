import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Button4.css";


const Button4 = () => {
  const navigate = useNavigate();

  const searchBookClick = () => {
    console.log('도서 검색 버튼 클릭');
    navigate("/search");
  }

  const bookDrawerClick = () => {
    console.log('북서랍 클릭');
    navigate("/user");
  }

  const heartClick = () => {
    console.log('찜 목록 클릭');
    navigate("/user?popup=true");
  }

  const mypageClick = () => {
    console.log('마이페이지 버튼 클릭');
    navigate("/user");
  }

    return (
        <div className="button4">
          <div className="button-div">
            <div className="search-button-div" onClick={searchBookClick}>
              <div className="btn-border"></div>
              <div className="search-inner">
                <div className="btn-name1">도서 검색</div>
                <img className="icon" alt="" src="images/search-icon.png" />
              </div>
            </div>
            <div className="drawer-div" onClick={bookDrawerClick}>
              <div className="btn-border"></div>
              <div className="inner">
                <div className="group">
                  <div className="btn-name1">북서랍</div>
                  <img className="icon" alt="" src="images/drawer-icon.png" />
                </div>
              </div>
            </div>
            <div className="heart-div" onClick={heartClick}>
              <div className="btn-border"></div>
              <div className="inner">
                <div className="wrapper">
                  <div className="btn-name1">찜목록</div>
                </div>
                <img className="icon" alt="" src="images/heart.png" />
              </div>
            </div>
            <div className="mypage-div" onClick={mypageClick}>
              <div className="btn-border"></div>
              <div className="group-container">
                <div className="container">
                  <div className="btn-name2">마이페이지</div>
                </div>
                <img className="icon" alt="" src="images/person.png" />
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Button4