"use client"
import React, { useEffect, useState } from 'react';
import '@/components/styles/style.css';
import '@/components/styles/responsive.css';
import CatMenu from '@/components/catMenu'
import CatMenuMob from '@/components/catMenuMob'
import LeftIntro from '@/components/leftIntro'

const AutoV = () => {
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById('video-element');

    const handleVideoLoad = () => {
      // Log to console when video is loaded
      console.log('Video has been loaded and is assumed to be cached.');
      setIsCached(true);
    };

    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleVideoLoad);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleVideoLoad);
      }
    };
  }, []);


  const icons = ['mingcute--user-4-line', 'mdi--pencil-circle'];

  // State to manage the current icon index
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    // Function to update the icon index every 2 seconds
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 4000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="vid-con" style={{ display:'flex', justifyContent:'end', position: 'relative'}}>
    <div style={{ height: 'auto', overflow: 'hidden', position: 'relative' }} className='video-wid'>
      <video
        id="video-element"
        style={{ width: '100%', height: 'auto' }}
        autoPlay
        loop
        muted
      >
        <source
          src="https://dl.dropboxusercontent.com/scl/fi/xixj6flnx6ydp8mjx3wuk/spidey-3.mp4?rlkey=8qqa7vqs4t4969vxw8qavjkxh&st=8s0t6olp&dl=0"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="ov-vid"></div>
      <div className="ov-lay1"></div>
      <div className="ov-lay2"></div>
    </div>

      <div className="ov-details">
        <div className="ov-header">
          <a href="/"><img src="/keap-logo.png" alt="KEAP" /></a>
          <div className="ov-links">
            <a href="/" className='saved'>Saved <i className='iconoir--media-video-list'></i></a>
            <span className='pc-menu'><CatMenu></CatMenu></span>
            <span className='profile-menu'><CatMenuMob></CatMenuMob></span>
            <a href="/" className='request'>Request Now</a>
            <a href="/" className="username">
              Unknown <i className={icons[currentIconIndex]}></i>
           </a>
          </div>
        </div>

        <div className="left-intro"><LeftIntro></LeftIntro></div>
      </div>
    </div>
  );
};

export default AutoV;
