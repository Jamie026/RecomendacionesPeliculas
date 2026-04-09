import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const smartSearch = (query, page = 1) => api.get('/search?query=' + query + '&page=' + page);
export const getMovieDetails = (id) => api.get('/movies/' + id);
export const getMovieVideos = (id) => api.get('/movies/' + id + '/videos');

export default api;
