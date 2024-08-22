import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import axiosInstance from '../api/axios';
import { FaUser } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // 로그인 로그아웃 클릭
  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
      navigate('/login');
    } else {
      navigate('/login');
    }
  };
 
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

 
  const handleSearch = async () => {
    console.log('검색어:', searchInput);
  
    // 검색어 입력 여부 확인
    if (!searchInput) {
      alert('제목을 입력해주세요.');
      return;
    }

    // 제목만 검색
    try {
      const response1 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-books`, {
        params: {
          type: 'title',
          value: searchInput
        }
      });

      // console.log(response1.data.docs);

      const dataList1 = response1.data.docs;   
      const dataList2 = [];

      for (const data of dataList1) {
        try {
          const response2 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
            params: {
              isbn: parseInt(data.EA_ISBN, 10)
            }
          });
          // console.log('response2의 값은', response2.data)
          dataList2.push(response2.data);
        } catch (error) {
          dataList2.push({ ISBN_THIRTEEN_NO: parseInt(data.EA_ISBN, 10), GENRE_LV1: "", GENRE_LV2: "", INFO_TEXT: "", BOOK_COVER_URL: `https://contents.kyobobook.co.kr/sih/fit-in/100x0/pdt/${data.EA_ISBN}.jpg`});
          // console.error(`ISBN ${data.EA_ISBN}에 대한 요청 실패:`, error);
        }
      }

      // console.log('최종 dataList2의 값은', dataList2)

      // 두 데이터 합치기
      const dataList = dataList1.map(data1 => {
        // console.log('data1의 값은', data1)
        const data2 = dataList2.find(data2 => parseInt(data1.EA_ISBN, 10) === data2.ISBN_THIRTEEN_NO);
        return { ...data1, ...data2 };
      });

      // console.log(dataList);
      
      // 검색 결과 페이지로 이동
      navigate("/search", { state: { dataList: dataList, searchInput: searchInput } });

      setSearchInput('');

    } catch (error) {
      console.error('검색 실패:', error); // 오류가 발생한 경우 출력
    }
  };

     
  return (
    <div className="div-header">
      <div className="div-logo" onClick={() => navigate('/')}>
        <div className="logo">BUBBLE POP</div>
      </div>

      <div className="div-search-small">
        <input type="text" className="search-input"
               placeholder="책 제목을 입력하세요"
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}/>
        <div className="icon-search" onClick={handleSearch} ><IoSearchSharp size="20"/></div>
      </div>

      <div className="icon-user" onClick={() => isLoggedIn && navigate('/user')} ><FaUser size="20"/></div>

      <div className="div-auth" onClick={handleAuthClick}>
        <div className="auth">{isLoggedIn ? 'Logout' : 'Login'}</div>
      </div>
      <div className="header-bottom-line"></div> 
      
    </div>
  );
};
export default Header; 

