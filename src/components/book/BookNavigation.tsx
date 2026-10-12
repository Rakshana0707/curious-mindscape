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
  FileDown, 
  Columns, 
  Square,
  Home,
  Bookmark
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

  // Silk Bookmark Ribbon quick links
  const bookmarks = [
    { label: 'Cover', spread: 0, color: 'bg-amber-900' },
    { label: 'Index', spread: 2, color: 'bg-red-950' },
    { label: 'Ch. I', spread: 3, color: 'bg-stone-800' },
    { label: 'Ch. II', spread: 4, color: 'bg-stone-800' },
    { label: 'Ch. III', spread: 5, color: 'bg-stone-800' },
    { label: 'Ch. IV', spread: 6, color: 'bg-stone-800' },
    { label: 'Spotlight', spread: 7, color: 'bg-amber-950' },
    { label: 'Honors', spread: 8, color: 'bg-stone-800' },
    { label: 'Contact', spread: 9, color: 'bg-red-900' },
    { label: 'Back', spread: 10, color: 'bg-amber-900' },
  ];

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
      {/* Top Hanging Silk Ribbon Bookmarks */}
      <div className="fixed top-0 left-0 right-0 z-40 hidden md:flex justify-center pointer-events-none">
        <div className="flex gap-2 sm:gap-3 pointer-events-auto">
          {bookmarks.map((bm) => {
            const isActive = currentSpread === bm.spread;
            return (
              <button
                key={bm.label}
                onClick={() => {
                  bookAudio.playPageTurn();
                  onNavigateSpread(bm.spread);
                }}
                className={`relative px-2.5 pt-1 pb-3 text-[10px] font-cinzel font-bold tracking-wider rounded-b transition-all duration-300 shadow-md ${
                  bm.color
                } ${
                  isActive
                    ? 'h-11 text-amber-200 border-b-2 border-amber-400 translate-y-0.5'
                    : 'h-8 text-stone-300 hover:h-10 hover:text-amber-100 opacity-85 hover:opacity-100'
                }`}
                title={`Jump to ${bm.label}`}
              >
                <span>{bm.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rotate-45" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Navigation Console */}
      <nav 
        aria-label="Book Navigation Console"
        className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 flex items-center justify-between sm:justify-center gap-1.5 sm:gap-3 px-3 py-2 bg-stone-950/90 backdrop-blur-md border border-amber-500/25 rounded-xl shadow-2xl text-stone-200"
      >
        
        {/* Left Controls: Cover / Index */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              bookAudio.playPageTurn();
              onNavigateSpread(0);
            }}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isCover ? 'bg-amber-950/80 text-amber-300' : 'hover:bg-zinc-800 text-stone-400 hover:text-stone-200'
            }`}
            title="Front Hardcover"
          >
            <Home className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenTableOfContents}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-cinzel font-semibold hover:bg-zinc-800 text-amber-200 hover:text-amber-100 transition-colors cursor-pointer"
            title="Open Table of Contents"
          >
            <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Index</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-zinc-800 mx-0.5" />

        {/* Center Navigation: Prev, Spread Indicator, Next */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={isCover}
            className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Previous Page / Spread (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4 text-amber-200" />
          </button>

          {/* Current Page Text */}
          <div className="px-2 py-0.5 text-center min-w-[130px] sm:min-w-[170px]">
            {isCover ? (
              <span className="text-xs font-cinzel font-bold text-amber-300 tracking-wider">
                FRONT HARDCOVER
              </span>
            ) : isBack ? (
              <span className="text-xs font-cinzel font-bold text-amber-300 tracking-wider">
                BACK JACKET
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

          <button
            onClick={handleNext}
            disabled={isBack}
            className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Next Page / Spread (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4 text-amber-200" />
          </button>
        </div>

        <div className="h-4 w-[1px] bg-zinc-800 mx-0.5" />

        {/* Right Tools: View Toggle, Sound, PDF Audit */}
        <div className="flex items-center gap-1">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded hover:bg-zinc-800 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
            title={isMuted ? 'Turn Page Sound ON' : 'Mute Page Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Layout Mode (Desktop) */}
          <button
            onClick={onToggleSinglePageMode}
            className="hidden md:flex p-1.5 rounded hover:bg-zinc-800 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
            title={isSinglePageMode ? 'Switch to 2-Page Spread' : 'Switch to Single Page Focus'}
          >
            {isSinglePageMode ? <Columns className="w-4 h-4 text-stone-300" /> : <Square className="w-4 h-4 text-stone-300" />}
          </button>

          {/* PDF Audit Verification Modal */}
          <button
            onClick={onOpenPdfAudit}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono hover:bg-zinc-800 text-stone-300 hover:text-emerald-300 transition-colors cursor-pointer"
            title="Verify against Source PDFs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline text-[11px]">Audit</span>
          </button>
        </div>

      </nav>
    </>
  );
};
