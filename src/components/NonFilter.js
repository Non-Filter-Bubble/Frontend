import React, {useEffect, useState, useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios';
import "../styles/NonFilter.css";

const NonFilter = ( {nonfilterrecommend} ) => {
  // console.log("메인에서 넘어온 값입니다. 논필터");
  // console.log(nonfilterrecommend);

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const [bookinfo, setBookinfo] = useState([]);

  const getBookInfo = useCallback(async (isbn) => {
    // console.log('책 정보 요청:', isbn)
    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/load-books`, {
        params: { isbn: isbn }, 
        headers: { 'authorization': `${token}` }
      });
      setBookinfo(prevBookinfo => [...prevBookinfo, response.data]);
    } catch (error) {
      // 이건 절대 실패할 수 없는거임 - 왜냐 AI에서 보내는거니까
      console.error(`ISBN ${isbn}에 대한 요청 실패:`, error);
      // setBookinfo();
    }
  }, [token]);

  // 랜덤으로 책 정보 5개 추출
  const getRandom = useCallback((list) => {    
    const randomIndexs = []
    while (randomIndexs.length < 5) {
      const randomIndex = Math.floor(Math.random() * list.length);
      if (!randomIndexs.includes(randomIndex)) {
        randomIndexs.push(randomIndex);
      }
    }
    // console.log('랜덤으로 추출된 인덱스:', randomIndexs);
    // console.log('랜덤으로 추출된 책의 ISBN:', randomIndexs.map(index => list[index]));
    randomIndexs.forEach(index => getBookInfo(list[index]));
    
  }, [getBookInfo]);

  // 처음 로드시 랜덤으로 추출된 책 정보를 저장
  useEffect(() => {
    setBookinfo([]);
    if (nonfilterrecommend && nonfilterrecommend.length > 0) {
      getRandom(nonfilterrecommend);
    }
  }, [nonfilterrecommend, getRandom]);

  // 다시 추천 버튼 클릭 시
  const handleFilterLeftClick = () => {
    setBookinfo([]);
    if (nonfilterrecommend && nonfilterrecommend.length > 0) {
      getRandom(nonfilterrecommend);
    }
  }; 

  // console.log('랜덤으로 추출된 책의 정보:', bookinfo);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // 클릭 시
  const showDetail = async (index) => {
    // console.log('책 상세정보:', bookinfo[index]);

    try {
      const res = await axiosInstance.get(`${process.env.REACT_APP_DB_HOST}/search-books`, {
        params : {
          type: 'isbn',
          value: bookinfo[index].ISBN_THIRTEEN_NO
        }
      });
      // console.log('책 상세정보 요청 성공');
      // console.log(res.data.docs[0]);

      // 두 데이터 합치기
      const bookdata = { ...res.data.docs[0], ...bookinfo[index] };
      // console.log('두 데이터 합친 책 정보:', bookdata);

      navigate('/search/book', { state: { bookinfo: bookdata } });

    } catch (error) {
      console.error('책 상세정보 요청 실패:', error);
    }
  };
    
  return (
    <div className="non-filter">
      <div className="div-nonfilter">
        <p className="ment-1">취향을 넓힐 시간, 이 책을 추천합니다!</p>
        <p className="ment-2">
          선입견 없는 한줄평이 새로운 취향을 탐험하게 해줍니다. 미지의 책 속 숨은 메시지를 발견해보세요
        </p>
        <img className="btn-reset" alt="" src="images/btn-reset.png" onClick={handleFilterLeftClick} />

        <div className="div-card">
          {bookinfo.slice(0, 5).map((book, index) => (
            <div key={index} className={`card-${index + 1}`} onClick={() => showDetail(index)}>
              <div className="card-blur">
                <img className="card-img" alt="" src={book.BOOK_COVER_URL} />
              </div>
              <div className="div-card-content">
                <p className="card-text">
                {truncateText(book.INFO_TEXT_BOLD, 80)}
                </p>
                <img className="line-division" alt="" src="/vector/line-filter.svg" />
                <div className="text-click">click!</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonFilter;


// <div className="div-card">
//   {/*카드 - 1 */}
//   <div className="card-1">
//     <div className="card-blur">
//       <img className="card-img" alt="" src="rectangle-28-4.svg" />
//     </div>
//       <div className="div-card-content">
//           <p className="card-text">
//             도전과 모험,
//             <br />
//             새로운 시작을 하는 <br />
//             사람은 누구나 추락을 <br />
//             경험할 수 있다
//           </p>
//           <img className="line-division" alt="" src="/vector/line-filter.svg" />
//         <div className="text-click">click!</div>
//       </div>
      
//   </div>
//   {/*카드 -2 */}
//   <div className="card-2">
//     <div className="card-blur">
//       <img className="card-img" alt="" src="rectangle-28-4.svg" />
//     </div>
//       <div className="div-card-content">
//           <p className="card-text">
//             훌쩍 떠나온 것 나는
//             <br />
//             얼마나 기쁜 모른다!
//             <br />
//             친구여, 인간의
//             <br />
//             마음이란 대체
//             <br />
//             어떤 것일까!
//           </p>
//           <img className="line-division" alt="" src="/vector/line-filter.svg" />
//         <div className="text-click">click!</div>
//       </div>
//   </div>

//   {/* 카드-3 */}
//   <div className="card-3">
//     <div className="card-blur">
//       <img className="card-img" alt="" src="rectangle-28-4.svg" />
//     </div>
//       <div className="div-card-content">
//           <p className="card-text">
//             역사는 우리를 <br />
//             저버렸지만, <br />
//             그래도 상관없다.
//           </p>
//           <img className="line-division" alt="" src="/vector/line-filter.svg" />
//         <div className="text-click">click!</div>
//       </div>
//   </div>

//   {/* 카드-4 */}
//   <div className="card-4">
//     <div className="card-blur">
//       <img className="card-img" alt="" src="rectangle-28-4.svg" />
//     </div>
//       <div className="div-card-content">
//           <p className="card-text">
//             훌쩍 떠나온 것 나는
//             <br />
//             얼마나 기쁜 모른다!
//             <br /> <br />
//             마음이란 대체
//             <br />
//             어떤 것일까!
//           </p>
//         <img className="line-division" alt="" src="/vector/line-filter.svg" />
//         <div className="text-click">click!</div>
//       </div>
//   </div>
//   {/* 카드-5 */}
//   <div className="card-5">
//     <div className="card-blur">
//       <img className="card-img" alt="" src="rectangle-28-4.svg" />
//     </div>
      
//       <div className="div-card-content">
//           <p className="card-text">
//             훌쩍 떠나온 것 나는
//             <br />
//             얼마나 기쁜 모른다!
//             <br /> <br />
//             마음이란 대체
//             <br />
//             어떤 것일까!
//           </p>
//         <img className="line-division" alt="" src="/vector/line-filter.svg" />
//         <div className="text-click">click!</div>
//       </div>
//   </div>
  
// </div>