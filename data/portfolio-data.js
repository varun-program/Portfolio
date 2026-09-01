/**
 * =========================================================================
 * VARUN G - PORTFOLIO DATA CONFIGURATION
 * =========================================================================
 * Easily manage, add, or edit your projects and resume details here.
 * You can also use the in-page "⚡ Manage Projects" tool to add new projects
 * and export the updated configuration automatically!
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Varun G",
    firstName: "Varun",
    lastName: "G",
    title: "Aspirant Developer & Full-Stack Engineer",
    statusBadge: "Available for Developer Internships",
    location: "Tiruppur, Tamil Nadu, India",
    email: "varunyt.sai@outlook.com",
    phone: "+91 8825677192",
    github: "https://github.com/varun-program",
    linkedin: "https://www.linkedin.com/in/varun-g-54a683284",
    bio: "Motivated and detail-oriented entry-level web developer with hands-on experience in building responsive web applications using HTML, CSS, JavaScript, React.js, and Java. Eager to contribute to innovative real-world projects while continuously expanding technical skills in a collaborative environment.",
    stats: [
      { label: "Core Projects", value: "5+" },
      { label: "Certifications", value: "3" },
      { label: "Academic Record", value: "75.4%" },
      { label: "Languages", value: "Java & JS" }
    ],
    areasOfInterest: [
      "Web Development",
      "Frontend Design",
      "Backend Systems",
      "Database Management"
    ],
    languagesKnown: [
      { name: "Tamil", level: "Native" },
      { name: "English", level: "Professional" },
      { name: "Telugu", level: "Conversational" }
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      icon: "code",
      items: [
        { name: "Java", level: "Advanced", desc: "OOP, System Architecture, Collections" },
        { name: "JavaScript (ES6+)", level: "Advanced", desc: "Async/Await, DOM APIs, Modern ESNext" }
      ]
    },
    {
      category: "Frontend Development",
      icon: "layout",
      items: [
        { name: "React.js", level: "Proficient", desc: "Hooks, SPA routing, State flows" },
        { name: "HTML5 & Semantic UI", level: "Expert", desc: "SEO, Accessibility, Clean Structure" },
        { name: "CSS3 & Modern Layouts", level: "Expert", desc: "Flexbox, Grid, Glassmorphism, Animations" },
        { name: "Responsive Design", level: "Expert", desc: "Mobile-first, Adaptive UI systems" }
      ]
    },
    {
      category: "Backend & Databases",
      icon: "database",
      items: [
        { name: "Node.js & Express", level: "Proficient", desc: "RESTful APIs, MVC, Middleware" },
        { name: "SQL", level: "Proficient", desc: "Relational queries, Schema design" },
        { name: "NoSQL / MongoDB", level: "Proficient", desc: "Document models, Aggregations" }
      ]
    },
    {
      category: "Tools & Methodologies",
      icon: "tool",
      items: [
        { name: "Git & GitHub", level: "Advanced", desc: "Version control, branching, PRs" },
        { name: "Figma", level: "Intermediate", desc: "UI wireframing & prototype design" },
        { name: "Vercel & Cloud", level: "Proficient", desc: "CI/CD pipelines & live hosting" }
      ]
    },
    {
      category: "AI & Productivity",
      icon: "sparkles",
      items: [
        { name: "Antigravity", level: "Advanced", desc: "Agentic AI workflows & SDKs" },
        { name: "ChatGPT & Claude", level: "Advanced", desc: "Prompt engineering & AI coding assistance" }
      ]
    }
  ],

  projects: [
    {
      id: "smartexpense-ai",
      title: "SmartExpense AI",
      subtitle: "AI-Powered Expense Tracker with OCR Receipt Scanner",
      category: "ai",
      categoryLabel: "AI / React",
      featured: true,
      image: "Images/Project-3.png",
      badge: "Featured AI Project",
      shortDescription: "Engineered an AI-powered expense tracking system with automated categorization of transactions, intelligent OCR receipt scanning, and interactive analytics dashboards.",
      highlights: [
        "Automated transaction categorization powered by Gemini AI models.",
        "Integrated intelligent receipt scanning with OCR technology to seamlessly parse financial line items.",
        "Developed an interactive analytics dashboard featuring real-time data visualization of spending habits and trends.",
        "Engineered full-stack security with JWT authentication, protected routes, and PDF statement generation."
      ],
      technologies: ["React.js", "Node.js", "Express", "MongoDB", "OCR AI", "Tailwind CSS"],
      liveUrl: "https://github.com/varun-program/upgrade-finance",
      githubUrl: "https://github.com/varun-program/upgrade-finance",
      updatedAt: "2025"
    },
    {
      id: "upgrade-finance",
      title: "Upgrade Finance",
      subtitle: "Privacy-First Offline Financial Tracker",
      category: "fullstack",
      categoryLabel: "Full-Stack",
      featured: true,
      image: "Images/Project-3.png",
      badge: "Privacy First",
      shortDescription: "A modern, privacy-first, offline-first personal finance platform allowing users to manage budgets, analyze expenses, and maintain full local data autonomy.",
      highlights: [
        "Offline-first architecture ensuring lightning-fast access with local caching and data persistence.",
        "Comprehensive category budgets with visual progression indicators and spending alerts.",
        "Export and import mechanisms supporting encrypted backup and CSV analysis.",
        "Clean, intuitive glassmorphic interface optimized for high productivity."
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage", "Data Analytics"],
      liveUrl: "https://github.com/varun-program/upgrade-finance",
      githubUrl: "https://github.com/varun-program/upgrade-finance",
      updatedAt: "2025"
    },
    {
      id: "event-registration-portal",
      title: "Event Registration Portal",
      subtitle: "Full-Featured Event Registration & Admin Management System",
      category: "react",
      categoryLabel: "React.js",
      featured: true,
      image: "Images/Project-2.png",
      badge: "Web Application",
      shortDescription: "Built a responsive event registration system with real-time validation, comprehensive admin attendee management, and CSV report export.",
      highlights: [
        "Built a responsive registration flow with instant client-side and server validation.",
        "Developed an administrative control panel for managing participants, seats, and event schedules.",
        "Enabled CSV export functionality to streamline organizational reporting and attendee verification.",
        "Implemented clean state handling with customizable participant tiers."
      ],
      technologies: ["React.js", "JavaScript", "CSS Modules", "CSV Export", "REST API"],
      liveUrl: "https://github.com/varun-program",
      githubUrl: "https://github.com/varun-program",
      updatedAt: "2025"
    },
    {
      id: "weather-app",
      title: "Weather Application",
      subtitle: "Real-Time Global Weather Forecasting Interface",
      category: "javascript",
      categoryLabel: "JavaScript",
      featured: false,
      image: "Images/Project-1.png",
      badge: "API Integration",
      shortDescription: "Integrated public weather APIs to fetch, compute, and render real-time meteorological forecasts with dynamic UI themes based on conditions.",
      highlights: [
        "Integrated public weather APIs to fetch and display accurate real-time forecasts and 5-day outlooks.",
        "Implemented robust error handling for invalid inputs, network timeouts, and geolocation fallback.",
        "Designed dynamic interface themes that adapt automatically based on current weather conditions."
      ],
      technologies: ["JavaScript (ES6+)", "Fetch API", "HTML5", "CSS3 Animations"],
      liveUrl: "https://varun-program.github.io/Weather-App/",
      githubUrl: "https://github.com/varun-program/Weather-App",
      updatedAt: "2024"
    },
    {
      id: "personal-portfolio",
      title: "Personal Developer Portfolio",
      subtitle: "Bespoke Cyber-Glassmorphic Interactive Portfolio",
      category: "javascript",
      categoryLabel: "HTML / CSS / JS",
      featured: false,
      image: "Images/Project-2.png",
      badge: "Live Website",
      shortDescription: "Designed and implemented a fully responsive layout with dynamic project management, interactive resume sync, and high performance.",
      highlights: [
        "Designed and implemented a fully responsive layout optimized for mobile, tablet, and desktop.",
        "Applied clean UI principles with semantic HTML, modular CSS, and zero framework bloat.",
        "Showcased personal projects and skills with interactive navigation and smooth user experience."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Vercel", "Glassmorphism"],
      liveUrl: "https://varun-program.github.io/Portfolio/",
      githubUrl: "https://github.com/varun-program/Portfolio",
      updatedAt: "2025"
    }
  ],

  education: [
    {
      degree: "B.Tech – Information Technology",
      institution: "VSB College of Engineering Technical Campus, Coimbatore",
      period: "2023 – 2027",
      grade: "75.4% (Undergraduate)",
      badge: "Current Degree",
      highlights: "Focusing on Software Engineering, Data Structures, Web Technologies, Database Systems, and Object-Oriented System Design."
    },
    {
      degree: "Diploma – Computer Science & Engineering",
      institution: "Konghu Vellalar Polytechnic College, Seenapuram",
      period: "2021 – 2023",
      grade: "73% (Diploma)",
      badge: "Completed",
      highlights: "Fundamental coursework in computer programming, computer networks, digital electronics, and relational database management."
    },
    {
      degree: "SSLC (10th Standard)",
      institution: "Bharathi Matric Higher Secondary School, Vijayamagalam",
      period: "2020 – 2021",
      grade: "100%",
      badge: "Centum Distinction",
      highlights: "Achieved a perfect 100% academic score in secondary school board examinations."
    }
  ],

  certifications: [
    {
      title: "Full Stack Web Development",
      issuer: "CORIZO",
      badge: "Full Stack",
      desc: "Comprehensive training covering modern frontend architecture, backend REST APIs, database design, and end-to-end web deployment."
    },
    {
      title: "JavaScript Certification",
      issuer: "GUVI",
      badge: "Certified",
      desc: "Advanced JavaScript concepts including asynchronous programming, closures, ES6+ features, and DOM manipulation."
    },
    {
      title: "HTML & CSS Certification",
      issuer: "GUVI",
      badge: "Certified",
      desc: "Modern semantic web layouts, responsive design patterns, CSS Grid & Flexbox, and accessibility standards."
    }
  ]
};

// Expose globally for browser usage
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
