"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <div className="relative bg-[#fcfcfc] text-zinc-950 selection:bg-indigo-600/10 selection:text-indigo-900 font-sans antialiased overflow-x-hidden">
      {/* Motion-enabled Hero */}
      <div className="animate-reveal">
        <HeroSection />
      </div>

      {/* 1. FEATURES: Editorial Grid */}
      <section className="py-40 border-t border-black/[0.08]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 animate-reveal stagger-1">
            <div className="max-w-3xl space-y-8">
              <div className="flex items-center gap-3 text-indigo-700 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
                <Plus className="h-3 w-3" /> System Architecture
              </div>
              <h2 className="text-7xl md:text-9xl font-light tracking-tighter text-black leading-[0.85]">
                Engineered for <br />
                <span className="italic font-serif text-zinc-400">Distinction.</span>
              </h2>
            </div>
            {/* Visibility Fix: Changed zinc-400 to zinc-600 for better contrast */}
            <p className="text-zinc-600 max-w-[320px] text-lg font-light leading-relaxed italic border-l-2 border-indigo-600/20 pl-8">
              Synchronizing high-fidelity AI modeling with elite professional trajectories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-200 border border-zinc-200 overflow-hidden shadow-2xl shadow-black/[0.03]">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white p-16 transition-all duration-700 hover:bg-[#fafafa] animate-reveal stagger-${(index % 3) + 1}
                  ${index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5"}`}
              >
                <div className="relative z-10 h-full flex flex-col justify-between gap-24">
                  <div className="space-y-10">
                    <div className="text-black group-hover:text-indigo-600 transition-transform duration-500 group-hover:-translate-y-1 w-fit">
                      {React.cloneElement(feature.icon, { strokeWidth: 1.2, size: 42 })}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-medium text-black tracking-tight italic">
                        {feature.title}
                      </h3>
                      {/* Visibility Fix: Switched to zinc-700 for body readability */}
                      <p className="text-zinc-700 text-sm leading-relaxed max-w-xs font-normal">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                    <span>SPEC_MOD_{index + 101}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS: High Visibility Technical Split */}
      <section className="py-32 border-y border-black/[0.08] bg-white animate-reveal">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { val: "50+", label: "Target Sectors" },
              { val: "1000+", label: "Neural Iterations" },
              { val: "98%", label: "Success Index" },
              { val: "24/7", label: "Autonomous Node" },
            ].map((stat, i) => (
              <div key={i} className="space-y-4 border-l-2 border-black/[0.08] pl-10 group cursor-default hover:border-indigo-600 transition-colors duration-500">
                <h3 className="text-6xl font-light tracking-tighter text-black group-hover:text-indigo-600 transition-colors duration-500">{stat.val}</h3>
                {/* Visibility Fix: Bolded labels */}
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-black">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA: Motion-Focused Finale */}
      <section className="py-60 container mx-auto px-6 text-center animate-reveal">
        <div className="max-w-5xl mx-auto space-y-16">
          <h2 className="text-7xl md:text-9xl font-light tracking-tighter text-black leading-[0.85]">
            Redefine your <br />
            <span className="italic font-serif text-indigo-600">Trajectory.</span>
          </h2>
          
          <div className="pt-12 opacity-40">
            <span className="font-mono text-[10px] text-zinc-900 uppercase tracking-[0.5em] font-bold">Established MMXXVI // All Systems Operational</span>
          </div>
        </div>
      </section>
    </div>
  );
}