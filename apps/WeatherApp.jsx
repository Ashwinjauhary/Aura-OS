import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, Thermometer, Loader2, MapPin, Calendar } from 'lucide-react';

// WMO weather code to icon and description mapping
function wmoInfo(code) {
    if (code === 0) return { icon: '☀️', bg: 'from-blue-400 to-blue-600', label: 'Clear Sky' };
    if (code <= 2) return { icon: '🌤️', bg: 'from-blue-300 to-blue-500', label: 'Partly Cloudy' };
    if (code <= 3) return { icon: '☁️', bg: 'from-gray-400 to-gray-600', label: 'Overcast' };
    if (code <= 49) return { icon: '🌫️', bg: 'from-gray-300 to-gray-500', label: 'Foggy' };
    if (code <= 59) return { icon: '🌦️', bg: 'from-blue-500 to-gray-600', label: 'Drizzle' };
    if (code <= 69) return { icon: '🌧️', bg: 'from-blue-600 to-gray-800', label: 'Rain' };
    if (code <= 79) return { icon: '🌨️', bg: 'from-blue-200 to-gray-400', label: 'Snow' };
    if (code <= 84) return { icon: '🌦️', bg: 'from-blue-500 to-gray-700', label: 'Showers' };
    if (code <= 99) return { icon: '⛈️', bg: 'from-purple-600 to-gray-900', label: 'Thunderstorm' };
    return { icon: '🌡️', bg: 'from-gray-500 to-gray-700', label: 'Unknown' };
}

export default function WeatherApp() {
    const [data, setData] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) { setError('Location not supported'); setLoading(false); return; }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude: lat, longitude: lon } }) => {
                try {
                    const [wxRes, geoRes] = await Promise.all([
                        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`),
                        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
                    ]);

                    if (!wxRes.ok) throw new Error('API Error');

                    const wx = await wxRes.json();
                    const geo = await geoRes.json();

                    setData(wx);
                    setCity(geo.city || geo.locality || geo.principalSubdivision || 'Your Location');
                } catch (err) {
                    setError('Failed to fetch weather data.');
                }
                setLoading(false);
            },
            (err) => {
                setError('Location access denied or unavailable.');
                setLoading(false);
            },
            { timeout: 10000 }
        );
    }, []);

    if (loading) {
        return (
            <div className="h-full bg-[#1c1c1e] text-white flex flex-col items-center justify-center p-6 gap-4">
                <Loader2 size={32} className="animate-spin text-blue-400" />
                <p className="text-white/60 font-medium">Fetching satellite data...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="h-full bg-[#1c1c1e] text-white flex flex-col items-center justify-center p-8 text-center gap-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                    <CloudSun size={32} className="text-red-400" />
                </div>
                <h2 className="text-xl font-bold">Weather Unavailable</h2>
                <p className="text-white/60 text-sm">{error || "Something went wrong."}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2.5 bg-blue-500 rounded-full font-semibold text-sm active:opacity-70">
                    Retry
                </button>
            </div>
        );
    }

    const current = data.current;
    const daily = data.daily;
    const info = wmoInfo(current.weather_code);

    return (
        <div className={`h-auto min-h-full text-white bg-gradient-to-br ${info.bg} pb-8 transition-colors duration-1000`}>
            {/* Header / Current Weather */}
            <div className="pt-16 pb-12 px-6 flex flex-col items-center text-center relative z-10">
                <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 max-w-full">
                    <MapPin size={12} className="shrink-0" />
                    <span className="text-[13px] font-semibold tracking-wide uppercase truncate">{city}</span>
                </div>

                <div className="text-[100px] leading-none drop-shadow-2xl mb-2">{info.icon}</div>
                <h1 className="text-[72px] font-thin tracking-tighter drop-shadow-lg tabular-nums">
                    {Math.round(current.temperature_2m)}°
                </h1>
                <p className="text-[20px] font-medium tracking-wide drop-shadow-md capitalize">
                    {info.label}
                </p>
                <p className="text-white/90 text-[15px] mt-1 font-medium">
                    H:{Math.round(daily.temperature_2m_max[0])}° L:{Math.round(daily.temperature_2m_min[0])}°
                </p>
            </div>

            {/* Current Details Cards */}
            <div className="px-5 grid grid-cols-3 gap-3 mb-6 relative z-10">
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col items-center gap-2">
                    <Thermometer size={20} className="text-white/70" />
                    <span className="text-[12px] text-white/70 font-medium">Feels Like</span>
                    <span className="text-[18px] font-semibold">{Math.round(current.apparent_temperature)}°</span>
                </div>
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col items-center gap-2">
                    <Wind size={20} className="text-white/70" />
                    <span className="text-[12px] text-white/70 font-medium">Wind (km/h)</span>
                    <span className="text-[18px] font-semibold">{Math.round(current.wind_speed_10m)}</span>
                </div>
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col items-center gap-2">
                    <Droplets size={20} className="text-white/70" />
                    <span className="text-[12px] text-white/70 font-medium">Humidity</span>
                    <span className="text-[18px] font-semibold">{current.relative_humidity_2m}%</span>
                </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="px-5 relative z-10">
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[32px] p-5">
                    <div className="flex items-center gap-2 mb-4 text-white/70 border-b border-white/10 pb-3">
                        <Calendar size={14} />
                        <span className="text-[13px] font-semibold uppercase tracking-wider">7-Day Forecast</span>
                    </div>

                    <div className="flex flex-col divde-y divide-white/5">
                        {daily.time.map((dateStr, i) => {
                            if (i === 0) return null; // Skip today as it's in the header
                            const date = new Date(dateStr);
                            const dayName = i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'long' });
                            const dayInfo = wmoInfo(daily.weather_code[i]);
                            const high = Math.round(daily.temperature_2m_max[i]);
                            const low = Math.round(daily.temperature_2m_min[i]);

                            // Calculate progress bar max/min across the week for relative widths
                            const weekMax = Math.max(...daily.temperature_2m_max.slice(1));
                            const weekMin = Math.min(...daily.temperature_2m_min.slice(1));
                            const range = weekMax - weekMin || 1;
                            const leftPct = ((low - weekMin) / range) * 100;
                            const widthPct = ((high - low) / range) * 100;

                            return (
                                <div key={dateStr} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                    <span className="w-[100px] text-[16px] font-medium">{dayName}</span>
                                    <span className="text-[24px] w-[30px] flex justify-center">{dayInfo.icon}</span>

                                    <div className="flex items-center gap-3 flex-1 justify-end">
                                        <span className="text-white/60 font-medium text-[15px] w-[24px] text-right">{low}°</span>
                                        <div className="w-[80px] h-[4px] bg-black/30 rounded-full relative overflow-hidden">
                                            <div
                                                className="absolute h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
                                                style={{ left: `${leftPct}%`, width: `${Math.max(10, widthPct)}%` }}
                                            />
                                        </div>
                                        <span className="text-white font-medium text-[15px] w-[24px] text-right">{high}°</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
