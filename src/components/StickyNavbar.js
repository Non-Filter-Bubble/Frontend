import React from 'react';
import '../styles/StickyNavbar.css'; 

const StickyNavbar = () => {
  return (
    <nav className="sticky-navbar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default StickyNavbar;
