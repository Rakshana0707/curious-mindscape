import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { BookOpen, FileText, ChevronRight, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface BookCoverProps {
  onOpenBook: () => void;
  onOpenTableOfContents: () => void;
  onOpenPdfAudit: () => void;
}

export const BookCover: React.FC<BookCoverProps> = ({
  onOpenBook,
  onOpenTableOfContents,
  onOpenPdfAudit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-[85vh] p-4 sm:p-8">
      {/* 3D Hardcover Book Container */}
      <div className="relative w-full max-w-xl sm:max-w-2xl bg-book-leather rounded-r-2xl rounded-l-md shadow-2xl border-r-4 border-t-2 border-b-2 border-amber-900/40 p-2 sm:p-4 book-cover-leather book-shadow-cast transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Spine hinge left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 rounded-l-md spine-ridge opacity-90 border-r border-amber-500/20 pointer-events-none flex flex-col justify-between py-8 items-center">
          <div className="w-1.5 h-12 bg-amber-400/20 rounded-full" />
          <div className="w-1.5 h-12 bg-amber-400/20 rounded-full" />
          <div className="w-1.5 h-12 bg-amber-400/20 rounded-full" />
        </div>

        {/* Top Silk Bookmark Ribbon hanging out */}
        <div 
          onClick={onOpenTableOfContents}
          className="absolute -top-3 left-28 sm:left-36 w-8 h-16 bg-red-900 silk-ribbon cursor-pointer hover:h-20 transition-all duration-300 z-30 group"
          title="Pull Ribbon to Open Table of Contents"
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[9px] text-amber-200/90 font-cinzel font-bold tracking-widest rotate-90 whitespace-nowrap">INDEX</span>
          </div>
        </div>

        {/* Outer Gold Foil Framing */}
        <div className="ml-6 sm:ml-10 border-2 border-amber-500/30 rounded-r-xl rounded-l-sm p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-400/50 text-xl font-serif select-none">❖</div>
          <div className="absolute top-2 right-2 text-amber-400/50 text-xl font-serif select-none">❖</div>
          <div className="absolute bottom-2 left-2 text-amber-400/50 text-xl font-serif select-none">❖</div>
          <div className="absolute bottom-2 right-2 text-amber-400/50 text-xl font-serif select-none">❖</div>

          {/* Inner Inset Border */}
          <div className="border border-amber-400/20 p-6 sm:p-8 flex flex-col items-center text-center">
            
            {/* Header Colophon Stamp */}
            <div className="flex items-center gap-2 mb-4 text-xs tracking-[0.25em] text-amber-300/80 uppercase font-cinzel font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Technical Monograph • Volume I</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Central Seal / Monogram */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 my-2 rounded-full border-2 border-amber-400/40 flex items-center justify-center bg-amber-950/20 shadow-inner group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-amber-400/30 flex flex-col items-center justify-center">
                <span className="font-cinzel text-amber-200 text-lg sm:text-xl font-bold tracking-wider">SRR</span>
                <span className="text-[8px] tracking-widest text-amber-400/70 uppercase">CIT</span>
              </div>
            </div>

            {/* Book Title */}
            <h1 className="mt-4 font-cinzel font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-wide gold-foil-text drop-shadow-md">
              THE CURIOUS MINDSCAPE
            </h1>

            {/* Book Subtitle */}
            <p className="mt-2 text-xs sm:text-sm font-garamond italic tracking-widest text-amber-200/90 max-w-md">
              A Technical Portfolio & Systems Architecture Monograph
            </p>

            {/* Ornamental Divider */}
            <div className="w-full my-6 flex items-center justify-center gap-3 text-amber-500/60">
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/40" />
              <span className="text-sm">✦ ❖ ✦</span>
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/40" />
            </div>

            {/* Author / Candidate Name */}
            <div className="space-y-1">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-zinc-400 font-cinzel">Author & Systems Engineer</p>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-100 tracking-wider">
                {portfolioData.personal.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-garamond italic">
                {portfolioData.personal.degree}
              </p>
              <p className="text-[11px] text-amber-300/80 font-cinzel tracking-wider">
                {portfolioData.personal.institution}
              </p>
            </div>

            {/* Verified Credentials Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-amber-950/40 border border-amber-400/30 text-amber-200">
                <Award className="w-3 h-3 text-amber-400" />
                CGPA 8.15 • Semester IV
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-zinc-900/60 border border-zinc-700/60 text-zinc-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                8 Technical Projects Verified
              </span>
            </div>

            {/* Actions: Open Book & Quick Table of Contents */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenBook}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-cinzel font-bold text-sm tracking-widest rounded-lg shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-stone-950 group-hover:scale-110 transition-transform" />
                <span>OPEN PORTFOLIO</span>
                <ChevronRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenTableOfContents}
                className="w-full sm:w-auto px-5 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 border border-amber-400/30 hover:border-amber-400/60 text-amber-200 font-cinzel text-xs tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TABLE OF CONTENTS</span>
              </button>
            </div>

            {/* PDF Audit Verification Link */}
            <button
              onClick={onOpenPdfAudit}
              className="mt-6 inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-amber-300 font-mono transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Verify PDF Resume Sources (PDF 1 & PDF 2)</span>
            </button>

          </div>
        </div>

        {/* Realistic Page Thickness Bottom/Right preview */}
        <div className="absolute right-0 bottom-0 top-0 w-3 bg-gradient-to-r from-book-paper-edge to-book-paper rounded-r-md pointer-events-none opacity-80" />
      </div>
    </div>
  );
};
