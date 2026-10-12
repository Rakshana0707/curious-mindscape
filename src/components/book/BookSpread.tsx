import React from 'react';
import { portfolioData, Project, BookChapter } from '../../data/portfolioData';
import { ContactBookForm } from './ContactBookForm';
import { 
  Award, 
  Cpu, 
  ExternalLink, 
  Mail, 
  Phone, 
  ShieldCheck, 
  BookOpen, 
  ChevronRight, 
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../BrandIcons';

interface BookSpreadProps {
  spreadIndex: number; // 1 to 9
  onOpenProjectModal: (project: Project) => void;
  onSelectChapter: (spreadIndex: number) => void;
  onOpenPdfAudit: () => void;
  onTurnPagePrev: () => void;
  onTurnPageNext: () => void;
  isSinglePageMode: boolean;
}

export const BookSpread: React.FC<BookSpreadProps> = ({
  spreadIndex,
  onOpenProjectModal,
  onSelectChapter,
  onOpenPdfAudit,
  onTurnPagePrev,
  onTurnPageNext,
  isSinglePageMode,
}) => {
  const leftPageNum = spreadIndex * 2 - 1;
  const rightPageNum = spreadIndex * 2;

  // Find current chapter info
  const chapter = portfolioData.chapters.find(c => c.spreadIndex === spreadIndex) || portfolioData.chapters[0];

  // Helper for rendering project cards inside book pages
  const renderProjectCard = (project: Project) => (
    <div 
      onClick={() => onOpenProjectModal(project)}
      className="bg-white/80 hover:bg-white rounded-lg border border-amber-900/15 hover:border-amber-900/40 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group mb-4"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div>
          <span className="text-[10px] font-cinzel font-bold text-amber-900 tracking-wider">
            {project.chapterRoman !== '—' ? `CH. ${project.chapterRoman} • ` : ''}PROJECT
          </span>
          <h4 className="font-cinzel font-bold text-base text-stone-900 group-hover:text-amber-950 flex items-center gap-1.5">
            <span>{project.title}</span>
            <span className="text-[10px] font-mono font-normal text-stone-500">[{project.sourcePdf}]</span>
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 shrink-0">
          p. {project.pageNumber}
        </span>
      </div>

      <p className="text-xs font-garamond italic text-stone-600 mb-2">
        {project.subtitle}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1 mb-2.5">
        {project.technologies.slice(0, 5).map(tech => (
          <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-700 border border-stone-200">
            {tech}
          </span>
        ))}
      </div>

      <p className="text-xs font-serif text-stone-800 line-clamp-3 leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Metrics Badges */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="pt-2 border-t border-amber-900/10 flex flex-wrap gap-1.5">
          {project.metrics.map(metric => (
            <span key={metric} className="text-[10px] font-mono text-amber-950 bg-amber-50 px-2 py-0.5 rounded border border-amber-900/10">
              ✓ {metric}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2.5 flex items-center justify-between text-[11px] font-cinzel font-semibold text-amber-900 group-hover:text-amber-950">
        <span>INSPECT SPECIFICATIONS</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-2 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Book Spread Outer Container with 3D Depth & Page Stack */}
      <div className="relative w-full bg-book-paper text-book-ink rounded-lg shadow-2xl border-t border-b border-amber-950/20 book-shadow-cast flex flex-col md:flex-row overflow-hidden min-h-[720px] lg:min-h-[780px]">
        
        {/* =========================================================================
            LEFT PAGE (VERSO)
            ========================================================================= */}
        <div className={`relative flex-1 p-6 sm:p-8 lg:p-10 parchment-sheet edge-stack-left flex flex-col justify-between border-b md:border-b-0 md:border-r border-amber-900/15 ${isSinglePageMode ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Inner Verso Shadow (Spine Crease) */}
          <div className="absolute inset-y-0 right-0 w-16 page-verso-shadow hidden md:block" />

          {/* Left Page Running Header */}
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-amber-900/20 text-xs font-cinzel text-amber-900 tracking-[0.2em] uppercase select-none">
            <span>THE CURIOUS MINDSCAPE</span>
            <span className="font-mono text-stone-500">VOL. I</span>
          </div>

          {/* Left Page Content per Spread */}
          <div className="flex-grow book-scroll overflow-y-auto pr-1">
            {spreadIndex === 1 && (
              /* Spread 1: Left Page - Frontispiece & Edition Colophon */
              <div className="space-y-6 text-center py-4">
                <div className="border border-amber-900/20 p-6 rounded bg-stone-50/50 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-book-paper font-cinzel text-[10px] tracking-widest text-amber-900 uppercase">
                    FRONTISPIECE
                  </div>

                  <div className="w-20 h-20 mx-auto rounded-full border-2 border-amber-800/40 flex items-center justify-center bg-amber-950/5 my-2">
                    <span className="font-cinzel text-2xl font-bold text-amber-950 tracking-wider">SRR</span>
                  </div>

                  <h2 className="font-cinzel font-extrabold text-2xl text-stone-900 tracking-wide mt-2">
                    {portfolioData.personal.name}
                  </h2>
                  <p className="font-garamond italic text-sm text-stone-700">
                    {portfolioData.personal.title}
                  </p>
                  <p className="font-cinzel text-xs text-amber-900 font-semibold mt-1">
                    {portfolioData.personal.institution}
                  </p>

                  <div className="my-4 ornamental-rule">
                    <span>❖</span>
                  </div>

                  <div className="space-y-2 text-xs font-serif text-stone-700 text-left bg-white/70 p-4 rounded border border-amber-900/10">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-amber-900 font-bold">
                      ACADEMIC & SYSTEMS MONOGRAPH
                    </p>
                    <p>
                      Composed in Coimbatore, India. Transcribed strictly from certified institutional curricula and verified academic project repositories.
                    </p>
                    <p className="text-[11px] font-mono text-stone-500">
                      Coimbatore Institute of Technology • Integrated MSc Software Systems
                    </p>
                  </div>

                  {/* Verified Links */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-amber-900/10">
                    <a
                      href={portfolioData.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-950 hover:underline"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span>github.com/Rakshana0707</span>
                    </a>
                    <span className="text-stone-400">•</span>
                    <a
                      href={portfolioData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-950 hover:underline"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {spreadIndex === 2 && (
              /* Spread 2: Left Page - Table of Contents */
              <div className="space-y-4">
                <div className="text-center pb-2 mb-3 border-b border-amber-900/15">
                  <span className="text-[10px] font-cinzel tracking-[0.25em] text-amber-900 uppercase">
                    READING COMPENDIUM
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    TABLE OF CONTENTS
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {portfolioData.chapters.map(ch => (
                    <div
                      key={ch.id}
                      onClick={() => onSelectChapter(ch.spreadIndex)}
                      className="flex items-baseline justify-between group cursor-pointer text-xs p-1.5 rounded hover:bg-amber-100/50 transition-colors"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-cinzel font-bold text-amber-900 w-6">
                          {ch.roman !== '—' ? ch.roman : '•'}
                        </span>
                        <span className="font-serif text-stone-800 group-hover:text-amber-950 group-hover:font-semibold">
                          {ch.title}
                        </span>
                      </div>
                      <div className="flex-grow mx-2 border-b border-dotted border-stone-400 opacity-60" />
                      <span className="font-mono text-stone-600 font-semibold shrink-0">
                        p. {ch.pages[0]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-amber-50/60 rounded border border-amber-900/10 text-xs font-garamond italic text-stone-700">
                  Tip: Use left and right keyboard arrow keys or click the page edges to turn pages smoothly.
                </div>
              </div>
            )}

            {spreadIndex === 3 && (
              /* Spread 3: Left Page - Chapter I: GlobalPulse */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER I • WEB & INTELLIGENCE SYSTEMS
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    GlobalPulse Dashboard
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'globalpulse')!)}
              </div>
            )}

            {spreadIndex === 4 && (
              /* Spread 4: Left Page - Chapter II: Zyatra */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER II • AI, TOURISM & CIVIC PLATFORMS
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Zyatra Heritage Suite
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'zyatra')!)}
              </div>
            )}

            {spreadIndex === 5 && (
              /* Spread 5: Left Page - Chapter III: ContextIQ */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER III • BEHAVIORAL ML & TIME INTELLIGENCE
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    ContextIQ Architecture
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'contextiq')!)}
              </div>
            )}

            {spreadIndex === 6 && (
              /* Spread 6: Left Page - Chapter IV: SkillSync */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER IV • COLLABORATIVE AI & VITAL PLATFORMS
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    SkillSync Platform
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'skillsync')!)}
              </div>
            )}

            {spreadIndex === 7 && (
              /* Spread 7: Left Page - Chapter V: Spotlight: Grainly */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER V • HARDWARE & IPC SPOTLIGHT
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Grainly Multi-Tiered Engine
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'grainly')!)}
              </div>
            )}

            {spreadIndex === 8 && (
              /* Spread 8: Left Page - Chapter VI: Hackathons & Honors */
              <div className="space-y-4">
                <div className="mb-3">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER VI • TRACK RECORD & HONORS
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Competitive Hackathons
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white/80 rounded border border-amber-900/15 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-800" />
                        <span>Rac-a-thon (24-Hour Hackathon)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-mono font-bold border border-amber-300">
                        SPECIAL MENTION
                      </span>
                    </div>
                    <p className="text-xs font-serif text-stone-700 leading-relaxed">
                      Awarded Special Mention at Rac-a-thon, a 24-hour inter-college hackathon, for designing and developing an innovative real-time solution within a competitive team environment.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Certificate of Merit Verified</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/80 rounded border border-amber-900/15 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-800" />
                        <span>Smart India Hackathon</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[10px] font-mono border border-stone-200">
                        INTERNAL ROUND
                      </span>
                    </div>
                    <p className="text-xs font-serif text-stone-700 leading-relaxed">
                      Participated in internal college-level hackathon at CIT, collaborating in a team to design and develop an innovative problem-solving solution under time constraints.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-stone-600">
                      <span>Coimbatore Institute of Technology</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {spreadIndex === 9 && (
              /* Spread 9: Left Page - Chapter VII: Official Coordinates & Resume Repository */
              <div className="space-y-4">
                <div className="mb-3">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER VII • VERIFICATION & DISPATCH
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Official Coordinates
                  </h3>
                </div>

                <div className="p-4 bg-white/80 rounded border border-amber-900/15 space-y-3 text-xs font-serif text-stone-800">
                  <div className="space-y-1">
                    <h4 className="font-cinzel font-bold text-stone-900 text-sm">
                      {portfolioData.personal.name}
                    </h4>
                    <p className="text-stone-600 font-garamond italic">
                      Integrated MSc Software Systems • CIT
                    </p>
                    <p className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-800" />
                      <span>{portfolioData.personal.location}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-900/10 space-y-2">
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-800" />
                      <span>{portfolioData.personal.email}</span>
                    </a>

                    <a
                      href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-800" />
                      <span>{portfolioData.personal.phone}</span>
                    </a>

                    <a
                      href={portfolioData.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors"
                    >
                      <GitHubIcon className="w-3.5 h-3.5 text-amber-800" />
                      <span>github.com/Rakshana0707</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>

                    <a
                      href={portfolioData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5 text-amber-800" />
                      <span>linkedin.com/in/shiv-rakshana-ravikumar</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                </div>

                {/* Audit trigger */}
                <div 
                  onClick={onOpenPdfAudit}
                  className="p-3 bg-amber-50/80 rounded border border-amber-900/20 cursor-pointer hover:bg-amber-100/70 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <div>
                      <h5 className="font-cinzel font-bold text-xs text-amber-950">Audit Resume Sources</h5>
                      <p className="text-[11px] font-serif text-stone-600">Cross-examine against PDF 1 & PDF 2</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-900" />
                </div>
              </div>
            )}
          </div>

          {/* Left Page Running Footer */}
          <div className="flex items-center justify-between pt-3 mt-4 border-t border-amber-900/15 text-xs font-mono text-stone-600 select-none">
            <span 
              onClick={onTurnPagePrev}
              className="hover:text-amber-900 cursor-pointer flex items-center gap-1 font-cinzel text-[11px] font-semibold"
            >
              ◀ Turn Page
            </span>
            <span className="font-bold">p. {leftPageNum}</span>
          </div>

        </div>


        {/* =========================================================================
            CENTER SPINE BINDING CREASE (DESKTOP)
            ========================================================================= */}
        <div className="hidden md:flex w-6 bg-gradient-to-r from-stone-400/20 via-stone-800/20 to-stone-400/20 shadow-inner shrink-0 relative items-center justify-center">
          <div className="w-[1px] h-full bg-amber-900/20" />
        </div>


        {/* =========================================================================
            RIGHT PAGE (RECTO)
            ========================================================================= */}
        <div className="relative flex-1 p-6 sm:p-8 lg:p-10 parchment-sheet edge-stack-right flex flex-col justify-between">
          
          {/* Inner Recto Shadow (Spine Crease) */}
          <div className="absolute inset-y-0 left-0 w-16 page-recto-shadow hidden md:block" />

          {/* Right Page Running Header */}
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-amber-900/20 text-xs font-cinzel text-amber-900 tracking-[0.2em] uppercase select-none">
            <span className="font-mono text-stone-500">SECTION {spreadIndex}</span>
            <span>{chapter.title}</span>
          </div>

          {/* Right Page Content per Spread */}
          <div className="flex-grow book-scroll overflow-y-auto pl-1">
            {spreadIndex === 1 && (
              /* Spread 1: Right Page - Executive Summary & Education */
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    EXECUTIVE SUMMARY
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900 mb-2">
                    Professional Profile
                  </h3>
                  <div className="text-xs sm:text-sm font-serif text-stone-800 leading-relaxed text-justify">
                    <span className="drop-cap">S</span>
                    <span>
                      {portfolioData.personal.executiveSummary}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    ACADEMIC FOUNDATION
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-stone-900 mb-2">
                    Education & Credentials
                  </h3>

                  <div className="space-y-3">
                    {portfolioData.education.map((edu, idx) => (
                      <div key={idx} className="p-3 bg-white/70 rounded border border-amber-900/15">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-cinzel font-bold text-xs text-stone-900">
                            {edu.degree}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-semibold shrink-0">
                            {edu.grade}
                          </span>
                        </div>
                        <p className="text-xs font-garamond italic text-stone-700">
                          {edu.institution}
                        </p>
                        <p className="text-[10px] font-mono text-stone-500 mt-0.5">
                          Period: {edu.period}
                        </p>
                        {edu.details && (
                          <p className="text-[11px] font-serif text-stone-600 mt-1">
                            {edu.details}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {spreadIndex === 2 && (
              /* Spread 2: Right Page - Technical Skills & Taxonomy */
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    COMPETENCY TAXONOMY
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900 mb-2">
                    Technical Disciplines
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 bg-white/70 rounded border border-amber-900/15">
                    <h5 className="font-cinzel font-bold text-amber-950 text-[11px] uppercase tracking-wider mb-1">
                      Programming Languages
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {portfolioData.skills.programmingLanguages.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[11px] text-stone-800 border border-stone-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-white/70 rounded border border-amber-900/15">
                    <h5 className="font-cinzel font-bold text-amber-950 text-[11px] uppercase tracking-wider mb-1">
                      Web Development & Back-End
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {portfolioData.skills.webDevelopment.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[11px] text-stone-800 border border-stone-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-white/70 rounded border border-amber-900/15">
                    <h5 className="font-cinzel font-bold text-amber-950 text-[11px] uppercase tracking-wider mb-1">
                      Machine Learning & Data Analytics
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {portfolioData.skills.machineLearning.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[11px] text-stone-800 border border-stone-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-white/70 rounded border border-amber-900/15">
                    <h5 className="font-cinzel font-bold text-amber-950 text-[11px] uppercase tracking-wider mb-1">
                      Databases & Data Storage
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {portfolioData.skills.databases.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[11px] text-stone-800 border border-stone-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-white/70 rounded border border-amber-900/15">
                    <h5 className="font-cinzel font-bold text-amber-950 text-[11px] uppercase tracking-wider mb-1">
                      AI Integration & APIs
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {portfolioData.skills.aiAndIntegration.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[11px] text-stone-800 border border-stone-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {spreadIndex === 3 && (
              /* Spread 3: Right Page - Chapter I: CampCon */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER I • WEB & INTELLIGENCE SYSTEMS
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    CampCon Platform
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'campcon')!)}
              </div>
            )}

            {spreadIndex === 4 && (
              /* Spread 4: Right Page - Chapter II: CivicLensTN */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER II • AI, TOURISM & CIVIC PLATFORMS
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    CivicLensTN Accountability
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'civiclenstn')!)}
              </div>
            )}

            {spreadIndex === 5 && (
              /* Spread 5: Right Page - Chapter III: MicroDelay */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER III • BEHAVIORAL ML & TIME INTELLIGENCE
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    MicroDelay Estimation
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'microdelay')!)}
              </div>
            )}

            {spreadIndex === 6 && (
              /* Spread 6: Right Page - Chapter IV: LifeLink */
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER IV • COLLABORATIVE AI & VITAL PLATFORMS
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    LifeLink Network
                  </h3>
                </div>
                {renderProjectCard(portfolioData.projects.find(p => p.id === 'lifelink')!)}
              </div>
            )}

            {spreadIndex === 7 && (
              /* Spread 7: Right Page - Chapter V: Methodology & IPC */
              <div className="space-y-4">
                <div className="mb-3">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER V • ARCHITECTURAL METHODOLOGY
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Engineering Rigor & Verification
                  </h3>
                </div>

                <div className="space-y-3 text-xs font-serif text-stone-800 leading-relaxed">
                  <div className="p-3 bg-white/70 rounded border border-amber-900/15">
                    <h5 className="font-cinzel font-bold text-stone-900 mb-1">
                      1. Cross-Era Hardware / Web Bridge
                    </h5>
                    <p className="text-stone-700">
                      Engineering solutions that integrate low-level assembly execution with high-level modern web frameworks, handling file locks, synchronization latency, and execution sandboxing in DOSBox.
                    </p>
                  </div>

                  <div className="p-3 bg-white/70 rounded border border-amber-900/15">
                    <h5 className="font-cinzel font-bold text-stone-900 mb-1">
                      2. Data Integrity & Verification Pipelines
                    </h5>
                    <p className="text-stone-700">
                      Developing multilingual NLP models to correlate published budgetary records against spoken and written public promises, establishing reproducible accountability metrics.
                    </p>
                  </div>

                  <div className="p-3 bg-white/70 rounded border border-amber-900/15">
                    <h5 className="font-cinzel font-bold text-stone-900 mb-1">
                      3. Personalized Machine Learning Regressors
                    </h5>
                    <p className="text-stone-700">
                      Trained individualized Random Forest models (e.g. MicroDelay) that achieve measurable ~10% reduction in prediction error compared to static population averages.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {spreadIndex === 8 && (
              /* Spread 8: Right Page - Chapter VI: Leadership & Certifications */
              <div className="space-y-4">
                <div className="mb-3">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER VI • COMMUNITY & RECOGNITION
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Leadership & Certifications
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white/80 rounded border border-amber-900/15 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-800" />
                        <span>Event Chairperson – NALAM ANBUDAN</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[10px] font-mono border border-stone-200">
                        ROTARACT
                      </span>
                    </div>
                    <p className="text-xs font-garamond italic text-stone-600">
                      Rotaract Club of VAAGAI Gang 50
                    </p>
                    <p className="text-xs font-serif text-stone-700 leading-relaxed">
                      Orchestrated the funding and delivery of curated gratitude packages to over 50 local essential workers, achieving 100% community engagement.
                    </p>
                  </div>

                  <div className="p-3 bg-white/80 rounded border border-amber-900/15 shadow-sm space-y-2">
                    <h5 className="font-cinzel font-bold text-xs text-amber-950 uppercase tracking-wider">
                      Verified Technical Certifications
                    </h5>
                    <div className="space-y-1.5">
                      {portfolioData.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-serif p-1.5 rounded bg-stone-50 border border-stone-200">
                          <div>
                            <span className="font-medium text-stone-900">{cert.name}</span>
                            <span className="text-[10px] text-stone-500 font-mono block">{cert.issuer}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold shrink-0">
                            {cert.levels}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {spreadIndex === 9 && (
              /* Spread 9: Right Page - Chapter VII: Working Contact Form */
              <div>
                <div className="mb-3">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER VII • CORRESPONDENCE TERMINAL
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Direct Communication
                  </h3>
                </div>
                <ContactBookForm />
              </div>
            )}
          </div>

          {/* Right Page Running Footer */}
          <div className="flex items-center justify-between pt-3 mt-4 border-t border-amber-900/15 text-xs font-mono text-stone-600 select-none">
            <span className="font-bold">p. {rightPageNum}</span>
            <span 
              onClick={onTurnPageNext}
              className="hover:text-amber-900 cursor-pointer flex items-center gap-1 font-cinzel text-[11px] font-semibold"
            >
              Turn Page ▶
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
