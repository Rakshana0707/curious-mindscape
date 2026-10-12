import React from 'react';
import { Project } from '../../data/portfolioData';
import { X, ExternalLink, CheckCircle2, Cpu, FileText } from 'lucide-react';
import { GitHubIcon } from '../BrandIcons';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-book-paper text-book-ink rounded-lg shadow-2xl border-4 border-amber-900/30 p-6 sm:p-8 parchment-sheet max-h-[90vh] overflow-y-auto book-scroll">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 mb-4 border-b border-amber-900/20">
          <div className="flex items-center gap-2 text-xs font-cinzel text-amber-900 tracking-wider">
            <span>Chapter {project.chapterRoman} • Page {project.pageNumber}</span>
            <span>•</span>
            <span className="font-mono text-stone-600">{project.sourcePdf} Verified</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-950 mt-1">
            {project.title}
          </h2>
          <p className="font-garamond italic text-sm text-stone-700 mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-stone-200/80 border border-stone-300 text-stone-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Problem & Architectural Solution */}
        <div className="space-y-4 text-xs sm:text-sm font-serif text-stone-800 leading-relaxed">
          <div className="p-3 bg-white/70 rounded border border-amber-900/10">
            <h4 className="font-cinzel font-bold text-xs text-amber-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-900" />
              <span>Problem Domain & Constraints</span>
            </h4>
            <p className="text-stone-700">{project.problem}</p>
          </div>

          <div className="p-3 bg-white/70 rounded border border-amber-900/10">
            <h4 className="font-cinzel font-bold text-xs text-amber-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
              <span>Architectural Solution</span>
            </h4>
            <p className="text-stone-700">{project.solution}</p>
          </div>
        </div>

        {/* Implementation Bullets */}
        <div className="mt-5">
          <h4 className="font-cinzel font-bold text-xs text-amber-950 uppercase tracking-wider mb-2">
            Verified Resume Implementation Details
          </h4>
          <ul className="space-y-2 text-xs font-serif text-stone-800">
            {project.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-800 font-bold shrink-0">❖</span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-5 p-3 bg-amber-50/70 border border-amber-900/15 rounded">
            <h4 className="font-cinzel font-bold text-xs text-amber-950 uppercase tracking-wider mb-2">
              Key Technical Benchmarks & Capabilities
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map(metric => (
                <span
                  key={metric}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-white border border-amber-900/20 text-amber-950 font-medium"
                >
                  ✓ {metric}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="mt-6 pt-4 border-t border-amber-900/20 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono text-stone-600 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-amber-800" />
            <span>Documented in Integrated MSc Curriculum</span>
          </span>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl || 'https://github.com/Rakshana0707'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 font-mono text-xs rounded transition-colors flex items-center gap-1.5"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>Inspect Repository</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
