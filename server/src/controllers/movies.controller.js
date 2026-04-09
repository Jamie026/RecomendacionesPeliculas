const { searchMovies, getMovieDetails, getMovieVideos } = require('../services/tmdb');

const videos = async (req, res) => {
    const { id } = req.params;
    try {
        let results = await getMovieVideos(id);
        if (!results.length) {
            const { data } = await require('axios').get(
                'https://api.themoviedb.org/3/movie/' + id + '/videos',
                {
                    headers: { Authorization: 'Bearer ' + process.env.TMDB_TOKEN },
                    params: { language: 'en-US' },
                }
            );
            results = data.results;
        }
        const trailer =
            results.find((v) => v.type === 'Trailer' && v.site === 'YouTube') ||
            results.find((v) => v.site === 'YouTube');
        res.json(trailer || null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

module.exports = { search, details, videos };
