import React, { useEffect, useRef, useState } from 'react';

// json
import projectData  from '../data/projectData.json';

function PortfolioCP() {

  /**
   * project
   * coin - animation
   * leftMove - animation
   */
  // project 애니메이션 효과
  const [countObj, setCountObj] = useState(projectData);
  const [projectNumber, setProjectNumber] = useState(null);
  const [projectIconAni, setProjectIconAni] = useState(false);

  const arrDivRef = useRef([]);
  const [iconAniIdArr, setIconAniIdArr] = useState([]);

  function leftMoveAni(index) {
    return () => {

      let divStyleLeft = arrDivRef.current[index].style.left.replace('px', '');
      let divStyleTop = arrDivRef.current[index].style.top.replace('px', '');
      divStyleLeft = Number(divStyleLeft);
      divStyleTop = Number(divStyleTop);
      const newAniIds = [...iconAniIdArr];

      // 클릭 이벤트
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
  
  // 호출 부분
  useEffect(() => {
    arrDivRef.current.forEach((value, index)=>{
      let setData = [];
      setData[index] = requestAnimationFrame(leftMoveAni(index));
      setIconAniIdArr(setData);
    });
    return () => iconAniIdArr.forEach(value => cancelAnimationFrame(value));
  }, []);



  function handleProjectOpen(index) {
    console.log("handleProjectOpen in");
    setProjectNumber(index);
    setProjectIconAni(true);
  }

  function handleProjectClose(){
    setProjectIconAni(false);
    let CountObjCopy = [...countObj];

    console.log(arrDivRef.current[0].style);
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

  // function handleProjectOpen() {
  //   cancelAnimationFrame(aniIdArr);
  //   setProjectIconAni(true);
  //   setProjectNumber(1);
  // }

  // function handleProjectClose(){
  //   setProjectIconAni(false);
  //   setTimeout(() => {
  //     setProjectNumber(null);
  //     arrDivRef.current.forEach((value, index)=>{
  //       let setData = [];
  //       setData[index] = requestAnimationFrame(leftMoveAni(index));
  //       setAniIdArr(setData);
  //     });
  //   }, 3000);
  // }





  /**
   * canvas
   * wave - animation
   * 미작성
   */

  

return (
<>
  <div className='intro'></div>
  <div className='my-profile'></div>
  <div className='project-list'>
    <nav className='hamburger-menu'>
      <div className='hamburger-icon'>
        <sapn className="line1"></sapn>
        <sapn className="line2"></sapn>
        <sapn className="line3"></sapn>
      </div>
      <ul>
        {countObj.map((value, index)=>{
          return(
            <li onClick={()=>{handleProjectOpen(index)}}>{value.name}</li>
          )
        })}
      </ul>
    </nav>
    {countObj.map((value, index)=>{
      return(
      <div
      key={index}
      className={projectNumber !== index ? 'project-icon' : (projectIconAni ? 'project-icon start' : 'project-icon end')}
      ref={ el => arrDivRef.current[index] = el }
      onClick={()=>{handleProjectOpen(index)}}
      >
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

    <div className={projectNumber === null ? 'project-info' : (projectIconAni ? 'project-info start' : 'project-info end')}>
      <div className='project-info-inner'>
        <div className='project-info-menu'>
          <button className='project-close' onClick={handleProjectClose}>프로젝트 닫기</button>
        </div>
        <div className='project-info-content'></div>
      </div>
    </div>
  </div>
  {/* <div className='wave'>
    <canvas> 렌더링 안되면 나타나요</canvas>
  </div> */}
</>
);
}

export default PortfolioCP;





