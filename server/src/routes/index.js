const { Router } = require('express');
const moviesRoutes = require('./movies.routes');
const searchRoutes = require('./search.routes');

const router = Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server running' });
});

router.use('/movies', moviesRoutes);
router.use('/search', searchRoutes);

module.exports = router;
