import { motion } from "framer-motion";
import { Flame } from "lucide-react";

function SplashScreen() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-base-100 overflow-hidden relative z-50">

            {/* 🚨 FIX: Background orbs scaled for mobile to avoid lag (w-48 to w-72) */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-48 h-48 md:w-72 md:h-72 bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-full blur-[60px] md:blur-[80px]"
            />

            <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6">
                {/* 🚨 FIX: Icon box scaled for mobile */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-3 md:p-4 bg-gradient-to-br from-pink-500 to-blue-500 rounded-[1rem] md:rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                >
                    <Flame className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2} fill="currentColor" />
                </motion.div>

                {/* Brand Text & Loading Status */}
                <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center text-center"
                >
                    {/* 🚨 FIX: Text size responsive */}
                    <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-wide">
                        DevTinder
                    </h1>
                    <p className="text-[10px] md:text-xs font-semibold text-gray-400 mt-1 md:mt-2 tracking-[0.2em] uppercase">
                        Verifying Session
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default SplashScreen;