import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/StickyNavbar.css'; 
import { IoHome } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { PiNotePencilBold } from "react-icons/pi";
import { IoMdHelpCircleOutline } from "react-icons/io";



const StickyNavbar = () => {


  const navigate = useNavigate();

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
        <li onClick={userClick}><a href="#mypage"><FaCircleUser size="22"/><span>Home</span></a></li>
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
