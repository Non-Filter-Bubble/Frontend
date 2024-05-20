import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header'; // Header 컴포넌트의 정확한 경로를 확인해주세요.
import Main from './pages/Main';
import Join from './pages/Join';
import Mypage from './pages/Mypage';


import "./styles/App.css"

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 전환 시 화면 상단으로 스크롤

    // 페이지 별 메타 태그 설정
    let title;
    let metaDescription;
    switch (location.pathname) {
      case "/":
        title = "Home Page";
        metaDescription = "Welcome to our website!";
        break;
      case "/join":
        title = "Join Page";
        metaDescription = "Join us and enjoy our service!";
        break;
      default:
        title = "Page Not Found";
        metaDescription = "This page is not available.";
        break;
    }

    document.title = title;
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.content = metaDescription;
    }
  }, [location]);

  return (
    <div className='App'>
      <div className='header'>
      <Header />  {/* 모든 페이지에 공통으로 나타날 Header */}
      </div>
      <div className="content-container">  {/* 내용 컨테이너 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/user" element={<Mypage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
