import { motion } from "framer-motion";

const brands = [
    { name: "VOGUE", logo: "VOGUE", industry: "Fashion", color: "white" },
    { name: "ADIDAS", logo: "ADIDAS", industry: "Sportswear", color: "white" },
    { name: "REDUX", logo: "REDUX", industry: "Technology", color: "white" },
    { name: "LVMH", logo: "LVMH", industry: "Luxury", color: "white" },
    { name: "CHANEL", logo: "CHANEL", industry: "Beauty", color: "white" },
    { name: "NIKE", logo: "NIKE", industry: "Lifestyle", color: "white" },
    { name: "APPLE", logo: "APPLE", industry: "Tech", color: "white" },
    { name: "GUCCI", logo: "GUCCI", industry: "Fashion", color: "white" },
    { name: "ZARA", logo: "ZARA", industry: "Retail", color: "white" },
    { name: "DIOR", logo: "DIOR", industry: "Couture", color: "white" },
    { name: "PRADA", logo: "PRADA", industry: "Luxury", color: "white" },
    { name: "TESLA", logo: "TESLA", industry: "Innovation", color: "white" },
];

const Row = ({ items, direction = 1, speed = 20 }) => {
    return (
        <div className="flex overflow-hidden py-6 select-none">
            <motion.div
                initial={{ x: direction > 0 ? 0 : "-50%" }}
                animate={{ x: direction > 0 ? "-50%" : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex gap-4 whitespace-nowrap min-w-max"
            >
                {[...items, ...items].map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ 
                            scale: 1.02, 
                            backgroundColor: "rgba(255,255,255,0.02)",
                            borderColor: "rgba(255,255,255,0.1)"
                        }}
                        className="
                            h-40 w-64 rounded-[2rem] bg-neutral-900/20 border border-white/[0.02] backdrop-blur-md 
                            flex flex-col items-center justify-center gap-2 transition-all duration-500 group
                        "
                    >
                        <span className="text-4xl md:text-5xl font-black text-white/20 group-hover:text-white transition-colors duration-500 tracking-tighter italic">
                            {item.logo}
                        </span>
                        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/10 group-hover:text-white/40 font-bold">
                            {item.industry}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default function Testimonials() {
    const row1 = brands.slice(0, 6);
    const row2 = brands.slice(6, 12);

    return (
        <section className="py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 mb-20">
                <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-white/5 pb-10">
                    <div>
                        <h2 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter">
                            BRAND <br />
                            <span className="text-white/10 italic">CIRCLE.</span>
                        </h2>
                        <p className="mt-8 text-white/40 text-lg font-light max-w-sm border-l border-white/20 pl-6 uppercase tracking-widest leading-relaxed">
                            A showcase of industry leaders and creative powerhouses she has collaborated with to redefine digital aesthetics.
                        </p>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-1 text-right">
                        <span className="text-sm font-bold tracking-[0.3em] text-white/20 uppercase">Partnership Level</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-8 h-1 bg-white/10" />
                            ))}
                        </div>
                        <span className="text-xs font-medium text-white/10 mt-2 italic">Elite Network Portfolio 2024</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Row items={row1} direction={1} speed={30} />
                <Row items={row2} direction={-1} speed={35} />
            </div>

            <div className="container mx-auto px-6 mt-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-12 rounded-[3rem] bg-neutral-900/40 border border-white/[0.02] backdrop-blur-3xl">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-3xl font-bold text-white tracking-tight">Interested in collaborating?</h3>
                        <p className="text-white/40 font-light text-lg">Join the circle of premium brands worldwide.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center gap-6 py-6 px-12 rounded-full bg-white text-black transition-all hover:bg-neutral-200"
                    >
                        <span className="text-black font-black uppercase tracking-tighter text-xl">Start Project</span>
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center group-hover:translate-x-2 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
