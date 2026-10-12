import React, { useState, useEffect } from 'react';
import { Menu, X, FileCheck, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenAuditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuditModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'domains', 'projects', 'case-study', 'about', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'Technical Domains', href: '#domains', id: 'domains' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Spotlight', href: '#case-study', id: 'case-study' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience & Skills', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-obsidian/90 backdrop-blur-md border-b border-graphite-border/70 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#hero"
          className="group flex items-center gap-3 text-text-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime rounded-lg"
          aria-label="The Curious Mindscape Home"
        >
          <div className="w-9 h-9 rounded-lg bg-graphite border border-white/10 flex items-center justify-center group-hover:border-electric-lime/50 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-electric-lime shadow-[0_0_10px_#C6FF4D]" />
          </div>
          <div>
            <span className="font-grotesk font-semibold tracking-tight text-sm sm:text-base block">
              The Curious Mindscape
            </span>
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
              {portfolioData.personal.shortName} · CIT
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-graphite/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                activeSection === link.id
                  ? 'text-obsidian bg-electric-lime font-semibold shadow-sm'
                  : 'text-text-muted hover:text-text-soft hover:bg-white/5'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA cluster */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenAuditModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-ice-blue bg-graphite border border-ice-blue/30 hover:border-ice-blue hover:bg-ice-blue/10 transition-colors"
            title="Inspect unified content inventory extracted from the 2 provided PDFs"
          >
            <FileCheck className="w-3.5 h-3.5 text-ice-blue" />
            <span>Resume Audit</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium text-obsidian bg-electric-lime hover:bg-electric-lime-dim transition-colors shadow-glow-lime"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAuditModal}
            className="p-2 rounded-md text-ice-blue bg-graphite border border-ice-blue/20 text-xs font-mono sm:hidden"
            aria-label="Inspect PDF data audit"
          >
            <FileCheck className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-text-soft bg-graphite border border-white/10 hover:border-electric-lime"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-electric-lime" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-obsidian-surface border-b border-graphite-border px-6 py-6 mt-3 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-electric-lime text-obsidian font-semibold'
                    : 'text-text-muted hover:text-text-soft hover:bg-graphite'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-graphite-border flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuditModal();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-mono text-ice-blue bg-graphite border border-ice-blue/30"
              >
                <FileCheck className="w-4 h-4" />
                <span>Resume Data Audit</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-obsidian bg-electric-lime text-center"
              >
                <span>Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
