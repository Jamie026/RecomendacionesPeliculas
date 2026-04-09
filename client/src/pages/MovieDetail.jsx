import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMovieDetails } from '../services/api';
import styles from './MovieDetail.module.css';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await getMovieDetails(id);
                setMovie(data);
            } catch {
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id, navigate]);

    if (loading)
        return (
            <div className={styles.loaderWrapper}>
                <div className={styles.loader} />
            </div>
        );

    if (!movie) return null;

    const backdropUrl = movie.backdrop_path ? IMAGE_BASE + 'original' + movie.backdrop_path : null;

    const posterUrl = movie.poster_path
        ? IMAGE_BASE + 'w500' + movie.poster_path
        : 'https://via.placeholder.com/500x750?text=Sin+imagen';

    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {backdropUrl && (
                <div className={styles.backdrop}>
                    <img src={backdropUrl} alt="" />
                    <div className={styles.backdropOverlay} />
                </div>
            )}

            <div className={styles.content}>
                <motion.button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ← Volver
                </motion.button>

                <div className={styles.main}>
                    <motion.img
                        className={styles.poster}
                        src={posterUrl}
                        alt={movie.title}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />

                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h1 className={styles.title}>{movie.title}</h1>

                        {movie.tagline && <p className={styles.tagline}>"{movie.tagline}"</p>}

                        <div className={styles.meta}>
                            <span className={styles.badge}>⭐ {movie.vote_average.toFixed(1)}</span>
                            {movie.release_date && (
                                <span className={styles.badge}>
                                    📅 {movie.release_date.slice(0, 4)}
                                </span>
                            )}
                            {movie.runtime > 0 && (
                                <span className={styles.badge}>
                                    🕐 {hours}h {minutes}m
                                </span>
                            )}
                        </div>

                        <div className={styles.genres}>
                            {movie.genres.map((g) => (
                                <span key={g.id} className={styles.genre}>
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <p className={styles.overview}>{movie.overview}</p>

                        {movie.production_companies?.length > 0 && (
                            <p className={styles.companies}>
                                <span>Producción: </span>
                                {movie.production_companies
                                    .slice(0, 3)
                                    .map((c) => c.name)
                                    .join(', ')}
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
