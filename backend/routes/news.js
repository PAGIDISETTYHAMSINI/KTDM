const express = require('express');
const router = express.Router();
const { createNews, getNews, approveNews, getTrending } = require('../controllers/newsController');
const { auth, adminAuth, contributorAuth } = require('../middleware/auth');

router.post('/', auth, contributorAuth, createNews);
router.get('/', getNews);
router.get('/trending', getTrending);
router.put('/:id/approve', auth, adminAuth, approveNews);

module.exports = router;
