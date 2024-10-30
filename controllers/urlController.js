import Url from '../models/Url.js';

// Controller to get URL counts by day and month
export const getUrlStats = async (req, res) => {
    try {
        // Count URLs created today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const urlsToday = await Url.countDocuments({ date: { $gte: today } });

        // Count URLs created within this month
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const urlsThisMonth = await Url.countDocuments({ date: { $gte: firstDayOfMonth } });

        res.json({ urlsToday, urlsThisMonth });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching URL statistics', error });
    }
};

// Controller to get all created URLs
export const getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find().sort({ date: -1 });
        res.json(urls);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching URLs', error });
    }
};
