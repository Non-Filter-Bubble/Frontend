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
    <div className="div-header">
      <div className="div-logo" onClick={logoClick}>
        <div className="logo">BUBBLE POP</div>
      </div>
      <div className="div-logout" id="container1" onClick={LogoutClick}>
        <div className="logout">logout</div>
      </div>
      <div className="div-search">
      <input type="text" className="search-input" placeholder="Search..."/>
        <img className="icon-search" alt="Image" src="images/search-icon.png" onClick={searchIconClick} />
      </div>
      <img className="icon-user" alt="Image" src="images/user-icon.png" id="icon1" onClick={userIconClick} />
      <img className="line-header" alt="Line" src="vector/line-header.svg" />
    </div>
  );
};
export default Header;
