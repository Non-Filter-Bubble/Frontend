import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Join.css'; // Screen 컴포넌트의 스타일을 포함합니다.
import axiosInstance from '../api/axios';

const Join = () => {
    const [formData, setFormData] = useState({
        username: '',
        nickname: '',        
        password: '', 
        passwordCheck: ''
    });

    const [idMsg, setIdMsg] = useState('');
    const [nickMsg, setNickMsg] = useState('');
    const [idMsgClass, setIdMsgClass] = useState('');
    const [nickMsgClass, setNickMsgClass] = useState('');
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isNickChecked, setIsNickChecked] = useState(false);

    const navigate = useNavigate();

    // 이전 페이지로 이동
    const handleBack = () => {
        navigate(-1); 
    };

    // 값이 바뀔 때 마다 실행되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // 아이디에 입력된 값이 변경되면 중복 확인 메시지를 초기화
        if (name === 'username') {
            setIdMsg('');
            setIsIdChecked(false);
        }
        // 닉네임에 입력된 값이 변경되면 중복 확인 메시지를 초기화
        if (name === 'nickname') {
            setNickMsg('');
            setIsNickChecked(false);
        }
    };

    // 아이디 중복 체크
    const CheckId = async (e) => {
        e.preventDefault();

        // 아이디 입력 여부 확인
        if (!formData.username) {
            alert("아이디를 입력해주세요.");
            return;
        }

        // 아이디 중복 확인 요청
        await axiosInstance.get(`/user/check-username`, {
            params: { username: formData.username }
        })
        .then((res) => {
            setIdMsg("사용 가능한 아이디 입니다.");
            setIdMsgClass('success-message');
            setIsIdChecked(true);
        }).catch((error) => {
            setIdMsg("존재하는 아이디 입니다.");
            setIdMsgClass('error-message');
            setIsIdChecked(false);
            setFormData({ ...formData, username: '' });
        });
    };

    // 닉네임 중복 체크
    const CheckNickname = async (e) => {
        e.preventDefault();

        // 닉네임 입력 여부 확인
        if (!formData.nickname) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        // 닉네임 중복 확인 요청
        await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/check-nickname`, {
            params: { nickname: formData.nickname }
        })
        .then((res) => {
            setNickMsg("사용 가능한 닉네임 입니다.");
            setNickMsgClass('success-message');
            setIsNickChecked(true);
        }).catch((error) => {
            setNickMsg("존재하는 닉네임 입니다.");
            setNickMsgClass('error-message');
            setIsNickChecked(false);
            setFormData({ ...formData, nickname: '' });
        });
    };

    // 비밀번호와 비밀번호 확인에 입력된 값의 일치 확인
    const passwordCheckValidation = () => {
        if (formData.password === formData.passwordCheck) {
            return <span style={{ color: 'green'}}>비밀번호가 일치합니다.</span>;
        } else {
            return <span style={{ color: 'red'}}>비밀번호가 일치하지 않습니다.</span>;
        }
    };

    // 가입하기 버튼을 눌렀을 때 실행되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 아이디와 닉네임 중복 확인이 완료되었는지 확인
        if (!isIdChecked || !isNickChecked) {
            alert("아이디와 닉네임 중복 확인을 해주세요.");
            return;
        }

        // 비밀번호 정규 표현식 확인
        const password_REG = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
        if (!password_REG.test(formData.password)) {
            alert("비밀번호는 영어와 숫자를 포함한 8~16자리여야 합니다.");
            return;
        }

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (formData.password !== formData.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            setFormData({ ...formData, passwordCheck: '' });
            return;
        }

        const formDataToSend = { ...formData };
        delete formDataToSend.passwordCheck;

        // 회원가입 요청
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/join`, formDataToSend, {
                headers: { 'Content-Type': 'application/json' }
            });
            localStorage.setItem('token', response.headers.authorization);
            navigate("/booktype");
        } catch (error) {
            console.error('회원가입 실패:', error); 
        }
    };

    return (
        <div className="div-join">
        <div className="title-join">
            <div className="join-title">회원 가입</div>
            <img className="back-join" alt="" src="vector/back.svg" onClick={handleBack}/>
        </div>
        <form className="div-form" onSubmit={handleSubmit}>
            <div className="form-join">
            <img className="img-profile" alt="" src="images/profile.png" />
            <img className="rect-form" alt="" src="/vector/rect-join.svg" />
            <div className="div-password">
                <input className="rect-input1" type="password" placeholder=" " name="password" value={formData.password} onChange={handleChange} required/>
                <p className="title-password">
                <span className="span">비밀번호</span>
                <span className="star">*</span>
                </p>
                <p className="notice-password">8-20자 이내 , 숫자 , 영어</p>
            </div>
            <div className="div-password2">
                <input className="rect-input2" type="password" placeholder=" " name="passwordCheck" value={formData.passwordCheck} onChange={handleChange} required/>
                <div className="title-password2">비밀번호 확인</div>
                <p className="notice-password2">{passwordCheckValidation()}</p>
            </div>
            <div className="div-button-ok">
                <button type='submit' className="button-ok">확인</button>
            </div>
            <div className="div-id">
                <p className="title">
                <span className="span">아이디</span>
                <span className="star">*</span>
                </p>
                <input className="rect-input3" type="text" placeholder=" " name="username" value={formData.username} onChange={handleChange} required/>
                <div className="div-wrapper">
                    <button className="button-dupli" onClick={CheckId}>중복확인</button>
                </div>
                <div className={`notice-id ${idMsgClass}`}>{idMsg}</div>
            </div>
            <div className="div-nickname">
                <input className="rect-input4" type="text" placeholder=" " name="nickname" value={formData.nickname} onChange={handleChange} required/>
                <p className="title">
                <span className="span">닉네임</span>
                <span className="star">*</span>
                </p>
                <div className="div-button-dupli2">
                    <button className="button-dupli" onClick={CheckNickname}>중복확인</button>
                </div>
                <div className={`notice-nickname ${nickMsgClass}`}>{nickMsg}</div>
            </div>
            </div>
        </form>
        </div>
    );
};
export default Join;
