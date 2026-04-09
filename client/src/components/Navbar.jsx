import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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

            <div className={styles.actions}>
                {user ? (
                    <>
                        <Link to="/profile" className={styles.username}>
                            👤 {user.username}
                        </Link>
                        <motion.button
                            className={styles.logoutBtn}
                            onClick={handleLogout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Salir
                        </motion.button>
                    </>
                ) : (
                    <motion.button
                        className={styles.loginBtn}
                        onClick={() => navigate('/auth')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Iniciar sesión
                    </motion.button>
                )}
            </div>
        </motion.nav>
    );
}
