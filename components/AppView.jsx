import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function AppView({ appId, onClose, children }) {
    if (!appId) return null;

    return (
        <motion.div
            key="app-view"
            initial={{ opacity: 0, scale: 0.85, y: 20, borderRadius: '40px' }}
            animate={{ opacity: 1, scale: 1, y: 0, borderRadius: '0px' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, borderRadius: '40px' }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute inset-0 z-40 bg-zinc-950 text-white flex flex-col overflow-hidden touch-auto"
        >
            {/* Ambient background glow inside apps */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* App Header (simulating iOS navigation bar) */}
            <div className="pt-12 pb-2 flex items-center px-4 border-b border-white/10 shrink-0">
                <button
                    onClick={onClose}
                    className="flex items-center text-blue-500 font-medium active:opacity-70 transition"
                >
                    <ChevronLeft size={24} />
                    Back
                </button>
                <div className="flex-1 text-center font-semibold text-[17px] mr-8 capitalize">
                    {appId}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full relative">
                <div className="absolute inset-0 overflow-y-auto overflow-x-hidden w-full h-full pb-10 touch-pan-y overscroll-y-contain">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
