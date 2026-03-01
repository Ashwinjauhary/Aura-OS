import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Flag } from 'lucide-react';

function ClockTab() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const h = time.getHours() % 12;
    const m = time.getMinutes();
    const s = time.getSeconds();
    const hDeg = h * 30 + m * 0.5;
    const mDeg = m * 6 + s * 0.1;
    const sDeg = s * 6;

    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 pb-10">
            {/* Analog clock */}
            <div className="relative w-52 h-52">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="96" fill="#1c1c1e" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 - 90) * (Math.PI / 180);
                        const r1 = i % 3 === 0 ? 76 : 80, r2 = 90;
                        return <line key={i} x1={100 + r1 * Math.cos(angle)} y1={100 + r1 * Math.sin(angle)} x2={100 + r2 * Math.cos(angle)} y2={100 + r2 * Math.sin(angle)} stroke="rgba(255,255,255,0.5)" strokeWidth={i % 3 === 0 ? 2.5 : 1} strokeLinecap="round" />;
                    })}
                    {/* Hour */}
                    <line x1="100" y1="100" x2={100 + 52 * Math.cos((hDeg - 90) * Math.PI / 180)} y2={100 + 52 * Math.sin((hDeg - 90) * Math.PI / 180)} stroke="white" strokeWidth="5" strokeLinecap="round" />
                    {/* Minute */}
                    <line x1="100" y1="100" x2={100 + 68 * Math.cos((mDeg - 90) * Math.PI / 180)} y2={100 + 68 * Math.sin((mDeg - 90) * Math.PI / 180)} stroke="white" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Second */}
                    <line x1="100" y1="100" x2={100 + 74 * Math.cos((sDeg - 90) * Math.PI / 180)} y2={100 + 74 * Math.sin((sDeg - 90) * Math.PI / 180)} stroke="#ff9f0a" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="100" cy="100" r="4" fill="#ff9f0a" />
                </svg>
            </div>
            <p className="text-white text-[48px] font-thin tracking-tight tabular-nums">
                {String(time.getHours()).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
            </p>
            <p className="text-white/40 text-[14px]">
                {time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
        </div>
    );
}

function StopwatchTab() {
    const [ms, setMs] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const ref = useRef(null);
    const lastRef = useRef(0);

    useEffect(() => {
        if (running) {
            lastRef.current = Date.now() - ms;
            ref.current = setInterval(() => setMs(Date.now() - lastRef.current), 10);
        } else clearInterval(ref.current);
        return () => clearInterval(ref.current);
    }, [running]);

    const fmt = (t) => {
        const m = Math.floor(t / 60000), s = Math.floor((t % 60000) / 1000), cs = Math.floor((t % 1000) / 10);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col items-center py-8">
                <p className="text-white text-[60px] font-thin tabular-nums">{fmt(ms)}</p>
                <div className="flex gap-6 mt-4">
                    <button onClick={() => { if (!running) { setMs(0); setLaps([]); } else setLaps(l => [...l, ms]); }}
                        className="w-16 h-16 rounded-full bg-[#333] text-white font-medium text-[14px] active:opacity-70 flex items-center justify-center gap-1">
                        {running ? <><Flag size={14} /> Lap</> : <><RefreshCw size={14} /> Reset</>}
                    </button>
                    <button onClick={() => setRunning(r => !r)}
                        className={`w-16 h-16 rounded-full font-medium text-[14px] active:opacity-70 flex items-center justify-center ${running ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {running ? <Pause size={22} /> : <Play size={22} />}
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 divide-y divide-white/5">
                {[...laps].reverse().map((lap, i) => (
                    <div key={i} className="flex justify-between py-2 text-white/70 text-[15px] tabular-nums">
                        <span>Lap {laps.length - i}</span>
                        <span>{fmt(lap)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Play beep alarm using Web Audio API
function playAlarm() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [0, 0.35, 0.7].forEach((delay) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 880;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.6, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.28);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.3);
        });
    } catch { }
}

function TimerTab() {
    const [inputMin, setInputMin] = useState(1);
    const [inputSec, setInputSec] = useState(0);
    const [total, setTotal] = useState(60);
    const [remaining, setRemaining] = useState(60);
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (running) {
            ref.current = setInterval(() => {
                setRemaining(r => {
                    if (r <= 1) {
                        clearInterval(ref.current);
                        setRunning(false);
                        setDone(true);
                        playAlarm();
                        return 0;
                    }
                    return r - 1;
                });
            }, 1000);
        } else clearInterval(ref.current);
        return () => clearInterval(ref.current);
    }, [running]);

    const applyCustomTime = () => {
        const secs = Math.max(1, inputMin * 60 + inputSec);
        setTotal(secs);
        setRemaining(secs);
        setRunning(false);
        setDone(false);
    };

    const PRESETS = [
        { label: '1 min', m: 1, s: 0 },
        { label: '5 min', m: 5, s: 0 },
        { label: '10 min', m: 10, s: 0 },
        { label: '25 min', m: 25, s: 0 },
    ];

    const m = Math.floor(remaining / 60), s = remaining % 60;

    return (
        <div className="flex flex-col items-center h-full py-4 gap-4 overflow-y-auto">
            {/* Circular ring */}
            <div className="relative w-40 h-40 shrink-0">
                <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                    <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle cx="90" cy="90" r="80" fill="none"
                        stroke={done ? '#ff3b30' : '#ff9f0a'} strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 80}`}
                        strokeDashoffset={`${2 * Math.PI * 80 * (1 - remaining / total)}`}
                        style={{ transition: 'stroke-dashoffset 1s linear' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-white text-[36px] font-thin tabular-nums">
                        {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
                    </p>
                    {done && <p className="text-red-400 text-[11px] font-semibold animate-pulse">Time&apos;s up!</p>}
                </div>
            </div>

            {/* Custom time input */}
            <div className="bg-[#1c1c1e] rounded-2xl p-3 w-full max-w-[260px] border border-white/5">
                <p className="text-white/40 text-[11px] font-semibold mb-2 text-center uppercase tracking-wider">Custom Time</p>
                <div className="flex items-center gap-2 justify-center">
                    <div className="flex flex-col items-center">
                        <input type="number" min="0" max="99"
                            value={inputMin}
                            onChange={e => setInputMin(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-14 h-10 bg-white/10 rounded-xl text-white text-[20px] font-medium text-center outline-none border border-white/10 focus:border-[#ff9f0a]"
                        />
                        <span className="text-white/30 text-[10px] mt-1">min</span>
                    </div>
                    <span className="text-white/50 text-[22px] font-thin mb-3">:</span>
                    <div className="flex flex-col items-center">
                        <input type="number" min="0" max="59"
                            value={inputSec}
                            onChange={e => setInputSec(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                            className="w-14 h-10 bg-white/10 rounded-xl text-white text-[20px] font-medium text-center outline-none border border-white/10 focus:border-[#ff9f0a]"
                        />
                        <span className="text-white/30 text-[10px] mt-1">sec</span>
                    </div>
                    <button onClick={applyCustomTime}
                        className="mb-3 px-3 py-2 bg-[#ff9f0a] text-black rounded-xl text-[12px] font-bold active:opacity-70">
                        Set
                    </button>
                </div>
            </div>

            {/* Presets */}
            <div className="flex gap-2 flex-wrap justify-center">
                {PRESETS.map(p => {
                    const v = p.m * 60 + p.s;
                    return (
                        <button key={v} onClick={() => { setInputMin(p.m); setInputSec(p.s); setTotal(v); setRemaining(v); setRunning(false); setDone(false); }}
                            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${total === v && !done ? 'bg-[#ff9f0a] text-black' : 'bg-white/10 text-white'}`}>
                            {p.label}
                        </button>
                    );
                })}
            </div>

            {/* Start / Pause / Reset */}
            <button onClick={() => {
                if (done) { setRemaining(total); setDone(false); return; }
                setRunning(r => !r);
            }}
                className={`w-16 h-16 rounded-full font-semibold text-[14px] active:opacity-70 transition-colors ${done ? 'bg-red-500/20 text-red-400' : running ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {done ? 'Reset' : running ? 'Pause' : 'Start'}
            </button>
        </div>
    );
}


export default function ClockApp() {
    const [tab, setTab] = useState('clock');
    const TABS = ['clock', 'stopwatch', 'timer'];

    return (
        <div className="h-full flex flex-col bg-zinc-950">
            <div className="flex border-b border-white/5 shrink-0">
                {TABS.map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`flex-1 py-3 text-[13px] font-medium capitalize transition-colors ${tab === t ? 'text-[#ff9f0a] border-b-2 border-[#ff9f0a]' : 'text-white/40'}`}>
                        {t}
                    </button>
                ))}
            </div>
            <div className="flex-1 overflow-hidden">
                {tab === 'clock' && <ClockTab />}
                {tab === 'stopwatch' && <StopwatchTab />}
                {tab === 'timer' && <TimerTab />}
            </div>
        </div>
    );
}
