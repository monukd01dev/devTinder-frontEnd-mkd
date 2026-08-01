import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

export default function SwipeableCard({ children, onSwipe, active, zIndex }) {
    const controls = useAnimation();
    const x = useMotionValue(0); 
    
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const acceptOpacity = useTransform(x, [0, 50, 150], [0, 0, 1]);
    const rejectOpacity = useTransform(x, [0, -50, -150], [0, 0, 1]);

    const SWIPE_THRESHOLD = 150; 

    const handleDragEnd = async (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset > SWIPE_THRESHOLD || velocity > 500) {
            await controls.start({ x: 500, opacity: 0, transition: { duration: 0.3 } });
            onSwipe('interested');
        } else if (offset < -SWIPE_THRESHOLD || velocity < -500) {
            await controls.start({ x: -500, opacity: 0, transition: { duration: 0.3 } });
            onSwipe('ignored');
        } else {
            controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        }
    };

    return (
        <motion.div
            className="absolute"
            style={{ 
                x, 
                rotate,
                zIndex: zIndex 
            }}
            animate={controls}
            drag={active ? "x" : false} 
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            
            initial={{ scale: active ? 1 : 0.95, y: active ? 0 : 20 }}
            whileDrag={active ? { scale: 1.02, cursor: "grabbing" } : {}}
        >
            {/* 🚨 FIX: Responsive wrapper matching UserCard dimensions */}
            <div className="relative w-72 sm:w-[22rem] h-[30rem] sm:h-[35rem] cursor-grab active:cursor-grabbing rounded-[2rem] shadow-2xl">
                
                {children}

                {active && (
                    <>
                        <motion.div style={{ opacity: acceptOpacity }} className="absolute inset-0 z-20 pointer-events-none flex items-start justify-start p-8">
                            <div className="border-4 border-success text-success text-3xl sm:text-4xl font-extrabold px-6 py-2 rounded-xl transform -rotate-12 bg-black/40 backdrop-blur-sm tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                                ACCEPT
                            </div>
                        </motion.div>
                        <motion.div style={{ opacity: rejectOpacity }} className="absolute inset-0 z-20 pointer-events-none flex items-start justify-end p-8">
                            <div className="border-4 border-error text-error text-3xl sm:text-4xl font-extrabold px-6 py-2 rounded-xl transform rotate-12 bg-black/40 backdrop-blur-sm tracking-widest shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                                REJECT
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </motion.div>
    );
}