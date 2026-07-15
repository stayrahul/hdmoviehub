export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#030712]/80 backdrop-blur-md flex flex-col items-center justify-center fade-in">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white/5 shadow-[0_0_50px_rgba(129,140,248,0.2)]"></div>
        {/* Inner spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-brand-primary/20 border-t-brand-primary border-r-brand-accent animate-spin"></div>
        {/* Core pulsing dot */}
        <div className="w-4 h-4 rounded-full bg-white animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-sm font-bold tracking-[0.3em] uppercase text-brand-primary animate-pulse">AuraStream</span>
        <span className="text-xs text-white/40 tracking-wider">Connecting to servers...</span>
      </div>
    </div>
  );
}
