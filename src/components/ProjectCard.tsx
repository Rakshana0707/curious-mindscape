import React from 'react';
import { ChevronRight, FileText } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const getBadgeStyle = (category: Project['category']) => {
    switch (category) {
      case 'systems':
        return {
          bg: 'bg-electric-lime/10',
          text: 'text-electric-lime',
          border: 'border-electric-lime/30',
        };
      case 'ai':
        return {
          bg: 'bg-ice-blue/10',
          text: 'text-ice-blue',
          border: 'border-ice-blue/30',
        };
      case 'ml':
        return {
          bg: 'bg-accent-teal/10',
          text: 'text-accent-teal',
          border: 'border-accent-teal/30',
        };
      case 'fullstack':
      default:
        return {
          bg: 'bg-accent-amber/10',
          text: 'text-accent-amber',
          border: 'border-accent-amber/30',
        };
    }
  };

  const badge = getBadgeStyle(project.category);

  return (
    <div className="relative group rounded-2xl bg-graphite/80 backdrop-blur-md border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider border ${badge.bg} ${badge.text} ${badge.border}`}>
            {project.categoryLabel}
          </span>
          <span className="font-mono text-[10px] text-text-muted px-2 py-0.5 rounded bg-obsidian border border-white/5">
            {project.sourcePdf}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-grotesk font-bold text-xl sm:text-2xl text-text-soft group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Short, factual description */}
        <p className="font-inter text-sm text-text-muted mt-2 leading-relaxed">
          {project.description}
        </p>

        {/* Resume bullet highlight */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <ul className="space-y-2">
            {project.bullets.map((bullet, idx) => (
              <li key={idx} className="text-xs font-inter text-text-muted flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-lime mt-1.5 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Stack & Details button */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-obsidian-surface text-text-soft border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-text-muted">
            {project.status || 'Academic Project'}
          </span>

          <button
            onClick={() => onOpenDetails(project)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-electric-lime bg-electric-lime/10 hover:bg-electric-lime/20 border border-electric-lime/30 transition-colors"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
