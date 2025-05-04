import Content from '../models/Content.js';
import { fetchFeeds } from '../utils/fetchFeeds.js';

export const getFeed = async (req, res) => {
  try {
    const feeds = await fetchFeeds(); 
    res.status(200).json(feeds);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const saveContent = async (req, res) => {
  try {
    const { title, url, source } = req.body;
    const content = await Content.create({
      userId: req.user.id,
      title,
      url,
      source,
    });
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const reportContent = async (req, res) => {
  try {
    const { contentId, reason } = req.body;

    const content = await Content.findById(contentId);
    
    if (!content) return res.status(404).json({ msg: 'Content not found' });

    content.reports.push({ reason, reportedBy: req.user.id });
    await content.save();

    res.status(200).json({ msg: 'Reported successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

