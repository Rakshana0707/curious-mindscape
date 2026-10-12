import React from 'react';
import { Cpu, CheckCircle2, AlertCircle, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const CaseStudySection: React.FC = () => {
  const study = portfolioData.caseStudy;

  return (
    <section id="case-study" className="py-20 relative overflow-hidden bg-obsidian-surface border-y border-graphite-border">
      <div className="glow-orb -top-20 right-10 w-96 h-96 bg-electric-lime" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full font-mono text-xs uppercase font-bold tracking-widest text-electric-lime bg-electric-lime/10 border border-electric-lime/30">
              PROJECT SPOTLIGHT
            </span>
          </div>

          <h2 className="font-grotesk font-bold text-3xl sm:text-5xl text-text-soft tracking-tight">
            {study.title}
          </h2>
          <p className="font-mono text-sm sm:text-base text-electric-lime mt-1 font-medium">
            {study.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Problem */}
          <div className="bg-graphite/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-card">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-amber font-semibold uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Problem Addressed</span>
            </div>
            <p className="font-inter text-sm text-text-muted leading-relaxed">
              {study.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="bg-graphite/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-card">
            <div className="flex items-center gap-2 font-mono text-xs text-electric-lime font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              <span>Proposed & Implemented Solution</span>
            </div>
            <p className="font-inter text-sm text-text-muted leading-relaxed">
              {study.solution}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {study.technologies.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-mono bg-obsidian text-text-soft border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features implemented */}
        <div className="bg-graphite rounded-2xl p-6 border border-white/10 shadow-card">
          <div className="flex items-center gap-2 font-mono text-xs text-ice-blue uppercase tracking-wider font-semibold mb-3">
            <Layers className="w-4 h-4" />
            <span>Implemented Features (From Resume)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {study.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-obsidian/70 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-electric-lime shrink-0 mt-0.5" />
                <span className="font-inter text-xs sm:text-sm text-text-soft">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
