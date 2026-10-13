import React, { useRef } from 'react';
import { portfolioData, Project, CaseStudy } from '../../data/portfolioData';
import { ContactBookForm } from './ContactBookForm';
import { 
  Award, 
  ExternalLink, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  MapPin,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../BrandIcons';

interface BookSpreadProps {
  spreadIndex: number; // 1 to 9
  onOpenProjectModal: (project: Project) => void;
  onSelectChapter: (spreadIndex: number) => void;
  onOpenPdfAudit: () => void;
  onTurnPageForward: () => void;
  onTurnPageBackward: () => void;
  isSinglePageMode: boolean;
  turnDirection?: 'forward' | 'backward' | null;
}

export const BookSpread: React.FC<BookSpreadProps> = ({
  spreadIndex,
  onOpenProjectModal,
  onSelectChapter,
  onOpenPdfAudit,
  onTurnPageForward,
  onTurnPageBackward,
  isSinglePageMode,
  turnDirection,
}) => {
  const leftPageNum = spreadIndex * 2 - 1;
  const rightPageNum = spreadIndex * 2;
  const totalInteriorSpreads = 9;

  // Chapter metadata
  const chapter = portfolioData.chapters.find(c => c.spreadIndex === spreadIndex) || portfolioData.chapters[0];

  // Touch swipe tracking refs
  const touchStartRef = useRef<{ x: number; y: number; isInteractive: boolean }>({ x: 0, y: 0, isInteractive: false });

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = Boolean(target.closest('button, a, input, textarea, select, [role="button"], label, .interactive-element'));
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      isInteractive,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current.isInteractive) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

    // Check if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0 && spreadIndex < totalInteriorSpreads) {
        // Swipe left -> turn forward
        onTurnPageForward();
      } else if (deltaX > 0 && spreadIndex > 1) {
        // Swipe right -> turn backward
        onTurnPageBackward();
      }
    }
  };

  // Position-based Click Handlers:
  // Left half click -> Turn BACKWARD (Previous page)
  const handleLeftPageClick = (e: React.MouseEvent) => {
    // 1. If text is selected, do not trigger page flip
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) return;

    // 2. If click was inside an interactive control, do not turn
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, textarea, select, [role="button"], label, .interactive-element')) {
      return;
    }

    // 3. Prevent moving beyond first interior spread
    if (spreadIndex > 1) {
      onTurnPageBackward();
    }
  };

  // Right half click -> Turn FORWARD (Next page)
  const handleRightPageClick = (e: React.MouseEvent) => {
    // 1. If text is selected, do not trigger page flip
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) return;

    // 2. If click was inside an interactive control, do not turn
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, textarea, select, [role="button"], label, .interactive-element')) {
      return;
    }

    // 3. Prevent moving beyond last interior spread
    if (spreadIndex < totalInteriorSpreads) {
      onTurnPageForward();
    }
  };

  // Helper for rendering project cards inside project chapters
  const renderProjectPage = (project: Project) => (
    <div className="space-y-3.5">
      <div className="flex items-start justify-between gap-2 border-b border-amber-900/15 pb-2">
        <div>
          <span className="text-[10px] font-cinzel font-bold text-amber-900 uppercase tracking-widest">
            {project.chapterRoman !== '—' ? `Chapter ${project.chapterRoman} • ` : ''}{project.categoryLabel}
          </span>
          <h3 className="font-cinzel font-bold text-lg sm:text-xl text-stone-900 flex items-center gap-2">
            <span>{project.title}</span>
            <span className="text-[10px] font-mono font-normal text-stone-500">[{project.sourcePdf}]</span>
          </h3>
          <p className="text-xs font-garamond italic text-stone-600">
            {project.subtitle}
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-semibold shrink-0">
          p. {project.pageNumber}
        </span>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1">
        {project.technologies.map(tech => (
          <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-800 border border-stone-200">
            {tech}
          </span>
        ))}
      </div>

      {/* Problem & Solution */}
      <div className="space-y-2 text-xs font-serif leading-relaxed">
        <div className="p-2.5 bg-white/70 rounded border border-amber-900/10">
          <strong className="font-cinzel text-amber-950 block text-[11px] mb-0.5">Problem Addressed:</strong>
          <p className="text-stone-700">{project.problem}</p>
        </div>

        <div className="p-2.5 bg-white/70 rounded border border-amber-900/10">
          <strong className="font-cinzel text-emerald-950 block text-[11px] mb-0.5">Solution Implemented:</strong>
          <p className="text-stone-700">{project.solution}</p>
        </div>
      </div>

      {/* Contribution & Decisions */}
      <div className="p-2.5 bg-amber-50/50 rounded border border-amber-900/10 text-xs font-serif space-y-1.5">
        <div>
          <strong className="font-cinzel text-amber-950 block text-[11px]">Documented Contribution:</strong>
          <p className="text-stone-700 text-[11px] leading-relaxed">{project.contribution}</p>
        </div>
        {project.technicalDecisions && project.technicalDecisions.length > 0 && (
          <div>
            <strong className="font-cinzel text-amber-950 block text-[11px]">Key Technical Decisions:</strong>
            <ul className="list-disc list-inside text-[11px] text-stone-700 space-y-0.5">
              {project.technicalDecisions.map((dec, i) => (
                <li key={i}>{dec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Implementation bullets & Verified Metrics */}
      <div className="space-y-1.5 pt-1">
        <strong className="font-cinzel text-[10px] uppercase tracking-wider text-amber-900 block">
          Verified Implementation & Benchmarks:
        </strong>
        {project.metrics && (
          <div className="flex flex-wrap gap-1.5">
            {project.metrics.map(m => (
              <span key={m} className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-800 border border-stone-200">
                ✓ {m}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-2 border-t border-amber-900/15 flex items-center justify-between text-xs">
        <span className="font-mono text-[10px] text-emerald-800 font-medium">
          Status: {project.status}
        </span>
        <button
          onClick={() => onOpenProjectModal(project)}
          className="font-cinzel text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer interactive-element"
        >
          <span>Deep-Dive Specs</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  // Helper for rendering structured 6-section case studies
  const renderCaseStudyPage = (study: CaseStudy) => (
    <div className="space-y-3">
      <div className="border-b border-amber-900/15 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-cinzel font-bold text-amber-900 uppercase tracking-widest">
            FEATURED CASE STUDY
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold border border-amber-300">
            p. {study.pageNumber}
          </span>
        </div>
        <h3 className="font-cinzel font-bold text-base sm:text-lg text-stone-900 mt-0.5">
          {study.title}
        </h3>
        <p className="text-xs font-garamond italic text-stone-600">
          {study.subtitle}
        </p>
      </div>

      {/* 1. Problem */}
      <div className="p-2.5 bg-white/70 rounded border border-amber-900/10 text-xs font-serif">
        <span className="font-cinzel font-bold text-amber-950 block text-[11px] mb-0.5">
          1. Problem Statement
        </span>
        <p className="text-stone-700 leading-relaxed">{study.problem}</p>
      </div>

      {/* 2. Requirements and Constraints */}
      <div className="p-2.5 bg-white/70 rounded border border-amber-900/10 text-xs font-serif">
        <span className="font-cinzel font-bold text-amber-950 block text-[11px] mb-1">
          2. Requirements & Constraints
        </span>
        <ul className="space-y-1 text-[11px] text-stone-700">
          {study.requirementsAndConstraints.map((rc, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-amber-800 font-bold shrink-0">•</span>
              <span>{rc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Approach and Design Decisions */}
      <div className="p-2.5 bg-white/70 rounded border border-amber-900/10 text-xs font-serif">
        <span className="font-cinzel font-bold text-amber-950 block text-[11px] mb-1">
          3. Approach & Design Decisions
        </span>
        <ul className="space-y-1 text-[11px] text-stone-700">
          {study.approachAndDecisions.map((ad, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-amber-800 font-bold shrink-0">❖</span>
              <span>{ad}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Implementation */}
      <div className="p-2.5 bg-white/70 rounded border border-amber-900/10 text-xs font-serif">
        <span className="font-cinzel font-bold text-amber-950 block text-[11px] mb-1">
          4. Technical Implementation
        </span>
        <ul className="space-y-1 text-[11px] text-stone-700">
          {study.implementation.map((imp, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-amber-800 font-bold shrink-0">→</span>
              <span>{imp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Verified Outcome */}
      <div className="p-2.5 bg-emerald-50/70 rounded border border-emerald-800/20 text-xs font-serif">
        <span className="font-cinzel font-bold text-emerald-950 block text-[11px] mb-1 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>5. Verified Outcome</span>
        </span>
        <ul className="space-y-1 text-[11px] text-emerald-900">
          {study.verifiedOutcome.map((vo, idx) => (
            <li key={idx}>✓ {vo}</li>
          ))}
        </ul>
      </div>

      {/* 6. Potential Future Improvements (clearly distinguished) */}
      <div className="p-2.5 bg-amber-50/70 rounded border border-amber-800/20 text-xs font-serif">
        <span className="font-cinzel font-bold text-amber-950 block text-[11px] mb-1 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
          <span>6. Potential Future Improvements (Roadmap)</span>
        </span>
        <ul className="space-y-1 text-[11px] text-stone-700 italic">
          {study.futureImprovements.map((fi, idx) => (
            <li key={idx}>• {fi}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div 
      className="w-full max-w-6xl mx-auto p-2 sm:p-6 lg:p-8 flex items-center justify-center select-text"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Book Spread Outer Container with 3D Depth & Page Stack */}
      <div className={`relative w-full bg-book-paper text-book-ink rounded-lg shadow-2xl border-t border-b border-amber-950/20 book-shadow-cast flex flex-col md:flex-row overflow-hidden min-h-[740px] lg:min-h-[800px] transition-all duration-300 ${
        turnDirection === 'forward' ? 'page-turn-anim-forward' : turnDirection === 'backward' ? 'page-turn-anim-backward' : ''
      }`}>
        
        {/* =========================================================================
            LEFT PAGE (VERSO) — CLICK TO TURN BACKWARD
            ========================================================================= */}
        <div 
          onClick={handleLeftPageClick}
          className={`relative flex-1 p-6 sm:p-8 lg:p-10 parchment-sheet edge-stack-left flex flex-col justify-between border-b md:border-b-0 md:border-r border-amber-900/15 page-verso-interactive group/left cursor-pointer transition-colors ${
            isSinglePageMode ? 'hidden md:flex' : 'flex'
          }`}
          title={spreadIndex > 1 ? "Click left half to turn backward (Previous page)" : "First interior spread"}
          aria-label="Click left half of the book to turn backward"
        >
          {/* Subtle Left Edge Glow Hover Cue */}
          <div className="page-edge-glow-left" />

          {/* Floating Edge Tooltip Indicator on Hover */}
          {spreadIndex > 1 && (
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/left:opacity-100 transition-all pointer-events-none bg-stone-950/90 text-amber-200 text-[10px] font-cinzel font-bold px-2 py-1 rounded shadow-lg border border-amber-500/40 flex items-center gap-1 z-30 select-none">
              <span>⬅ Previous page</span>
            </div>
          )}
          
          {/* Inner Verso Shadow (Spine Crease) */}
          <div className="absolute inset-y-0 right-0 w-16 page-verso-shadow hidden md:block pointer-events-none" />

          {/* Left Page Running Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-900/20 text-xs font-cinzel text-amber-900 tracking-[0.2em] uppercase select-none">
            <span>THE CURIOUS MINDSCAPE</span>
            <span className="font-mono text-stone-500">SECTION {spreadIndex}</span>
          </div>

          {/* Left Page Content per Spread */}
          <div className="flex-grow book-scroll overflow-y-auto pr-1">
            {spreadIndex === 1 && (
              /* Spread 1: Left Page - Frontispiece & Edition Colophon */
              <div className="space-y-6 text-center py-2">
                <div className="border border-amber-900/20 p-6 rounded bg-stone-50/50 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-book-paper font-cinzel text-[10px] tracking-widest text-amber-900 uppercase">
                    FRONTISPIECE
                  </div>

                  {/* Monogram Seal / Photograph Slot */}
                  <div className="w-24 h-24 mx-auto rounded-full border-2 border-amber-800/40 flex items-center justify-center bg-amber-950/5 my-2 shadow-inner">
                    <span className="font-cinzel text-3xl font-bold text-amber-950 tracking-wider">SRR</span>
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
                      ACADEMIC & SYSTEMS MONOGRAPH • 2024–PRESENT
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
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-950 hover:underline interactive-element"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span>github.com/Rakshana0707</span>
                    </a>
                    <span className="text-stone-400">•</span>
                    <a
                      href={portfolioData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-950 hover:underline interactive-element"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {spreadIndex === 2 && (
              /* Spread 2: Left Page - Table of Contents Overview */
              <div className="space-y-4">
                <div className="text-center pb-2 mb-3 border-b border-amber-900/15">
                  <span className="text-[10px] font-cinzel tracking-[0.25em] text-amber-900 uppercase">
                    READING COMPENDIUM
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    TABLE OF CONTENTS
                  </h3>
                </div>

                <div className="space-y-2">
                  {portfolioData.chapters.map(ch => (
                    <div
                      key={ch.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectChapter(ch.spreadIndex);
                      }}
                      className="flex items-baseline justify-between group cursor-pointer text-xs p-1.5 rounded hover:bg-amber-100/50 transition-colors interactive-element"
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
                  Tip: Click the <strong>left half</strong> of the book to advance forward, or the <strong>right half</strong> to reverse backward.
                </div>
              </div>
            )}

            {spreadIndex === 3 && (
              /* Spread 3: Left Page - Chapter I: GlobalPulse */
              <div>
                {renderProjectPage(portfolioData.projects.find(p => p.id === 'globalpulse')!)}
              </div>
            )}

            {spreadIndex === 4 && (
              /* Spread 4: Left Page - Chapter II: Zyatra */
              <div>
                {renderProjectPage(portfolioData.projects.find(p => p.id === 'zyatra')!)}
              </div>
            )}

            {spreadIndex === 5 && (
              /* Spread 5: Left Page - Chapter III: ContextIQ */
              <div>
                {renderProjectPage(portfolioData.projects.find(p => p.id === 'contextiq')!)}
              </div>
            )}

            {spreadIndex === 6 && (
              /* Spread 6: Left Page - Chapter IV: SkillSync */
              <div>
                {renderProjectPage(portfolioData.projects.find(p => p.id === 'skillsync')!)}
              </div>
            )}

            {spreadIndex === 7 && (
              /* Spread 7: Left Page - Chapter V: Featured Case Study 1: Grainly */
              <div>
                {renderCaseStudyPage(portfolioData.caseStudies[0])}
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
              /* Spread 9: Left Page - Chapter VII: Final Contact Closing Message & Coordinates */
              <div className="space-y-4">
                <div className="mb-2">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CHAPTER VII • FINAL CONTACT SPREAD
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Closing Message & Coordinates
                  </h3>
                </div>

                <div className="p-4 bg-white/80 rounded border border-amber-900/15 space-y-3 text-xs font-serif text-stone-800">
                  <p className="font-garamond italic text-sm text-stone-700 leading-relaxed">
                    "{portfolioData.personal.closingMessage}"
                  </p>

                  <div className="pt-3 border-t border-amber-900/10 space-y-2">
                    <div className="space-y-0.5">
                      <h4 className="font-cinzel font-bold text-stone-900 text-sm">
                        {portfolioData.personal.name}
                      </h4>
                      <p className="text-stone-600 font-serif">
                        Integrated MSc Software Systems • CIT
                      </p>
                      <p className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-800" />
                        <span>{portfolioData.personal.location}</span>
                      </p>
                    </div>

                    <div className="pt-2 space-y-2">
                      <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors interactive-element"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-800" />
                        <span>{portfolioData.personal.email}</span>
                      </a>

                      <a
                        href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors interactive-element"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-800" />
                        <span>{portfolioData.personal.phone}</span>
                      </a>

                      <a
                        href={portfolioData.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors interactive-element"
                      >
                        <GitHubIcon className="w-3.5 h-3.5 text-amber-800" />
                        <span>github.com/Rakshana0707</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>

                      <a
                        href={portfolioData.personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors interactive-element"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5 text-amber-800" />
                        <span>linkedin.com/in/shiv-rakshana-ravikumar</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Audit trigger */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPdfAudit();
                  }}
                  className="p-3 bg-amber-50/80 rounded border border-amber-900/20 cursor-pointer hover:bg-amber-100/70 transition-colors flex items-center justify-between interactive-element"
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
            <span className="font-bold">p. {leftPageNum}</span>
            <span 
              onClick={(e) => {
                e.stopPropagation();
                if (spreadIndex > 1) onTurnPageBackward();
              }}
              className={`flex items-center gap-1 font-cinzel text-[11px] font-semibold interactive-element ${
                spreadIndex > 1 ? 'hover:text-amber-900 cursor-pointer' : 'opacity-40 cursor-default'
              }`}
              title="Turn backward to previous spread"
            >
              ◀ Previous Page
            </span>
          </div>

        </div>


        {/* =========================================================================
            CENTER SPINE BINDING CREASE (DESKTOP)
            ========================================================================= */}
        <div className="hidden md:flex w-6 bg-gradient-to-r from-stone-400/20 via-stone-800/20 to-stone-400/20 shadow-inner shrink-0 relative items-center justify-center pointer-events-none">
          <div className="w-[1px] h-full bg-amber-900/20" />
        </div>


        {/* =========================================================================
            RIGHT PAGE (RECTO) — CLICK TO TURN FORWARD
            ========================================================================= */}
        <div 
          onClick={handleRightPageClick}
          className="relative flex-1 p-6 sm:p-8 lg:p-10 parchment-sheet edge-stack-right flex flex-col justify-between page-recto-interactive group/right cursor-pointer transition-colors"
          title={spreadIndex < totalInteriorSpreads ? "Click right half to turn forward (Next page)" : "Final interior spread"}
          aria-label="Click right half of the book to advance forward"
        >
          {/* Subtle Right Edge Glow Hover Cue */}
          <div className="page-edge-glow-right" />

          {/* Floating Edge Tooltip Indicator on Hover */}
          {spreadIndex < totalInteriorSpreads && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/right:opacity-100 transition-all pointer-events-none bg-stone-950/90 text-amber-200 text-[10px] font-cinzel font-bold px-2 py-1 rounded shadow-lg border border-amber-500/40 flex items-center gap-1 z-30 select-none">
              <span>Next page ➔</span>
            </div>
          )}

          {/* Inner Recto Shadow (Spine Crease) */}
          <div className="absolute inset-y-0 left-0 w-16 page-recto-shadow hidden md:block pointer-events-none" />

          {/* Right Page Running Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-900/20 text-xs font-cinzel text-amber-900 tracking-[0.2em] uppercase select-none">
            <span className="font-mono text-stone-500">PAGE {rightPageNum}</span>
            <span>{chapter.title}</span>
          </div>

          {/* Right Page Content per Spread */}
          <div className="flex-grow book-scroll overflow-y-auto pl-1">
            {spreadIndex === 1 && (
              /* Spread 1: Right Page - Synopsis & Education */
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    SYNOPSIS
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900 mb-2">
                    Professional Introduction
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
                {renderProjectPage(portfolioData.projects.find(p => p.id === 'campcon')!)}
              </div>
            )}

            {spreadIndex === 4 && (
              /* Spread 4: Right Page - Chapter II: CivicLensTN */
              <div>
                {renderProjectPage(portfolioData.projects.find(p => p.id === 'civiclenstn')!)}
              </div>
            )}

            {spreadIndex === 5 && (
              /* Spread 5: Right Page - Chapter III: MicroDelay */
              <div>
                {renderProjectPage(portfolioData.projects.find(p => p.id === 'microdelay')!)}
              </div>
            )}

            {spreadIndex === 6 && (
              /* Spread 6: Right Page - Chapter IV: LifeLink */
              <div>
                {renderProjectPage(portfolioData.projects.find(p => p.id === 'lifelink')!)}
              </div>
            )}

            {spreadIndex === 7 && (
              /* Spread 7: Right Page - Chapter V: Featured Case Study 2: MicroDelay */
              <div>
                {renderCaseStudyPage(portfolioData.caseStudies[1])}
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
                <div className="mb-2">
                  <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                    CORRESPONDENCE TERMINAL
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900">
                    Direct Email Dispatch
                  </h3>
                </div>
                <div className="interactive-element">
                  <ContactBookForm />
                </div>
              </div>
            )}
          </div>

          {/* Right Page Running Footer */}
          <div className="flex items-center justify-between pt-3 mt-4 border-t border-amber-900/15 text-xs font-mono text-stone-600 select-none">
            <span 
              onClick={(e) => {
                e.stopPropagation();
                if (spreadIndex < totalInteriorSpreads) onTurnPageForward();
              }}
              className={`flex items-center gap-1 font-cinzel text-[11px] font-semibold interactive-element ${
                spreadIndex < totalInteriorSpreads ? 'hover:text-amber-900 cursor-pointer' : 'opacity-40 cursor-default'
              }`}
              title="Turn forward to next spread"
            >
              Next Page ▶
            </span>
            <span className="font-bold">p. {rightPageNum}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
