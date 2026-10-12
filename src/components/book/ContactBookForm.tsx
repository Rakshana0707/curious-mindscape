import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactBookForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '', // Honeypot spam trap
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  // Email regex format validation
  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot spam check
    if (formData._gotcha) {
      // Bot detected, silently reject
      setStatus('success');
      return;
    }

    // 2. Required field validation
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }
    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your message.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Environment variable or default Formspree endpoint targeting candidate
    const formspreeEndpoint = 
      (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_FORMSPREE_ENDPOINT || 
      'https://formspree.io/f/mqaeveka';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'Portfolio Inquiry: The Curious Mindscape',
          message: formData.message.trim(),
          recipient: portfolioData.personal.email,
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(
          errorData?.errors?.[0]?.message ||
          'Form delivery service responded with an error. You can also send an email directly using the link below.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network transmission error. Please use direct email dispatch below.');
    }
  };

  const mailtoHref = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry from The Curious Mindscape'
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="bg-stone-50 border border-amber-900/15 rounded-lg p-5 shadow-sm text-stone-900">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-900/10">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-800" />
          <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-amber-950">
            Correspondence Terminal
          </h4>
        </div>
        <span className="text-[10px] font-mono text-stone-500">
          Target: {portfolioData.personal.email}
        </span>
      </div>

      {status === 'success' ? (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded text-center space-y-2 animate-fadeIn">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h5 className="font-cinzel font-bold text-xs text-emerald-900 tracking-wider">
            TRANSMISSION RECORDED
          </h5>
          <p className="text-xs font-garamond text-emerald-800 leading-relaxed">
            Your dispatch has been successfully transmitted to <strong>{portfolioData.personal.name}</strong> at{' '}
            <span className="font-mono">{portfolioData.personal.email}</span>.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-2 text-[11px] font-mono text-emerald-700 underline hover:text-emerald-900 cursor-pointer"
          >
            Compose another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          {/* Honeypot Spam Field (hidden from genuine users) */}
          <input
            type="text"
            name="_gotcha"
            value={formData._gotcha}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {status === 'error' && (
            <div className="p-2.5 bg-rose-50 border border-rose-300 rounded text-xs text-rose-800 space-y-1.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span className="leading-tight">{errorMessage}</span>
              </div>
              <div className="pt-1 text-[11px] font-mono flex items-center gap-1.5">
                <span>Direct dispatch:</span>
                <a
                  href={mailtoHref}
                  className="text-amber-900 underline font-semibold hover:text-amber-950"
                >
                  Send via your email client ↗
                </a>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1">
                Your Name <span className="text-rose-600">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                aria-required="true"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Recruiter / Collaborator"
                className="w-full text-xs font-serif px-3 py-1.5 rounded border border-stone-300 bg-white focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1">
                Your Email Address <span className="text-rose-600">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                aria-required="true"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. name@domain.com"
                className="w-full text-xs font-serif px-3 py-1.5 rounded border border-stone-300 bg-white focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Software Systems Internship Opportunity"
              className="w-full text-xs font-serif px-3 py-1.5 rounded border border-stone-300 bg-white focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1">
              Message Dispatch <span className="text-rose-600">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message regarding technical opportunities, system design, or engineering inquiries..."
              className="w-full text-xs font-serif px-3 py-1.5 rounded border border-stone-300 bg-white focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-[9px] font-mono text-stone-500">
              Direct dispatch to {portfolioData.personal.email}
            </span>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-5 py-2 bg-amber-900 hover:bg-amber-800 disabled:bg-amber-900/60 text-amber-50 font-cinzel text-xs font-bold tracking-wider rounded shadow flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND MESSAGE</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Formspree Configuration Guide Drawer */}
      <div className="mt-4 pt-3 border-t border-amber-900/10">
        <button
          type="button"
          onClick={() => setShowConfigGuide(!showConfigGuide)}
          className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3 h-3 text-amber-800" />
          <span>Email Delivery Setup & Configuration Details</span>
          {showConfigGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showConfigGuide && (
          <div className="mt-2 p-3 bg-stone-100 rounded text-[10px] font-mono text-stone-700 space-y-1.5 leading-relaxed">
            <p className="font-bold text-amber-950">Formspree Integration Guide:</p>
            <p>1. Create a free form at <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="underline text-amber-900">formspree.io</a> targeting <strong className="text-amber-950">{portfolioData.personal.email}</strong>.</p>
            <p>2. Copy your Form ID (e.g. `mqaeveka` or `xbjnbkpy`).</p>
            <p>3. Set <code className="bg-white px-1 py-0.5 rounded border border-stone-300">VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID</code> in Vercel project environment variables, or keep the default endpoint.</p>
            <p>4. Submissions will land directly in your inbox with real-time sender timestamps.</p>
          </div>
        )}
      </div>
    </div>
  );
};
