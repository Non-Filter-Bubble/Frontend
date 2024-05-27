import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import axiosInstance from '../api/axios';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  // 검색 버튼 클릭
  const searchIconClick = async (e) => {
    e.preventDefault();
    console.log('검색 버튼 클릭');

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

      console.log(response1.data.docs);

      const dataList1 = response1.data.docs;   

      const dataList2 = [];

      for (const data of dataList1) {
        try {
          const response2 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
            params: {
              isbn: parseInt(data.EA_ISBN, 10)
            }
          });
          console.log('response2의 값은', response2.data)
          dataList2.push(response2.data);
        } catch (error) {
          dataList2.push({ ISBN_THIRTEEN_NO: parseInt(data.EA_ISBN, 10), GENRE_LV1: "", GENRE_LV2: "", INFO_TEXT: "", BOOK_COVER_URL: ""});
          console.error(`ISBN ${data.EA_ISBN}에 대한 요청 실패:`, error);
        }
      }

      console.log('최종 dataList2의 값은', dataList2)


      // 두 데이터 합치기
      const dataList = dataList1.map(data1 => {
        console.log('data1의 값은', data1)
        const data2 = dataList2.find(data2 => parseInt(data1.EA_ISBN, 10) === data2.ISBN_THIRTEEN_NO);
        return { ...data1, ...data2 };
      });

      console.log(dataList);
      
      // 검색 결과 페이지로 이동
      navigate("/search", { state: { dataList: dataList } });

    } catch (error) {
      console.error('검색 실패:', error); // 오류가 발생한 경우 출력
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const LogoutClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };
    
  return (
    <div className="div-header">

      <div className="div-logo" onClick={() => { navigate('/'); }}>
        <div className="logo">BUBBLE POP</div>
      </div>
      
      <div className="div-search">
      <input type="text" className="search-input" placeholder="책 제목을 입력하세요." value={searchInput} onChange={handleChange}/>
        <img className="icon-search" alt="" src="/images/search-icon.png" onClick={searchIconClick} />
      </div>

      {!isLoggedIn ? (
        <>
          <div className="div-login" onClick={() => { navigate('/login'); }}>
            <div className="login">login</div>
          </div>
          <div className="div-join" onClick={() => { navigate('/join'); }}>
            <div className="join">Join</div>
          </div>
        </>
      ) : (
        <>
          <img className="icon-user" alt="" src="/images/user-icon.png" id="icon1" onClick={() => { navigate('/user'); }} />
          <div className="div-logout" onClick={LogoutClick}>
            <div className="logout">logout</div>
          </div>
        </>
      )}

      <img className="line-header" alt="" src="/vector/line-header.svg" />
    </div>
  );
};

export default Header;
