import { User, Mail, Lock, Calendar, Users, Image as ImageIcon, FileText, Eye, EyeOff } from "lucide-react";
import ChipInput from "./ChipInput";
import { useState } from "react";
import { motion } from "framer-motion";

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function UserFormFields({ register, errors, watch, setValue, isEditMode = false }) {
    const [showPassword, setShowPassword] = useState(false);
    
    // 🚨 FIX: input wrapper height h-10 min-h-0 for mobile, h-12 for desktop
    const focusClasses = "h-10 min-h-0 md:h-12 focus-within:outline-none focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all";
    // 🚨 FIX: text-sm for mobile
    const innerInputClasses = "grow bg-transparent outline-none focus:outline-none focus:ring-0 text-sm md:text-base h-full";
    const iconClasses = "w-4 h-4 md:w-5 md:h-5 text-base-content/40 shrink-0";

    return (
        // 🚨 FIX: gap reduced to space-y-4 on mobile
        <div className="space-y-4 md:space-y-6">
            
            {/* --- GRID 1: Names --- */}
            {/* 🚨 FIX: grid gap reduced to gap-4 on mobile */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="form-control w-full">
                    <label htmlFor="firstName" className="label font-semibold text-base-content/80 mb-0.5 md:mb-1">
                        <span className="label-text text-sm md:text-base">First Name *</span>
                    </label>
                    <div className={`w-full input input-bordered flex items-center gap-2 md:gap-3 ${focusClasses} ${errors.firstName ? 'input-error' : ''}`}>
                        <User className={iconClasses} />
                        <input id="firstName" type="text" className={innerInputClasses} placeholder="John" {...register("firstName")} />
                    </div>
                    {errors.firstName && <span className="text-error text-[10px] md:text-xs mt-1 ml-1">{errors.firstName.message}</span>}
                </div>

                <div className="form-control">
                    <label htmlFor="lastName" className="label font-semibold text-base-content/80 mb-0.5 md:mb-1">
                        <span className="label-text text-sm md:text-base">Last Name</span>
                    </label>
                    <div className={`w-full input input-bordered flex items-center gap-2 md:gap-3 ${focusClasses} ${errors.lastName ? 'input-error' : ''}`}>
                        <User className={iconClasses} />
                        <input id="lastName" type="text" className={innerInputClasses} placeholder="Doe (Optional)" {...register("lastName")} />
                    </div>
                    {errors.lastName && <span className="text-error text-[10px] md:text-xs mt-1 ml-1">{errors.lastName.message}</span>}
                </div>
            </motion.div>

            {/* --- CONDITIONAL: Email & Password --- */}
            {!isEditMode && (
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="form-control">
                        <label htmlFor="emailId" className="label font-semibold text-base-content/80 mb-0.5 md:mb-1">
                            <span className="label-text text-sm md:text-base">Email ID *</span>
                        </label>
                        <div className={`w-full input input-bordered flex items-center gap-2 md:gap-3 ${focusClasses} ${errors.emailId ? 'input-error' : ''}`}>
                            <Mail className={iconClasses} />
                            <input id="emailId" type="email" className={innerInputClasses} placeholder="john@example.com" {...register("emailId")} />
                        </div>
                        {errors.emailId && <span className="text-error text-[10px] md:text-xs mt-1 ml-1">{errors.emailId.message}</span>}
                    </div>

                    <div className="form-control">
                        <label htmlFor="password" className="label font-semibold text-base-content/80 mb-0.5 md:mb-1">
                            <span className="label-text text-sm md:text-base">Password *</span>
                        </label>
                        <div className={`w-full input input-bordered flex items-center gap-2 md:gap-3 ${focusClasses} ${errors.password ? 'input-error' : ''}`}>
                            <Lock className={iconClasses} />
                            <input id="password" type={showPassword ? "text" : "password"} className={innerInputClasses} placeholder="••••••••" {...register("password")} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-base-content/40 hover:text-primary transition-colors focus:outline-none shrink-0 p-1">
                                {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                            </button>
                        </div>
                        {errors.password && <span className="text-error text-[10px] md:text-xs mt-1 ml-1">{errors.password.message}</span>}
                    </div>
                </motion.div>
            )}

            {/* --- GRID 3: Age & Gender --- */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="form-control">
                    <label htmlFor="age" className="label font-semibold text-base-content/80 mb-0.5 md:mb-1">
                        <span className="label-text text-sm md:text-base">Age *</span>
                    </label>
                    <div className={`w-full input input-bordered flex items-center gap-2 md:gap-3 ${focusClasses} ${errors.age ? 'input-error' : ''}`}>
                        <Calendar className={iconClasses} />
                        <input id="age" type="number" min={18} className={innerInputClasses} placeholder="24" {...register("age")} />
                    </div>
                    {errors.age && <span className="text-error text-[10px] md:text-xs mt-1 ml-1">{errors.age.message}</span>}
                </div>

                <div className="form-control">
                    <label htmlFor="gender" className="label font-semibold text-base-content/80 mb-0.5 md:mb-1">
                        <span className="label-text text-sm md:text-base">Gender *</span>
                    </label>
                    <div className="relative">
                        <Users className="w-4 h-4 md:w-5 md:h-5 text-base-content/40 absolute left-3 md:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select id="gender" className={`select select-bordered w-full pl-9 md:pl-11 h-10 min-h-0 md:h-12 text-sm md:text-base outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${errors.gender ? 'select-error' : ''}`} defaultValue="" {...register("gender")}>
                            <option value="" disabled>Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Other</option>
                        </select>
                    </div>
                    {errors.gender && <span className="text-error text-[10px] md:text-xs mt-1 ml-1">{errors.gender.message}</span>}
                </div>
            </motion.div>

            {/* --- FULL WIDTH: Photo URL & About --- */}
            <motion.div variants={itemVariants} className="form-control">
                <label htmlFor="photoUrl" className="label font-semibold text-base-content/80 mb-0.5 md:mb-1">
                    <span className="label-text text-sm md:text-base">Photo URL</span>
                </label>
                <div className={`input input-bordered w-full flex items-center gap-2 md:gap-3 ${focusClasses} ${errors.photoUrl ? 'input-error' : ''}`}>
                    <ImageIcon className={iconClasses} />
                    <input id="photoUrl" type="text" className={innerInputClasses} placeholder="https://example.com/avatar.jpg" {...register("photoUrl")} />
                </div>
                {errors.photoUrl && <span className="text-error text-[10px] md:text-xs mt-1 ml-1">{errors.photoUrl.message}</span>}
            </motion.div>

            <motion.div variants={itemVariants} className="form-control">
                <label htmlFor="about" className="label font-semibold text-base-content/80 mb-0.5 md:mb-1">
                    <span className="label-text text-sm md:text-base">About Me</span>
                </label>
                {/* 🚨 FIX: Textarea padding p-3 for mobile, p-4 for desktop */}
                <div className={`textarea textarea-bordered w-full flex items-start gap-2 md:gap-3 transition-all p-3 md:p-4 focus-within:outline-none focus-within:ring-1 focus-within:ring-primary focus-within:border-primary ${errors.about ? 'textarea-error' : ''}`}>
                    <FileText className={`${iconClasses} mt-0.5`} />
                    <textarea
                        id="about"
                        // 🚨 FIX: Textarea text size responsive and min-height reduced for mobile
                        className="grow bg-transparent outline-none border-none focus:outline-none focus:ring-0 min-h-[80px] md:min-h-[100px] resize-y p-0 text-sm md:text-base"
                        placeholder="Write a short bio..."
                        {...register("about")}
                    ></textarea>
                </div>
                {errors.about && <span className="text-error text-[10px] md:text-xs mt-1 ml-1">{errors.about.message}</span>}
            </motion.div>

            {/* --- SKILLS CHIP INPUT --- */}
            <motion.div variants={itemVariants}>
                <ChipInput watch={watch} setValue={setValue} errors={errors} fieldName="skills" label="Your Tech Stack" />
            </motion.div>
        </div>
    );
}