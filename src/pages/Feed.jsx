import SwipeableCard from "../components/SwipeableCard";
import UserCard from "../components/UserCard";
import UserCardSkeleton from "../components/UserCardSkeleton";
import useFeed from "../hooks/useFeed";

export default function Feed() {
    const { feedUsers, isFetching, handleSwipe, isError, retryFetch } = useFeed();

    return (
        <div className="w-full h-full flex-1 flex flex-col items-center justify-center">
            {/* Jab array empty ho jaye */}
            {feedUsers.length === 0 && !isFetching && (
                <div className="text-center text-base-content/60 px-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-base-content mb-2">No more profiles!</h2>
                    <p className="text-base md:text-lg">Come back later for new connections.</p>
                </div>
            )}

            {/* Skeleton Loading Indicator with Stack */}
            {feedUsers.length === 0 && isFetching && (
                <div className="flex items-center justify-center my-auto">
                    <UserCardSkeleton />
                </div>
            )}

            {/* Agar error aa jaye */}
            {isError && (
                <div className="flex flex-col items-center justify-center px-4">
                    <h2 className="text-xl md:text-2xl font-bold text-error mb-3">Oops! Network Error</h2>
                    <p className="text-sm md:text-base text-base-content/60 mb-6 text-center max-w-xs">Failed to load profiles. Check your internet or try again.</p>
                    <button
                        onClick={retryFetch}
                        className="btn btn-primary h-12 rounded-xl px-8 text-base font-bold shadow-lg shadow-primary/30"
                    >
                        Retry Now
                    </button>
                </div>
            )}

            {/* ✨ THE CARD STACK ✨ */}
            <div className="relative flex items-center justify-center w-full max-w-sm mx-auto my-auto z-10">
                {feedUsers.length > 0 && feedUsers.slice(0, 2).reverse().map((user, index) => {
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
        </div>
    );
}