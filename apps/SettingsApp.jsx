import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2, User, Info, Bell, Shield,
    Monitor, Smartphone, Globe, ChevronRight, Volume2,
    Moon, Wifi, Battery, Terminal, Sun, ArrowLeft,
    Grid, Lock, Eye, EyeOff, Languages, Check
} from 'lucide-react';

const WALLPAPERS = [
    { id: 'default', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', name: 'Mac OS Default' },
    { id: 'dark-mesh', src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2564&auto=format&fit=crop', name: 'Dark Mesh' },
    { id: 'neon-city', src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2564&auto=format&fit=crop', name: 'Neon City' },
    { id: 'minimal-grad', src: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2564&auto=format&fit=crop', name: 'Minimal Gradient' },
    { id: 'space', src: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2564&auto=format&fit=crop', name: 'Deep Space' },
    { id: 'forest', src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2564&auto=format&fit=crop', name: 'Forest Night' },
];

const LANGUAGES = [
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
];

function Toggle({ on, onToggle }) {
    return (
        <button onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${on ? 'bg-green-500' : 'bg-white/20'}`}
        >
            <motion.div animate={{ x: on ? 20 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
            />
        </button>
    );
}

function Row({ icon: Icon, iconBg, label, value, toggle, onToggle, onClick, isLast }) {
    const El = onClick ? 'button' : 'div';
    return (
        <El className={`w-full text-left flex items-center gap-3 px-4 py-3 ${!isLast ? 'border-b border-white/5' : ''} ${onClick ? 'cursor-pointer active:bg-white/5 transition-colors' : ''}`} onClick={onClick}>
            {Icon && <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}><Icon size={16} className="text-white" /></div>}
            <p className="text-white text-[15px] flex-1">{label}</p>
            {toggle !== undefined ? <Toggle on={toggle} onToggle={onToggle} />
                : value !== undefined ? <span className="text-white/40 text-[14px] flex items-center gap-1">{value}{onClick && <ChevronRight size={16} className="text-white/25" />}</span>
                    : onClick ? <ChevronRight size={16} className="text-white/25" /> : null}
        </El>
    );
}

function Section({ title, children }) {
    return (
        <div className="mb-6">
            {title && <p className="text-white/40 text-[12px] font-semibold uppercase tracking-widest mb-2 px-1">{title}</p>}
            <div className="bg-[#1c1c1e] rounded-[20px] overflow-hidden border border-white/5">{children}</div>
        </div>
    );
}

function BackHeader({ title, onBack }) {
    return (
        <div className="flex items-center gap-2 py-3 mb-2 border-b border-white/5">
            <button onClick={onBack} className="flex items-center gap-1 text-blue-400 text-[15px] font-medium"><ArrowLeft size={18} /> Back</button>
            <h2 className="flex-1 text-center text-white font-semibold text-[17px] pr-16">{title}</h2>
        </div>
    );
}

// ── Sub-pages ────────────────────────────────────────────────
function DisplayPage({ onBack, darkMode, setDarkMode, brightness, setBrightness }) {
    return (
        <div className="pb-20">
            <BackHeader title="Display & Brightness" onBack={onBack} />
            <Section>
                <div className="px-4 py-4 border-b border-white/5">
                    <p className="text-white/50 text-[12px] mb-3 uppercase tracking-widest font-semibold">Appearance</p>
                    <div className="flex gap-3">
                        {['Dark', 'Light'].map((mode) => (
                            <button key={mode} onClick={() => setDarkMode(mode === 'Dark')}
                                className={`flex-1 py-3 rounded-2xl border-2 flex flex-col items-center gap-2 ${(mode === 'Dark') === darkMode ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'}`}
                            >
                                {mode === 'Dark' ? <Moon size={22} className="text-white" /> : <Sun size={22} className="text-white" />}
                                <span className="text-white text-[13px] font-medium">{mode}</span>
                                {(mode === 'Dark') === darkMode && <Check size={14} className="text-blue-400" />}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="px-4 py-4">
                    <p className="text-white/50 text-[12px] mb-4 uppercase tracking-widest font-semibold">Brightness — {brightness}%</p>
                    <div className="flex items-center gap-3">
                        <Sun size={16} className="text-white/40 shrink-0" />
                        <div className="flex-1 relative h-6 flex items-center cursor-pointer touch-none"
                            onPointerDown={(e) => {
                                const el = e.currentTarget;
                                el.setPointerCapture(e.pointerId);
                                const update = (ev) => {
                                    const rect = el.getBoundingClientRect();
                                    setBrightness(Math.round(Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width)) * 100));
                                };
                                update(e);
                                el.onpointermove = update;
                                el.onpointerup = () => { el.onpointermove = null; };
                            }}
                        >
                            <div className="w-full h-2 rounded-full bg-white/15">
                                <div className="h-full rounded-full bg-white" style={{ width: `${brightness}%` }} />
                            </div>
                            <div className="absolute w-5 h-5 rounded-full bg-white shadow-lg" style={{ left: `calc(${brightness}% - 10px)` }} />
                        </div>
                        <Sun size={22} className="text-white shrink-0" />
                    </div>
                </div>
            </Section>
        </div>
    );
}

function HomeScreenPage({ onBack, gridSize, setGridSize }) {
    const GRIDS = [{ id: '4x5', label: '4 × 5 (Default)' }, { id: '4x6', label: '4 × 6 (Compact)' }, { id: '3x5', label: '3 × 5 (Large Icons)' }];
    return (
        <div className="pb-20">
            <BackHeader title="Home Screen Layout" onBack={onBack} />
            <Section title="Icon Grid">
                {GRIDS.map((g, i) => (
                    <button key={g.id} onClick={() => setGridSize(g.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 ${i < 2 ? 'border-b border-white/5' : ''} ${gridSize === g.id ? 'bg-blue-500/10' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${gridSize === g.id ? 'bg-blue-500' : 'bg-white/10'}`}><Grid size={16} className="text-white" /></div>
                        <span className="text-white flex-1 text-left text-[15px]">{g.label}</span>
                        {gridSize === g.id && <Check size={18} className="text-blue-400" />}
                    </button>
                ))}
            </Section>
        </div>
    );
}

function PrivacyPage({ onBack }) {
    const [camera, setCamera] = useState(true);
    const [location, setLocation] = useState(true);
    const [analytics, setAnalytics] = useState(false);
    const [tracking, setTracking] = useState(true);
    return (
        <div className="pb-20">
            <BackHeader title="Privacy & Security" onBack={onBack} />
            <Section title="App Permissions">
                <Row icon={Eye} iconBg="bg-green-600" label="Camera Access" toggle={camera} onToggle={() => setCamera(!camera)} />
                <Row icon={Globe} iconBg="bg-blue-600" label="Location Services" toggle={location} onToggle={() => setLocation(!location)} isLast />
            </Section>
            <Section title="Data & Analytics">
                <Row icon={EyeOff} iconBg="bg-gray-600" label="Share Analytics" toggle={analytics} onToggle={() => setAnalytics(!analytics)} />
                <Row icon={Shield} iconBg="bg-purple-600" label="Tracking Protection" toggle={tracking} onToggle={() => setTracking(!tracking)} isLast />
            </Section>
            <Section title="Security">
                <Row icon={Lock} iconBg="bg-red-600" label="Privacy Report" onClick={() => { }} isLast />
            </Section>
        </div>
    );
}

function LanguagePage({ onBack, language, setLanguage }) {
    return (
        <div className="pb-20">
            <BackHeader title="Language & Region" onBack={onBack} />
            <Section title="Language">
                {LANGUAGES.map((lang, i) => (
                    <button key={lang.code} onClick={() => setLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 ${i < LANGUAGES.length - 1 ? 'border-b border-white/5' : ''} ${language === lang.code ? 'bg-blue-500/10' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${language === lang.code ? 'bg-blue-500' : 'bg-white/10'}`}><Languages size={16} className="text-white" /></div>
                        <span className="text-white flex-1 text-left text-[15px]">{lang.name}</span>
                        {language === lang.code && <Check size={18} className="text-blue-400" />}
                    </button>
                ))}
            </Section>
            <Section title="Region">
                <Row icon={Globe} iconBg="bg-cyan-600" label="Region" value="India" isLast />
            </Section>
        </div>
    );
}

// ── Main Settings ────────────────────────────────────────────
export default function SettingsApp({
    darkMode, setDarkMode,
    sound, setSound,
    notifications, setNotifications,
    brightness, setBrightness,
    gridSize, setGridSize,
    language, setLanguage,
    wallpaper, setWallpaper,
    wifi, bluetooth, airplane,
}) {
    const [page, setPage] = useState('main');
    const langLabel = LANGUAGES.find(l => l.code === language)?.name.split(' ')[0] || 'English';

    const slide = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { duration: 0.18, ease: 'easeOut' } };
    const slideBack = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.18, ease: 'easeOut' } };

    return (
        <div className="bg-zinc-950 font-sans tracking-tight text-white min-h-full">
            <AnimatePresence mode="wait" initial={false}>

                {page === 'main' && (
                    <motion.div key="main" {...slideBack} className="px-4 pb-20 pt-2">
                        {/* Profile */}
                        <div className="bg-[#1c1c1e] mb-6 rounded-[20px] p-4 flex items-center gap-4 border border-white/5">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                                <img src="/avatar.png" alt="Ashwin" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-[18px]">Ashwin Jauhary</p>
                                <p className="text-white/50 text-[13px]">Apple ID, iCloud & Purchases</p>
                                <p className="text-blue-400 text-[13px]">ashwin.dev</p>
                            </div>
                            <ChevronRight size={18} className="text-white/25 ml-auto" />
                        </div>

                        <Section title="System">
                            <Row icon={Moon} iconBg="bg-indigo-600" label="Dark Mode" toggle={darkMode} onToggle={() => setDarkMode(!darkMode)} />
                            <Row icon={Volume2} iconBg="bg-red-500" label="Sounds & Haptics" toggle={sound} onToggle={() => setSound(!sound)} />
                            <Row icon={Bell} iconBg="bg-red-500" label="Notifications" toggle={notifications} onToggle={() => setNotifications(!notifications)} />
                            <Row icon={Wifi} iconBg="bg-blue-500" label="Wi-Fi" value={wifi && !airplane ? 'Connected' : 'Off'} />
                            <Row icon={Battery} iconBg="bg-green-600" label="Battery" value="86%" isLast />
                        </Section>

                        <Section title="Wallpaper">
                            <div className="p-4 grid grid-cols-2 gap-4">
                                {WALLPAPERS.map((wp) => {
                                    const isActive = wallpaper === wp.src;
                                    return (
                                        <motion.div key={wp.id} whileTap={{ scale: 0.95 }} onClick={() => setWallpaper(wp.src)}
                                            className={`relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer border-2 ${isActive ? 'border-blue-500' : 'border-transparent'}`}
                                        >
                                            <img src={wp.src} alt={wp.name} className="w-full h-full object-cover" />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-2 flex justify-between items-center">
                                                <span className="text-[11px] font-medium truncate pr-2">{wp.name}</span>
                                                {isActive && <CheckCircle2 size={14} className="text-blue-500" />}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </Section>

                        <Section title="Display">
                            <Row icon={Monitor} iconBg="bg-purple-600" label="Display & Brightness" value={`${brightness}%`} onClick={() => setPage('display')} />
                            <Row icon={Smartphone} iconBg="bg-gray-600" label="Home Screen Layout" value={gridSize} onClick={() => setPage('homescreen')} isLast />
                        </Section>

                        <Section title="Privacy">
                            <Row icon={Shield} iconBg="bg-blue-600" label="Privacy & Security" onClick={() => setPage('privacy')} />
                            <Row icon={Globe} iconBg="bg-cyan-600" label="Language & Region" value={langLabel} onClick={() => setPage('language')} isLast />
                        </Section>

                        <Section title="About This OS">
                            <Row icon={Terminal} iconBg="bg-zinc-700" label="Version" value="1.0.0" />
                            <Row icon={Info} iconBg="bg-gray-600" label="Built with" value="Next.js + Capacitor" />
                            <Row icon={User} iconBg="bg-orange-500" label="Developer" value="Ashwin Jauhary" isLast />
                        </Section>
                    </motion.div>
                )}

                {page === 'display' && (
                    <motion.div key="display" {...slide} className="px-4 pt-2">
                        <DisplayPage onBack={() => setPage('main')} darkMode={darkMode} setDarkMode={setDarkMode} brightness={brightness} setBrightness={setBrightness} />
                    </motion.div>
                )}

                {page === 'homescreen' && (
                    <motion.div key="homescreen" {...slide} className="px-4 pt-2">
                        <HomeScreenPage onBack={() => setPage('main')} gridSize={gridSize} setGridSize={setGridSize} />
                    </motion.div>
                )}

                {page === 'privacy' && (
                    <motion.div key="privacy" {...slide} className="px-4 pt-2">
                        <PrivacyPage onBack={() => setPage('main')} />
                    </motion.div>
                )}

                {page === 'language' && (
                    <motion.div key="language" {...slide} className="px-4 pt-2">
                        <LanguagePage onBack={() => setPage('main')} language={language} setLanguage={setLanguage} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
