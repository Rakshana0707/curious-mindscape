import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { BookOpen, RotateCcw, Mail, Phone, ExternalLink, QrCode } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../BrandIcons';

interface BookBackCoverProps {
  onReopenBook: () => void;
  onReturnToCover: () => void;
  onOpenPdfAudit: () => void;
}

export const BookBackCover: React.FC<BookBackCoverProps> = ({
  onReopenBook,
  onReturnToCover,
  onOpenPdfAudit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-[85vh] p-4 sm:p-8">
      {/* 3D Hardcover Book Back Container */}
      <div className="relative w-full max-w-xl sm:max-w-2xl bg-book-leather rounded-l-2xl rounded-r-md shadow-2xl border-l-4 border-t-2 border-b-2 border-amber-900/40 p-2 sm:p-4 book-cover-leather book-shadow-cast transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Spine hinge right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 rounded-r-md spine-ridge opacity-90 border-l border-amber-500/20 pointer-events-none flex flex-col justify-between py-8 items-center">
          <div className="w-1.5 h-12 bg-amber-400/20 rounded-full" />
          <div className="w-1.5 h-12 bg-amber-400/20 rounded-full" />
          <div className="w-1.5 h-12 bg-amber-400/20 rounded-full" />
        </div>

        {/* Outer Gold Framing */}
        <div className="mr-6 sm:mr-10 border-2 border-amber-500/30 rounded-l-xl rounded-r-sm p-6 sm:p-10 relative overflow-hidden bg-gradient-to-bl from-white/[0.02] to-transparent">
          
          {/* Inner Inset Border */}
          <div className="border border-amber-400/20 p-6 sm:p-8 flex flex-col items-center text-center">
            
            {/* Header Colophon Stamp */}
            <div className="text-[10px] sm:text-xs tracking-[0.25em] text-amber-300/80 uppercase font-cinzel font-semibold mb-3">
              EXECUTIVE MONOGRAPH • SUMMARY
            </div>

            <h2 className="font-cinzel text-xl sm:text-2xl font-bold gold-foil-text tracking-wide mb-4">
              THE CURIOUS MINDSCAPE
            </h2>

            {/* Back Jacket Book Blurb / Synopsis */}
            <div className="text-xs sm:text-sm font-garamond text-stone-200/90 leading-relaxed text-justify space-y-3 bg-zinc-950/40 p-4 sm:p-5 rounded border border-amber-400/20">
              <p>
                <span className="font-cinzel font-bold text-amber-300">The Curious Mindscape</span> represents the technical volume of <strong className="text-amber-100 font-semibold">{portfolioData.personal.name}</strong>, Software Systems undergraduate at Coimbatore Institute of Technology.
              </p>
              <p>
                Spanning eight verified academic systems, this collection documents architectural implementations in machine learning, full-stack systems engineering, multilingual natural language processing, and cross-era inter-process communication. Every metric, algorithm, and outcome presented is drawn strictly from official resume documentation.
              </p>
            </div>

            {/* Colophon & Verification Stamp */}
            <div className="my-5 w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-zinc-900/60 rounded border border-zinc-700/60 text-left">
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                  Coimbatore Institute of Technology
                </p>
                <p className="text-[11px] font-serif text-stone-300">
                  Integrated MSc Software Systems • 2024–Present
                </p>
                <p className="text-[10px] font-mono text-zinc-400">
                  Academic Standing: CGPA 8.15 (Till 4th Semester)
                </p>
              </div>

              {/* Barcode / Live QR representation */}
              <div className="flex flex-col items-center gap-1 bg-white p-2 rounded shadow text-stone-900 text-center shrink-0">
                <QrCode className="w-14 h-14 text-stone-900" />
                <span className="text-[8px] font-mono font-bold tracking-tight">VERCEL LIVE</span>
              </div>
            </div>

            {/* Direct Coordinates */}
            <div className="w-full flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-300 my-2">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{portfolioData.personal.email}</span>
              </a>
              <span className="text-zinc-600">•</span>
              <a
                href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{portfolioData.personal.phone}</span>
              </a>
            </div>

            {/* External Links */}
            <div className="flex items-center gap-4 my-3">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-amber-100 font-mono"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-amber-100 font-mono"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </div>

            {/* Actions: Reopen / Front Cover */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onReopenBook}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-cinzel font-bold text-xs tracking-wider rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-stone-950" />
                <span>RE-OPEN VOLUME</span>
              </button>

              <button
                onClick={onReturnToCover}
                className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-400/30 text-amber-200 font-cinzel text-xs tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>FRONT COVER</span>
              </button>
            </div>

            <button
              onClick={onOpenPdfAudit}
              className="mt-4 text-[10px] text-zinc-400 hover:text-amber-300 font-mono underline transition-colors cursor-pointer"
            >
              Audited against Source Resumes (PDF 1 & PDF 2)
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
