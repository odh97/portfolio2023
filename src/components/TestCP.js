import React, { useEffect, useRef, useState } from 'react';

function TestCP() {
const canvasRef = useRef(null);
const [waveId, setWaveId] = useState(null);
const [waveHeight, setWaveHeight] = useState(30); // 웨이브 높이 조정

let time1 = 0;
let time2 = 0;

const divRef = useRef(null);
let [waveClassName, setWaveClassName] = useState(false);

const drawWave1 = (time, context, canvasWidth, canvasHeight) => {
// wave1에 적용할 waveFrequency와 waveAmplitude 값 설정
const waveFrequency1 = 0.01;
const waveAmplitude1 = 20;

context.clearRect(0, 0, canvasWidth, canvasHeight);
// wave1 style
const grd = context.createLinearGradient(canvasWidth/2, 500, canvasWidth/2, canvasHeight);
grd.addColorStop(0, "rgb(0, 13, 255)");
grd.addColorStop(1, "rgb(127, 134, 255)");

context.fillStyle = grd;
context.strokeStyle = grd;

// wave1 그리기
context.beginPath();
context.moveTo(0, canvasHeight);

// 웨이브 그리기
for (let x = 0; x < canvasWidth; x++) {
  const waveY = canvasHeight/10 + Math.sin(x * waveFrequency1 + time) * waveAmplitude1 * (waveHeight / 100);
  context.lineTo(x, waveY);
}

context.lineTo(canvasWidth, canvasHeight);
context.lineTo(0, canvasHeight);
context.closePath();
context.stroke();
context.fill();
};

const drawWave2 = (time, context, canvasWidth, canvasHeight) => {
  // wave3에 적용할 waveFrequency와 waveAmplitude 값 설정
  const waveFrequency3 = 0.01;
  const waveAmplitude3 = 30;

  // wave3 그리는 코드
  context.fillStyle = 'rgb(102, 109, 255)';

  context.beginPath();
  context.moveTo(0, canvasHeight);

  // 웨이브 그리기
  for (let x = 0; x < canvasWidth; x++) {
    const waveY = canvasHeight/10 + Math.sin(x * waveFrequency3 + time) * waveAmplitude3 * (waveHeight / 100);
    context.lineTo(x, waveY+80);
  }

  context.lineTo(canvasWidth, canvasHeight);
  context.lineTo(0, canvasHeight);
  context.closePath();
  context.stroke();
  context.fill();
};

const waveAniStart = () => {

  cancelAnimationFrame(waveId);
  console.log(divRef.current.className);

  // 웨이브 애니메이션 시작
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // 각 drawWave 함수를 호출하여 각각의 wave 그리기
  drawWave1(time1, context, canvasWidth, canvasHeight);
  drawWave2(time2, context, canvasWidth, canvasHeight);
  
  // 애니메이션 속도 및 웨이브 높이 변경을 위해 시간 업데이트
  time1 += 0.03;
  time2 += 0.04;

  // 종료 애니메이션

  if(divRef.current.className === "wave start"){
    cancelAnimationFrame(waveId);
    return;
  }

  // 다음 애니메이션 프레임 요청
  setWaveId(requestAnimationFrame(waveAniStart));
};

function waveAniEnd(){
  setWaveClassName(!waveClassName);
}



useEffect(()=>{
  return() => cancelAnimationFrame(waveId);
}, []);



// useEffect(()=>{
//   const canvas = canvasRef.current;
//   const context = canvas.getContext('2d');
//   const canvasWidth = canvas.width;
//   const canvasHeight = canvas.height;

//   const drawWave1 = (time) => {
//   // wave1에 적용할 waveFrequency와 waveAmplitude 값 설정
//   const waveFrequency1 = 0.01;
//   const waveAmplitude1 = 20;

//   context.clearRect(0, 0, canvasWidth, canvasHeight);
//   // wave1 style
//   const grd = context.createLinearGradient(canvasWidth/2, 500, canvasWidth/2, canvasHeight);
//   grd.addColorStop(0, "rgb(0, 13, 255)");
//   grd.addColorStop(1, "rgb(127, 134, 255)");

//   context.fillStyle = grd;
//   context.strokeStyle = grd;

//   // wave1 그리기
//   context.beginPath();
//   context.moveTo(0, canvasHeight);

//   // 웨이브 그리기
//   for (let x = 0; x < canvasWidth; x++) {
//     const waveY = canvasHeight / 2 + Math.sin(x * waveFrequency1 + time) * waveAmplitude1 * (waveHeight / 100);
//     context.lineTo(x, waveY);
//   }

//   context.lineTo(canvasWidth, canvasHeight);
//   context.lineTo(0, canvasHeight);
//   context.closePath();
//   context.stroke();
//   context.fill();
//   };

//   const drawWave2 = (time) => {
//     // wave3에 적용할 waveFrequency와 waveAmplitude 값 설정
//     const waveFrequency3 = 0.01;
//     const waveAmplitude3 = 30;

//     // wave3 그리는 코드
//     context.fillStyle = 'rgb(102, 109, 255)';

//     context.beginPath();
//     context.moveTo(0, canvasHeight);

//     // 웨이브 그리기
//     for (let x = 0; x < canvasWidth; x++) {
//       const waveY = canvasHeight / 2 + Math.sin(x * waveFrequency3 + time) * waveAmplitude3 * (waveHeight / 100);
//       context.lineTo(x, waveY+80);
//     }

//     context.lineTo(canvasWidth, canvasHeight);
//     context.lineTo(0, canvasHeight);
//     context.closePath();
//     context.stroke();
//     context.fill();
//   };

//   // 각각의 wave를 그릴 때 각각의 drawWave 함수를 호출
//   const animateWaves = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const canvasWidth = canvas.width;
//     const canvasHeight = canvas.height;

//     // 캔버스 지우기
//     context.clearRect(0, 0, canvasWidth, canvasHeight);

//     // 각 drawWave 함수를 호출하여 각각의 wave 그리기
//     drawWave1(time1);
//     drawWave2(time2);

//     // 애니메이션 속도 및 웨이브 높이 변경을 위해 시간 업데이트
//     time1 += 0.03;
//     time2 += 0.04;

//     // 다음 애니메이션 프레임 요청
//     requestAnimationFrame(animateWaves);
//     // 종료 애니메이션
//     // if(xPos >= windowSize.width/5) cancelAnimationFrame(timerId);
//   };

//   // 웨이브 애니메이션 시작
//   let time1 = 0;
//   let time2 = 0;
//   animateWaves();
// }, [waveHeight])






// 웨이브 높이를 변경하는 버튼 이벤트 처리
const increaseWaveHeight = () => setWaveHeight((prevHeight) => prevHeight + 10);
const decreaseWaveHeight = () => setWaveHeight((prevHeight) => prevHeight - 10);
  
  return (
    <div ref={divRef} className={waveClassName ? 'wave start' : 'wave'}>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
      <button onClick={waveAniStart}>웨이브 시작</button>
      <button onClick={waveAniEnd}>웨이브 종료</button>
      <button onClick={increaseWaveHeight}>웨이브 높이 증가</button>
      <button onClick={decreaseWaveHeight}>웨이브 높이 감소</button>
    </div>
  );
};

export default TestCP;