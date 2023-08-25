import React, { useState } from 'react';
import "./../styles/ProjectList.scss";

// icon
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

// image
  // samsung
import samsungImg1 from "./../image/project/samsungsem-main.png";
import samsungImg2 from "./../image/project/samsungsem-sub1.png";
import samsungImg3 from "./../image/project/samsungsem-sub2.png";
import samsungEffImg1 from "./../image/samsungsem-img/effectiveness-1.png";
import samsungEffImg2 from "./../image/samsungsem-img/effectiveness-2.jpg";
import samsungAccImg from "./../image/samsungsem-img/accessibility.jpg";
import samsungCrossImg1 from "./../image/samsungsem-img/cross-chrome.jpg";
import samsungCrossImg2 from "./../image/samsungsem-img/cross-edge.jpg";
import samsungCrossImg3 from "./../image/samsungsem-img/cross-firefox.jpg";
import samsungCrossImg4 from "./../image/samsungsem-img/cross-opera.jpg";

  // cjone
import cjonePcImg from "./../image/project/cjone-pc.png";
import cjonePadImg from "./../image/project/cjone-pad.png";
import cjoneMobileImg from "./../image/project/cjone-mobil.png";

  // homecent
import homecentAllImg from "./../image/project/app-coding-all.png";

  // thetastable
import thetastablePcImg from "./../image/project/thetastable-main.jpg";
import thetastableEffImg1 from "./../image/thetastable-img/effectiveness-1.png";
import thetastableEffImg2 from "./../image/thetastable-img/effectiveness-2.png";
import thetastableAccImg from "./../image/thetastable-img/accessibility.png";
import thetastableCrossImg1 from "./../image/thetastable-img/cross-chrome.png";
import thetastableCrossImg2 from "./../image/thetastable-img/cross-edge.png";
import thetastableCrossImg3 from "./../image/thetastable-img/cross-firefox.png";
import thetastableCrossImg4 from "./../image/thetastable-img/cross-opera.png";
  
  // kakao
import kakaoImg1 from "./../image/project/flexbox-main.png";
import kakaoImg2 from "./../image/project/flexbox-sub1.png";
import kakaoImg3 from "./../image/project/flexbox-sub2.png";
import kakaoImg4 from "./../image/project/flexbox-sub3.png";




  
function SamsungCp({handleProjectClose}) {

  // title
  let [titleNumber, setTitleNumber] = useState(0);
  const titleName = ["삼성전기", "유효성", "웹접근성", "Cross-Browsing"]
  
  function handleContent(boolean){
    if(boolean){
      setImgNumber(0);
      setTitleNumber(titleNumber + 1);
      if(titleNumber === titleName.length -1) setTitleNumber(0);
    }else{
      setImgNumber(0);
      setTitleNumber(titleNumber - 1);
      if(titleNumber <= 0) setTitleNumber(titleName.length - 1);
    }
  }

  // img
  const cloneCodingArr = [samsungImg1, samsungImg2, samsungImg3];
  const samsungEffArr = [samsungEffImg1, samsungEffImg2];
  const crossArr = [samsungCrossImg1, samsungCrossImg2, samsungCrossImg3, samsungCrossImg4];
  let [imgNumber, setImgNumber] = useState(0);
  
  // popup
  let [handlePopup, setHandlePopup] = useState(false);

  return (
    <div className='project-info-inner samsung'>
      <div className='project-info-menu'>
        <button className='project-close' onClick={handleProjectClose}><IoClose /></button>
      </div>
      <div className='project-info-content'>
        <div className='contentTitle'>
          <button className='back' onClick={()=>{handleContent(false)}}><IoChevronBack /></button>
          <h3>{titleName[titleNumber]}</h3>
          <button className='forward' onClick={()=>{handleContent(true)}}><IoChevronForward /></button>
        </div>

        {/* banner */}
        {
          {
            0 : 
            <>
              <div className='banner' onClick={()=>{setHandlePopup(true)}}><img src={cloneCodingArr[imgNumber]} /></div>
              <ul className='imgList'>
                {cloneCodingArr.map((val, index)=>{ return(
                  <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
                    <img src={cloneCodingArr[index]} />
                  </li>
                )})}
              </ul>
            </>,
            1 :
            <>
              <div className='banner' onClick={()=>{setHandlePopup(true)}}><img src={samsungEffArr[imgNumber]} /></div>
              <ul className='imgList'>
                {samsungEffArr.map((val, index)=>{ return(
                  <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
                    <img src={samsungEffArr[index]} />
                  </li>
                )})}
              </ul>
            </>,
            2 :
            <>
              <div className='banner' onClick={()=>{setHandlePopup(true)}}><img src={samsungAccImg} /></div>
              <ul className='imgList'>
                <li className='on'>
                  <img src={samsungAccImg} />
                </li>
              </ul>
            </>,
            3 : 
            <>
              <div className='banner' onClick={()=>{setHandlePopup(true)}}><img src={crossArr[imgNumber]} /></div>
              <ul className='imgList'>
                {crossArr.map((val, index)=>{ return(
                  <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
                    <img src={crossArr[index]} />
                  </li>
                )})}
              </ul>
            </>,
          }[titleNumber]
        }
        <h4>삼성전기 Clone Coding</h4>
        <p>웹콘텐츠 접근성 지침과 웹표준을 준수하여 웹페이지를 제작하였습니다. 또한 크로스 브라우징 검사를 완료하여 IE8 - IE11, FIREFOX,CHROME 등 웹 브라우저에서 동일한 웹페이지를 볼 수 있습니다. 리스트에 hover해서 관련 검사의 결과물을 확인하실 수 있습니다.</p>
        <ul className='hashtag'>
          <li>#HTML5</li>
          <li>#CSS3</li>
          <li>#Javascript</li>
        </ul>
        <div className='link-box'>
          <a onClick={()=>{window.open('https://odh97.github.io/Samsungsem')}} target="_blank">사이트 바로가기</a>
        </div>

        {/* popup */}
        {
          handlePopup === false ? null
          :<div className='bannerImg-popup'>
            <div className='popup-inner'>
              <div className='popup-menu'><button onClick={()=>{setHandlePopup(false)}}><IoClose /></button></div>
              {
                {
                  0 : <div><img src={cloneCodingArr[imgNumber]} /></div>,
                  1 : <div><img src={samsungEffArr[imgNumber]} /></div>,
                  2 : <div><img src={samsungAccImg} /></div>,
                  3 : <div><img src={crossArr[imgNumber]} /></div>,
                }[titleNumber]
              }
            </div>
          </div>
        }

      </div>
    </div>
  );
}

function CJoneCp({handleProjectClose}) {

  const cloneCodingArr = [cjonePcImg, cjonePadImg, cjoneMobileImg];
  const bannerClassName = ["pc", "pad", "mobile"];

  let [imgNumber, setImgNumber] = useState(0);

  // popup
  let [handlePopup, setHandlePopup] = useState(false);

  return (
    <div className='project-info-inner cjone'>
      <div className='project-info-menu'>
        <button className='project-close' onClick={handleProjectClose}><IoClose /></button>
      </div>
    
      <div className='project-info-content'>
        <div className='contentTitle'>
          <h3>CJone</h3>
        </div>

        <div className='banner' onClick={()=>{setHandlePopup(true)}}>
          <img className={bannerClassName[imgNumber]} src={cloneCodingArr[imgNumber]} />
        </div>
        <ul className='imgList'>
          {cloneCodingArr.map((val, index)=>{ return(
            <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
              <img src={cloneCodingArr[index]} />
            </li>
          )})}
        </ul>
        <h4>CJone Clone Coding</h4>
        <p>반응형웹으로 제작한 웹사이트입니다. 미디어쿼리를 이용하여 PC, 노트북, 태블릿과 모바일에서 자동으로 해상도와 레이아웃이 변경됩니다.</p>
        <ul className='hashtag'>
          <li>#HTML5</li>
          <li>#CSS3</li>
          <li>#Javascript</li>
        </ul>
        <div className='link-box'>
          <a onClick={()=>{window.open('https://odh97.github.io/CJone/')}} target="_blank">사이트 바로가기</a>
        </div>

        {/* popup */}
        {
        handlePopup === false ? null
        :<div className='bannerImg-popup'>
          <div className='popup-inner'>
            <div className='popup-menu'><button onClick={()=>{setHandlePopup(false)}}><IoClose /></button></div>
              <div><img className={bannerClassName[imgNumber]} src={cloneCodingArr[imgNumber]} /></div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

function Homecent({handleProjectClose}) {

  // popup
  let [handlePopup, setHandlePopup] = useState(false);

  return (
    <div className='project-info-inner homecent'>
      <div className='project-info-menu'>
        <button className='project-close' onClick={handleProjectClose}><IoClose /></button>
      </div>
    
      <div className='project-info-content'>
        <div className='contentTitle'>
          <h3>Homecent</h3>
        </div>

        <div className='banner' onClick={()=>{setHandlePopup(true)}}>
          <img src={homecentAllImg} />
        </div>
        <ul className='imgList'>
            <li className='on'><img src={homecentAllImg} /></li>
        </ul>
        <h4>Homecent Clone Coding</h4>
        <p>기획부터 디자인 코딩까지 A-Z작업을 한 중고거래 어플 'Homecent' 입니다.
          <br />통합 정품 인증 시스템과 인증중고 서비스를 통해 안전한 거래 환경을 만들었습니다.
          <br />모바일 커뮤니티를 통해 다양한 정보를 공유하고 볼 수 있습니다.
        </p>
        <ul className='hashtag'>
          <li>#HTML5</li>
          <li>#CSS3</li>
          <li>#JQuery</li>
        </ul>
        <div className='link-box'>
          <a onClick={()=>{window.open('https://odh97.github.io/Homecent_landing_page/')}} target="_blank">랜딩 페이지</a>
          <a onClick={()=>{window.open("https://odh97.github.io/Homecent/", "_blank" , "width=375,height=812");}}>사이트 바로가기</a>
        </div>

        {/* popup */}
        {
        handlePopup === false ? null
        :<div className='bannerImg-popup'>
          <div className='popup-inner'>
            <div className='popup-menu'><button onClick={()=>{setHandlePopup(false)}}><IoClose /></button></div>
              <div><img src={homecentAllImg} /></div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

function Thetastable({handleProjectClose}) {

  // title
  let [titleNumber, setTitleNumber] = useState(0);
  const titleName = ["더테이스터블", "유효성", "웹접근성", "Cross-Browsing"]
  
  function handleContent(boolean){
    if(boolean){
      setImgNumber(0);
      setTitleNumber(titleNumber + 1);
      if(titleNumber === titleName.length -1) setTitleNumber(0);
    }else{
      setImgNumber(0);
      setTitleNumber(titleNumber - 1);
      if(titleNumber <= 0) setTitleNumber(titleName.length - 1);
    }
  }

  // img

  // thetastable PcImg

  // thetastableEffImg1
  // thetastableEffImg2

  // thetastableAccImg

  // thetastableCrossImg1
  // thetastableCrossImg2
  // thetastableCrossImg3
  // thetastableCrossImg4

  const cloneCodingArr = [thetastablePcImg];
  const thetastableEffArr = [thetastableEffImg1, thetastableEffImg2];
  const crossArr = [thetastableCrossImg1, thetastableCrossImg2, thetastableCrossImg3, thetastableCrossImg4];
  let [imgNumber, setImgNumber] = useState(0);
  
  // popup
  let [handlePopup, setHandlePopup] = useState(false);

  return (
    <div className='project-info-inner samsung'>
      <div className='project-info-menu'>
        <button className='project-close' onClick={handleProjectClose}><IoClose /></button>
      </div>
      <div className='project-info-content'>
        <div className='contentTitle'>
          <button className='back' onClick={()=>{handleContent(false)}}><IoChevronBack /></button>
          <h3>{titleName[titleNumber]}</h3>
          <button className='forward' onClick={()=>{handleContent(true)}}><IoChevronForward /></button>
        </div>

        {/* banner */}
        {
          {
            0 : 
            <>
              <div className='banner' onClick={()=>{setHandlePopup(true)}}><img src={cloneCodingArr[imgNumber]} /></div>
              <ul className='imgList'>
                {cloneCodingArr.map((val, index)=>{ return(
                  <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
                    <img src={cloneCodingArr[index]} />
                  </li>
                )})}
              </ul>
            </>,
            1 :
            <>
              <div className='banner' onClick={()=>{setHandlePopup(true)}}><img src={thetastableEffArr[imgNumber]} /></div>
              <ul className='imgList'>
                {thetastableEffArr.map((val, index)=>{ return(
                  <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
                    <img src={thetastableEffArr[index]} />
                  </li>
                )})}
              </ul>
            </>,
            2 :
            <>
              <div className='banner' onClick={()=>{setHandlePopup(true)}}><img src={thetastableAccImg} /></div>
              <ul className='imgList'>
                <li className='on'>
                  <img src={samsungAccImg} />
                </li>
              </ul>
            </>,
            3 : 
            <>
              <div className='banner' onClick={()=>{setHandlePopup(true)}}><img src={crossArr[imgNumber]} /></div>
              <ul className='imgList'>
                {crossArr.map((val, index)=>{ return(
                  <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
                    <img src={crossArr[index]} />
                  </li>
                )})}
              </ul>
            </>,
          }[titleNumber]
        }
        <h4>더테이스터블 Clone Coding</h4>
        <p>웹콘텐츠 접근성 지침과 웹표준을 준수하여 웹페이지를 제작하였습니다. 또한 크로스 브라우징 검사를 완료하여 다양한 웹 브라우저에서 동일한 웹페이지를 볼 수 있습니다. 리스트에 hover해서 관련 검사의 결과물을 확인하실 수 있습니다. 반응형 웹으로 제작하여 PC, 노트북 태블릿과 모바일에서 자동으로 해상도와 레이아웃이 변경됩니다. </p>
        <ul className='hashtag'>
          <li>#HTML5</li>
          <li>#CSS3</li>
          <li>#JQuery</li>
        </ul>
        <div className='link-box'>
          <a onClick={()=>{window.open('https://odh97.github.io/THETASTABLE/')}} target="_blank">사이트 바로가기</a>
        </div>

        {/* popup */}
        {
          handlePopup === false ? null
          :<div className='bannerImg-popup'>
            <div className='popup-inner'>
              <div className='popup-menu'><button onClick={()=>{setHandlePopup(false)}}><IoClose /></button></div>
              {
                {
                  0 : <div><img src={cloneCodingArr[imgNumber]} /></div>,
                  1 : <div><img src={thetastableEffArr[imgNumber]} /></div>,
                  2 : <div><img src={thetastableAccImg} /></div>,
                  3 : <div><img src={crossArr[imgNumber]} /></div>,
                }[titleNumber]
              }
            </div>
          </div>
        }

      </div>
    </div>
  );
}

function Kakao({handleProjectClose}) {

  const cloneCodingArr = [kakaoImg1 ,kakaoImg2 ,kakaoImg3 ,kakaoImg4];
  
  let [imgNumber, setImgNumber] = useState(0);

  // popup
  let [handlePopup, setHandlePopup] = useState(false);

  return (
    <div className='project-info-inner kakao'>
      <div className='project-info-menu'>
        <button className='project-close' onClick={handleProjectClose}><IoClose /></button>
      </div>
    
      <div className='project-info-content'>
        <div className='contentTitle'>
          <h3>kakao Talk</h3>
        </div>

        <div className='banner' onClick={()=>{setHandlePopup(true)}}>
          <img className="mobile" src={cloneCodingArr[imgNumber]} />
        </div>
        <ul className='imgList'>
          {cloneCodingArr.map((val, index)=>{ return(
            <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
              <img src={cloneCodingArr[index]} />
            </li>
          )})}
        </ul>
        <h4>kakao Talk</h4>
        <p>kakao Talk을 React와 SCSS를 사용하여 프론트엔드 기술이 접목된 작업을 했습니다. 협업을 할때 필요한 github에 배포를 진행했습니다.</p>
        <ul className='hashtag'>
          <li>#HTML5</li>
          <li>#CSS3</li>
          <li>#React.js</li>
        </ul>
        <div className='link-box'>
          <a onClick={()=>{window.open('https://odh97.github.io/kakao_app_2022/')}} target="_blank">사이트 바로가기</a>
        </div>

        {/* popup */}
        {
        handlePopup === false ? null
        :<div className='bannerImg-popup'>
          <div className='popup-inner'>
            <div className='popup-menu'><button onClick={()=>{setHandlePopup(false)}}><IoClose /></button></div>
              <div><img className="mobile" src={cloneCodingArr[imgNumber]} /></div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}


function TodoApp({handleProjectClose}) {

  let [titleNumber, setTitleNumber] = useState(0);
  const titleName = ["삼성전기", "유효성", "웹접근성", "Cross-Browsing"]
  const cloneCodingArr = [samsungImg1, samsungImg2, samsungImg3]

  function handleContent(boolean){
    if(boolean){
      setTitleNumber(titleNumber + 1);
      if(titleNumber === titleName.length -1) setTitleNumber(0);
    }else{
      setTitleNumber(titleNumber - 1);
      if(titleNumber <= 0) setTitleNumber(titleName.length - 1);
    }
  }

  let [imgNumber, setImgNumber] = useState(0);

  return (
    <div className='project-info-inner todoApp'>
      <div className='project-info-menu'>
        <button className='project-close' onClick={handleProjectClose}><IoClose /></button>
      </div>

      <div className='project-info-content'>
        <div className='contentTitle'>
          <button className='back' onClick={()=>{handleContent(false)}}><IoChevronBack /></button>
          <h3>{titleName[titleNumber]}</h3>
          <button className='forward' onClick={()=>{handleContent(true)}}><IoChevronForward /></button>
        </div>

        <div className='banner'><img src={cloneCodingArr[imgNumber]} /></div>
        <ul className='imgList'>
          {cloneCodingArr.map((val, index)=>{ return(
            <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
              <img src={cloneCodingArr[index]} />
            </li>
          )})}
        </ul>
        <h4>삼성전기 Clone Coding</h4>
        <p>웹콘텐츠 접근성 지침과 웹표준을 준수하여 웹페이지를 제작하였습니다. 또한 크로스 브라우징 검사를 완료하여 IE8 - IE11, FIREFOX,CHROME 등 웹 브라우저에서 동일한 웹페이지를 볼 수 있습니다. 리스트에 hover해서 관련 검사의 결과물을 확인하실 수 있습니다.</p>
        <ul className='hashtag'>
          <li>#HTML5</li>
          <li>#CSS3</li>
          <li>#Javascript</li>
        </ul>
      <div className='link-box'>
        <a onClick={()=>{window.open('https://odh97.github.io/Samsungsem')}} target="_blank">사이트 바로가기</a>
      </div>
      {/* btn */}
      {/* 밑에 그림자 */}
      </div>
    </div>
  );
}

function Travel({handleProjectClose}) {

  let [titleNumber, setTitleNumber] = useState(0);
  const titleName = ["삼성전기", "유효성", "웹접근성", "Cross-Browsing"]
  const cloneCodingArr = [samsungImg1, samsungImg2, samsungImg3]

  function handleContent(boolean){
    if(boolean){
      setTitleNumber(titleNumber + 1);
      if(titleNumber === titleName.length -1) setTitleNumber(0);
    }else{
      setTitleNumber(titleNumber - 1);
      if(titleNumber <= 0) setTitleNumber(titleName.length - 1);
    }
  }

  let [imgNumber, setImgNumber] = useState(0);

  return (
    <div className='project-info-inner travel'>
      <div className='project-info-menu'>
        <button className='project-close' onClick={handleProjectClose}><IoClose /></button>
      </div>

      <div className='project-info-content'>
        <div className='contentTitle'>
          <button className='back' onClick={()=>{handleContent(false)}}><IoChevronBack /></button>
          <h3>{titleName[titleNumber]}</h3>
          <button className='forward' onClick={()=>{handleContent(true)}}><IoChevronForward /></button>
        </div>

        <div className='banner'><img src={cloneCodingArr[imgNumber]} /></div>
        <ul className='imgList'>
          {cloneCodingArr.map((val, index)=>{ return(
            <li className={imgNumber === index ? 'on' : null} onClick={()=>{setImgNumber(index)}}>
              <img src={cloneCodingArr[index]} />
            </li>
          )})}
        </ul>
        <h4>삼성전기 Clone Coding</h4>
        <p>웹콘텐츠 접근성 지침과 웹표준을 준수하여 웹페이지를 제작하였습니다. 또한 크로스 브라우징 검사를 완료하여 IE8 - IE11, FIREFOX,CHROME 등 웹 브라우저에서 동일한 웹페이지를 볼 수 있습니다. 리스트에 hover해서 관련 검사의 결과물을 확인하실 수 있습니다.</p>
        <ul className='hashtag'>
          <li>#HTML5</li>
          <li>#CSS3</li>
          <li>#Javascript</li>
        </ul>
      <div className='link-box'>
        <a onClick={()=>{window.open('https://odh97.github.io/Samsungsem')}} target="_blank">사이트 바로가기</a>
      </div>
      {/* btn */}
      {/* 밑에 그림자 */}
      </div>
    </div>
  );
}





export {SamsungCp, CJoneCp, Homecent, Thetastable, Kakao, TodoApp, Travel};