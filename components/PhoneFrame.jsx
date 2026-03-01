import React from 'react';

export default function PhoneFrame({ children, darkMode = true, brightness = 60, airplane = false, focus = false }) {
    const darknessOpacity = (1 - brightness / 100) * 0.7;

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center touch-none overscroll-none overflow-hidden">
            <div className="relative flex items-center justify-center overflow-hidden w-full h-full sm:w-[390px] sm:h-[844px] sm:rounded-[56px] sm:p-[3px] sm:bg-gradient-to-br sm:from-gray-300 sm:via-gray-500 sm:to-gray-800 sm:shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

                {/* Hardware side buttons — desktop only */}
                <div className="hidden sm:block pointer-events-none select-none">
                    <div className="absolute top-[108px] -left-[5px] w-[4px] h-[28px] bg-gradient-to-r from-gray-400 to-gray-600 rounded-l-md" />
                    <div className="absolute top-[148px] -left-[5px] w-[4px] h-[34px] bg-gradient-to-r from-gray-400 to-gray-600 rounded-l-md" />
                    <div className="absolute top-[196px] -left-[5px] w-[4px] h-[34px] bg-gradient-to-r from-gray-400 to-gray-600 rounded-l-md" />
                    <div className="absolute top-[160px] -right-[5px] w-[4px] h-[80px] bg-gradient-to-l from-gray-400 to-gray-600 rounded-r-md" />
                </div>

                {/* Inner screen */}
                <div className="relative w-full h-full overflow-hidden bg-black sm:rounded-[52px] sm:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">

                    {/* Glass flare */}
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/[0.04] to-transparent rotate-12 pointer-events-none z-50 mix-blend-overlay" />

                    {/* Content */}
                    <div
                        className="relative w-full h-full overflow-hidden transition-[filter] duration-500"
                        style={{
                            filter: darkMode ? 'none' : 'brightness(1.5) saturate(0.7)',
                            backgroundColor: darkMode ? 'rgb(9,9,11)' : 'rgb(235,235,240)',
                        }}
                    >
                        {children}
                    </div>

                    {/* Brightness overlay */}
                    {brightness < 100 && (
                        <div className="absolute inset-0 bg-black pointer-events-none z-[60] transition-opacity duration-150" style={{ opacity: darknessOpacity }} />
                    )}

                    {/* Airplane banner */}
                    {airplane && (
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-[70] bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none whitespace-nowrap">
                            ✈ Airplane Mode
                        </div>
                    )}

                    {/* Focus banner */}
                    {focus && (
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-[70] bg-yellow-400 text-black text-[11px] font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none whitespace-nowrap">
                            🌙 Focus Mode On
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
