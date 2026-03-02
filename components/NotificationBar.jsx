import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi, Signal, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotificationBar({ controlCenterOpen, toggleControlCenter, wifi = true, airplane = false, focus = false }) {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-0 w-full flex items-center justify-between px-7 z-50 text-white select-none transition-all duration-300"
            style={{
                height: 'calc(54px + env(safe-area-inset-top, 0px))',
                paddingTop: 'env(safe-area-inset-top, 0px)'
            }}>
            {/* Time */}
            <div className="text-[15px] font-semibold tracking-tight whitespace-nowrap px-1 text-center mt-1">{time}</div>

            {/* Dynamic Island */}
            <motion.div layout className="h-[30px] w-[120px] bg-black rounded-full flex items-center justify-center dynamic-island-shadow mt-1 relative z-50">
                {focus && <span className="text-yellow-400 text-[10px] font-semibold">🌙 Focus</span>}
            </motion.div>

            {/* Status Icons */}
            <div className="flex items-center space-x-1.5 w-16 justify-end cursor-pointer" onClick={toggleControlCenter}>
                {airplane ? (
                    <Plane size={14} strokeWidth={2.5} className="text-orange-400" />
                ) : (
                    <>
                        <Signal size={16} strokeWidth={2.5} />
                        {wifi ? <Wifi size={16} strokeWidth={2.5} /> : <WifiOff size={16} strokeWidth={2.5} className="opacity-40" />}
                    </>
                )}
                {/* Battery */}
                <div className="flex items-center gap-0.5">
                    <div className="w-[22px] h-[11px] rounded-[3px] border border-white/60 p-[1.5px] flex items-center">
                        <div className="h-full rounded-[1.5px] bg-white" style={{ width: '86%' }} />
                    </div>
                    <div className="w-[2px] h-[5px] bg-white/60 rounded-r-sm" />
                </div>
            </div>
        </div>
    );
}
