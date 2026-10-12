import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { WorldsSection } from './sections/WorldsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CaseStudySection } from './sections/CaseStudySection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PdfContentAuditModal } from './components/PdfContentAuditModal';
import { Project } from './data/portfolioData';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleExploreClick = () => {
    const el = document.getElementById('worlds');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-text-soft selection:bg-electric-lime selection:text-obsidian flex flex-col font-inter">
      {/* Navigation Header */}
      <Navbar onOpenAuditModal={() => setIsAuditModalOpen(true)} />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Section 2: Hero */}
        <HeroSection onExploreClick={handleExploreClick} />

        {/* Section 3: The Four Interests */}
        <WorldsSection />

        {/* Section 4: Selected Projects */}
        <ProjectsSection onOpenProjectModal={(project) => setSelectedProject(project)} />

        {/* Section 6: Project Spotlight */}
        <CaseStudySection />

        {/* Section 5: About Me & Education */}
        <AboutSection />

        {/* Section 7: Experience, Achievements & Skills */}
        <ExperienceSection />

        {/* Section 9: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAuditModal={() => setIsAuditModalOpen(true)} />

      {/* Interactive Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <PdfContentAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </div>
  );
}

export default App;
