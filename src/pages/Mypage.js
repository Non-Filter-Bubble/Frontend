import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../api/axios';
import '../styles/Mypage.css'; // Screen 컴포넌트의 스타일을 포함합니다.

import HeartPopup from '../components/HeartPopup'; // Popup 컴포넌트 추가

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../../images/bookImage.jpg';

const Mypage = () => {

  const token = localStorage.getItem('token');
  
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [bookboxId, setBookboxId] = useState([]);
  const [registeredBooks, setRegisteredBooks] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('popup') === 'true') {
      setPopupVisible(true);
    }
  }, [location]);

  const editInfoClick = () => {
    navigate('/user/verify'); 
  };

  const btnPlusClick = () => {
    navigate('/bookpost'); 
  };

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
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다.', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  // 등록한 책 정보 가져오기
  useEffect(() => {
    const fetchRegisteredBooks = async () => {
      try {
          const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/bookbox/mybook`, {
            headers: {
              authorization: `${token}`,
            },
          });

          console.log('등록한 책 정보를 가져오는데 성공했습니다.', response);
          const registeredBooksData = response.data;

          // 이미지 링크 불러오기
          const registeredBooksWithImages = await Promise.all(registeredBooksData.map(async book => {
            // console.log(book)
            try {
              const imageResponse = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
                params: {
                  isbn: parseInt(book.isbn, 10)
                }
              });
              console.log('이미지 불러오기 성공', imageResponse)
              return {
                ...book,
                imageUrl: imageResponse.data.BOOK_COVER_URL
              };
            } catch (error) {
              console.error(`책(${book.title})의 이미지를 불러오는데 실패했습니다.`, error);
              return {
                ...book,
                imageUrl: '' // 실패 시 빈 문자열 처리
              };
            }
          }));

          setRegisteredBooks(registeredBooksWithImages);
          console.log('최종적으로 저장된 것들', registeredBooks)
        } catch (error) {
          console.error('등록한 책 정보를 가져오는데 실패했습니다.', error);
        }
    };

    fetchRegisteredBooks();
}, [token, registeredBooks]);

  // 북박스 정보 가져오기
  useEffect(() => {
    const fetchBookboxId = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/bookboxid`, {
          headers: {
            'authorization': `${token}`
          }
        });
        console.log('북박스 아이디를 가져오는데 성공했습니다.', response);
        setBookboxId(response.data);
        console.log(response.data[0].genre)
        console.log(response.data[0].bookboxid)
      } catch (error) {
        console.error('북박스 아이디를 가져오는데 실패했습니다.', error);
      }
    };

    fetchBookboxId();
  }, [token]);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  // 책들을 장르별로 그룹화
  const groupBooks = registeredBooks.reduce((groups, book) => {
    const { bookboxid } = book;
    const genre = bookboxId.find(box => box.bookboxid === bookboxid)?.genre;
    if (!genre) return groups;
    if (!groups[genre]) {
      groups[genre] = [];
    }
    groups[genre].push(book);
    return groups;
  }, {});

  // 모든 장르에 대해 책 정보 등록
  const genresAndBooks = bookboxId.map(box => ({
    genre: box.genre,
    books: groupBooks[box.genre] || []
  }));

  console.log(genresAndBooks)

  // const genres = [
  //   {
  //     books: [DEFAULT_IMAGE_URL, DEFAULT_IMAGE_URL, DEFAULT_IMAGE_URL],
  //   },
  //   {
  //     books: [DEFAULT_IMAGE_URL, DEFAULT_IMAGE_URL, DEFAULT_IMAGE_URL],
  //   },
  //   {
  //     books: [DEFAULT_IMAGE_URL, DEFAULT_IMAGE_URL, DEFAULT_IMAGE_URL],
  //   },
  // ];
  // const genres = [
  //   {
  //     books: registeredBooks.map(book => book.imageUrl || DEFAULT_IMAGE_URL),
  //   }
  // ];

  // const sites = [
  //   { className: "site-left", position: "left" },
  //   { className: "site-right", position: "right" },
  // ];
  


  return (
    // <div className="div-my">
    //   <div className="profile">
    //     <img className="profile-2" alt="Profile" src="images/profile.png" />
    //     <div className="nickname">{user && user.nickname}</div>
    //     <div className="overlap-group-wrapper">
    //       <div className="div-edit-info" onClick={editInfoClick}>
    //         <div className="text-edit-info">정보수정</div>
    //         <div className="rect-edit-info" />
    //       </div>
    //     </div>
    //     <div className="div-heart" onClick={togglePopup}>
    //       <img className="heart-my" alt=" " src="images/heart-my.png" />
    //     </div>
    //   </div>

    //   {/* <div className="profile">
    //     <img className="profile-img" alt="Profile" src="images/profile.png" />
    //     <div className="nickname">{user && user.nickname}</div>
    //     <button className="edit-info-btn" onClick={editInfoClick}>정보수정</button>
    //     <button className="heart-btn" onClick={togglePopup}>
    //       <img className="heart-img" alt="Heart" src="images/heart-my.png" />
    //     </button>
    //   </div> */}

    //   {/* <div className="div-book-drawer">
    //     <div className="book-drawer">북서랍</div>
    //     <div className="group">
    //       {sites.map((site, siteIndex) => (
    //         <div className={`site ${site.className}`} key={siteIndex}>
    //           {genres.map((genre, genreIndex) => (
    //             <div className="genre" key={genreIndex}>
    //               <img className="line" alt="Line" src="vector/line-my.svg" />
    //               <div className="group-4">
    //                 {genre.books.map((book, bookIndex) => (
    //                   <img className="book" alt="book cover" src={book} key={bookIndex} />
    //                 ))}
    //               </div>
    //               <img className="btn-right" alt="" src="images/btn-right-my.png" />
    //               <img className="btn-left" alt="" src="images/btn-left-my.png" />
    //             </div>
    //           ))}
    //         </div>
    //       ))}
    //     </div>
    //     <div className="group-16">
    //       {genres.map((genres, genreIndex) => (
    //         <div className={`genrename genre${genreIndex + 1}`} key={genreIndex}>{genres.genre}</div>
    //       ))}
    //       <img className="btn-plus-book" alt="Group" src="images/plus-book-my.png" onClick={btnPlusClick}/>
    //     </div>
    //   </div> */}
    //     <div className="book-drawer-container">
    //     <div className="book-drawer-header">
    //       <h2>북서랍</h2>
    //       <button className="plus-book-btn" onClick={btnPlusClick}>
    //         <img alt="Plus" src="images/plus-book-my.png" />
    //       </button>
    //     </div>
    //     <div className="genres">
    //       {genres.map((genre, genreIndex) => (
    //         <div className="genre" key={genreIndex}>
    //           <h3>{genre.genre}</h3>
    //           <div className="books">
    //             {genre.books.length > 0 ? (
    //               genre.books.map((book, bookIndex) => (
    //                 <img className="book-img" alt={`Book ${bookIndex}`} src={book.imageUrl || 'DEFAULT_IMAGE_URL'} key={bookIndex} />
    //               ))
    //             ) : (
    //               <div className="no-books">등록된 책이 없습니다.</div>
    //             )}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   {isPopupVisible && <HeartPopup />}
    // </div>
    <div className="div-my">
      <div className="profile-container">
        <img className="profile-img" alt="Profile" src="images/profile.png" />
        <div className="flex">
          <div className="profile-nickname">{user && user.nickname}</div>
          <div className="flex2">
            <div className="profile-overlap-group-wrapper">
              <div className="profile-edit-info" onClick={editInfoClick}>
                <div className="profile-text-edit-info">정보수정</div>
                <div className="profile-rect-edit-info" />
              </div>
            </div>
            <div className="profile-heart" onClick={togglePopup}>
              <img className="profile-heart-img" alt=" " src="images/heart-my.png" />
            </div>
          </div>
        </div>
        
      </div>
      {/* <div className="profile-container">
        <div className="profile-img-wrapper">
          <img className="profile-img" alt="Profile" src="images/profile.png" />
          <div className="profile-nickname">{user && user.nickname}</div>
        </div>
        <div className="profile-details">
          <div className="profile-overlap-group-wrapper">
            <div className="profile-edit-info" onClick={editInfoClick}>
              <div className="profile-text-edit-info">정보수정</div>
              <div className="profile-rect-edit-info" />
            </div>
          </div>
          <div className="profile-heart" onClick={togglePopup}>
            <img className="profile-heart-img" alt=" " src="images/heart-my.png" />
          </div>
        </div>
      </div> */}

      <div className="book-drawer-container">
        <div className="book-drawer-header">
          <h2>북서랍</h2>
          <button className="book-drawer-plus-book-btn" onClick={btnPlusClick}>
            <img alt="Plus" src="images/plus-book-my.png" />
          </button>
        </div>
        <div className="book-drawer-genres">
          {genresAndBooks.map((genreandbook, index) => (
            <div className="book-drawer-genre" key={index}>
              <h3>{genreandbook.genre}</h3>
              <div className="book-drawer-books">
                {genreandbook.books.length > 0 ? (
                  genreandbook.books.map((book, bookIndex) => (
                    <img className="book-drawer-book-img" alt='book cover' src={book.imageUrl || DEFAULT_IMAGE_URL} key={bookIndex} />
                  ))
                ) : (
                  <div className="book-drawer-no-books">등록된 책이 없습니다.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isPopupVisible && <HeartPopup />}
    </div>
  );
};

export default Mypage;
