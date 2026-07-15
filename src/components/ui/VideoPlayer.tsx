"use client";

import { useState } from "react";
import { Info, Server, Sparkles } from "lucide-react";

export default function VideoPlayer({ movieId, type = "movie" }: { movieId: string, type?: "movie" | "tv" }) {
  // To guarantee zero errors and Hindi audio, multiple servers are required as fallbacks.
  const SERVERS = [
    { 
      id: 'vidlink', 
      name: 'Aurora Native Player', 
      description: 'Custom UI / High Multi-Audio',
      url: type === "tv" 
        ? `https://vidlink.pro/tv/${movieId}/1/1?primaryColor=00f2fe&secondaryColor=f093fb&iconColor=ffffff` 
        : `https://vidlink.pro/movie/${movieId}?primaryColor=00f2fe&secondaryColor=f093fb&iconColor=ffffff` 
    },
    { 
      id: 'super', 
      name: 'Backup Server 1 (Auto)', 
      description: 'Best for Multi-Audio / Hindi',
      url: type === "tv" ? `https://multiembed.mov/?video_id=${movieId}&tmdb=1&s=1&e=1` : `https://multiembed.mov/?video_id=${movieId}&tmdb=1` 
    },
    { 
      id: 'vidsrc', 
      name: 'Backup Server 2 (Eng)', 
      description: 'High Speed English',
      url: type === "tv" ? `https://vidsrc.to/embed/tv/${movieId}` : `https://vidsrc.to/embed/movie/${movieId}` 
    },
    { 
      id: 'embedsu', 
      name: 'Backup Server 3 (HD)', 
      description: 'Alternative HD',
      url: type === "tv" ? `https://embed.su/embed/tv/${movieId}/1/1` : `https://embed.su/embed/movie/${movieId}` 
    }
  ];

  const [activeServer, setActiveServer] = useState(SERVERS[0]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel shadow-[0_0_40px_rgba(0,242,254,0.2)] border border-brand-primary/20">
        <iframe
          src={activeServer.url}
          className="absolute inset-0 w-full h-full bg-black"
          allowFullScreen
        />
      </div>

      <div className="glass-panel rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-brand-secondary/20">
        <div className="flex items-start gap-4 max-w-lg">
          <div className="p-3 rounded-full bg-brand-primary/10 text-brand-primary shrink-0 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-lg">Smart Streaming Hub</span>
            <span className="text-sm text-silver mt-1 leading-relaxed">
              If the default player shows an error or lacks the Hindi audio track, instantly switch to a Backup Server below. Use the CC/Settings icon inside the video to select your language.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {SERVERS.map((server) => (
            <button
              key={server.id}
              onClick={() => setActiveServer(server)}
              className={`flex flex-col items-start px-4 py-3 rounded-xl transition-all duration-300 ${
                activeServer.id === server.id
                  ? "bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border border-brand-primary text-white shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-105"
                  : "bg-white/5 border border-white/10 text-silver hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Server className="w-4 h-4" />
                {server.name}
              </div>
              <span className={`text-xs mt-1 ${activeServer.id === server.id ? "text-brand-primary" : "text-silver/70"}`}>
                {server.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
