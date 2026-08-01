import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

export default function ErrorPage({ error, resetErrorBoundary }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-base-100 p-4">
            
            {/* 🚨 FIX: Background Glow resized for mobile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-error/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                // 🚨 FIX: Padding p-6 on mobile, p-12 on desktop
                className="relative z-10 w-full max-w-lg bg-base-200/80 backdrop-blur-2xl border border-error/20 rounded-[2rem] p-6 md:p-12 shadow-2xl text-center"
            >
                {/* Bouncing Alert Icon */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex justify-center mb-4 md:mb-6"
                >
                    <div className="p-3 md:p-4 bg-error/10 rounded-full border border-error/20">
                        <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-error" strokeWidth={2} />
                    </div>
                </motion.div>

                {/* 🚨 FIX: Font size scaled */}
                <h1 className="text-2xl md:text-3xl font-extrabold mb-2 md:mb-3 text-base-content">
                    Oops! System Crash
                </h1>
                
                <p className="text-sm md:text-base text-base-content/60 font-medium mb-4 md:mb-6">
                    We've encountered an unexpected glitch in the matrix. Don't worry, it's not you, it's us.
                </p>

                {/* Error Details */}
                <div className="bg-base-300/50 rounded-xl p-3 md:p-4 mb-6 md:mb-8 border border-base-content/10 overflow-x-auto text-left">
                    <p className="text-error/80 font-mono text-xs md:text-sm break-words">
                        {error?.message || "Unknown error occurred"}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    {/* 🚨 FIX: Buttons standard height h-12 to h-14 */}
                    <button 
                        onClick={resetErrorBoundary} 
                        className="btn btn-outline h-12 md:h-14 border-error/50 text-error hover:bg-error hover:text-white hover:border-error rounded-xl shadow-sm text-base md:text-lg"
                    >
                        <RefreshCcw className="w-4 h-4 md:w-5 md:h-5" /> Try Again
                    </button>
                    
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="btn btn-primary h-12 md:h-14 rounded-xl shadow-lg shadow-primary/20 text-base md:text-lg"
                    >
                        <Home className="w-4 h-4 md:w-5 md:h-5" /> Go to Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
}