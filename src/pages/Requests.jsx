import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import RequestCard from "../components/RequestCard";
import { motion } from "framer-motion";
import RefreshButton from "../components/RefreshButton";
import { reviewConnectionRequest } from "../services/connectionRequests.service";
import { getUserConnectionRequests } from "../services/user.service";

export default function Requests() {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const transitionSettings = { duration: 0.25, ease: "easeOut" };

    const getRequests = async () => {
        try {
            !isLoading && setIsLoading(true)
            const res = await getUserConnectionRequests();
            setRequests(res); 
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error(error.message || "Failed to load requests.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefreshConnections = () => getRequests()
    useEffect(() => {
        getRequests();
    }, []);

    const handleRequestAction = async (requestId, status) => {
        const toastId = toast.loading(`Marking as ${status}...`);
        try {
            await reviewConnectionRequest(requestId, status);
            setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
            toast.success(`Request ${status} successfully!`, { id: toastId });
        } catch (error) {
            console.error("Action Error:", error);
            toast.error(error.message || `Failed to ${status} request.`, { id: toastId });
        }
    };

    return (

            <div className="w-full h-full">

                {/* 🚨 THE FIX: Wrapper ko simple div banaya, aur Row logic theek kiya */}
                <div className="mb-6 md:mb-10">
                    
                    {/* 🚨 FIX 1: Title aur Refresh Button ab HAMESHA Row me (aamne-samne) rahenge */}
                    <div className="flex flex-row justify-between items-center gap-2">
                        {/* 🚨 FIX 2: Text size further reduced (text-xl on mobile) and icon shrinked */}
                        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white flex items-center gap-2 md:gap-3">
                            <UserPlus className="w-5 h-5 md:w-8 md:h-8 text-primary shrink-0" />
                            <span className="truncate">Pending Requests</span>
                        </h1>
                        
                        <div className="shrink-0">
                            <RefreshButton
                                onRefresh={handleRefreshConnections}
                                isRefreshing={isLoading}
                            />
                        </div>
                    </div>

                    {/* 🚨 Subtitle ko Heading ke theek neeche rakha taaki overlap na ho (text-xs on mobile) */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1 md:mt-2 font-medium">
                        You have <span className="text-primary font-bold">{requests.length}</span> people waiting to connect.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="card bg-base-300/40 p-4 md:p-6 flex flex-col items-center gap-3 md:gap-4 border border-white/5">
                                <div className="skeleton w-20 h-20 md:w-24 md:h-24 rounded-full"></div>
                                <div className="skeleton h-5 md:h-6 w-3/4 rounded-md"></div>
                                <div className="skeleton h-3 md:h-4 w-1/4 rounded-md mb-1 md:mb-2"></div>
                                <div className="w-full flex gap-2 md:gap-3 mt-2 md:mt-4">
                                    <div className="skeleton h-10 md:h-12 flex-1 rounded-xl"></div>
                                    <div className="skeleton h-10 md:h-12 flex-1 rounded-xl"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4 bg-base-300/30 rounded-2xl md:rounded-[2rem] border border-white/5 border-dashed">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-base-200 rounded-full flex items-center justify-center mb-3 md:mb-4">
                            <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-gray-500" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">All caught up!</h3>
                        <p className="text-sm md:text-base text-gray-400 max-w-xs md:max-w-md text-center">
                            You don't have any pending requests right now. Time to explore the feed!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {requests.map((request) => (
                            <RequestCard
                                key={request._id}
                                request={request}
                                onAction={handleRequestAction}
                            />
                        ))}
                    </div>
                )}
            </div>

    );
}