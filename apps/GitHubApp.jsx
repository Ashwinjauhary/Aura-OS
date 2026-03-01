import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Star, MapPin, Link as LinkIcon, Box, Users, BookOpen } from 'lucide-react';

export default function GitHubApp() {
    const [profile, setProfile] = useState({
        name: 'Ashwin Jauhary',
        bio: 'Building scalable products • 2nd Yr BCA @ PSIT • Full-Stack Developer',
        followers: 45,
        following: 12,
        location: 'Kanpur, India',
        blog: 'ashwin.dev'
    });
    const [repos, setRepos] = useState([
        {
            name: 'clubsphere-hq',
            description: 'Role-based platform for college clubs with AI-powered reporting and events.',
            language: 'TypeScript',
            stargazers_count: 24,
            forks_count: 8,
            visibility: 'public',
            html_url: '#'
        },
        {
            name: 'solarflow-viz',
            description: 'Interactive 3D visualization for solar workflows using Three.js and Fiber.',
            language: 'JavaScript',
            stargazers_count: 12,
            forks_count: 0,
            visibility: 'public',
            html_url: '#'
        }
    ]);

    useEffect(() => {
        // Fetch User Profile
        fetch('https://api.github.com/users/ashwinjauhary')
            .then(res => res.json())
            .then(data => {
                if (data.name) {
                    setProfile(prev => ({
                        name: data.name,
                        bio: data.bio || prev.bio,
                        followers: data.followers,
                        following: data.following,
                        location: data.location || prev.location,
                        blog: data.blog || prev.blog
                    }));
                }
            })
            .catch(err => console.error("Error fetching GH profile", err));

        // Fetch Repos
        fetch('https://api.github.com/users/ashwinjauhary/repos?sort=updated&per_page=3')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setRepos(data);
                }
            })
            .catch(err => console.error("Error fetching GH repos", err));
    }, []);

    return (
        <div className="min-h-full font-sans tracking-tight bg-[#0d1117] text-[#c9d1d9] pb-20">
            {/* Header */}
            <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-[#30363d]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5">
                        <img src="https://github.com/fluidicon.png" alt="GitHub" className="w-full h-full rounded-full" />
                    </div>
                    <span className="font-semibold text-[16px] text-white">ashwinjauhary</span>
                </div>
            </div>

            {/* Profile Info */}
            <div className="p-4 border-b border-[#30363d]">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-[86px] h-[86px] rounded-full border border-[#30363d] overflow-hidden flex items-center justify-center bg-[#0d1117] shrink-0">
                        <img src="/avatar.png" alt={profile.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-[24px] font-bold leading-none text-white mb-1">{profile.name}</h1>
                        <h2 className="text-[20px] font-light text-[#8b949e] leading-none mb-2">ashwinjauhary</h2>
                    </div>
                </div>

                <p className="text-[15px] text-white leading-snug mb-4">
                    {profile.bio}
                </p>

                <div className="flex items-center gap-4 text-[14px] text-[#8b949e] mb-4">
                    <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                        <Users size={16} />
                        <span className="font-semibold text-white">{profile.followers}</span> followers
                    </div>
                    <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                        <span className="font-semibold text-white">{profile.following}</span> following
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 text-[14px] text-[#8b949e] mb-5">
                    {profile.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{profile.location}</span>
                        </div>
                    )}
                    {profile.blog && (
                        <div className="flex items-center gap-2">
                            <LinkIcon size={16} />
                            <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline font-semibold">
                                {profile.blog.replace(/^https?:\/\//, '')}
                            </a>
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <button className="flex-1 bg-[#21262d] hover:bg-[#30363d] active:scale-95 transition-all text-[#c9d1d9] border border-[#30363d] font-semibold rounded-md py-1.5 flex justify-center items-center text-[14px]">
                        Follow
                    </button>
                    <button className="flex-1 bg-[#21262d] hover:bg-[#30363d] active:scale-95 transition-all text-[#c9d1d9] border border-[#30363d] font-semibold rounded-md py-1.5 flex justify-center items-center text-[14px] gap-2">
                        <Box size={16} /> Optional
                    </button>
                </div>
            </div>

            {/* Repositories */}
            <div className="p-4">
                <h3 className="text-[16px] font-semibold text-white mb-3">Recent Repositories</h3>

                <div className="grid grid-cols-1 gap-3">
                    {repos.map(repo => (
                        <div key={repo.id || repo.name} className="border border-[#30363d] rounded-md p-4 bg-[#0d1117]">
                            <div className="flex justify-between items-start mb-2">
                                <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-[#58a6ff] text-[15px] hover:underline flex items-center gap-2 break-all">
                                    <BookOpen size={16} className="text-[#8b949e]" />
                                    {repo.name}
                                </a>
                                <span className="text-[12px] text-[#8b949e] border border-[#30363d] rounded-full px-2 py-0.5 capitalize">{repo.visibility || 'public'}</span>
                            </div>
                            <p className="text-[13px] text-[#8b949e] mb-4 leading-snug line-clamp-2">
                                {repo.description || 'No description provided.'}
                            </p>
                            <div className="flex items-center gap-4 text-[12px] text-[#8b949e]">
                                {repo.language && (
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-3 h-3 rounded-full ${repo.language === 'JavaScript' ? 'bg-[#f1e05a]' : repo.language === 'TypeScript' ? 'bg-[#3178c6]' : repo.language === 'HTML' ? 'bg-[#e34c26]' : repo.language === 'CSS' ? 'bg-[#563d7c]' : 'bg-gray-400'}`} />
                                        <span>{repo.language}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                                    <Star size={14} /> {repo.stargazers_count}
                                </div>
                                {repo.forks_count > 0 && (
                                    <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                                        <GitFork size={14} /> {repo.forks_count}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Direct Link Banner */}
            <a href="https://github.com/ashwinjauhary" target="_blank" rel="noreferrer" className="mt-4 block bg-[#161b22] p-4 border-t border-[#30363d] border-b flex items-center justify-center active:bg-[#21262d] transition-colors">
                <span className="font-semibold text-[15px] text-[#58a6ff]">View Full GitHub Profile</span>
            </a>

        </div>
    );
}
