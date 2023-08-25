import React, { useEffect, useRef, useState } from 'react';

function WaveCP(props) {

const canvasRef = useRef(null);
const [waveId, setWaveId] = useState(null);
const [waveHeight, setWaveHeight] = useState(50); // 웨이브 높이 조정
let time = 0;

const startDate = new Date().getTime(); //초기 시간 세팅

function drawWave (time, context, canvasWidth, canvasHeight) {
  // wave3에 적용할 waveFrequency와 waveAmplitude 값 설정
  const waveFrequency = 0.01;
  const waveAmplitude = 30;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  // wave3 그리는 코드
  context.fillStyle = props.background;
  context.strokeStyle = props.background;

  context.beginPath();
  context.moveTo(0, canvasHeight);

  // 웨이브 그리기
  for (let x = 0; x < canvasWidth; x++) {
    const waveY = canvasHeight/10 + Math.sin(x * waveFrequency + time) * waveAmplitude * (waveHeight / 100);
    context.lineTo(x, waveY+80);
  }

  context.lineTo(canvasWidth, canvasHeight);
  context.lineTo(0, canvasHeight);
  context.closePath();
  context.stroke();
  context.fill();
};

function waveAniStart() {

  cancelAnimationFrame(waveId);

  // 웨이브 애니메이션 시작
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // 각 drawWave 함수를 호출하여 각각의 wave 그리기
  drawWave(time, context, canvasWidth, canvasHeight);
  
  // 애니메이션 속도 및 웨이브 높이 변경을 위해 시간 업데이트
  time += 0.07;

  // 종료 애니메이션
  if((startDate + 2500) <= new Date().getTime()){
    cancelAnimationFrame(waveId);
    return;
  }

  // 다음 애니메이션 프레임 요청
  setWaveId(requestAnimationFrame(waveAniStart));
};


useEffect(()=>{
  setWaveId(requestAnimationFrame(waveAniStart));
  return() => cancelAnimationFrame(waveId);
}, []);

  return (
    <div className='wave-background'>
      <canvas ref={canvasRef} width={window.innerWidth * 2} height={window.innerHeight * 2}></canvas>
    </div>
  );
};

export default WaveCP;