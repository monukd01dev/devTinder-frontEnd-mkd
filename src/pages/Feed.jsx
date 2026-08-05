import SwipeableCard from "../components/SwipeableCard";
import UserCard from "../components/UserCard";
import UserCardSkeleton from "../components/UserCardSkeleton";
import useFeed from "../hooks/useFeed";

export default function Feed() {
    const { feedUsers, isFetching, handleSwipe, isError, retryFetch } = useFeed();

    return (
        // 1. Parent Wrapper ekdum simple: Pura space lega (flex-1), overflow nahi karega
        <div className="w-full flex-1 flex flex-col items-center px-4">
            
            {/* Jab array empty ho jaye (Center mein) */}
            {feedUsers.length === 0 && !isFetching && !isError && (
                <div className="text-center text-base-content/60 my-auto">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-base-content mb-2">No more profiles!</h2>
                    <p className="text-base md:text-lg">Come back later for new connections.</p>
                </div>
            )}

            {/* Skeleton (Center mein) */}
            {feedUsers.length === 0 && isFetching && !isError && (
                <div className="flex items-center justify-center my-auto">
                    <UserCardSkeleton />
                </div>
            )}

            {/* Agar error aa jaye (Center mein) */}
            {isError && (
                <div className="flex flex-col items-center justify-center my-auto text-center">
                    <h2 className="text-xl md:text-2xl font-bold text-error mb-3">Oops! Network Error</h2>
                    <p className="text-sm md:text-base text-base-content/60 mb-6 max-w-xs">Failed to load profiles. Check your internet or try again.</p>
                    <button onClick={retryFetch} className="btn btn-primary h-12 rounded-xl px-8 text-base font-bold shadow-lg shadow-primary/30">
                        Retry Now
                    </button>
                </div>
            )}

            {/* ✨ THE CARD STACK ✨ */}
            {feedUsers.length > 0 && !isError && (
                // 2. THE REAL MAGIC IS HERE 👇
                // Mobile: 'mt-8 mb-auto' (Upar se thoda gap, aur baaki jagah neeche chhod dega)
                // Desktop: 'md:my-auto' (Upar aur neeche equal jagah = Perfect Center)
                <div className="relative flex justify-center w-full max-w-sm h-[480px] md:h-[550px] mt-4 mb-auto md:my-auto z-10">
                    {feedUsers.slice(0, 2).reverse().map((user, index) => {
                        const isTopCard = index === feedUsers.slice(0, 2).length - 1;
                        return (
                            <SwipeableCard
                                key={user._id}
                                active={isTopCard}
                                zIndex={index}
                                onSwipe={(action) => handleSwipe(user, action)}
                            >
                                <UserCard user={user} isFeedCard={true} />
                            </SwipeableCard>
                        );
                    })}
                </div>
            )}
        </div>
    );
}