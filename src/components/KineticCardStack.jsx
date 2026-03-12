import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, memo } from "react";

const cards = [
    {
        id: 1,
        title: "EDITORIAL DESIGN",
        subtitle: "VOGUE SPECIAL",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        tags: ["Creative Direction", "Styling"],
        description: "A deep dive into the fusion of high fashion and brutalist digital architecture."
    },
    {
        id: 2,
        title: "BRAND CAMPAIGN",
        subtitle: "ADIDAS ORIGINALS",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
        tags: ["Social Media", "Production"],
        description: "Breaking the mold for global athletic branding with raw, energetic visual narratives."
    },
    {
        id: 3,
        title: "DIGITAL PRESENCE",
        subtitle: "CHANEL HAUTE",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
        tags: ["Influence", "Strategy"],
        description: "Elevating luxury through minimal, high-impact digital experiences."
    },
    {
        id: 4,
        title: "GLOBAL IMPACT",
        subtitle: "NIKE WOMEN",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
        tags: ["Visual Arts", "Motion"],
        description: "A celebration of strength and movement through cinematic motion design."
    }
];

// Memoized Card Component - Optimized for Cinematic Expansion
const KineticCard = memo(({ card, index, scrollYProgress }) => {
    // Tightened pacing to prevent overlapping (Single-Focus Logic)
    const start = 0.1 + (index * 0.22); // Increased gap between cards 
    const peak = start + 0.12;
    const fadeOutStart = start + 0.18;
    const end = start + 0.28; // Card is fully gone before next card hits peak

    // Scale from Centered to "Screen-Fill"
    const scaleBase = useTransform(scrollYProgress, [start, peak, end], [0.85, 1, 1.1]);
    
    // Tightened Opacity: Snappy in, dedicated peak, snappy out
    const opacityBase = useTransform(
        scrollYProgress, 
        [start, start + 0.05, fadeOutStart, end], 
        [0, 1, 1, 0]
    );

    // Subtle Y-movement for more organic feel
    const yBase = useTransform(scrollYProgress, [start, end], [30, -30]);
    
    // Smooth hardware-accelerated transitions
    const smoothOpacity = useSpring(opacityBase, { stiffness: 80, damping: 35 });
    const smoothScale = useSpring(scaleBase, { stiffness: 80, damping: 35 });
    const smoothY = useSpring(yBase, { stiffness: 80, damping: 35 });

    // Performance Kill-Switch
    const display = useTransform(scrollYProgress, [0, start - 0.05, start, end, end + 0.05], ["none", "none", "flex", "flex", "none"]);

    return (
        <motion.div
            style={{
                zIndex: cards.length - index,
                opacity: smoothOpacity,
                scale: smoothScale,
                y: smoothY,
                display,
                willChange: "transform, opacity"
            }}
            className="absolute inset-0 flex items-center justify-center p-0 pointer-events-none"
        >
            {/* Immersive Container - Optimized to fill 90-95% of viewport */}
            <div className="relative w-[95vw] h-[95vh] md:w-[92vw] md:h-[90vh] rounded-[4rem] overflow-hidden border border-white/5 bg-neutral-900 shadow-[0_0_150px_rgba(0,0,0,0.9)] pointer-events-auto group">
                
                <img 
                    src={card.image} 
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

                <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                            <span className="text-white/40 text-[0.6rem] font-black tracking-[0.8em] uppercase">Archive Collection // 00{card.id}</span>
                            <div className="flex gap-4">
                                {card.tags.map(tag => (
                                    <span key={tag} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[0.6rem] text-white/50 font-black uppercase tracking-widest backdrop-blur-3xl">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 backdrop-blur-2xl">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 max-w-5xl">
                        <h3 className="text-7xl md:text-[14rem] font-black text-white tracking-tightest leading-[0.75] uppercase select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            {card.title.split(' ')[0]} <br />
                            <span className="text-transparent border-text-heavy italic opacity-50">{card.title.split(' ')[1]}</span>
                        </h3>
                        <p className="text-white/80 text-lg md:text-2xl font-semibold leading-relaxed max-w-2xl drop-shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            {card.description}
                        </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-white/30 text-[0.6rem] font-black tracking-[0.3em] uppercase">World-Class Engagement</span>
                            <span className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">{card.subtitle}</span>
                        </div>
                        <button className="px-12 py-5 rounded-full bg-white text-black font-black text-xs uppercase tracking-[0.4em] transition-all duration-500 hover:scale-105 hover:bg-neutral-200">
                            View Project
                        </button>
                    </div>
                </div>

                <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20 mix-blend-overlay" />
            </div>
        </motion.div>
    );
});

export default function KineticCardStack() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.6, 0.6, 0]);

    return (
        <section ref={sectionRef} className="relative h-[800vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black z-0" />
                
                <motion.div 
                    style={{ opacity: bgOpacity }}
                    className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                >
                    <span className="text-[30rem] md:text-[60rem] font-black text-white/[0.03] tracking-tightest italic uppercase leading-none select-none">
                        VAULT.
                    </span>
                </motion.div>

                <div className="relative w-full h-full flex items-center justify-center">
                    {cards.map((card, idx) => (
                        <KineticCard 
                            key={card.id} 
                            card={card} 
                            index={idx} 
                            scrollYProgress={scrollYProgress} 
                        />
                    ))}
                </div>

                {/* Depth Visualizer */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 flex flex-col gap-12 z-50">
                    <div className="flex flex-col gap-3 items-end">
                        <span className="text-white/40 text-[0.6rem] font-black tracking-[0.5em] uppercase">Vault Logic</span>
                        <div className="w-[1.5px] h-60 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                                className="w-full bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
            </div>
        </section>
    );
}
