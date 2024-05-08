import "../styles/Header.css";

const Header = () => {

  const logoClick = () => {
    // container 클릭 시 실행할 코드
    console.log('Logo clicked');
  };

  const LogoutClick = () => {
    // container1 클릭 시 실행할 코드
  };

  const searchIconClick = () => {
    // icon 클릭 시 실행할 코드
  };

  const userIconClick = () => {
    // icon 클릭 시 실행할 코드
  };

  return (
    <div className="header-div">
      <div className="logo-div" onClick={logoClick}>
        <b className="bubble-pop">BUBBLE POP</b>
      </div>
      <div className="logout-div" id="container1" onClick={LogoutClick}>
        <div className="logout">logout</div>
      </div>
      <div className="search-div">
      <input type="text" className="search-input" placeholder="Search..."/>
        <img className="search-icon" alt="" src="images/search-icon.png" onClick={searchIconClick} />
      </div>
      <img className="user-icon" alt="" src="images/user-icon.png" id="icon1" onClick={userIconClick} />
    </div>
  );
};
    
<b className="bubble-pop">BUBBLE POP</b>
export default Header;
