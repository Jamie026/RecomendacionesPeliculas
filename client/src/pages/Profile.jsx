import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserLists from '../hooks/useUserLists';
import styles from './Profile.module.css';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER = 'https://via.placeholder.com/500x750?text=Sin+imagen';

const MovieMiniCard = ({ item, onRemove, onNavigate }) => (
    <motion.div
        className={styles.miniCard}
        onClick={() => onNavigate('/movie/' + item.movieId)}
        whileHover={{ y: -4, scale: 1.03 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
    >
        <img
            src={item.posterPath ? IMAGE_BASE + item.posterPath : PLACEHOLDER}
            alt={item.title}
            className={styles.miniPoster}
        />
        <button
            className={styles.removeBtn}
            onClick={(e) => {
                e.stopPropagation();
                onRemove(item);
            }}
        >
            ✕
        </button>
        <div className={styles.miniInfo}>
            <p className={styles.miniTitle}>{item.title}</p>
            <span className={styles.miniYear}>
                {item.releaseDate ? item.releaseDate.slice(0, 4) : 'N/A'}
            </span>
        </div>
    </motion.div>
);

export default function Profile() {
    const { user } = useAuth();
    const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useUserLists();
    const navigate = useNavigate();

    if (!user) {
        navigate('/auth');
        return null;
    }

    const toMovie = (item) => ({
        id: item.movieId,
        title: item.title,
        poster_path: item.posterPath,
        vote_average: item.voteAverage,
        release_date: item.releaseDate,
    });

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.header}>
                <h1 className={styles.username}>👤 {user.username}</h1>
                <p className={styles.email}>{user.email}</p>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    ❤️ Favoritos <span>{favorites.length}</span>
                </h2>
                {favorites.length === 0 ? (
                    <p className={styles.empty}>No tienes favoritos aún</p>
                ) : (
                    <div className={styles.grid}>
                        {favorites.map((item) => (
                            <MovieMiniCard
                                key={item.id}
                                item={item}
                                onRemove={() => toggleFavorite(toMovie(item))}
                                onNavigate={navigate}
                            />
                        ))}
                    </div>
                )}
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    🔖 Quiero ver <span>{watchlist.length}</span>
                </h2>
                {watchlist.length === 0 ? (
                    <p className={styles.empty}>Tu lista está vacía</p>
                ) : (
                    <div className={styles.grid}>
                        {watchlist.map((item) => (
                            <MovieMiniCard
                                key={item.id}
                                item={item}
                                onRemove={() => toggleWatchlist(toMovie(item))}
                                onNavigate={navigate}
                            />
                        ))}
                    </div>
                )}
            </section>
        </motion.div>
    );
}
