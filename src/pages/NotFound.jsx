import { motion } from "framer-motion";
import { Link } from "react-router";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        // 🚨 FIX: Height calculation standard ki, mobile padding fix
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                // 🚨 FIX: Mobile pe padding p-6, Desktop pe p-10
                className="w-full max-w-md bg-base-200/50 backdrop-blur-xl border border-base-content/10 rounded-[2rem] p-6 md:p-10 text-center shadow-2xl"
            >
                {/* Floating Compass Icon */}
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex justify-center mb-4 md:mb-6"
                >
                    {/* 🚨 FIX: Padding and Icon size scaled down for mobile */}
                    <div className="p-4 md:p-5 bg-base-300 rounded-full border border-base-content/10 shadow-inner">
                        <Compass className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
                    </div>
                </motion.div>

                {/* 🚨 FIX: Text sizes made responsive */}
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1 md:mb-2">
                    404
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-base-content mb-2 md:mb-4">
                    Lost in the Matrix?
                </h2>
                <p className="text-base-content/60 mb-6 md:mb-8 text-sm md:text-base">
                    Match not found. Let's get you back.
                </p>

                {/* Back to Home Button */}
                {/* 🚨 FIX: Button height (h-12 on mobile) and text scale */}
                <Link to="/" className="btn btn-primary w-full h-12 md:h-14 rounded-xl text-base md:text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all overflow-hidden relative group">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <div className="relative flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                        Take Me Home
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}