import CursorTrail from "../components/CursorTrail";
import Hero from "../components/Hero";
import HorizontalScroll from "../components/HorizontalScroll";
import CardStack from "../components/CardStack";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="relative w-full min-h-screen bg-[#0f0f0f]">
            {/* Scope CursorTrail only to Header and Hero */}
            <CursorTrail>
                <div className="container mx-auto px-6 py-1 relative z-10 flex flex-col min-h-[100svh] justify-start">
                    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center bg-transparent">
                        <div className="flex gap-8 items-center">
                            <Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-widest uppercase">
                                Testimonials
                            </Link>
                        </div>
                    </nav>
                    <main className="mt-40 flex flex-col gap-24 w-full max-w-5xl mx-auto">
                        <Hero />
                    </main>
                </div>
            </CursorTrail>

            {/* Rest of the site without the trail */}
            <div className="container mx-auto px-6 relative z-10 w-full flex flex-col justify-start">
                {/* Horizontal Scroll Section - Full width */}
                <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                    <HorizontalScroll />
                </div>

                <CardStack />
            </div>
        </div>
    );
}
