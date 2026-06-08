import { AnimatePresence, motion } from "framer-motion";
import useToast from "../hooks/useToast";
import styles from "./ToastContainer.module.css";

export default function ToastContainer() {
    const { toasts } = useToast();

    return (
        <div className={styles.container}>
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        className={`${styles.toast} ${styles[toast.type]}`}
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {toast.message}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
