"use client";

import { Sparkles, PlayCircle, Settings2, Globe2 } from "lucide-react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

export default function CustomPlayer({ movieId, imdbId, type = "movie" }: { movieId: string, imdbId?: string, type?: "movie" | "tv" }) {
  // Test stream for demonstration (Tears of Steel 4K HLS)
  // In the future, you would replace this with a call to your own .m3u8 backend API
  const TEST_STREAM = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 fade-in">
      
      {/* Premium Vidstack Player Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,242,254,0.15)] border border-white/10 bg-[#0a0a0a] group">
        <MediaPlayer 
          title="Tears of Steel (Demonstration)" 
          src={TEST_STREAM}
          className="w-full h-full text-brand-primary"
          crossOrigin
          playsInline
        >
          <MediaProvider />
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      </div>

      {/* Premium Server Controls */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col xl:flex-row gap-8 items-start xl:items-center">
        
        {/* Info Section */}
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Premium Native Player
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings2 className="w-6 h-6 text-brand-secondary" />
            Developer Mode Active
          </h3>
          <p className="text-silver/80 text-sm leading-relaxed max-w-xl">
            You are now using the <strong className="text-white">Vidstack Premium Native Player</strong>. This player has every feature built-in (subtitles, audio tracks, chapters, PiP, AirPlay). 
            Because we removed the iframe servers, <strong className="text-brand-primary">you are currently watching a test stream.</strong> To play real movies, you must connect a backend API that returns a valid <code>.m3u8</code> stream!
          </p>
        </div>

        {/* Server Grid (Mocked for now since iframe is gone) */}
        <div className="w-full xl:w-auto grid grid-cols-2 md:grid-cols-2 gap-3 shrink-0">
            <button
              className="group relative flex flex-col items-start px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-brand-primary shadow-[0_0_20px_rgba(0,242,254,0.2)]"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary shadow-[0_0_10px_rgba(0,242,254,1)]" />
              <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                <PlayCircle className="w-4 h-4 text-brand-primary animate-pulse" />
                Native Stream
              </div>
              <span className="text-[11px] font-medium tracking-wide text-brand-primary">
                Tears of Steel (Test)
              </span>
            </button>
            <button
              className="group relative flex flex-col items-start px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 opacity-50 cursor-not-allowed"
            >
              <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                <Globe2 className="w-4 h-4 text-silver group-hover:text-white transition-colors" />
                Custom API
              </div>
              <span className="text-[11px] font-medium tracking-wide text-silver/60">
                Awaiting connection...
              </span>
            </button>
        </div>

      </div>
    </div>
  );
}
