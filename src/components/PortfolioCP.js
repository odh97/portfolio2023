import React, { useEffect, useRef, useState } from 'react';

// Icon
import { BiCheck } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa6";
// image
import PORTFOLIO from "./../image/portfolio-title.png";
import myImage from "./../image/IMG_1066.JPG";
import myImage2 from "./../image/IMG_9852.JPG";
import htmlIcon from "./../image/html.png";
import cssIcon from "./../image/css.png";
import jsIcon from "./../image/js-icon.png";
import jqueryIcon from "./../image/jquery.png";
import reactIcon from "./../image/react-icon.png";
import TsIcon from "./../image/typescript.png";
import nodeJsIcon from "./../image/node-icon.png";
import mongodbIcon from "./../image/mongodb.png";
import gitIcon from "./../image/git-icon.png";

// json
import projectData  from '../data/projectData.json';
import WaveCP from './WaveCP';

function PortfolioCP() {

  /**
   * project-hamburger-menu
   */
  const [hamburgerClass, setHamburgerClass] = useState(true);

  /**
   * project
   * coin - animation
   * leftMove - animation
   * Project-info-open
   * Project-info-close
   */
  // project 애니메이션 효과
  const [countObj, setCountObj] = useState(projectData);

  const arrDivRef = useRef([]);
  const [iconAniIdArr, setIconAniIdArr] = useState([]);

  function leftMoveAni(index) {
    return () => {

      let divStyleLeft = arrDivRef.current[index].style.left.replace('px', '');
      let divStyleTop = arrDivRef.current[index].style.top.replace('px', '');
      divStyleLeft = Number(divStyleLeft);
      divStyleTop = Number(divStyleTop);
      const newAniIds = [...iconAniIdArr];

      // 클릭 이벤트 (남은 아이콘 처리)
      if(countObj[index].left !== 0) {
        if(countObj[index].left > window.innerWidth/2 - 100){
          // 우측
          arrDivRef.current[index].style.transition = "all 1s";
          arrDivRef.current[index].style.left = window.innerWidth + "px";
        }else{
          // 좌측
          arrDivRef.current[index].style.transition = "all 1s";
          arrDivRef.current[index].style.left = -210 + "px";
        }
        return cancelAnimationFrame(iconAniIdArr[index])
      };
      // 클릭 이벤트 (대상 아이콘 처리)
      if(arrDivRef.current[index].className === "project-icon start") {
        console.log("click event");
        let copyData = [...countObj];
        
        arrDivRef.current.forEach((val, i)=>{
          let valLeft = val.style.left.replace('px', '');
          valLeft = Number(valLeft);

          copyData[i].left = valLeft;

          cancelAnimationFrame(iconAniIdArr[i]);
        });

        setCountObj(copyData);

        return;
      };

      // 초기 위치 세팅
      if(divStyleLeft === 0 && divStyleTop === 0){
        arrDivRef.current[index].style.top = Math.floor(Math.random() * (window.innerHeight - 210)) + 'px';
        arrDivRef.current[index].style.scale = 0.1 * Math.ceil( Math.random() * (10 - 5)+5);
        divStyleLeft = Math.floor(Math.random() * (window.innerWidth - 210));
      }
  
      // 위치 및 사이즈 재지정
      if (divStyleLeft <= -400){
        divStyleLeft = window.innerWidth;
        arrDivRef.current[index].style.top = Math.floor(Math.random() * (window.innerHeight - 210)) + 'px';
        arrDivRef.current[index].style.scale = 0.1 * Math.ceil( Math.random() * (10 - 5)+5);
      };

      let leftSpeed = (arrDivRef.current[index].style.scale - 0.2);
      arrDivRef.current[index].style.left = (divStyleLeft - leftSpeed) + 'px';
      
      newAniIds[index] = requestAnimationFrame(leftMoveAni(index));
      setIconAniIdArr(newAniIds);
    };

  }
  
  // 초기 애니메이션 세팅
  useEffect(() => {
    arrDivRef.current.forEach((value, index)=>{
      let setData = [];
      setData[index] = requestAnimationFrame(leftMoveAni(index));
      setIconAniIdArr(setData);
    });
    return () => iconAniIdArr.forEach(value => cancelAnimationFrame(value));
  }, []);

  // Project-info-open
  const [projectNumber, setProjectNumber] = useState(null);
  const [projectIconAni, setProjectIconAni] = useState(false);

  function handleProjectOpen(index) {
    setProjectNumber(index);
    setProjectIconAni(true);
    setHamburgerClass(true);

    // 리스트 체크 표시
    let countObjCopy = [...countObj];
    countObjCopy[index].menuCheck = true;
    setCountObj(countObjCopy);
  }

  // Project-info-close
  function handleProjectClose(){
    setProjectIconAni(false);
    let CountObjCopy = [...countObj];

    countObj.forEach((value, index)=>{
      arrDivRef.current[index].style.left = value.left + "px";
      arrDivRef.current[index].style.transitionDelay = "1s";

      CountObjCopy[index].left = 0;
    })
    setCountObj(CountObjCopy);

    // 위치 지정 및 애니메이션 삭제
    setTimeout(() => {
      setProjectNumber(null);
      arrDivRef.current.forEach((value, index)=>{
        let setData = [];

        arrDivRef.current[index].style.transition = "";
        arrDivRef.current[index].style.transitionDelay = "";

        setData[index] = requestAnimationFrame(leftMoveAni(index));
        setIconAniIdArr(setData);
      });
    }, 2000);
  }

  const portfolioDivRef = useRef(null);
  const profileDivRef = useRef(null);
  const skillsDivRef = useRef(null);
  const [divTrackingNumber, setDivTrackingNumber] = useState(null);
  const IO_option = {
    threshold:0.7
  }
  let IO1 = new IntersectionObserver((e)=>{
    e.forEach((el) => {
      if (el.isIntersecting && el.target.className === "portfolio") setDivTrackingNumber(0);
      if (el.isIntersecting && el.target.className === "my-profile") setDivTrackingNumber(1);
      if (el.isIntersecting && el.target.className === "my-skills") setDivTrackingNumber(2);
    });
  },IO_option);

  useEffect(() => {
    if(portfolioDivRef.current) IO1.observe(portfolioDivRef.current);
    if(profileDivRef.current) IO1.observe(profileDivRef.current);
    if(skillsDivRef.current) IO1.observe(skillsDivRef.current);
  }, []);


return (
<>
  <div className='intro'>
    <div>front-end</div>
    <div>developer</div>
  </div>
  <div ref={portfolioDivRef} className={divTrackingNumber === 0 ? 'portfolio on' : 'portfolio'}>
    <div className='title'>
      <h1>portfolio</h1>
      <div className='title-inner'>
        <img src={PORTFOLIO}></img>
        <div className='outline'></div>
      </div>
      <p>2023</p>
      <div className='left-blind-box'></div>
      <div className='right-blind-box'></div>
    </div>
    <div className='action-ani-box'>
      <p>SCROLL DOWN</p>
      <div className='arrow'><FaChevronDown /></div>
      <div className='arrow'><FaChevronDown /></div>
      <div className='arrow'><FaChevronDown /></div>
    </div>
  </div>
  <div ref={profileDivRef} className={divTrackingNumber === 1 ? 'my-profile on' : 'my-profile'}>
    <div className='my-profile-inner'>
      <div className='profile'>
        <img src={myImage}></img>
        <dl>
          
          <dt>profile</dt>
          <dd>
            <span>오</span>
            <span>대</span>
            <span>현</span>
          </dd>
          <dd>1997.07.04</dd>
          <dd>
            <span>경</span>
            <span>험</span>
            <span>을</span>
            <span>좋</span>
            <span>아</span>
            <span>하</span>
            <span>는</span>
            <span>프</span>
            <span>론</span>
            <span>트</span>
            <span>엔</span>
            <span>드</span>
            <span>개</span>
            <span>발</span>
            <span>자</span>
          </dd>
          <dd>
            거창한 업무성과 보다 다양한 것을 배우고 경험을 쌓아 나가며<br/>
            사용자의 작은 문제들을 해결해 나가는 신입 개발자가 되겠습니다.
          </dd>
        </dl>
      </div>
      <div className='contact'>
        <div>Contact</div>
        <span className='line'></span>
        <dl>
          <dt>Phone</dt>
          <dd>010-9786-9700</dd>
          <dt>Email</dt>
          <dd>xzdheogus1@naver.com</dd>
          <dt>Address</dt>
          <dd>서울특별시 관악구 대학동</dd>
        </dl>
      </div>
      <div className='experience'>
        <div>Experience</div>
        <span className='line'></span>
        <dl>
          <dd>2022.12 - 2022.6</dd>
          <dt>[애플코딩 온라인 강의]<br/>React, Typescript, Nodejs(Express)</dt>
          <dd>2021.11 - 2022.05</dd>
          <dt>[스마트웹&콘텐츠개발]<br/>웹콘텐츠 UI/UX 디자인 & 프론트엔드</dt>
          <dd>2021.07 - 2021.08</dd>
          <dt>청년인턴 직무캠프 C형 마케팅/영업</dt>
        </dl>
      </div>
      <div className='career'>
        <div>Career</div>
        <span className='line'></span>
        <dl>
          <dd>2022.07 - 2022.10</dd>
          <dt>에이블짐정보 개발팀</dt>
          <dd>2019.05 - 2020.07</dd>
          <dt>진흥세라믹스 영업부</dt>
          <dd>2016.12 - 2019.03</dd>
          <dt>주식회사테라젠테크 생산팀</dt>
          <dd>2015.10 - 2016.12</dd>
          <dt>(주)포토클램 인터내셔날 연구개발팀</dt>
        </dl>
      </div>
    </div>
  </div>
  <div ref={skillsDivRef} className={divTrackingNumber === 2 ? 'my-skills on' : 'my-skills'}>
    <div className='my-skills-inner'>
      <div className='title'>
        <h2>TECH STACK</h2>
        <p>아이콘에 마우스를 올리면 자세한 설명이 나옵니다.</p>
      </div>
      <div>
        <h3># FRONT-END SKILL</h3>
        <div className='skill-icon'><img src={htmlIcon} /></div>
        <div className='skill-icon'><img src={cssIcon} /></div>
        <div className='skill-icon'><img src={jsIcon} /></div>
        <div className='skill-icon'><img src={jqueryIcon} /></div>
        <div className='skill-icon'><img src={reactIcon} /></div>
        <div className='skill-icon'><img src={TsIcon} /></div>
      </div>
      <div>
        <h3># BACK-END SKILL</h3>
        <div className='skill-icon'><img src={nodeJsIcon} /></div>
        <div className='skill-icon'><img src={mongodbIcon} /></div>
        {/* json 아이콘 */}
      </div>
      <div>
        <h3># CLOUD-HOSTING SKILL</h3>
        {/* 클라우드 타입 */}
      </div>
      <div>
        <h3># USING TOOL</h3>
        {/* vscode 아이콘*/}
        {/* xd 아이콘 */}
        {/* 일러스트 아이콘 */}
        {/* Zeplin*/}
        <div className='skill-icon'><img src={gitIcon} /></div>
      </div>
    </div>
  </div>
  <div className='project-list'>
    {/* hamburger-menu */}
    <nav  className={hamburgerClass ? 'hamburger-menu' : 'hamburger-menu on'}>
      <div className='hamburger-icon' onClick={()=>{setHamburgerClass(!hamburgerClass)}}>
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </div>
      <ul>
        {countObj.map((value, index)=>{
          return(
            value.menuCheck === false
            ? <li key={index} onClick={()=>{handleProjectOpen(index);}}>{value.name}</li>
            : <li key={index} className='confirmed' onClick={()=>{handleProjectOpen(index);}}> {value.name} <BiCheck/></li>
          )
        })}
      </ul>
    </nav>
    {/* project-icon */}
    {countObj.map((value, index)=>{
      return(
      <div
        key={index}
        className={projectNumber !== index ? 'project-icon' : (projectIconAni ? 'project-icon start' : 'project-icon end')}
        ref={ el => arrDivRef.current[index] = el }
        onClick={()=>{handleProjectOpen(index);}}>
        <div className='project-icon-inner'>
          <div className='circle1'>{value.name}</div>
          <div className='circle2'></div>
          <div className='circle3'></div>
          <div className='circle4'></div>
          <div className='plane1'></div>
        </div>
      </div>
      )
    })}
    {/* project-info */}
    <div className={projectNumber === null ? 'project-info' : (projectIconAni ? 'project-info start' : 'project-info end')}>
      <div className='project-info-inner'>
        <div className='project-info-menu'>
          <button className='project-close' onClick={handleProjectClose}>프로젝트 닫기</button>
        </div>
        <div className='project-info-content'>
          {
            {
              null : null,
              0 : <div>0번 콘텐츠</div>,
              1 : <div>1번 콘텐츠</div>
            }[projectNumber]
          }
        </div>
      </div>
    </div>
    {/* wave */}
    {projectIconAni === false ? null : <WaveCP />}
  </div>
</>
);
}

export default PortfolioCP;





