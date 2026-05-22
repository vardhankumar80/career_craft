"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";

const HeroSection = () => {
  return (
    // Reduced pt-44 to pt-32 to close the gap with the floating header
    <section className="relative w-full pt-32 md:pt-40 pb-24 overflow-hidden bg-[#fcfcfc] antialiased">
      
      {/* High-Resolution Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Subtle Motion Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 animate-pulse duration-[4000ms]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Animation added to the container */}
          <div className="lg:col-span-8 space-y-10 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
            <div className="flex items-center gap-4 text-indigo-700 font-mono text-[10px] tracking-[0.5em] uppercase font-black">
              <Plus className="h-3 w-3 animate-spin duration-[3000ms]" /> System Initialization
            </div>

            <h1 className="text-7xl md:text-9xl font-light tracking-tighter leading-[0.85] text-black">
              Success is not <br />
              {/* Increased visibility: Changed zinc-300 to zinc-400 for better contrast */}
              <span className="font-serif italic text-zinc-400 hover:text-indigo-600 transition-colors duration-700 cursor-default">a destiny.</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="px-12 h-16 bg-black text-white rounded-none hover:bg-indigo-600 transition-all duration-500 text-[11px] font-black uppercase tracking-[0.2em] italic shadow-2xl shadow-black/10 active:scale-95"
                >
                  Start Sequence <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

            </div>
          </div>

          {/* Right Column: High Visibility Stats */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-12 lg:pt-20 lg:pl-12 border-l border-black/[0.06] animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 ease-out">
            {/* Visibility Fix: Changed zinc-500 to zinc-700 */}
            <p className="text-zinc-700 text-lg md:text-xl leading-relaxed font-light italic mb-12">
              "Deconstructing professional growth through <span className="text-black font-medium underline underline-offset-8 decoration-indigo-500/30">neural architecture</span> and high-fidelity intelligence."
            </p>

            <div className="space-y-10">
              {[
                { val: "98%", label: "Placement Index" },
                { val: "12k+", label: "Neural Audits" },
                { val: "24/7", label: "Smart Node" },
              ].map((stat, i) => (
                <div key={i} className="group cursor-default border-b border-black/[0.03] pb-4 last:border-0 transition-colors hover:border-indigo-500/20">
                  <p className="text-4xl font-light text-black tracking-tighter group-hover:text-indigo-600 transition-all duration-500 group-hover:translate-x-1">
                    {stat.val}
                  </p>
                  {/* Visibility Fix: Bolded label with higher contrast */}
                  <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* High-Resolution Bottom Marker */}
        <div className="mt-24 pt-8 border-t border-black/[0.06] flex justify-between items-center text-[10px] font-mono text-zinc-500 tracking-[0.4em] uppercase font-bold">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Career_Craft // OS_V1
          </span>
          <span className="hidden md:block italic text-zinc-400">Structured for the Elite Professional</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;