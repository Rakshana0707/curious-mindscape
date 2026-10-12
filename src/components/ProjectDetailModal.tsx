import React, { useEffect } from 'react';
import { X, CheckCircle2, Cpu, AlertCircle } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { GitHubIcon } from './BrandIcons';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-graphite border border-white/15 p-6 sm:p-8 shadow-2xl focus:outline-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-obsidian-deep text-text-muted hover:text-white border border-white/10 hover:border-white/30 transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider bg-electric-lime/10 text-electric-lime border border-electric-lime/30">
              {project.categoryLabel}
            </span>
            <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded bg-obsidian border border-white/5">
              Source: {project.sourcePdf}
            </span>
          </div>

          <h2 id="modal-project-title" className="font-grotesk font-bold text-2xl sm:text-3xl text-text-soft">
            {project.title}
          </h2>
          <p className="font-inter text-sm text-text-muted mt-1">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((t, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-obsidian-surface text-text-soft border border-white/10 flex items-center gap-1.5"
            >
              <Cpu className="w-3 h-3 text-electric-lime" />
              {t}
            </span>
          ))}
        </div>

        {/* Content: Problem & Solution */}
        <div className="mt-6 space-y-4 text-sm font-inter">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent-amber font-semibold mb-2">
              Problem Addressed
            </h4>
            <p className="text-text-soft leading-relaxed bg-obsidian/60 p-4 rounded-xl border border-white/5">
              {project.problem}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-electric-lime font-semibold mb-2">
              Solution Implemented
            </h4>
            <p className="text-text-soft leading-relaxed bg-obsidian/60 p-4 rounded-xl border border-white/5">
              {project.solution}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted font-semibold mb-2">
              Verified Technical Details (From Resume)
            </h4>
            <div className="space-y-2">
              {project.bullets.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-graphite-light border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-electric-lime shrink-0 mt-0.5" />
                  <span className="text-text-soft text-xs sm:text-sm leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-text-soft hover:text-electric-lime transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>View GitHub Repository</span>
            </a>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-mono font-medium text-obsidian bg-electric-lime hover:bg-electric-lime-dim transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
