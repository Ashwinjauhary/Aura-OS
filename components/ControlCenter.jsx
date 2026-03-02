import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Bluetooth, Plane, Moon, Volume2, SunDim, Play, Pause, SkipBack, SkipForward, Music2, Loader2 } from 'lucide-react';

// ── Control Button ─────────────────────────────────────────
function ControlButton({ icon: Icon, label, active, color = '#007aff', onToggle, disabled }) {
    return (
        <button onClick={onToggle} disabled={disabled} title={label}
            className="w-[48px] h-[48px] rounded-full flex items-center justify-center text-white shadow-sm transition-all active:scale-90 disabled:opacity-40"
            style={{ backgroundColor: active ? color : 'rgba(255,255,255,0.15)' }}
        >
            <Icon size={22} strokeWidth={2} className={active ? '' : 'opacity-60'} />
        </button>
    );
}

// ── Vertical Slider ────────────────────────────────────────
function ControlSlider({ icon: Icon, level, setLevel }) {
    const elRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const updateLevel = (clientY) => {
        if (!elRef.current) return;
        const rect = elRef.current.getBoundingClientRect();
        const v = 1 - (clientY - rect.top) / rect.height;
        setLevel(Math.round(Math.max(0, Math.min(1, v)) * 100));
    };

    return (
        <motion.div ref={elRef}
            animate={{ scale: dragging ? 0.96 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex-1 bg-black/40 backdrop-blur-[40px] rounded-[34px] flex flex-col justify-end relative overflow-hidden shadow-lg border border-white/10 cursor-pointer touch-none"
            onPointerDown={(e) => { setDragging(true); elRef.current.setPointerCapture(e.pointerId); updateLevel(e.clientY); }}
            onPointerMove={(e) => { if (dragging) updateLevel(e.clientY); }}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
        >
            <div className="absolute inset-x-0 bottom-0 rounded-[34px] transition-none"
                style={{ height: `${level}%`, backgroundColor: 'rgba(255,255,255,0.9)' }} />
            <div className={`absolute inset-0 flex justify-center items-end pb-5 z-20 pointer-events-none transition-colors ${level < 25 ? 'text-white' : 'text-black'}`}>
                <Icon size={22} strokeWidth={2} />
            </div>
        </motion.div>
    );
}

// ── Music Player ───────────────────────────────────────────
const DEFAULT_QUERIES = [
    'Kishore Kumar Hits',
    'Kumar Sanu Hits',
    'Udit Narayan Hits',
    'Mukesh Hits',
    'Jagjit Singh Ghazals'
];


function MusicWidget({ music }) {
    const { tracks, currentIndex, setIndex, isPlaying, setPlaying } = music;
    const loading = tracks.length === 0;
    const track = tracks[currentIndex];

    // Toggle play/pause
    const togglePlay = (e) => {
        e.stopPropagation();
        if (!track) return;
        setPlaying(!isPlaying);
    };

    const prev = (e) => {
        e.stopPropagation();
        setIndex((currentIndex - 1 + tracks.length) % tracks.length);
    };

    const next = (e) => {
        e.stopPropagation();
        setIndex((currentIndex + 1) % tracks.length);
    };

    const artUrl = track?.artworkUrl100?.replace('100x100', '60x60');

    return (
        <div className="flex-1 rounded-[28px] overflow-hidden shadow-lg border border-white/10 relative"
            style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }}>

            {loading ? (
                <div className="flex items-center justify-center h-full gap-2 text-white/60">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-[11px]">Loading songs…</span>
                </div>
            ) : !track ? (
                <div className="flex flex-col items-center justify-center h-full gap-1 text-white/60">
                    <Music2 size={20} />
                    <span className="text-[11px]">No preview available</span>
                </div>
            ) : (
                <div className="flex flex-col h-full p-3 justify-between">
                    {/* Top row: art + info */}
                    <div className="flex items-start gap-2">
                        {artUrl ? (
                            <img src={artUrl} alt={track.trackName} className="w-10 h-10 rounded-lg shrink-0 shadow" loading="lazy" />
                        ) : (
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                <Music2 size={18} className="text-white/60" />
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="text-white font-bold text-[12px] leading-tight truncate">{track.trackName}</p>
                            <p className="text-white/60 text-[11px] truncate">{track.artistName}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between px-1">
                        <button onClick={prev} className="active:scale-75 transition-transform p-1">
                            <SkipBack size={16} className="text-white/70" fill="currentColor" />
                        </button>
                        <button onClick={togglePlay}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform shadow"
                        >
                            {isPlaying
                                ? <Pause size={14} className="text-black" fill="currentColor" />
                                : <Play size={14} className="text-black ml-0.5" fill="currentColor" />
                            }
                        </button>
                        <button onClick={next} className="active:scale-75 transition-transform p-1">
                            <SkipForward size={16} className="text-white/70" fill="currentColor" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Main Control Center ────────────────────────────────────
export default function ControlCenter({
    isOpen, onClose, music,
    wifi, setWifi,
    bluetooth, setBluetooth,
    airplane, setAirplane,
    focus, setFocus,
    brightness, setBrightness,
    sound, setSound,
    volume, setVolume,
}) {

    const toggleAirplane = () => {
        const newVal = !airplane;
        setAirplane(newVal);
        if (newVal) { setWifi(false); setBluetooth(false); }
        else { setWifi(true); setBluetooth(true); }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-[30px] z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ y: '-100%', opacity: 0.5, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: '-100%', opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 250 }}
                        className="absolute top-0 right-0 w-full h-auto z-40 p-4 pt-[70px] flex flex-col gap-3"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        {/* Row 1: Connectivity + Now Playing + Focus */}
                        <div className="flex gap-3 h-[170px]">
                            {/* 2×2 buttons */}
                            <div className="flex-1 bg-black/40 backdrop-blur-[40px] rounded-[32px] p-3.5 flex flex-col justify-between shadow-lg border border-white/10">
                                <div className="flex justify-between">
                                    <ControlButton icon={Plane} label="Airplane" active={airplane} onToggle={toggleAirplane} />
                                    <ControlButton icon={Wifi} label="Wi-Fi" active={wifi && !airplane} disabled={airplane} onToggle={() => setWifi(!wifi)} />
                                </div>
                                <div className="flex justify-between">
                                    <ControlButton icon={Bluetooth} label="Bluetooth" active={bluetooth && !airplane} disabled={airplane} onToggle={() => setBluetooth(!bluetooth)} />
                                    <ControlButton icon={Volume2} label="Sound" active={sound} color="#34c759" onToggle={() => setSound(!sound)} />
                                </div>
                            </div>

                            {/* Now Playing + Focus */}
                            <div className="flex-1 flex flex-col gap-3">
                                <MusicWidget music={music} />

                                <button onClick={() => setFocus(!focus)}
                                    className={`h-[52px] rounded-[28px] px-3 flex items-center gap-2 shadow-lg border transition-colors ${focus ? 'bg-yellow-500/30 border-yellow-500/40' : 'bg-black/40 backdrop-blur-[40px] border-white/10'}`}
                                >
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${focus ? 'bg-yellow-500' : 'bg-white/15'}`}>
                                        <Moon size={18} className={focus ? 'fill-white text-white' : 'text-white/60'} />
                                    </div>
                                    <span className={`text-[14px] font-semibold ${focus ? 'text-yellow-300' : 'text-white'}`}>
                                        {focus ? 'Focus On' : 'Focus'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Row 2: Sliders */}
                        <div className="flex gap-3 h-[140px]">
                            <ControlSlider icon={SunDim} level={brightness} setLevel={setBrightness} />
                            <ControlSlider icon={Volume2} level={sound ? volume : 0} setLevel={(v) => { setVolume(v); if (v > 0 && !sound) setSound(true); if (v === 0) setSound(false); }} />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
