function UserCardSkeleton() {
    return (
        /* 🚨 DaisyUI 'stack' class added for the stacked card loading effect */
        <div className="stack items-center justify-center">
            
            {/* Top Skeleton Card */}
            <div className="relative w-72 sm:w-[22rem] h-[30rem] sm:h-[35rem] rounded-[2rem] overflow-hidden border-2 border-base-300 shadow-xl bg-base-200">
                <div className="relative w-full h-full bg-base-200 rounded-[1.8rem] overflow-hidden flex flex-col justify-end">
                    
                    {/* ℹ️ INFO BUTTON SKELETON */}
                    <div className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full skeleton bg-base-content/25"></div>

                    {/* 📝 USER DETAILS SKELETON (Bottom section) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-base-300/40 to-transparent pointer-events-none z-0"></div>

                    <div className="relative w-full p-6 flex flex-col gap-3 z-10">
                        
                        {/* Name & Age Skeleton */}
                        <div className="flex items-end gap-2">
                            <div className="h-8 w-48 skeleton bg-base-content/25 rounded-md"></div>
                            <div className="h-6 w-12 skeleton bg-base-content/25 rounded-md"></div>
                        </div>

                        {/* Gender Badge Skeleton */}
                        <div className="h-4 w-20 skeleton bg-base-content/25 rounded-md mt-1"></div>

                        {/* 🛠️ SKILLS SECTION SKELETON */}
                        <div className="relative mt-2">
                            <div className="flex flex-wrap gap-2 py-3">
                                <div className="h-7 w-20 skeleton bg-base-content/25 rounded-full"></div>
                                <div className="h-7 w-24 skeleton bg-base-content/25 rounded-full"></div>
                                <div className="h-7 w-16 skeleton bg-base-content/25 rounded-full"></div>
                                <div className="h-7 w-28 skeleton bg-base-content/25 rounded-full"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Back Stack Card Effect (Optional subtle depth layer) */}
            <div className="w-64 sm:w-[20rem] h-[28rem] sm:h-[33rem] rounded-[2rem] bg-base-300/50 border border-base-300 opacity-60"></div>

        </div>
    );
}

export default UserCardSkeleton;