import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserWithdraw.css'; 
import axiosInstance from '../api/axios';

const UserWithdraw = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [password, setPassword] = useState('');

  const handleBack = () => {
  navigate(-1); // 이전 페이지로 이동
  }

  const handleUserDelete = async () => {
    // 비밀번호 확인 및 회원 탈퇴 요청
    // console.log('회원 탈퇴 버튼 클릭')

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
    .then(async (res) => {
      // console.log(res);

      if (res.data.message === "Password is valid") {
        // console.log('비밀번호 확인 성공')

        await axiosInstance.delete(`${process.env.REACT_APP_DB_HOST}/user`, {
          headers: {
            'authorization': `${token}`,
            'Content-Type': 'application/json'
          },
          params: {
            username: res.data.username
          }
        })
        .then((response) => {
          alert('회원 탈퇴가 완료되었습니다.');
          // console.log('회원 탈퇴 성공');
          console.log(response);

          // 토큰 삭제
          localStorage.removeItem('token');

          // 회원가입 페이지 이동
          navigate('/join');
        }).catch((error) => {
          // console.log('비밀번호는 맞지만, 회원 탈퇴에 실패했습니다.');
          console.log(error);
        })
      } 
    })
    .catch((error) => {
      setPassword('');
      alert('비밀번호가 일치하지 않습니다.');
      console.log(error);
      console.log('비밀번호가 다릅니다.')
    })
  };
  
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
          <input className="rect-with-input"  type="password" src="/vector/rect-user-input.svg" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="text-pass">비밀번호 확인</div>
        </div>
        <div className="div-submit">
          <div className="btn-submit">
            <div className="submit" onClick={handleUserDelete}>확인</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWithdraw;
