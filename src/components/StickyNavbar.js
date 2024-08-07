import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/StickyNavbar.css'; 
import axiosInstance from '../api/axios';

import { IoHome } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { PiNotePencilBold } from "react-icons/pi";
import { IoMdHelpCircleOutline } from "react-icons/io";



const StickyNavbar = () => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user`, {
          headers: {
            'authorization': `${token}`
          }
        });
        setUser(response.data); // 사용자 정보 상태에 저장
      } catch (error) {
        // console.error('사용자 정보를 가져오는데 실패했습니다.', error);
      }
    };
  
    fetchUserInfo();
  }, [token]);
  

  const userClick = () => {
    navigate("/user");
  }

  const homeClick = () => {
    navigate("/");
  }

  const searchClick = () => {
    navigate("/search");
  }

  const heartClick = () => {
    navigate("/user?popup=true");
  }

  const postClick  = () => {
    navigate("/bookpost");
  }

  const helpClick  = () => {
  }


  return (
    <nav className="sticky-navbar">
      <ul>
        <li onClick={userClick}><a href="#mypage"><FaCircleUser size="22"/><span>{user && user.nickname}</span></a></li>
        <li onClick={homeClick}><a href="#home"><IoHome /><span>Home</span></a></li>
        <li onClick={searchClick}><a href="#search"><IoSearch size="22"/><span>Search</span></a></li>
        <li onClick={heartClick}><a href="#heart"><GoHeart strokeWidth= '1px' /><span>Favorite</span></a></li>
        <li onClick={postClick}><a href="#bookPost"><PiNotePencilBold /><span>Post</span></a></li>
        <li onClick={helpClick}><a href="#bookPost"><IoMdHelpCircleOutline size="22"/><span>Help</span></a></li>
      </ul>
    </nav>
  );
};

export default StickyNavbar;
