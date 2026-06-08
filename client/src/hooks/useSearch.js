import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { smartSearch } from "../services/api";

export default function useSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [parsedQuery, setParsedQuery] = useState("");
    const [fetchedFor, setFetchedFor] = useState({ query: "", page: 0 });

    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page") || 1);
    const genreIdsStr = searchParams.get("genreIds") || "";

    const loading = !!query && (fetchedFor.query !== query || fetchedFor.page !== page);

    const skipNextRef = useRef(false);

    useEffect(() => {
        if (!query) return;
        if (skipNextRef.current) {
            skipNextRef.current = false;
            return;
        }
        const genreIds = genreIdsStr ? genreIdsStr.split(",").map(Number) : null;
        smartSearch(query, page, genreIds)
            .then(({ data }) => {
                setError(null);
                setMovies(data.movies);
                setParsedQuery(data.keywords);
                setTotalPages(Math.min(data.totalPages, 10));
                setFetchedFor({ query, page });
                if (!genreIds && data.genreIds?.length) {
                    skipNextRef.current = true;
                    setSearchParams(
                        { query, page: String(page), genreIds: data.genreIds.join(",") },
                        { replace: true }
                    );
                }
            })
            .catch(() => setError("Error al buscar películas"));
    }, [query, page, genreIdsStr, setSearchParams]);

    const search = (newQuery) => {
        if (!newQuery.trim()) return;
        setSearchParams({ query: newQuery, page: "1" });
    };

    const goToPage = (pageNumber) => {
        const params = { query, page: String(pageNumber) };
        if (genreIdsStr) params.genreIds = genreIdsStr;
        setSearchParams(params);
    };

    return { movies, loading, error, parsedQuery, page, totalPages, search, goToPage };
}
