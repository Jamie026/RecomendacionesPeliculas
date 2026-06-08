import { useState, useEffect } from "react";
import { getTrending } from "../services/api";

export default function useTrending() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrending()
            .then(({ data }) => setMovies(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return { movies, loading };
}
