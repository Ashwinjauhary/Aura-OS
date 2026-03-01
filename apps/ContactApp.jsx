import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Plus, Camera, Mic, ArrowUp } from 'lucide-react';

const INITIAL_MESSAGES = [
    { id: 1, text: "Hey! Thanks for exploring my Aura OS. 📱", sender: "ashwin", time: "Today 9:41 AM" },
    { id: 2, text: "I'm currently looking for SDE roles and freelance projects. How can I help you?", sender: "ashwin", time: "Today 9:41 AM" }
];

const SUGGESTED_REPLIES = [
    "I'd like to hire you! 💼",
    "Let's connect on LinkedIn 🔗",
    "Just saying hi! 👋"
];

export default function ContactApp() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        // Add user message
        const newUserMsg = { id: Date.now(), text, sender: "user", time: "Delivered" };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");

        // Simulate Ashwin typing back
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);

            let replyText = "Awesome! The best way to reach me is via email at ashwin2431333@gmail.com, call/WhatsApp at +91 9555681211, or DM me on LinkedIn. Let's build something great!";

            if (text.includes("hire")) {
                replyText = "That's great to hear! Let's schedule a call. Shoot me an email at ashwin2431333@gmail.com.";
            } else if (text.includes("LinkedIn") || text.includes("connect")) {
                replyText = "Here is my LinkedIn: linkedin.com/in/ashwinjauhary. Can't wait to connect!";
            } else if (text.includes("hi") || text.includes("Hello")) {
                replyText = "Hi there! 👋 Hope you're enjoying the Portfolio OS.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: replyText, sender: "ashwin", time: "Now" }]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-black font-sans tracking-tight pt-2">

            {/* iMessage Header */}
            <div className="flex flex-col items-center bg-black/80 backdrop-blur-xl border-b border-[#2c2c2e] pb-2 z-10 sticky top-0 px-2 pt-2">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center text-[#0a84ff] cursor-pointer w-20">
                        <ChevronLeft size={28} className="-ml-1" strokeWidth={2.5} />
                        <span className="text-[17px] font-medium -ml-1">Home</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden mb-1 flex items-center justify-center">
                            <img src="/avatar.png" alt="AJ" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-white text-[12px] font-semibold">Ashwin Jauhary</span>
                            <ChevronRight size={10} className="text-gray-400 opacity-50" />
                        </div>
                    </div>

                    <div className="flex justify-end w-20 pr-2">
                        <Info size={24} className="text-[#0a84ff]" />
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-32">
                <AnimatePresence>
                    {messages.map((msg, idx) => {
                        const isUser = msg.sender === "user";
                        const showTime = idx === 0 || msg.time !== messages[idx - 1].time;

                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="w-full flex flex-col"
                            >
                                {showTime && !isUser && (
                                    <span className="text-white/40 text-[11px] font-medium text-center mb-4 mt-2">{msg.time}</span>
                                )}

                                <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                        max-w-[75%] px-4 py-2 text-[16px] leading-[22px] tracking-tight
                                        ${isUser
                                            ? 'bg-[#0a84ff] text-white rounded-[20px] rounded-br-[4px]'
                                            : 'bg-[#26252a] text-white rounded-[20px] rounded-bl-[4px]'
                                        }
                                    `}>
                                        {msg.text}
                                    </div>
                                </div>

                                {isUser && msg.time === "Delivered" && idx === messages.length - 1 && !isTyping && (
                                    <span className="text-white/40 text-[11px] font-medium text-right mt-1 pr-1">Delivered</span>
                                )}
                            </motion.div>
                        );
                    })}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex justify-start mt-2"
                        >
                            <div className="bg-[#26252a] px-4 py-3 rounded-[20px] rounded-bl-[4px] flex gap-1.5 items-center">
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area (Pinned to bottom) */}
            <div className="absolute bottom-0 left-0 w-full bg-[#1c1c1ea0] backdrop-blur-2xl border-t border-[#2c2c2e] pt-3 pb-8 px-3">

                {/* Suggested Replies (Only show if user hasn't sent many messages) */}
                {messages.length < 5 && !isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2 overflow-x-auto no-scrollbar mb-3 px-1"
                    >
                        {SUGGESTED_REPLIES.map((reply, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(reply)}
                                className="whitespace-nowrap bg-white/10 hover:bg-white/20 active:scale-95 transition-all px-4 py-1.5 rounded-full border border-white/10 text-[14px] font-medium text-white/90 shrink-0"
                            >
                                {reply}
                            </button>
                        ))}
                    </motion.div>
                )}

                <div className="flex items-end gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center shrink-0 mb-1 cursor-pointer">
                        <Plus size={20} className="text-[#0a84ff]" />
                    </div>

                    <div className="flex-1 bg-[#1c1c1eb0] border border-white/20 rounded-[20px] flex items-center pr-1 pl-3 min-h-[40px]">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                            placeholder="iMessage"
                            className="flex-1 bg-transparent py-2 outline-none text-[16px] text-white placeholder:text-white/40"
                        />
                        {inputValue.trim() ? (
                            <div
                                onClick={() => handleSend(inputValue)}
                                className="w-7 h-7 rounded-full bg-[#0a84ff] flex items-center justify-center shrink-0 cursor-pointer"
                            >
                                <ArrowUp size={16} strokeWidth={3} className="text-white mt-px" />
                            </div>
                        ) : (
                            <div className="w-7 h-7 flex items-center justify-center shrink-0">
                                <Mic size={20} className="text-white/40" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
// Need a dummy ChevronRight to avoid import errors since I removed it from lucide imports initially but used it in the UI.
const ChevronRight = ({ ...props }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6" /></svg>
