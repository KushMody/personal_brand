import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Import images from assets
import img1 from '../assets/Horizontal Scroll pictures/3YLAKeFlxATFTQb5V6Ji0JyHnY.png'
import img2 from '../assets/Horizontal Scroll pictures/RS1QCQkf6G1lNtO3WhHEb5m26ao.png'
import img3 from '../assets/Horizontal Scroll pictures/eSyvkQ0LGaNCyG1BrsQTxKr5PY4.png'
import img4 from '../assets/Horizontal Scroll pictures/nFF0tkaA1mvcEt3yQyuHsqJytuc.png'

const HorizontalScroll = () => {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Moving 4 cards (each 100vw). We want card 1 on screen initially, and move 3 more times.
    // Total distance is -300% (of one card width).
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

    const cards = [
        { type: 'image', src: img1, title: 'EngagR', category: 'UI/UX | Mobile App' },
        { type: 'image', src: img2, title: 'Portfolio Project', category: 'Web Development' },
        { type: 'image', src: img3, title: 'Brand Identity', category: 'Graphic Design' },
        { type: 'image', src: img4, title: 'Mobile Solutions', category: 'App Design' },
    ]

    return (
        <section ref={targetRef} className="relative h-[600vh]">
            {/* Added dynamic padding-left to perfectly center the first item */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden pl-[5vw] md:pl-[15vw]">
                {/* 
                  Total width calculations based on 4 items:
                  Mobile: 4 * 90vw = 360vw
                  Desktop: 4 * 70vw = 280vw 
                */}
                <motion.div style={{ x }} className="flex w-[360vw] md:w-[280vw]">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="relative h-screen flex-shrink-0 flex items-center justify-center w-[90vw] md:w-[70vw] px-4 md:px-8"
                        >
                            <div className="relative h-[70vh] md:h-[80vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 shadow-2xl transition-all duration-300 group">
                                <img
                                    src={card.src}
                                    alt={card.title}
                                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out hover:scale-105"
                                />

                                {/* Overlay Info */}
                                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-16 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-2">{card.title}</h3>
                                    <p className="text-lg sm:text-xl md:text-2xl text-gray-400 tracking-widest">{card.category}</p>
                                </div>

                                <div className="absolute top-6 left-6 md:top-12 md:left-12 font-sans text-[6rem] md:text-[10rem] font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                                    0{index + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default HorizontalScroll
