import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/SelectGenre.css'; 

const SelectGenre = () => {
  const navigate = useNavigate();

  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres((prevSelected) =>
        prevSelected.filter((g) => g !== genre)
      );
    } else if (selectedGenres.length < 3) {
      setSelectedGenres((prevSelected) => [...prevSelected, genre]);
    }
  };

  const handleNextClick = () => {
    if (selectedGenres.length !== 3) {
      alert("3개의 장르를 선택해주세요.");
    } else {
      // 다음 페이지로 이동하는 로직을 여기에 추가
      navigate('/complete-join');
      console.log("Next button clicked");

    }
  };

  const genres = [
    { name: "공포/스릴러", className: "group-1", textClass: "text-wrapper-2" },
    { name: "로맨스", className: "group-2", textClass: "text-wrapper-3" },
    { name: "판타지", className: "group-3", textClass: "text-wrapper-3" },
    { name: "생명과학", className: "group-4", textClass: "text-wrapper-4" },
    { name: "비즈니스", className: "group-5", textClass: "text-wrapper-4" },
    { name: "자연과학", className: "group-6", textClass: "text-wrapper-4" },
    { name: "인문학", className: "group-7", textClass: "text-wrapper-3" },
    { name: "자기계발", className: "group-8", textClass: "text-wrapper-4" },
    { name: "역사", className: "group-9", textClass: "text-wrapper-5" },
    { name: "한국시", className: "group-10", textClass: "text-wrapper-6" },
    { name: "시간관리", className: "group-11", textClass: "text-wrapper-4" },
    { name: "커뮤니케이션", className: "group-12", textClass: "text-wrapper-7" },
    { name: "인간관계", className: "group-13", textClass: "text-wrapper-4" },
    { name: "자전", className: "group-14", textClass: "text-wrapper-5" }
  ];

  return (
    <div className="div-genre">
      <div className="content">
        <div className="group-title">
          <p className="text">
            <span className="text-big">
              000 님,<br />
              좋아하는 콘텐츠를<br />
              3개 선택하세요.
            </span>
          </p>
        </div>
        <p className="text-small">
          000님의 취향을 파악하는 데 도움을 드리고자합니다.<br />
          마음에 드는 콘텐츠를 골라주세요.
        </p>

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
                src="/path/to/rectangle-image.png"
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
