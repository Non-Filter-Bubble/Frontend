import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header'; 
import Main from './pages/Main';
import Join from './pages/Join';
import Mypage from './pages/Mypage';
import BookPost from './pages/BookPost';
import VerifyPass from './pages/VerifyPass';
import UserInfo from './pages/UserInfo';
import UserWithdraw from './pages/UserWithdraw';

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
        title = "Join Page";
        metaDescription = "Join us and enjoy our service!";
        break;
      case "/user":
        title = "User Page";
        metaDescription = "Manage your user profile here.";
        break;
      case "/user/update":
        title = "User Info Edit";
        metaDescription = "Update your user information including nickname and password.";
        break;
      case "/user/bookpost":
        title = "Book Post";
        metaDescription = "Post a new book.";
        break;
      case "/user/verify":
        title = "Verify Password";
        metaDescription = "Verify your password.";
        break;
        case "/user/withdraw":
          title = "Withdraw";
          metaDescription = "Withdraw";
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
          <Route path="/user" element={<Mypage />} />
          <Route path="/user/verify" element={<VerifyPass />} />
          <Route path="/user/bookpost" element={<BookPost />} />
          <Route path="/user/update" element={<UserInfo />} />
          <Route path="/user/withdraw" element={<UserWithdraw />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;