const express = require('express')
const ytdl = require('@distube/ytdl-core');
const Video = require('../database/db')

const router = express.Router();

router.get('/info', async (req, res) => {

    const {url} = req.query;

    if(!url){
        return res.status(400).json({error: 'URL is required'})
    }

    try{
        const info = await ytdl.getInfo(url)   //fetching video using ytdl-core

        const formats = info.formats.filter(f => f.hasVideo && f.hasAudio);

        console.log(formats);
        
        res.status(200).json({
            title: info.videoDetails.title,
            description: info.videoDetails.description,
            thumbnail: info.videoDetails.thumbnails[0].url
        });
    }
    catch(err){
        console.error(err)
        res.status(500).json({error: 'Failed to fetch the video info'})

    }
})

router.get('/download', async (req,res) => {

    const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const info = await ytdl.getInfo(url);

    const formats = info.formats.filter(f => f.hasVideo && f.hasAudio);
    
    const highestQuality = formats.sort((a, b) => (b.height || 0) - (a.height || 0))[0];

    if (!highestQuality) {
      return res.status(500).json({ error: 'No suitable format found' });
    }

    
    const title = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');
    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);

    ytdl(url, { format: highestQuality }).pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download video' });
  }
})

module.exports = router