import React, { useState, useEffect, useCallback } from 'react';
import { portfolioData, Project } from './data/portfolioData';
import { BookCover } from './components/book/BookCover';
import { BookBackCover } from './components/book/BookBackCover';
import { BookSpread } from './components/book/BookSpread';
import { BookNavigation } from './components/book/BookNavigation';
import { TableOfContentsModal } from './components/book/TableOfContentsModal';
import { PdfVerificationModal } from './components/book/PdfVerificationModal';
import { ProjectDetailModal } from './components/book/ProjectDetailModal';
import { bookAudio } from './utils/audioUtils';

export function App() {
  // Navigation State:
  // 0 = Closed Front Hardcover
  // 1..9 = Interior Two-Page Spreads (Pages 1 to 18)
  // 10 = Closed Back Hardcover Jacket
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [turnDirection, setTurnDirection] = useState<'forward' | 'backward' | null>(null);

  // Modals & view preferences
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [isPdfAuditOpen, setIsPdfAuditOpen] = useState<boolean>(false);
  const [isSinglePageMode, setIsSinglePageMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(bookAudio.getMuted());

  const totalInteriorSpreads = 9;

  // Single consistent spread navigation handler
  const handleNavigateSpread = useCallback((newSpread: number, direction?: 'forward' | 'backward') => {
    if (newSpread >= 0 && newSpread <= totalInteriorSpreads + 1) {
      const computedDir = direction || (newSpread > currentSpread ? 'forward' : 'backward');
      setTurnDirection(computedDir);
      bookAudio.playPageTurn();
      setCurrentSpread(newSpread);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Clear turning animation after realistic flip duration
      setTimeout(() => {
        setTurnDirection(null);
      }, 450);
    }
  }, [currentSpread, totalInteriorSpreads]);

  // Turn Next (forward)
  const handleTurnNext = useCallback(() => {
    if (currentSpread < totalInteriorSpreads + 1) {
      handleNavigateSpread(currentSpread + 1, 'forward');
    }
  }, [currentSpread, totalInteriorSpreads, handleNavigateSpread]);

  // Turn Prev (backward)
  const handleTurnPrev = useCallback(() => {
    if (currentSpread > 0) {
      handleNavigateSpread(currentSpread - 1, 'backward');
    }
  }, [currentSpread, handleNavigateSpread]);

  // Position-based page clicks for book interior (capped at interior boundaries):
  // Right half click -> turn forward (capped at spread 9)
  const handlePageClickForward = useCallback(() => {
    if (currentSpread < totalInteriorSpreads) {
      handleNavigateSpread(currentSpread + 1, 'forward');
    }
  }, [currentSpread, totalInteriorSpreads, handleNavigateSpread]);

  // Left half click -> turn backward (capped at spread 1)
  const handlePageClickBackward = useCallback(() => {
    if (currentSpread > 1) {
      handleNavigateSpread(currentSpread - 1, 'backward');
    }
  }, [currentSpread, handleNavigateSpread]);

  const handleToggleMute = () => {
    const nextMuted = bookAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  // Keyboard navigation listener (Left, Right, Escape, Home, End)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept typing in inputs or textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleTurnNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handleTurnPrev();
      } else if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        else if (isTocOpen) setIsTocOpen(false);
        else if (isPdfAuditOpen) setIsPdfAuditOpen(false);
        else handleNavigateSpread(0, 'backward');
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleNavigateSpread(0, 'backward');
      } else if (e.key === 'End') {
        e.preventDefault();
        handleNavigateSpread(totalInteriorSpreads + 1, 'forward');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTurnNext, handleTurnPrev, handleNavigateSpread, selectedProject, isTocOpen, isPdfAuditOpen, totalInteriorSpreads]);

  return (
    <div className="min-h-screen book-desk-atmosphere text-stone-100 flex flex-col justify-between selection:bg-amber-400 selection:text-stone-950 font-inter antialiased">
      
      {/* Top Atmospheric Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-48 bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Main Book Stage */}
      <main className="flex-grow flex items-center justify-center pt-16 sm:pt-20 pb-20 px-2 sm:px-4">
        {currentSpread === 0 ? (
          /* Closed Front Hardcover */
          <div className="cover-transition w-full flex justify-center">
            <BookCover
              onOpenBook={() => handleNavigateSpread(1, 'forward')}
              onOpenTableOfContents={() => setIsTocOpen(true)}
              onOpenPdfAudit={() => setIsPdfAuditOpen(true)}
            />
          </div>
        ) : currentSpread === totalInteriorSpreads + 1 ? (
          /* Closed Back Hardcover Jacket */
          <div className="cover-transition w-full flex justify-center">
            <BookBackCover
              onReopenBook={() => handleNavigateSpread(1, 'forward')}
              onReturnToCover={() => handleNavigateSpread(0, 'backward')}
              onOpenPdfAudit={() => setIsPdfAuditOpen(true)}
            />
          </div>
        ) : (
          /* Interior Two-Page Spread (Spreads 1 to 9) */
          <BookSpread
            spreadIndex={currentSpread}
            onOpenProjectModal={(project) => setSelectedProject(project)}
            onSelectChapter={(spreadIdx) => handleNavigateSpread(spreadIdx)}
            onOpenPdfAudit={() => setIsPdfAuditOpen(true)}
            onTurnPageForward={handlePageClickForward}
            onTurnPageBackward={handlePageClickBackward}
            isSinglePageMode={isSinglePageMode}
            turnDirection={turnDirection}
          />
        )}
      </main>

      {/* Persistent Navigation Toolbar & Floating Console */}
      <BookNavigation
        currentSpread={currentSpread}
        totalSpreads={totalInteriorSpreads}
        onNavigateSpread={handleNavigateSpread}
        onOpenTableOfContents={() => setIsTocOpen(true)}
        onOpenPdfAudit={() => setIsPdfAuditOpen(true)}
        isSinglePageMode={isSinglePageMode}
        onToggleSinglePageMode={() => setIsSinglePageMode(!isSinglePageMode)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Interactive Modals */}
      <TableOfContentsModal
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        onSelectChapter={(spreadIdx) => handleNavigateSpread(spreadIdx)}
        currentSpread={currentSpread}
      />

      <PdfVerificationModal
        isOpen={isPdfAuditOpen}
        onClose={() => setIsPdfAuditOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}

export default App;
