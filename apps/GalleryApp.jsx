import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Maximize2, Share } from 'lucide-react';

const IMAGES = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
    'https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&q=80',
];

export default function GalleryApp() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollLeft = containerRef.current.scrollLeft;
        const width = containerRef.current.offsetWidth;
        // Snap distance is basically the width of one card + gap (around 300px roughly depending on screen size)
        // A simple way to estimate active index is based on scroll percentage:
        const pct = scrollLeft / (containerRef.current.scrollWidth - width);
        let index = Math.round(pct * (IMAGES.length - 1));
        if (isNaN(index)) index = 0;
        setActiveIndex(Math.max(0, Math.min(IMAGES.length - 1, index)));
    };

    return (
        <div className="h-full flex flex-col bg-black font-sans tracking-tight overflow-hidden relative">

            {/* Header */}
            <div className="flex justify-between items-end px-4 pt-10 pb-4 absolute top-0 w-full z-20 pointer-events-none">
                <h1 className="text-[34px] font-bold tracking-tighter text-white leading-none drop-shadow-lg">Showcase</h1>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer pointer-events-auto border border-white/10">
                    <Share size={16} className="text-white" />
                </div>
            </div>

            {/* Background Blur derived from active image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeIndex}
                        src={IMAGES[activeIndex]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover blur-[80px] brightness-50"
                    />
                </AnimatePresence>
            </div>

            {/* Cover Flow Horizontal Scroll Container */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex-1 w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-center px-[15vw] z-10 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex gap-4 min-w-max items-center h-[60%]">
                    {IMAGES.map((src, i) => {
                        const isActive = i === activeIndex;

                        return (
                            <motion.div
                                key={i}
                                initial={false}
                                animate={{
                                    scale: isActive ? 1 : 0.85,
                                    opacity: isActive ? 1 : 0.4,
                                    rotateY: isActive ? 0 : (i < activeIndex ? 15 : -15),
                                    z: isActive ? 50 : 0
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                                className={`snap-center shrink-0 w-[70vw] max-w-[320px] aspect-[4/5] rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 ${isActive ? 'z-50 cursor-default' : 'z-0 cursor-pointer'}`}
                                onClick={() => {
                                    if (!isActive && containerRef.current) {
                                        const cardWidth = containerRef.current.children[0].children[0].offsetWidth;
                                        containerRef.current.scrollTo({ left: i * (cardWidth + 16), behavior: 'smooth' });
                                    }
                                }}
                            >
                                <img src={src} alt={`Project ${i}`} className="w-full h-full object-cover" draggable={false} />
                                {isActive && (
                                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                                        <Maximize2 size={18} className="text-white" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2 z-20">
                {IMAGES.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            width: i === activeIndex ? 24 : 8,
                            backgroundColor: i === activeIndex ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)"
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-2 rounded-full"
                    />
                ))}
            </div>

            {/* Description Text */}
            <div className="absolute bottom-20 left-0 w-full text-center z-20 px-6">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-white/80 font-medium text-[15px] drop-shadow-md"
                    >
                        Project Frame {activeIndex + 1} of {IMAGES.length}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}
