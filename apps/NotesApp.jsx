import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

const STORAGE_KEY = 'os_notes';

function loadNotes() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}
function saveNotes(notes) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch { }
}

export default function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [active, setActive] = useState(null); // null = list, id = editing

    useEffect(() => { setNotes(loadNotes()); }, []);

    const updateNotes = (next) => { setNotes(next); saveNotes(next); };

    const newNote = () => {
        const note = { id: Date.now(), title: '', body: '', updatedAt: Date.now() };
        updateNotes([note, ...notes]);
        setActive(note.id);
    };

    const deleteNote = (id) => { updateNotes(notes.filter(n => n.id !== id)); if (active === id) setActive(null); };

    const patchNote = (id, patch) => {
        const next = notes.map(n => n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n);
        updateNotes(next);
    };

    const activeNote = notes.find(n => n.id === active);
    const fmt = (ts) => new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

    if (active && activeNote) {
        return (
            <div className="h-full flex flex-col bg-zinc-950">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
                    <button onClick={() => setActive(null)} className="flex items-center gap-1 text-[#ff9f0a] text-[15px]">
                        <ArrowLeft size={18} /> Notes
                    </button>
                    <button onClick={() => deleteNote(active)} className="text-red-400 p-1">
                        <Trash2 size={18} />
                    </button>
                </div>
                <div className="flex-1 flex flex-col px-4 pt-3 overflow-hidden">
                    <input
                        className="bg-transparent text-white text-[22px] font-bold outline-none placeholder:text-white/20 mb-2 w-full"
                        placeholder="Title"
                        value={activeNote.title}
                        onChange={e => patchNote(active, { title: e.target.value })}
                    />
                    <p className="text-white/30 text-[12px] mb-3">{fmt(activeNote.updatedAt)}</p>
                    <textarea
                        className="flex-1 bg-transparent text-white/80 text-[16px] outline-none resize-none placeholder:text-white/20 leading-relaxed"
                        placeholder="Start typing…"
                        value={activeNote.body}
                        onChange={e => patchNote(active, { body: e.target.value })}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-zinc-950">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
                <h1 className="text-white font-bold text-[20px]">Notes</h1>
                <button onClick={newNote} className="w-8 h-8 rounded-full bg-[#ff9f0a] flex items-center justify-center">
                    <Plus size={18} className="text-black" />
                </button>
            </div>

            {notes.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-white/30 gap-3">
                    <div className="text-[48px]">📝</div>
                    <p className="text-[16px]">No Notes</p>
                    <p className="text-[13px]">Tap + to write your first note</p>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                    {notes.map(note => (
                        <div key={note.id} onClick={() => setActive(note.id)}
                            className="px-4 py-3 cursor-pointer active:bg-white/5 transition-colors flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <p className="text-white font-semibold text-[16px] truncate">{note.title || 'New Note'}</p>
                                <p className="text-white/40 text-[13px] mt-0.5 truncate">{fmt(note.updatedAt)} · {note.body.substring(0, 40) || 'No additional text'}</p>
                            </div>
                            <button onClick={e => { e.stopPropagation(); deleteNote(note.id); }} className="text-white/20 hover:text-red-400 transition-colors p-1 shrink-0">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
