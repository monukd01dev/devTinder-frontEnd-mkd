import { LogOut } from "lucide-react";
import useLogout from "../hooks/useLogout";

export default function LogoutConfirm({ onClose }) {
    const {handleLogout} = useLogout();

    return (
        <div className="flex flex-col items-center text-center pt-2 md:pt-4 pb-1 md:pb-2">
            
            {/* 🚨 Mobile-first sizes: w-16 h-16 on mobile, w-20 h-20 on desktop */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-warning/10 flex items-center justify-center mb-4 md:mb-6">
                <LogOut className="w-8 h-8 md:w-10 md:h-10 text-warning ml-1 md:ml-2" /> 
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-base-content mb-2">
                Leaving so soon?
            </h2>
            
            <p className="text-base-content/60 text-xs md:text-sm mb-6 md:mb-8 px-2 md:px-4">
                Are you sure you want to log out of your DevTinder account? You will need to enter your credentials to log back in.
            </p>

            <div className="flex w-full gap-2 md:gap-3">
                {/* 🚨 Buttons consistent height */}
                <button 
                    onClick={onClose}
                    className="flex-1 py-2.5 md:py-3 px-4 rounded-xl bg-base-200 hover:bg-base-300 text-base-content font-semibold transition-colors text-sm md:text-base"
                >
                    Cancel
                </button>
                
                <button 
                    onClick={handleLogout}
                    className="flex-1 py-2.5 md:py-3 px-4 rounded-xl bg-warning hover:bg-warning/80 text-warning-content font-bold shadow-lg transition-colors text-sm md:text-base"
                >
                    Yes, Log out
                </button>
            </div>
        </div>
    );
}