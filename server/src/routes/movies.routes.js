const { Router } = require('express');
const { search, details } = require('../controllers/movies.controller');

const router = Router();

router.get('/search', search);
router.get('/:id', details);

module.exports = router;
