import React from 'react';
import { Link } from "react-router-dom";
import '../styles/HeartPopup.css'; // Screen 컴포넌트의 스타일을 포함합니다.

const HeartPopup = () => {



    return (
        <div className="screen">
      <div className="overlap">
        <div className="group">
          <div className="overlap">
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="div">
                  <div className="group-2" />
                  <div className="group-3">
                    <div className="group-wrapper">
                      <div className="group-4">
                        <p className="text-wrapper">
                          나는 메트로폴리탄 미술관의 <br />
                          경비원 입니다
                        </p>
                        <div className="text-wrapper-2">웅진 지식 하우스</div>
                        <div className="text-wrapper-3">패트릭 브링리</div>
                      </div>
                    </div>
                    <div className="group-5" />
                  </div>
                  <div className="group-6" />
                  <div className="group-7" />
                </div>
                <div className="div-wrapper">
                  <div className="group-4">
                    <p className="text-wrapper">
                      나는 메트로폴리탄 미술관의 <br />
                      경비원 입니다
                    </p>
                    <div className="text-wrapper-2">웅진 지식 하우스</div>
                    <div className="text-wrapper-3">패트릭 브링리</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group-8">
              <div className="group-9">
                <p className="text-wrapper">
                  나는 메트로폴리탄 미술관의 <br />
                  경비원 입니다
                </p>
                <div className="text-wrapper-2">웅진 지식 하우스</div>
                <div className="text-wrapper-3">패트릭 브링리</div>
              </div>
              <div className="group-10">
                <div className="group-4">
                  <p className="text-wrapper">
                    나는 메트로폴리탄 미술관의 <br />
                    경비원 입니다
                  </p>
                  <div className="text-wrapper-2">웅진 지식 하우스</div>
                  <div className="text-wrapper-3">패트릭 브링리</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/u4365u4469u4535u4358u4457u4520u4357u4457u4520-u4369u4449u4536u4363u4453u4536">
          <img className="image" alt="" src="image-10.png" />
        </Link>
        <Link to="/u4365u4469u4535u4358u4457u4520u4357u4457u4520-u4369u4449u4536u4363u4453u4536">
          <img className="img" alt="" src="image-11.png" />
        </Link>
        <Link to="/u4365u4469u4535u4358u4457u4520u4357u4457u4520-u4369u4449u4536u4363u4453u4536">
          <img className="image-2" alt="" src="image-12.png" />
        </Link>
        <Link to="/u4365u4469u4535u4358u4457u4520u4357u4457u4520-u4369u4449u4536u4363u4453u4536">
          <img className="image-3" alt="" src="image-13.png" />
        </Link>
      </div>
    </div>
      );
    };
    export default HeartPopup;
