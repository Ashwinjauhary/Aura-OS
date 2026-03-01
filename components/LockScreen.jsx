import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Flashlight, Camera } from 'lucide-react';

export default function LockScreen({ onUnlock, wallpaper }) {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="absolute inset-0 bg-cover bg-center z-30 flex flex-col items-center select-none touch-none"
            style={{ backgroundImage: `url("${wallpaper}")` }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragEnd={(e, info) => {
                if (info.offset.y < -100) {
                    onUnlock();
                }
            }}
        >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[20px]" /> {/* Subtle overlay */}

            <div className="relative z-10 w-full flex flex-col items-center pt-24 text-white">
                <Lock className="w-5 h-5 mb-2" />
                <p className="text-xl font-medium mb-1">{date}</p>
                <h1 className="text-8xl font-medium tracking-tighter whitespace-nowrap" style={{ fontFamily: 'var(--font-sans)' }}>{time}</h1>
            </div>

            {/* Example Notification */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="relative z-10 mt-12 w-[90%] ios-glass rounded-2xl p-4 text-white shadow-lg"
            >
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded bg-blue-500 relative flex items-center justify-center">
                        <span className="text-xs font-bold">in</span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-200">LinkedIn</p>
                    <p className="text-xs text-gray-300 ml-auto">Now</p>
                </div>
                <h3 className="font-semibold text-sm">New Notification</h3>
                <p className="text-sm text-gray-200">Someone viewed your portfolio</p>
            </motion.div>

            {/* Swipe up indicator */}
            <div className="absolute bottom-6 w-full flex flex-col items-center text-white z-10 space-y-3">
                <div className="flex justify-between w-full px-12 mb-2">
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className="w-12 h-12 rounded-full ios-glass flex items-center justify-center cursor-pointer transition-colors duration-300"
                    >
                        <Flashlight size={22} className="opacity-90" strokeWidth={1.5} />
                    </motion.div>
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className="w-12 h-12 rounded-full ios-glass flex items-center justify-center cursor-pointer transition-colors duration-300"
                    >
                        <Camera size={22} className="opacity-90" strokeWidth={1.5} />
                    </motion.div>
                </div>
                <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="w-[130px] h-[5px] bg-white rounded-full opacity-90"
                />
            </div>
        </motion.div>
    );
}
