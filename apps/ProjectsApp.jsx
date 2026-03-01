import React from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
    {
        subtitle: 'FEATURED',
        title: 'ClubSphere',
        desc: 'Role-based platform for college clubs with AI reports.',
        tech: ['React.js', 'Supabase', 'Gemini API'],
        color: 'bg-gradient-to-br from-[#00c6ff] to-[#0072ff]',
        textColor: 'text-white'
    },
    {
        subtitle: 'ADVANCED 3D',
        title: 'SolarFlow Viz',
        desc: 'Interactive 3D visualization for solar workflow monitoring.',
        tech: ['React Three Fiber', 'Three.js', 'Tailwind'],
        color: 'bg-gradient-to-br from-[#f83600] to-[#f9d423]',
        textColor: 'text-white'
    },
    {
        subtitle: 'WORKSPACE',
        title: 'Studify-OS',
        desc: 'OS-style student workspace with global chat & tasks.',
        tech: ['React.js', 'TypeScript', 'Supabase'],
        color: 'bg-gradient-to-br from-[#ff0844] to-[#ffb199]',
        textColor: 'text-white'
    },
    {
        subtitle: 'PRODUCTIVITY',
        title: 'TaskFlow',
        desc: 'Advanced Next-gen Kanban board with real-time analytics.',
        tech: ['TypeScript', 'Express.js', 'MongoDB'],
        color: 'bg-gradient-to-br from-[#11998e] to-[#38ef7d]',
        textColor: 'text-white'
    },
    {
        subtitle: 'CROSS-PLATFORM',
        title: 'Notely',
        desc: 'Premium notes app focused on productivity & UI/UX.',
        tech: ['Flutter', 'Dart', 'Material 3'],
        color: 'bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0]',
        textColor: 'text-white'
    }
];

export default function ProjectsApp() {
    return (
        <div className="pb-12 font-sans tracking-[-0.015em] bg-zinc-950 h-auto">

            {/* App Store Style Header */}
            <div className="px-5 pt-2 mb-6 border-b border-white/10 pb-3 sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-20">
                <p className="text-gray-400 text-[13px] font-semibold tracking-wide uppercase mb-0.5">Sunday, March 1</p>
                <div className="flex justify-between items-end">
                    <h1 className="text-[34px] font-bold tracking-tight text-white leading-none">Projects</h1>
                    <div className="w-9 h-9 rounded-full bg-[#1c1c1e] flex items-center justify-center mb-0.5 overflow-hidden border border-white/10 shadow-sm">
                        <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* App Store Cards */}
            <div className="space-y-8 px-5">
                {PROJECTS.map((proj, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                        className="w-full relative shadow-[0_15px_30px_rgba(0,0,0,0.6)] cursor-pointer active:scale-[0.98] transition-transform duration-300"
                    >
                        {/* Cover Card */}
                        <div className={`w-full h-[320px] rounded-[20px] ${proj.color} p-5 relative overflow-hidden`}>

                            {/* Inner flare */}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent mix-blend-overlay pointer-events-none" />

                            <div className="relative z-10 flex flex-col">
                                <p className={`text-[13px] font-semibold uppercase tracking-widest opacity-80 ${proj.textColor} mb-1 drop-shadow-md`}>
                                    {proj.subtitle}
                                </p>
                                <h2 className={`text-[28px] leading-tight font-bold ${proj.textColor} w-[80%] drop-shadow-lg mb-2`}>
                                    {proj.title}
                                </h2>
                                <p className={`text-[15px] font-medium leading-tight opacity-90 drop-shadow-md ${proj.textColor} w-[90%]`}>
                                    {proj.desc}
                                </p>
                            </div>
                        </div>

                        {/* App Store "App Row" inside the card bottom */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-xl rounded-[14px] p-3 flex items-center justify-between border border-white/10 shadow-lg">
                            <div className="flex flex-col">
                                <span className="text-white text-[15px] font-semibold tracking-tight">{proj.title}</span>
                                <span className="text-gray-300 text-[12px] opacity-80 flex gap-1 items-center">
                                    {proj.tech.slice(0, 2).map(t => <span key={t}>{t} • </span>)}
                                    More
                                </span>
                            </div>
                            <div className="bg-white/20 hover:bg-white/30 text-white font-bold text-[15px] px-4 py-1.5 rounded-full transition-colors font-sans tracking-tight">
                                VIEW
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
