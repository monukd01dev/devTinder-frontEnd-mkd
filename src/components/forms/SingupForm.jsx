import useSignup from "../../hooks/useSignup";
import UserFormFields from "../UserFormFields";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";

// Container Variants
const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1, y: 0,
        transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const popVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
};

export default function SignupForm() {
    const { register, handleSubmit, isSubmitting, errors, onSubmit, setValue, watch } = useSignup();

    return (
        // Mobile padding fixed to p-4, md:p-8
        <div className="w-full flex items-start justify-center  min-h-[calc(100vh-100px)]">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                // Mobile padding: p-5, Desktop: md:p-10
                className="w-full max-w-3xl bg-base-100/80 backdrop-blur-2xl border border-base-300 rounded-[2rem] p-5 md:p-10 shadow-2xl"
            >
                {/* Header */}
                <motion.div variants={popVariants} className="text-center mb-6 md:mb-10">
                    {/* Font sizes and gap scaled for mobile */}
                    <h1 className="text-2xl md:text-4xl font-extrabold flex justify-center items-center gap-2 md:gap-3">
                        <Sparkles className="text-primary w-6 h-6 md:w-8 md:h-8"/> Join DevTinder
                    </h1>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* 🔥 UserFormFields ke andar bhi spacing aayegi, hum usko next cover karenge */}
                    <UserFormFields register={register} errors={errors} watch={watch} setValue={setValue} isEditMode={false} />

                    {/* --- ROOT ERROR --- */}
                    {errors.root && (
                        <motion.div variants={popVariants} className="bg-error/10 border border-error/30 text-error text-xs md:text-sm font-medium p-3 rounded-xl flex items-center gap-2 md:gap-3 animate-pulse mt-4">
                            <X className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                            <p>{errors.root.message}</p>
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.div variants={popVariants} className="pt-6 md:pt-8">
                        {/* Button height and text optimized */}
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full h-12 md:h-14 rounded-xl text-base md:text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all overflow-hidden relative group">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <div className="relative flex items-center justify-center">
                                {isSubmitting ? <span className="loading loading-spinner loading-sm md:loading-md"></span> : (
                                    <>Create Account <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </div>
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}