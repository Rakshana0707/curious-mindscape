import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { TrackPathway } from '../components/TrackPathway';
import { WorldCard } from '../components/WorldCard';

export const WorldsSection: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string>('swe');

  const handleSelectTrack = (trackId: string) => {
    setActiveTrack(trackId);
    const el = document.getElementById(`domain-${trackId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="domains" className="py-20 relative overflow-hidden bg-obsidian">
      {/* Subtle glow backgrounds */}
      <div className="glow-orb top-1/3 left-0 w-80 h-80 bg-ice-blue" />
      <div className="glow-orb bottom-10 right-0 w-80 h-80 bg-accent-amber" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full font-mono text-xs uppercase font-bold tracking-widest text-ice-blue bg-ice-blue/10 border border-ice-blue/30">
              CORE SPECIALIZATIONS
            </span>
          </div>

          <h2 className="font-grotesk font-bold text-3xl sm:text-5xl text-text-soft tracking-tight">
            Technical Domains
          </h2>
          <p className="font-inter text-base text-text-muted mt-2 leading-relaxed">
            Core technical categories reflecting my academic training, software engineering projects, and machine learning implementations.
          </p>
        </div>

        {/* Technical Domain Track Pathway */}
        <TrackPathway activeTrack={activeTrack} onSelectTrack={handleSelectTrack} />

        {/* 4 Technical Domain Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.domains.map((domain) => (
            <WorldCard key={domain.id} world={domain} />
          ))}
        </div>
      </div>
    </section>
  );
};
