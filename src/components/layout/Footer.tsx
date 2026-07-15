import Link from "next/link";
import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16">
      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo + Copyright */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="flex items-center">
            <span className="text-xl font-black tracking-tighter flex items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <span className="text-white">HDMovie</span>
              <span className="bg-brand-primary text-obsidian px-1.5 py-0.5 rounded-md ml-0.5">Hub</span>
            </span>
          </div>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} HDMovieHub. All rights reserved.
          </p>
        </div>

        {/* Links + Credits */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-white/25 text-xs">

          <div className="flex items-center gap-2">
            <span>
              Developed by{" "}
              <a href="https://www.instagram.com/stayrahul" target="_blank" rel="noreferrer" className="text-brand-primary/60 hover:text-brand-primary transition-colors">
                Rahul
              </a>
            </span>
            <span className="text-white/15">•</span>
            <span>for Rabindra Kushwaha</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
