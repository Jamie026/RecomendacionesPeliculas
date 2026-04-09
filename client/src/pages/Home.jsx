import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import useSearch from '../hooks/useSearch';
import styles from './Home.module.css';

export default function Home() {
    const { movies, loading, error, parsedQuery, page, totalPages, search, goToPage } = useSearch();

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={styles.hero}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Encuentra tu próxima <span className={styles.accent}>película</span>
                </motion.h1>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Describe lo que quieres ver y la IA encontrará las mejores opciones
                </motion.p>
                <SearchBar onSearch={search} loading={loading} />
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        className={styles.error}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {error}
                    </motion.p>
                )}
                {parsedQuery && !loading && (
                    <motion.p
                        className={styles.parsedQuery}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Resultados para: <span>{parsedQuery}</span>
                    </motion.p>
                )}
                {loading && (
                    <motion.div
                        className={styles.loaderWrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className={styles.loader} />
                        <p>Analizando tu búsqueda...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && movies.length > 0 && (
                <>
                    <motion.div
                        className={styles.grid}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {movies.map((movie, i) => (
                            <MovieCard key={movie.id} movie={movie} index={i} />
                        ))}
                    </motion.div>
                    <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
                </>
            )}
        </motion.div>
    );
}
