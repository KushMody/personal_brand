import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const items = [
    {
        title: "CREATIVE VISION",
        subtitle: "Redefining digital boundaries through bold, experimental aesthetics.",
        number: "01",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "STRATEGIC IMPACT",
        subtitle: "Driving engagement and growth for world-class brands with data-backed creative.",
        number: "02",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "GLOBAL NETWORK",
        subtitle: "Collaborating with elite creators and innovators across the digital landscape.",
        number: "03",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
    }
];

const MagneticButton = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX, y: middleY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="relative"
        >
            {children}
        </motion.div>
    );
};

const SpotlightItem = ({ item, index }) => {
    const isEven = index % 2 === 0;
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, isEven ? 5 : -5]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    // Mouse spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <motion.div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 mb-32 md:mb-64 relative`}
        >
            <div className="relative w-full md:w-1/2 group">
                <motion.div 
                    style={{ y, rotate, scale }}
                    className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-neutral-900 shadow-2xl"
                >
                    <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    
                    {/* Interactive Spotlight Mask */}
                    <motion.div 
                        className="absolute inset-0 pointer-events-none z-10"
                        animate={{ 
                            background: isHovered 
                                ? `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, transparent 0%, rgba(0,0,0,0.8) 100%)`
                                : `radial-gradient(600px circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)`
                        }}
                        transition={{ type: "tween", ease: "backOut" }}
                    />
                </motion.div>
                
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                    className={`absolute top-12 ${isEven ? '-left-8 md:-left-20' : '-right-8 md:-right-20'} select-none z-[-1]`}
                >
                    <span className="text-[10rem] md:text-[18rem] font-black text-white/5 leading-none">
                        {item.number}
                    </span>
                </motion.div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-8 text-center md:text-left z-20">
                <div className="flex flex-col gap-2">
                    <motion.span 
                        style={{ x: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
                        className="text-white/30 text-xs font-bold tracking-[0.8em] uppercase"
                    >
                        Feature Focus
                    </motion.span>
                    <h3 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                        {item.title.split(' ')[0]} <br />
                        <span className="text-white/20 italic">{item.title.split(' ')[1]}</span>
                    </h3>
                </div>
                
                <p className="text-white/50 text-xl font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                    {item.subtitle}
                </p>

                <div className="pt-4 flex justify-center md:justify-start">
                    <MagneticButton>
                        <motion.div 
                            whileHover={{ gap: "2rem" }}
                            className="flex items-center gap-6 text-white font-black group cursor-pointer bg-white/5 p-6 pr-10 rounded-full border border-white/10 backdrop-blur-md"
                        >
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000">
                                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <span className="text-sm tracking-[0.3em] uppercase">
                                Case Study
                            </span>
                        </motion.div>
                    </MagneticButton>
                </div>
            </div>
        </motion.div>
    );
};

export default function EditorialSpotlight() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={sectionRef} className="py-64 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-12 mb-64 items-center text-center">
                    <motion.div 
                        animate={{ height: [0, 150] }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="w-[1px] bg-gradient-to-b from-white to-transparent"
                    />
                    <motion.h2 
                        style={{ scale: useTransform(scrollYProgress, [0, 0.2], [1, 1.2]), opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0.5]) }}
                        className="text-7xl md:text-9xl font-black text-white tracking-widest uppercase flex flex-col"
                    >
                        <span>THE</span>
                        <span className="text-white/10 italic">METHOD.</span>
                    </motion.h2>
                </div>

                <div className="flex flex-col gap-32">
                    {items.map((item, idx) => (
                        <SpotlightItem key={idx} item={item} index={idx} />
                    ))}
                </div>
                
                <footer className="py-48 flex flex-col items-center justify-center gap-12 overflow-hidden border-t border-white/5 mt-32">
                    <motion.div 
                        style={{ x: useTransform(scrollYProgress, [0.8, 1], [100, -100]) }}
                        className="text-[12rem] md:text-[20rem] font-black text-white/5 whitespace-nowrap leading-none select-none italic"
                    >
                        STAY CREATIVE STAY CREATIVE STAY CREATIVE
                    </motion.div>
                    
                    <MagneticButton>
                        <button className="px-16 py-8 rounded-full bg-white text-black font-black text-2xl uppercase tracking-tighter hover:bg-neutral-200 transition-colors">
                            Let's Talk
                        </button>
                    </MagneticButton>
                    
                    <motion.div 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-xs font-bold tracking-[1em] text-white/20 uppercase">End of Stories</span>
                        <div className="w-[1px] h-32 bg-white/10" />
                    </motion.div>
                </footer>
            </div>
        </section>
    );
}
