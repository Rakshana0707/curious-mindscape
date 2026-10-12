import React from 'react';
import { portfolioData, BookChapter } from '../../data/portfolioData';
import { X, BookOpen, Bookmark, ChevronRight } from 'lucide-react';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (spreadIndex: number) => void;
  currentSpread: number;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  currentSpread,
}) => {
  if (!isOpen) return null;

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

        {/* Modal Header */}
        <div className="text-center pb-4 mb-6 border-b border-amber-900/20">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.2em] text-amber-900 uppercase">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Volume Index & Pathway</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-950 mt-1">
            TABLE OF CONTENTS
          </h2>
          <p className="font-garamond italic text-xs sm:text-sm text-stone-600 mt-1">
            The Curious Mindscape • Shiv Rakshana R
          </p>
        </div>

        {/* Chapter List */}
        <div className="space-y-3">
          {portfolioData.chapters.map((chapter: BookChapter) => {
            const isActive = currentSpread === chapter.spreadIndex;
            return (
              <div
                key={chapter.id}
                onClick={() => {
                  onSelectChapter(chapter.spreadIndex);
                  onClose();
                }}
                className={`p-3.5 rounded border transition-all cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? 'bg-amber-100/70 border-amber-800/40 shadow-sm'
                    : 'bg-white/60 hover:bg-amber-50/60 border-amber-900/10 hover:border-amber-900/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-cinzel font-bold text-sm text-amber-900 w-8 pt-0.5">
                    {chapter.roman !== '—' ? `Ch. ${chapter.roman}` : '•'}
                  </span>
                  <div>
                    <h4 className="font-cinzel font-bold text-sm text-stone-900 group-hover:text-amber-950 flex items-center gap-2">
                      <span>{chapter.title}</span>
                      {isActive && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900 text-amber-100 font-normal">
                          CURRENT
                        </span>
                      )}
                    </h4>
                    <p className="text-xs font-garamond italic text-stone-600">
                      {chapter.subtitle}
                    </p>
                    <p className="text-[11px] font-serif text-stone-500 mt-0.5">
                      {chapter.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs font-semibold text-amber-950">
                    p. {chapter.pages[0]}–{chapter.pages[1]}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Nav to Front and Back Covers */}
        <div className="mt-6 pt-4 border-t border-amber-900/20 flex items-center justify-between">
          <button
            onClick={() => {
              onSelectChapter(0);
              onClose();
            }}
            className="text-xs font-cinzel font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Front Hardcover</span>
          </button>

          <button
            onClick={() => {
              onSelectChapter(10);
              onClose();
            }}
            className="text-xs font-cinzel font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Back Cover Jacket</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
