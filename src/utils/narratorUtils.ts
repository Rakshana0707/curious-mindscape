// Web Speech API Voice Narrator for The Curious Mindscape
// Recites each page/spread with a refined editorial reading voice and notifies upon completion for automatic page turning.

import { portfolioData } from '../data/portfolioData';

class NarratorManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private isAutoNarrateActive: boolean = false;
  private onFinishedCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoice();
      }
    }
  }

  private loadVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Preference: High-quality English voices (Natural, Neural, Google US/UK, Samantha, Daniel, Karen)
    const naturalEn = voices.find(v => 
      v.lang.startsWith('en') && (
        v.name.includes('Natural') || 
        v.name.includes('Neural') || 
        v.name.includes('Google UK English') || 
        v.name.includes('Google US English') ||
        v.name.includes('Samantha') ||
        v.name.includes('Daniel')
      )
    );

    const genericEn = voices.find(v => v.lang.startsWith('en'));
    this.preferredVoice = naturalEn || genericEn || voices[0];
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public isSpeaking(): boolean {
    return Boolean(this.synth && (this.synth.speaking || this.synth.pending));
  }

  public isAutoActive(): boolean {
    return this.isAutoNarrateActive;
  }

  public setAutoActive(active: boolean) {
    this.isAutoNarrateActive = active;
    if (!active) {
      this.stop();
    }
  }

  public stop() {
    this.onFinishedCallback = null;
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  // Generate natural editorial spoken script for each spread
  public getScriptForSpread(spreadIndex: number): string {
    switch (spreadIndex) {
      case 0:
        return `Welcome to The Curious Mindscape: A Technical Portfolio and Systems Architecture Monograph by ${portfolioData.personal.name}, Software Systems undergraduate at Coimbatore Institute of Technology. Academic Standing: CGPA 8.15. Click Open Portfolio to begin exploring.`;

      case 1:
        return `Section 1. Frontispiece and Professional Introduction. ${portfolioData.personal.name}, Software Systems undergraduate at Coimbatore Institute of Technology. ${portfolioData.personal.executiveSummary} Academic Foundation: Integrated Master of Science in Software Systems at CIT, 2024 to Present, with a CGPA of 8.15.`;

      case 2:
        return `Section 2. Table of Contents and Competency Taxonomy. Exploring technical disciplines across programming languages including Java, Python, C++, and 8086 Assembly. Web and Backend frameworks: React, Tailwind CSS, Node.js, FastAPI, and Flask. Machine Learning with Scikit-learn, Pandas, NumPy, and predictive algorithms. Databases: Firebase, MySQL, and SQLite. AI APIs: Gemini API, GPT-4o, and Web Speech API.`;

      case 3: {
        const p1 = portfolioData.projects.find(p => p.id === 'globalpulse');
        const p2 = portfolioData.projects.find(p => p.id === 'campcon');
        return `Chapter 1. Web and Intelligence Systems. First, ${p1?.title}: ${p1?.subtitle}. ${p1?.problem} ${p1?.solution} Built with React, Vite, Node.js, and MySQL. Next, ${p2?.title}: ${p2?.subtitle}. ${p2?.problem} ${p2?.solution} Features role-based access control and digital QR verification.`;
      }

      case 4: {
        const p1 = portfolioData.projects.find(p => p.id === 'zyatra');
        const p2 = portfolioData.projects.find(p => p.id === 'civiclenstn');
        return `Chapter 2. AI, Tourism, and Civic Platforms. First, ${p1?.title}: ${p1?.subtitle}. ${p1?.problem} ${p1?.solution} Indexes 129 Indian heritage monuments with spatial search and real-time Gemini AI guidance. Next, ${p2?.title}: ${p2?.subtitle}. ${p2?.problem} ${p2?.solution} Employs multilingual natural language processing to cross-examine political promises against state spending.`;
      }

      case 5: {
        const p1 = portfolioData.projects.find(p => p.id === 'contextiq');
        const p2 = portfolioData.projects.find(p => p.id === 'microdelay');
        return `Chapter 3. Behavioral Machine Learning and Time Intelligence. First, ${p1?.title}: ${p1?.subtitle}. ${p1?.problem} ${p1?.solution} Next, ${p2?.title}: ${p2?.subtitle}. ${p2?.problem} ${p2?.solution} Trains personalized Random Forest regressors reducing prediction error by approximately 10 percent, with hands-free voice logging.`;
      }

      case 6: {
        const p1 = portfolioData.projects.find(p => p.id === 'skillsync');
        const p2 = portfolioData.projects.find(p => p.id === 'lifelink');
        return `Chapter 4. Collaborative AI and Vital Platforms. First, ${p1?.title}: ${p1?.subtitle}. ${p1?.problem} ${p1?.solution} Powered by GPT-4o for capability vector analysis and win probability estimation. Next, ${p2?.title}: ${p2?.subtitle}. ${p2?.problem} ${p2?.solution} Features real-time emergency dispatch, Aadhaar-based identity verification, and live blood-stock tracking.`;
      }

      case 7:
        return `Chapter 5. Track Record, Honors, and Leadership. Awarded Special Mention at Rac-a-thon, a 24-hour inter-college hackathon, for developing real-time software under time constraints. Participated in the Smart India Hackathon internal round. Served as Event Chairperson for Nalam Anbudan under Rotaract Club of Vaagai Gang 50, delivering gratitude packages to essential workers. Holds verified certifications from Simplilearn in Software Engineering and Machine Learning.`;

      case 8:
        return `Chapter 6. Final Contact Spread. ${portfolioData.personal.closingMessage} Reach Shiv Rakshana directly by email at ${portfolioData.personal.email}, or submit an inquiry using the direct correspondence terminal on this page. All projects are verified in source resumes.`;

      case 9:
        return `Executive Monograph Summary. The Curious Mindscape represents the technical volume of ${portfolioData.personal.name}, Software Systems undergraduate at Coimbatore Institute of Technology. Documenting academic systems in machine learning, full-stack development, and natural language processing. All credentials verified.`;

      default:
        return '';
    }
  }

  // Speak script and trigger onComplete callback
  public speak(text: string, onComplete?: () => void) {
    if (!this.synth || !text) {
      if (onComplete) onComplete();
      return;
    }

    this.stop();
    this.onFinishedCallback = onComplete || null;

    const utterance = new SpeechSynthesisUtterance(text);
    if (!this.preferredVoice) this.loadVoice();
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }

    utterance.rate = 1.0; // Natural pacing
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = () => {
      this.currentUtterance = null;
      if (this.onFinishedCallback) {
        const cb = this.onFinishedCallback;
        this.onFinishedCallback = null;
        cb();
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.currentUtterance = null;
      if (this.onFinishedCallback) {
        const cb = this.onFinishedCallback;
        this.onFinishedCallback = null;
        cb();
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }
}

export const bookNarrator = new NarratorManager();
