import { motion } from "framer-motion";
import { HOME_FEATURES } from "../../utils/homeData";

export default function FeatureSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }
    };

    return (
        // 🚨 FIX 1: 'max-w-7xl' aur 'px-8' hata diya kyunki Main.jsx ne already 1200px aur padding de rakhi hai.
        <div className="w-full py-12 md:py-20 relative">
            
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                    Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Developers</span>
                </h2>
                <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-medium">
                    Built from scratch with a robust backend, secure authentication pipelines, and fluid UI interactions.
                </p>
                <div className="h-1 w-16 md:w-20 bg-primary mx-auto rounded-full mt-4"></div>
            </div>

            {/* Features Grid */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                // 🚨 FIX 2: lg:grid-cols-4 lagaya taaki 1024px+ par hi 4 col ban jaaye aur spacing better rahe
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            >
                {HOME_FEATURES.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div 
                            key={feature.id}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.01 }}
                            // 🚨 FIX 3: Padding ko p-6 md:p-8 se kam karke p-5 lg:p-6 kar diya taaki text ke liye width bache
                            className="relative flex flex-col justify-start bg-base-200/50 backdrop-blur-xl border border-white/5 p-5 lg:p-6 rounded-3xl shadow-xl hover:border-primary/30 transition-all duration-300 group overflow-hidden"
                        >
                            {/* Optional Badge */}
                            {feature.badge && (
                                <div className="absolute top-5 right-5">
                                    {/* 🚨 FIX 4: Badge ka text thoda chota kiya taaki overlap na ho */}
                                    <span className={`text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                                        feature.badge === "Coming Soon" 
                                            ? "bg-warning/10 text-warning border border-warning/20" 
                                            : "bg-success/10 text-success border border-success/20"
                                    }`}>
                                        {feature.badge}
                                    </span>
                                </div>
                            )}

                            <div>
                                {/* 🚨 FIX 5: Icon aur uske dabbe (wrapper) ka size halka sa chota kiya */}
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-base-300/80 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform ${feature.color}`}>
                                    <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                                </div>
                                
                                {/* 🚨 FIX 6: Text sizes optimized for narrow columns */}
                                <h3 className="text-base md:text-[17px] font-bold text-white mb-2 leading-tight pr-4">
                                    {feature.title}
                                </h3>
                                <p className="text-[13px] md:text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Subtle bottom gradient glow on hover */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                    );
                })}
            </motion.div>

        </div>
    );
}