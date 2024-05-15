import React from 'react';
import '../styles/Join.css'; // Screen 컴포넌트의 스타일을 포함합니다.

const Join = () => {
    return (
        <div className="div-join">
            <div className="title-join">
                <div className="text-wrapper">회원 가입</div>
                <img className="vector" alt="Vector" src="vector/back.svg" />
            </div>
            
            <div className="overlap">
                <img className="profile" alt="Profile" src="images/profile.png" />
                <img className="rectangle" alt="Rectangle" src="vector/rect-join.svg" />
                <p className="div">8-20자 이내, 숫자, 영어</p>
                <img className="img" alt="Rectangle" src="rectangle-83.svg" />
                <p className="p">
                    <span className="span">비밀번호</span>
                    <span className="text-wrapper-2">*</span>
                </p>
                <img className="rectangle-2" alt="Rectangle" src="rectangle-84.svg" />
                <div className="text-wrapper-3">비밀번호 확인</div>
                <div className="view">
                    <div className="overlap-group">
                        <div className="text-wrapper-4">확인</div>
                    </div>
                </div>
                <p className="div-2">
                    <span className="span">아이디</span>
                    <span className="text-wrapper-2">*</span>
                </p>
                <div className="rectangle-3" />
                <div className="text-wrapper-5">BUBBLE</div>
                <div className="overlap-wrapper">
                    <div className="div-wrapper">
                        <div className="text-wrapper-6">중복확인</div>
                    </div>
                </div>
                <div className="text-wrapper-7">이미 사용중인 아이디입니다.</div>
                <img className="rectangle-4" alt="Rectangle" src="rectangle-82.svg" />
                <p className="div-3">
                    <span className="span">닉네임</span>
                    <span className="text-wrapper-2">*</span>
                </p>
                <div className="overlap-group-wrapper">
                    <div className="div-wrapper">
                        <div className="text-wrapper-6">중복확인</div>
                    </div>
                </div>
                <div className="text-wrapper-8">사용 가능한 닉네임입니다.</div>
            </div>
        </div>
       
    );
};

export default Join;
