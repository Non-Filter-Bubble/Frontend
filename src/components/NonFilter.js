import React, { useState, useEffect } from 'react';

import "../styles/NonFilter.css";


const NonFilter = () => {
    const [books, setBooks] = useState([{}]); // 빈 객체를 포함하는 배열로 초기화
  
    useEffect(() => {
        // API 요청 코드 (나중에 구현)
    }, []);
  
    return (
        <div className="nonfilter">
            {books.map((book, index) => (
                <div key={index} className={`card-${index + 1}`} id={`card${index + 1}Container`}>
                    <div className="card-img">
                        <img className="book-img" alt="" src={book.IMAGE || 'images/default-book.png'} />
                        <img className="book-blur" alt="Cover" src="vector/blur.svg" />
                    </div>
                    <div className="card-resource">
                        <div className="wrapper">
                            <div className="div">
                                {book.INFO_TEXT ? book.INFO_TEXT.split('\n').map((line, idx) => (
                                    <p key={idx} className="p">{line}</p>
                                )) : <p className="p">No description available.</p>}
                            </div>
                        </div>
                        <img className="card-line" alt="" src="vector/line.svg" />
                        <div className="click">click!</div>
                    </div>
                </div>
            ))}
            <div className="nonfilter-ment1">취향을 넓힐 시간, 이 책을 추천합니다!</div>
            <div className="nonfilter-ment2">선입견 없는 한줄평이 새로운 취향을 탐험하게 해줍니다. 미지의 책 속 숨은 메시지를 발견해보세요</div>
            <img className="btn-reset" alt="" src="images/btn-reset.png" />
        </div>
    );
  };
  
  export default NonFilter;