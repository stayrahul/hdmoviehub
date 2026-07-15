"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Home, Clapperboard, MonitorPlay, Bookmark, Menu, X, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import GlobalSearch from "./GlobalSearch";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Movies", href: "/movies", icon: Clapperboard },
    { name: "Series", href: "/series", icon: MonitorPlay },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-obsidian/80 backdrop-blur-2xl border-b border-brand-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3' : 'bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center shrink-0 group">
              <span className="text-2xl md:text-3xl font-black tracking-tighter flex items-center drop-shadow-md">
                <span className="text-white">HDMovie</span>
                <span className="bg-brand-primary text-obsidian px-2 py-0.5 rounded-lg ml-0.5 transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]">Hub</span>
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link key={item.name} href={item.href}>
                    <div className={`text-sm font-semibold tracking-wide transition-all duration-200 relative group ${
                      isActive ? 'text-brand-primary' : 'text-white/60 hover:text-white'
                    }`}>
                      {item.name}
                      {isActive && (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,1)]" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-white/70 hover:text-brand-primary transition-all rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs font-semibold hidden md:inline">Search</span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Sleek Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 w-full border-t border-white/5 bg-obsidian/95 backdrop-blur-3xl shadow-2xl"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                        isActive ? 'bg-brand-primary/10 text-brand-primary' : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-brand-primary' : ''}`} />
                        <span className="font-bold tracking-wide">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
