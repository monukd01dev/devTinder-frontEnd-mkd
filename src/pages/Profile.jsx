import useProfileUpdate from "../hooks/useProfileUpdate";
import UserCard from "../components/UserCard";
import UserFormFields from '../components/UserFormFields';
import { User, Save, X } from "lucide-react";
import { motion } from "framer-motion";

// 🚨 1. Parent Transition 
// (Sirf stagger ke liye rakha hai, exit animation hata di kyunki PageWrapper handle karega)
const pageVariants = {
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// 🚨 2. UserCard Left se aayega
const cardVariants = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

// 🚨 3. Form Container
const formContainerVariants = {
    hidden: { opacity: 0, x: 40 },
    show: {
        opacity: 1, x: 0,
        transition: { 
            type: "spring", stiffness: 300, damping: 25, 
            staggerChildren: 0.1, 
            delayChildren: 0.2 
        }
    }
};

const popVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
};

export default function Profile() {
    const { register, handleSubmit, isSubmitting, errors, onSubmit, setValue, watch } = useProfileUpdate();
    const liveFormData = watch();
    
    return (
        // 🚨 THE FIX: Wapas motion.div banaya taaki 'hidden' se 'show' wala stagger chain chalu ho sake
        <motion.div 
            variants={pageVariants}
            initial="hidden"
            animate="show"
            className="w-full h-full flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start lg:mt-6"
        >

            {/* LEFT SIDE (UserCard) */}
            {/* Normal div par sticky laga hai, motion.div uske andar hai (Isse dono kaam ho gaye) */}
            <div className="w-full lg:w-[40%] flex justify-center lg:sticky lg:top-28 z-10 h-fit self-start">
                <motion.div variants={cardVariants} className="w-full flex justify-center">
                    <UserCard user={liveFormData} isFeedCard={false} />
                </motion.div>
            </div>

            {/* RIGHT SIDE (Form) */}
            <motion.div variants={formContainerVariants} className="w-full lg:w-[60%] bg-base-300/80 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-2xl">
                
                <motion.h1 variants={popVariants} className="text-2xl md:text-3xl font-extrabold flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                    <User className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    Edit Profile
                </motion.h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <UserFormFields 
                        register={register} errors={errors} 
                        watch={watch} setValue={setValue} 
                        isEditMode={true} 
                    />

                    {errors.root && (
                        <motion.div variants={popVariants} className="bg-error/10 border border-error/30 text-error text-xs md:text-sm font-medium p-3 rounded-xl flex items-center gap-2 md:gap-3 animate-pulse mt-4 md:mt-6">
                            <X className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                            <p>{errors.root.message}</p>
                        </motion.div>
                    )}

                    <motion.div variants={popVariants} className="pt-6 md:pt-8">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full h-12 md:h-14 rounded-xl text-base md:text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all overflow-hidden relative group">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <div className="relative flex items-center justify-center">
                                {isSubmitting ? <span className="loading loading-spinner loading-sm md:loading-md"></span> : (
                                    <>Update Profile <Save className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:scale-110 transition-transform" /></>
                                )}
                            </div>
                        </button>
                    </motion.div>
                </form>
            </motion.div>

        </motion.div>
    );
}