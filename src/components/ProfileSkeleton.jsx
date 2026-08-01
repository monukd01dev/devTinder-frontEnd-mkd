import UserCardSkeleton from "./UserCardSkeleton";

function ProfileSkeleton() {
    return (
        // 🚨 FIX: Exact same wrapper layout as Profile.jsx
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center lg:items-start lg:mt-10 px-4 pb-12 md:pb-20">
            
            {/* LEFT SIDE: Card Preview Skeleton */}
            {/* 🚨 FIX: Card ko left me rakha (w-[40%]) jaise real Profile me hai */}
            <div className="w-full lg:w-[40%] flex justify-center lg:sticky lg:top-24 z-10 h-max self-start md:self-center lg:self-start">
                <UserCardSkeleton />
            </div>

            {/* RIGHT SIDE: Form Skeleton */}
            {/* 🚨 FIX: Form ko w-[60%], p-5 on mobile, p-8 on desktop */}
            <div className="w-full lg:w-[60%] bg-base-300/50 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-2xl">
                {/* Heading Skeleton */}
                <div className="h-6 md:h-8 w-32 md:w-40 skeleton bg-base-content/20 rounded-md mb-6 md:mb-8"></div>
                
                {/* Inputs Skeleton */}
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex gap-3 md:gap-4">
                        <div className="h-10 md:h-12 w-1/2 skeleton bg-base-content/20 rounded-xl"></div>
                        <div className="h-10 md:h-12 w-1/2 skeleton bg-base-content/20 rounded-xl"></div>
                    </div>
                    <div className="flex gap-3 md:gap-4">
                        <div className="h-10 md:h-12 w-1/2 skeleton bg-base-content/20 rounded-xl"></div>
                        <div className="h-10 md:h-12 w-1/2 skeleton bg-base-content/20 rounded-xl"></div>
                    </div>
                    <div className="h-10 md:h-12 w-full skeleton bg-base-content/20 rounded-xl"></div>
                    <div className="h-20 md:h-24 w-full skeleton bg-base-content/20 rounded-xl"></div>
                    <div className="h-10 md:h-12 w-full skeleton bg-base-content/20 rounded-xl"></div>
                    
                    {/* Button Skeleton */}
                    <div className="h-12 md:h-14 w-full skeleton bg-primary/40 rounded-xl mt-2 md:mt-4"></div>
                </div>
            </div>

        </div>
    );
}

export default ProfileSkeleton;