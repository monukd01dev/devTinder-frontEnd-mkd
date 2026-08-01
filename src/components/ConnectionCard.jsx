import { MessageSquare, User } from "lucide-react";

export default function ConnectionCard({ connection }) {
    const { firstName, lastName, photoUrl, age, gender, about } = connection;

    return (
        <div className="card bg-base-300/60 backdrop-blur-lg border border-white/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            
            {/* 🚨 FIX: Same responsive paddings as RequestCard */}
            <div className="card-body items-center text-center p-4 pt-6 md:pt-8 md:pb-4">
                
                <div className="avatar mb-2 md:mb-3">
                    <div className="w-20 md:w-24 rounded-full ring ring-primary ring-offset-base-300 ring-offset-4 group-hover:ring-secondary transition-all duration-300">
                        <img 
                            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                            alt={firstName} 
                            className="object-cover"
                        />
                    </div>
                </div>

                <h2 className="card-title text-xl md:text-2xl font-extrabold capitalize text-white mb-1">
                    {firstName} {lastName} 
                    <span className="text-base md:text-lg font-medium text-gray-400 normal-case">{age}</span>
                </h2>

                <div className="badge badge-outline badge-xs md:badge-sm text-gray-400 capitalize mb-2 md:mb-3 font-semibold tracking-wider">
                    {gender}
                </div>

                <p className="text-xs md:text-sm text-gray-300 line-clamp-2 h-8 md:h-10 w-full px-1">
                    {about || "This user is mysterious..."}
                </p>
            </div>

            {/* 🚨 FIX: Consistent action area for mobile */}
            <div className="px-4 pb-4 md:px-6 md:pb-6 w-full flex gap-2 md:gap-3 mt-auto">
                <button className="btn btn-primary h-10 min-h-0 md:h-12 flex-1 rounded-xl shadow-lg shadow-primary/20 text-xs md:text-sm">
                    <MessageSquare className="w-4 h-4" /> Message
                </button>
                <button className="btn btn-outline border-white/10 hover:bg-white/10 text-white h-10 min-h-0 w-10 md:w-12 md:h-12 flex-none rounded-xl btn-square p-0">
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>
        </div>
    );
}