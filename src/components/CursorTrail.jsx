import { useEffect, useRef } from "react";
import gsap from "gsap";

// Placeholder images for the trail effect
const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512418490979-92798e8e8c1c?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512418490979-92798e8e8c1c?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
];

export default function CursorTrail({ children }) {
    const containerRef = useRef(null);
    const lastTimeRef = useRef(0);
    const lastPosRef = useRef({ x: 0, y: 0 });
    const indexRef = useRef(0);
    const activeImagesRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMove = (e) => {
            const now = Date.now();
            const lastPos = lastPosRef.current;
            const dist = Math.hypot(e.clientX - lastPos.x, e.clientY - lastPos.y);

            // Throttle: 50ms
            if (now - lastTimeRef.current < 50) return;

            // Distance: 75px (Reduced from 100px for faster spawning)
            if (dist < 100) return;

            lastTimeRef.current = now;
            lastPosRef.current = { x: e.clientX, y: e.clientY };

            // Create image element
            const img = document.createElement("img");
            img.src = images[indexRef.current % images.length];
            indexRef.current++;

            // Track and limit active images (20 max for smoother density)
            activeImagesRef.current.push(img);
            if (activeImagesRef.current.length > 20) {
                const oldImg = activeImagesRef.current.shift();
                if (oldImg) {
                    // Soft remove: Smooth fade out
                    gsap.to(oldImg, {
                        opacity: 0,
                        duration: 0.4, // Smoother removal
                        onComplete: () => {
                            if (oldImg.parentNode === container) {
                                container.removeChild(oldImg);
                            }
                        }
                    });
                }
            }

            // Initial styles
            img.style.position = "absolute";
            img.style.left = `${e.clientX}px`;
            img.style.top = `${e.clientY}px`;
            img.style.width = window.innerWidth < 768 ? "150px" : "300px";
            img.style.height = "auto";
            img.style.borderRadius = "8px";
            img.style.pointerEvents = "none";
            img.style.zIndex = "50";
            img.style.transform = `translate(-50%, -50%) scale(0.8)`; // Start slightly larger for smoother pop
            img.style.opacity = "0";

            container.appendChild(img);

            // Animate in: Smooth pop effect
            gsap.to(img, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
            });

            // Animate out and remove (Smooth direct fade)
            gsap.to(img, {
                opacity: 0,
                delay: 0.6, // Visible long enough to see
                duration: 0.6, // Smooth fade out
                onComplete: () => {
                    // Cleanup from array and DOM
                    activeImagesRef.current = activeImagesRef.current.filter(i => i !== img);
                    if (img.parentNode === container) {
                        container.removeChild(img);
                    }
                },
            });
        };

        container.addEventListener("mousemove", handleMove);

        return () => {
            container.removeEventListener("mousemove", handleMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full bg-[#0f0f0f]">
            {children}
        </div>
    );
}
