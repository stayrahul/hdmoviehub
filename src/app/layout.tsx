import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HDMovieHub | The Ultimate Streaming Destination",
  description: "Watch the latest Bollywood blockbusters and early movie releases in HD on HDMovieHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${outfit.className} bg-obsidian text-white antialiased selection:bg-brand-primary/20 selection:text-white min-h-screen bg-noise`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
