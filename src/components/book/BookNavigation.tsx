import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Columns, 
  Square,
  Home,
  Bookmark,
  BookMarked,
  Mic,
  MicOff,
  Headphones
} from 'lucide-react';

interface BookNavigationProps {
  currentSpread: number; // 0 = Cover, 1..8 = Interior Spreads 1-8, 9 = Back Cover
  totalSpreads: number;
  onNavigateSpread: (index: number) => void;
  onOpenTableOfContents: () => void;
  onOpenPdfAudit: () => void;
  isSinglePageMode: boolean;
  onToggleSinglePageMode: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isNarrating: boolean;
  onToggleNarrator: () => void;
}

export const BookNavigation: React.FC<BookNavigationProps> = ({
  currentSpread,
  totalSpreads,
  onNavigateSpread,
  onOpenTableOfContents,
  onOpenPdfAudit,
  isSinglePageMode,
  onToggleSinglePageMode,
  isMuted,
  onToggleMute,
  isNarrating,
  onToggleNarrator,
}) => {
  const isCover = currentSpread === 0;
  const isBack = currentSpread === totalSpreads + 1;

  // Navigation handlers
  const handleGoFrontCover = () => {
    onNavigateSpread(0);
  };

  const handleGoBackCover = () => {
    onNavigateSpread(totalSpreads + 1);
  };

  const handlePrevPage = () => {
    if (currentSpread > 0) {
      onNavigateSpread(currentSpread - 1);
    }
  };

  const handleNextPage = () => {
    if (currentSpread < totalSpreads + 1) {
      onNavigateSpread(currentSpread + 1);
    }
  };

  return (
    <>
      {/* =========================================================================
          PERSISTENT TOP RECRUITER NAVIGATION BAR & BOOK TOOLBAR
          ========================================================================= */}
      <header 
        aria-label="Book Navigation Header"
        className="fixed top-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-amber-900/35 px-3 sm:px-6 py-2 flex items-center justify-between text-stone-200 shadow-md"
      >
        {/* Left: Book Title & Monogram */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleGoFrontCover}
            className="flex items-center gap-2 text-left group cursor-pointer"
            title="Return to Front Cover"
            aria-label="Return to Front Cover"
          >
            <div className="w-7 h-7 rounded border border-amber-400/40 bg-amber-950/40 flex items-center justify-center text-[10px] font-cinzel font-bold text-amber-200 group-hover:border-amber-400 transition-colors">
              SRR
            </div>
            <div className="hidden sm:block">
              <span className="font-cinzel text-xs font-bold text-amber-100 tracking-wider block leading-tight">
                THE CURIOUS MINDSCAPE
              </span>
              <span className="text-[10px] font-garamond italic text-stone-400 block leading-tight">
                {portfolioData.personal.name} • CIT
              </span>
            </div>
          </button>
        </div>

        {/* Center: Core Persistent Controls Suite (Front Cover, Contents, Prev, Next, Back Cover) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* 1. Front Cover Button */}
          <button
            onClick={handleGoFrontCover}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-cinzel tracking-wider transition-all cursor-pointer ${
              isCover
                ? 'bg-amber-950/90 border-amber-400 text-amber-200 shadow-sm'
                : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-700/60 text-stone-300 hover:text-amber-200'
            }`}
            title="Return directly to Front Cover"
            aria-label="Front Cover"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline font-semibold">Front Cover</span>
            <span className="md:hidden font-semibold">Cover</span>
          </button>

          {/* 2. Contents Button */}
          <button
            onClick={onOpenTableOfContents}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 hover:border-amber-400 text-amber-200 hover:text-amber-100 font-cinzel text-xs font-bold tracking-wider shadow-sm transition-all cursor-pointer"
            title="Open Table of Contents (Index)"
            aria-label="Table of Contents"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>Contents</span>
          </button>

          {/* 3. Previous Page Button */}
          <button
            onClick={handlePrevPage}
            disabled={isCover}
            className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none border border-zinc-700/60 text-stone-300 hover:text-amber-200 font-cinzel text-xs transition-colors cursor-pointer"
            title="Turn backward one page / spread"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden lg:inline">Prev</span>
          </button>

          {/* 4. Next Page Button */}
          <button
            onClick={handleNextPage}
            disabled={isBack}
            className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none border border-zinc-700/60 text-stone-300 hover:text-amber-200 font-cinzel text-xs transition-colors cursor-pointer"
            title="Turn forward one page / spread"
            aria-label="Next Page"
          >
            <span className="hidden lg:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
          </button>

          {/* 5. Back Cover Button */}
          <button
            onClick={handleGoBackCover}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-cinzel tracking-wider transition-all cursor-pointer ${
              isBack
                ? 'bg-amber-950/90 border-amber-400 text-amber-200 shadow-sm'
                : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-700/60 text-stone-300 hover:text-amber-200'
            }`}
            title="Navigate directly to Back Cover"
            aria-label="Back Cover"
          >
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline font-semibold">Back Cover</span>
            <span className="md:hidden font-semibold">Back</span>
          </button>
        </div>

        {/* Right: Audio Narration, Sound, View Mode & Audit Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio Recite / Auto-Read Voice Toggle */}
          <button
            onClick={onToggleNarrator}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-cinzel transition-all cursor-pointer ${
              isNarrating
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm animate-pulse'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-stone-300 hover:text-amber-200'
            }`}
            title={isNarrating ? 'Stop Auto-Recite Narration' : 'Start Auto-Recite: Read page aloud and auto-turn'}
            aria-label="Toggle Auto-Recite Voice Narration"
          >
            {isNarrating ? (
              <>
                <Headphones className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span className="hidden sm:inline font-semibold">Reading Aloud...</span>
              </>
            ) : (
              <>
                <Headphones className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Read Aloud</span>
              </>
            )}
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
            title={isMuted ? 'Turn Page Flip Sound ON' : 'Mute Sound'}
            aria-label="Toggle Page Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Spread / Single-Page Mode Toggle */}
          <button
            onClick={onToggleSinglePageMode}
            className="hidden md:flex p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
            title={isSinglePageMode ? 'Switch to Two-Page Spread' : 'Switch to Single-Page Focus'}
            aria-label="Toggle View Mode"
          >
            {isSinglePageMode ? <Columns className="w-4 h-4 text-stone-300" /> : <Square className="w-4 h-4 text-stone-300" />}
          </button>

          {/* Audit Verification Trigger */}
          <button
            onClick={onOpenPdfAudit}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-stone-300 hover:text-emerald-300 transition-colors cursor-pointer"
            title="Verify against Source PDFs"
            aria-label="Audit Resume PDFs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-[11px]">Audit</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          PERSISTENT FLOATING BOTTOM TOOLBAR
          ========================================================================= */}
      <nav 
        aria-label="Persistent Book Toolbar"
        className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2.5 px-3 py-2 bg-stone-950/95 backdrop-blur-md border border-amber-500/30 rounded-xl shadow-2xl text-stone-200"
      >
        {/* Front Cover Button */}
        <button
          onClick={handleGoFrontCover}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors cursor-pointer ${
            isCover ? 'bg-amber-950 text-amber-300 font-bold' : 'hover:bg-zinc-800 text-stone-400 hover:text-stone-200'
          }`}
          title="Return to Front Cover"
          aria-label="Go to Front Cover"
        >
          <Home className="w-4 h-4" />
          <span className="text-[11px] font-cinzel hidden sm:inline">Cover</span>
        </button>

        <div className="h-4 w-[1px] bg-zinc-800" />

        {/* Previous Page Button */}
        <button
          onClick={handlePrevPage}
          disabled={isCover}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-xs font-cinzel text-amber-200"
          title="Turn backward one page / spread"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Current State / Spread Indicator */}
        <div className="px-3 py-0.5 text-center min-w-[130px] sm:min-w-[170px] select-none">
          {isCover ? (
            <span className="text-xs font-cinzel font-bold text-amber-300 tracking-wider">
              CLOSED FRONT COVER
            </span>
          ) : isBack ? (
            <span className="text-xs font-cinzel font-bold text-amber-300 tracking-wider">
              CLOSED BACK COVER
            </span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-cinzel font-bold text-amber-200 tracking-wide">
                Pages {currentSpread * 2 - 1} & {currentSpread * 2} of {totalSpreads * 2}
              </span>
              <span className="text-[9px] font-mono text-stone-400">
                Spread {currentSpread} of {totalSpreads}
              </span>
            </div>
          )}
        </div>

        {/* Next Page Button */}
        <button
          onClick={handleNextPage}
          disabled={isBack}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-xs font-cinzel text-amber-200"
          title="Turn forward one page / spread"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-zinc-800" />

        {/* Contents Trigger */}
        <button
          onClick={onOpenTableOfContents}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-zinc-800 text-stone-300 hover:text-amber-200 transition-colors cursor-pointer"
          title="Open Table of Contents"
          aria-label="Open Table of Contents"
        >
          <Bookmark className="w-4 h-4 text-amber-400" />
          <span className="text-[11px] font-cinzel hidden sm:inline">Index</span>
        </button>

        <div className="h-4 w-[1px] bg-zinc-800" />

        {/* Read Aloud / Auto-Recite Trigger */}
        <button
          onClick={onToggleNarrator}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors cursor-pointer ${
            isNarrating ? 'bg-amber-950 text-amber-300 font-bold animate-pulse' : 'hover:bg-zinc-800 text-stone-300 hover:text-amber-200'
          }`}
          title={isNarrating ? 'Stop Auto-Recite Narration' : 'Read Page Aloud & Auto-Turn'}
          aria-label="Read Aloud Voice Narration"
        >
          <Headphones className={`w-4 h-4 ${isNarrating ? 'text-amber-400 animate-bounce' : 'text-stone-400'}`} />
          <span className="text-[11px] font-cinzel hidden sm:inline">{isNarrating ? 'Reading...' : 'Recite'}</span>
        </button>

        <div className="h-4 w-[1px] bg-zinc-800" />

        {/* Back Cover Button */}
        <button
          onClick={handleGoBackCover}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors cursor-pointer ${
            isBack ? 'bg-amber-950 text-amber-300 font-bold' : 'hover:bg-zinc-800 text-stone-400 hover:text-stone-200'
          }`}
          title="Navigate directly to Back Cover"
          aria-label="Go to Back Cover"
        >
          <BookMarked className="w-4 h-4" />
          <span className="text-[11px] font-cinzel hidden sm:inline">Back</span>
        </button>
      </nav>
    </>
  );
};
