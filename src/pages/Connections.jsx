import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import ConnectionCard from "../components/ConnectionCard";
import { getUserConnections } from "../services/user.service";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import RefreshButton from "../components/RefreshButton";

export default function Connections() {
    const [connections, setConnections] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const transitionSettings = { duration: 0.25, ease: "easeOut" };

    const getConnections = async () => {
        try {
            !isLoading && setIsLoading(true)
            const data = await getUserConnections();
            setConnections(data?.connections || []);
            setTotal(data?.totalConnections || 0);
        } catch (error) {
            console.error("Failed to fetch connections", error);
            toast.error(error.message || "Failed to load connections. Please try again!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefreshConnections = () => getConnections() 
    useEffect(() => {
        getConnections();
    }, []);

    return (
            <div className="w-full">

                {/* 🚨 THE FIX: Same Requests page wala Row Layout */}
                <div className="mb-6 md:mb-10">
                    <div className="flex flex-row justify-between items-center gap-2">
                        {/* 🚨 Heading left aligned, responsive text, shrink-0 added */}
                        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-base-content flex items-center gap-2 md:gap-3">
                            <Users className="w-6 h-6 md:w-8 md:h-8 text-primary shrink-0" />
                            <span className="truncate">My Connections</span>
                        </h1>
                        
                        <div className="shrink-0">
                            <RefreshButton
                                onRefresh={handleRefreshConnections}
                                isRefreshing={isLoading}
                            />
                        </div>
                    </div>

                    {/* 🚨 Subtitle theek neeche */}
                    <p className="text-xs sm:text-sm md:text-base text-base-content/70 mt-1 md:mt-2 font-medium">
                        You have <span className="text-primary font-bold">{total}</span> brilliant minds in your network.
                    </p>
                </div>

                {/* Content Section */}
                {isLoading ? (
                    // 🔄 SKELETON LOADER GRID (Gap and padding scaled for mobile)
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="card bg-base-300/40 p-4 md:p-6 flex flex-col items-center gap-3 md:gap-4 border border-base-content/10">
                                <div className="skeleton w-20 h-20 md:w-24 md:h-24 rounded-full shrink-0"></div>
                                <div className="skeleton h-5 md:h-6 w-3/4 rounded-md"></div>
                                <div className="skeleton h-3 md:h-4 w-1/4 rounded-md mb-1 md:mb-2"></div>
                                <div className="skeleton h-10 md:h-12 w-full rounded-md mt-auto"></div>
                            </div>
                        ))}
                    </div>
                ) : connections.length === 0 ? (
                    // 📭 EMPTY STATE
                    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4 bg-base-300/30 rounded-2xl md:rounded-[2rem] border border-base-content/10 border-dashed">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-base-200 rounded-full flex items-center justify-center mb-3 md:mb-4">
                            <Users className="w-8 h-8 md:w-10 md:h-10 text-base-content/40" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-base-content mb-1 md:mb-2">No connections yet</h3>
                        <p className="text-sm md:text-base text-base-content/60 max-w-xs md:max-w-md text-center">
                            Start swiping and sending requests to build your developer network!
                        </p>
                    </div>
                ) : (
                    // ✨ THE REAL GRID
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {connections.map((conn) => (
                            <ConnectionCard key={conn._id} connection={conn} />
                        ))}
                    </div>
                )}

            </div>
    );
}