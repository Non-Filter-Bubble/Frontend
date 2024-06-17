import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/SelectBookType.css'; 

const SelectBookType = () => {
  const navigate = useNavigate();  

  const token = localStorage.getItem('token');

  const [user, setUser] = useState(null);
  // const [bestSellerImages, setBestSellerImages] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user`, {
          headers: {
            'authorization': `${token}`
          }
        });
        console.log('사용자 정보를 가져오는데 성공했습니다.');
        setUser(response.data.nickname);
      } catch (error) {
        // console.error('사용자 정보를 가져오는데 실패했습니다.', error);
      }
    };

    fetchUserInfo();
  }, [token]);  

  // // 베스트 셀러 목록을 가져오는 GET 요청
  // useEffect(() => {
  //   const fetchBestSellers = async () => {
  //     const types = ['소설', '자연과학', '인문', '시/에세이', '자기계발', '경제/경영'];

  //     const requests = types.map(async (type) => {
  //       try {
  //         const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/bestseller`, {
  //             params: { genre: type },
  //             headers: { 'Content-Type': 'application/json' }
  //         });
  //         // console.log(`${type} 베스트 셀러 목록을 가져오는데 성공했습니다.`);
  //         // console.log(response.data[0].cover)
  //         return { type, cover: response.data[0].cover };
  //       } catch (error) {
  //         // console.error(`${type} 베스트 셀러 목록을 가져오는 데 실패했습니다.`, error);
  //         return { type, cover: null };
  //       }
  //     });

  //     const results = await Promise.all(requests);
  //     setBestSellerImages(results.filter(result => result.cover !== null));
  //   };

  //   fetchBestSellers();
  // }, []);

  // console.log('베스트 셀러 이미지 목록:', bestSellerImages);

  const toggleTypeSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prevSelected) =>
        prevSelected.filter((t) => t !== type)
      );
    } else if (selectedTypes.length < 2) {
      setSelectedTypes((prevSelected) => [...prevSelected, type]);
    }
  };

  const handleNextClick = () => {
    // console.log("Next button clicked");
    console.log('선택한 분야는', selectedTypes)

    if (selectedTypes.length !== 2) {
      alert("2개의 분야를 선택해주세요.");
    } else {
      // 다음 페이지로 이동
      navigate('/join/genre', { state: { booktype: selectedTypes } });
    }
  };

  return (
    <div className="div-select-booktype">
      <div className="group-title">
        <p className="text-1">
          <span className="span">{user} 님,<br /></span>
          <span className="span">선호하는 책 분야를 <br /></span>
          <span className="span">2개 선택하세요 </span>
        </p>
        <p className="text-2">
        {user}님의 취향을 파악하는 데 도움을 드리고자합니다.<br />
          마음에 드는 콘텐츠를 골라주세요.
        </p>
      </div>
      <div className="div-select">
        <div className="group-line-1">
          <div className="group-3">
          <div
              className={`rectangle ${selectedTypes.includes("소설") ? "selected" : ""}`}
              onClick={() => toggleTypeSelection("소설")}>
              <span className="text-korean">소설</span><br/>
              <span className="text-english">novel</span>
            </div>
          </div>
          <div className="group-4">
          <div
              className={`rectangle ${selectedTypes.includes("자연과학") ? "selected" : ""}`}
              onClick={() => toggleTypeSelection("자연과학")}>
              <span className="text-korean">자연과학</span><br/>
              <span className="text-english">science</span>
            </div>
          </div>
          <div className="group-7">
          <div
              className={`rectangle ${selectedTypes.includes("인문") ? "selected" : ""}`}
              onClick={() => toggleTypeSelection("인문")}>
              <span className="text-korean">인문</span><br/>
              <span className="text-english">humanities</span>
            </div>
          </div>
        </div>
        <div className="group-2">
          <div className="group-3">
          <div
              className={`rectangle ${selectedTypes.includes("시/에세이") ? "selected" : ""}`}
              onClick={() => toggleTypeSelection("시/에세이")}>
              <span className="text-korean">시/에세이</span><br/>
              <span className="text-english">poem/essay</span>
            </div>
          </div>
          <div className="group-4">
          <div
              className={`rectangle ${selectedTypes.includes("자기계발") ? "selected" : ""}`}
              onClick={() => toggleTypeSelection("자기계발")}>
              <span className="text-korean">자기계발</span><br/>
              <span className="text-english">self improvement</span>
            </div>
          </div>
          <div className="group-5">
          <div
              className={`rectangle ${selectedTypes.includes("경제/경영") ? "selected" : ""}`}
              onClick={() => toggleTypeSelection("경제/경영")}>
              <span className="text-korean">경제/경영</span><br/>
              <span className="text-english">economy
              administration</span>
            </div>
          </div>
        </div>
      </div>
      <div className="div-btn-next">
        <button className="btn-next" onClick={handleNextClick}>다음</button>
      </div>
    </div>
  );
};

export default SelectBookType;