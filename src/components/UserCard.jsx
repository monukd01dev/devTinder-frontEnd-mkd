import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import { formatUserEnteredName } from "../utils/helper";
import { FALLBACK_PROFILE_IMG } from "../utils/constants";

function UserCard({ user }) {
    const [showAbout, setShowAbout] = useState(false);

    if (!user) return null;

    const { firstName, lastName, photoUrl, age, gender, skills, about } = user;
    const userGender = gender?.toLowerCase();

    const getThemeStyles = () => {
        if (userGender === "male") {
            return "border-2 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]";
        } else if (userGender === "female") {
            return "border-2 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]";
        } else {
            return "p-[3px] bg-gradient-to-br from-red-500 via-purple-500 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.3)]";
        }
    };

    return (
        /* 🚨 FIX: Responsive width and height for mobile safety */
        <div className={`relative w-72 sm:w-[22rem] h-[30rem] sm:h-[35rem] rounded-[2rem] overflow-hidden group ${getThemeStyles()} [transform:translateZ(0)]`}>
            
            {/* Inner Wrapper */}
            <div className="relative w-full h-full bg-base-300 rounded-[2rem] overflow-hidden isolate z-0">

                <img
                    src={photoUrl || FALLBACK_PROFILE_IMG}
                    alt={firstName}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>

                <button
                    onClick={() => setShowAbout(true)}
                    className="absolute top-5 right-5 z-20 btn btn-circle btn-sm bg-black/30 border border-white/20 text-white backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center"
                >
                    <Info className="w-4 h-4" />
                </button>

                <div className="absolute bottom-0 w-full p-6 flex flex-col gap-3 z-10 text-white">
                    <h2 className="text-2xl sm:text-3xl font-extrabold flex items-baseline gap-2 drop-shadow-lg">
                        {formatUserEnteredName(firstName) + " " + formatUserEnteredName(lastName)}
                        {age && <span className="text-lg sm:text-xl font-medium text-gray-300 normal-case">{age}</span>}
                    </h2>

                    <span className="text-sm font-semibold tracking-wider text-gray-400 capitalize">
                        {gender}
                    </span>

                    {skills && skills.length > 0 && (
                        <div className="relative mt-2">
                            <div className="max-h-20 sm:max-h-24 overflow-y-auto flex flex-wrap gap-2 py-2 sm:py-3
                                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                                [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className={"px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm capitalize"}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* About Overlay */}
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-xl p-8 z-30 text-white flex flex-col rounded-[2rem]
        transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
        ${showAbout ? 'translate-y-0' : 'translate-y-full'}`}>

                    <button
                        onClick={() => setShowAbout(false)}
                        className="absolute top-5 right-5 btn btn-circle btn-sm btn-ghost text-white hover:bg-white/10 flex items-center justify-center"
                    >
                        <ChevronDown className="w-6 h-6" />
                    </button>

                    <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">About Me</h3>

                    <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full text-gray-200 leading-relaxed font-medium break-words normal-case">
                        {about ? about : "This user hasn't written anything about themselves yet."}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserCard;