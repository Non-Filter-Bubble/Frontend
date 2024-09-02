import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VerifyPass.css'; 
import axiosInstance from '../api/axios';

const VerifyPass = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [password, setPassword] = useState('');

  const handleBack = () => {
  navigate(-1); // 이전 페이지로 이동
  }

  const handleInfoModification = async (e) => {
    e.preventDefault();
    
    console.log('확인 버튼 클릭');

    if (password === '') {
        alert('비밀번호를 입력해주세요.');
        return;
    }

    await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/verify-password`, { 
      password: password
    }, {
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log('비밀번호가 일치합니다.');
      console.log(res);

      navigate("/user/update");
    })
    .catch((err) => {
      setPassword('');
      alert('비밀번호가 일치하지 않습니다.');
      console.error('비밀번호가 일치하지 않습니다.');
      console.error(err);
    });
  };

  return (
    <div className="div-verify">
      <form className="group-verify" onSubmit={handleInfoModification}>
        <img className="rect-edit-info" alt="" src="/vector/rect-verify-pass.svg"/>
        <div className="div-pass">
          <input className="rect-pass" type="password" src="/vector/rect-user-input.svg" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="password-confirm">비밀번호 확인</div>
        </div>
        <div className="div-btn-submit">
          <div className="btn-submit">
            <button type='submit' className="submit" onClick={handleInfoModification}>확인</button>
          </div>
        </div>
      </form>
      <div className="group-title">
        <div className="title-edit">회원 정보 수정</div>
        <img className="back-verify" alt="" src="/vector/back.svg" onClick={handleBack}/>
      </div>
    </div>
  );
};

export default VerifyPass;
