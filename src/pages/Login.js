import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // 이전 페이지로 이동
    }

    const joinClick = () => {
        navigate('/join '); // 회원가입 페이지로 이동
    }

    

    return (
        <div className="div-login">
            <img className="rect-login" alt="" src="/vector/rect-login.svg" />
            <div className="div-title">
                <div className="login">로그인</div>
                <img className="back-login" alt="Vector" src="/vector/back.svg" onClick={handleBack}/>
            </div>
            <div className="div-input">
                <div className="group-input">
                <div className="input-login">
                    <div className="id">아이디</div>
                    <input className="rect-id"  placeholder="아이디"/>
                </div>
                <div className="input-password">
                    <div className="password">비밀번호</div>
                    <input className="rect-password" placeholder="비밀번호" />
                </div>
                </div>
                <div className="group-btn">
                    <div className="div-btn-login">
                        <div className="btn-login">
                        <div className="login">로그인</div>
                        </div>
                    </div>
                    <div className="group-join">
                        <div className="text-wrapper-3">계정이 없으신가요?</div>
                        <div className="join" onClick={joinClick}>회원가입</div>
                    </div>
                </div>
            </div>
      </div>
    );
  };

export default Login;
