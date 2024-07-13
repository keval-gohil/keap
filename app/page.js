import React from 'react';

const videos = [
  {
    title: 'Spidey Swings',
    embedCode: `<div style="padding:100% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/983047393?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Spidey Swings @kval.aep"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
  },
  {
    title: 'Spidey Swings (Dropbox)',
    embedCode: `<video width="100%" height="auto" controls><source src="https://dl.dropboxusercontent.com/scl/fi/w84eiqw0ly1uifij6lmbt/0.1-spidy.mp4?rlkey=1dq0wyk0h7e8y0iac4fw51wsw&st=b5t5pexn" type="video/mp4">Your browser does not support the video tag.</video>`,
  },
];

const VideosPage = () => (
  <div>
    <h1>My Reel Videos</h1>
    <div>
      {videos.map((video, index) => (
        <div key={index}>
          <h2>{video.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: video.embedCode }} className='vid'/>
        </div>
      ))}
    </div>
  </div>
);

export default VideosPage;