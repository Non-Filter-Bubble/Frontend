import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserWithdraw.css'; 

const UserWithdraw = () => {
    const navigate = useNavigate();

    const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
    }

    //const withdrawalClick = () => {
        //navigate('/verify-password');  회원탈퇴 경로
     // };

   
      


    return (
        <div className="div-withdraw">
          <div className="group-title">
            <div className="title">회원 탈퇴</div>
            <img className="back-with" alt="" src="/vector/back.svg" onClick={handleBack}/>
          </div>
          <p className="notice-with">
            탈퇴하면 기존의 정보가 전부 사라집니다.
            <br />
            탈퇴를 원하시면 현재 비밀번호를 입력해주십시오.
          </p>
          <img className="rect-with" alt=" "src="/vector/rect-with.svg"/>
          <div className="group-input">
            <div className="group-pass">
              <input className="rect-with-input"  type="password" src="/vector/rect-user-input.svg" />
              <div className="text-pass">비밀번호 확인</div>
            </div>
            <div className="div-submit">
              <div className="btn-submit">
                <div className="submit">확인</div>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default UserWithdraw;
