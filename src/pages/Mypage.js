import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Mypage.css'; // Screen 컴포넌트의 스타일을 포함합니다.

import HeartPopup from '../components/HeartPopup'; // Popup 컴포넌트 추가

const Mypage = () => {
  
  const [isPopupVisible, setPopupVisible] = useState(false);

  const navigate = useNavigate();

  const editInfoClick = () => {
    navigate('/verify-password'); 
  };

  const btnPlusClick = () => {
    navigate('/user/bookbox/mybook/post'); 
  };


  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };



    return (
        <div className="div-my">
          <div className="div-book-drawer">
            <div className="group">
              <div className="div">
                <div className="group-right">
                  <div className="group-science">
                    <img className="line" alt="" src="vector/line-my.svg" />
                    <div className="overlap-group">
                      <div className="group-4">
                        <img className="book-1" alt="Xl" src="XL-10.png" />
                        <img className="book-2" alt="Xl" src="XL-11.png" />
                        <img className="book-3" alt="Xl" src="XL-12.png" />
                      </div>
                      <img class="btn-right-1" alt="" src="images/btn-right-my.png" />
                      <img class="btn-left-1" alt="" src="images/btn-left-my.png" />
                    </div>
                  </div>
                  <div className="group-poem">
                    <img className="line-2" alt="Line" src="vector/line-my.svg" />
                    <div className="overlap-2">
                      <div className="group-7">
                        <img className="book-1" alt="Xl" src="image.png" />
                        <img className="book-2" alt="Xl" src="XL-11-2.png" />
                        <img className="book-3" alt="Xl" src="XL-12-2.png" />
                      </div>
                        <img class="btn-right-2" alt="" src="images/btn-right-my.png" />
                        <img class="btn-left-2" alt="" src="images/btn-left-my.png" />
                    </div>
                  </div>
                  <div className="group-economy">
                    <img className="line-3" alt="Line" src="vector/line-my.svg" />
                    <div className="overlap-3">
                      <div className="group-4">
                        <img className="book-1" alt="Xl" src="XL-10-2.png" />
                        <img className="book-2" alt="Xl" src="XL-11-3.png" />
                        <img className="book-3" alt="Xl" src="XL-12-3.png" />
                      </div>
                        <img class="btn-right-3" alt="" src="images/btn-right-my.png" />
                        <img class="btn-left-3" alt="" src="images/btn-left-my.png" />
                    </div>
                  </div>
                </div>
                <div className="group-left">
                  <div className="group-novel">
                    <img className="line" alt="Line" src="vector/line-my.svg" />
                    <div className="overlap-group-2">
                      <div className="group-11">
                        <img className="book-1" alt="Xl" src="XL-4.png" />
                        <img className="book-2" alt="Xl" src="XL-5.png" />
                        <img className="book-3" alt="Xl" src="XL-6.png" />
                      </div>
                        <img class="btn-right-4" alt="" src="images/btn-right-my.png" />
                        <img class="btn-left-4" alt="" src="images/btn-left-my.png" />
                    </div>
                  </div>
                  <div className="group-self">
                    <img className="line-3" alt="Line" src="vector/line-my.svg" />
                    <div className="overlap-group-2">
                      <div className="group-7">
                        <img className="book-1" alt="Xl" src="XL-13.png" />
                        <img className="book-2" alt="Xl" src="XL-14.png" />
                        <img className="book-3" alt="Xl" src="XL-15.png" />
                      </div>
                      <img class="btn-right-4" alt=" " src="images/btn-right-my.png" />
                      <img class="btn-left-4" alt=" " src="images/btn-left-my.png" />
                    </div>
                  </div>
                  <div className="group-liberal">
                    <img className="line-2" alt="Line" src="vector/line-my.svg" />
                    <div className="overlap-4">
                      <div className="group-7">
                        <img className="book-1" alt="Xl" src="XL-10-3.png" />
                        <img className="book-2" alt="Xl" src="XL-11-4.png" />
                        <img className="book-3" alt="Xl" src="XL-12-4.png" />
                      </div>
                      <img class="btn-right-5" alt=" " src="images/btn-right-my.png" />
                      <img class="btn-left-3" alt=" " src="images/btn-left-my.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group-16">
              <div className="book-drawer">북서랍</div>
              <div className="genre1">소설</div>
              <div className="genre2">인문</div>
              <div className="genre3">자기계발</div>
              <div className="genre4">경제/경영</div>
              <div className="genre5">시/에세이</div>
              <div className="genre6">과학</div>
              <img className="btn-plus-book" alt="Group" src="images/plus-book-my.png" onClick={btnPlusClick}/>
            </div>
          </div>
          <div className="profile">
            <img className="profile-2" alt="Profile" src="images/profile.png" />
            <div className="nickname">닉네임</div>
            <div className="overlap-group-wrapper">
              <div className="div-edit-info" onClick={editInfoClick}>
                <div className="text-edit-info">정보수정</div>
                <div className="rect-edit-info" />
              </div>
            </div>
            <div className="div-heart" onClick={togglePopup}>
              <img className="heart-my" alt=" " src="images/heart-my.png" />
            </div>
          </div>
         {isPopupVisible && <HeartPopup />}
        </div>
      );
    };
    export default Mypage;
