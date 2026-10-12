import React from 'react';
import { Code, Cpu, Server, Database, ArrowRight } from 'lucide-react';

interface TrackPathwayProps {
  activeTrack?: string;
  onSelectTrack?: (trackId: string) => void;
}

export const TrackPathway: React.FC<TrackPathwayProps> = ({ activeTrack, onSelectTrack }) => {
  const domains = [
    {
      id: 'swe',
      label: 'DEV',
      name: 'Software Engineering',
      icon: Code,
      color: '#83BFFF',
      borderColor: 'border-ice-blue/30',
      activeBorder: 'border-ice-blue',
      meta: 'Application Development & Design',
    },
    {
      id: 'systems',
      label: 'ARCH',
      name: 'Systems Analysis',
      icon: Cpu,
      color: '#F59E0B',
      borderColor: 'border-accent-amber/30',
      activeBorder: 'border-accent-amber',
      meta: 'Requirements & System Modeling',
    },
    {
      id: 'aiml',
      label: 'AI/ML',
      name: 'AI & Machine Learning',
      icon: Server,
      color: '#2DD4BF',
      borderColor: 'border-accent-teal/30',
      activeBorder: 'border-accent-teal',
      meta: 'Data Analysis & ML Models',
    },
    {
      id: 'fullstack',
      label: 'SYS',
      name: 'Full-Stack & Systems',
      icon: Database,
      color: '#C6FF4D',
      borderColor: 'border-electric-lime/30',
      activeBorder: 'border-electric-lime',
      meta: 'Web Platforms & Databases',
    },
  ];

  return (
    <div className="relative w-full py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isActive = activeTrack === domain.id;

          return (
            <button
              key={domain.id}
              onClick={() => onSelectTrack && onSelectTrack(domain.id)}
              className={`text-left p-4 rounded-xl transition-all duration-300 relative group overflow-hidden bg-graphite/70 backdrop-blur-md border ${
                isActive ? `${domain.activeBorder} bg-graphite` : `${domain.borderColor} hover:border-white/20 hover:bg-graphite`
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${domain.color}15`, border: `1px solid ${domain.color}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: domain.color }} />
                </div>

                <span
                  className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${domain.color}15`, color: domain.color, border: `1px solid ${domain.color}30` }}
                >
                  {domain.label}
                </span>
              </div>

              <div>
                <h4 className="font-grotesk font-bold text-base text-text-soft group-hover:text-white transition-colors">
                  {domain.name}
                </h4>
                <p className="font-inter text-xs text-text-muted mt-1">
                  {domain.meta}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-text-muted group-hover:text-text-soft transition-colors">
                <span>Domain Details</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" style={{ color: domain.color }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
