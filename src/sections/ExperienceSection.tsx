import React from 'react';
import { Trophy, BookCheck, Code2, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-obsidian">
      <div className="glow-orb top-20 left-10 w-80 h-80 bg-electric-lime" />
      <div className="glow-orb bottom-10 right-10 w-80 h-80 bg-ice-blue" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full font-mono text-xs uppercase font-bold tracking-widest text-electric-lime bg-electric-lime/10 border border-electric-lime/30">
              ACHIEVEMENTS & SKILLS
            </span>
          </div>

          <h2 className="font-grotesk font-bold text-3xl sm:text-5xl text-text-soft tracking-tight">
            Leadership, Honors & Technical Skills
          </h2>
          <p className="font-inter text-base text-text-muted mt-2 leading-relaxed">
            Documented hackathons, community leadership, certifications, and technical skills from both resumes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Achievements & Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-grotesk font-bold text-xl text-text-soft flex items-center gap-2">
              <Trophy className="w-5 h-5 text-electric-lime" />
              <span>Leadership & Achievements</span>
            </h3>

            <div className="space-y-4">
              {portfolioData.achievements.map((ach, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-graphite/80 border border-white/10 shadow-card">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-electric-lime px-2 py-0.5 rounded bg-electric-lime/10">
                      {ach.award}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted">
                      {ach.organization}
                    </span>
                  </div>
                  <h4 className="font-grotesk font-bold text-base text-text-soft">
                    {ach.title}
                  </h4>
                  <p className="font-inter text-xs sm:text-sm text-text-muted mt-1.5 leading-relaxed">
                    {ach.description}
                  </p>
                  {ach.hasCertificate && (
                    <div className="mt-2 text-[11px] font-mono text-electric-lime flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Certificate verified</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="pt-2">
              <h3 className="font-grotesk font-bold text-xl text-text-soft flex items-center gap-2 mb-3">
                <BookCheck className="w-5 h-5 text-ice-blue" />
                <span>Certifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {portfolioData.certifications.map((cert, i) => (
                  <div key={i} className="p-4 rounded-xl bg-graphite border border-white/10">
                    <span className="font-mono text-[10px] text-ice-blue uppercase font-bold tracking-wider block mb-1">
                      {cert.issuer}
                    </span>
                    <h5 className="font-grotesk font-bold text-sm text-text-soft">
                      {cert.name}
                    </h5>
                    <p className="font-mono text-xs text-text-muted mt-1">
                      {cert.levels}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Consolidated Technical Skills Inventory */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-grotesk font-bold text-xl text-text-soft flex items-center gap-2">
              <Code2 className="w-5 h-5 text-electric-lime" />
              <span>Technical Skills (From Resumes)</span>
            </h3>

            <div className="p-6 rounded-2xl bg-graphite/80 border border-white/10 space-y-4 shadow-card">
              {/* Programming Languages */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted block font-semibold mb-2">
                  Programming Languages
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {portfolioData.skills.programmingLanguages.map((l, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-obsidian text-electric-lime border border-electric-lime/20 font-medium">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Web Development */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted block font-semibold mb-2">
                  Web Development
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {portfolioData.skills.webDevelopment.map((w, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-obsidian text-ice-blue border border-white/5">
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Machine Learning */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted block font-semibold mb-2">
                  Machine Learning & Data
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {portfolioData.skills.machineLearning.map((m, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-obsidian text-accent-teal border border-white/5">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted block font-semibold mb-2">
                  Databases
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {portfolioData.skills.databases.map((d, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-obsidian text-text-soft border border-white/5">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI & Integration */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted block font-semibold mb-2">
                  AI & Integration
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {portfolioData.skills.aiAndIntegration.map((a, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-obsidian text-accent-amber border border-white/5">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
