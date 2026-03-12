import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const BentoCard = ({ children, className, title, subtitle }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 overflow-hidden group cursor-pointer ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    {title && <h4 className="text-white font-black text-xl tracking-tight mb-2">{title}</h4>}
                    {subtitle && <p className="text-white/40 text-sm font-medium uppercase tracking-widest">{subtitle}</p>}
                </div>
                {children}
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};

const StatWidget = ({ value, label, sublabel }) => (
    <div className="flex flex-col gap-1">
        <span className="text-5xl font-black text-white tracking-tighter">{value}</span>
        <div className="flex flex-col">
            <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">{label}</span>
            <span className="text-[0.6rem] text-white/20 italic">{sublabel}</span>
        </div>
    </div>
);

export default function InfluenceBento() {
    return (
        <section className="py-32 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-6 mb-20 text-center md:text-left">
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
                        THE <span className="text-white/10">ECOSYSTEM.</span>
                    </h2>
                    <p className="text-white/40 text-lg md:text-xl font-light max-w-xl">
                        A bird's-eye view of her digital footprint, engagement metrics, and strategic focus areas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[250px]">
                    {/* Big Reach Card */}
                    <BentoCard 
                        className="md:col-span-2 md:row-span-2 flex flex-col justify-between bg-gradient-to-br from-white/[0.08] to-transparent"
                        title="AUDIENCE REACH"
                        subtitle="Global Engagement 2024"
                    >
                        <div className="mt-8 flex flex-col gap-12">
                            <StatWidget value="12.4M" label="Monthly Impressions" sublabel="+15% vs Last Period" />
                            <div className="flex gap-8">
                                <StatWidget value="894K" label="Total Followers" sublabel="Across 4 Platforms" />
                                <StatWidget value="4.2%" label="Avg. Engagement" sublabel="Top 1% in Industry" />
                            </div>
                        </div>
                    </BentoCard>

                    {/* Image Card 1 */}
                    <BentoCard className="md:col-span-1 md:row-span-1 p-0 overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1492691523567-693a0ca97eaf?q=80&w=1000&auto=format&fit=crop" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
                            alt="Visual 1"
                        />
                    </BentoCard>

                    {/* Tech Card */}
                    <BentoCard title="TECH STACK" subtitle="Tools of the Trade" className="md:col-span-1 md:row-span-1">
                        <div className="flex flex-wrap gap-2 mt-4">
                            {["Adobe CC", "Framer", "Unreal Engine 5", "Blender"].map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[0.6rem] text-white font-bold uppercase tracking-widest">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Content Strategy */}
                    <BentoCard 
                        title="STRATEGY" 
                        subtitle="Content Pillars" 
                        className="md:col-span-2 md:row-span-1 bg-white/[0.03]"
                    >
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-white text-lg font-bold">Visual Storytelling</span>
                                <span className="text-white/40 text-xs italic">Aesthetic first approach.</span>
                            </div>
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                            </div>
                        </div>
                    </BentoCard>

                    {/* Social Highlights */}
                    <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center gap-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                            </svg>
                        </div>
                        <span className="text-white font-black tracking-tighter">@KUSH.STUDIOS</span>
                    </BentoCard>

                    {/* Call to Action Card */}
                    <BentoCard className="md:col-span-1 md:row-span-1 bg-white flex flex-col justify-center items-center text-center group/btn">
                        <span className="text-black font-black text-2xl tracking-tighter italic">ELEVATE <br /> YOURS.</span>
                        <div className="mt-4 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover/btn:bg-black transition-colors">
                            <svg className="w-5 h-5 text-black group-hover/btn:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </BentoCard>

                </div>
            </div>
        </section>
    );
}
