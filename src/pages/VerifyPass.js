import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VerifyPass.css'; 

const VerifyPass = () => {
  const navigate = useNavigate();

  const handleBack = () => {
  navigate(-1); // 이전 페이지로 이동
  }

  return (
    <div className="div-verify">
      <div className="group-verify">
        <img className="rect-edit-info" alt="" src="/vector/rect-verify-pass.svg"/>
        <div className="div-pass">
          <input className="rect-pass" type="password" src="/vector/rect-user-input.svg" />
          <div className="password-confirm">비밀번호 확인</div>
        </div>
        <div className="div-btn-submit">
          <div className="btn-submit">
            <div className="submit">확인</div>
          </div>
        </div>
      </div>
      <div className="group-title">
        <div className="title-edit">회원 정보 수정</div>
        <img className="back-verify" alt="" src="/vector/back.svg" onClick={handleBack}/>
      </div>
    </div>
  );
};
    export default VerifyPass;
