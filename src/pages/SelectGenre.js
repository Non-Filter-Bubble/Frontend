import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios';
import '../styles/SelectGenre.css'; 

const SelectGenre = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booktype = location.state.booktype;

  const token = localStorage.getItem('token');

  const [user, setUser] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user`, {
          headers: {
            'authorization': `${token}`
          }
        });
        console.log('사용자 정보를 가져오는데 성공했습니다.');
        setUser(response.data.username);
      } catch (error) {
        // console.error('사용자 정보를 가져오는데 실패했습니다.', error);
      }
    };

    fetchUserInfo();
  }, [token]); 

  const toggleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres((prevSelected) =>
        prevSelected.filter((g) => g !== genre)
      );
    } else if (selectedGenres.length < 3) {
      setSelectedGenres((prevSelected) => [...prevSelected, genre]);
    }
  };

  const handleNextClick = async () => {
    console.log("Next button clicked");

    if (selectedGenres.length !== 3) {
      alert("3개의 장르를 선택해주세요.");
    } else {
        try {
          const response = await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/genre`, { 
            favGenre: selectedGenres,
            favBookType: booktype
          }, {
              headers: {
                'authorization': `${token}`,
                'Content-Type': 'application/json'
              }
          });
          console.log('분야', booktype, '장르', selectedGenres)
          console.log('장르 정보가 성공적으로 저장되었습니다.');
          console.log(response)

          // 성공시 이동
          navigate('/complete-join');

      } catch (error) {
        console.error('정보 저장 실패:', error);
      }   
    }
  };

  const genres = [
    { name: "공포/스릴러", className: "group-1", textClass: "text-wrapper-2", image: "../images/horror_conjuring.jpg"},
    { name: "로맨스", className: "group-2", textClass: "text-wrapper-3", image: "../images/romance_abouttime.png" },
    { name: "판타지", className: "group-3", textClass: "text-wrapper-3", image: "../images/fantasy_harrypotter.jpg"},
    { name: "생명과학", className: "group-4", textClass: "text-wrapper-4", image: "../images/lifeScience_avata.jpg" },
    { name: "경제/경영", className: "group-5", textClass: "text-wrapper-2", image: "../images/economic_theBigShort.jpg" },
    { name: "자연과학", className: "group-6", textClass: "text-wrapper-4", image: "../images/science_core.jpg" },
    { name: "인문학", className: "group-7", textClass: "text-wrapper-3" , image: "../images/genre-human.png"},
    { name: "자기계발", className: "group-8", textClass: "text-wrapper-4" ,image: "../images/genre-self.png"},
    { name: "역사", className: "group-9", textClass: "text-wrapper-5", image: "../images/history_1987.jpg"},
    { name: "한국시", className: "group-10", textClass: "text-wrapper-6" ,image: "../images/genre-poem.png"},
    { name: "시간관리", className: "group-11", textClass: "text-wrapper-4", image: "../images/time_inTime.jpg" },
    { name: "커뮤니케이션", className: "group-12", textClass: "text-wrapper-7", image: "../images/genre-commu.png" },
    { name: "인간관계", className: "group-13", textClass: "text-wrapper-4", image: "../images/genre-person.png" },
    { name: "자전", className: "group-14", textClass: "text-wrapper-5", image: "../images/travel_emilyInParis.jpg" }
  ];

  return (
    <div className="div-genre">
      <div className="content">
        <div className="group-title">
          <p className="text-big">
              {user} 님,<br />
              좋아하는 콘텐츠를<br />
              3개 선택하세요.
          </p>
          <p className="text-small">
          {user}님의 취향을 파악하는 데 도움을 드리고자합니다.<br />
          마음에 드는 콘텐츠를 골라주세요.
        </p>
        </div>
        

        <div className="div-select">
          {genres.map((genre, index) => (
            <div key={index} className={genre.className}>
              <div
                className={`${genre.textClass} ${selectedGenres.includes(genre.name) ? 'selected' : ''}`}
                onClick={() => toggleGenreSelection(genre.name)}
              >
                {genre.name}
              </div>
              <img
                className={`rectangle ${selectedGenres.includes(genre.name) ? 'selected' : ''}`}
                alt=""
                src={genre.image}
                onClick={() => toggleGenreSelection(genre.name)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="div-btn-next">
        <div className="div-btn" onClick={handleNextClick}>
          <div className="next">다음</div>
        </div>
      </div>
    </div>
  );
};

export default SelectGenre;
