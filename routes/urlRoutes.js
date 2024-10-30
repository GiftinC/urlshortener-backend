import express from 'express';
import { getUrlStats, getAllUrls } from '../controllers/urlController.js';

const router = express.Router();

router.get('/stats', getUrlStats);
router.get('/all', getAllUrls);

export default router;
