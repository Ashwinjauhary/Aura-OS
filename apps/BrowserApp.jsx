import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home, Search, Lock } from 'lucide-react';

export default function BrowserApp() {
    const [urlInput, setUrlInput] = useState('https://ashwin-portolio-react.vercel.app/');
    const [currentUrl, setCurrentUrl] = useState('https://ashwin-portolio-react.vercel.app/');
    const [isLoading, setIsLoading] = useState(false);

    // Fallback bookmarks
    const bookmarks = [
        { name: 'Portfolio', url: 'https://ashwin-portolio-react.vercel.app/' },
        { name: 'GitHub', url: 'https://github.com/AshwinJauhary' },
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Special:Search?search=React_(JavaScript_library)' },
    ];

    const handleNavigate = (e) => {
        e?.preventDefault();
        let finalUrl = urlInput.trim();
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = `https://${finalUrl}`;
        }
        setCurrentUrl(finalUrl);
        setUrlInput(finalUrl);
        setIsLoading(true);
    };

    return (
        <div className="w-full h-full bg-[#f8f9fa] flex flex-col text-black font-sans">
            {/* Top Navigation Bar */}
            <div className="pt-12 pb-2 px-3 bg-[#f0f0f5] border-b border-gray-300 flex flex-col gap-2 shrink-0">
                <div className="flex items-center justify-between px-1 text-blue-500">
                    <div className="flex gap-4">
                        <button className="active:opacity-50"><ChevronLeft size={24} /></button>
                        <button className="active:opacity-50 opacity-50"><ChevronRight size={24} /></button>
                    </div>
                    <span className="text-[17px] font-semibold text-black">Browser</span>
                    <button className="active:opacity-50" onClick={() => {
                        setIsLoading(true);
                        // Force iframe remount slightly
                        const temp = currentUrl;
                        setCurrentUrl('');
                        setTimeout(() => setCurrentUrl(temp), 50);
                    }}>
                        <RotateCw size={20} />
                    </button>
                </div>

                <form onSubmit={handleNavigate} className="relative mt-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Lock size={14} />
                    </div>
                    <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full bg-[#ffffff] h-10 rounded-xl pl-9 pr-10 text-[15px] outline-none shadow-sm focus:ring-2 focus:ring-blue-400"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 active:text-blue-500">
                        <Search size={16} />
                    </button>
                </form>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white relative">
                {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 overflow-hidden z-10">
                        <div className="h-full bg-blue-500 animate-[loading_1.5s_ease-in-out]" onAnimationEnd={() => setIsLoading(false)}></div>
                    </div>
                )}

                {/* Bookmarks Overlay (shown if URL is empty or matches home) */}
                {currentUrl === '' && (
                    <div className="absolute inset-0 p-6 flex flex-col gap-6 z-20 bg-[#f8f9fa]">
                        <h2 className="text-xl font-bold text-gray-800">Favorites</h2>
                        <div className="grid grid-cols-4 gap-4">
                            {bookmarks.map((bm, i) => (
                                <div key={i} onClick={() => {
                                    setUrlInput(bm.url);
                                    setCurrentUrl(bm.url);
                                }} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
                                    <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-500">
                                        <Home size={24} />
                                    </div>
                                    <span className="text-[11px] text-center text-gray-600 font-medium truncate w-full">{bm.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 text-sm rounded-xl border border-yellow-200">
                            <strong>Note:</strong> Many popular websites (like Google, YouTube) block embedding in iframes via 'X-Frame-Options'. Try Wikipedia or standard blogs.
                        </div>
                    </div>
                )}

                {/* The actual browser renderer */}
                {currentUrl && (
                    <iframe
                        src={currentUrl}
                        className="w-full h-full border-none"
                        onLoad={() => setIsLoading(false)}
                        title="Browser Content"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                )}
            </div>

            <style jsx>{`
                @keyframes loading {
                    0% { width: 0%; transform: translateX(0); }
                    50% { width: 50%; transform: translateX(50%); }
                    100% { width: 100%; transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
