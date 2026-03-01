import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const COMMANDS = {
    help: "Available commands: \n  whoami    - About the author\n  skills    - List tech stack\n  projects  - View top projects\n  contact   - Reach out\n  clear     - Clear terminal\n  echo      - Print text\n  date      - Current date and time",
    whoami: "Ashwin Jauhary\nBCA Student | Web Developer | Tech Enthusiast\nFocus: Full-Stack MERN, React, Next.js, and scaling products.",
    skills: "Frontend: React.js, Next.js, Tailwind CSS\nBackend: Node.js, Express.js, Supabase, REST APIs\nDatabases: MongoDB, PostgreSQL, SQLite\nTools: Git, Vercel, Postman, Figma",
    projects: "1. ClubSphere - College Club Platform\n2. SolarFlow Viz - 3D Solar Workflow\n3. Studify-OS - Student Workspace\n4. TaskFlow - Advanced Kanban",
    contact: "Email: ashwin2431333@gmail.com\nLinkedIn: linkedin.com/in/ashwinjauhary",
};

export default function TerminalApp() {
    const [history, setHistory] = useState([
        { type: 'system', text: 'Aura OS Terminal [Version 1.0.0]' },
        { type: 'system', text: '(c) 2026 Ashwin Jauhary. All rights reserved.' },
        { type: 'system', text: '\nType "help" for a list of available commands.\n' }
    ]);
    const [input, setInput] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const args = cmd.split(' ');
            const mainCmd = args[0];

            let newHistory = [...history, { type: 'user', text: `~ $ ${input}` }];

            if (mainCmd === 'clear') {
                newHistory = [];
            } else if (mainCmd === 'echo') {
                newHistory.push({ type: 'output', text: args.slice(1).join(' ') });
            } else if (mainCmd === 'date') {
                newHistory.push({ type: 'output', text: new Date().toString() });
            } else if (COMMANDS[mainCmd]) {
                newHistory.push({ type: 'output', text: COMMANDS[mainCmd] });
            } else if (mainCmd !== '') {
                newHistory.push({ type: 'error', text: `Command not found: ${mainCmd}` });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <div className="min-h-full h-full w-full flex flex-col bg-zinc-950 font-mono text-[14px] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#000511] z-0" />
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full z-0 pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 blur-[120px] rounded-full z-0 pointer-events-none" />

            {/* Window Header */}
            <div className="flex items-center justify-between bg-white/5 backdrop-blur-md px-4 py-3 border-b border-white/10 shrink-0 select-none z-10 shadow-sm relative">
                <div className="flex gap-1.5 w-16">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20" />
                </div>
                <div className="flex items-center absolute left-1/2 -translate-x-1/2">
                    <Terminal size={14} className="text-white/40 mr-2" />
                    <span className="text-white/60 text-[11px] font-semibold tracking-widest uppercase">root@aura-os</span>
                </div>
                <div className="w-16" /> {/* Spacer */}
            </div>

            {/* Terminal Area */}
            <div ref={containerRef} className="flex-1 overflow-y-auto p-5 space-y-2 pb-12 z-10 custom-scrollbar">
                {history.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`whitespace-pre-wrap leading-[1.6] ${line.type === 'error' ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]'
                            : line.type === 'user' ? 'text-white'
                                : 'text-blue-100/80 drop-shadow-sm'
                            }`}
                    >
                        {line.type === 'system' && <span className="text-emerald-400/80 mr-2">▶</span>}
                        {line.text}
                    </motion.div>
                ))}

                <div className="flex items-center mt-3 pt-2">
                    <span className="text-emerald-400 font-bold mr-2 drop-shadow-[0_0_8px_rgba(52,211,100,0.4)]">~ $</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        spellCheck={false}
                        autoComplete="off"
                        className="flex-1 bg-transparent border-none outline-none text-white font-mono min-w-0 caret-emerald-400"
                    />
                </div>
            </div>
        </div>
    );
}
