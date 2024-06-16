import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Join.css';
import axiosInstance from '../api/axios';

const Join = () => {
    const navigate = useNavigate();

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

    const handleBack = () => {
        navigate(-1);
    };

    // 값이 변경될 때 마다 실행되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'username') {
            setIdMsg('');
            setIsIdChecked(false);
        }
        if (name === 'nickname') {
            setNickMsg('');
            setIsNickChecked(false);
        }
    };

    // 아이디 중복 확인
    const CheckId = async (e) => {
        e.preventDefault();

        if (!formData.username) {
            alert("아이디를 입력해주세요.");
            return;
        }

        // 아이디 중복 확인 요청
        await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/check-username`, {
            params: { username: formData.username },
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => {
                setIdMsg("사용 가능한 아이디 입니다.");
                setIdMsgClass('success-message');
                setIsIdChecked(true);
            }).catch((error) => {
                // console.error(error)
                setIdMsg("존재하는 아이디 입니다.");
                setIdMsgClass('error-message');
                setIsIdChecked(false);
                setFormData({ ...formData, username: '' });
            });
    };

    // 닉네임 중복 확인
    const CheckNickname = async (e) => {
        e.preventDefault();

        if (!formData.nickname) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        // 닉네임 중복 확인 요청
        await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/check-nickname`, {
            params: { nickname: formData.nickname },
            headers: { 'Content-Type': 'application/json' }
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

    // 비밀번호 확인
    const passwordCheckValidation = () => {
        if (!formData.passwordCheck) {
            return '';
        }
        
        if (formData.password === formData.passwordCheck) {
            return <span style={{ color: 'green' }}>비밀번호가 일치합니다.</span>;
        } else {
            return <span style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</span>;
        }
    };

    // 회원가입버튼 눌렀을 때 실행되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isIdChecked || !isNickChecked) {
            alert("아이디와 닉네임 중복 확인을 해주세요.");
            return;
        }

        const password_REG = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

        if (!password_REG.test(formData.password)) {
            alert("비밀번호는 영어와 숫자를 포함한 8~20자리여야 합니다.");
            return;
        }

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
            navigate("/join/booktype");
        } catch (error) {
            alert('회원가입에 실패했습니다.');
            // console.error('회원가입 실패:', error);
        }
    };

    return (
        <div className="div-join">
            <div className="title-join">
                <div className="join-title">회원 가입</div>
                <img className="back-join" alt="" src="vector/back.svg" onClick={handleBack} />
            </div>
            <div className="div-form">
                <form className="form-join" onSubmit={handleSubmit}>
                    <img className="img-profile" alt="" src="images/profile.png" />
                    <img className="rect-form" alt="" src="/vector/rect-join.svg" />
                    <div className="div-id">
                        <p className="title">
                            <span className="span">아이디</span>
                            <span className="star">*</span>
                        </p>
                        <input className="rect-input3" type="text" name="username" value={formData.username} onChange={handleChange} required />
                        <div className="div-wrapper">
                            <button className="button-dupli" onClick={CheckId}>중복확인</button>
                        </div>
                        <div className={`notice-id ${idMsgClass}`}>{idMsg}</div>
                    </div>
                    <div className="div-nickname">
                        <input className="rect-input4" type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
                        <p className="title">
                            <span className="span">닉네임</span>
                            <span className="star">*</span>
                        </p>
                        <div className="div-button-dupli2">
                            <button className="button-dupli" onClick={CheckNickname}>중복확인</button>
                        </div>
                        <div className={`notice-nickname ${nickMsgClass}`}>{nickMsg}</div>
                    </div>
                    <div className="div-password">
                        <input className="rect-input1" type="password" name="password" value={formData.password} onChange={handleChange} required />
                        <p className="title-password">
                            <span className="span">비밀번호</span>
                            <span className="star">*</span>
                        </p>
                        <p className="notice-password">8-20자 이내 , 숫자 , 영어</p>
                    </div>
                    <div className="div-password2">
                        <input className="rect-input2" type="password" name="passwordCheck" value={formData.passwordCheck} onChange={handleChange} required />
                        <div className="title-password2">비밀번호 확인</div>
                        <p className="notice-password2">{passwordCheckValidation()}</p>
                    </div>
                    <button type='submit' className="div-button-ok">확인</button>
                </form>
            </div>
        </div>
    );
};
export default Join;
