import { RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function RefreshButton({ onRefresh, isRefreshing }) {
    return (
        <motion.button
            onClick={onRefresh}
            disabled={isRefreshing}
            // 🚨 FRAMER MOTION: Hover aur Click (Tap) animation
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: -45 }}
            // 🚨 FIX: Mobile pe p-2.5, Desktop pe p-3 (Touch target 44px maintain karte hue compact kiya)
            className="p-2.5 md:p-3 bg-base-200/50 hover:bg-base-300 rounded-full border border-base-content/10 shadow-sm backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            title="Refresh Data"
        >
            <motion.div
                // 🚨 FRAMER MOTION: API call hone par infinite spin
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ 
                    repeat: isRefreshing ? Infinity : 0, 
                    ease: "linear", 
                    duration: 1 
                }}
            >
                <RefreshCcw 
                    // 🚨 FIX: Icon size responsive (w-4 h-4 on mobile, w-5 h-5 on desktop)
                    className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                        isRefreshing ? "text-primary drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" : "text-base-content/70"
                    }`} 
                    strokeWidth={2.5}
                />
            </motion.div>
        </motion.button>
    );
}