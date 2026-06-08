import { useState, useEffect } from "react";
import { UserListsContext } from "./UserListsContext";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

export default function UserListsProvider({ children }) {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if (!user) return;
        api.get("/favorites").then(({ data }) => setFavorites(data));
        api.get("/watchlist").then(({ data }) => setWatchlist(data));
    }, [user]);

    const isFavorite = (movieId) => user ? favorites.some((f) => f.movieId === movieId) : false;
    const isInWatchlist = (movieId) => user ? watchlist.some((w) => w.movieId === movieId) : false;

    const toggleFavorite = async (movie) => {
        if (isFavorite(movie.id)) {
            await api.delete("/favorites/" + movie.id);
            setFavorites(favorites.filter((f) => f.movieId !== movie.id));
        } else {
            const { data } = await api.post("/favorites", {
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                voteAverage: movie.vote_average,
                releaseDate: movie.release_date,
            });
            setFavorites([...favorites, data]);
        }
    };

    const toggleWatchlist = async (movie) => {
        if (isInWatchlist(movie.id)) {
            await api.delete("/watchlist/" + movie.id);
            setWatchlist(watchlist.filter((w) => w.movieId !== movie.id));
        } else {
            const { data } = await api.post("/watchlist", {
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                voteAverage: movie.vote_average,
                releaseDate: movie.release_date,
            });
            setWatchlist([...watchlist, data]);
        }
    };

    return (
        <UserListsContext.Provider
            value={{ favorites: user ? favorites : [], watchlist: user ? watchlist : [], isFavorite, isInWatchlist, toggleFavorite, toggleWatchlist }}
        >
            {children}
        </UserListsContext.Provider>
    );
}
