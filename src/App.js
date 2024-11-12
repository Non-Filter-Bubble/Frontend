import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CheckRoute from './CheckRoute';

import Header from './components/Header'; 
import StickyNavbar from './components/StickyNavbar';

import Main from './pages/Main';
import Join from './pages/Join';
import SelectBookType from './pages/SelectBookType';
import SelectGenre from './pages/SelectGenre';
import CompleteJoin from './pages/CompleteJoin';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import BookPost from './pages/BookPost';
import BookPostUpdate from './pages/BookPostUpdate';
import VerifyPass from './pages/VerifyPass';
import UserInfo from './pages/UserInfo';
import UserWithdraw from './pages/UserWithdraw';
import Search from './pages/Search';
import BookInfo from './pages/BookInfo';

import "./styles/App.css"

function App() {
  const token = localStorage.getItem('token');
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
        title = "Join";
        metaDescription = "Join us and enjoy our service!";
        break;

      case "/join/booktype":
        title = "Join";
        metaDescription = "Join us and enjoy our service!";
        break;

      case "/join/genre":
        title = "Join";
        metaDescription = "Join us and enjoy our service!";
        break;

      case "/complete-join":
        title = "Join";
        metaDescription = "Join us and enjoy our service!";
        break;

      case "/login":
        title = "Login";
        break;

      case "/user":
        title = "Mypage";
        metaDescription = "Manage your user profile here.";
        break;

      case "/user/update":
        title = "회원정보 수정";
        metaDescription = "Update your user information including nickname and password.";
        break;

      case "/bookpost":
        title = "북서랍 등록";
        metaDescription = "Post a new book.";
        break;

      case "/bookpostupdate":
        title = "북서랍 수정";
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
        {token && <StickyNavbar />} {/* 로그인된 경우에만 StickyNavbar 렌더링 */}
      </div>
      <div className="content-container">
        <Routes>
          <Route path="*" element={<CheckRoute />} />

          <Route path="/" element={<Main />} />

          <Route element={<PublicRoute />}>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>            
            <Route path="/join/booktype" element={<SelectBookType />} />
            <Route path="/join/genre" element={<SelectGenre />} />
            <Route path="/complete-join" element={<CompleteJoin />} />
            <Route path="/user" element={<Mypage />} />
            <Route path="/user/verify" element={<VerifyPass />} />
            <Route path="/bookpost" element={<BookPost />} />
            <Route path="/bookpostupdate" element={<BookPostUpdate />} />
            <Route path="/user/update" element={<UserInfo />} />
            <Route path="/user/withdraw" element={<UserWithdraw />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/book" element={<BookInfo />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
