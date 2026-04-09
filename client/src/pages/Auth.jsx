import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import styles from './Auth.module.css';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const payload = isLogin
                ? { email: form.email, password: form.password }
                : { username: form.username, email: form.email, password: form.password };

            const { data } = await api.post(endpoint, payload);
            login(data.token, data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Ocurrió un error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={styles.logo}>🎬 CineAI</h1>

                <div className={styles.tabs}>
                    <button
                        className={styles.tab + (isLogin ? ' ' + styles.activeTab : '')}
                        onClick={() => setIsLogin(true)}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        className={styles.tab + (!isLogin ? ' ' + styles.activeTab : '')}
                        onClick={() => setIsLogin(false)}
                    >
                        Registrarse
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                key="username"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <input
                                    className={styles.input}
                                    name="username"
                                    type="text"
                                    placeholder="Usuario"
                                    value={form.username}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <input
                        className={styles.input}
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={styles.input}
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

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
                    </AnimatePresence>

                    <motion.button
                        className={styles.button}
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? 'Cargando...' : isLogin ? 'Entrar' : 'Crear cuenta'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
