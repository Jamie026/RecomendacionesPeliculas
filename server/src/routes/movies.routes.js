const express = require('express');
const router = express.Router();
const { search, details, videos } = require('../controllers/movies.controller');

router.get('/search', search);
router.get('/:id/videos', videos);
router.get('/:id', details);

module.exports = router;
