"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, List, Server, Sparkles, Settings2 } from "lucide-react";
import { SeasonInfo } from "@/types";

interface MultiServerIframeProps {
  movieId: string;
  imdbId?: string;
  type?: "movie" | "tv";
  title?: string;
  seasons?: SeasonInfo[];
  releaseDate?: string;
}

const SERVERS = [
  { id: 'desistream', name: 'DesiStream (Auto Hindi)', getUrl: (type: string, id: string, s: number, e: number) => type === 'tv' ? `https://vidsrc.in/embed/tv/${id}/${s}/${e}` : `https://vidsrc.in/embed/movie/${id}` },
  { id: '2embed', name: '2Embed (Fast Backup)', getUrl: (type: string, id: string, s: number, e: number) => type === 'tv' ? `https://2embed.cc/embed/tv/${id}&s=${s}&e=${e}` : `https://2embed.cc/embed/${id}` },
  { id: 'autoembed', name: 'AutoEmbed (Early Drops)', getUrl: (type: string, id: string, s: number, e: number) => type === 'tv' ? `https://autoembed.co/tv/tmdb/${id}-${s}-${e}` : `https://autoembed.co/movie/tmdb/${id}` },
  { id: 'vidlink', name: 'VidLink (Multi-Audio VIP)', getUrl: (type: string, id: string, s: number, e: number) => type === 'tv' ? `https://vidlink.pro/tv/${id}/${s}/${e}?primaryColor=D4AF37&secondaryColor=B8860B&iconColor=ffffff&autoplay=false` : `https://vidlink.pro/movie/${id}?primaryColor=D4AF37&secondaryColor=B8860B&iconColor=ffffff&autoplay=false` },
  { id: 'superembed', name: 'SuperEmbed (Ultra Fast)', getUrl: (type: string, id: string, s: number, e: number) => type === 'tv' ? `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}` : `https://multiembed.mov/?video_id=${id}&tmdb=1` },
];

export default function MultiServerIframe({ movieId, imdbId, type = "movie", seasons, title }: MultiServerIframeProps) {
  const universalId = imdbId || movieId;
  
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [seasonDropdownOpen, setSeasonDropdownOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(SERVERS[0]);
  const [serverDropdownOpen, setServerDropdownOpen] = useState(false);
  const [showAudioGuide, setShowAudioGuide] = useState(true);

  const availableSeasons = (seasons || []).filter(s => s.season_number > 0);
  const currentSeasonData = availableSeasons.find(s => s.season_number === selectedSeason);
  const totalEpisodes = currentSeasonData?.episode_count || 1;

  const url = selectedServer.getUrl(type, universalId, selectedSeason, selectedEpisode);

  const goToEpisode = (ep: number) => {
    if (ep >= 1 && ep <= totalEpisodes) setSelectedEpisode(ep);
  };

  const goNextEpisode = () => {
    if (selectedEpisode < totalEpisodes) {
      setSelectedEpisode(selectedEpisode + 1);
    } else if (selectedSeason < availableSeasons.length) {
      setSelectedSeason(selectedSeason + 1);
      setSelectedEpisode(1);
    }
  };

  const goPrevEpisode = () => {
    if (selectedEpisode > 1) setSelectedEpisode(selectedEpisode - 1);
  };

  const changeSeason = (seasonNum: number) => {
    setSelectedSeason(seasonNum);
    setSelectedEpisode(1);
    setSeasonDropdownOpen(false);
  };

  return (
    <div className="w-full fade-in space-y-4">
      
      {/* Audio Guide Banner — Violet theme */}
      {showAudioGuide && (
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-brand-primary/[0.06] border border-brand-primary/15 shadow-lg rounded-xl p-4 transition-all">
          <div className="flex gap-3 items-start sm:items-center">
            <div className="bg-gradient-to-br from-brand-primary to-brand-accent p-2.5 rounded-lg shadow-[0_0_15px_rgba(129,140,248,0.25)]">
              <Settings2 className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm text-white/80 leading-relaxed">
              <strong className="text-brand-primary block sm:inline font-bold tracking-wide uppercase text-xs mb-1 sm:mb-0 sm:mr-2">How to find Hindi Audio</strong>
              <span className="block sm:inline mt-1 sm:mt-0">Click the <strong className="text-white">CC / Gear Icon</strong> inside the video player to switch tracks. Missing? Just try the next server!</span>
            </div>
          </div>
          <button 
            onClick={() => setShowAudioGuide(false)}
            className="text-white/40 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors self-end sm:self-auto"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Player Container */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#030712] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col">
        
        {/* Iframe Area */}
        <div className="relative w-full aspect-video z-10 bg-black">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 bg-gradient-to-b from-[#0f172a] to-[#030712]">
            <div className="relative w-16 h-16 flex items-center justify-center mb-4">
              <div className="absolute inset-0 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
              <Sparkles className="w-6 h-6 text-brand-primary/50 animate-pulse" />
            </div>
            <p className="text-brand-primary text-xs font-bold tracking-[0.2em] uppercase animate-pulse">Connecting</p>
          </div>
          
          <iframe
            key={`${selectedServer.id}-${universalId}-${selectedSeason}-${selectedEpisode}`}
            src={url}
            className="absolute inset-0 w-full h-full z-10 bg-black"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            title={title || "Video Player"}
          />
        </div>

        {/* Premium Control Bar */}
        <div className="w-full bg-[#0f172a]/90 backdrop-blur-2xl border-t border-white/5 p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-20">
          
          {/* Left: TV Controls */}
          {type === "tv" && availableSeasons.length > 0 ? (
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
              
              {/* Season Dropdown */}
              <div className="relative z-30 shrink-0">
                <button
                  onClick={() => {
                    setSeasonDropdownOpen(!seasonDropdownOpen);
                    setServerDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-semibold transition-all"
                >
                  <List className="w-4 h-4 text-brand-primary" />
                  Season {selectedSeason}
                  <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${seasonDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {seasonDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setSeasonDropdownOpen(false)} />
                    <div className="absolute bottom-full left-0 mb-2 z-30 w-48 max-h-60 overflow-y-auto bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] p-1.5 custom-scrollbar">
                      {availableSeasons.map((season) => (
                        <button
                          key={season.season_number}
                          onClick={() => changeSeason(season.season_number)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${
                            selectedSeason === season.season_number
                              ? 'bg-gradient-to-r from-brand-primary/20 to-transparent text-brand-primary font-bold'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>Season {season.season_number}</span>
                          <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white/40">{season.episode_count}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Prev/Next Nav */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 shrink-0">
                <button
                  onClick={goPrevEpisode}
                  disabled={selectedEpisode <= 1}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-3 py-1 flex flex-col items-center justify-center min-w-[70px]">
                  <span className="text-[9px] text-white/40 font-medium uppercase tracking-wider">Episode</span>
                  <span className="text-sm font-bold text-white leading-none">{selectedEpisode}</span>
                </div>
                <button
                  onClick={goNextEpisode}
                  disabled={selectedEpisode >= totalEpisodes && selectedSeason >= availableSeasons.length}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3 text-white/40 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-brand-primary/50" />
              Enjoy the movie!
            </div>
          )}

          {/* Right: Server Switcher */}
          <div className="w-full md:w-auto relative z-30">
            <button 
              onClick={() => {
                setServerDropdownOpen(!serverDropdownOpen);
                setSeasonDropdownOpen(false);
              }}
              className="w-full md:w-auto flex items-center justify-between gap-3 bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 hover:from-brand-primary/20 hover:to-brand-primary/10 border border-brand-primary/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(129,140,248,0.05)]"
            >
              <div className="flex items-center gap-2">
                <Server size={16} className="text-brand-primary" />
                <span className="text-white/50 hidden md:inline">Server:</span>
                <span className="font-bold text-white drop-shadow-sm">{selectedServer.name}</span>
              </div>
              <ChevronDown size={14} className={`text-brand-primary transition-transform duration-300 ${serverDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {serverDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setServerDropdownOpen(false)} />
                <div className="absolute bottom-full right-0 mb-2 z-30 w-full md:w-64 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] p-1.5 flex flex-col">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <p className="text-[10px] uppercase tracking-wider text-brand-primary font-bold">Select Database</p>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    {SERVERS.map((server) => (
                      <button
                        key={server.id}
                        onClick={() => {
                          setSelectedServer(server);
                          setServerDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                          selectedServer.id === server.id
                            ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold shadow-[0_0_10px_rgba(129,140,248,0.3)]'
                            : 'text-white/70 hover:bg-white/10 hover:text-white font-medium'
                        }`}
                      >
                        <span>{server.name}</span>
                        {selectedServer.id === server.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Episode Grid */}
      {type === "tv" && availableSeasons.length > 0 && (
        <div className="pt-2">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
            {Array.from({ length: totalEpisodes }, (_, i) => i + 1).map((ep) => (
              <button
                key={ep}
                onClick={() => goToEpisode(ep)}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedEpisode === ep
                    ? 'bg-gradient-to-b from-brand-primary to-brand-accent text-white shadow-[0_0_20px_rgba(129,140,248,0.4)] scale-105 z-10 relative'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5 hover:border-brand-primary/20'
                }`}
              >
                {ep}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
