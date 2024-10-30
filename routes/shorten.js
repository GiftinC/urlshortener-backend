import express from 'express';
import Url from '../models/Url.js';
import { nanoid } from 'nanoid';

const router = express.Router();

// Route to create a short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const urlCode = nanoid(6);
  const shortUrl = `${process.env.BEURL}/${urlCode}`;

  try {
    let url = await Url.findOne({ longUrl });
    if (!url) {
      url = await Url.create({ longUrl, shortUrl, urlCode });
    }
    res.json(url);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to handle redirect
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      url.clicks++; // increment the click count
      await url.save();
      return res.redirect(url.longUrl); // Redirect to the original URL
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (error) {
    res.status(500).json('Server error');
  }
});

export default router;
