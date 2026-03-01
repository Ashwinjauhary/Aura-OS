import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Code2, Sparkles, Send } from 'lucide-react';

// Reusable Bento Box Component
const BentoBox = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, type: 'spring', bounce: 0.4 }}
        className={`bg-[#1c1c1e]/80 backdrop-blur-xl rounded-[24px] border border-white/10 overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${className}`}
    >
        {children}
    </motion.div>
);

export default function AboutApp() {
    return (
        <div className="font-sans tracking-tight bg-black text-white px-4 pb-24 pt-6">
            <div className="flex flex-col gap-4">

                {/* Hero / Avatar Bento (Full Width) */}
                <BentoBox delay={0.1} className="h-[220px] p-0 flex flex-col items-center justify-center text-center relative group">
                    {/* Animated Mesh Background */}
                    <div className="absolute inset-0 mesh-gradient opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                        className="relative z-10 w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center mb-3"
                    >
                        <img src="/avatar.png" alt="Ashwin Jauhary" className="w-full h-full object-cover" />
                    </motion.div>

                    <h1 className="relative z-10 text-[26px] font-semibold leading-none mb-1 text-white drop-shadow-sm">Ashwin Jauhary</h1>
                    <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                        <Sparkles size={14} className="text-[#0a84ff]" />
                        <span className="text-[13px] font-medium text-white/90">BCA Student | Web Developer</span>
                    </div>
                </BentoBox>

                {/* Grid Row: Experience & Education */}
                <div className="grid grid-cols-2 gap-4 h-[150px]">
                    <BentoBox delay={0.2} className="p-4 flex flex-col justify-between group cursor-pointer hover:bg-[#2c2c2e]/80 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-[#ff9f0a]/20 flex items-center justify-center shadow-inner">
                            <Briefcase size={18} className="text-[#ff9f0a]" />
                        </div>
                        <div>
                            <h2 className="text-[32px] font-semibold leading-none text-white group-hover:scale-105 transition-transform origin-left mb-1">10+</h2>
                            <p className="text-[12px] text-white/50 font-medium leading-tight">Projects Built<br />Full-Stack & UI</p>
                        </div>
                    </BentoBox>

                    <BentoBox delay={0.3} className="p-4 flex flex-col justify-between group cursor-pointer hover:bg-[#2c2c2e]/80 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-[#30d158]/20 flex items-center justify-center shadow-inner">
                            <GraduationCap size={18} className="text-[#30d158]" />
                        </div>
                        <div>
                            <h2 className="text-[18px] font-semibold leading-tight text-white group-hover:text-[#30d158] transition-colors mb-1">BCA</h2>
                            <p className="text-[12px] text-white/50 font-medium leading-tight">PSIT Kanpur <br /> 2024–2027</p>
                        </div>
                    </BentoBox>
                </div>

                {/* Location & Quick Action Row */}
                <div className="grid grid-cols-2 gap-4 h-[100px]">
                    <BentoBox delay={0.4} className="p-4 flex items-center gap-3 cursor-default">
                        <div className="w-10 h-10 rounded-full bg-[#5e5ce6]/20 flex items-center justify-center shrink-0 shadow-inner">
                            <MapPin size={18} className="text-[#5e5ce6]" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-white/50 font-medium uppercase tracking-wider text-[10px] mb-0.5">Location</span>
                            <span className="text-[14px] font-semibold text-white leading-tight">Kanpur, IN</span>
                        </div>
                    </BentoBox>

                    <BentoBox delay={0.5} className="p-0 cursor-pointer overflow-hidden group">
                        <a href="mailto:ashwin2431333@gmail.com" className="w-full h-full bg-[#0a84ff] hover:bg-[#0070e5] transition-colors flex items-center justify-center gap-2">
                            <Send size={18} className="text-white fill-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <span className="text-[16px] font-semibold text-white">Hire Me</span>
                        </a>
                    </BentoBox>
                </div>

                {/* Bio / About text Bento */}
                <BentoBox delay={0.6} className="p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-full bg-[#ff375f]/20 flex items-center justify-center shadow-inner">
                            <Code2 size={14} className="text-[#ff375f]" />
                        </div>
                        <h3 className="text-[16px] font-semibold">About Me</h3>
                    </div>
                    <p className="text-[14px] leading-relaxed text-white/80 tracking-tight">
                        Hi, I'm Ashwin Jauhary, a 2nd-year BCA student at PSIT Kanpur. I love building modern, responsive, and interactive web applications. My long-term goal is to achieve academic excellence, secure a good placement, start my own business, and grow in the stock & investment world.
                    </p>
                </BentoBox>

            </div>
        </div>
    );
}
