import { Link } from "react-router";
import { Flame, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-base-300/40 backdrop-blur-xl border-t border-white/5 text-base-content py-10 px-4 md:px-8 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                
                {/* Brand & Info */}
                <div className="flex flex-col items-start space-y-3 md:col-span-2">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                            <Flame className="w-5 h-5 text-white" strokeWidth={2.5} fill="currentColor" />
                        </div>
                        <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-wide">
                            DevTinder
                        </span>
                    </Link>
                    <p className="text-xs md:text-sm text-base-content/60 max-w-sm leading-relaxed">
                        The ultimate platform for developers to find pair programmers, collaborate on open-source repositories, and build the future together.
                    </p>
                </div>

                {/* Quick Navigation Links */}
                <div className="flex flex-col space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-1">
                        Navigation
                    </h3>
                    <Link to="/user/feed" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                        Explore Feed
                    </Link>
                    <Link to="/user/connections" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                        My Connections
                    </Link>
                    <Link to="/user/requests" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                        Pending Requests
                    </Link>
                    <Link to="/user/profile" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                        Edit Profile
                    </Link>
                </div>

                {/* Socials / Connect */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-1">
                        Connect
                    </h3>
                    <div className="flex items-center gap-3">
                        {/* GitHub */}
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-base-200/60 hover:bg-primary/25 hover:text-primary text-base-content/70 transition-colors border border-base-content/5"
                            title="GitHub"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                        </a>
                        {/* Twitter / X */}
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-base-200/60 hover:bg-primary/25 hover:text-primary text-base-content/70 transition-colors border border-base-content/5"
                            title="Twitter"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-base-200/60 hover:bg-primary/25 hover:text-primary text-base-content/70 transition-colors border border-base-content/5"
                            title="LinkedIn"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright & Author Credit */}
            <div className="max-w-7xl mx-auto pt-6 border-t border-base-content/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-base-content/50 font-medium">
                <p>© {new Date().getFullYear()} DevTinder. All rights reserved.</p>
                <p className="flex items-center gap-1">
                    Designed & Built with <Heart className="w-3.5 h-3.5 text-error fill-error" /> by <span className="text-primary font-bold">monukd01dev</span>
                </p>
            </div>
        </footer>
    );
}