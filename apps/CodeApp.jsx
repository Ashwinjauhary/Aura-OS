import React, { useState, useEffect } from 'react';
import { Play, Code2, Monitor, LayoutTemplate, RotateCcw } from 'lucide-react';

export default function CodeApp() {
    const [html, setHtml] = useState('<h1>Hello Ashwin!</h1>\n<p>Welcome to my custom OS Portfolio.</p>');
    const [css, setCss] = useState('h1 {\n  color: #3b82f6;\n  font-family: sans-serif;\n}\np {\n  color: #fff;\n  font-family: sans-serif;\n}');
    const [js, setJs] = useState('console.log("OS booting...");');
    const [activeTab, setActiveTab] = useState('html');
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head>
                        <style>${css}</style>
                    </head>
                    <body>
                        ${html}
                        <script>${js}</script>
                    </body>
                </html>
            `);
        }, 250); // debounce
        return () => clearTimeout(timeout);
    }, [html, css, js]);

    const resetCode = () => {
        setHtml('<h1>Hello Ashwin!</h1>\n<p>Welcome to my custom OS Portfolio.</p>');
        setCss('h1 {\n  color: #3b82f6;\n  font-family: sans-serif;\n}\np {\n  color: #fff;\n  font-family: sans-serif;\n}');
        setJs('console.log("OS booting...");');
    };

    return (
        <div className="h-full bg-[#1e1e1e] text-white flex flex-col pt-12">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-2 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                    <Code2 size={18} className="text-blue-400" />
                    <span className="font-semibold text-sm tracking-wide">Sandbox</span>
                </div>
                <button onClick={resetCode} className="p-2 text-white/50 hover:text-white transition-colors active:scale-95">
                    <RotateCcw size={16} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-[#252526] shrink-0">
                {['html', 'css', 'js'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-[13px] font-medium tracking-wider uppercase transition-colors ${activeTab === tab
                            ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5'
                            : 'text-white/50 hover:bg-white/5'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-hidden relative border-b border-white/10 bg-[#1e1e1e]">
                <textarea
                    value={activeTab === 'html' ? html : activeTab === 'css' ? css : js}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (activeTab === 'html') setHtml(val);
                        if (activeTab === 'css') setCss(val);
                        if (activeTab === 'js') setJs(val);
                    }}
                    spellCheck="false"
                    className="absolute inset-0 w-full h-full bg-transparent text-[#d4d4d4] font-mono text-[14px] p-4 outline-none resize-none leading-relaxed"
                />
            </div>

            {/* Live Preview Pane */}
            <div className="flex-1 bg-white flex flex-col relative shrink-0">
                <div className="absolute top-0 inset-x-0 h-8 bg-[#f3f3f3] border-b border-[#e5e5e5] flex items-center px-4 justify-between z-10">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Monitor size={14} />
                        <span className="text-[11px] font-semibold uppercase tracking-wider">Live Preview</span>
                    </div>
                </div>
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    className="w-full flex-1 pt-8 border-none bg-white"
                />
            </div>
        </div>
    );
}
