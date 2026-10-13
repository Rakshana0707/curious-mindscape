export interface Project {
  id: string;
  title: string;
  subtitle: string;
  chapter: string;
  chapterRoman: string;
  category: 'web-systems' | 'ai-civic' | 'behavioral-ml' | 'collab-vital' | 'systems-hardware' | 'systems' | 'ai' | 'ml' | 'fullstack';
  categoryLabel?: string;
  technologies: string[];
  description: string;
  problem: string;
  solution: string;
  contribution: string;
  technicalDecisions: string[];
  bullets: string[];
  metrics: string[];
  sourcePdf: 'PDF 1' | 'PDF 2' | 'Combined';
  status: string;
  githubUrl?: string;
  demoUrl?: string;
  pageNumber: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  pageNumber: number;
  chapter: string;
  technologies: string[];
  problem: string;
  requirementsAndConstraints: string[];
  approachAndDecisions: string[];
  implementation: string[];
  verifiedOutcome: string[];
  futureImprovements: string[];
  sourcePdf: 'PDF 1' | 'PDF 2' | 'Combined';
  githubUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  details?: string;
}

export interface Achievement {
  title: string;
  organization: string;
  award: string;
  description: string;
  hasCertificate: boolean;
  year?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  levels: string;
}

export interface TechnicalDomain {
  id: 'swe' | 'systems' | 'aiml' | 'fullstack';
  code: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  tags: string[];
}

export interface BookChapter {
  id: string;
  roman: string;
  title: string;
  subtitle: string;
  spreadIndex: number;
  pages: [number, number];
  description: string;
  category: 'foundation' | 'skills' | 'projects' | 'case-studies' | 'experience' | 'contact';
}

export const portfolioData = {
  personal: {
    name: "SHIV RAKSHANA R",
    shortName: "Shiv Rakshana",
    title: "Software Systems Undergraduate",
    degree: "Integrated MSc Software Systems",
    institution: "Coimbatore Institute of Technology",
    headline: "Engineering Solutions. Analyzing Systems. Building Better Software.",
    subtitle: "Software Systems undergraduate interested in software development, system analysis, and AI/ML, with experience building applications and solving technical problems.",
    summary: "Software Systems undergraduate with experience in building end-to-end applications, data analysis, prompt engineering, and system design. Skilled in full-stack development, machine learning, and data-driven problem solving, seeking software engineering and data-focused internship opportunities to apply technical skills and derive meaningful insights from real-world data.",
    phone: "+91 93447 28663",
    email: "sivrakshanaravikumar@gmail.com",
    location: "Coimbatore, Tamil Nadu, India",
    linkedin: "https://www.linkedin.com/in/shiv-rakshana-ravikumar",
    github: "https://github.com/Rakshana0707",
    portfolioUrl: "https://curious-mindscape.vercel.app",
    executiveSummary:
      "Software Systems undergraduate with experience in building end-to-end, user-focused applications, data analysis, and strong programming fundamentals. Skilled in prompt engineering, full-stack development, machine learning, and system design, seeking software engineering and data-focused internship opportunities to apply technical skills and derive meaningful insights from real-world data.",
    closingMessage:
      "Thank you for exploring this technical monograph. I am actively seeking software engineering, machine learning, and data-focused internship opportunities where I can apply rigorous systems thinking to real-world challenges.",
  },

  education: [
    {
      degree: "Integrated MSc Software Systems",
      institution: "Coimbatore Institute of Technology, Coimbatore",
      period: "2024 - Present",
      grade: "CGPA: 8.15 (Till 4th Semester)",
      details: "Rigorous 5-year integrated curriculum spanning data structures, algorithms, system architecture, database engineering, and machine learning."
    },
    {
      degree: "Grade 12",
      institution: "Chaitanya Techno School, Coimbatore",
      period: "2024",
      grade: "Aggregate: 80 %",
      details: "Senior secondary education with strong foundation in mathematics, physics, and computer science."
    }
  ] as Education[],

  skills: {
    programmingLanguages: ["Java", "Python", "C++", "8086 Assembly"],
    webDevelopment: ["HTML", "CSS", "JavaScript", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "FastAPI", "Flask"],
    machineLearning: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "EDA", "Data Visualization", "Random Forest", "Classification", "Regression"],
    databases: ["Firebase", "MySQL", "SQLite", "Oracle (PL/SQL)"],
    aiAndIntegration: ["Prompt Engineering", "Gemini API", "GPT-4o", "OpenRouter API", "Web Speech API", "Streamlit"],
    areasOfInterest: [
      "Machine Learning",
      "Data Analytics & Predictive Analytics",
      "Full Stack Development",
      "Software Engineering",
      "Systems Analysis & Architecture",
      "Product Engineering"
    ]
  },

  domains: [
    {
      id: 'swe',
      code: 'DEV',
      title: 'Software Engineering',
      subtitle: 'Application Development & Implementation',
      description: 'Developing applications using modern programming languages, frameworks, and software engineering practices.',
      accentColor: '#83BFFF',
      tags: ['Application Development', 'Programming', 'Software Design']
    },
    {
      id: 'systems',
      code: 'ARCH',
      title: 'Systems Analysis',
      subtitle: 'Requirements & System Design',
      description: 'Analyzing requirements, modeling system behavior, and designing structured solutions to software and real-world problems.',
      accentColor: '#F59E0B',
      tags: ['Requirements Analysis', 'System Modeling', 'Problem Solving']
    },
    {
      id: 'aiml',
      code: 'AI/ML',
      title: 'Artificial Intelligence & Machine Learning',
      subtitle: 'Data-Driven Intelligence',
      description: 'Exploring machine learning algorithms, data analysis, model development, and intelligent application design.',
      accentColor: '#2DD4BF',
      tags: ['Machine Learning', 'Data Analysis', 'Model Development']
    },
    {
      id: 'fullstack',
      code: 'SYS',
      title: 'Full-Stack & Systems Development',
      subtitle: 'Integrated Application Systems',
      description: 'Building web applications and exploring system-level programming, databases, and application integration.',
      accentColor: '#C6FF4D',
      tags: ['Full-Stack Development', 'Databases', 'Systems Programming']
    }
  ] as TechnicalDomain[],

  chapters: [
    {
      id: "synopsis",
      roman: "—",
      title: "Synopsis & Academic Foundation",
      subtitle: "Professional Profile & Education",
      spreadIndex: 1,
      pages: [1, 2],
      description: "Executive summary, academic standing at CIT, and core profile.",
      category: "foundation"
    },
    {
      id: "skills",
      roman: "—",
      title: "Table of Contents & Technical Skills",
      subtitle: "Volume Index & Competency Matrix",
      spreadIndex: 2,
      pages: [3, 4],
      description: "Complete reading pathway and taxonomy across languages, web, databases, and ML.",
      category: "skills"
    },
    {
      id: "web-systems",
      roman: "I",
      title: "Web & Intelligence Systems",
      subtitle: "GlobalPulse & CampCon Platforms",
      spreadIndex: 3,
      pages: [5, 6],
      description: "News analytics engines and university event intelligence applications.",
      category: "projects"
    },
    {
      id: "ai-civic",
      roman: "II",
      title: "AI, Tourism & Civic Platforms",
      subtitle: "Zyatra & CivicLensTN Platforms",
      spreadIndex: 4,
      pages: [7, 8],
      description: "Heritage tourism intelligence across 129 monuments and legislative budget NLP validation.",
      category: "projects"
    },
    {
      id: "behavioral-ml",
      roman: "III",
      title: "Behavioral ML & Time Intelligence",
      subtitle: "ContextIQ & MicroDelay Engines",
      spreadIndex: 5,
      pages: [9, 10],
      description: "Predictive cognitive modeling and personalized Random Forest delay calibration (~10% error reduction).",
      category: "projects"
    },
    {
      id: "collab-vital",
      roman: "IV",
      title: "Collaborative AI & Vital Platforms",
      subtitle: "SkillSync & LifeLink Systems",
      spreadIndex: 6,
      pages: [11, 12],
      description: "GPT-4o hackathon team optimizer and real-time Aadhaar-verified blood donation network.",
      category: "projects"
    },
    {
      id: "experience",
      roman: "V",
      title: "Experience, Honors & Certifications",
      subtitle: "Hackathons, Leadership & Qualifications",
      spreadIndex: 7,
      pages: [13, 14],
      description: "Rac-a-thon Special Mention, SIH participant, Rotaract Chairperson, and Simplilearn certifications.",
      category: "experience"
    },
    {
      id: "contact",
      roman: "VI",
      title: "Final Contact Spread",
      subtitle: "Closing Message & Live Correspondence Form",
      spreadIndex: 8,
      pages: [15, 16],
      description: "Working contact dispatch form, source PDF audit transparency, and verified links.",
      category: "contact"
    }
  ] as BookChapter[],

  projects: [
    {
      id: "globalpulse",
      title: "GlobalPulse",
      subtitle: "News Intelligence & Analysis Dashboard",
      chapter: "Web & Intelligence Systems",
      chapterRoman: "I",
      category: "web-systems",
      categoryLabel: "Full-Stack Intelligence",
      pageNumber: 5,
      technologies: ["React", "Vite", "Node.js", "MySQL", "REST API", "Tailwind CSS"],
      description: "Full-stack intelligence web application with automated REST API ingestion and time-series article tracking.",
      problem: "Software engineers and market analysts suffer from fragmented news feeds and lack unified trend tracking across fast-moving developer technologies.",
      solution: "Engineered a full-stack platform featuring automated REST API data ingestion, time-series article tracking, and custom NLP engines for real-time developer trend analysis.",
      contribution: "Sole architect and full-stack engineer responsible for React/Vite front-end, Node.js ingestion backend, MySQL schema design, and NLP tokenization algorithms.",
      technicalDecisions: [
        "Chose Node.js asynchronous pipeline to ingest multiple external news feeds without blocking.",
        "Implemented MySQL normalized relational schema with indexed publication timestamps for sub-50ms query latency on time-series queries."
      ],
      bullets: [
        "Developed a full-stack intelligence web app using React, Node.js, and MySQL with automated REST API ingestion and time-series article tracking.",
        "Built custom NLP engines for tech-aware tokenization, sentiment classification, and interactive dashboard filtering to analyze developer trends in real time."
      ],
      metrics: [
        "Automated REST API Ingestion",
        "Time-Series Article Tracking",
        "Custom Tech-Aware Tokenization NLP"
      ],
      sourcePdf: "PDF 2",
      status: "Verified Completed Project",
      githubUrl: "https://github.com/Rakshana0707"
    },
    {
      id: "campcon",
      title: "CampCon",
      subtitle: "Unified Campus Event & Engagement Platform",
      chapter: "Web & Intelligence Systems",
      chapterRoman: "I",
      category: "web-systems",
      categoryLabel: "Campus Platform",
      pageNumber: 6,
      technologies: ["React", "Vite", "JavaScript", "REST API", "MySQL"],
      description: "Campus event intelligence web application with categorized listings, keyword search, and structured filtering.",
      problem: "University activities suffer from fragmented communication, manual ticketing bottlenecks, and absence of administrative analytics.",
      solution: "Developed a centralized React-based event platform with modular role-based access control (RBAC), digital QR verification, and interactive event analytics.",
      contribution: "Designed and implemented the React component hierarchy, role-based route guards (admin vs student), and digital QR ticketing workflows.",
      technicalDecisions: [
        "Adopted Role-Based Access Control (RBAC) to enforce strict privilege boundaries between student attendees and faculty organizers.",
        "Created client-side QR generation and scanning verification to eliminate physical paper waste and avoid ticketing bottlenecks at entrance gates."
      ],
      bullets: [
        "Developed a React-based campus event intelligence web application with categorized listings, keyword search, and structured filtering for efficient activity exploration.",
        "Implemented a modular component architecture with role-based access control (RBAC), digital QR ticketing, and interactive analytics to streamline event participation and administrative workflows."
      ],
      metrics: [
        "Role-Based Access Control (RBAC)",
        "Digital QR Verification Ticketing",
        "Interactive Administrative Analytics"
      ],
      sourcePdf: "PDF 2",
      status: "Verified Completed Project",
      githubUrl: "https://github.com/Rakshana0707"
    },
    {
      id: "zyatra",
      title: "Zyatra",
      subtitle: "AI Heritage Tourism & Crowd Intelligence Platform",
      chapter: "AI, Tourism & Civic Platforms",
      chapterRoman: "II",
      category: "ai-civic",
      categoryLabel: "AI & Tourism",
      pageNumber: 7,
      technologies: ["React", "JavaScript", "Gemini API", "Python", "Firebase"],
      description: "Full-stack heritage tourism platform integrating Gemini AI as a real-time cultural travel guide across 129 Indian heritage monuments.",
      problem: "Travelers face uncoordinated crowd congestion, static guidebook data, and poor itinerary optimization when touring cultural landmarks.",
      solution: "Engineered an intelligent tourism suite integrating Gemini AI narration, crowd-density predictive models, weather forecasts, and Haversine spatial search.",
      contribution: "Built full-stack React frontend, integrated Gemini AI contextual guide, implemented Haversine proximity calculations, and constructed state-wise data ingestion pipelines.",
      technicalDecisions: [
        "Implemented Haversine formula on client-side for rapid geo-proximity calculations without requiring external paid routing APIs.",
        "Employed Gemini API structured prompting with fallback templates to guarantee cultural context fidelity across 129 national monuments."
      ],
      bullets: [
        "Built a full-stack heritage tourism platform integrating Gemini AI as a real-time cultural travel guide across 129 Indian heritage monuments.",
        "Combines crowd-density prediction, live weather forecasting, date-aware itinerary planning, Haversine-based monument search, Web Speech narration, Google Maps directions, and a state-wise Excel data pipeline."
      ],
      metrics: [
        "129 Indian Heritage Monuments Indexed",
        "Haversine Spatial Proximity Computation",
        "Real-Time Gemini AI Cultural Guide & Speech API"
      ],
      sourcePdf: "PDF 1",
      status: "Verified Completed Project",
      githubUrl: "https://github.com/Rakshana0707"
    },
    {
      id: "civiclenstn",
      title: "CivicLensTN",
      subtitle: "AI Public Accountability Platform",
      chapter: "AI, Tourism & Civic Platforms",
      chapterRoman: "II",
      category: "ai-civic",
      categoryLabel: "Civic NLP",
      pageNumber: 8,
      technologies: ["Python", "Flask", "Streamlit", "Scikit-learn", "Multilingual NLP"],
      description: "AI civic intelligence platform using multilingual NLP models to validate political claims against official state budgets.",
      problem: "Voters and policy analysts lack accessible, verified data pipelines to correlate electoral promises directly against government expenditure.",
      solution: "Created an interactive NLP verification engine matching political claims to published state budget allocations with evidence-backed evaluation scores.",
      contribution: "Developed the NLP text processing pipeline, fine-tuned claim-to-budget matching algorithms, and constructed the Streamlit verification dashboard.",
      technicalDecisions: [
        "Engineered multilingual text tokenization to process Tamil and English political claims uniformly.",
        "Used TF-IDF vectorization and cosine similarity to map claim entities to official state budget line items."
      ],
      bullets: [
        "Engineered an AI civic intelligence platform using multilingual NLP models to validate political claims against official state budgets.",
        "Constructed an interactive verification engine that matches promises to spending records and generates evidence-backed assessments."
      ],
      metrics: [
        "Multilingual NLP Claim Validation",
        "Official State Budget Cross-Referencing",
        "Evidence-Backed Accountability Scores"
      ],
      sourcePdf: "PDF 1",
      status: "Verified Completed Project",
      githubUrl: "https://github.com/Rakshana0707"
    },
    {
      id: "contextiq",
      title: "ContextIQ",
      subtitle: "Personal Behavior Intelligence System",
      chapter: "Behavioral ML & Time Intelligence",
      chapterRoman: "III",
      category: "behavioral-ml",
      categoryLabel: "Machine Learning",
      pageNumber: 9,
      technologies: ["Scikit-learn", "Classification", "Regression", "NLP/LLM", "Pandas"],
      description: "ML-powered behavior intelligence system designed to detect context switching and reduce daily friction.",
      problem: "Unmonitored context switching and task forgetting cause high cognitive recovery overhead and productivity decay.",
      solution: "Built predictive classification and regression models paired with NLP/LLM pipelines to model task forgetting and provide interpretable recovery recommendations.",
      contribution: "Designed feature extraction pipelines in Pandas, trained Scikit-learn classification & regression models, and developed personalized recovery prompts.",
      technicalDecisions: [
        "Framed task forgetting as a classification problem and recovery cost estimation as a continuous regression task.",
        "Incorporated task-location association features to improve context switch prediction accuracy."
      ],
      bullets: [
        "Built an ML-powered behavior intelligence system using classification, regression, and NLP/LLM techniques to address task forgetting, detect context switching, and estimate recovery costs.",
        "Learned task-location associations and formulated interpretable behavioral insights with personalized recommendations to reduce daily friction and wasted time."
      ],
      metrics: [
        "Cognitive Recovery Cost Estimation",
        "Task-Location Association Learning",
        "Interpretable Behavioral Insights"
      ],
      sourcePdf: "PDF 1",
      status: "Verified Completed Project",
      githubUrl: "https://github.com/Rakshana0707"
    },
    {
      id: "microdelay",
      title: "MicroDelay",
      subtitle: "Personal Time Estimation Intelligence System",
      chapter: "Behavioral ML & Time Intelligence",
      chapterRoman: "III",
      category: "behavioral-ml",
      categoryLabel: "Time Intelligence",
      pageNumber: 10,
      technologies: ["Python", "FastAPI", "SQLite", "React", "Speech API", "Random Forest"],
      description: "Personalized time-intelligence platform using user-specific Random Forest models reducing estimation errors by ~10%.",
      problem: "Individuals systematically misestimate project task durations due to optimism bias and uncalibrated personal scheduling patterns.",
      solution: "Trained personalized Random Forest regressors reducing prediction errors by ~10% over average baselines, coupled with hands-free Speech API voice delay logging.",
      contribution: "Trained Random Forest models, built hands-free voice logging using Web Speech API, and implemented FastAPI asynchronous endpoints with SQLite.",
      technicalDecisions: [
        "Trained separate user-specific models instead of a single global model to capture distinct individual latency habits.",
        "Integrated Web Speech API for hands-free audio transcription to minimize logging friction during busy work sessions."
      ],
      bullets: [
        "Engineered a personalized time-intelligence platform using user-specific Random Forest models to reduce prediction errors by ~10% over average baselines.",
        "Included a hands-free Speech API assistant that converts spoken delays into behavioral tags and automates backend logging with FastAPI and SQLite."
      ],
      metrics: [
        "~10% Error Reduction over Baseline",
        "Hands-Free Voice Speech API Tagging",
        "FastAPI & SQLite Asynchronous Pipeline"
      ],
      sourcePdf: "PDF 1",
      status: "Verified Completed Project",
      githubUrl: "https://github.com/Rakshana0707"
    },
    {
      id: "skillsync",
      title: "SkillSync",
      subtitle: "AI Hackathon Team Optimizer",
      chapter: "Collaborative AI & Vital Platforms",
      chapterRoman: "IV",
      category: "collab-vital",
      categoryLabel: "AI Team Optimization",
      pageNumber: 11,
      technologies: ["React", "TypeScript", "GPT-4o", "Tailwind CSS"],
      description: "AI-powered hackathon team optimization platform using GPT-4o to evaluate team skills and identify skill gaps.",
      problem: "Competitive hackathon teams often lack objective insight into skill distribution, resulting in imbalanced responsibilities and lower win likelihood.",
      solution: "Architected a GPT-4o powered capability evaluator that compares participant skill vectors against project requirements to project win probability.",
      contribution: "Developed the responsive React/TypeScript user interface, designed the team skill evaluation prompt schema, and generated automated role assignment views.",
      technicalDecisions: [
        "Used TypeScript strict interfaces for team skill matrices to prevent malformed evaluation inputs.",
        "Constructed structured JSON schema prompts for GPT-4o to return deterministic win probability estimates and specific gap alerts."
      ],
      bullets: [
        "Built an AI-powered hackathon team optimization platform using GPT-4o to evaluate team skills against problem statements, estimate win probability, and identify skill gaps.",
        "Developed a responsive React interface that generates tailored project ideas, task assignments, and strategic insights based on team capabilities."
      ],
      metrics: [
        "GPT-4o Capability Vector Analysis",
        "Algorithmic Win Probability Estimation",
        "Automated Task Assignment & Ideation"
      ],
      sourcePdf: "PDF 2",
      status: "Verified Completed Project",
      githubUrl: "https://github.com/Rakshana0707"
    },
    {
      id: "lifelink",
      title: "LifeLink",
      subtitle: "Smart Blood Donation Platform",
      chapter: "Collaborative AI & Vital Platforms",
      chapterRoman: "IV",
      category: "collab-vital",
      categoryLabel: "Vital Full-Stack",
      pageNumber: 12,
      technologies: ["React", "JavaScript", "SQLite", "OpenRouter API"],
      description: "Real-time blood donation platform connecting donors, recipients, and blood banks through emergency alerts and live blood-stock tracking.",
      problem: "Critical blood shortages in emergency care are worsened by fragmented inventory tracking and lack of verified donor dispatch.",
      solution: "Engineered a full-stack emergency donation platform featuring live blood-stock tracking, nearby donor/facility geolocation, and Aadhaar identity verification.",
      contribution: "Created multi-user portals (donor, recipient, hospital), built SQLite sync logic, integrated Aadhaar-based verification workflows, and implemented gamified rewards.",
      technicalDecisions: [
        "Designed role-separated views ensuring blood banks see inventory dashboards while donors see nearby alerts.",
        "Integrated SQLite local caching for offline continuity in areas with intermittent cellular reception."
      ],
      bullets: [
        "Developed a real-time blood donation platform connecting donors, recipients, and blood banks through emergency alerts, live blood-stock tracking, and nearby donor/facility mapping.",
        "Implemented multi-user portals, Aadhaar-based verification, gamified donor rewards, and SQLite-powered data synchronization to support secure and efficient blood donation management."
      ],
      metrics: [
        "Aadhaar-Based Identity Verification",
        "Live Blood-Stock Geolocation Tracking",
        "Emergency Broadcast Dispatch System"
      ],
      sourcePdf: "PDF 2",
      status: "Verified Completed Project",
      githubUrl: "https://github.com/Rakshana0707"
    },
    {
      id: "grainly",
      title: "Grainly",
      subtitle: "Smart Ration Distribution Platform (8086 Assembly Engine)",
      chapter: "Featured Case Studies",
      chapterRoman: "V",
      category: "systems-hardware",
      categoryLabel: "Systems & 8086 Assembly",
      pageNumber: 13,
      technologies: ["8086 Assembly", "Flask", "React", "DOSBox", "IPC"],
      description: "Hardware-to-web ration platform connecting React and Flask to an 8086 Assembly engine running in DOSBox via file-based IPC.",
      problem: "Public distribution systems require verifiable authentication, tamper-resistant quota validation, and offline resilience at local dispensing nodes.",
      solution: "Designed an architectural bridge coupling a React web interface and Flask REST backend with an 8086 Assembly engine executing inside DOSBox via synchronized file IPC.",
      contribution: "Designed cross-era architecture, coded 8086 Assembly authentication and quota verification modules, implemented Flask file IPC bridge, and built React admin monitoring portal.",
      technicalDecisions: [
        "Chose file-based IPC with atomic file locks to safely communicate between host OS Python process and 16-bit DOSBox emulation environment.",
        "Implemented hardware-level PIN verification and quota subtraction in assembly to guarantee immutable ledger rules."
      ],
      bullets: [
        "Built an integrated ration distribution platform using React and Flask, connected to an 8086-assembly engine through file-based communication, with PIN authentication, request processing, quota/stock validation, and approval workflows.",
        "Implemented cooldown restrictions, offline handling, transaction logging, and admin monitoring to ensure secure, reliable, and traceable ration distribution."
      ],
      metrics: [
        "Cross-Era File IPC (React/Flask ↔ DOSBox 8086)",
        "Hardware-Level PIN & Quota Security Logic",
        "Tamper-Resistant Offline Transaction Logging"
      ],
      sourcePdf: "PDF 2",
      status: "Systems Architecture Project",
      githubUrl: "https://github.com/Rakshana0707"
    }
  ] as Project[],

  caseStudies: [
    {
      id: "grainly-case-study",
      title: "Grainly: Smart Ration Distribution Platform",
      subtitle: "Multi-Tiered Bridge Connecting React & Flask to an 8086 Assembly Engine",
      pageNumber: 13,
      chapter: "Chapter V • Featured Case Studies",
      technologies: ["8086 Assembly", "Python Flask", "React", "DOSBox", "File IPC"],
      sourcePdf: "PDF 2",
      githubUrl: "https://github.com/Rakshana0707",
      problem:
        "Public ration distribution centers in remote areas face unauthorized collection, repetitive quota drawing, and frequent network disruptions. Dispensing terminals need deterministic, tamper-resistant transaction validation that operates dependably under constrained environments.",
      requirementsAndConstraints: [
        "Cross-Era Integration: Bridge modern web front-end (React) with 16-bit legacy architecture (8086 Assembly) executing inside DOSBox.",
        "Hardware-Level Authentication: Enforce PIN authentication and quota validation inside the assembly engine.",
        "Anti-Abuse Restrictions: Enforce mandatory cooldown periods to prevent rapid repeat claims.",
        "Offline Dependability: Support offline logging so transactions remain traceable during connectivity outages."
      ],
      approachAndDecisions: [
        "Selected a multi-tier IPC architecture: React client captures user input and PIN, Flask API sanitizes payloads and manages IPC file locks, and the 8086 assembly engine executes core validation logic.",
        "Implemented atomic file exchange protocols (`input.txt` and `output.txt`) to synchronize between the modern host operating system and 16-bit DOSBox emulator.",
        "Separated UI presentation entirely from ledger validation so assembly code remains lean, fast, and secure."
      ],
      implementation: [
        "Wrote 8086 assembly routines for PIN verification, quota checking, and stock subtraction with binary return codes.",
        "Built Flask backend to orchestrate DOSBox execution, monitor file system events, and serialize results into JSON.",
        "Created React interface providing real-time inventory dashboards, request status indicators, and administrative audit logs."
      ],
      verifiedOutcome: [
        "Achieved seamless bidirectional communication between React, Flask, and the 8086 assembly engine.",
        "Verified PIN authentication, quota/stock validation, cooldown enforcement, and offline transaction logging across test scenarios."
      ],
      futureImprovements: [
        "Port assembly routines to physical x86 microcontroller embedded hardware without virtualization.",
        "Implement cryptographic hash chaining across local transaction logs for tamper-evident multi-depot auditing."
      ]
    },
    {
      id: "microdelay-case-study",
      title: "MicroDelay: Personal Time Intelligence System",
      subtitle: "Personalized Random Forest Delay Modeling with Hands-Free Speech API",
      pageNumber: 14,
      chapter: "Chapter V • Featured Case Studies",
      technologies: ["Python", "FastAPI", "SQLite", "React", "Speech API", "Random Forest"],
      sourcePdf: "PDF 1",
      githubUrl: "https://github.com/Rakshana0707",
      problem:
        "Engineers and researchers consistently fall victim to the planning fallacy, underestimating task completion times based on optimistic heuristics rather than empirical delay patterns. Population-wide estimation models fail because individual friction points differ drastically.",
      requirementsAndConstraints: [
        "Personalized Calibration: Train individual machine learning regressors adapted to specific personal work rhythms.",
        "Zero-Friction Logging: Provide hands-free voice capture so logging interruptions does not itself cause context-switching delay.",
        "Measurable Error Reduction: Achieve demonstrable improvement in duration prediction compared to baseline averages.",
        "Low Overhead: Ensure fast local backend execution with lightweight persistence."
      ],
      approachAndDecisions: [
        "Selected Random Forest regression over linear models to capture non-linear interactions between task complexity, time of day, and prior delays.",
        "Trained user-specific regressors rather than a generalized model, honoring individual behavioral idiosyncrasies.",
        "Integrated the browser's native Web Speech API to enable instant voice-to-text tagging without heavy third-party dependencies."
      ],
      implementation: [
        "Built a responsive React interface with one-click voice recording and real-time task status tracking.",
        "Created a FastAPI asynchronous service with SQLite storage to process delay events and retrain regressors incrementally.",
        "Engineered feature pipelines in Python computing moving averages of task latency and context switch counts."
      ],
      verifiedOutcome: [
        "Reduced personal task duration prediction error by ~10% compared to static baseline averages.",
        "Verified end-to-end voice capture pipeline converting spoken interruption notes directly into categorized database tags."
      ],
      futureImprovements: [
        "Incorporate passive telemetry (e.g. IDE active window timers) to log delays without requiring explicit voice input.",
        "Implement Bayesian online updates for continuous model adaptation across changing semester workloads."
      ]
    }
  ] as CaseStudy[],

  achievements: [
    {
      title: "Rac-a-thon – Inter College Hackathon",
      organization: "Inter-College 24-Hour Hackathon",
      award: "Special Mention Award",
      description: "Awarded Special Mention at Rac-a-thon, a 24-hour inter-college hackathon, for designing and developing an innovative real-time solution within a competitive team environment.",
      hasCertificate: true
    },
    {
      title: "Smart India Hackathon – Internal Round",
      organization: "Coimbatore Institute of Technology",
      award: "Internal Round Participant",
      description: "Participated in internal college-level hackathon, collaborating in a team to design and develop an innovative problem-solving solution under strict time constraints.",
      hasCertificate: false
    },
    {
      title: "Event Chairperson – NALAM ANBUDAN",
      organization: "Rotaract Club of VAAGAI Gang 50",
      award: "Event Chairperson & Organizer",
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
      levels: "Verified Completion"
    }
  ] as Certification[],

  caseStudy: {
    title: "Project Spotlight: Grainly",
    subtitle: "Smart Ration Distribution System with 8086 Assembly Engine",
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
    pdf1: "Covers MSc Software Systems at CIT (CGPA 8.15), Chaitanya Techno School (80%), Projects: ContextIQ, MicroDelay, CivicLensTN, Zyatra; Rotaract Leadership; Machine Learning & Python skills.",
    pdf2: "Covers MSc Software Systems at CIT (CGPA 8.15), Chaitanya Techno School (80%), Projects: GlobalPulse, CampCon, SkillSync, LifeLink, Grainly; Simplilearn Certifications; Web Development, Java & C++ skills."
  },

  pdfAudit: {
    verifiedSourceSummary: "All text, metrics, achievements, and educational qualifications on this website are extracted verbatim from the candidate's two official PDF resumes.",
    pdf1: {
      name: "Resume PDF 1 (Data & AI Focus)",
      content: "Integrated MSc Software Systems at CIT (CGPA: 8.15 Till 4th Sem); Grade 12 Chaitanya Techno School (80%); Projects: ContextIQ, MicroDelay (~10% error reduction), CivicLensTN, Zyatra; Rotaract NALAM ANBUDAN Chairperson; SIH & Rac-a-thon Special Mention; ML & Python."
    },
    pdf2: {
      name: "Resume PDF 2 (Systems & Full-Stack Focus)",
      content: "Integrated MSc Software Systems at CIT (CGPA: 8.15 Till 4th Sem); Grade 12 Chaitanya Techno School (80%); Projects: GlobalPulse (React/Node/MySQL), CampCon, SkillSync, LifeLink, Grainly; Simplilearn C++ & Front-end; Java, C++, MySQL, Oracle PL/SQL, Full-Stack."
    }
  }
};
