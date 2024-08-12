import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainHeader.css";


const MainHeader = () => {
  const navigate = useNavigate();

  const nonfilerClick = () => {
    navigate("/");
  }

  const filerClick = () => {
    navigate("/");
  }

  const bestClick = () => {
    navigate("/user?popup=true");
  }

  const drawerClick = () => {
    navigate("/user");
  }

  return (
    <header className="main-header">
        <nav>
            <ul className="nav-list">
                <li onClick={nonfilerClick} className="list-link">NonFilter</li>
                <li onClick={filerClick} className="list-link">Filter</li>
                <li onClick={bestClick} className="list-link">BestSeller</li>
                <li onClick={drawerClick} className="list-link">BookDrawer</li>
            </ul>
        </nav>
    </header>
  );
};
  export default MainHeader;