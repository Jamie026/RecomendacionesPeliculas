const { searchMovies, getMovieDetails } = require('../services/tmdb');

const search = async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        const movies = await searchMovies(query);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const details = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await getMovieDetails(id);
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { search, details };
