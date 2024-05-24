import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserInfo.css'; 

const UserInfo = () => {
    const navigate = useNavigate();

    const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
    }

    const withdrawalClick = () => {
        navigate('/user/withdraw');  //회원탈퇴 경로
      };
    

    return (
        <div className="div-user-info">
          <div className="div-title">
            <div className="title">회원 정보 수정</div>
            <img className="back-user-info" alt=" " src="/vector/back.svg" onClick={handleBack}/>
          </div>
          <div className="div-edit-info">
            <div className="group-new-pass">
              <img className="profile" alt="" src="/images/profile-user-info.png" />
              <img className="rectangle" alt="Rectangle" src="/vector/rect-edit-info.svg" />
              <p className="notice-pass">8-20자 이내 , 숫자 , 영어</p>
              <div className="div-new-pass">
                <input className="rect-new-pass" type="password" src="/vector/rect-user-input.svg" />
                <div className="subtitle">새 비밀번호</div>
              </div>
              <div className="group-id">
                <div className="subtitle">아이디</div>
                <div className="rect-id">
                    <div className="id"></div>
                </div>
              </div>
              <div className="group-pass-confirm">
              <input className="rect-new-pass-2" type="password" src="/vector/rect-user-input.svg" />
                <div className="subtitle">비밀번호 확인</div>
              </div>
              <div className="group-nickname">
                <div className="notice-ok-nickname">사용 가능한 닉네임입니다.</div>
                <div className="group-6">
                    <input className="rect-nickname" type="text" src="/vector/rect-user-input.svg" />
                    <div className="subtitle">닉네임</div>
                  <div className="div-dupli">
                    <div className="div-btn">
                      <div className="text-btn">중복확인</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-withdrawal" onClick={withdrawalClick}>
                <div className="div-btn">
                  <div className="text-btn">회원탈퇴</div>
                </div>
              </div>
              <div className="div-submit">
                <div className="btn-submit">
                  <div className="submit">확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default UserInfo;
