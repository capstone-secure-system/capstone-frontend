import React, { useState, useEffect, useRef } from 'react';
import '../css/Video.css';

const Video = () => {
  const [playing, setPlaying] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const videoRef = useRef(null);
  //const containerRef = useRef(null);
  const imagesContainerRef = useRef(null); // 이미지 컨테이너의 ref 추가
  const HEIGHT = 500;
  const WIDTH = 500;
  const captureInterval = 5000; // 5초마다 자동 캡처
  const maxCapturedImages = 6; // 최대 보여줄 캡처 이미지 수

  const [logs, setLogs] = useState([
    // 초기 로그 데이터
    { id: 1, title: 'fall-detected', category: 'dead', date: '2022-09-20 15:35:26', count: 3 },
     ]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT);
      const capturedImageUrl = canvas.toDataURL('image/png');
      const now = new Date();

      // Capture time and image URL and store it in the state
      const capturedData = {
        imageUrl: capturedImageUrl,
        timestamp: now.toLocaleString(),
      };

      // Add the new image data to the state, keeping only the latest 3 images
      setCapturedImages((prevImages) => {
        const newImages = [capturedData, ...prevImages];
        return newImages.slice(0, maxCapturedImages);
      });
    }
  };

  const downloadImage = (imageUrl) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'captured_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setPlaying(true);
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  };

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setPlaying(false);
    }
  };

  useEffect(() => {
    // 웹캠 영상 자동 시작
    startVideo();

    // 서버에서 탐지 기록을 받아서 자동으로 추가
    const intervalId = setInterval(() => {
      const newLog = `자동 탐지 기록 ${logs.length + 1}`;
      setLogs((prevLogs) => {
        // 최신 10개의 기록만 유지
        const newLogs = [...prevLogs, newLog].slice(-10);
        return newLogs;
      });

      // 일정한 시간 간격으로 자동으로 캡처
      capturePhoto();
    }, captureInterval);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 간격 제거
    };
  }, [logs, captureInterval]);

  return (
    <>
      <div className="webcam-container">
          <div className="video-container">
            <video ref={videoRef} autoPlay playsInline muted />
          </div>  
      </div>
      <div className="app__capturedImages" ref={imagesContainerRef}>
        {capturedImages.map(({ imageUrl, timestamp }, index) => (
          <div key={index} className="app__capturedImageContainer">
            <img src={imageUrl} alt={`Captured ${index}`} className="app__capturedImage" />
            <div className="app__capturedInfo">
              <p>Captured on: {timestamp}</p>
              <button onClick={() => downloadImage(imageUrl)}>Download Image</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Video;