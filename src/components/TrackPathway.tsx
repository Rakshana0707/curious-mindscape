import React from 'react';
import { BookOpen, Utensils, Headphones, Terminal, ArrowRight } from 'lucide-react';

interface TrackPathwayProps {
  activeTrack?: string;
  onSelectTrack?: (trackId: string) => void;
}

export const TrackPathway: React.FC<TrackPathwayProps> = ({ activeTrack, onSelectTrack }) => {
  const tracks = [
    {
      id: 'read',
      label: 'READ',
      name: 'The Reader',
      icon: BookOpen,
      color: '#83BFFF',
      borderColor: 'border-ice-blue/30',
      activeBorder: 'border-ice-blue',
      meta: 'Reading & Knowledge',
    },
    {
      id: 'create',
      label: 'CREATE',
      name: 'The Experimenter',
      icon: Utensils,
      color: '#F59E0B',
      borderColor: 'border-accent-amber/30',
      activeBorder: 'border-accent-amber',
      meta: 'Cooking & Refinement',
    },
    {
      id: 'listen',
      label: 'LISTEN',
      name: 'The Listener',
      icon: Headphones,
      color: '#2DD4BF',
      borderColor: 'border-accent-teal/30',
      activeBorder: 'border-accent-teal',
      meta: 'Music & Patterns',
    },
    {
      id: 'build',
      label: 'BUILD',
      name: 'The Builder',
      icon: Terminal,
      color: '#C6FF4D',
      borderColor: 'border-electric-lime/30',
      activeBorder: 'border-electric-lime',
      meta: 'Software & Problem Solving',
    },
  ];

  return (
    <div className="relative w-full py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {tracks.map((track) => {
          const Icon = track.icon;
          const isActive = activeTrack === track.id;

          return (
            <button
              key={track.id}
              onClick={() => onSelectTrack && onSelectTrack(track.id)}
              className={`text-left p-4 rounded-xl transition-all duration-300 relative group overflow-hidden bg-graphite/70 backdrop-blur-md border ${
                isActive ? `${track.activeBorder} bg-graphite` : `${track.borderColor} hover:border-white/20 hover:bg-graphite`
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${track.color}15`, border: `1px solid ${track.color}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: track.color }} />
                </div>

                <span
                  className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${track.color}15`, color: track.color, border: `1px solid ${track.color}30` }}
                >
                  {track.label}
                </span>
              </div>

              <div>
                <h4 className="font-grotesk font-bold text-base text-text-soft group-hover:text-white transition-colors">
                  {track.name}
                </h4>
                <p className="font-inter text-xs text-text-muted mt-1">
                  {track.meta}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-text-muted group-hover:text-text-soft transition-colors">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" style={{ color: track.color }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
