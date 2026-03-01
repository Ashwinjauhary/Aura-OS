import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, FolderCode, Mail, Code2, FileText, LayoutTemplate,
    Settings, Camera, Map, Terminal, Linkedin, Github,
    Calculator, Clock, NotebookPen, CalendarDays,
    Wind, Droplets, Thermometer, CloudSun, Loader2, Gamepad2, Music,
    Code, MessageSquare, Compass, Bug
} from 'lucide-react';

// ── WMO weather code → emoji + label
function wmoInfo(code) {
    if (code === 0) return { icon: '☀️', label: 'Clear' };
    if (code <= 2) return { icon: '🌤️', label: 'Partly Cloudy' };
    if (code <= 3) return { icon: '☁️', label: 'Overcast' };
    if (code <= 49) return { icon: '🌫️', label: 'Foggy' };
    if (code <= 59) return { icon: '🌦️', label: 'Drizzle' };
    if (code <= 69) return { icon: '🌧️', label: 'Rain' };
    if (code <= 79) return { icon: '🌨️', label: 'Snow' };
    if (code <= 84) return { icon: '🌦️', label: 'Showers' };
    if (code <= 99) return { icon: '⛈️', label: 'Thunder' };
    return { icon: '🌡️', label: 'Unknown' };
}

function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchWeather = useCallback(() => {
        setLoading(true);
        setError(false);
        if (!navigator.geolocation) { setError(true); setLoading(false); return; }
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude: lat, longitude: lon } }) => {
                try {
                    const [wx, geo] = await Promise.all([
                        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh`).then(r => r.json()),
                        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`).then(r => r.json()),
                    ]);
                    setWeather(wx.current);
                    setCity(geo.city || geo.locality || 'Your Location');
                } catch { setError(true); }
                setLoading(false);
            },
            () => { setError(true); setLoading(false); }
        );
    }, []);

    useEffect(() => { fetchWeather(); }, [fetchWeather]);

    const info = weather ? wmoInfo(weather.weather_code) : null;

    return (
        <div className="w-full h-full min-h-[140px] ios-glass squircle p-4 text-white app-icon-shadow pointer-events-none">
            {loading ? (
                <div className="flex items-center gap-2 h-full justify-center">
                    <Loader2 size={16} className="animate-spin opacity-60" />
                    <span className="text-white/50 text-[13px]">Getting weather…</span>
                </div>
            ) : error ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Map size={24} className="text-[#ff9f0a]" />
                    <span className="text-white/70 text-[13px] font-medium text-center">Location needed</span>
                </div>
            ) : (
                <div className="flex flex-col h-full pointer-events-none">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">{city}</p>
                            <p className="text-white text-[38px] font-thin leading-none">{Math.round(weather.temperature_2m)}°C</p>
                            <p className="text-white/60 text-[13px] mt-0.5">{info.label}</p>
                        </div>
                        <span className="text-[44px] leading-none">{info.icon}</span>
                    </div>
                    <div className="flex gap-4 mt-3">
                        <div className="flex items-center gap-1 text-white/50 text-[11px]"><Thermometer size={11} />{Math.round(weather.apparent_temperature)}°</div>
                        <div className="flex items-center gap-1 text-white/50 text-[11px]"><Wind size={11} />  {Math.round(weather.wind_speed_10m)} км/h</div>
                    </div>
                </div>
            )}
        </div>
    );
}

// GitHub Widget (Square 2x2)
function GithubWidget() {
    return (
        <div className="w-full h-full min-h-[155px] ios-glass squircle p-4 flex flex-col justify-between app-icon-shadow text-white pointer-events-none">
            <div className="flex justify-between items-start">
                <span className="font-semibold text-sm">GitHub</span>
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1" />
            </div>
            <div className="flex-1 flex flex-col justify-end pt-2">
                <div className="w-11 h-11 rounded-full overflow-hidden mb-1 border-2 border-green-500/30">
                    <img src="/avatar.png" alt="Ashwin" className="w-full h-full object-cover" />
                </div>
                <p className="text-[12px] font-bold text-gray-200">Ashwin Jauhary</p>
            </div>
        </div>
    );
}

const ALL_APPS = [
    // Page 1
    { id: 'githubWidget', type: 'widget', component: GithubWidget, name: 'GitHub', colSpan: 2 },
    { id: 'about', name: 'About', icon: User, color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { id: 'projects', name: 'Projects', icon: FolderCode, color: 'bg-gradient-to-br from-purple-400 to-purple-600' },
    { id: 'skills', name: 'Skills', icon: Code2, color: 'bg-gradient-to-br from-orange-400 to-orange-600' },
    { id: 'resume', name: 'Resume', icon: FileText, color: 'bg-gradient-to-br from-red-400 to-red-600' },
    { id: 'contact', name: 'Contact', icon: Mail, color: 'bg-gradient-to-br from-emerald-400 to-emerald-600' },
    { id: 'gallery', name: 'Gallery', icon: LayoutTemplate, color: 'bg-gradient-to-br from-pink-400 to-pink-600' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'bg-gradient-to-br from-[#2a2a2c] to-[#1a1a1c]' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-[#0a66c2]' },
    { id: 'github', name: 'GitHub', icon: Github, color: 'bg-gradient-to-br from-gray-700 to-gray-900' },
    { id: 'calculator', name: 'Calculator', icon: Calculator, color: 'bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e]' },
    { id: 'clock', name: 'Clock', icon: Clock, color: 'bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e]' },

    // Page 2
    { id: 'weatherWidget', type: 'widget', component: WeatherWidget, name: 'Weather', colSpan: 4 },
    { id: 'calendar', name: 'Calendar', icon: CalendarDays, color: 'bg-gradient-to-br from-red-500 to-red-700' },
    { id: 'notes', name: 'Notes', icon: NotebookPen, color: 'bg-gradient-to-br from-yellow-500 to-yellow-600' },
    { id: 'map', name: 'Maps', icon: Map, color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { id: 'tictactoe', name: 'Game', icon: Gamepad2, color: 'bg-gradient-to-br from-purple-500 to-indigo-600' },
    { id: 'weather', name: 'Weather', icon: CloudSun, color: 'bg-gradient-to-br from-blue-300 to-blue-500' },
    { id: 'music', name: 'Music', icon: Music, color: 'bg-gradient-to-br from-pink-500 to-[#ff2d55]' },
    { id: 'code', name: 'Sandbox', icon: Code, color: 'bg-[#1e1e1e] border border-white/10' },
    { id: 'browser', name: 'Browser', icon: Compass, color: 'bg-[#1b62e0]' },
    { id: 'snake', name: 'Snake', icon: Bug, color: 'bg-emerald-600' },
    { id: 'chat', name: 'Ashwin AI', icon: MessageSquare, color: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
];

const APPS_PER_PAGE = 12; // "3x4 hi rakkho" -> 4 columns, roughly 3 rows per page (Widgets take 1 full row visually)
const STORAGE_KEY = 'os_app_order_v2';

function loadOrder() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (Array.isArray(saved) && saved.length === ALL_APPS.length) return saved;
    } catch { }
    return ALL_APPS.map(a => a.id);
}

function saveOrder(order) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(order)); } catch { }
}

const JIGGLE_STYLE = `
@keyframes jiggle {
  0%   { transform: rotate(-1.5deg); }
  25%  { transform: rotate(0deg); }
  50%  { transform: rotate(1.5deg); }
  75%  { transform: rotate(0deg); }
  100% { transform: rotate(-1.5deg); }
}
.jiggle { animation: jiggle 0.3s infinite; transform-origin: center; }
`;

export default function HomeScreen({ openApp, wallpaper }) {
    const [order, setOrder] = useState(() => {
        if (typeof window !== 'undefined') return loadOrder();
        return ALL_APPS.map(a => a.id);
    });

    // Core Layout State
    const [page, setPage] = useState(0);
    const [editMode, setEditMode] = useState(false);

    // Drag & Drop State
    const [dragIdx, setDragIdx] = useState(null); // global index
    const [overIdx, setOverIdx] = useState(null); // global index
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

    const holdTimer = useRef(null);
    const swipeStartX = useRef(null);
    const isDragging = useRef(false);
    const gridRef = useRef(null);
    const pageTurnTimeout = useRef(null);

    useEffect(() => {
        if (document.getElementById('jiggle-style')) return;
        const style = document.createElement('style');
        style.id = 'jiggle-style';
        style.textContent = JIGGLE_STYLE;
        document.head.appendChild(style);
    }, []);

    const orderedApps = order.map(id => ALL_APPS.find(a => a.id === id)).filter(Boolean);
    const totalPages = Math.ceil(orderedApps.length / APPS_PER_PAGE);
    const pageStart = page * APPS_PER_PAGE;

    const commitReorder = useCallback(() => {
        if (dragIdx === null || overIdx === null || dragIdx === overIdx) return;
        const next = [...order];
        const [removed] = next.splice(dragIdx, 1);
        next.splice(overIdx, 0, removed);
        setOrder(next);
        saveOrder(next);
    }, [dragIdx, overIdx, order]);

    const exitEdit = () => {
        commitReorder();
        setEditMode(false);
        setDragIdx(null);
        setOverIdx(null);
        isDragging.current = false;
    };

    const globalIdx = (localIdx) => pageStart + localIdx;

    const getHoveredIdx = (clientX, clientY) => {
        if (!gridRef.current) return null;
        const cells = gridRef.current.querySelectorAll('[data-appidx]');
        for (const cell of cells) {
            const rect = cell.getBoundingClientRect();
            if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
                return parseInt(cell.dataset.appidx);
            }
        }
        return null;
    };

    const onPointerDown = (e, localIdx) => {
        if (e.button !== 0 && e.pointerType !== 'touch') return;
        if (editMode) return;

        swipeStartX.current = e.clientX;
        const gIdx = globalIdx(localIdx);

        holdTimer.current = setTimeout(() => {
            isDragging.current = true;
            setEditMode(true);
            setDragIdx(gIdx);
            setOverIdx(gIdx);
            setDragPos({ x: e.clientX, y: e.clientY });
            e.currentTarget?.releasePointerCapture?.(e.pointerId);
        }, 450);
    };

    const onEditPointerDown = (e, localIdx) => {
        if (!editMode) return;
        const gIdx = globalIdx(localIdx);
        isDragging.current = true;
        setDragIdx(gIdx);
        setOverIdx(gIdx);
        setDragPos({ x: e.clientX, y: e.clientY });
        e.stopPropagation();
        e.currentTarget?.releasePointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!isDragging.current || dragIdx === null) return;
        setDragPos({ x: e.clientX, y: e.clientY });

        // Custom Cross-Page Drag Edge Detection
        const margin = 40;
        if (!pageTurnTimeout.current) {
            if (e.clientX < margin && page > 0) {
                setPage(p => p - 1);
                pageTurnTimeout.current = setTimeout(() => { pageTurnTimeout.current = null }, 800);
            } else if (e.clientX > window.innerWidth - margin && page < totalPages - 1) {
                setPage(p => p + 1);
                pageTurnTimeout.current = setTimeout(() => { pageTurnTimeout.current = null }, 800);
            }
        }

        const hovered = getHoveredIdx(e.clientX, e.clientY);
        if (hovered !== null) setOverIdx(hovered);
    };

    const onPointerUp = (e) => {
        clearTimeout(holdTimer.current);

        if (isDragging.current && dragIdx !== null) {
            commitReorder();
            setDragIdx(null);
            setOverIdx(null);
            isDragging.current = false;
            return;
        }

        isDragging.current = false;

        // Swipe to change page
        if (swipeStartX.current !== null && !editMode) {
            const dx = e.clientX - swipeStartX.current;
            if (dx < -50) setPage(p => Math.min(p + 1, totalPages - 1));
            else if (dx > 50) setPage(p => Math.max(p - 1, 0));
        }
        swipeStartX.current = null;
    };

    const onPointerCancel = () => {
        clearTimeout(holdTimer.current);
        isDragging.current = false;
        setDragIdx(null);
        setOverIdx(null);
    };

    // Calculate which elements to actually render dynamically
    const displayApps = () => {
        if (dragIdx === null || overIdx === null) return orderedApps.slice(pageStart, pageStart + APPS_PER_PAGE);
        const globalApps = [...orderedApps];
        const [removed] = globalApps.splice(dragIdx, 1);
        globalApps.splice(overIdx, 0, removed);
        return globalApps.slice(pageStart, pageStart + APPS_PER_PAGE);
    };

    const draggingApp = dragIdx !== null ? orderedApps[dragIdx] : null;

    // A helper function to dry up app icon code
    const renderAppElement = (app, isBeingDragged) => {
        if (app.type === 'widget') {
            const WidgetComponent = app.component;
            return (
                <div className={`w-full ${isBeingDragged ? 'opacity-10 scale-105' : 'opacity-100'} transition-all`}>
                    <WidgetComponent />
                </div>
            )
        }
        const Icon = app.icon;
        return (
            <div className={`flex flex-col items-center gap-1 ${isBeingDragged ? 'opacity-0 scale-50' : 'opacity-100'} transition-all`}>
                <div className={`w-[60px] h-[60px] ${app.color} rounded-[18px] flex items-center justify-center app-icon-shadow relative`}>
                    <Icon size={30} className="text-white" strokeWidth={1.75} />
                </div>
                <span className="text-white text-[11px] font-medium text-shadow text-center leading-tight w-[70px] truncate">
                    {app.name}
                </span>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 z-20 overflow-hidden bg-cover bg-center select-none"
            style={{ backgroundImage: `url("${wallpaper}")` }}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onClick={(e) => {
                if (editMode && e.target === e.currentTarget) exitEdit();
            }}
        >
            <div className="absolute inset-0 bg-black/15 backdrop-blur-[18px]" />

            {/* Done button in edit mode */}
            {editMode && (
                <button onClick={exitEdit}
                    className="absolute top-14 right-5 z-30 bg-white/20 backdrop-blur border border-white/30 text-white text-[13px] font-semibold px-4 py-1.5 rounded-full active:bg-white/40">
                    Done
                </button>
            )}

            {/* App + Widget dynamic grid container */}
            <div ref={gridRef} className={`relative z-10 w-full px-6 grid grid-cols-4 gap-y-6 gap-x-4 place-items-center ${editMode ? 'pt-24' : 'pt-16'}`}>
                {displayApps().map((app, localIdx) => {
                    if (!app) return <div key={localIdx} className="w-[60px] h-[60px]" />;
                    const gIdx = globalIdx(localIdx);
                    const isBeingDragged = dragIdx === gIdx;
                    const isDropTarget = overIdx === gIdx && dragIdx !== null && dragIdx !== overIdx;
                    const isWidget = app.type === 'widget';

                    return (
                        <div
                            key={app.id}
                            data-appidx={gIdx}
                            className={`flex flex-col items-center justify-center cursor-pointer touch-none relative
                                ${isWidget ? (app.colSpan === 2 ? 'col-span-2 w-full h-[155px]' : 'col-span-4 w-full h-[140px]') : 'w-[60px] h-auto'}
                                ${editMode && !isBeingDragged ? 'jiggle' : ''}
                                ${isDropTarget ? 'scale-105' : ''}
                                transition-transform`}
                            onPointerDown={editMode
                                ? (e) => onEditPointerDown(e, localIdx)
                                : (e) => onPointerDown(e, localIdx)
                            }
                            onClick={() => {
                                if (!editMode && !isDragging.current && !isWidget && app.id !== 'githubWidget' && app.id !== 'weatherWidget') {
                                    openApp(app.id);
                                } else if (!editMode && !isDragging.current && app.id === 'githubWidget') {
                                    openApp('github');
                                }
                            }}
                        >
                            {renderAppElement(app, isBeingDragged)}
                        </div>
                    );
                })}
            </div>

            {/* Floating drag ghost (supports Widgets and Apps) */}
            {isDragging.current && draggingApp && (
                <div className="fixed z-50 pointer-events-none origin-top-left"
                    style={{
                        left: dragPos.x,
                        top: dragPos.y,
                        transform: 'translate(-50%, -50%)',
                    }}>
                    {draggingApp.type === 'widget' ? (
                        <div className={`shrink-0 scale-[1.05] shadow-2xl opacity-90 rounded-3xl overflow-hidden ${draggingApp.colSpan === 2 ? 'w-[155px] h-[155px]' : 'w-[90vw] max-w-[400px]'}`}>
                            <draggingApp.component />
                        </div>
                    ) : (
                        <div className={`flex flex-col items-center gap-1 scale-[1.15] opacity-90 shadow-2xl`}>
                            <div className={`w-[60px] h-[60px] ${draggingApp.color} rounded-[18px] flex items-center justify-center app-icon-shadow relative`}>
                                <draggingApp.icon size={30} className="text-white" strokeWidth={1.75} />
                            </div>
                            <span className="text-white text-[11px] font-medium text-shadow text-center leading-tight w-[70px] truncate">
                                {draggingApp.name}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Pagination dots */}
            {!editMode && totalPages > 1 && (
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button key={i} onClick={() => setPage(i)}
                            className={`rounded-full transition-all duration-300 ${i === page ? 'w-5 h-[6px] bg-white' : 'w-[6px] h-[6px] bg-white/40'}`}
                        />
                    ))}
                </div>
            )}

            {/* Dock */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[92%] h-[88px] ios-dock rounded-[35px] px-4 py-3 flex justify-between items-center z-10">
                {[
                    { id: 'settings', icon: Settings, color: 'bg-gradient-to-br from-[#8e8e93] to-[#48484a]' },
                    { id: 'gallery', icon: Camera, color: 'bg-gradient-to-br from-[#c8c8cc] to-[#98989d]' },
                    { id: 'map', icon: Map, color: 'bg-gradient-to-br from-[#34c759] to-[#28a745]' },
                    { id: 'contact', icon: Mail, color: 'bg-gradient-to-br from-[#007aff] to-[#0056b3]' },
                ].map(({ id, icon: Icon, color }) => (
                    <div key={`dock-${id}`} onClick={() => !editMode && openApp(id)} className={`flex flex-col items-center cursor-pointer ${editMode ? 'jiggle' : ''}`}>
                        <div className={`w-[60px] h-[60px] ${color} rounded-[18px] flex items-center justify-center app-icon-shadow active:opacity-70 transition-opacity`}>
                            <Icon size={30} className="text-white" strokeWidth={1.75} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white rounded-full z-10 opacity-90" />
        </motion.div>
    );
}
