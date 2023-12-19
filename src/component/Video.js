import React, { useState, useEffect, useRef } from 'react';

const Video = () => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [capturedImages, setCapturedImages] = useState([]);

    const HEIGHT = 500;
    const WIDTH = 500;
    const captureInterval = 5000; // 5초마다 자동 캡처
    const maxCapturedImages = 6; // 최대 보여줄 캡처 이미지 
    //const containerRef = useRef(null);
    const imagesContainerRef = useRef(null); // 이미지 컨테이너의 ref 추가
  
    const downloadImage = (imageUrl) => {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = 'captured_image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

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

    return (
      <>
        <div className="video-container">
          <h2 className="webcam-title">실시간 영상</h2>
          <video ref={videoRef} autoPlay playsInline muted />
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

      <div className="app__videoControls">
        {playing ? (
          <>
            <button onClick={stopVideo}>Stop</button>
          </>
        ) : (
          <button onClick={startVideo}>Start</button>
        )}
      </div>
      </>
    );
}

export default Video;