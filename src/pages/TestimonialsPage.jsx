import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Testimonials from "../components/Testimonials";
import EditorialSpotlight from "../components/EditorialSpotlight";
import KineticCardStack from "../components/KineticCardStack";
import ProfessionalWall from "../components/ProfessionalWall";

export default function TestimonialsPage() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Scroll Restoration & Listener
    useEffect(() => {
        // More robust restoration with a small delay for content height calculation
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
            // Fallback for some browsers/layouts
            document.documentElement.scrollTo(0, 0);
            document.body.scrollTo(0, 0);
        }, 100);

        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            if (scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const scrollToTop = () => {
        // Dual approach for maximum compatibility
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        // Immediate fallback attempt if window.scrollTo is rejected/fails
        try {
            document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
            document.body.scrollTo({ top: 0, behavior: "smooth" });
        } catch (e) {
            // Last resort: jump to top
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-[#0f0f0f]">
            {/* Global Navigation Link */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="fixed top-8 left-8 z-[100]"
            >
                <Link to="/">
                    <motion.div 
                        whileHover={{ x: -10 }}
                        className="group flex gap-4 items-center bg-white/5 backdrop-blur-md border border-white/10 py-3 px-6 rounded-full hover:bg-white hover:border-white transition-all duration-500"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black transition-colors">
                            <svg className="w-4 h-4 text-white group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </div>
                        <span className="text-white group-hover:text-black font-black uppercase text-[0.6rem] tracking-[0.4em]">Back to Home</span>
                    </motion.div>
                </Link>
            </motion.div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-[100]"
                    >
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="group flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-full hover:bg-white hover:border-white transition-all duration-500 shadow-2xl"
                        >
                            <span className="text-white group-hover:text-black font-black uppercase text-[0.55rem] tracking-[0.5em] pl-2 hidden md:block">Scroll to Top</span>
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black transition-colors">
                                <svg className="w-3 h-3 text-white group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="w-full">
                <Testimonials />
                <EditorialSpotlight />
                <KineticCardStack />
                <ProfessionalWall />
            </main>
        </div>
    );
}
