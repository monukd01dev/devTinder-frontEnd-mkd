import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";

export default function HomePage() {
    return (
        <div className="w-full relative">
            
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-[90px] md:blur-[150px] pointer-events-none"></div>
            
            <main className="relative z-10 w-full">
                <HeroSection />
                <FeatureSection />
            </main>

        </div>
    );
}