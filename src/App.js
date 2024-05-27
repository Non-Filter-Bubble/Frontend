import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header'; 
import Main from './pages/Main';
import Join from './pages/Join';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import BookPost from './pages/BookPost';
import VerifyPass from './pages/VerifyPass';
import UserInfo from './pages/UserInfo';
import UserWithdraw from './pages/UserWithdraw';
import Search from './pages/Search';
import BookInfo from './pages/BookInfo';

import "./styles/App.css"
function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 

    let title;
    let metaDescription;
    switch (location.pathname) {
      case "/":
        title = "Home Page";
        metaDescription = "Welcome to our website!";
        break;
      case "/join":
        title = "회원가입";
        metaDescription = "Join us and enjoy our service!";
        break;
      case "/login":
        title = "로그인";
        break;
      case "/user":
        title = "마이페이지";
        metaDescription = "Manage your user profile here.";
        break;
      case "/user/update":
        title = "회원정보 수정";
        metaDescription = "Update your user information including nickname and password.";
        break;
      case "/user/bookpost":
        title = "북서랍 등록";
        metaDescription = "Post a new book.";
        break;
      case "/user/verify":
        title = "회원정보 수정";
        metaDescription = "Verify your password.";
        break;
      case "/user/withdraw":
        title = "회원탈퇴";
        metaDescription = "Withdraw";
        break;
      case "/search":
        title = "도서 검색";
        break;
      case "/search/book":
        title = "도서 검색";

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
        <Header />
      </div>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Mypage />} />
          <Route path="/user/verify" element={<VerifyPass />} />
          <Route path="/user/bookpost" element={<BookPost />} />
          <Route path="/user/update" element={<UserInfo />} />
          <Route path="/user/withdraw" element={<UserWithdraw />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/book" element={<BookInfo />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;