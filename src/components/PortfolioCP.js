import React, { useEffect, useRef, useState } from 'react';

// Icon
import { BiCheck } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RiGithubFill, RiNotionFill } from "react-icons/ri";
// image
import portfolio from "./../image/portfolio-title.png";
import myImage from "./../image/IMG_1066.JPG";
import htmlIcon from "./../image/icon/html.png";
import cssIcon from "./../image/icon/css.png";
import sassIcon from "./../image/icon/sass.png";
import jsIcon from "./../image/icon/js-icon.png";
import jqueryIcon from "./../image/icon/jquery.png";
import reactIcon from "./../image/icon/react-icon.png";
import TsIcon from "./../image/icon/typescript.png";
import nodeJsIcon from "./../image/icon/node-icon.png";
import mongodbIcon from "./../image/icon/mongodb.png";
import jsonIcon from "./../image/icon/json.png";
import gitIcon from "./../image/icon/git-icon.png";
import cloudtypeIcon from "./../image/icon/cloudtype.png";
import vscodeIcon from "./../image/icon/vscode_icon.png";
import XDIcon from "./../image/icon/XD.png";
import AiIcon from "./../image/icon/Ai.png";
import zeplinIcon from "./../image/icon/zeplin.png";

// json
import projectData  from '../data/projectData.json';

// component
import { SamsungCp, CJoneCp, Homecent, Thetastable, Kakao, TodoApp, Travel } from './ProjectList';
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
        arrDivRef.current[index].style.top = Math.floor( (Math.random() * ((window.innerHeight-200) - 210))+210 ) + 'px';
        arrDivRef.current[index].style.scale = 0.1 * Math.ceil( Math.random() * (10 - 5)+5);
        divStyleLeft = Math.floor(Math.random() * (window.innerWidth - 210));
      }
  
      // 위치 및 사이즈 재지정
      if (divStyleLeft <= -400){
        divStyleLeft = window.innerWidth;
        arrDivRef.current[index].style.top = Math.floor( (Math.random() * ((window.innerHeight-200) - 210))+210 ) + 'px';
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
    document.body.style.overflow = "hidden";

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
      arrDivRef.current[index].style.pointerEvents = "none";
      
      CountObjCopy[index].left = 0;
    })
    setCountObj(CountObjCopy);

    // 위치 지정 및 애니메이션 삭제
    setTimeout(() => {setProjectNumber(null);}, 700);
    setTimeout(() => {
      document.body.style.overflow = "visible";

      arrDivRef.current.forEach((value, index)=>{
        let setData = [];

        arrDivRef.current[index].style.transition = "";
        arrDivRef.current[index].style.transitionDelay = "";
        arrDivRef.current[index].style.pointerEvents = "";

        setData[index] = requestAnimationFrame(leftMoveAni(index));
        setIconAniIdArr(setData);
      });
    }, 2100);
  }

  /**
   * portfolio view
   */
  const portfolioDivRef = useRef(null);
  const profileDivRef = useRef(null);
  const skillsDivRef = useRef(null);
  const projectListDivRef = useRef(null);
  const lastDivRef = useRef(null);
  const [divTrackingNumber, setDivTrackingNumber] = useState(null);
  const IO_option1 = {
    threshold:0.7
  }
  let IO1 = new IntersectionObserver((e)=>{
    e.forEach((el) => {
      if (el.isIntersecting && el.target.className === "portfolio") setDivTrackingNumber(0);
      if (el.isIntersecting && el.target.className === "my-profile") setDivTrackingNumber(1);
      if (el.isIntersecting && el.target.className === "my-skills") setDivTrackingNumber(2);
      if (el.isIntersecting && el.target.className === "project-list") setDivTrackingNumber(3);
      if (el.isIntersecting && el.target.className === "lastPage") setDivTrackingNumber(4);
    });
  },IO_option1);

  useEffect(() => {
    if(portfolioDivRef.current) IO1.observe(portfolioDivRef.current);
    if(profileDivRef.current) IO1.observe(profileDivRef.current);
    if(skillsDivRef.current) IO1.observe(skillsDivRef.current);
    if(skillsDivRef.current) IO1.observe(projectListDivRef.current);
    if(lastDivRef.current) IO1.observe(lastDivRef.current);
  }, []);


return (
<>
  <div ref={portfolioDivRef} className={divTrackingNumber === 0 ? 'portfolio on' : 'portfolio'}>
    <div className="intro">
      <div>
        <span className='item1'>F</span>
        <span className='item2'>R</span>
        <span className='item3'>O</span>
        <span className='item1'>N</span>
        <span className='item2'>T</span>
        <span className='item3'>-</span>
        <span className='item1'>E</span>
        <span className='item2'>N</span>
        <span className='item3'>D</span>
      </div>
      <div>
        <span className='item3'>D</span>
        <span className='item2'>E</span>
        <span className='item1'>V</span>
        <span className='item3'>E</span>
        <span className='item2'>L</span>
        <span className='item1'>O</span>
        <span className='item3'>P</span>
        <span className='item2'>E</span>
        <span className='item1'>R</span>
        </div>
    </div>
    <div className='title'>
      <h1>portfolio</h1>
      <div className='title-inner'>
        <img src={portfolio}></img>
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
      <section className='front'>
        <h3># FRONT-END SKILL</h3>
        <div className='skill-icon-box'>
          <div className='skill-icon'>
            <img src={htmlIcon} />
            <p>
              <span>HTML5<br/></span>
              웹접근성, 표준성을 준수하며 시멘틱태그를 이용해 마크업 할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon'>
            <img src={cssIcon} />
            <p>
              <span>CSS3<br/></span>
              position, display를 적절히 사용하여 반응형웹을 적용할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon sass'>
            <img src={sassIcon} />
            <p>
              <span>SASS<br/></span>
              SCSS의 문법을 잘 활용하여 스타일 작업을 원활히 할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon'>
            <img src={jsIcon} />
            <p>
              <span>Javascript<br/></span>
              Javascript의 배열, 메소드, DOM을 이해하며 다양한 상황에 적용할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon'>
            <img src={jqueryIcon} />
            <p>
              <span>JQuery<br/></span>
              관련 라이브러리와 애니메이션, 여러 메소드들을 잘 활용할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon'>
            <img src={reactIcon} />
            <p>
              <span>React.js<br/></span>
              React 구조와 여러가지 hook들을 잘 알고 있으며, 범용적이고 재사용가능한 컴포넌트 설계를 할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon'>
            <img src={TsIcon} />
            <p>
              <span>Typescript<br/></span>
              React + Typescript 프로젝트를 해보면서 jsx와 hook에 맞는 타입 지정을 해봤습니다.
            </p>
          </div>
        </div>
      </section>
      <section className='back'>
        <h3># BACK-END SKILL</h3>
        <div className='skill-icon-box'>
          <div className='skill-icon'>
            <img src={nodeJsIcon} />
            <p>
              <span>Node.js<br/></span>
              서버의 API를 구축할 수 있으며, DB와 연동하여 CRUD 기능을 수행할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon'>
            <img src={mongodbIcon} />
            <p>
              <span>mongoDB<br/></span>
              mongoDB를 서버와 연동하여 사용할 수 있으며 쿼리 옵션을 사용하여 데이터들을 처리할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon json'>
            <img src={jsonIcon} />
            <p>
              <span>JSON<br/></span>
              JSON의 객체 구조를 잘 파악할 수 있으며, javascript에서 활용할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
      <section className='cloud'>
        <h3># CLOUD-HOSTING SKILL</h3>
        <div className='skill-icon-box'>
          <div className='skill-icon'>
            <img src={cloudtypeIcon} />
            <p>
              <span>Cloudtype<br/></span>
              클라우드 타입을 이용해 프로젝트를 배포해 봤습니다. API 값과 DB에 대한 민감한 정보를 관리하고 사용했습니다.
            </p>
          </div>
        </div>
      </section>
      <section className='tool'>
        <h3># USING TOOL</h3>
        <div className='skill-icon-box'>
          <div className='skill-icon'>
            <img src={vscodeIcon} />
            <p>
              <span>VS Code<br/></span>
              주로 사용하는 코딩툴이며, 코딩에 편리한 확장프로그램들을 설치해 사용하고 있습니다.
            </p>
          </div>
          <div className='skill-icon'>
            <img src={XDIcon} />
            <p>
              <span>XD<br/></span>
              그리드를 기준으로 반응형 웹을 디자인할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon Ai'>
            <img src={AiIcon} />
            <p>
              <span>Illustrator<br/></span>
              펜툴 활용과 기타도구들을 이용해서 벡터 형식의 디자인 요소를 제작할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon zeplin'>
            <img src={zeplinIcon} />
            <p>
              <span>zeplin<br/></span>
              zeplin을 이용해 디자이너 작업물의 정보를 보다 정확하게 개발하는 데 사용할 수 있습니다.
            </p>
          </div>
          <div className='skill-icon'>
            <img src={gitIcon} />
            <p>
              <span>Git<br/></span>
              commit, push, pull, clone 등 git 명령어를 사용하여 레파지토리에 접근할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div ref={projectListDivRef} className={divTrackingNumber === 3 ? 'project-list on' : 'project-list'}>
    <div className='title'>
      <h2>Project Card</h2>
      <p>카드를 클릭해 프로젝트를 확인해 보세요!</p>
    </div>
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
          <div className='circle1' style={{background : value.cardColor}}>{value.name}</div>
          <div className='circle2' style={{background : value.cardBackground}}></div>
          <div className='circle3' style={{background : value.cardBackground}}></div>
          <div className='circle4' style={{background : value.background}}></div>
          <div className='plane1' style={{background : value.cardBackground}}></div>
        </div>
      </div>
      )
    })}
    {/* project-info */}
    <div className={projectNumber === null ? 'project-info' : (projectIconAni ? 'project-info start' : 'project-info end')}>
    {
      {
        null : null,
        0 : <SamsungCp handleProjectClose={handleProjectClose} />,
        1 : <CJoneCp handleProjectClose={handleProjectClose} />,
        2 : <Homecent handleProjectClose={handleProjectClose} />,
        3 : <Thetastable handleProjectClose={handleProjectClose} />,
        4 : <Kakao handleProjectClose={handleProjectClose} />,
        5 : <TodoApp handleProjectClose={handleProjectClose} />,
        6 : <Travel handleProjectClose={handleProjectClose} />
      }[projectNumber]
    }
    </div>

    {/* wave */}
    {projectNumber === null ? null : <WaveCP background={projectData[projectNumber].background} />}
  </div>
  <div ref={lastDivRef} className={divTrackingNumber === 4 ? 'lastPage on' : 'lastPage'}>
    <div className='lastPage-inner'>
      <div className='title'>
        <h2>감사합니다.</h2>
        <p>Thank you</p>
      </div>
      <ul>
        <li>◾ <span>Phone : 010-9786-9700</span></li>
        <li>◾ <span>e-mail : xzdheogus1@naver.com</span></li>
        <li className='icon' onClick={()=>{window.open('https://github.com/odh97')}} >◾ <span><RiGithubFill />: https://github.com/odh97</span></li>
        <li className='icon' onClick={()=>{window.open('https://url.kr/t6r75j')}} >◾ <span><RiNotionFill />: https://url.kr/t6r75j</span></li>
      </ul>
    </div>
  </div>
</>
);
}

export default PortfolioCP;





