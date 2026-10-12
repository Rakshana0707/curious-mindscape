import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { bookAudio } from '../../utils/audioUtils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  ListOrdered, 
  ShieldCheck, 
  Columns, 
  Square,
  Home,
  Bookmark,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface BookNavigationProps {
  currentSpread: number; // 0 = Cover, 1..9 = Spreads 1-9, 10 = Back Cover
  totalSpreads: number;
  onNavigateSpread: (index: number) => void;
  onOpenTableOfContents: () => void;
  onOpenPdfAudit: () => void;
  isSinglePageMode: boolean;
  onToggleSinglePageMode: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
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
}) => {
  const isCover = currentSpread === 0;
  const isBack = currentSpread === totalSpreads + 1;

  const handlePrev = () => {
    if (currentSpread > 0) {
      bookAudio.playPageTurn();
      onNavigateSpread(currentSpread - 1);
    }
  };

  const handleNext = () => {
    if (currentSpread < totalSpreads + 1) {
      bookAudio.playPageTurn();
      onNavigateSpread(currentSpread + 1);
    }
  };

  return (
    <>
      {/* =========================================================================
          PERSISTENT TOP RECRUITER NAVIGATION BAR
          ========================================================================= */}
      <header 
        aria-label="Book Header Navigation"
        className="fixed top-0 left-0 right-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/30 px-3 sm:px-6 py-2 flex items-center justify-between text-stone-200"
      >
        {/* Left: Book Branding */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(0); }}
            className="flex items-center gap-2 text-left group cursor-pointer"
            title="Return to Front Hardcover"
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

        {/* Center: Recruiter Quick Jump Pathway */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Prominent Contents Control */}
          <button
            onClick={onOpenTableOfContents}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 hover:border-amber-400 text-amber-200 hover:text-amber-100 font-cinzel text-xs font-bold tracking-wider shadow-sm transition-all cursor-pointer"
            title="Open Table of Contents (Index)"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>CONTENTS</span>
          </button>

          {/* Unobtrusive Return to Synopsis */}
          {!isCover && currentSpread !== 1 && (
            <button
              onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(1); }}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded bg-zinc-900/80 hover:bg-zinc-800 text-stone-300 hover:text-amber-200 text-xs font-cinzel tracking-wide transition-colors cursor-pointer"
              title="Return to Synopsis (p. 2)"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>Synopsis</span>
            </button>
          )}

          {/* Quick Direct Destinations */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(2); }}
              className={`px-2 py-1 rounded text-xs font-cinzel transition-colors cursor-pointer ${
                currentSpread === 2 ? 'text-amber-300 font-bold bg-amber-950/40' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Skills
            </button>

            <button
              onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(3); }}
              className={`px-2 py-1 rounded text-xs font-cinzel transition-colors cursor-pointer ${
                [3, 4, 5, 6].includes(currentSpread) ? 'text-amber-300 font-bold bg-amber-950/40' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Projects
            </button>

            <button
              onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(7); }}
              className={`px-2 py-1 rounded text-xs font-cinzel transition-colors cursor-pointer ${
                currentSpread === 7 ? 'text-amber-300 font-bold bg-amber-950/40' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Case Studies
            </button>

            <button
              onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(8); }}
              className={`px-2 py-1 rounded text-xs font-cinzel transition-colors cursor-pointer ${
                currentSpread === 8 ? 'text-amber-300 font-bold bg-amber-950/40' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Experience
            </button>

            <button
              onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(9); }}
              className={`px-2 py-1 rounded text-xs font-cinzel transition-colors cursor-pointer ${
                currentSpread === 9 ? 'text-amber-300 font-bold bg-amber-950/40' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Right: Audio Sound & Audit */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded hover:bg-zinc-800 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
            title={isMuted ? 'Turn Page Flip Sound ON' : 'Mute Sound'}
            aria-label="Toggle Page Turning Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Spread / Single-Page Mode Toggle */}
          <button
            onClick={onToggleSinglePageMode}
            className="hidden md:flex p-1.5 rounded hover:bg-zinc-800 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
            title={isSinglePageMode ? 'Switch to Two-Page Spread' : 'Switch to Single-Page Focus'}
            aria-label="Toggle Page Spread View"
          >
            {isSinglePageMode ? <Columns className="w-4 h-4 text-stone-300" /> : <Square className="w-4 h-4 text-stone-300" />}
          </button>

          {/* Audit Verification Trigger */}
          <button
            onClick={onOpenPdfAudit}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-stone-300 hover:text-emerald-300 transition-colors cursor-pointer"
            title="Inspect 100% Resume Audit against PDF 1 & PDF 2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-[11px]">Audit</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          FLOATING BOTTOM CONSOLE
          ========================================================================= */}
      <nav 
        aria-label="Book Page Navigation"
        className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 flex items-center justify-between sm:justify-center gap-2 sm:gap-3 px-3 py-2 bg-stone-950/95 backdrop-blur-md border border-amber-500/25 rounded-xl shadow-2xl text-stone-200"
      >
        {/* Cover Action */}
        <button
          onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(0); }}
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            isCover ? 'bg-amber-950/80 text-amber-300' : 'hover:bg-zinc-800 text-stone-400 hover:text-stone-200'
          }`}
          title="Front Hardcover"
          aria-label="Go to Cover"
        >
          <Home className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-zinc-800" />

        {/* Previous Page */}
        <button
          onClick={handlePrev}
          disabled={isCover}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-xs font-cinzel text-amber-200"
          title="Previous Page (Left Arrow)"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page & Spread Indicator */}
        <div className="px-3 py-0.5 text-center min-w-[130px] sm:min-w-[170px] select-none">
          {isCover ? (
            <span className="text-xs font-cinzel font-bold text-amber-300 tracking-wider">
              FRONT HARDCOVER
            </span>
          ) : isBack ? (
            <span className="text-xs font-cinzel font-bold text-amber-300 tracking-wider">
              BACK COVER JACKET
            </span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-cinzel font-bold text-amber-200 tracking-wide">
                Pages {currentSpread * 2 - 1} & {currentSpread * 2} of 18
              </span>
              <span className="text-[9px] font-mono text-stone-400">
                Spread {currentSpread} of {totalSpreads}
              </span>
            </div>
          )}
        </div>

        {/* Next Page */}
        <button
          onClick={handleNext}
          disabled={isBack}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-xs font-cinzel text-amber-200"
          title="Next Page (Right Arrow)"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-zinc-800" />

        {/* Back Jacket Action */}
        <button
          onClick={() => { bookAudio.playPageTurn(); onNavigateSpread(totalSpreads + 1); }}
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            isBack ? 'bg-amber-950/80 text-amber-300' : 'hover:bg-zinc-800 text-stone-400 hover:text-stone-200'
          }`}
          title="Back Cover Jacket"
          aria-label="Go to Back Cover"
        >
          <BookOpen className="w-4 h-4" />
        </button>
      </nav>
    </>
  );
};
