import { motion } from "framer-motion";
import UserCard from "../UserCard";
import { HERO_DUMMY_USERS } from "../../utils/homeData";
import { useNavigate } from "react-router";

export default function HeroSection() {
    const navigate = useNavigate();
    return (
        // 🚨 FIX: max-w-6xl se badha kar max-w-7xl kiya taaki Navbar ke sath perfectly align ho.
        // 'justify-between' ki jagah 'gap-12 lg:gap-20' diya taaki content screen pe evenly balanced rahe.
        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between pt-6 md:pt-8 pb-20 md:pb-32 px-4 sm:px-6  lg:px-12 ">

            {/* Background Frosty Glow - Centered properly */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[500px] md:h-[500px] bg-primary/25 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            {/* LEFT SIDE: Typography & CTA */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 z-10 text-center lg:text-left mb-16 lg:mb-0"
            >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6">
                    Find Your Next <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        Pair Programmer
                    </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 font-medium">
                    Stop coding alone. Match with top developers, collaborate on open-source projects, and level up your stack together.
                </p>
                <button 
                    className="btn btn-primary btn-lg rounded-full px-10 shadow-[0_0_25px_rgba(var(--primary),0.4)] hover:scale-105 transition-transform font-bold text-base"
                    onClick={() => navigate('/app/feed')}
                >
                    Start Swiping
                </button>
            </motion.div>

            {/* RIGHT SIDE: 3D Card Diffusion */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end items-center min-h-[450px] sm:min-h-[520px] lg:min-h-[580px]">

                {/* BACK CARD */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -20, x: 50 }}
                    animate={{
                        opacity: 0.6,
                        scale: 0.9,
                        rotate: -12,
                        x: -35,
                        y: [0, -15, 0]
                    }}
                    transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, duration: 1 }}
                    className="absolute z-0 blur-[2px] pointer-events-none drop-shadow-2xl scale-90 sm:scale-100 lg:right-6"
                >
                    <div className="rounded-[2rem] overflow-hidden [transform:translateZ(0)]">
                        <UserCard user={HERO_DUMMY_USERS[0]} />
                    </div>
                </motion.div>

                {/* FRONT CARD */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 20, y: 50 }}
                    animate={{ opacity: 1, scale: 1.02, rotate: 8, y: [0, 10, 0] }}
                    transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, duration: 1, delay: 0.2 }}
                    className="absolute z-10 pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-95 sm:scale-100 lg:right-6"
                >
                    <div className="rounded-[2rem] overflow-hidden [transform:translateZ(0)]">
                        <UserCard user={HERO_DUMMY_USERS[1]} />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}