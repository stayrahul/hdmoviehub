"use client";

export default function AmbientGlow({ imageUrl }: { imageUrl: string | null }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] opacity-40 blur-[150px] mix-blend-screen bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,0.3)_0%,transparent_60%)]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[120%] h-[120%] opacity-30 blur-[120px] mix-blend-screen bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.3)_0%,transparent_60%)]" />
    </div>
  );
}
