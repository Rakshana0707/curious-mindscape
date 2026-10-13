import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { portfolioData, Project } from '../../data/portfolioData';
import { ContactBookForm } from './ContactBookForm';
import { bookAudio } from '../../utils/audioUtils';
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
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../BrandIcons';

export interface BookSpreadHandle {
  flipNext: () => void;
  flipPrev: () => void;
  flipToSpread: (spreadIndex: number) => void;
}

interface BookSpreadProps {
  spreadIndex: number; // 1 to 9
  onOpenProjectModal: (project: Project) => void;
  onSelectChapter: (spreadIndex: number) => void;
  onOpenPdfAudit: () => void;
  onSpreadChange: (newSpreadIndex: number) => void;
  onTurnPageForward: () => void;
  onTurnPageBackward: () => void;
  isSinglePageMode: boolean;
}

export const BookSpread = forwardRef<BookSpreadHandle, BookSpreadProps>(({
  spreadIndex,
  onOpenProjectModal,
  onSelectChapter,
  onOpenPdfAudit,
  onSpreadChange,
  onTurnPageForward,
  onTurnPageBackward,
  isSinglePageMode,
}, ref) => {
  const flipBookRef = useRef<any>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const totalInteriorSpreads = 8;
  const totalPages = 16;

  // Track viewport size and reduced-motion preference
  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);
    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const isPortraitMode = isSinglePageMode || isMobileViewport;

  // Trigger physical page turn Forward (next page/spread)
  const triggerPhysicalNext = useCallback(() => {
    if (isFlipping) return;
    const pf = flipBookRef.current?.pageFlip?.();
    if (!pf) {
      onTurnPageForward();
      return;
    }
    const currentPageIdx = pf.getCurrentPageIndex();
    const maxPageIdx = isPortraitMode ? totalPages - 1 : totalPages - 2;

    if (currentPageIdx < maxPageIdx) {
      bookAudio.playPageTurn();
      if (prefersReducedMotion) {
        const nextIdx = isPortraitMode ? currentPageIdx + 1 : currentPageIdx + 2;
        pf.turnToPage(nextIdx);
        onSpreadChange(Math.floor(nextIdx / 2) + 1);
      } else {
        pf.flipNext('top');
      }
    }
  }, [isFlipping, isPortraitMode, prefersReducedMotion, onTurnPageForward, onSpreadChange]);

  // Trigger physical page turn Backward (previous page/spread)
  const triggerPhysicalPrev = useCallback(() => {
    if (isFlipping) return;
    const pf = flipBookRef.current?.pageFlip?.();
    if (!pf) {
      onTurnPageBackward();
      return;
    }
    const currentPageIdx = pf.getCurrentPageIndex();

    if (currentPageIdx > 0) {
      bookAudio.playPageTurn();
      if (prefersReducedMotion) {
        const prevIdx = Math.max(0, isPortraitMode ? currentPageIdx - 1 : currentPageIdx - 2);
        pf.turnToPage(prevIdx);
        onSpreadChange(Math.floor(prevIdx / 2) + 1);
      } else {
        pf.flipPrev('top');
      }
    }
  }, [isFlipping, isPortraitMode, prefersReducedMotion, onTurnPageBackward, onSpreadChange]);

  // Trigger jump or animated flip to specific spread (1..9)
  const triggerFlipToSpread = useCallback((targetSpread: number) => {
    const targetPageIndex = Math.max(0, Math.min(totalPages - 2, (targetSpread - 1) * 2));
    const pf = flipBookRef.current?.pageFlip?.();
    if (!pf) {
      onSpreadChange(targetSpread);
      return;
    }
    const currentPageIdx = pf.getCurrentPageIndex();
    if (currentPageIdx === targetPageIndex) return;

    bookAudio.playPageTurn();
    if (prefersReducedMotion) {
      pf.turnToPage(targetPageIndex);
      onSpreadChange(targetSpread);
    } else {
      pf.flip(targetPageIndex, 'top');
    }
  }, [prefersReducedMotion, onSpreadChange]);

  useImperativeHandle(ref, () => ({
    flipNext: triggerPhysicalNext,
    flipPrev: triggerPhysicalPrev,
    flipToSpread: triggerFlipToSpread,
  }), [triggerPhysicalNext, triggerPhysicalPrev, triggerFlipToSpread]);

  // Keep flipbook synchronized if parent spreadIndex changes externally (e.g. from TOC modal)
  useEffect(() => {
    const pf = flipBookRef.current?.pageFlip?.();
    if (!pf || isFlipping) return;
    const currentPageIdx = pf.getCurrentPageIndex();
    const currentCalculatedSpread = Math.floor(currentPageIdx / 2) + 1;
    if (currentCalculatedSpread !== spreadIndex) {
      const targetPageIndex = (spreadIndex - 1) * 2;
      if (prefersReducedMotion) {
        pf.turnToPage(targetPageIndex);
      } else {
        pf.flip(targetPageIndex, 'top');
      }
    }
  }, [spreadIndex, isFlipping, prefersReducedMotion]);

  // Touch swipe tracking refs for mobile/tablet
  const touchStartRef = useRef<{ x: number; y: number; isInteractive: boolean }>({
    x: 0,
    y: 0,
    isInteractive: false,
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = Boolean(
      target.closest('button, a, input, textarea, select, [role="button"], label, .interactive-element')
    );
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      isInteractive,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current.isInteractive || isFlipping) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        triggerPhysicalNext();
      } else if (deltaX > 0) {
        triggerPhysicalPrev();
      }
    }
  };

  // Position-based Click Rules:
  // Clicking the LEFT half of the open book -> Turns BACKWARD to the PREVIOUS page or spread
  // Clicking the RIGHT half of the open book -> Turns FORWARD to the NEXT page or spread
  const isInteractiveClickOrSelection = (e: React.MouseEvent): boolean => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) return true;

    const target = e.target as HTMLElement;
    if (
      target.closest(
        'button, a, input, textarea, select, [role="button"], label, .interactive-element'
      )
    ) {
      return true;
    }
    return false;
  };

  const handleLeftHalfClick = (e: React.MouseEvent) => {
    if (isInteractiveClickOrSelection(e) || isFlipping) return;
    triggerPhysicalPrev();
  };

  const handleRightHalfClick = (e: React.MouseEvent) => {
    if (isInteractiveClickOrSelection(e) || isFlipping) return;
    triggerPhysicalNext();
  };

  // Single-page mode click handler: left half of single page moves previous, right half advances next
  const handleSinglePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isInteractiveClickOrSelection(e) || isFlipping) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      triggerPhysicalPrev();
    } else {
      triggerPhysicalNext();
    }
  };

  // Helper for rendering project cards inside project chapters
  const renderProjectPage = (project: Project) => (
    <div className="space-y-3">
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
          onClick={(e) => {
            e.stopPropagation();
            onOpenProjectModal(project);
          }}
          className="font-cinzel text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer interactive-element"
        >
          <span>Deep-Dive Specs</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  // Render content for a specific 1-indexed page number (1 to 16)
  const renderPageContent = (pageNum: number) => {
    switch (pageNum) {
      case 1:
        /* Page 1 (Spread 1 Left): Frontispiece & Edition Colophon */
        return (
          <div className="space-y-5 text-center py-1">
            <div className="border border-amber-900/20 p-5 rounded bg-stone-50/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-book-paper font-cinzel text-[10px] tracking-widest text-amber-900 uppercase">
                FRONTISPIECE
              </div>

              <div className="w-20 h-20 mx-auto rounded-full border-2 border-amber-800/40 flex items-center justify-center bg-amber-950/5 my-2 shadow-inner">
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

              <div className="my-3 ornamental-rule">
                <span>❖</span>
              </div>

              <div className="space-y-2 text-xs font-serif text-stone-700 text-left bg-white/70 p-3.5 rounded border border-amber-900/10">
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

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-amber-900/10">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-950 hover:underline interactive-element"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        );

      case 2:
        /* Page 2 (Spread 1 Right): Synopsis & Education */
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                SYNOPSIS
              </span>
              <h3 className="font-cinzel text-xl font-bold text-stone-900 mb-2">
                Professional Introduction
              </h3>
              <div className="text-xs sm:text-sm font-serif text-stone-800 leading-relaxed text-justify">
                <span className="drop-cap">S</span>
                <span>{portfolioData.personal.executiveSummary}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                ACADEMIC FOUNDATION
              </span>
              <h3 className="font-cinzel text-lg font-bold text-stone-900 mb-2">
                Education & Credentials
              </h3>

              <div className="space-y-2.5">
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
        );

      case 3:
        /* Page 3 (Spread 2 Left): Table of Contents */
        return (
          <div className="space-y-3">
            <div className="text-center pb-2 mb-2 border-b border-amber-900/15">
              <span className="text-[10px] font-cinzel tracking-[0.25em] text-amber-900 uppercase">
                READING COMPENDIUM
              </span>
              <h3 className="font-cinzel text-xl font-bold text-stone-900">
                TABLE OF CONTENTS
              </h3>
            </div>

            <div className="space-y-1.5">
              {portfolioData.chapters.map(ch => (
                <div
                  key={ch.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFlipToSpread(ch.spreadIndex);
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

            <div className="mt-3 p-3 bg-amber-50/60 rounded border border-amber-900/10 text-xs font-garamond italic text-stone-700">
              Tip: Click the <strong>left half</strong> of the open book to return to the previous spread, or the <strong>right half</strong> to advance to the next spread.
            </div>
          </div>
        );

      case 4:
        /* Page 4 (Spread 2 Right): Technical Skills & Taxonomy */
        return (
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                COMPETENCY TAXONOMY
              </span>
              <h3 className="font-cinzel text-xl font-bold text-stone-900 mb-1.5">
                Technical Disciplines
              </h3>
            </div>

            <div className="space-y-2 text-xs">
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
        );

      case 5:
        return renderProjectPage(portfolioData.projects.find(p => p.id === 'globalpulse')!);
      case 6:
        return renderProjectPage(portfolioData.projects.find(p => p.id === 'campcon')!);
      case 7:
        return renderProjectPage(portfolioData.projects.find(p => p.id === 'zyatra')!);
      case 8:
        return renderProjectPage(portfolioData.projects.find(p => p.id === 'civiclenstn')!);
      case 9:
        return renderProjectPage(portfolioData.projects.find(p => p.id === 'contextiq')!);
      case 10:
        return renderProjectPage(portfolioData.projects.find(p => p.id === 'microdelay')!);
      case 11:
        return renderProjectPage(portfolioData.projects.find(p => p.id === 'skillsync')!);
      case 12:
        return renderProjectPage(portfolioData.projects.find(p => p.id === 'lifelink')!);

      case 13:
        /* Page 13 (Spread 7 Left): Hackathons & Honors */
        return (
          <div className="space-y-4">
            <div className="mb-2">
              <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                CHAPTER V • TRACK RECORD & HONORS
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
        );

      case 14:
        /* Page 14 (Spread 7 Right): Leadership & Certifications */
        return (
          <div className="space-y-4">
            <div className="mb-2">
              <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                CHAPTER V • COMMUNITY & RECOGNITION
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
        );

      case 15:
        /* Page 15 (Spread 8 Left): Closing Message & Coordinates */
        return (
          <div className="space-y-4">
            <div className="mb-2">
              <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                CHAPTER VI • FINAL CONTACT SPREAD
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
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors interactive-element"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-800" />
                    <span>{portfolioData.personal.email}</span>
                  </a>

                  <a
                    href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors interactive-element"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-800" />
                    <span>{portfolioData.personal.phone}</span>
                  </a>

                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-stone-800 hover:text-amber-900 font-mono transition-colors interactive-element"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-amber-800" />
                    <span>linkedin.com/in/shiv-rakshana-ravikumar</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>
                </div>
              </div>
            </div>

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
        );

      case 16:
        /* Page 16 (Spread 8 Right): Working Contact Form */
        return (
          <div>
            <div className="mb-2">
              <span className="text-[10px] font-cinzel text-amber-900 uppercase tracking-widest font-semibold">
                CORRESPONDENCE TERMINAL
              </span>
              <h3 className="font-cinzel text-xl font-bold text-stone-900">
                Direct Email Dispatch
              </h3>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="interactive-element"
            >
              <ContactBookForm />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const allPageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className="w-full max-w-6xl mx-auto p-1 sm:p-4 lg:p-6 flex items-center justify-center select-text"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Physical Open Hardcover Book Binding Frame */}
      <div className="book-open-binding-frame w-full">
        {/* Center Spine Crease Overlay for 2-Page Desktop Spread */}
        {!isPortraitMode && <div className="book-center-spine-overlay hidden md:block" />}

        {/* Dedicated 3D Page-Flip Engine (st-pageflip via react-pageflip) */}
        <HTMLFlipBook
          key={isPortraitMode ? 'portrait-book' : 'landscape-book'}
          ref={flipBookRef}
          width={550}
          height={760}
          size="stretch"
          minWidth={290}
          maxWidth={600}
          minHeight={640}
          maxHeight={860}
          drawShadow={true}
          maxShadowOpacity={0.65}
          showCover={false}
          usePortrait={isPortraitMode}
          startPage={(spreadIndex - 1) * 2}
          flippingTime={prefersReducedMotion ? 50 : 750}
          useMouseEvents={false}
          disableFlipByClick={true}
          showPageCorners={false}
          clickEventForward={true}
          mobileScrollSupport={true}
          swipeDistance={30}
          startZIndex={0}
          autoSize={true}
          className="mx-auto"
          style={{}}
          onFlip={(e: any) => {
            const newPageIndex = typeof e.data === 'number' ? e.data : 0;
            const computedSpread = Math.floor(newPageIndex / 2) + 1;
            if (computedSpread >= 1 && computedSpread <= totalInteriorSpreads) {
              onSpreadChange(computedSpread);
            }
          }}
          onChangeState={(e: any) => {
            setIsFlipping(e.data === 'flipping');
          }}
        >
          {allPageNumbers.map((pageNum) => {
            const isLeftPage = pageNum % 2 === 1;
            const pageSpreadIdx = Math.ceil(pageNum / 2);
            const pageChapter =
              portfolioData.chapters.find((c) => c.spreadIndex === pageSpreadIdx) ||
              portfolioData.chapters[0];

            return (
              <div
                key={pageNum}
                className="parchment-sheet h-full w-full"
              >
                <div
                  onClick={
                    isPortraitMode
                      ? handleSinglePageClick
                      : isLeftPage
                      ? handleLeftHalfClick
                      : handleRightHalfClick
                  }
                  className={`relative w-full h-full p-5 sm:p-7 lg:p-8 flex flex-col justify-between cursor-pointer select-text ${
                    isLeftPage
                      ? 'page-verso-interactive group/left'
                      : 'page-recto-interactive group/right'
                  }`}
                  title={
                    isLeftPage
                      ? pageSpreadIdx > 1
                        ? 'Click left half to turn backward (Previous page)'
                        : 'First interior spread'
                      : pageSpreadIdx < totalInteriorSpreads
                      ? 'Click right half to turn forward (Next page)'
                      : 'Final interior spread'
                  }
                  aria-label={
                    isLeftPage
                      ? 'Click left half of the open book to move to the previous page'
                      : 'Click right half of the open book to advance to the next page'
                  }
                >
                  {/* Subtle Edge Glow Hover Cue */}
                  {isLeftPage ? (
                    <div className="page-edge-glow-left" />
                  ) : (
                    <div className="page-edge-glow-right" />
                  )}

                  {/* Floating Edge Tooltip Indicator on Hover */}
                  {isLeftPage && pageSpreadIdx > 1 && (
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/left:opacity-100 transition-all pointer-events-none bg-stone-950/90 text-amber-200 text-[10px] font-cinzel font-bold px-2 py-1 rounded shadow-lg border border-amber-500/40 flex items-center gap-1 z-30 select-none">
                      <span>⬅ Previous page</span>
                    </div>
                  )}

                  {!isLeftPage && pageSpreadIdx < totalInteriorSpreads && (
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/right:opacity-100 transition-all pointer-events-none bg-stone-950/90 text-amber-200 text-[10px] font-cinzel font-bold px-2 py-1 rounded shadow-lg border border-amber-500/40 flex items-center gap-1 z-30 select-none">
                      <span>Next page ➔</span>
                    </div>
                  )}

                  {/* Spine Inner Crease Shadow */}
                  {isLeftPage ? (
                    <div className="absolute inset-y-0 right-0 w-14 page-verso-shadow hidden md:block pointer-events-none" />
                  ) : (
                    <div className="absolute inset-y-0 left-0 w-14 page-recto-shadow hidden md:block pointer-events-none" />
                  )}

                  {/* Page Running Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-amber-900/20 text-[11px] font-cinzel text-amber-900 tracking-[0.18em] uppercase select-none shrink-0">
                    {isLeftPage ? (
                      <>
                        <span>THE CURIOUS MINDSCAPE</span>
                        <span className="font-mono text-stone-500">SECTION {pageSpreadIdx}</span>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-stone-500">PAGE {pageNum}</span>
                        <span className="truncate max-w-[200px]">{pageChapter.title}</span>
                      </>
                    )}
                  </div>

                  {/* Page Body Content */}
                  <div className="flex-grow book-scroll overflow-y-auto pr-1">
                    {renderPageContent(pageNum)}
                  </div>

                  {/* Page Running Footer */}
                  <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-amber-900/15 text-xs font-mono text-stone-600 select-none shrink-0">
                    {isLeftPage ? (
                      <>
                        <span className="font-bold">p. {pageNum}</span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            if (pageSpreadIdx > 1) triggerPhysicalPrev();
                          }}
                          className={`flex items-center gap-1 font-cinzel text-[11px] font-semibold interactive-element ${
                            pageSpreadIdx > 1
                              ? 'hover:text-amber-900 cursor-pointer'
                              : 'opacity-40 cursor-default'
                          }`}
                          title="Turn backward to previous spread"
                        >
                          ◀ Previous Page
                        </span>
                      </>
                    ) : (
                      <>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            if (pageSpreadIdx < totalInteriorSpreads) triggerPhysicalNext();
                          }}
                          className={`flex items-center gap-1 font-cinzel text-[11px] font-semibold interactive-element ${
                            pageSpreadIdx < totalInteriorSpreads
                              ? 'hover:text-amber-900 cursor-pointer'
                              : 'opacity-40 cursor-default'
                          }`}
                          title="Turn forward to next spread"
                        >
                          Next Page ▶
                        </span>
                        <span className="font-bold">p. {pageNum}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </HTMLFlipBook>
      </div>
    </div>
  );
});
