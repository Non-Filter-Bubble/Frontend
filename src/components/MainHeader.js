import React from "react";
import "../styles/MainHeader.css";

const MainHeader = ({ scrollToNonFilter, scrollToFilter, scrollToBestSellers, scrollToBookDrawer }) => {
  return (
    <header className="main-header">
      <nav>
        <ul className="nav-list">
          <li onClick={scrollToNonFilter} className="list-link">NonFilter</li>
          <li onClick={scrollToFilter} className="list-link">Filter</li>
          <li onClick={scrollToBestSellers} className="list-link">BestSeller</li>
          <li onClick={scrollToBookDrawer} className="list-link">BookDrawer</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
