import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios';
import '../styles/Search.css'; 

// 기본 이미지 경로
const DEFAULT_IMAGE_URL = '../images/bookImage.jpg';

const Search = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();

  const dataList = location.state?.dataList || [];   // 검색 결과
  const searchInput = location.state?.searchInput || '';

  const [bookmarks, setBookmarks] = useState([]);
  
  const [search, setSearch] = useState(''); // 검색입력어

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;  // 한페이지에 최대 4개의 검색 결과

  // 마지막 책의 위치
  const lastBookRef = useRef(null);
  const paginationRef = useRef(null);

  // 검색어가 변경될 때마다 currentPage를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

  // 찜한 책 목록 가져오기
  useEffect(() => {   
    const fetchBookmarks = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/user/like`, {
          headers: {
            'authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          console.log('찜한 책을 가져오는데 성공했습니다.');

          const bookmarks = response.data.map(bookmark => ({
            bookmarkId: bookmark.bookmarkid,
            isbn: bookmark.isbn
          }));
          console.log('찜한 책 목록입니다.');
          console.log(bookmarks);
          setBookmarks(bookmarks);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmarks();
  }, [token]);


  // 구매하기 버튼
  const cartClick = (book) => {
    window.open(`https://search.shopping.naver.com/book/search?bookTabType=ALL&pageIndex=1&pageSize=40&query=${book.TITLE}&sort=REL`, '_blank');
  };

  // 찜 버튼
  const toggleFavorite = async (book) => {
    console.log(`찜하기 클릭`);
    // console.log(book);

    let bookmark = bookmarks.find(b => parseInt(b.isbn, 10) === parseInt(book.EA_ISBN, 10));
    // console.log(bookmark);

    try {
      if (!bookmark) { // 찜하지 않은 책을 찜한 경우
        console.log('찜하지 않은 책의 찜 버튼을 눌렀습니다.');

        const response = await axiosInstance.post(`${process.env.REACT_APP_DB_HOST}/user/like`, { 
          isbn: book.EA_ISBN,
          main_screen_selected: false,
          search_screen_selected: true
        }, {
            headers: {
              'authorization': `${token}`,
              'Content-Type': 'application/json'
            }
        });

        const responseText = response.data;
        const bookmarkIdMatch = responseText.match(/Bookmark saved successfully with ID: (\d+)/);
        const bookmarkId = bookmarkIdMatch ? parseInt(bookmarkIdMatch[1], 10) : null;

        if (bookmarkId) {
          setBookmarks((prevBookmarks) => [...prevBookmarks, { bookmarkId, isbn: parseInt(book.EA_ISBN, 10) }]);
        } else {
          console.error('Failed to parse bookmarkId');
        }

      } else { // 이미 찜한 책을 또 누른 경우
          console.log('이미 찜이 되어있는 책의 찜 삭제 버튼을 눌렀습니다.')
          const response = await axiosInstance.delete(`${process.env.REACT_APP_DB_HOST}/user/like/${bookmark.bookmarkId}`, {
            headers: {
              'authorization': `${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log(response);
          setBookmarks((prevBookmarks) => prevBookmarks.filter(b => b.bookmarkId !== bookmark.bookmarkId));
      }
    } catch (error) {
        console.error('API에 문제가 발생했습니다.', error);
    }
  };

  const isBookmarked = (book) => bookmarks.some(b => parseInt(b.isbn, 10) === parseInt(book.EA_ISBN, 10));

  // 페이지네이션
  //다음 버튼 클릭시
  const nextClick = () => {
    if (currentPage * itemsPerPage < dataList.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 이전 버튼 클릭시
  const previousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentData = dataList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (lastBookRef.current && paginationRef.current) {
      const lastBookPosition = lastBookRef.current.getBoundingClientRect();
      paginationRef.current.style.top = `${lastBookPosition.bottom + 20}px`;
    }
  }, [currentData]);

  const handleSearch = async () => {
    console.log('검색어:', search);

    // 검색어 입력 여부 확인
    if (!search) {
      alert('제목을 입력해주세요.');
      return;
    }

  // 제목만 검색
    try {
      // "AUTHOR", "EA_ISBN", "PUBLISHER", "TITLE"
      const response1 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-books`, {
        params: {
          type: 'title',
          value: search
        }
      });

      const dataList1 = response1.data.docs;   
      const dataList2 = [];

      for (const data of dataList1) {
        try {
          // "BOOK_COVER_URL", "GENRE_LV1", "GENRE_LV2", "INFO_TEXT_BOLD", ISBN_THIRTEEN_NO
          const response2 = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
            params: {
              isbn: parseInt(data.EA_ISBN, 10)
            }
          });
          dataList2.push(response2.data);
        } catch (error) {
          dataList2.push({ ISBN_THIRTEEN_NO: parseInt(data.EA_ISBN, 10), GENRE_LV1: "", GENRE_LV2: "", INFO_TEXT_BOLD: "", BOOK_COVER_URL: `https://contents.kyobobook.co.kr/sih/fit-in/100x0/pdt/${data.EA_ISBN}.jpg`});
        }
      }

      // 두 데이터 합치기
      const dataList = dataList1.map(data1 => {
        const data2 = dataList2.find(data2 => parseInt(data1.EA_ISBN, 10) === data2.ISBN_THIRTEEN_NO);
        return { ...data1, ...data2 };
      });

      console.log('검색의 결과 입니다.')
      console.log(dataList);
      
      // 검색 결과 목록 페이지로 이동
      navigate("/search", { state: { dataList: dataList, searchInput: search } });

      setSearch('');

    } catch (error) {
      console.error('검색 실패:', error); // 오류가 발생한 경우 출력
    }
  };

  // 검색 버튼 클릭
  const searchClick = async (e) => {
    e.preventDefault();
    console.log('검색 버튼 클릭');
    handleSearch();
  }

  console.log(currentData);

  return (
    <div className="div-search">
      <p className="title">'{searchInput}'에 대한 {dataList.length}건의 검색 결과</p>
      <div className="div-search-box">
        <input className="search-box" alt="" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()}/>
        <div className="div-btn-search" onClick={searchClick}>
          <div className="btn-search">
            <div className="search">검색</div>
          </div>
        </div>
      </div>
      <img className="line-search" alt="Line" src="/vector/line-search.svg" />
      {currentData.map((book, index) => (
        <div key={index} className={`book-${index + 1}`} onClick={() => navigate("/search/book", { state: { bookinfo: book } }) }>
          <img className="img-book-1" alt={book.TITLE} src={book.BOOK_COVER_URL !== "" ? book.BOOK_COVER_URL : DEFAULT_IMAGE_URL} />
          <div className={`book-${index + 1}-info`}>
            <div className="book-title">{book.TITLE}</div>
            <div className="book-author">{book.AUTHOR}</div>
            <div className="book-company">{book.PUBLISHER}</div>
          </div>
          <div className="book-service">
            <img
              className="icon-heart"
              alt=""
              src={isBookmarked(book) ? "/images/filled-heart-search.png" : "/images/empty-heart-search.png"}
              onClick={(e) => { e.stopPropagation(); toggleFavorite(book); }}
            />
            <img className="icon-cart" alt="" src="/images/icon-cart.png" onClick={(e) => { e.stopPropagation(); cartClick(book); }} />
          </div>
          <img className="line-book" alt=" " src="/vector/line-search-division.svg" />
        </div>
      ))}
      {dataList.length > itemsPerPage && (
        <div className="pagination" ref={paginationRef}>
          {currentPage > 1 && <button onClick={previousClick}>이전</button>}
          {currentPage * itemsPerPage < dataList.length && <button onClick={nextClick}>다음</button>}
        </div>
      )}
    </div>
  );
};

export default Search;