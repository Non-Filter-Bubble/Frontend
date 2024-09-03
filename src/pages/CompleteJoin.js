import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/CompleteJoin.css'; 
import axiosInstance from "../api/axios";

const CompleteJoin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const okClick = async (e) => {
    console.log('확인 버튼 클릭');
    e.preventDefault();

    setIsLoading(true); // 로딩 시작

    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/recommend`, {
        headers: {
          'authorization': `${token}`,
          'Content-Type': 'application/json',
        }}
      );
      console.log('추천 도서 요청');
      // console.log(response);

      const recommendData = response.data;

      navigate('/', { state: { recommendData } })

    } catch (error) {
      console.error('실패:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }

    // navigate('/');

  };

  
  return (
    <div className="div-complete">
    
    <div className="group">
      <div className="overlap">
        <div className="overlap-group-wrapper">
          <div className="overlap-group" >
            <img className="rect-className" alt="" src="/vector/rect-complete.svg"/>
            <div className="text-wrapper">회원가입이 완료되었습니다</div>
            <p className="div">앞으로 더욱 다양한 서비스를 제공받으실 수 있습니다</p>
          </div>
        </div>
        <div className="div-btn-ok">
          <div className="btn-ok">
            <div className="ok" onClick={okClick}>확인</div>
          </div>
        </div>
      </div>
    </div>

    {/* 로딩 안내 창 */}
    {isLoading && (
      <div className="loading-modal">
        <div className="loading-modal-content">
          <p>추천 도서를 불러오는 중입니다. 잠시만 기다려 주세요...</p>
        </div>
      </div>
    )}

  </div>
);
};

export default CompleteJoin;