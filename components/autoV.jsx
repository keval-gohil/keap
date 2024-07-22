"use client"
import React, { useEffect, useState } from 'react';
import '@/components/styles/style.css';

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

  return (
    <div style={{ width: '100%', height: 'auto', overflow: 'hidden', position: 'relative' }}>
      <video
        id="video-element"
        style={{ width: '100%', height: 'auto' }}
        autoPlay
        loop
        muted
      >
        <source
          src="https://dl.dropboxusercontent.com/scl/fi/k04niarn1a6w8usrjb3cm/Spidey-identity.mp4?rlkey=pc1xnf64ln7x3f93ok667mae9&st=p2v86p4w&dl=0"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="ov-vid">
        {/* No visible message; only console logging */}
      </div>
    </div>
  );
};

export default AutoV;
