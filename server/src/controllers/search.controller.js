const { parseSearchQuery } = require('../services/gemini');
const { searchMovies, discoverMovies } = require('../services/tmdb');

const smartSearch = async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        const { genreIds, keywords } = await parseSearchQuery(query);
        let movies = await discoverMovies(genreIds);
        if (!movies.length) movies = await searchMovies(keywords);
        res.json({ genreIds, keywords, movies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { smartSearch };
