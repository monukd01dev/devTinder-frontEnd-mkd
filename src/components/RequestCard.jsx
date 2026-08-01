import { Check, X } from "lucide-react";

export default function RequestCard({ request, onAction }) {
    const { _id: requestId } = request; 
    const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

    return (
        <div className="card bg-base-300/60 backdrop-blur-lg border border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
            
            <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary"></div>

            <div className="card-body items-center text-center p-4 pt-6 md:pt-8 md:pb-4">
                
                <div className="avatar mb-2 md:mb-3">
                    <div className="w-20 md:w-24 rounded-full ring ring-primary/50 ring-offset-base-300 ring-offset-4 group-hover:ring-primary transition-all duration-300">
                        <img 
                            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                            alt={firstName} 
                            className="object-cover"
                        />
                    </div>
                </div>

                <h2 className="card-title text-xl md:text-2xl font-extrabold capitalize text-white mb-1">
                    {firstName} {lastName} 
                    {age && <span className="text-base md:text-lg font-medium text-gray-400 normal-case">{age}</span>}
                </h2>

                <div className="badge badge-outline badge-xs md:badge-sm text-gray-400 capitalize mb-2 md:mb-3 font-semibold tracking-wider">
                    {gender}
                </div>

                <p className="text-xs md:text-sm text-gray-300 line-clamp-2 h-8 md:h-10 w-full px-1 italic">
                    "{about || "Hey there! I'd like to connect."}"
                </p>
            </div>

            <div className="px-4 pb-4 md:px-6 md:pb-6 w-full flex gap-2 md:gap-4 mt-auto">
                <button 
                    onClick={() => onAction(requestId, 'rejected')}
                    className="btn btn-error btn-outline h-10 min-h-0 md:h-12 flex-1 rounded-xl hover:scale-105 transition-transform text-xs md:text-sm"
                >
                    <X className="w-4 h-4 md:w-5 md:h-5" /> Reject
                </button>
                
                {/* 🚨 THE FIX: btn-success hatakar bg-emerald-500 lagaya hai. Soft, premium green! */}
                <button 
                    onClick={() => onAction(requestId, 'accepted')}
                    className="btn border-none bg-emerald-500 hover:bg-emerald-600 h-10 min-h-0 md:h-12 flex-1 rounded-xl text-white shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform text-xs md:text-sm"
                >
                    <Check className="w-4 h-4 md:w-5 md:h-5" /> Accept
                </button>
            </div>
        </div>
    );
}