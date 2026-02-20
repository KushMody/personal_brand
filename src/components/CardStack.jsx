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
    const [layout, setLayout] = useState({ radius: 650, verticalGap: 150 });

    // Responsive listener
    useEffect(() => {
        const checkResponsive = () => {
            const width = window.innerWidth;
            if (width < 400) {
                // Small Mobile - tightly packed, smaller cards
                setLayout({ radius: 350, verticalGap: 100 });
            } else if (width <= 750) {
                // Table/Large Mobile - medium gap
                setLayout({ radius: 550, verticalGap: 130 });
            } else {
                // Desktop - full size and full gap
                setLayout({ radius: 650, verticalGap: 150 });
            }
        };
        // Initial check
        checkResponsive();
        // Listener
        window.addEventListener("resize", checkResponsive);
        return () => window.removeEventListener("resize", checkResponsive);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const maxIndex = TOTAL_CARDS - 1;
    const maxAngle = maxIndex * ANGLE_PER_CARD;
    const maxVertical = maxIndex * layout.verticalGap;

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
            <div
                className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
                style={{ perspective: "1800px", perspectiveOrigin: "50% 50%" }}
            >
                <motion.div
                    style={{ rotateY, y: translateY, transformStyle: "preserve-3d" }}
                    className="spiral-wrapper relative w-full flex flex-col items-center justify-center"
                >
                    {items.map((item, index) => (
                        <CardBlock
                            key={item.id}
                            item={item}
                            index={index}
                            radius={layout.radius}
                            verticalGap={layout.verticalGap}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const CardBlock = ({ item, index, radius, verticalGap }) => {
    const angle = index * ANGLE_PER_CARD;
    const currentGap = index * verticalGap;

    return (
        <motion.div
            // Sizing strictly maintained to prevent 3D chord clipping based on the radius
            // Mobile (r=350) -> max 200px. Tablet (r=550) -> max 300px. Desktop (r=650) -> max 340px
            className="absolute w-[60vw] sm:w-[45vw] md:w-[30vw] max-w-[200px] sm:max-w-[300px] md:max-w-[340px] aspect-[1.1/1]"
            style={{
                transform: `
          rotateY(${angle}deg) 
          translateZ(${radius}px) 
          translateY(${currentGap}px)
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