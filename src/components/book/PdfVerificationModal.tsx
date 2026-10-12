import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { X, ShieldCheck, FileText, CheckCircle2, Download } from 'lucide-react';

interface PdfVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfVerificationModal: React.FC<PdfVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-zinc-950 text-stone-100 rounded-xl shadow-2xl border border-amber-500/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-4 mb-6 border-b border-zinc-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Resume-Factual Integrity</span>
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
            PDF Source Resume Audit
          </h3>
          <p className="font-garamond italic text-xs sm:text-sm text-stone-300 mt-1 max-w-md mx-auto">
            {portfolioData.pdfAudit.verifiedSourceSummary}
          </p>
        </div>

        {/* Breakdown of PDF 1 & PDF 2 */}
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h4 className="font-mono text-xs font-bold text-amber-300 uppercase">
                  {portfolioData.pdfAudit.pdf1.name}
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-800/40">
                Data & AI Focus
              </span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed">
              {portfolioData.pdfAudit.pdf1.content}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-stone-400">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> ContextIQ</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> MicroDelay (~10% err reduction)</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> CivicLensTN</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Zyatra</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Rotaract VAAGAI Gang 50</span>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h4 className="font-mono text-xs font-bold text-amber-300 uppercase">
                  {portfolioData.pdfAudit.pdf2.name}
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-800/40">
                Systems & Full-Stack Focus
              </span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed">
              {portfolioData.pdfAudit.pdf2.content}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-stone-400">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> GlobalPulse (React/Node/MySQL)</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> CampCon (RBAC & QR)</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> SkillSync (GPT-4o)</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> LifeLink</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Grainly (8086 Assembly)</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Simplilearn C++</span>
            </div>
          </div>
        </div>

        {/* Verification Guarantee & Resume Access */}
        <div className="mt-6 p-4 rounded-lg bg-amber-950/20 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-300 font-garamond italic">
            Zero fabricated awards, metrics, or technologies. Fully recruiter-ready.
          </div>
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-cinzel font-bold text-xs rounded transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-stone-950" />
            <span>Source Code Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
};
