import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import '../styles/BookDrawer.css';
import { BsPlusSquare } from "react-icons/bs";
import Slider from "react-slick"; 
import "../styles/slick.css";
import "../styles/slick-theme.css";

const DEFAULT_IMAGE_URL = '../../images/bookImage.jpg';

/*이전 버튼*/
const PrevButton = (props) => {
  const { onClick } = props;
  return (
    <div
      className="prev-button"
      style={{ 
          display: 'block',
          position: 'absolute',
          left: '-28px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: '100',
          width: '20px',
          height: '50px',
          backgroundImage: 'url(vector/drawer-btn-prev.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          cursor: 'pointer',
      }}
      onClick={onClick}
    />
  );
};

/*다음 버튼*/
const NextButton = (props) => {
  const { onClick } = props;
  return (
    <div
      className="next-button"
      style={{ 
        display: 'block', 
        position: 'absolute', 
        right: '-26px', 
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: '100',
        width: '20px',  
        height: '50px', 
        backgroundImage: 'url(vector/drawer-btn-next.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  );
};

const BookDrawer = ({ token, navigate }) => {
  const [bookboxId, setBookboxId] = useState([]);
  const [registeredBooks, setRegisteredBooks] = useState([]);

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

          const registeredBooksWithImages = await Promise.all(registeredBooksData.map(async book => {
            try {
              return {
                ...book,
                imageUrl: `https://contents.kyobobook.co.kr/sih/fit-in/100x0/pdt/${book.isbn}.jpg`
              };
            } catch (error) {
              return {
                ...book,
                imageUrl: '' 
              };
            }
          }));

          setRegisteredBooks(registeredBooksWithImages);
        } catch (error) {
          console.error('등록한 책 정보를 가져오는데 실패했습니다.', error);
        }
    };

    fetchRegisteredBooks();
  }, [token]);

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

  const genresAndBooks = bookboxId.map(box => ({
    genre: box.genre,
    books: groupBooks[box.genre] || []
  }));

  const showDetail = (book) => {
    navigate('/bookpostupdate', { state: { bookinfoshow: book } });
  }

  const handleDelete = async (mybookid) => {
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
        window.location.reload();
      })
      .catch((error) => {
        console.log('북포스트 삭제에 실패했습니다.');
      });
    } else {
      console.log('북포스트 삭제 취소');
    }
  }

  return (
    <div className="book-drawer-container">
      <div className="book-drawer-header">
        <div className='book-drawer-title'>북서랍</div>
        <div className='book-drawer-sub'>당신의 독서 여정을 간편하게 기록하세요. 북서랍에 책을 등록하고 성장하는 독서 기록을 확인해보세요!</div>
        <button className="book-drawer-plus-book-btn" onClick={() => navigate('/bookpost')}>
          <div ><BsPlusSquare size = "30" /></div>
        </button>
      </div>
      
      <div className="book-drawer-genres">
        {genresAndBooks.map((genreandbook, index) => {
          const showArrows = genreandbook.books.length > 0; // 책이 있을 때만 화살표를 표시합니다.

          const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: showArrows ? <NextButton /> : null,  
            prevArrow: showArrows ? <PrevButton /> : null,  
            adaptiveHeight: true, 
            variableWidth: true,
            arrows: showArrows, 
          };

          return (
            <div className="book-drawer-genre" key={index}>
              <div className='genre-title'>{genreandbook.genre}</div>
              <Slider {...settings}>
                {genreandbook.books.length > 0 ? (
                  genreandbook.books.map((book, bookIndex) => (
                    <div className="book-drawer-book" key={bookIndex}>
                      <img className="book-drawer-book-img" alt='book cover' src={book.imageUrl || DEFAULT_IMAGE_URL} />
                      <div className="book-drawer-book-overlay">
                        <button className="book-drawer-book-btn" onClick={() => showDetail(book)}>수정</button>
                        <button className="book-drawer-book-btn" onClick={() => handleDelete(book.mybookid)}>삭제</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="book-drawer-no-books">등록된 책이 없습니다.</div>
                )}
              </Slider>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookDrawer;
