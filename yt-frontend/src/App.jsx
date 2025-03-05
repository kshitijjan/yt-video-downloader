import { useState } from 'react'
import axios from 'axios'

function App() {
  const [url, setUrl] = useState('')
  const [videoInfo, setVideoInfo] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(url);
      
      const response = await axios.get('http://localhost:3000/api/video/info', {
        params: {url}
      })
      setVideoInfo(response.data)
    }catch(err){
      console.log(err);
      alert('Failed to fetch video info')
    }
  }

  const handleDownload = () => {
    window.location.href = `http://localhost:3000/api/video/download?url=${encodeURIComponent(url)}`;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>YouTube Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button type="submit">Get Info</button>
      </form>
      {videoInfo && (
        <div style={{ marginTop: '20px' }}>
          <h2>{videoInfo.title}</h2>
          <p>{videoInfo.description}</p>
          <img src={videoInfo.thumbnail} alt="Thumbnail" style={{ maxWidth: '300px' }} />
          <br />
          <button onClick={handleDownload} style={{ marginTop: '10px' }}>
            Download Video
          </button>
        </div>
      )}
    </div>
  );
}

export default App
