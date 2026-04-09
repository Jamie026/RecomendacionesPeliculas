const { parseSearchQuery } = require('../services/gemini');
const { searchMovies, discoverMovies } = require('../services/tmdb');
const { SearchHistory } = require('../models');

const smartSearch = async (req, res) => {
    const { query, page = 1 } = req.query;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        const { genreIds, keywords } = await parseSearchQuery(query);
        let data = await discoverMovies(genreIds, page);
        if (!data.results.length) data = await searchMovies(keywords, page);

        if (req.user && page == 1) {
            await SearchHistory.create({ userId: req.user.id, query, parsedQuery: keywords });
        }

        res.json({
            genreIds,
            keywords,
            movies: data.results,
            totalPages: data.totalPages,
            page: Number(page),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { smartSearch };
