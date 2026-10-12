import React from 'react';
import { portfolioData, BookChapter } from '../../data/portfolioData';
import { X, BookOpen, Bookmark, ChevronRight, Sparkles, GraduationCap, Code2, FolderGit2, Cpu, Award, Mail } from 'lucide-react';

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

  // Icon mapping for chapters
  const getChapterIcon = (category: string) => {
    switch (category) {
      case 'foundation':
        return GraduationCap;
      case 'skills':
        return Code2;
      case 'projects':
        return FolderGit2;
      case 'case-studies':
        return Cpu;
      case 'experience':
        return Award;
      case 'contact':
        return Mail;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-book-paper text-book-ink rounded-lg shadow-2xl border-4 border-amber-900/30 p-6 sm:p-8 parchment-sheet max-h-[90vh] overflow-y-auto book-scroll">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          aria-label="Close Contents"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-4 mb-5 border-b border-amber-900/20">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.2em] text-amber-900 uppercase">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Recruiter Quick Index • Direct Navigation</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-950 mt-1">
            TABLE OF CONTENTS
          </h2>
          <p className="font-garamond italic text-xs sm:text-sm text-stone-600 mt-1">
            The Curious Mindscape • Shiv Rakshana R (CIT • CGPA 8.15)
          </p>
        </div>

        {/* Quick Recruiter Jumps */}
        <div className="mb-5 p-3 bg-amber-50/80 rounded border border-amber-900/15">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold block mb-2">
            ⚡ Quick Recruiter Jump destinations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => { onSelectChapter(1); onClose(); }}
              className="px-2.5 py-1 rounded text-xs font-cinzel font-semibold bg-white hover:bg-amber-100 border border-amber-900/20 text-stone-900 transition-colors cursor-pointer"
            >
              Synopsis (p. 2)
            </button>
            <button
              onClick={() => { onSelectChapter(2); onClose(); }}
              className="px-2.5 py-1 rounded text-xs font-cinzel font-semibold bg-white hover:bg-amber-100 border border-amber-900/20 text-stone-900 transition-colors cursor-pointer"
            >
              Technical Skills (p. 4)
            </button>
            <button
              onClick={() => { onSelectChapter(3); onClose(); }}
              className="px-2.5 py-1 rounded text-xs font-cinzel font-semibold bg-white hover:bg-amber-100 border border-amber-900/20 text-stone-900 transition-colors cursor-pointer"
            >
              Projects (p. 5)
            </button>
            <button
              onClick={() => { onSelectChapter(7); onClose(); }}
              className="px-2.5 py-1 rounded text-xs font-cinzel font-semibold bg-white hover:bg-amber-100 border border-amber-900/20 text-stone-900 transition-colors cursor-pointer"
            >
              Case Studies (p. 13)
            </button>
            <button
              onClick={() => { onSelectChapter(8); onClose(); }}
              className="px-2.5 py-1 rounded text-xs font-cinzel font-semibold bg-white hover:bg-amber-100 border border-amber-900/20 text-stone-900 transition-colors cursor-pointer"
            >
              Experience (p. 15)
            </button>
            <button
              onClick={() => { onSelectChapter(9); onClose(); }}
              className="px-2.5 py-1 rounded text-xs font-cinzel font-semibold bg-white hover:bg-amber-100 border border-amber-900/20 text-stone-900 transition-colors cursor-pointer"
            >
              Contact Form (p. 18)
            </button>
          </div>
        </div>

        {/* Detailed Chapter List */}
        <div className="space-y-2.5">
          {portfolioData.chapters.map((chapter: BookChapter) => {
            const isActive = currentSpread === chapter.spreadIndex;
            const Icon = getChapterIcon(chapter.category);
            return (
              <div
                key={chapter.id}
                onClick={() => {
                  onSelectChapter(chapter.spreadIndex);
                  onClose();
                }}
                className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? 'bg-amber-100/80 border-amber-800/50 shadow-sm ring-1 ring-amber-800/30'
                    : 'bg-white/60 hover:bg-amber-50/70 border-amber-900/10 hover:border-amber-900/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-amber-900/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-amber-900" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-xs sm:text-sm text-stone-900 group-hover:text-amber-950 flex items-center gap-2">
                      <span className="text-amber-900">
                        {chapter.roman !== '—' ? `Ch. ${chapter.roman}: ` : ''}
                      </span>
                      <span>{chapter.title}</span>
                      {isActive && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-900 text-amber-100 font-normal">
                          OPEN SPREAD
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

                <div className="flex items-center gap-2.5 shrink-0 pl-2">
                  <span className="font-mono text-xs font-bold text-amber-950">
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
