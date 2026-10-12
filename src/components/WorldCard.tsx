import React from 'react';
import { Code, Cpu, Server, Database } from 'lucide-react';
import { TechnicalDomain } from '../data/portfolioData';

interface WorldCardProps {
  world: TechnicalDomain;
}

export const WorldCard: React.FC<WorldCardProps> = ({ world }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'swe':
        return Code;
      case 'systems':
        return Cpu;
      case 'aiml':
        return Server;
      case 'fullstack':
      default:
        return Database;
    }
  };

  const Icon = getIcon(world.id);

  return (
    <article
      id={`domain-${world.id}`}
      className="relative rounded-2xl bg-graphite/70 backdrop-blur-md border border-white/10 p-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-card"
    >
      <div>
        {/* Top bar with Domain Code */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider"
            style={{
              backgroundColor: `${world.accentColor}18`,
              color: world.accentColor,
              border: `1px solid ${world.accentColor}40`,
            }}
          >
            {world.code}
          </span>

          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `${world.accentColor}15`,
              border: `1px solid ${world.accentColor}30`,
            }}
          >
            <Icon className="w-4 h-4" style={{ color: world.accentColor }} />
          </div>
        </div>

        {/* Title and subtitle */}
        <h3 className="font-grotesk font-bold text-xl text-text-soft group-hover:text-white transition-colors">
          {world.title}
        </h3>
        <p className="font-mono text-xs text-text-muted mt-0.5 mb-3" style={{ color: world.accentColor }}>
          {world.subtitle}
        </p>

        {/* Concise Description */}
        <p className="font-inter text-sm text-text-muted leading-relaxed mb-4">
          {world.description}
        </p>
      </div>

      {/* Tags */}
      <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
        {world.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-obsidian text-text-soft border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};
