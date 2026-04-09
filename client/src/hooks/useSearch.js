import { useState } from 'react';
import { smartSearch } from '../services/api';

export default function useSearch() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [parsedQuery, setParsedQuery] = useState('');

    const search = async (query) => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const { data } = await smartSearch(query);
            setMovies(data.movies);
            setParsedQuery(data.keywords);
        } catch (err) {
            console.error(err);
            setError('Error al buscar películas');
        } finally {
            setLoading(false);
        }
    };

    return { movies, loading, error, parsedQuery, search };
}
