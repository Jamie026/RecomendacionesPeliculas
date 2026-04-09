import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <motion.nav
            className={styles.navbar}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Link to="/" className={styles.logo}>
                🎬 CineAI
            </Link>
        </motion.nav>
    );
}
