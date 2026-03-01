import React from 'react';
import { motion } from 'framer-motion';

export default function AppIcon({ name, icon: Icon, colorClass, onClick, delay = 0 }) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25, delay }}
            whileTap={{ scale: 0.8 }}
            onClick={onClick}
        >
            <div className={`w-[62px] h-[62px] squircle flex items-center justify-center app-icon-shadow ${colorClass}`}>
                <Icon size={34} strokeWidth={1.5} className="text-white relative z-10" />
            </div>
            <span className="text-[11px] text-white font-medium truncate w-full text-center drop-shadow-md">
                {name}
            </span>
        </motion.div>
    );
}
