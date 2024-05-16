import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Join.css'; // Screen 컴포넌트의 스타일을 포함합니다.

const Join = () => {

    
    const navigate = useNavigate();

    const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="div-join">
        <div className="title-join">
            <div className="join-title">회원 가입</div>
            <img className="back-join" alt="" src="vector/back.svg" onClick={handleBack}/>
        </div>
        <div className="div-form">
            <div className="form-join">
            <img className="img-profile" alt="" src="images/profile.png" />
            <img className="rect-form" alt="" src="vector/rect-join.svg" />
            <div className="div-password">
                <input className="rect-input1" type="password" placeholder=" " />
                <p className="title-password">
                <span className="span">비밀번호</span>
                <span className="star">*</span>
                </p>
                <p className="notice-password">8-20자 이내 , 숫자 , 영어</p>
            </div>
            <div className="div-password2">
                <input className="rect-input2" type="password" placeholder=" " />
                <div className="title-password2">비밀번호 확인</div>
            </div>
            <div className="div-button-ok">
                <button className="button-ok">확인</button>
            </div>
            <div className="div-id">
                <p className="title">
                <span className="span">아이디</span>
                <span className="star">*</span>
                </p>
                <input className="rect-input3" type="text" placeholder=" " />
                <div className="div-wrapper">
                    <button className="button-dupli">중복확인</button>
                </div>
                <div className="notice-id">이미 사용중인 아이디입니다.</div>
            </div>
            <div className="div-nickname">
                <input className="rect-input4" type="text" placeholder=" " />
                <p className="title">
                <span className="span">닉네임</span>
                <span className="star">*</span>
                </p>
                <div className="div-button-dupli2">
                    <button className="button-dupli">중복확인</button>
                </div>
                <div className="notice-nickname">사용 가능한 닉네임입니다.</div>
            </div>
            </div>
        </div>
        </div>
    );
    };
    export default Join;
