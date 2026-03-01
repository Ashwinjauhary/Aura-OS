import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatApp() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am Ashwin's AI Assistant. Ask me anything about his skills, experience, or projects.", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text) => {
        const userMsg = text || input.trim();
        if (!userMsg) return;

        const newUserMsg = { id: Date.now(), text: userMsg, isBot: false };
        const updatedMessages = [...messages, newUserMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        const SAMBANOVA_API_KEY = "78faf273-402d-4eb7-ba2c-1773826a2ba2";

        const apiMessages = updatedMessages.map(msg => ({
            role: msg.isBot ? "assistant" : "user",
            content: msg.text
        }));

        apiMessages.unshift({
            role: "system",
            content: "You are the virtual assistant for Ashwin Jauhary's Aura OS. Ashwin Jauhary is a highly skilled Full-Stack Developer, Frontend Architect, and UI/UX enthusiast. He is a BCA Student specializing in React.js, Next.js, Node.js, and building complex, interactive interfaces like this web-based Operating System. His top projects include ClubSphere (College Club Platform), SolarFlow Viz (3D), Studify-OS, and TaskFlow. If anyone asks 'who is Ashwin Jauhary', confirm confidently that he is the creator of this portfolio, a Full-Stack MERN developer, and you are his assistant. Keep your answers professional, direct, yet energetic. For contact, direct them to ashwin2431333@gmail.com or his LinkedIn."
        });

        try {
            const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${SAMBANOVA_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    stream: false,
                    model: "Meta-Llama-3.1-8B-Instruct",
                    messages: apiMessages
                })
            });

            if (!response.ok) throw new Error("API Error");

            const data = await response.json();
            const botReply = data.choices[0].message.content;

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Network error. Please try again or contact Ashwin directly.", isBot: true }]);
        } finally {
            setIsTyping(false);
        }
    };

    const chips = ['What are your skills?', 'Tell me about your experience', 'How to contact you?'];

    return (
        <div className="w-full h-full bg-[#0a0a0c] text-white overflow-hidden relative z-50" style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto auto' }}>

            {/* 1. Header Area */}
            <div className="pt-12 pb-4 px-6 bg-gradient-to-b from-black/80 to-transparent z-10 backdrop-blur-md border-b border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] relative">
                    <Sparkles className="text-white relative z-10" size={24} />
                    <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm pointer-events-none" />
                </div>
                <div>
                    <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Ashwin AI</h2>
                    <div className="flex items-center gap-1.5 opacity-70">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[11px] font-medium tracking-wide">SYSTEM ONLINE</span>
                    </div>
                </div>
            </div>

            {/* 2. Messages Area */}
            <div ref={scrollContainerRef} className="overflow-y-auto px-4 py-6 scroll-smooth flex flex-col gap-5">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                            <div className={`max-w-[85%] p-4 rounded-3xl text-[15px] leading-relaxed relative ${msg.isBot
                                ? 'bg-[#1a1a24] text-gray-100 rounded-tl-sm border border-white/5 shadow-lg'
                                : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm shadow-[0_5px_15px_rgba(99,102,241,0.3)]'
                                }`}>
                                {msg.isBot ? (
                                    <div className="prose prose-invert max-w-none prose-p:leading-snug prose-li:my-0.5 mt-[-0.3rem] mb-[-0.3rem]">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1" {...props} />,
                                                li: ({ node, ...props }) => <li className="" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
                                                a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="bg-[#1a1a24] border border-white/5 shadow-lg p-4 rounded-3xl rounded-tl-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}
                {/* A spacer for extra bottom padding */}
                <div className="h-4" />
            </div>

            {/* 3. Chips Area */}
            <div className="px-4 py-3 flex gap-3 overflow-x-auto scrollbar-hide bg-gradient-to-t from-black via-[#0a0a0c] to-transparent">
                {chips.map((chip, i) => (
                    <button
                        key={i}
                        onClick={() => handleSend(chip)}
                        className="snap-start whitespace-nowrap px-4 py-2.5 bg-[#1a1a24] text-gray-300 hover:text-white border border-white/10 hover:border-indigo-500/50 rounded-2xl text-[13px] font-medium active:scale-95 transition-all shadow-md"
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {/* 4. Input Area */}
            <div className="p-4 bg-black border-t border-white/5 relative z-20">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask Ashwin AI..."
                        className="w-full bg-[#1a1a24] border border-white/10 focus:border-indigo-500/50 rounded-full pl-5 pr-14 py-3.5 text-[15px] text-white outline-none placeholder:text-gray-500 transition-colors shadow-inner"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-1.5 w-10 h-10 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full flex items-center justify-center shadow-md disabled:opacity-40 disabled:hover:bg-indigo-500 active:scale-90 transition-all"
                    >
                        <Send size={18} className="-ml-0.5" />
                    </button>
                </div>
            </div>

        </div>
    );
}
