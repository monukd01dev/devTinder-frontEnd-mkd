import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
    const transitionSettings = { duration: 0.2, ease: "easeInOut" };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={transitionSettings}
            // 🚨 THE FIX: "Jo papa ka, wahi mera"
            // Sirf 100% height/width inherit karega aur flex context dega
            className="w-full h-full flex-1 flex flex-col"
        >
            {children}
        </motion.div>
    );
}