import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight, Share, Flame, Zap, Trophy, GraduationCap } from 'lucide-react';

// Animated Ring Component
const ActivityRing = ({ radius, stroke, progress, color, delay }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            className="drop-shadow-lg"
        />
    );
};

export default function ResumeApp() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="bg-black font-sans tracking-tight text-white pb-20 overflow-x-hidden h-auto">

            {/* Header */}
            <div className="flex justify-between items-end px-4 pt-10 pb-4 sticky top-0 bg-black/80 backdrop-blur-xl z-20">
                <h1 className="text-[34px] font-bold tracking-tighter leading-none">Career stats</h1>
                <div className="w-8 h-8 rounded-full bg-[#1c1c1e] flex items-center justify-center cursor-pointer">
                    <Share size={16} className="text-[#0a84ff]" />
                </div>
            </div>

            <div className="px-4 space-y-6">

                {/* Rings Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#1c1c1e] rounded-[24px] p-6 flex items-center justify-center relative shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5"
                >
                    <div className="relative w-[240px] h-[240px] flex items-center justify-center">
                        {/* Background Tracks */}
                        <svg height="240" width="240" className="absolute rotate-[-90deg]">
                            <circle stroke="#ff000030" fill="transparent" strokeWidth="22" r="100" cx="120" cy="120" />
                            <circle stroke="#a4ff0030" fill="transparent" strokeWidth="22" r="76" cx="120" cy="120" />
                            <circle stroke="#00e5ff30" fill="transparent" strokeWidth="22" r="52" cx="120" cy="120" />
                        </svg>

                        {/* Animated Progress Rings */}
                        {mounted && (
                            <svg height="240" width="240" className="absolute rotate-[-90deg]">
                                {/* Red Ring (Frontend) */}
                                <ActivityRing radius={120} stroke={22} progress={85} color="#ff0055" delay={0.2} />
                                {/* Green Ring (Backend) */}
                                <ActivityRing radius={120} stroke={22} progress={70} color="#a4ff00" delay={0.4} />
                                {/* Blue Ring (UI/UX) */}
                                <ActivityRing radius={120} stroke={22} progress={60} color="#00e5ff" delay={0.6} />
                            </svg>
                        )}

                        {/* Center Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                            className="absolute"
                        >
                            <Flame size={28} className="text-[#ff0055] opacity-80" fill="#ff0055" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Legend / Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-[#1c1c1e] rounded-[16px] p-3 border border-white/5">
                        <p className="text-[12px] font-semibold text-[#ff0055] uppercase tracking-wider mb-1">Frontend</p>
                        <p className="text-[22px] font-bold leading-none">85<span className="text-[14px] text-white/50 ml-0.5">%</span></p>
                    </motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-[#1c1c1e] rounded-[16px] p-3 border border-white/5">
                        <p className="text-[12px] font-semibold text-[#a4ff00] uppercase tracking-wider mb-1">Backend</p>
                        <p className="text-[22px] font-bold leading-none">70<span className="text-[14px] text-white/50 ml-0.5">%</span></p>
                    </motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="bg-[#1c1c1e] rounded-[16px] p-3 border border-white/5">
                        <p className="text-[12px] font-semibold text-[#00e5ff] uppercase tracking-wider mb-1">UI/UX</p>
                        <p className="text-[22px] font-bold leading-none">60<span className="text-[14px] text-white/50 ml-0.5">%</span></p>
                    </motion.div>
                </div>

                {/* Milestones / Details list */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[#1c1c1e] rounded-[20px] p-4 border border-white/5"
                >
                    <h3 className="text-[17px] font-semibold mb-3 tracking-tight">Career Highlights</h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#ff9f0a]/20 flex items-center justify-center shrink-0">
                                <Trophy size={18} className="text-[#ff9f0a]" />
                            </div>
                            <div className="flex-1 border-b border-white/10 pb-3">
                                <p className="text-[16px] font-medium leading-tight">10+ Projects Built</p>
                                <p className="text-[13px] text-white/50 mt-0.5">Full-stack & Frontend</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#30d158]/20 flex items-center justify-center shrink-0">
                                <Zap size={18} className="text-[#30d158]" />
                            </div>
                            <div className="flex-1 border-b border-white/10 pb-3">
                                <p className="text-[16px] font-medium leading-tight">Modern Tech Stack</p>
                                <p className="text-[13px] text-white/50 mt-0.5">React, Next.js, Tailwind</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <div className="w-10 h-10 rounded-full bg-[#0a84ff]/20 flex items-center justify-center shrink-0">
                                <GraduationCap size={18} className="text-[#0a84ff]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[16px] font-medium leading-tight">BCA - PSIT Kanpur</p>
                                <p className="text-[13px] text-white/50 mt-0.5">Current GPA: 8.2 / 10</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Download Action */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="pt-4"
                >
                    <a href="/resume.pdf" download="Ashwin_Jauhary_Resume.pdf" className="w-full bg-[#0a84ff] hover:bg-[#0070e5] active:scale-95 transition-all text-white font-semibold rounded-[16px] py-4 flex items-center justify-center gap-2 text-[17px] shadow-[0_5px_20px_rgba(10,132,255,0.4)]">
                        <Download size={20} strokeWidth={2.5} />
                        Download Full Resume
                    </a>
                </motion.div>

            </div>
        </div>
    );
}
