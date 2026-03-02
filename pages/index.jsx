import React from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import LockScreen from '@/components/LockScreen';
import HomeScreen from '@/components/HomeScreen';
import NotificationBar from '@/components/NotificationBar';
import ControlCenter from '@/components/ControlCenter';
import AppView from '@/components/AppView';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// ── Dynamic App Imports (Better Performance & HMR Stability) ──────────
const AboutApp = dynamic(() => import('@/apps/AboutApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const ProjectsApp = dynamic(() => import('@/apps/ProjectsApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const SkillsApp = dynamic(() => import('@/apps/SkillsApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const ContactApp = dynamic(() => import('@/apps/ContactApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const ResumeApp = dynamic(() => import('@/apps/ResumeApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const GalleryApp = dynamic(() => import('@/apps/GalleryApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const TerminalApp = dynamic(() => import('@/apps/TerminalApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const SettingsApp = dynamic(() => import('@/apps/SettingsApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const LinkedInApp = dynamic(() => import('@/apps/LinkedInApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const GitHubApp = dynamic(() => import('@/apps/GitHubApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const MapApp = dynamic(() => import('@/apps/MapApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const CalculatorApp = dynamic(() => import('@/apps/CalculatorApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const ClockApp = dynamic(() => import('@/apps/ClockApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const NotesApp = dynamic(() => import('@/apps/NotesApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const CalendarApp = dynamic(() => import('@/apps/CalendarApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const TicTacToeApp = dynamic(() => import('@/apps/TicTacToeApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const WeatherApp = dynamic(() => import('@/apps/WeatherApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const MusicApp = dynamic(() => import('@/apps/MusicApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const CodeApp = dynamic(() => import('@/apps/CodeApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const BrowserApp = dynamic(() => import('@/apps/BrowserApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const SnakeApp = dynamic(() => import('@/apps/SnakeApp'), { ssr: false, loading: () => <LoadingSpinner /> });
const ChatApp = dynamic(() => import('@/apps/ChatApp'), { ssr: false, loading: () => <LoadingSpinner /> });

const LoadingSpinner = () => (
    <div className="flex-1 flex items-center justify-center bg-black">
        <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin" />
    </div>
);

export default function Home() {
    // These DO NOT persist — session-only UI state
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
    const [activeApp, setActiveApp] = useState(null);

    // ── Persisted OS Settings (survive refresh) ───────────────
    const [wallpaper, setWallpaper] = useLocalStorage(
        'os_wallpaper',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'
    );
    const [darkMode, setDarkMode] = useLocalStorage('os_darkMode', true);
    const [sound, setSound] = useLocalStorage('os_sound', true);
    const [notifications, setNotifications] = useLocalStorage('os_notifications', true);
    const [brightness, setBrightness] = useLocalStorage('os_brightness', 60);
    const [gridSize, setGridSize] = useLocalStorage('os_gridSize', '4x5');
    const [language, setLanguage] = useLocalStorage('os_language', 'en-IN');
    const [wifi, setWifi] = useLocalStorage('os_wifi', true);
    const [bluetooth, setBluetooth] = useLocalStorage('os_bluetooth', true);
    const [airplane, setAirplane] = useLocalStorage('os_airplane', false);
    const [focus, setFocus] = useLocalStorage('os_focus', false);
    const [volume, setVolume] = useLocalStorage('os_volume', 80);

    // ── Unified Music State (Plays in background) ───────────────
    const [musicTracks, setMusicTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchInitialMusic = async () => {
            const LEGENDS = ['Kishore Kumar Hits', 'Kumar Sanu Hits', 'Udit Narayan Hits'];
            try {
                const results = await Promise.all(
                    LEGENDS.map(q =>
                        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=5&entity=song`)
                            .then(r => r.json())
                            .then(d => d.results || [])
                    )
                );
                const all = results.flat().filter(t => t.previewUrl);
                const unique = Array.from(new Map(all.map(t => [t.trackId, t])).values()).sort(() => Math.random() - 0.5);
                setMusicTracks(unique);
            } catch (e) { console.error("Music fetch failed", e); }
        };
        fetchInitialMusic();
    }, []);

    const osSettings = {
        darkMode, setDarkMode,
        sound, setSound,
        notifications, setNotifications,
        brightness, setBrightness,
        gridSize, setGridSize,
        language, setLanguage,
        wallpaper, setWallpaper,
        wifi, setWifi,
        bluetooth, setBluetooth,
        airplane, setAirplane,
        focus, setFocus,
        volume, setVolume,
    };

    const goHome = () => setActiveApp(null);

    const musicState = {
        tracks: musicTracks,
        currentIndex: currentTrackIndex,
        setIndex: setCurrentTrackIndex,
        isPlaying: isMusicPlaying,
        setPlaying: setIsMusicPlaying,
        volume: sound ? 100 : 0
    };

    // Play/Pause audio sync
    useEffect(() => {
        if (!audioRef.current) return;
        if (isMusicPlaying) audioRef.current.play().catch(() => setIsMusicPlaying(false));
        else audioRef.current.pause();
    }, [isMusicPlaying, currentTrackIndex]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = (sound ? volume / 100 : 0);
    }, [sound, volume]);

    const renderAppContent = (appId) => {
        switch (appId) {
            case 'about': return <AboutApp />;
            case 'projects': return <ProjectsApp />;
            case 'skills': return <SkillsApp />;
            case 'contact': return <ContactApp />;
            case 'resume': return <ResumeApp />;
            case 'gallery': return <GalleryApp />;
            case 'terminal': return <TerminalApp />;
            case 'linkedin': return <LinkedInApp />;
            case 'github': return <GitHubApp />;
            case 'map': return <MapApp />;
            case 'calculator': return <CalculatorApp />;
            case 'clock': return <ClockApp />;
            case 'notes': return <NotesApp />;
            case 'calendar': return <CalendarApp />;
            case 'tictactoe': return <TicTacToeApp />;
            case 'weather': return <WeatherApp />;
            case 'music': return <MusicApp {...musicState} />;
            case 'code': return <CodeApp />;
            case 'browser': return <BrowserApp />;
            case 'snake': return <SnakeApp />;
            case 'chat': return <ChatApp />;
            case 'settings': return <SettingsApp {...osSettings} />;
            default: return <div className="p-4 text-center text-white/50">Coming Soon</div>;
        }
    };

    return (
        <PhoneFrame darkMode={darkMode} brightness={brightness} airplane={airplane} focus={focus}>
            <audio
                ref={audioRef}
                src={musicTracks[currentTrackIndex]?.previewUrl}
                onEnded={() => setCurrentTrackIndex(i => (i + 1) % musicTracks.length)}
            />

            <NotificationBar
                controlCenterOpen={isControlCenterOpen}
                toggleControlCenter={() => setIsControlCenterOpen(!isControlCenterOpen)}
                wifi={wifi}
                airplane={airplane}
                focus={focus}
            />

            <AnimatePresence>
                {!isUnlocked ? (
                    <LockScreen key="lock" onUnlock={() => setIsUnlocked(true)} wallpaper={wallpaper} />
                ) : (
                    <HomeScreen key="home" openApp={setActiveApp} wallpaper={wallpaper} />
                )}
            </AnimatePresence>

            <ControlCenter
                isOpen={isControlCenterOpen}
                onClose={() => setIsControlCenterOpen(false)}
                music={musicState}
                {...osSettings}
            />

            <AnimatePresence mode="wait">
                {activeApp && (
                    <AppView appId={activeApp} onClose={goHome}>
                        {renderAppContent(activeApp)}
                    </AppView>
                )}
            </AnimatePresence>
        </PhoneFrame>
    );
}
