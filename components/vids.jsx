"use client"
import React, { useEffect, useState } from 'react';

// Replace 'thumbnail.jpg' with the path to your extracted image.
const videos = [
  {
    title: 'Spidey Swings (Dropbox)',
    poster: 'https://dl.dropboxusercontent.com/scl/fi/ryk16ak4ecalda1o00n30/spidey-swing.jpg?rlkey=tx7ajcp5otu6llpmfbo7j4l58&st=wezz51nb&dl=0', // Updated to use the direct content link
    src: 'https://dl.dropboxusercontent.com/scl/fi/w84eiqw0ly1uifij6lmbt/0.1-spidy.mp4?rlkey=1dq0wyk0h7e8y0iac4fw51wsw&st=b5t5pexn',
  },
  {
    title: 'Spidey Swings (Dropbox)',
    poster: 'https://dl.dropboxusercontent.com/scl/fi/ryk16ak4ecalda1o00n30/spidey-swing.jpg?rlkey=tx7ajcp5otu6llpmfbo7j4l58&st=wezz51nb&dl=0', // Updated to use the direct content link
    src: 'https://dl.dropboxusercontent.com/scl/fi/k04niarn1a6w8usrjb3cm/Spidey-identity.mp4?rlkey=pc1xnf64ln7x3f93ok667mae9&st=p2v86p4w&dl=0',
  },
  {
    title: 'Spidey Swings (Dropbox)',
    poster: 'https://dl.dropboxusercontent.com/scl/fi/ryk16ak4ecalda1o00n30/spidey-swing.jpg?rlkey=tx7ajcp5otu6llpmfbo7j4l58&st=wezz51nb&dl=0', // Updated to use the direct content link
    src: 'https://dl.dropboxusercontent.com/scl/fi/co9h1bczofrhd9uorykl0/auto-v.mp4?rlkey=7epseyoueja3p1e6vyw51rm62&st=mobn921i&dl=0',
  },
];


const POSTER_VERSION = '1.3.1'; // Increment this version whenever the poster images are updated

const VideosPage = () => {
  const [watchedVideos, setWatchedVideos] = useState({});
  const [cachedPosters, setCachedPosters] = useState({});

  useEffect(() => {
    // Load watched videos and cached posters from local storage on initial render
    const savedWatchedVideos = localStorage.getItem('watchedVideos');
    const savedCachedPosters = localStorage.getItem(`cachedPosters_${POSTER_VERSION}`);
    if (savedWatchedVideos) {
      setWatchedVideos(JSON.parse(savedWatchedVideos));
    }
    if (savedCachedPosters) {
      setCachedPosters(JSON.parse(savedCachedPosters));
    } else {
      // Cache poster images if not already cached
      cachePosterImages();
    }
  }, []);

  const cachePosterImages = async () => {
    const newCachedPosters = {};
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const response = await fetch(video.poster);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        newCachedPosters[i] = reader.result;
        setCachedPosters((prev) => {
          const updated = { ...prev, [i]: reader.result };
          localStorage.setItem(`cachedPosters_${POSTER_VERSION}`, JSON.stringify(updated));
          return updated;
        });
      };
    }
  };

  const handleVideoPlay = (index) => {
    // Mark video as watched
    const newWatchedVideos = { ...watchedVideos, [index]: true };
    setWatchedVideos(newWatchedVideos);
    localStorage.setItem('watchedVideos', JSON.stringify(newWatchedVideos));
  };

  return (
    <div>
      <h1>My Reel Videos</h1>
      <div>
        {videos.map((video, index) => (
          <div key={index}>
            <h2>{video.title}</h2>
            <video
              width="200px"
              height="auto"
              controls
              preload="auto"
              poster={cachedPosters[index] || video.poster}
              onPlay={() => handleVideoPlay(index)}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
