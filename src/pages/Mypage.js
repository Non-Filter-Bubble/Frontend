import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../api/axios';
import '../styles/Mypage.css'; 

import HeartPopup from '../components/HeartPopup'; 
import BookDrawer from '../components/BookDrawer'; // 분리한 BookDrawer 컴포넌트를 가져옵니다.

import { GoHeartFill } from "react-icons/go";

const Mypage = () => {
  const token = localStorage.getItem('token');
  
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  // 메인페이지에서 찜 버튼을 누르면 바로 찜 팝업창이 뜨도록 함
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('popup') === 'true') {
      setPopupVisible(true);
    }
  }, [location]);

  // 정보수정 페이지로 이동
  const editInfoClick = () => {
    navigate('/user/verify'); 
  };

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user`, {
          headers: {
            'authorization': `${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        // console.error('사용자 정보를 가져오는데 실패했습니다.', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="div-my">
      <div className="profile-container">
        <img className="profile-img" alt="Profile" src="images/profile.png" />
        <div className="flex">
          <div className="profile-nickname">{user && user.nickname}</div>
          <div className="flex2">
            <div className="profile-edit-info" onClick={editInfoClick}>정보수정</div>
            <div className="profile-heart" onClick={togglePopup}>
              <div className="profile-heart-img"><GoHeartFill size={35} color='#D7443E'/></div>
            </div>
          </div>
        </div>      
      </div>

      {/* BookDrawer 컴포넌트를 사용하여 북서랍 표시 */}
      <div className="book-drawer">
        <BookDrawer token={token} navigate={navigate} />
      </div>
      {isPopupVisible && <HeartPopup />}
    </div>
  );
};

export default Mypage;
