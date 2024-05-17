import { useNavigate } from 'react-router-dom';
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

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

  const goToJoin = () => {
    navigate('/join'); // '/join' 경로로 이동
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
        <input type="text" className="search-input" placeholder="Search..." />
        <img className="icon-search" alt="" src="images/search-icon.png" onClick={searchIconClick} />
      </div>
      <img className="icon-user" alt="" src="images/user-icon.png" id="icon1" onClick={userIconClick} />
      <img className="line-header" alt="" src="vector/line-header.svg" />
      <button className="join-button" onClick={goToJoin}>Join</button>
    </div>
  );
};

export default Header;
