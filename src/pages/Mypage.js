import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../api/axios';
import '../styles/Mypage.css'; 

import HeartPopup from '../components/HeartPopup'; 

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

  // 메인페이지에서 찜 버튼을 누르면 바로 찜 팝업창이 뜨도록 함
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('popup') === 'true') {
      setPopupVisible(true);
    }
  }, [location]);

  // 정보수정 페이지로 이동
  const editInfoClick = () => {
    navigate('/user/verify'); 
  };

  // 책 등록 페이지로 이동
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
        setUser(response.data);
      } catch (error) {
        // console.error('사용자 정보를 가져오는데 실패했습니다.', error);
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
            try {
              return {
                ...book,
                imageUrl: `https://contents.kyobobook.co.kr/sih/fit-in/100x0/pdt/${book.isbn}.jpg`
              };
            } catch (error) {
              return {
                ...book,
                imageUrl: '' // 실패 시 빈 문자열 처리
              };
            }
          }));

          setRegisteredBooks(registeredBooksWithImages);
          // console.log('최종적으로 저장된 것들', registeredBooks)
        } catch (error) {
          // console.error('등록한 책 정보를 가져오는데 실패했습니다.', error);
        }
    };

    fetchRegisteredBooks();
  }, [token]);

  console.log(registeredBooks);

  // 북박스 정보 가져오기
  useEffect(() => {
    const fetchBookboxId = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/bookboxid`, {
          headers: {
            'authorization': `${token}`
          }
        });
        setBookboxId(response.data);
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

  // console.log(genresAndBooks)

  const showDetail = (book) => {
    navigate('/bookpostupdate', { state: { bookinfoshow: book } });
  }

  const handleDelete = async (mybookid) => {
    console.log('북포스트 삭제 버튼 클릭');
    const isConfirmed = window.confirm('정말로 이 책을 삭제하시겠습니까?');

    if (isConfirmed) {
      await axiosInstance.delete(`${process.env.REACT_APP_DB_HOST}/user/bookbox/${mybookid}`, {
        headers: {
          authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      })  
      .then((response) => {
        console.log('북포스트 삭제 성공');
        console.log(response);

        // 책이 삭제된 후 페이지 다시 로드
        window.location.reload();
      })
      .catch((error) => {
        console.log('북포스트 삭제에 실패했습니다.');
        console.log(error);
      });
    } else {
      console.log('북포스트 삭제 취소');
    }
  }

  return (
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
                    <div className="book-drawer-book" key={bookIndex}>
                      <img className="book-drawer-book-img" alt='book cover' src={book.imageUrl || DEFAULT_IMAGE_URL} />
                      <div className="book-drawer-book-overlay">
                        <button className="book-drawer-book-btn" onClick={() => showDetail(book)}>수정</button>
                        <button className="book-drawer-book-btn" onClick={() => handleDelete(book.mybookid)}>삭제</button>
                      </div>
                    </div>

                    // <img className="book-drawer-book-img" alt='book cover' src={book.imageUrl || DEFAULT_IMAGE_URL} key={bookIndex} onClick={() => showDetail(book)} />
                    
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
