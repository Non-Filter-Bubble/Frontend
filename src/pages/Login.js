import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/Login.css'; 

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',    
        password: ''
    });

    // 이전 페이지로 이동
    const handleBack = () => {
        navigate(-1); 
    }

    // 회원가입 페이지로 이동
    const joinClick = () => {
        navigate('/join');
    }

    // 값이 바뀔 때 마다 실행되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 로그인 버튼을 눌렀을 때 실행되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username) {
            alert('아이디를 입력해주세요.');
            return;
        }

        if (!formData.password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        // console.log('로그인 하기 버튼 누름');

        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }}
            );
            // console.log('로그인 요청');
            // console.log(response);

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('token', response.headers.authorization);

            // 메인 페이지로 이동
            navigate("/");

        } catch (error) {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            // console.error('로그인 실패:', error); // 오류가 발생한 경우 출력
            setFormData({
                username: '',    
                password: ''
            });
        }
    };

    return (
        <div className="div-login">
            <img className="rect-login" alt="" src="/vector/rect-login.svg" />

            <div className="div-title">
                <div className="login">로그인</div>
                <img className="back-login" alt="Vector" src="/vector/back.svg" onClick={handleBack}/>
            </div>
            
            <form className="div-input" onSubmit={handleSubmit}>
                <div className="group-input">
                <div className="input-login">
                    <div className="id">아이디</div>
                    <input className="rect-id" type="text" placeholder="아이디" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="input-password">
                    <div className="password">비밀번호</div>
                    <input className="rect-password" placeholder="비밀번호" type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                </div>
                <div className="group-btn">
                    <div className="div-btn-login">
                        <button type='submit' className="btn-login">로그인</button>
                    </div>
                    <div className="group-join">
                        <div className="text-wrapper-3">계정이 없으신가요?</div>
                        <div className="join" onClick={joinClick}>회원가입</div>
                    </div>
                </div>
            </form>
      </div>
    );
  };

export default Login;
