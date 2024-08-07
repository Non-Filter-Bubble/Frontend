import React from 'react';
import '../styles/StickyNavbar.css'; 
import { IoHome } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { PiNotePencilBold } from "react-icons/pi";
import { IoMdHelpCircleOutline } from "react-icons/io";





const StickyNavbar = () => {
  return (
    <nav className="sticky-navbar">
      <ul>
        <li><a href="#mypage"><FaCircleUser size="22"/></a></li>
        <li><a href="#home"><IoHome /></a></li>
        <li><a href="#search"><IoSearch size="22"/></a></li>
        <li><a href="#heart"><GoHeart strokeWidth= '1px' /></a></li>
        <li><a href="#bookPost"><PiNotePencilBold /></a></li>
        <li><a href="#bookPost"><IoMdHelpCircleOutline size="22"/></a></li>
      </ul>
    </nav>
  );
};

export default StickyNavbar;
