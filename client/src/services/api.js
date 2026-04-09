import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const smartSearch = (query) => api.get('/search?query=' + query);
export const getMovieDetails = (id) => api.get('/movies/' + id);

export default api;
