import React, { useEffect } from 'react';
import { X, FileCheck, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface PdfContentAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfContentAuditModal: React.FC<PdfContentAuditModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-graphite border border-white/20 p-6 sm:p-8 shadow-2xl focus:outline-none text-text-soft">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-obsidian-deep text-text-muted hover:text-white border border-white/10 hover:border-white/30 transition-colors"
          aria-label="Close audit log"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider bg-ice-blue/10 text-ice-blue border border-ice-blue/30 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              PDF RESUME AUDIT
            </span>
          </div>

          <h2 id="audit-modal-title" className="font-grotesk font-bold text-2xl sm:text-3xl text-text-soft">
            Resume Source Audit
          </h2>
          <p className="font-inter text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
            Summary of how information from the two provided PDF resumes was extracted and consolidated into this website.
          </p>
        </div>

        {/* Two Sources Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-obsidian border border-white/10 space-y-2">
            <span className="font-mono text-xs font-bold text-accent-teal">PDF 1 (Data & ML Focus)</span>
            <p className="font-inter text-xs text-text-muted leading-relaxed">
              {portfolioData.pdfSourceAudit.pdf1}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-obsidian border border-white/10 space-y-2">
            <span className="font-mono text-xs font-bold text-electric-lime">PDF 2 (SWE & Systems Focus)</span>
            <p className="font-inter text-xs text-text-muted leading-relaxed">
              {portfolioData.pdfSourceAudit.pdf2}
            </p>
          </div>
        </div>

        {/* Verification Guarantee */}
        <div className="p-4 rounded-xl bg-obsidian border border-electric-lime/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-electric-lime shrink-0" />
            <div className="font-inter text-xs text-text-muted">
              <strong className="text-text-soft block mb-0.5">Resume Accurate Content</strong>
              All projects, academic metrics, leadership, and technical skills reflect the supplied source documents without invented claims.
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-mono text-xs font-bold text-obsidian bg-electric-lime shrink-0 hover:bg-electric-lime-dim"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
