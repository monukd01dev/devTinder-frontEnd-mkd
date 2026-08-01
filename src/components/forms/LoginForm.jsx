import { Eye, EyeOff, Mail, Lock, Flame, ArrowRight, X } from "lucide-react";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import useLoginForm from "../../hooks/useLoginForm";

// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const dropVariants = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 20 } },
};

const slideRightVariants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
};

const popVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
};

export default function LoginForm() {
  const {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    isSubmitting,
    onSubmit,
    errors,
  } = useLoginForm();

  const focusClasses = "focus-within:outline-none focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all";
  const innerInputClasses = "grow bg-transparent outline-none focus:outline-none focus:ring-0 text-sm md:text-base"; // Text responsive

  return (
    // P-4 added for container padding on very small devices
    <div className="w-full max-w-md  sm:px-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        // Mobile padding: p-6, Desktop: md:p-10
        className="bg-base-100/80 backdrop-blur-2xl border border-base-300 rounded-[2rem] p-6 md:p-10 shadow-2xl"
      >
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="flex justify-center mb-3 md:mb-4">
            <motion.div variants={dropVariants} className="p-2 md:p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/20">
              <Flame className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={2.5} />
            </motion.div>
          </div>
          {/* Text scale: 2xl on mobile, 3xl on desktop */}
          <motion.h2 variants={dropVariants} className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome Back
          </motion.h2>
          <motion.p variants={dropVariants} className="text-sm md:text-base text-base-content/60 font-medium mt-1 md:mt-2">
            Log in to continue swiping!
          </motion.p>
        </div>

        {/* Space reduced on mobile (space-y-4) and standard on desktop (space-y-6) */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

          {/* --- EMAIL FIELD GROUP --- */}
          <motion.div variants={slideRightVariants} className="form-control w-full">
            <label htmlFor="login-email" className="label font-semibold text-base-content/80 mb-0.5">
              <span className="label-text text-sm md:text-base">Email ID</span>
            </label>
            <div className={`w-full input input-bordered flex items-center gap-2 md:gap-3 ${focusClasses} ${errors.emailId ? "input-error" : ""}`}>
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-base-content/40 shrink-0" />
              <input
                id="login-email"
                type="email"
                className={innerInputClasses}
                placeholder="dev@email.com"
                {...register('emailId')}
              />
            </div>
            {errors.emailId && (
              <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.emailId.message}</span>
            )}
          </motion.div>

          {/* --- PASSWORD FIELD GROUP --- */}
          <motion.div variants={slideRightVariants} className="form-control w-full">
            <label htmlFor="login-password" className="label font-semibold text-base-content/80 mb-0.5">
              <span className="label-text text-sm md:text-base">Password</span>
            </label>
            <div className={`w-full input input-bordered flex items-center gap-2 md:gap-3 ${focusClasses} ${errors.password ? "input-error" : ""}`}>
              <Lock className="w-4 h-4 md:w-5 md:h-5 text-base-content/40 shrink-0" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className={innerInputClasses}
                placeholder="••••••••"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-base-content/40 hover:text-primary transition-colors focus:outline-none shrink-0"
              >
                {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-error text-xs mt-1.5 ml-1 font-medium">{errors.password.message}</span>
            )}
          </motion.div>

          {/* --- ROOT (SERVER) ERROR UI --- */}
          {errors.root && (
            <motion.div variants={popVariants} className="bg-error/10 border border-error/30 text-error text-sm font-medium p-3 md:p-4 rounded-xl flex items-center gap-2 md:gap-3 shadow-sm">
              <X className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <p>{errors.root.message}</p>
            </motion.div>
          )}

          {/* --- SUBMIT BUTTON --- */}
          {/* Button margin and height scaled */}
          <motion.div variants={popVariants} className="pt-2 md:pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full h-12 md:h-14 rounded-xl text-base md:text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              
              <div className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm md:loading-md"></span>
                ) : (
                  <>Login to Account <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
                )}
              </div>
            </button>
          </motion.div>

        </form>

        {/* --- REDIRECT TO SIGNUP --- */}
        <motion.div variants={fadeUpVariants} className="text-center mt-6 md:mt-8 pt-4 md:pt-6 border-t border-base-content/10">
          <p className="text-xs md:text-sm text-base-content/60 font-medium">
            Don't have an account?{" "}
            <Link to="/user/signup" className="text-primary hover:text-primary-focus font-bold transition-colors underline-offset-4 hover:underline">
              Sign up for free
            </Link>
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}