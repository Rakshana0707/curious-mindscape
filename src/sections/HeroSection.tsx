import React from 'react';
import { ArrowDown, Compass, Code, Cpu, Database, Server, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { AudioAtmosphere } from '../components/AudioAtmosphere';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-mindscape-grid">
      {/* Background ambient lighting */}
      <div className="glow-orb top-10 left-1/4 w-[500px] h-[500px] bg-electric-lime" />
      <div className="glow-orb bottom-10 right-1/4 w-[500px] h-[500px] bg-ice-blue" />
      <div className="glow-orb top-1/2 left-2/3 w-[400px] h-[400px] bg-accent-amber" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        {/* Top Annotation Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite/80 border border-white/10 backdrop-blur-md mb-8 animate-fade-in shadow-sm">
          <span className="w-2 h-2 rounded-full bg-electric-lime" />
          <span className="font-mono text-xs text-text-muted">
            {portfolioData.personal.institution} · Integrated MSc Software Systems
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-grotesk font-bold text-4xl sm:text-6xl xl:text-6xl tracking-tight text-text-soft leading-[1.1]">
              Engineering Solutions. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-blue via-accent-amber to-electric-lime">
                Analyzing Systems.
              </span>{' '}
              Building Better Software.
            </h1>

            <p className="font-inter text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed">
              {portfolioData.personal.subtitle}
            </p>

            {/* Resume Summary snippet */}
            <div className="p-4 rounded-xl bg-graphite/60 border border-white/10 backdrop-blur-sm max-w-2xl">
              <p className="font-inter text-xs sm:text-sm text-text-soft/90 leading-relaxed">
                {portfolioData.personal.summary}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[11px] text-text-muted">
                <span className="text-electric-lime">● CGPA: 8.15</span>
                <span>● Rac-a-thon Special Mention</span>
                <span>● Full-Stack & ML Focus</span>
              </div>
            </div>

            {/* Two Clear Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-obsidian bg-electric-lime hover:bg-electric-lime-dim transition-all shadow-glow-lime flex items-center gap-2 font-grotesk"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-text-soft bg-graphite hover:bg-graphite-light border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 font-grotesk"
              >
                <Mail className="w-4 h-4 text-ice-blue" />
                <span>Contact / Connect</span>
              </a>

              <button
                onClick={onExploreClick}
                className="px-4 py-3.5 rounded-xl font-mono text-xs text-text-muted hover:text-white transition-colors"
              >
                Explore Technical Domains ↓
              </button>
            </div>
          </div>

          {/* Right Column: Visual Motif & Audio Atmosphere */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl bg-graphite/80 backdrop-blur-md border border-white/10 p-6 shadow-2xl overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-electric-lime" />
                  TECHNICAL ARCHITECTURE NEXUS
                </span>
                <span className="font-mono text-[10px] text-electric-lime">
                  SHIV RAKSHANA R
                </span>
              </div>

              {/* Graphic Nexus */}
              <div className="relative h-56 w-full rounded-2xl bg-obsidian-deep/90 border border-white/5 flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-orbit" />
                <div className="absolute inset-12 rounded-full border border-white/5" />

                {/* Central Nexus Core */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-graphite border border-electric-lime/40 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(198,255,77,0.2)]">
                  <span className="font-grotesk font-bold text-xs text-electric-lime">SR</span>
                  <span className="font-mono text-[8px] text-text-muted">CIT</span>
                </div>

                {/* 1. Software Engineering */}
                <a
                  href="#domain-swe"
                  className="absolute top-4 left-6 p-2 rounded-xl bg-graphite border border-ice-blue/40 text-ice-blue shadow-sm hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">DEV</span>
                </a>

                {/* 2. Systems Analysis */}
                <a
                  href="#domain-systems"
                  className="absolute top-4 right-6 p-2 rounded-xl bg-graphite border border-accent-amber/40 text-accent-amber shadow-sm hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">ARCH</span>
                </a>

                {/* 3. AI & ML */}
                <a
                  href="#domain-aiml"
                  className="absolute bottom-4 left-6 p-2 rounded-xl bg-graphite border border-accent-teal/40 text-accent-teal shadow-sm hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">AI/ML</span>
                </a>

                {/* 4. Full-Stack & Systems */}
                <a
                  href="#domain-fullstack"
                  className="absolute bottom-4 right-6 p-2 rounded-xl bg-graphite border border-electric-lime/40 text-electric-lime shadow-sm hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">SYS</span>
                </a>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-muted">
                <span>Four Technical Domains</span>
                <span className="text-text-soft font-medium">Software Systems Undergraduate</span>
              </div>
            </div>

            {/* Web Audio Telemetry Module */}
            <AudioAtmosphere />
          </div>
        </div>
      </div>
    </section>
  );
};
