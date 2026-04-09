const { Router } = require('express');
const { smartSearch } = require('../controllers/search.controller');

const router = Router();

router.get('/', smartSearch);

module.exports = router;
