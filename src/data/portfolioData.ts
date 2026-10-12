export interface Project {
  id: string;
  title: string;
  category: 'systems' | 'ai' | 'ml' | 'fullstack';
  categoryLabel: string;
  technologies: string[];
  description: string;
  bullets: string[];
  role?: string;
  sourcePdf: 'PDF 1' | 'PDF 2' | 'Combined';
  status?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface Achievement {
  title: string;
  organization: string;
  award?: string;
  description: string;
  hasCertificate?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  levels?: string;
}

export interface InterestWorld {
  id: 'read' | 'create' | 'listen' | 'build';
  track: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  tags: string[];
}

export const portfolioData = {
  personal: {
    name: "SHIV RAKSHANA R",
    shortName: "Shiv Rakshana",
    title: "Software Systems Undergraduate",
    institution: "Coimbatore Institute of Technology",
    headline: "Books. Food. Music. Technology.",
    subtitle: "A Software Systems student interested in technology and building useful solutions.",
    summary: "Software Systems undergraduate with experience in building end-to-end applications, data analysis, prompt engineering, and system design. Skilled in full-stack development, machine learning, and data-driven problem solving, seeking software engineering and data-focused internship opportunities.",
    phone: "+91 93447 28663",
    email: "sivrakshanaravikumar@gmail.com",
    location: "Coimbatore, Tamil Nadu, India",
    linkedin: "https://www.linkedin.com/in/shiv-rakshana-ravikumar",
    github: "https://github.com/Rakshana0707",
  },

  education: [
    {
      degree: "Integrated MSc Software Systems",
      institution: "Coimbatore Institute of Technology",
      period: "2024 - Present",
      grade: "CGPA: 8.15 (Till 4th Semester)"
    },
    {
      degree: "Grade 12",
      institution: "Chaitanya Techno School, Coimbatore",
      period: "2024",
      grade: "Aggregate: 80 %"
    }
  ] as Education[],

  skills: {
    programmingLanguages: ["Java", "Python", "C++", "8086 Assembly"],
    webDevelopment: ["HTML", "CSS", "JavaScript", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "FastAPI", "Flask"],
    machineLearning: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "EDA", "Data Visualization", "Random Forest", "Classification", "Regression"],
    databases: ["Firebase", "MySQL", "SQLite", "Oracle (PL/SQL)"],
    aiAndIntegration: ["Prompt Engineering", "Gemini API", "GPT-4o", "OpenRouter API", "Web Speech API"],
    areasOfInterest: [
      "Full Stack Development",
      "Software Engineering",
      "Machine Learning",
      "Data Analytics & Predictive Analytics",
      "Product Engineering"
    ]
  },

  worlds: [
    {
      id: 'read',
      track: 'READ',
      title: 'The Reader',
      subtitle: 'Books & Curiosity',
      description: 'Exploring books and written ideas to learn different perspectives and expand knowledge.',
      accentColor: '#83BFFF', // Ice blue
      tags: ['Books', 'Knowledge', 'Curiosity']
    },
    {
      id: 'create',
      track: 'CREATE',
      title: 'The Experimenter',
      subtitle: 'Cooking & Refinement',
      description: 'Culinary experimentation, trying new ingredients, and refining outcomes with patience.',
      accentColor: '#F59E0B', // Warm amber
      tags: ['Cooking', 'Creativity', 'Experimentation']
    },
    {
      id: 'listen',
      track: 'LISTEN',
      title: 'The Listener',
      subtitle: 'Music & Patterns',
      description: 'Listening to music for inspiration, rhythm, and focus while working.',
      accentColor: '#2DD4BF', // Muted teal
      tags: ['Music', 'Rhythm', 'Focus']
    },
    {
      id: 'build',
      track: 'BUILD',
      title: 'The Builder',
      subtitle: 'Software & Problem Solving',
      description: 'Developing applications, designing systems, and applying AI and machine learning to build useful software.',
      accentColor: '#C6FF4D', // Electric lime
      tags: ['Full Stack', 'Machine Learning', 'Systems']
    }
  ] as InterestWorld[],

  projects: [
    {
      id: "grainly",
      title: "Grainly",
      category: "systems",
      categoryLabel: "Systems & Full-Stack",
      technologies: ["8086 Assembly", "Flask", "React", "DOSBox"],
      description: "A smart ration distribution platform connecting a React and Flask interface to an 8086-assembly engine through file-based communication.",
      bullets: [
        "Built an integrated ration distribution platform using React and Flask, connected to an 8086-assembly engine through file-based communication, with PIN authentication, request processing, quota/stock validation, and approval workflows.",
        "Implemented cooldown restrictions, offline handling, transaction logging, and admin monitoring to ensure secure, reliable, and traceable ration distribution."
      ],
      sourcePdf: "PDF 2",
      status: "Academic Project"
    },
    {
      id: "zyatra",
      title: "Zyatra",
      category: "ai",
      categoryLabel: "AI & Web Platform",
      technologies: ["React", "JavaScript", "Gemini API", "Python", "Firebase"],
      description: "A full-stack AI heritage tourism platform that integrates Gemini AI as a real-time cultural travel guide across 129 Indian heritage monuments.",
      bullets: [
        "Built a full-stack heritage tourism platform integrating Gemini AI as a real-time cultural travel guide across 129 Indian heritage monuments.",
        "Combines crowd-density prediction, live weather forecasting, date-aware itinerary planning, Haversine-based monument search, Web Speech narration, Google Maps directions, and a state-wise Excel data pipeline."
      ],
      sourcePdf: "PDF 1",
      status: "Academic Project"
    },
    {
      id: "contextiq",
      title: "ContextIQ",
      category: "ml",
      categoryLabel: "Machine Learning",
      technologies: ["Scikit-learn", "Classification", "Regression", "NLP/LLM"],
      description: "A machine learning-powered personal behavior intelligence system designed to detect context switching and reduce daily friction.",
      bullets: [
        "Built an ML-powered behavior intelligence system using classification, regression, and NLP/LLM techniques to address task forgetting, detect context switching, estimate recovery costs, and learn task-location associations.",
        "Provides interpretable behavioral insights and personalized recommendations to reduce daily friction and wasted time."
      ],
      sourcePdf: "PDF 1",
      status: "Academic Project"
    },
    {
      id: "microdelay",
      title: "MicroDelay",
      category: "ml",
      categoryLabel: "Machine Learning & APIs",
      technologies: ["Python", "FastAPI", "SQLite", "React", "Speech API"],
      description: "A personal time-intelligence platform using user-specific Random Forest models to reduce task duration estimation errors.",
      bullets: [
        "Engineered a personalized time-intelligence platform using user-specific Random Forest models to reduce prediction errors by ~10% over average baselines.",
        "Included a hands-free Speech API assistant that converts spoken delays into behavioral tags and automates backend logging with FastAPI and SQLite."
      ],
      sourcePdf: "PDF 1",
      status: "Academic Project"
    },
    {
      id: "skillsync",
      title: "SkillSync",
      category: "ai",
      categoryLabel: "AI Platform",
      technologies: ["React", "TypeScript", "GPT-4o", "Tailwind CSS"],
      description: "An AI-powered hackathon team optimization platform using GPT-4o to evaluate team skills and identify skill gaps.",
      bullets: [
        "Built an AI-powered hackathon team optimization platform using GPT-4o to evaluate team skills against problem statements, estimate win probability, and identify skill gaps.",
        "Developed a responsive React interface that generates tailored project ideas, task assignments, and strategic insights based on team capabilities."
      ],
      sourcePdf: "PDF 2",
      status: "Academic Project"
    },
    {
      id: "lifelink",
      title: "LifeLink",
      category: "fullstack",
      categoryLabel: "Full-Stack Web",
      technologies: ["React", "JavaScript", "SQLite", "Open-Router API"],
      description: "A real-time blood donation platform connecting donors, recipients, and blood banks through emergency alerts and live blood-stock tracking.",
      bullets: [
        "Developed a real-time blood donation platform connecting donors, recipients, and blood banks through emergency alerts, live blood-stock tracking, and nearby donor/facility mapping.",
        "Implemented multi-user portals, Aadhaar-based verification, gamified donor rewards, and SQLite-powered data synchronization."
      ],
      sourcePdf: "PDF 2",
      status: "Academic Project"
    },
    {
      id: "globalpulse",
      title: "GlobalPulse",
      category: "fullstack",
      categoryLabel: "Full-Stack & Desktop",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Java", "JavaFX"],
      description: "A news intelligence and analysis dashboard developed across desktop (JavaFX) and web (React/TypeScript) implementations.",
      bullets: [
        "Web Version (on-going): Built a React-based news intelligence dashboard enabling analysts to explore categorized headlines through keyword search, structured filtering, and dynamic content organization with responsive components.",
        "Desktop Version: Developed a JavaFX-based desktop application with categorized headlines, keyword search, and structured filtering with a modular OOP architecture and content analysis features."
      ],
      sourcePdf: "Combined",
      status: "Web On-going / Desktop Completed"
    }
  ] as Project[],

  achievements: [
    {
      title: "Rac-a-thon – Inter College Hackathon",
      organization: "Inter-College 24-Hour Hackathon",
      award: "Special Mention",
      description: "Awarded Special Mention at Rac-a-thon, a 24-hour inter-college hackathon, for designing and developing an innovative real-time solution within a competitive team environment.",
      hasCertificate: true
    },
    {
      title: "Smart India Hackathon – Internal Round",
      organization: "Coimbatore Institute of Technology",
      award: "Internal Round Participant",
      description: "Participated in internal college-level hackathon, collaborating in a team to design and develop an innovative problem-solving solution under time constraints.",
      hasCertificate: false
    },
    {
      title: "NALAM ANBUDAN",
      organization: "Rotaract Club of VAAGAI Gang 50",
      award: "Event Chairperson",
      description: "Orchestrated the funding and delivery of curated gratitude packages to over 50 local essential workers, achieving 100% community engagement.",
      hasCertificate: false
    }
  ] as Achievement[],

  certifications: [
    {
      name: "Learn C++ Programming – Beginner to Advance",
      issuer: "Simplilearn",
      levels: "Beginner & Advanced"
    },
    {
      name: "Introduction to Front-end",
      issuer: "Simplilearn",
      levels: "Certification Completed"
    }
  ] as Certification[],

  // Simplified case study based strictly on the Grainly resume entry
  caseStudy: {
    title: "Project Spotlight: Grainly",
    subtitle: "Smart Ration Distribution System",
    problem: "Public ration distribution systems require secure access verification, stock regulation, and dependable transaction records at the distribution point.",
    technologies: ["8086 Assembly", "Flask", "React", "DOSBox"],
    solution: "Built a ration distribution platform combining a React front-end and Flask back-end with an 8086-assembly engine running via DOSBox using file-based communication.",
    features: [
      "PIN authentication and request processing",
      "Quota and stock validation with approval workflows",
      "Cooldown restrictions to prevent repeat distribution",
      "Offline handling and transaction logging",
      "Admin monitoring for secure and traceable ration distribution"
    ]
  },

  pdfSourceAudit: {
    summary: "All information shown on this website is extracted directly from the two provided PDF resumes.",
    pdf1: "Covers MSc Software Systems at CIT (CGPA 8.15), Chaitanya Techno School (80%), Projects: ContextIQ, MicroDelay, GlobalPulse (React), Zyatra; Rotaract Leadership; Machine Learning & Python skills.",
    pdf2: "Covers MSc Software Systems at CIT (CGPA 8.15), Chaitanya Techno School (80%), Projects: Grainly, GlobalPulse (JavaFX), SkillSync, LifeLink; Simplilearn Certifications; Web Development, Java & C++ skills."
  }
};
