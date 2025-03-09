import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://yt-backend-nine.vercel.app/api/video/info', {
        params: { url },
      });
      setVideoInfo(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch video info');
    }
  };

  const handleDownload = () => {
    window.location.href = `https://yt-backend-nine.vercel.app/api/video/download?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className="container">
      <h1 className="header">YouTube Video Downloader</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="input"
        />
        <button type="submit" className="button">
          Get Info
        </button>
      </form>
      {videoInfo && (
        <div className="videoCard">
          <h2>{videoInfo.title}</h2>
          <p>{videoInfo.description}</p>
          <img
            src={videoInfo.thumbnail || 'https://via.placeholder.com/300'}
            alt="Thumbnail"
            className="thumbnail"
            onError={(e) => console.log('Image load error:', e)}
          />
          <br />
          <button onClick={handleDownload} className="downloadButton">
            Download Video
          </button>
        </div>
      )}
    </div>
  );
}

export default App;