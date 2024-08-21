import React from "react";
import "../styles/MainHeader.css";

const MainHeader = ({ scrollToNonFilter, scrollToFilter, scrollToBestSellers, scrollToBookDrawer }) => {
  return (
    <header className="main-header">
      <nav>
        <ul className="nav-list">
          <li onClick={scrollToNonFilter} className="list-link">For New</li>
          <li onClick={scrollToFilter} className="list-link">For You</li>
          <li onClick={scrollToBookDrawer} className="list-link">Diary</li>
          <li onClick={scrollToBestSellers} className="list-link">BestSeller</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
