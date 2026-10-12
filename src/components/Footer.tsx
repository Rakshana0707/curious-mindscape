import React from 'react';
import { Compass, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { LinkedInIcon, GitHubIcon } from './BrandIcons';

interface FooterProps {
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuditModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-graphite-border bg-obsidian-deep py-12 relative text-text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Left: Brand & Institution */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-electric-lime" />
              <h3 className="font-grotesk font-bold text-lg text-text-soft">
                The Curious Mindscape
              </h3>
            </div>
            <p className="font-mono text-xs text-text-muted">
              {portfolioData.personal.name} · {portfolioData.personal.title}
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-text-subtle">
              <Compass className="w-3.5 h-3.5 text-electric-lime" />
              <span>Coimbatore Institute of Technology · Coimbatore, Tamil Nadu</span>
            </div>
          </div>

          {/* Center: Four Technical Domains Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a href="#domain-swe" className="text-ice-blue hover:underline">01. DEV</a>
            <span className="text-white/20">/</span>
            <a href="#domain-systems" className="text-accent-amber hover:underline">02. ARCH</a>
            <span className="text-white/20">/</span>
            <a href="#domain-aiml" className="text-accent-teal hover:underline">03. AI/ML</a>
            <span className="text-white/20">/</span>
            <a href="#domain-fullstack" className="text-electric-lime hover:underline">04. SYS</a>
          </div>

          {/* Right: Quick Links & Back to Top */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuditModal}
              className="px-3 py-1.5 rounded-md text-xs font-mono text-ice-blue bg-graphite border border-ice-blue/30 hover:border-ice-blue transition-colors"
            >
              Resume Audit
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-graphite hover:bg-graphite-light text-text-soft border border-white/10 hover:border-white/20 transition-all focus:outline-none"
              aria-label="Scroll back to top"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4 text-electric-lime" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-subtle">
          <div>
            © {new Date().getFullYear()} Shiv Rakshana R. Software Systems · Coimbatore Institute of Technology.
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-electric-lime transition-colors">
              Email
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ice-blue transition-colors flex items-center gap-1"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
