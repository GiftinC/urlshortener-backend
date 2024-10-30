import Url from '../models/Url'; // Assuming you've created a URL model

router.get('/:code', async (req, res) => {
    try {
      const url = await Url.findOne({ urlCode: req.params.code });
      if (url) {
        url.clicks++;
        await url.save(); // Update click count
        return res.redirect(url.longUrl);
      } else {
        return res.status(404).json('URL not found');
      }
    } catch (error) {
      res.status(500).json('Server error');
    }
  });
  