import React from 'react';
import { GraduationCap, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-obsidian-surface border-t border-graphite-border">
      <div className="glow-orb top-1/4 right-0 w-80 h-80 bg-accent-amber" />
      <div className="glow-orb bottom-10 left-10 w-80 h-80 bg-electric-lime" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full font-mono text-xs uppercase font-bold tracking-widest text-ice-blue bg-ice-blue/10 border border-ice-blue/30">
              PROFILE
            </span>
          </div>

          <h2 className="font-grotesk font-bold text-3xl sm:text-5xl text-text-soft tracking-tight">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Short, factual resume-based summary */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-graphite/80 border border-white/10 shadow-card space-y-4">
              <h3 className="font-grotesk font-bold text-xl text-text-soft">
                Software Systems Undergraduate
              </h3>
              <p className="font-inter text-sm text-text-muted leading-relaxed">
                I am an <strong className="text-text-soft">Integrated MSc Software Systems</strong> undergraduate at <strong className="text-text-soft">Coimbatore Institute of Technology</strong> (2024–Present, CGPA: 8.15 till 4th Semester).
              </p>
              <p className="font-inter text-sm text-text-muted leading-relaxed">
                My technical background spans building end-to-end applications, prompt engineering, full-stack web development, and system design. In addition to software development, I have experience with data analysis, preprocessing, and machine learning models for data-driven applications.
              </p>
              <p className="font-inter text-sm text-text-muted leading-relaxed">
                I am seeking software engineering and data-focused internships to apply my programming skills, system design knowledge, and analytical capabilities to real-world projects.
              </p>
            </div>

            {/* Areas of Interest from Resume */}
            <div className="p-6 rounded-2xl bg-graphite/80 border border-white/10 shadow-card">
              <div className="flex items-center gap-2 font-mono text-xs text-electric-lime font-bold uppercase tracking-wider mb-3">
                <Code2 className="w-4 h-4" />
                <span>Areas of Interest (From Resumes)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.areasOfInterest.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-obsidian text-text-soft border border-white/5"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Education details strictly from PDFs */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-grotesk font-bold text-xl text-text-soft flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-ice-blue" />
              <span>Education</span>
            </h3>

            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-graphite/80 border border-white/10 shadow-card">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-xs text-electric-lime font-bold">
                    {edu.grade}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {edu.period}
                  </span>
                </div>
                <h4 className="font-grotesk font-bold text-base text-text-soft">
                  {edu.degree}
                </h4>
                <p className="font-inter text-xs text-text-muted mt-0.5">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
