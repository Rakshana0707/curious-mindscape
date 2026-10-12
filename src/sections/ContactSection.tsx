import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { LinkedInIcon, GitHubIcon } from '../components/BrandIcons';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', topic: 'Software Engineering Internship' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(portfolioData.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-obsidian">
      {/* Background glow */}
      <div className="glow-orb top-10 left-1/3 w-96 h-96 bg-electric-lime" />
      <div className="glow-orb bottom-10 right-10 w-96 h-96 bg-ice-blue" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full font-mono text-xs uppercase font-bold tracking-widest text-electric-lime bg-electric-lime/10 border border-electric-lime/30">
                CONTACT
              </span>
            </div>

            <h2 className="font-grotesk font-bold text-3xl sm:text-5xl text-text-soft tracking-tight">
              Get In Touch
            </h2>

            <p className="font-inter text-base text-text-muted leading-relaxed">
              Feel free to reach out regarding software engineering or data-focused internship opportunities, technical projects, or inquiries.
            </p>

            {/* Verified Contact Details Grid */}
            <div className="space-y-4 pt-4">
              {/* Email */}
              <div className="p-4 rounded-xl bg-graphite border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-electric-lime/10 border border-electric-lime/30 flex items-center justify-center text-electric-lime shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="font-mono text-xs sm:text-sm text-text-soft hover:text-electric-lime transition-colors font-medium break-all"
                    >
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-obsidian-deep text-text-muted hover:text-white border border-white/5 transition-colors shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-electric-lime" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-graphite border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice-blue/10 border border-ice-blue/30 flex items-center justify-center text-ice-blue shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${portfolioData.personal.phone}`}
                      className="font-mono text-xs sm:text-sm text-text-soft hover:text-ice-blue transition-colors font-medium"
                    >
                      {portfolioData.personal.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-obsidian-deep text-text-muted hover:text-white border border-white/5 transition-colors shrink-0"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-ice-blue" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location & Institution */}
              <div className="p-4 rounded-xl bg-graphite border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-amber/10 border border-accent-amber/30 flex items-center justify-center text-accent-amber shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                    Campus & Location
                  </span>
                  <span className="font-inter text-xs sm:text-sm text-text-soft font-medium">
                    Coimbatore Institute of Technology · Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social / Professional profiles */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-graphite hover:bg-graphite-light border border-white/10 hover:border-ice-blue/40 font-mono text-xs text-text-soft hover:text-ice-blue transition-colors"
              >
                <LinkedInIcon className="w-4 h-4 text-ice-blue" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
              </a>

              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-graphite hover:bg-graphite-light border border-white/10 hover:border-electric-lime/40 font-mono text-xs text-text-soft hover:text-electric-lime transition-colors"
              >
                <GitHubIcon className="w-4 h-4 text-electric-lime" />
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message Dispatcher */}
          <div className="lg:col-span-6 bg-graphite/90 backdrop-blur-md rounded-2xl p-7 border border-white/10 shadow-card">
            <h3 className="font-grotesk font-bold text-xl text-text-soft mb-2">
              Send a Direct Message
            </h3>
            <p className="font-inter text-xs text-text-muted mb-6">
              Recruiters and collaborators can submit an inquiry directly below or copy the contact channels on the left.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-electric-lime/10 border border-electric-lime/30 text-center space-y-2 animate-fade-in">
                <Sparkles className="w-8 h-8 text-electric-lime mx-auto" />
                <h4 className="font-grotesk font-bold text-base text-text-soft">
                  Message Prepared
                </h4>
                <p className="font-inter text-xs text-text-muted">
                  Thank you! An email draft client has been prepared. You can also reach Shiv directly at <span className="font-mono text-electric-lime">{portfolioData.personal.email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Chen"
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-white/10 text-text-soft text-sm focus:border-electric-lime focus:outline-none focus:ring-1 focus:ring-electric-lime"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-white/10 text-text-soft text-sm focus:border-electric-lime focus:outline-none focus:ring-1 focus:ring-electric-lime"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-white/10 text-text-soft text-sm focus:border-electric-lime focus:outline-none focus:ring-1 focus:ring-electric-lime"
                  >
                    <option value="Software Engineering Internship">Software Engineering Internship</option>
                    <option value="Data & ML Engineering Opportunity">Data & ML Engineering Opportunity</option>
                    <option value="Project Collaboration">Project Collaboration</option>
                    <option value="General Conversation">Books, Gastronomy, or Music Exploration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the role, technical challenge, or idea..."
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-white/10 text-text-soft text-sm focus:border-electric-lime focus:outline-none focus:ring-1 focus:ring-electric-lime resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-obsidian bg-electric-lime hover:bg-electric-lime-dim transition-all shadow-glow-lime flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
