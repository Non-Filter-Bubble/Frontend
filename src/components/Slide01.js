import "../styles/Slide01.css";

const Slide01 = ({ goToNextSlide }) => {

  const detailClick = () => {
    // container 클릭 시 실행할 코드
    console.log('detail clicked');
  };

  



    return (
        <div className="slide-01">
          <img className="slide-background" alt="" src="images/slide01-background.png" />
          
          <div className="slide-01-btn-lr"></div>
          
          <div class="slide01-ment1">
            <p class="ment">BUBBLE POP은 </p>
            <p class="ment">여러분의 독서 세계를 넓혀드립니다</p>
          </div>
          <div class="slide01-ment2">
            <p class="ment">평소 읽지 않는 새로운 장르의 책을 발견해보세요. </p>
            <p class="ment">호기심을 자극하는 다른 독자들의 한줄평을 클릭하면 그 숨겨진 이야기의 세계가 펼쳐집니다.</p>
          </div>
    
          <div className="btn-detail" onClick={detailClick}>
            <div className="detail-box"></div>
            <div className="detail">자세히 보기</div>
          </div>
    
          <div className="page-number">
            <span className="number-left">1</span>
            <span> / </span>
            <span className="number-right">2</span>
          </div>
        </div>
      );
    }


export default Slide01;