import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { Flame, Activity, Users, Bell, User as UserIcon, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { useState } from "react";
import LogoutConfirm from "./LogoutConfirm";

function Navbar() {
    const user = useSelector((store) => store.user);
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const navItems = [
        { path: '/app/feed', label: 'Feed', icon: Activity },
        { path: '/app/connections', label: 'Connections', icon: Users },
        { path: '/app/requests/recieved', label: 'Requests', icon: Bell },
    ];

    return (
        // 🚨 THE FIX: 'min-h-12' hata diya. Ab strict 'h-14 min-h-0' lagaya hai.
        // Isse DaisyUI apna extra size nahi ghusa payega. Mobile pe ekdum slim rahega.
        <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] md:w-[95%] max-w-6xl navbar h-14 md:h-16 min-h-0 py-0 bg-base-100/80 backdrop-blur-xl shadow-lg rounded-full px-3 md:px-8 border border-base-content/10 text-base-content transition-all">

            {/* --- LEFT SIDE: LOGO --- */}
            <div className="navbar-start">
                <Link to={user ? "/app/feed" : "/"} className="text-lg md:text-2xl font-extrabold tracking-tight flex items-center gap-1.5 md:gap-2 hover:opacity-80 transition-opacity">
                    <Flame className="text-primary w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
                    <span className="hidden sm:block">DevTinder</span>
                </Link>
            </div>

            {/* --- CENTER SIDE: NAVLINKS --- */}
            {user && (
                <div className="navbar-center hidden lg:flex h-full">
                    <div className="flex items-center gap-2 h-full">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors duration-300 font-medium text-sm
                                        ${isActive ? "text-primary" : "text-base-content/70 hover:text-base-content hover:bg-base-content/5"}`}
                                >
                                    <item.icon className="w-4 h-4" /> {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-underline"
                                            className="absolute left-0 bottom-0 w-full h-[3px] bg-primary rounded-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* --- RIGHT SIDE: UI --- */}
            <div className="navbar-end">
                {!user ? (
                    <div className="flex items-center gap-2">
                        <Link to='/login' className="btn btn-ghost min-h-0 h-9 px-3 md:h-10 md:px-4 text-xs md:text-sm rounded-full text-base-content/80 hover:text-base-content hover:bg-base-content/10 font-semibold">
                            Log in
                        </Link>
                        <Link to='/signup' className="btn btn-primary min-h-0 h-9 px-4 md:h-10 md:px-6 text-xs md:text-sm rounded-full font-bold shadow-lg shadow-primary/30">
                            Sign up
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="hidden sm:block font-semibold text-sm md:text-base text-base-content/80">
                            Hi, {user.firstName}
                        </span>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar min-h-0 h-auto p-0 ring-2 ring-base-200 hover:ring-primary transition-all">
                                {/* Avatar size slightly reduced for mobile */}
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
                                    <img
                                        alt={user.firstName}
                                        src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 border border-base-content/10 rounded-box z-[50] mt-3 md:mt-4 w-52 p-2 shadow-2xl font-medium text-base-content">
                                <li>
                                    <Link to='/app/profile' className="py-2.5 md:py-3 hover:bg-base-300 flex items-center gap-3">
                                        <UserIcon className="w-4 h-4 md:w-5 md:h-5 opacity-70" /> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/app/account' className="py-2.5 md:py-3 hover:bg-base-300 flex items-center gap-3">
                                        <Settings className="w-4 h-4 md:w-5 md:h-5 opacity-70" /> Account
                                    </Link>
                                </li>

                                <div className="divider my-0 lg:hidden"></div>

                                {navItems.map((item) => (
                                    <li key={`mobile-${item.path}`} className="lg:hidden">
                                        <Link to={item.path} className="py-2.5 md:py-3 flex items-center gap-3">
                                            <item.icon className="w-4 h-4 opacity-70" /> {item.label}
                                        </Link>
                                    </li>
                                ))}

                                <div className="divider my-0"></div>

                                <li onClick={()=>setIsModalOpen(true)}>
                                    <a className="py-2.5 md:py-3 text-error hover:bg-error/10 flex items-center gap-3 cursor-pointer">
                                        <LogOut className="w-4 h-4 md:w-5 md:h-5" /> Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
                <LogoutConfirm onClose={()=> setIsModalOpen(false)}/>
            </Modal>

        </div>
    );
}

export default Navbar;