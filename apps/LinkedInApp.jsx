import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Briefcase, GraduationCap, MapPin, Link as LinkIcon } from 'lucide-react';

export default function LinkedInApp() {
    return (
        <div className="min-h-full font-sans tracking-tight bg-[#f3f2ef] text-black pb-20">
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-sm bg-[#0a66c2] flex items-center justify-center text-white font-bold text-[18px]">
                        in
                    </div>
                    <span className="font-semibold text-[15px]">Ashwin Jauhary</span>
                </div>
            </div>

            {/* Profile Banner */}
            <div className="h-[120px] w-full bg-gradient-to-r from-[#0a66c2]/80 to-[#004182] relative">
                <div className="absolute -bottom-12 left-4 w-[110px] h-[110px] rounded-full border-[4px] border-white bg-white overflow-hidden shadow-sm flex items-center justify-center">
                    <img src="/avatar.png" alt="Ashwin Jauhary" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Profile Info */}
            <div className="bg-white pt-14 px-4 pb-4 mb-2">
                <h1 className="text-[24px] font-bold leading-none mb-1">Ashwin Jauhary</h1>
                <p className="text-[15px] text-gray-800 leading-tight mb-2">
                    BCA Student | Full Stack Developer | React, Node.js, PostgreSQL | Scalable Software and AI Powered Applications
                </p>
                <div className="flex items-center gap-1 text-[13px] text-gray-500 mb-3">
                    <MapPin size={12} />
                    <span>Kanpur, Uttar Pradesh, India</span>
                    <span className="ml-1 text-[#0a66c2] font-semibold cursor-pointer">Contact info</span>
                </div>

                {/* Connections */}
                <p className="text-[14px] text-[#0a66c2] font-semibold mb-4">500+ connections</p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <a href="https://linkedin.com/in/ashwin-jauhary" target="_blank" rel="noreferrer" className="flex-1 bg-[#0a66c2] hover:bg-[#004182] active:scale-95 transition-all text-white font-semibold rounded-full py-2 flex justify-center items-center text-[15px]">
                        Connect
                    </a>
                    <a href="https://linkedin.com/in/ashwin-jauhary" target="_blank" rel="noreferrer" className="flex-1 bg-white border border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50 active:scale-95 transition-all font-semibold rounded-full py-2 flex justify-center items-center text-[15px]">
                        Message
                    </a>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white p-4 mb-2">
                <h2 className="text-[18px] font-bold mb-2">About</h2>
                <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                    Hi, I’m Ashwin Jauhary, a BCA student focused on building real, production-ready software through hands-on projects.
                    I work as a full stack developer with a strong focus on React-based applications. I have built multiple real-world projects involving frontend architecture, backend APIs, authentication flows, database integration, and deployment.
                    <br /><br />
                    𝐓𝐄𝐂𝐇 𝐒𝐓𝐀𝐂𝐊 & 𝐋𝐀𝐍𝐆𝐔𝐀𝐆𝐄𝐒<br />
                    ▪ 𝐋𝐚𝐧𝐠𝐮𝐚𝐠𝐞𝐬: JavaScript (ES6+), Python, C, C++, HTML, CSS<br />
                    ▪ 𝐅𝐫𝐨𝐧𝐭𝐞𝐧𝐝: React.js, Next.js (basic), Tailwind CSS, Bootstrap, Framer Motion<br />
                    ▪ 𝐁𝐚𝐜𝐤𝐞𝐧𝐝: Node.js, Express.js, REST APIs, JWT Authentication<br />
                    ▪ 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞𝐬 & 𝐒𝐞𝐫𝐯𝐢𝐜𝐞𝐬: PostgreSQL, Supabase, Appwrite<br />
                    ▪ 𝐀𝐈 & 𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐨𝐧: Google Gemini API, Prompt Engineering, AI-powered tools
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white p-4 mb-2">
                <h2 className="text-[18px] font-bold mb-4">Experience</h2>

                <div className="flex gap-3 mb-5">
                    <div className="w-12 h-12 shrink-0 bg-gray-100 flex items-center justify-center">
                        <Briefcase size={24} className="text-gray-400" />
                    </div>
                    <div>
                        <h3 className="text-[16px] font-bold leading-tight">President</h3>
                        <p className="text-[14px] text-gray-800">Codester Club - The Coding Club</p>
                        <p className="text-[13px] text-gray-500 mb-1">Jan 2026 - Present</p>
                        <p className="text-[14px] text-gray-700">Team Leadership</p>
                    </div>
                </div>

                <div className="flex gap-3 mb-5">
                    <div className="w-12 h-12 shrink-0 bg-gray-100 flex items-center justify-center">
                        <Briefcase size={24} className="text-gray-400" />
                    </div>
                    <div>
                        <h3 className="text-[16px] font-bold leading-tight">Sales Captain</h3>
                        <p className="text-[14px] text-gray-800">Posterwa · Internship</p>
                        <p className="text-[13px] text-gray-500 mb-1">Oct 2025 - Present</p>
                        <p className="text-[14px] text-gray-700">Worked on sales funnels, communication & user acquisition. Improved client onboarding process.</p>
                    </div>
                </div>

                <div className="flex gap-3 mb-2">
                    <div className="w-12 h-12 shrink-0 bg-gray-100 flex items-center justify-center">
                        <Briefcase size={24} className="text-gray-400" />
                    </div>
                    <div>
                        <h3 className="text-[16px] font-bold leading-tight">Managing Director</h3>
                        <p className="text-[14px] text-gray-800">Catalyst Crew · Self-employed</p>
                        <p className="text-[13px] text-gray-500 mb-1">Jun 2025 - Present</p>
                        <p className="text-[14px] text-gray-700">Led full-stack development of multiple web products. Managed small dev team & project delivery.</p>
                    </div>
                </div>
            </div>

            {/* Education Section */}
            <div className="bg-white p-4 mb-10">
                <h2 className="text-[18px] font-bold mb-4">Education</h2>

                <div className="flex gap-3">
                    <div className="w-12 h-12 shrink-0 bg-gray-100 flex items-center justify-center">
                        <GraduationCap size={24} className="text-gray-400" />
                    </div>
                    <div>
                        <h3 className="text-[16px] font-bold leading-tight">PSIT College of Higher Education</h3>
                        <p className="text-[14px] text-gray-800">Bachelor of Computer Applications (BCA)</p>
                        <p className="text-[13px] text-gray-500">Aug 2024 - Aug 2027</p>
                        <p className="text-[14px] text-gray-700 mt-1">Activities and societies: President @CodesterClub</p>
                    </div>
                </div>
            </div>

            <a href="https://www.linkedin.com/in/ashwin-jauhary" target="_blank" rel="noreferrer" className="block bg-white p-4 border-t border-gray-200 flex items-center justify-between active:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <LinkIcon size={16} className="text-[#0a66c2]" />
                    </div>
                    <span className="font-semibold text-[15px] text-[#0a66c2]">Open in LinkedIn App</span>
                </div>
                <ArrowUpRight size={20} className="text-gray-400" />
            </a>

        </div>
    );
}
