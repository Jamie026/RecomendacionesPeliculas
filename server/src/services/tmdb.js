const axios = require('axios');

const tmdb = axios.create({
    baseURL: process.env.TMDB_BASE_URL,
    headers: {
        Authorization: 'Bearer ' + process.env.TMDB_TOKEN,
        'Content-Type': 'application/json',
    },
});

const searchMovies = async (query) => {
    const { data } = await tmdb.get('/search/movie', {
        params: { query, page: 1, language: 'es-ES' },
    });
    return data.results;
};

const discoverMovies = async (genreIds) => {
    const params = {
        sort_by: 'popularity.desc',
        language: 'es-ES',
        page: 1,
    };

    if (genreIds && genreIds.length) params.with_genres = genreIds.join(',');

    const { data } = await tmdb.get('/discover/movie', { params });
    return data.results;
};

const getMovieDetails = async (movieId) => {
    const { data } = await tmdb.get('/movie/' + movieId, {
        params: { language: 'es-ES' },
    });
    return data;
};

module.exports = { searchMovies, discoverMovies, getMovieDetails };
