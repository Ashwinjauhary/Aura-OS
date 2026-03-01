import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Repeat, Shuffle } from 'lucide-react';

export default function MusicApp({ globalVolume }) {
    const [tracks, setTracks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(true);

    const audioRef = useRef(null);

    // Fetch curated Hindi legends
    useEffect(() => {
        const LEGENDS = [
            'Kishore Kumar Hits', 'Kumar Sanu Hits', 'Udit Narayan Hits',
            'Mukesh Hits', 'Jagjit Singh Ghazals'
        ];

        Promise.all(
            LEGENDS.map(q =>
                fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=4&entity=song`)
                    .then(res => res.json())
                    .then(data => data.results || [])
                    .catch(() => [])
            )
        ).then(results => {
            // Flatten arrays and filter valid previews
            const allTracks = results.flat().filter(t => t && t.previewUrl);

            // Remove exact duplicates by trackId
            const uniqueTracks = Array.from(new Map(allTracks.map(t => [t.trackId, t])).values());

            // Shuffle array
            for (let i = uniqueTracks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [uniqueTracks[i], uniqueTracks[j]] = [uniqueTracks[j], uniqueTracks[i]];
            }

            setTracks(uniqueTracks);
            if (uniqueTracks.length > 0) setCurrentIndex(0);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    // Sync volume from props (if ControlCenter volume is shared globally)
    useEffect(() => {
        if (audioRef.current && globalVolume !== undefined) {
            audioRef.current.volume = globalVolume / 100;
        }
    }, [globalVolume]);

    const currentTrack = tracks[currentIndex];

    // Play/Pause sync
    useEffect(() => {
        if (!audioRef.current || !currentTrack) return;
        if (isPlaying) {
            audioRef.current.play().catch(() => setIsPlaying(false));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentIndex, currentTrack]);

    const togglePlay = () => {
        if (!currentTrack) return;
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        if (tracks.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % tracks.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        if (tracks.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        setIsPlaying(true);
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const onEnded = () => {
        nextTrack(); // Auto-advance
    };

    const handleSeek = (e) => {
        if (!audioRef.current || !duration) return;
        const newTime = (parseFloat(e.target.value) / 100) * duration;
        audioRef.current.currentTime = newTime;
        setProgress(newTime);
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-full bg-black text-white flex flex-col pt-12">
            {/* Header */}
            <div className="flex justify-between items-center px-6 mb-6 shrink-0">
                <Music size={24} className="text-[#ff2d55]" />
                <h1 className="text-[14px] font-bold tracking-widest uppercase">Now Playing</h1>
                <div className="w-6" /> {/* Placeholder for balance */}
            </div>

            {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-[#ff2d55] border-t-transparent animate-spin" />
                    <p className="text-white/50 text-[13px]">Loading 90s Hits...</p>
                </div>
            ) : !currentTrack ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-white/50">No music found.</p>
                </div>
            ) : (
                <>
                    <audio
                        ref={audioRef}
                        src={currentTrack.previewUrl}
                        onTimeUpdate={onTimeUpdate}
                        onEnded={onEnded}
                        onLoadedMetadata={onTimeUpdate}
                        preload="auto"
                    />

                    {/* Album Art - Spinning Vinyl Style */}
                    <div className="flex-1 flex flex-col items-center justify-center px-8 relative shrink-0 min-h-[300px]">
                        <div className={`w-[260px] h-[260px] rounded-full p-2 relative shadow-2xl transition-transform duration-1000 ${isPlaying ? 'scale-100' : 'scale-95'}`}>
                            {/* Vinyl Grooves Background */}
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-[#1a1a1c] to-[#0a0a0c] border border-white/10 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s', animationTimingFunction: 'linear' }} />
                            {/* Inner Circle Image */}
                            <div className={`relative w-full h-full rounded-full overflow-hidden border-[8px] border-[#111] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s', animationTimingFunction: 'linear' }}>
                                <img
                                    src={currentTrack.artworkUrl100?.replace('100x100', '400x400') || '/default-album.png'}
                                    alt="Album Art"
                                    className="w-full h-full object-cover opacity-90"
                                />
                                {/* Center Hole */}
                                <div className="absolute inset-0 m-auto w-6 h-6 bg-black rounded-full border border-white/20" />
                            </div>
                        </div>
                    </div>

                    {/* Track Info */}
                    <div className="px-8 mt-4 shrink-0">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 min-w-0 pr-4">
                                <h2 className="text-[22px] font-bold text-white truncate drop-shadow-md">
                                    {currentTrack.trackName}
                                </h2>
                                <p className="text-[15px] font-medium text-[#ff2d55] truncate mt-1">
                                    {currentTrack.artistName}
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <input
                                type="range"
                                min="0" max="100"
                                value={duration ? (progress / duration) * 100 : 0}
                                onChange={handleSeek}
                                className="w-full h-1.5 bg-white/20 rounded-full appearance-none outline-none accent-[#ff2d55]"
                            />
                            <div className="flex justify-between text-[11px] text-white/50 font-medium mt-2 tabular-nums">
                                <span>{formatTime(progress)}</span>
                                <span>-{formatTime(duration - progress)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mb-10 px-2 relative z-10">
                            <button className="text-white/40 active:text-white transition-colors p-2"><Shuffle size={20} /></button>

                            <div className="flex items-center gap-6">
                                <button onClick={prevTrack} className="text-white active:scale-90 transition-transform p-2">
                                    <SkipBack size={36} fill="currentColor" />
                                </button>

                                <button onClick={togglePlay} className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center text-black active:scale-95 shadow-[0_0_20px_rgba(255,45,85,0.3)] transition-all">
                                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                                </button>

                                <button onClick={nextTrack} className="text-white active:scale-90 transition-transform p-2">
                                    <SkipForward size={36} fill="currentColor" />
                                </button>
                            </div>

                            <button className="text-white/40 active:text-white transition-colors p-2"><Repeat size={20} /></button>
                        </div>
                    </div>
                </>
            )}

            {/* Background Blur Effect */}
            {currentTrack && (
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 select-none">
                    <img
                        src={currentTrack.artworkUrl100?.replace('100x100', '400x400')}
                        className="w-full h-full object-cover blur-[80px] scale-150 saturate-200"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            )}
        </div>
    );
}
