import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TOTAL_CARDS = 12;
const ANGLE_PER_CARD = 35;
const VERTICAL_GAP = 150; // Increased to give more space between cards

// Keep desktop radius large, make mobile much smaller
const DESKTOP_RADIUS = 650;
const MOBILE_RADIUS = 220;

const CardStack = () => {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive listener
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        // Initial check
        checkMobile();
        // Listener
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const maxIndex = TOTAL_CARDS - 1;
    const maxAngle = maxIndex * ANGLE_PER_CARD;
    const maxVertical = maxIndex * VERTICAL_GAP;

    const rotateY = useTransform(scrollYProgress, [0, 1], [0, -maxAngle]);
    const translateY = useTransform(scrollYProgress, [0, 1], [0, -maxVertical]);

    const items = Array.from({ length: TOTAL_CARDS }).map((_, i) => ({
        id: i + 1,
        img: `https://picsum.photos/seed/${i + 40}/800/600`,
    }));

    return (
        <section
            ref={containerRef}
            className="relative h-[800vh] bg-[#0a0a0a]"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden [perspective:1800px] md:[perspective:1800px] [perspective-origin:50%_50%]">
                <motion.div
                    style={{ rotateY, y: translateY }}
                    className="spiral-wrapper relative w-full flex flex-col items-center justify-center [transform-style:preserve-3d]"
                >
                    {items.map((item, index) => (
                        <CardBlock
                            key={item.id}
                            item={item}
                            index={index}
                            isMobile={isMobile}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const CardBlock = ({ item, index, isMobile }) => {
    const radius = isMobile ? MOBILE_RADIUS : DESKTOP_RADIUS;
    const angle = index * ANGLE_PER_CARD;
    const verticalGap = index * VERTICAL_GAP;

    return (
        <motion.div
            className="absolute w-[45vw] sm:w-[40vw] md:w-[30vw] max-w-[180px] sm:max-w-[220px] md:max-w-[340px] aspect-[1.1/1] z-10"
            style={{
                transform: `
          rotateY(${angle}deg) 
          translateZ(${radius}px) 
          translateY(${verticalGap}px)
        `,
                transformStyle: "preserve-3d",
            }}
        >
            {/* Card Block Styling */}
            <div className="relative w-full h-full rounded-[20px] shadow-2xl overflow-hidden border border-white/5 bg-[#111]">
                <img
                    src={item.img}
                    alt="Project"
                    className="w-full h-full object-cover"
                />
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </div>
        </motion.div>
    );
};

export default CardStack;