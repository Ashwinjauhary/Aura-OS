import React, { useState } from 'react';
import { MapPin, Navigation, Search, Building2, Code, GraduationCap, Briefcase } from 'lucide-react';

const LOCATIONS = [
    {
        id: 'psit',
        name: 'PSIT College of Higher Education',
        subtitle: 'My College',
        icon: GraduationCap,
        color: 'bg-blue-500',
        lat: 26.4499,
        lng: 80.3319,
        description: 'Pursuing BCA (2024–2027). President of Codester Club.',
        mapUrl: 'https://maps.google.com/maps?q=PSIT+College+Kanpur&z=15&output=embed'
    },
    {
        id: 'kanpur',
        name: 'Kanpur, Uttar Pradesh',
        subtitle: 'My City',
        icon: MapPin,
        color: 'bg-red-500',
        lat: 26.4499,
        lng: 80.3319,
        description: 'Home city — the Industrial Capital of UP, India.',
        mapUrl: 'https://maps.google.com/maps?q=Kanpur,Uttar+Pradesh,India&z=12&output=embed'
    },
    {
        id: 'workspace',
        name: 'Remote Developer',
        subtitle: 'Work Setup',
        icon: Code,
        color: 'bg-purple-500',
        lat: 26.4499,
        lng: 80.3319,
        description: 'Working remotely on projects for Catalyst Crew & Posterwa.',
        mapUrl: 'https://maps.google.com/maps?q=Kanpur,Uttar+Pradesh,India&z=14&output=embed'
    },
];

export default function MapApp() {
    const [selected, setSelected] = useState(LOCATIONS[0]);

    return (
        <div className="h-full flex flex-col bg-black font-sans overflow-hidden">
            {/* Map Embed */}
            <div className="relative flex-1 w-full overflow-hidden">
                <iframe
                    key={selected.id}
                    title="Map"
                    src={selected.mapUrl}
                    className="w-full h-full border-0 saturate-0 brightness-75"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Map Overlay Gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Current Location Pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                    <Navigation size={14} className="text-blue-400" />
                    <span className="text-white text-[13px] font-semibold">{selected.name}</span>
                </div>
            </div>

            {/* Location Cards */}
            <div className="bg-[#0a0a0a] border-t border-white/10 px-4 pt-4 pb-6 shrink-0">
                <p className="text-white/40 text-[12px] font-semibold tracking-widest uppercase mb-3">My Locations</p>
                <div className="flex flex-col gap-2">
                    {LOCATIONS.map((loc) => {
                        const Icon = loc.icon;
                        const isActive = selected.id === loc.id;
                        return (
                            <button
                                key={loc.id}
                                onClick={() => setSelected(loc)}
                                className={`flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${isActive ? 'bg-white/10 border border-white/15' : 'bg-white/5 border border-transparent'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl ${loc.color} flex items-center justify-center shrink-0`}>
                                    <Icon size={18} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold text-[14px] truncate">{loc.name}</p>
                                    <p className="text-white/50 text-[12px]">{loc.description}</p>
                                </div>
                                {isActive && (
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
