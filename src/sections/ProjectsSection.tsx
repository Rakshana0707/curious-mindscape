import React, { useState } from 'react';
import { Filter, FileText } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectsSectionProps {
  onOpenProjectModal: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProjectModal }) => {
  const [filter, setFilter] = useState<'all' | 'systems' | 'ai' | 'ml' | 'fullstack'>('all');

  const categories = [
    { id: 'all', label: 'All Projects (7)' },
    { id: 'systems', label: 'Systems (Grainly)' },
    { id: 'ai', label: 'AI (Zyatra, SkillSync)' },
    { id: 'ml', label: 'Machine Learning (ContextIQ, MicroDelay)' },
    { id: 'fullstack', label: 'Full-Stack (LifeLink, GlobalPulse)' },
  ];

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (filter === 'all') return true;
    return (p.category as string) === filter || p.category.includes(filter);
  });

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-obsidian">
      <div className="glow-orb top-20 right-10 w-96 h-96 bg-electric-lime" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full font-mono text-xs uppercase font-bold tracking-widest text-electric-lime bg-electric-lime/10 border border-electric-lime/30">
                PROJECTS
              </span>
              <span className="font-mono text-xs text-text-muted">
                From PDF Resumes
              </span>
            </div>

            <h2 className="font-grotesk font-bold text-3xl sm:text-5xl text-text-soft tracking-tight">
              Selected Academic Projects
            </h2>
            <p className="font-inter text-base text-text-muted mt-2 leading-relaxed">
              Academic projects built across full-stack web development, low-level 8086 assembly, and machine learning.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-2 border-b border-white/5">
          <span className="font-mono text-xs text-text-muted flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-electric-lime" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filter === cat.id
                  ? 'bg-electric-lime text-obsidian font-bold shadow-sm'
                  : 'bg-graphite text-text-muted hover:text-text-soft border border-white/5 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={onOpenProjectModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
