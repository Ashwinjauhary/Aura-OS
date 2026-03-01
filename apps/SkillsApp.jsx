import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Database, Wrench, CheckCircle2 } from 'lucide-react';

const SKILL_CARDS = [
    {
        id: 'frontend',
        title: 'Frontend',
        subtitle: 'DEVELOPMENT',
        icon: Layout,
        gradient: 'from-[#ff2a54] to-[#ff9b44]',
        number: '**** 404',
        items: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Bootstrap']
    },
    {
        id: 'backend',
        title: 'Backend',
        subtitle: 'SYSTEMS',
        icon: Server,
        gradient: 'from-[#00c6ff] to-[#0072ff]',
        number: '**** 500',
        items: ['Node.js', 'Express.js', 'Supabase', 'RESTful APIs']
    },
    {
        id: 'database',
        title: 'Database',
        subtitle: 'MANAGEMENT',
        icon: Database,
        gradient: 'from-[#34c759] to-[#30d158]',
        number: '**** 200',
        items: ['MongoDB', 'PostgreSQL', 'SQLite', 'Mongoose']
    },
    {
        id: 'tools',
        title: 'Tools',
        subtitle: 'DEVELOPER KIT',
        icon: Wrench,
        gradient: 'from-[#8e8e93] to-[#48484a]',
        number: '**** 101',
        items: ['Git & GitHub', 'Postman', 'Figma', 'Vercel']
    }
];

export default function SkillsApp() {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="font-sans tracking-tight bg-black px-4 pt-10 pb-20 relative h-auto">
            <div className="mb-8 px-2 flex justify-between items-end">
                <div>
                    <h1 className="text-[34px] font-bold tracking-tighter text-white leading-none">Wallet</h1>
                    <p className="text-[#ebebf5] opacity-60 text-[15px] mt-1 font-medium">Tech Stack Passes</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1c1c1e] flex items-center justify-center border border-white/10 shadow-sm cursor-pointer">
                    <span className="text-white text-[18px] leading-none mb-0.5">+</span>
                </div>
            </div>

            {/* Wallet Stack */}
            <div className="relative h-[480px]">
                <AnimatePresence>
                    {SKILL_CARDS.map((card, index) => {
                        const isSelected = selectedId === card.id;
                        const isOtherSelected = selectedId !== null && selectedId !== card.id;

                        // Calculate stacked positions
                        let yPos = index * 60;
                        let scale = 1;
                        let zIndex = index;
                        let opacity = 1;

                        if (selectedId) {
                            if (isSelected) {
                                yPos = -20;
                                scale = 1.05;
                                zIndex = 50;
                            } else {
                                yPos = 400 + (index * 20);
                                scale = 0.9;
                                opacity = 0.5;
                            }
                        }

                        return (
                            <motion.div
                                key={card.id}
                                layout
                                initial={{ y: 500, opacity: 0 }}
                                animate={{
                                    y: yPos,
                                    scale: scale,
                                    zIndex: zIndex,
                                    opacity: opacity
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                    delay: selectedId ? 0 : index * 0.1
                                }}
                                onClick={() => setSelectedId(isSelected ? null : card.id)}
                                className={`absolute left-0 right-0 h-[220px] rounded-[20px] bg-gradient-to-br ${card.gradient} p-5 cursor-pointer shadow-[0_−8px_20px_rgba(0,0,0,0.3),_0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20`}
                            >
                                {/* Card Glass patterns */}
                                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-[100px] h-[100px] bg-black/10 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none" />

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-white/70 text-[11px] font-bold tracking-widest uppercase mb-0.5 drop-shadow-sm">{card.subtitle}</p>
                                            <h2 className="text-white text-[24px] font-semibold tracking-tight drop-shadow-md">{card.title}</h2>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                                            <card.icon size={20} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="flex gap-1.5">
                                            <div className="w-8 h-5 bg-white/30 rounded flex items-center justify-center backdrop-blur-sm border border-white/20">
                                                <div className="w-2 h-2 rounded-full bg-white/80" />
                                            </div>
                                            <span className="text-white font-mono text-[16px] tracking-widest opacity-90 drop-shadow-sm">{card.number}</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 shadow-sm opacity-90 drop-shadow-sm">
                                            <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Selected Card Details Panel */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: 'spring', delay: 0 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.5 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y > 60) setSelectedId(null);
                        }}
                        className="absolute bottom-0 left-0 right-0 bg-[#1c1c1e] rounded-t-[32px] p-6 pt-8 shadow-[0_-15px_40px_rgba(0,0,0,0.5)] border-t border-white/10 z-40 h-[340px] flex flex-col"
                    >
                        <div className="w-12 h-1.5 bg-white/20 rounded-full absolute top-3 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing" />

                        <div className="flex justify-between items-end mb-4 shrink-0">
                            <h3 className="text-white text-[22px] font-semibold tracking-tight">Technologies</h3>
                            <span className="text-[#0a84ff] text-[15px] font-medium cursor-pointer" onClick={() => setSelectedId(null)}>Done</span>
                        </div>

                        <div
                            className="space-y-3 overflow-y-auto flex-1 pb-8 no-scrollbar relative"
                            onPointerDownCapture={(e) => e.stopPropagation()}
                        >
                            {SKILL_CARDS.find(c => c.id === selectedId)?.items.map((item, idx) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (idx * 0.05) }}
                                    className="flex items-center justify-between bg-black/40 p-3.5 rounded-[14px] border border-white/5"
                                >
                                    <span className="text-white text-[16px] font-medium tracking-tight">{item}</span>
                                    <CheckCircle2 size={18} className="text-[#30d158]" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
