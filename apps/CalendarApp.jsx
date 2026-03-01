import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HOLIDAYS = {
    '1-1': '🎊 New Year', '1-26': '🇮🇳 Republic Day', '3-25': '🎨 Holi',
    '8-15': '🇮🇳 Independence Day', '10-2': '✊ Gandhi Jayanti',
    '10-21': '🎆 Diwali', '12-25': '🎄 Christmas',
};

export default function CalendarApp() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selected, setSelected] = useState(today.getDate());

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
    const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

    const holiday = HOLIDAYS[`${month + 1}-${selected}`];
    const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

    return (
        <div className="h-full flex flex-col bg-zinc-950 px-4 pt-3 pb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20">
                    <ChevronLeft size={18} className="text-white" />
                </button>
                <div className="text-center">
                    <p className="text-white font-bold text-[18px]">{MONTHS[month]}</p>
                    <p className="text-white/40 text-[13px]">{year}</p>
                </div>
                <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20">
                    <ChevronRight size={18} className="text-white" />
                </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-[12px] font-semibold text-white/40 py-1">{d}</div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-1 flex-1">
                {cells.map((d, i) => (
                    <button key={i} disabled={!d}
                        onClick={() => d && setSelected(d)}
                        className={`aspect-square flex items-center justify-center rounded-full text-[15px] transition-colors mx-auto w-9 h-9
                            ${!d ? '' : isToday(d) ? 'bg-[#ff9f0a] text-black font-bold' : d === selected ? 'bg-white/20 text-white font-semibold' : 'text-white/80 active:bg-white/10'}
                            ${HOLIDAYS[`${month + 1}-${d}`] ? 'ring-1 ring-blue-400/50' : ''}
                        `}>
                        {d}
                    </button>
                ))}
            </div>

            {/* Selected day info */}
            <div className="mt-4 bg-[#1c1c1e] rounded-2xl p-4 border border-white/5">
                <p className="text-white font-semibold text-[15px]">
                    {selected} {MONTHS[month]} {year}
                    {isToday(selected) && <span className="ml-2 text-[#ff9f0a] text-[12px]">Today</span>}
                </p>
                {holiday ? (
                    <p className="text-blue-300 text-[13px] mt-1">{holiday}</p>
                ) : (
                    <p className="text-white/30 text-[13px] mt-1">No events</p>
                )}
            </div>
        </div>
    );
}
