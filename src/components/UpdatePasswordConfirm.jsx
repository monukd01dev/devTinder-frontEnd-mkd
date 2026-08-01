import { KeyRound, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdatePassword from "../hooks/useUpdatePassword";
import { updatePasswordSchema } from "../validations/auth.schema";

export default function UpdatePasswordConfirm({ onClose }) {
    const { handleUpdate } = useUpdatePassword();

    const [showPass, setShowPass] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const toggleShow = (field) => {
        setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const { 
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm({
        resolver: zodResolver(updatePasswordSchema),
    });

    const onSubmit = (data) => {
        handleUpdate(data);
    };

    return (
        <div className="flex flex-col items-center pt-2 pb-1">
            
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                <KeyRound className="w-8 h-8 md:w-10 md:h-10 text-primary" /> 
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-base-content mb-2 text-center">
                Change Password
            </h2>
            
            <p className="text-base-content/60 text-xs md:text-[13px] mb-6 text-center px-2 md:px-4 leading-relaxed">
                Your new password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 md:gap-4">
                
                {/* 1. Current Password Field */}
                <div className="relative w-full">
                    <input 
                        type={showPass.current ? "text" : "password"} 
                        {...register("currentPassword")}
                        className={`w-full bg-base-200 border ${errors.currentPassword ? 'border-error' : 'border-base-content/20 focus:border-primary'} rounded-xl px-4 py-2.5 md:py-3 pr-12 text-base-content focus:outline-none transition-colors text-sm`}
                        placeholder="Current Password"
                    />
                    {/* 🚨 THE FIX: Absolute Vertical Centering */}
                    <button 
                        type="button"
                        onClick={() => toggleShow('current')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                    >
                        {showPass.current ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                    </button>
                </div>
                {errors.currentPassword && <p className="text-error text-[11px] md:text-xs mt-0.5 md:mt-1 ml-1">{errors.currentPassword.message}</p>}

                {/* 2. New Password Field */}
                <div className="relative w-full">
                    <input 
                        type={showPass.new ? "text" : "password"} 
                        {...register("newPassword")}
                        className={`w-full bg-base-200 border ${errors.newPassword ? 'border-error' : 'border-base-content/20 focus:border-primary'} rounded-xl px-4 py-2.5 md:py-3 pr-12 text-base-content focus:outline-none transition-colors text-sm`}
                        placeholder="New Password"
                    />
                    <button 
                        type="button"
                        onClick={() => toggleShow('new')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                    >
                        {showPass.new ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                    </button>
                </div>
                {errors.newPassword && <p className="text-error text-[11px] md:text-xs mt-0.5 md:mt-1 ml-1">{errors.newPassword.message}</p>}

                {/* 3. Confirm Password Field */}
                <div className="relative w-full">
                    <input 
                        type={showPass.confirm ? "text" : "password"} 
                        {...register("confirmPassword")}
                        className={`w-full bg-base-200 border ${errors.confirmPassword ? 'border-error' : 'border-base-content/20 focus:border-primary'} rounded-xl px-4 py-2.5 md:py-3 pr-12 text-base-content focus:outline-none transition-colors text-sm`}
                        placeholder="Confirm New Password"
                    />
                    <button 
                        type="button"
                        onClick={() => toggleShow('confirm')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                    >
                        {showPass.confirm ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="text-error text-[11px] md:text-xs mt-0.5 md:mt-1 ml-1">{errors.confirmPassword.message}</p>}

                {/* Buttons Zone */}
                <div className="flex w-full gap-2 md:gap-3 mt-3 md:mt-4">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="flex-1 py-2.5 md:py-3 px-4 rounded-xl bg-base-200 hover:bg-base-300 text-base-content font-semibold transition-colors text-sm md:text-base"
                    >
                        Cancel
                    </button>
                    
                    <button 
                        type="submit"
                        className="flex-1 py-2.5 md:py-3 px-4 rounded-xl font-bold transition-all text-sm md:text-base bg-primary hover:bg-primary/80 text-primary-content shadow-lg"
                    >
                        Update
                    </button>
                </div>
            </form>
            
        </div>
    );
}