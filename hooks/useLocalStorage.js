import { useState, useEffect } from 'react';

/**
 * SSR-safe localStorage hook.
 * Always renders defaultValue on first render (matches server HTML — no hydration mismatch).
 * After mount, reads saved value from localStorage and keeps it in sync.
 */
export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(defaultValue);
    const [mounted, setMounted] = useState(false);

    // After hydration: read from localStorage once
    useEffect(() => {
        setMounted(true);
        try {
            const stored = window.localStorage.getItem(key);
            if (stored !== null) {
                setValue(JSON.parse(stored));
            }
        } catch { }
    }, [key]);

    // Sync to localStorage on every value change (only after mount)
    useEffect(() => {
        if (!mounted) return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch { }
    }, [key, value, mounted]);

    return [value, setValue];
}
