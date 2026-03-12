import { motion, useMotionValue, useSpring, useTransform, useVelocity, AnimatePresence } from "framer-motion";
import { useRef, useState, memo, useEffect } from "react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Creative Director, Vogue",
        content: "Working with this team was a revelation. Their vision for digital editorial design is unparalleled in the industry today.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        verified: true
    },
    {
        id: 2,
        name: "Marcus Thorne",
        role: "Head of Digital, Adidas",
        content: "The energy and innovation brought to our brand campaign were exactly what we needed to break into the next generation of social storytelling.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        verified: true
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Principal, Luxury Group",
        content: "A masterclass in minimal, high-impact presence. They don't just build sites; they build digital legacies for luxury brands.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        verified: false
    },
    {
        id: 4,
        name: "David Chen",
        role: "VP of Production, Nike",
        content: "Cinematic, powerful, and technically flawless. The motion design work here sets a new benchmark for athletic branding.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        verified: true
    }
];

// Elastic Liquid Orb Cursor
const ElasticLiquidOrb = memo(({ mouseX, mouseY, activeLabel }) => {
    const x = useSpring(mouseX, { stiffness: 450, damping: 40 });
    const y = useSpring(mouseY, { stiffness: 450, damping: 40 });
    
    // Velocity tracking for stretching effect
    const velX = useVelocity(x);
    const velY = useVelocity(y);
    
    // Map velocity to stretch amount
    const stretch = useTransform([velX, velY], ([vx, vy]) => {
        const speed = Math.sqrt(vx * vx + vy * vy);
        return Math.min(speed / 1000, 0.8);
    });

    const scaleX = useTransform(stretch, [0, 0.8], [1, 1.6]);
    const scaleY = useTransform(stretch, [0, 0.8], [1, 0.6]);

    // Calculate rotation based on velocity vector
    const rotate = useTransform([velX, velY], ([vx, vy]) => {
        if (Math.abs(vx) < 10 && Math.abs(vy) < 10) return 0;
        return Math.atan2(vy, vx) * (180 / Math.PI);
    });

    return (
        <motion.div
            style={{
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
            }}
            className="fixed top-0 left-0 pointer-events-none z-[999] flex items-center justify-center"
        >
            {/* The Elastic Background Droplet (Visual only) */}
            <motion.div
                style={{
                    rotate,
                    scaleX,
                    scaleY,
                }}
                animate={{
                    width: activeLabel ? 85 : 16,
                    height: activeLabel ? 85 : 16,
                    backgroundColor: activeLabel ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.8)",
                    borderWidth: activeLabel ? "1px" : "0px",
                }}
                transition={{ duration: 0.3 }}
                className="absolute rounded-full border-white/30 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            />

            {/* The Stabilized Label Layer (Upright and Undistorted) */}
            <AnimatePresence mode="wait">
                {activeLabel && (
                    <motion.div
                        key={activeLabel}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="relative z-10 flex flex-col items-center justify-center"
                    >
                        <span className="text-[0.55rem] font-black tracking-[0.3em] uppercase text-white drop-shadow-lg text-center">
                            {activeLabel}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

const WallCard = memo(({ testimonial, index, onHoverStart, onHoverEnd }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set((mouseX / width) - 0.5);
        y.set((mouseY / height) - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        onHoverEnd();
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => onHoverStart("Read")}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative p-8 rounded-[2.5rem] bg-neutral-900/40 border border-white/5 backdrop-blur-3xl hover:bg-neutral-800/60 transition-colors duration-500 hover:border-white/10"
        >
            <div className="flex flex-col gap-6" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                            className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/20 transition-colors shadow-2xl"
                        >
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="flex flex-col">
                            <h4 className="text-white font-black text-lg tracking-tight flex items-center gap-2">
                                {testimonial.name}
                                {testimonial.verified && (
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </h4>
                            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{testimonial.role}</span>
                        </div>
                    </div>
                </div>

                <p className="text-white/70 text-lg leading-relaxed italic font-medium">
                    "{testimonial.content}"
                </p>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[0.6rem] font-bold text-white tracking-[0.3em] uppercase">Verified Collaboration</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
            {/* Local Glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
});

const MagneticArrow = memo(({ onHoverStart, onHoverEnd }) => {
    const arrowX = useSpring(useMotionValue(0), { stiffness: 100, damping: 10 });
    const arrowY = useSpring(useMotionValue(0), { stiffness: 100, damping: 10 });
    const ref = useRef(null);

    const handleMouse = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

        if (dist < 200) {
            arrowX.set((e.clientX - centerX) * 0.4);
            arrowY.set((e.clientY - centerY) * 0.4);
        } else {
            arrowX.set(0);
            arrowY.set(0);
        }
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => onHoverStart("Join")}
            onMouseLeave={() => { arrowX.set(0); arrowY.set(0); onHoverEnd(); }}
            style={{ x: arrowX, y: arrowY }}
            className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center bg-black/5 group-hover:bg-black group-hover:border-black transition-colors duration-500"
        >
            <motion.svg 
                className="w-8 h-8 text-black group-hover:text-white transition-colors"
                viewBox="0 0 24 24" 
                fill="none" 
            >
                <motion.path 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    stroke="currentColor" 
                    strokeWidth={2.5} 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    initial={{ pathLength: 1, pathOffset: 0 }}
                    whileHover={{ pathOffset: [0, 1, 0], transition: { duration: 0.6, repeat: Infinity } }}
                />
            </motion.svg>
        </motion.div>
    );
});

export default function ProfessionalWall() {
    const containerRef = useRef(null);
    const spotlightRef = useRef(null);
    const ctaRef = useRef(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [activeLabel, setActiveLabel] = useState("");
    const [isInside, setIsInside] = useState(false);

    const ctaX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
    const ctaY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

    const handleGlobalMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update Spotlight Spotlight position
        if (spotlightRef.current) {
            spotlightRef.current.style.setProperty("--s-x", `${x}px`);
            spotlightRef.current.style.setProperty("--s-y", `${y}px`);
        }

        // Update Cursor position (global viewport for fixed cursor)
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        // Magnetic CTA logic
        if (ctaRef.current) {
            const ctaRect = ctaRef.current.getBoundingClientRect();
            const centerX = ctaRect.left + ctaRect.width / 2;
            const centerY = ctaRect.top + ctaRect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

            if (distance < 300) {
                ctaX.set((e.clientX - centerX) * 0.15);
                ctaY.set((e.clientY - centerY) * 0.15);
            } else {
                ctaX.set(0);
                ctaY.set(0);
            }
        }
    };

    return (
        <section 
            ref={containerRef}
            onMouseMove={handleGlobalMouseMove}
            onMouseEnter={() => setIsInside(true)}
            onMouseLeave={() => setIsInside(false)}
            className="relative py-32 px-6 md:px-24 bg-[#080808] overflow-hidden cursor-none"
        >
            {/* Elastic Liquid Orb Cursor */}
            {isInside && <ElasticLiquidOrb mouseX={mouseX} mouseY={mouseY} activeLabel={activeLabel} />}

            {/* Global Spotlight Effect */}
            <div 
                ref={spotlightRef}
                className="absolute inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(circle 600px at var(--s-x, 0px) var(--s-y, 0px), rgba(255,255,255,0.06), transparent)`
                }}
            />

            {/* Background Flair (Interactive) */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2 pointer-events-none" 
            />

            <div className="relative max-w-7xl mx-auto flex flex-col gap-24 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row justify-between items-end gap-12">
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-white/40 text-[0.7rem] font-black tracking-[0.6em] uppercase"
                        >
                            Endorsements // Global Network
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.75]"
                        >
                            The Professional <br />
                            <span className="text-transparent border-text-heavy italic opacity-30">Wall of Trust</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1000px]">
                    {testimonials.map((t, i) => (
                        <WallCard 
                            key={t.id} 
                            testimonial={t} 
                            index={i} 
                            onHoverStart={setActiveLabel}
                            onHoverEnd={() => setActiveLabel("")}
                        />
                    ))}
                </div>

                {/* Final CTA (Magnetic) */}
                <motion.div 
                    ref={ctaRef}
                    style={{ x: ctaX, y: ctaY }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setActiveLabel("Hire")}
                    onMouseLeave={() => setActiveLabel("")}
                    className="mt-12 p-16 rounded-[4rem] bg-white text-black flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer overflow-hidden relative shadow-[0_50px_100px_rgba(255,255,255,0.1)]"
                >
                    <div className="flex flex-col gap-2 z-10 pointer-events-none">
                        <span className="text-[0.6rem] font-black tracking-[0.4em] uppercase opacity-40">Next Chapter</span>
                        <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Ready to lead?</h3>
                    </div>
                    
                    <div className="flex items-center gap-12 z-10">
                        <MagneticArrow 
                            onHoverStart={setActiveLabel}
                            onHoverEnd={() => setActiveLabel("")}
                        />
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onMouseEnter={() => setActiveLabel("Go")}
                            onMouseLeave={() => setActiveLabel("Hire")}
                            className="px-16 py-7 rounded-full bg-black text-white font-black text-sm uppercase tracking-[0.3em] transition-transform shadow-2xl"
                        >
                            Start Collaboration
                        </motion.button>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.div>
            </div>
            
            <div className="mt-32 border-t border-white/5 pt-12 flex flex-wrap justify-between items-center text-white/20 text-[0.55rem] font-bold tracking-[0.5em] uppercase gap-8">
                <span className="hover:text-white/40 transition-colors">© 2024 ELITE NETWORK</span>
                <span className="hover:text-white/40 transition-colors">AUTHENTICITY GUARANTEED</span>
                <span className="hidden md:block hover:text-white/40 transition-colors italic tracking-[1em]">Proper Design System</span>
            </div>
        </section>
    );
}
