import React, { useEffect, useState } from "react";
import "../styles/MainHeader.css";

const MainHeader = ({ scrollToNonFilter, scrollToFilter, scrollToBestSellers, scrollToBookDrawer }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // State to track the active menu item

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click and set active menu
  const handleMenuClick = (menuName, scrollToSection) => {
    setActiveMenu(menuName);
    scrollToSection(); // Scroll to the corresponding section
  };

  return (
    <header className={`main-header ${isSticky ? 'sticky' : ''}`}>
      <nav>
        <ul className="nav-list">
          <li
            onClick={() => handleMenuClick('nonFilter', scrollToNonFilter)}
            className={`list-link ${activeMenu === 'nonFilter' ? 'active' : ''}`}
          >
            For New
          </li>
          <li
            onClick={() => handleMenuClick('filter', scrollToFilter)}
            className={`list-link ${activeMenu === 'filter' ? 'active' : ''}`}
          >
            For You
          </li>
          <li
            onClick={() => handleMenuClick('bookDrawer', scrollToBookDrawer)}
            className={`list-link ${activeMenu === 'bookDrawer' ? 'active' : ''}`}
          >
            Diary
          </li>
          <li
            onClick={() => handleMenuClick('bestSellers', scrollToBestSellers)}
            className={`list-link ${activeMenu === 'bestSellers' ? 'active' : ''}`}
          >
            BestSeller
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
