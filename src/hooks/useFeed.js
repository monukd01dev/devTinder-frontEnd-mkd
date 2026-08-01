import { getUserFeed } from "../services/user.service";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed,restoreUserToFeed } from "../store/slices/feedSlice"; 
import toast from "react-hot-toast";
import { sendConnectionRequest } from "../services/connectionRequests.service";

export default function useFeed() {
    const dispatch = useDispatch();
    const feedUsers = useSelector((store) => store.feed);
    
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    
    // 🚨 FIX 1: Nayi state banai Circuit Breaker ke liye
    const [isError, setIsError] = useState(false); 
    const limit = 10;

    const fetchNextPage = useCallback(async () => {
        if (isFetching || !hasMore) return;

        setIsFetching(true);
        setIsError(false); // Nayi attempt par error reset kar do

        try {
            const data = await getUserFeed(page, limit);
            const newData = data?.feed;

            // 🚨 FIX 2: Check karo ki response ek Array hi hai (Iterable bug fixed)
            if (!Array.isArray(newData)) {
                throw new Error("Invalid data format received from server");
            }

            dispatch(addFeed(newData));

            if (newData.length < limit) {
                setHasMore(false); 
            } else {
                setPage((prev) => prev + 1); 
            }
        } catch (error) {
            console.error("Feed fetch error:", error);
            toast.error(error.message || "Failed to load feed");
            
            // 🚨 FIX 3: Error aane par flag true kar do taaki infinite loop toot jaye
            setIsError(true); 
        } finally {
            setIsFetching(false);
        }
    }, [page, hasMore, isFetching, limit, dispatch]);

    // 🚨 THRESHOLD OBSERVER
    useEffect(() => {
        // 🚨 FIX 4: `!isError` add kiya. Ab agar server down hai toh auto-fetch nahi hoga!
        if (feedUsers.length <= 2 && hasMore && !isError) {
            fetchNextPage();
        }
    }, [feedUsers.length, hasMore, isError, fetchNextPage]);

    const handleSwipe = async (user, action) => {
        dispatch(removeUserFromFeed(user._id));

        try {
            await sendConnectionRequest(user._id, action); 
            console.log(`Successfully marked user ${user._id} as ${action}`);
        } catch (error) {

            console.error("Action failed", error);
            //rollback user
            dispatch(restoreUserToFeed(user))
            toast.error(`Failed to ${action} user. Check your connection.`);
        }
    };

    // 💡 BONUS: Ek function export kar rahe hain taaki user UI se manual retry kar sake
    const retryFetch = () => {
        setIsError(false); // Error hatao taaki useEffect fir se API call maar sake
    };

    return {
        feedUsers,
        isFetching,
        hasMore,
        isError,      
        retryFetch,   
        handleSwipe
    };
}