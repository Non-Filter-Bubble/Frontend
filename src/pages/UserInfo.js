// 생각을 해봤는데 닉네임 중복버튼에서 PUT하지말고, 닉네임 중복확인 버튼을 누르면 중복확인만 하고, 확인버튼을 눌렀을 때 PUT하는 게 좋을듯
// 비밀번호 변경하는 거랑 닉네임 변경하는 거 둘다 같은 확인 버튼으로 하니까 구분해야함
// 닉네임을 변경할 때는 비밀번호란에 값을 입력할 필요가 없어 그리고 비밀번호 변경할 때는 닉네임을 바꿀 필요가 없어

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/UserInfo.css'; 

const UserInfo = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  }

  // 사용자 정보 가져오기
  useEffect(() => {
    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user`, {
          headers: {
            'authorization': `${token}`
          }
        });
        console.log('사용자 정보를 가져오는데 성공했습니다.');
        setUser(response.data);
        setNickname(response.data.nickname);
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다.', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const password_REG = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/ 

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    console.log('비밀번호 변경 버튼 누름');

    // 입력 여부 확인
    if (!password) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    // 입력 여부 확인
    if (!newPassword) {
      alert("새로운 비밀번호를 입력해주세요.");
      return;
    }

    // 비밀번호 정규 표현식 확인
    if (!password_REG.test(newPassword)) {
      alert("비밀번호는 영어와 숫자를 포함한 8~20자리여야 합니다.");
      return;
    }

    // 입력 여부 확인
    if (!newPasswordCheck) {
      alert("비밀번호 확인란을 입력해주세요.");
      return;
    }

    // 비밀번호 일치 확인
    if (newPassword !== newPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      setNewPasswordCheck('');
      return;
    }

    // 현재 비밀번호가 맞는지 확인 먼저 받고, 맞으면 비밀번호 변경
    await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/verify-password`, { 
      password: password
    }, {
        headers: {
          'authorization': `${token}`,
          'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        console.log(res);

        if (res.data.message === "Password is valid") {
          console.log('비밀번호 확인 성공')
            
          await axiosInstance.put(`${process.env.REACT_APP_DB_HOST}/user/update`, {
            currentPassword: password,
            newPassword: newPassword
          }, {
              headers: {
                'authorization': `${token}`,
                'Content-Type': 'application/json'
              }
          })
          .then((response) => {
            console.log('비밀번호 변경 성공');
            console.log(response);
            alert('비밀번호가 변경되었습니다.');
            setPassword('');
            setNewPassword('');
            setNewPasswordCheck('');
          })
          .catch((error) => {
            console.log('비밀번호 변경에 실패했습니다.');
            console.log(error);
            alert('비밀번호 변경에 실패했습니다.');
            setPassword('');
            setNewPassword('');
            setNewPasswordCheck('');
          })
        }
    }).catch((error) => {
      setPassword('');
      setNewPassword('');
      setNewPasswordCheck('');
      alert('현재 비밀번호가 다릅니다.');
    })
  };

  // 닉네임 변경
  const handleNicknameChange = async (e) => {
    e.preventDefault();
    console.log('닉네임 변경 버튼 누름');

    // 닉네임 입력 여부 확인
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.put(`${process.env.REACT_APP_DB_HOST}/user/update`, {
        nickname: nickname
      }, {
          headers: {
            'authorization': `${token}`,
            'Content-Type': 'application/json'
          }
      });
      console.log('닉네임 변경에 성공했습니다.');
      setNickname('');

      // 닉네임 변경 후 사용자 정보 다시 가져오기
      const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user`, {
        headers: {
          'authorization': `${token}`
        }
      });
      setUser(response.data);
      setNickname(response.data.nickname);
    } catch (error) {
      console.log('닉네임 변경에 실패했습니다.', error);
      alert('이미 사용중인 닉네임입니다.');
      setNickname('');
    }
  };

  const withdrawalClick = () => {
    navigate('/user/withdraw');  //회원탈퇴 경로
  };

  return (
    <div className="div-user-info">

      <div className="div-title">
        <div className="title">회원 정보 수정</div>
        <img className="back-user-info" alt=" " src="/vector/back.svg" onClick={handleBack}/>
      </div>

      <div className="div-edit-info">
        <div className="group-new-pass">

          <div className="group-id">
            <div className="subtitle">아이디</div>
            <div className="rect-id">
              <div className="id">{user && user.username}</div>
            </div>
          </div>
          
          <div className="group-nickname">
            <div className="notice-ok-nickname">사용 가능한 닉네임입니다.</div>
            <div className="group-6">
              <input className="rect-nickname" type="text" src="/vector/rect-user-input.svg" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
              <div className="subtitle">닉네임</div>
              <div className="div-dupli">
                <div className="div-btn">
                  <div className="text-btn" onClick={handleNicknameChange}>중복확인</div>
                </div>
              </div>
            </div>
          </div>

          <div className="div-pass">
            <input className="rect-pass" type="password" src="/vector/rect-user-input.svg" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="subtitle">현재 비밀번호</div>
          </div>

          <img className="profile" alt="" src="/images/profile-user-info.png" />
          
          {/* 이거때문에 닉네임 안보임 */}
          {/* <img className="rectangle" alt="Rectangle" src="/vector/rect-edit-info.svg" /> */}
          <p className="notice-pass">8-20자 이내 , 숫자 , 영어</p>

          <div className="div-new-pass">
            <input className="rect-new-pass" type="password" src="/vector/rect-user-input.svg" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <div className="subtitle">새 비밀번호</div>
          </div>
          
          <div className="div-new-pass-2">
            <input className="rect-new-pass-2" type="password" src="/vector/rect-user-input.svg" value={newPasswordCheck} onChange={(e) => setNewPasswordCheck(e.target.value)} />
            <div className="subtitle">비밀번호 확인</div>
          </div>

          <div className="div-submit">
            <div className="btn-submit">
              <div className="submit" onClick={handlePasswordChange}>확인</div>
            </div>
          </div>

          <div className="div-withdrawal" onClick={withdrawalClick}>
            <div className="div-btn">
              <div className="text-btn">회원탈퇴</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserInfo;
