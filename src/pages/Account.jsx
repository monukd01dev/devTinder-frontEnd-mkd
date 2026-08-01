import { KeyRound, LogOut, Trash2, ShieldCheck, DoorOpen, AlertTriangle, Settings } from "lucide-react";
import Modal from "../components/Modal";
import { useState } from "react";
import LogoutConfirm from "../components/LogoutConfirm";
import DeleteAccountConfirm from "../components/DeleteAccountConfirm";
import UpdatePasswordConfirm from "../components/UpdatePasswordConfirm";
import { motion } from "framer-motion";

export default function Account() {
    const [activeModal, setActiveModal] = useState(null);

    const renderModalContent = () => {
        switch (activeModal) {
            case 'password':
                return <UpdatePasswordConfirm onClose={()=> setActiveModal(null)}/>
            case 'logout':
                return <LogoutConfirm onClose={()=> setActiveModal(null)} />
            case 'delete':
                return <DeleteAccountConfirm onClose={()=> setActiveModal(null)} />
            default:
                return null;
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 }, 
        visible: { 
            opacity: 1, y: 0, scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 } 
        }
    };

    return (
        /* 🚨 THE FIX: Top/start alignment enforced, outer padding removed */
        <div className="w-full max-w-lg mx-auto flex flex-col items-start justify-start">
            
            {/* Heading Section */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2 md:gap-3 mb-6 md:mb-8 text-left">
                <Settings className="w-6 h-6 md:w-8 md:h-8 text-primary shrink-0" />
                Settings
            </h1>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
                
                {/* CARD 1: Password */}
                <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveModal('password')}
                    className="relative overflow-hidden bg-base-200/60 border border-gray-700/50 p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl cursor-pointer flex flex-col justify-start items-start aspect-square shadow-lg hover:border-primary/50 transition-colors group"
                >
                    <div className="absolute -bottom-4 -right-4 text-primary opacity-0 group-hover:opacity-10 group-hover:scale-125 transition-all duration-500 ease-out z-0 rotate-12">
                        <ShieldCheck size={110} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-start text-left w-full h-full">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-auto group-hover:bg-primary/20 transition-colors">
                            <KeyRound className="text-primary w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        
                        <div className="mt-3 md:mt-4">
                            <h2 className="text-base md:text-[17px] font-bold text-white leading-tight">Password</h2>
                            <p className="text-xs text-gray-400 mt-1">Update security</p>
                        </div>
                    </div>
                </motion.div>

                {/* CARD 2: Logout */}
                <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveModal('logout')}
                    className="relative overflow-hidden bg-base-200/60 border border-gray-700/50 p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl cursor-pointer flex flex-col justify-start items-start aspect-square shadow-lg hover:border-warning/50 transition-colors group"
                >
                    <div className="absolute -bottom-2 -right-2 text-warning opacity-0 group-hover:opacity-10 group-hover:scale-125 transition-all duration-500 ease-out z-0 -rotate-12">
                        <DoorOpen size={120} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-start text-left w-full h-full">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-warning/10 flex items-center justify-center mb-auto group-hover:bg-warning/20 transition-colors">
                            <LogOut className="text-warning w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        
                        <div className="mt-3 md:mt-4">
                            <h2 className="text-base md:text-[17px] font-bold text-white leading-tight">Logout</h2>
                            <p className="text-xs text-gray-400 mt-1">Sign out safely</p>
                        </div>
                    </div>
                </motion.div>

                {/* CARD 3: Delete Account */}
                <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('delete')}
                    className="relative overflow-hidden col-span-2 bg-error/5 border border-error/20 p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl cursor-pointer flex flex-col justify-start items-start shadow-lg hover:bg-error/10 transition-colors mt-1 group"
                >
                    <div className="absolute -bottom-8 -right-4 text-error opacity-0 group-hover:opacity-5 group-hover:scale-150 transition-all duration-700 ease-out z-0 rotate-6">
                        <AlertTriangle size={160} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-start text-left w-full">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-error/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-error/20 transition-colors">
                            <Trash2 className="text-error w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        
                        <div>
                            <h2 className="text-base md:text-[18px] font-bold text-error">Delete Account</h2>
                            <p className="text-xs md:text-[13px] text-error/70 mt-1">Permanently remove your data and profile</p>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Modal Container */}
            <Modal 
                isOpen={activeModal !== null} 
                onClose={() => setActiveModal(null)} 
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
}