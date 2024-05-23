import React from 'react';
import '../styles/BookPost.css'; 


const BookPost = () => {
  return (
    <div className="div-bookpost">
          <div className="group">
            <div className="text-wrapper">북서랍 등록</div>
            <img className="back-book" alt="" src="/vector/back.svg" />
          </div>
          <img className="line-bookpost" alt="" src="/vector/line-book.svg" />
          <div className="group-2">
            <img className="rectangle" alt="" src="rectangle-82.svg" />
            <p className="p">
              <span className="span">저자</span>
              <span className="text-wrapper-2">*</span>
              <span className="span">&nbsp;</span>
            </p>
          </div>
          <div className="group-3">
            <img className="img" alt="" src="rectangle-83.svg" />
            <p className="div-2">
              <span className="span">출판사</span>
              <span className="text-wrapper-2">*</span>
            </p>
          </div>
          <div className="group-4">
            <p className="div-3">
              <span className="span">도서명</span>
              <span className="text-wrapper-2">*</span>
            </p>
            <div className="rectangle-2" />
          </div>
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <img className="rectangle-3" alt="" src="rectangle-84.svg" />
              <div className="text-wrapper-3">독서 후기</div>
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="text-wrapper-4">도서 검색</div>
            </div>
          </div>
          <div className="view-2">
            <div className="overlap-3">
              <div className="text-wrapper-5">등록</div>
            </div>
          </div>
          <div className="div-good">
            <img className="btn-good" alt="" src="/images/empty-good-btn.png" />
          </div>
          <div className="div-bad">
            <img className="btn-bad" alt="" src="/images/empty-bad-btn.png" />
          </div>
          <div className="group-5">
            <div className="text-wrapper-6">50자 이내</div>
            <div className="overlap-4">
              <div className="group-6">
                <img className="rectangle-4" alt="" src="image.svg" />
                <p className="div-4">
                  <span className="span">한줄평</span>
                  <span className="text-wrapper-2">*</span>
                </p>
              </div>
              <div className="text-wrapper-7">다른 사람에게 책을 소개해주세요.</div>
            </div>
          </div>
          <img className="line-division" alt="" src="vector/line-book.svg" />
        </div>
  );
};
export default BookPost;