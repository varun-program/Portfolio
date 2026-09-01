/**
 * =========================================================================
 * VARUN G - PORTFOLIO DATA CONFIGURATION
 * =========================================================================
 * Easily manage, add, or edit your projects and details here.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Varun G",
    title: "Web & Java Developer",
    email: "varunyt.sai@outlook.com",
    github: "https://github.com/varun-program",
    linkedin: "https://www.linkedin.com/in/varun-g-54a683284",
    bio: "I'm a developer who enjoys building clean, interactive web applications and software projects. I have hands-on experience with HTML, CSS, JavaScript, React.js, and Java.",
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
      category: "Languages",
      icon: "code",
      items: [
        { name: "Java", level: "Core", desc: "OOP, Logic, Backend" },
        { name: "JavaScript", level: "ES6+", desc: "DOM, Async, Web APIs" }
      ]
    },
    {
      category: "Frontend",
      icon: "layout",
      items: [
        { name: "React.js", level: "Proficient", desc: "Components, Hooks, State" },
        { name: "HTML5 & CSS3", level: "Advanced", desc: "Semantic tags, Flexbox, Grid" },
        { name: "Responsive UI", level: "Advanced", desc: "Mobile, Tablet & Desktop layouts" }
      ]
    },
    {
      category: "Backend & Databases",
      icon: "database",
      items: [
        { name: "Node.js", level: "Proficient", desc: "Express, REST APIs" },
        { name: "SQL", level: "Proficient", desc: "Relational queries" },
        { name: "NoSQL / MongoDB", level: "Proficient", desc: "Collections, Documents" }
      ]
    },
    {
      category: "Tools & AI",
      icon: "tool",
      items: [
        { name: "Git & GitHub", level: "Advanced", desc: "Version control" },
        { name: "Figma", level: "Intermediate", desc: "UI Design & Wireframes" },
        { name: "AI Tools", level: "Proficient", desc: "ChatGPT, Claude, Antigravity" }
      ]
    }
  ],

  projects: [
    {
      id: "smartexpense-ai",
      title: "SmartExpense AI",
      subtitle: "Expense tracker with automated categorization & OCR receipt scanning",
      category: "ai",
      categoryLabel: "React & AI",
      featured: true,
      image: "Images/Project-3.png",
      badge: "React",
      shortDescription: "An AI-powered expense tracking system with automated categorization of transactions, receipt scanning using OCR technology, and an interactive spending analytics dashboard.",
      highlights: [
        "Engineered an AI-powered expense tracking system with automated categorization of transactions.",
        "Integrated intelligent receipt scanning using OCR technology to extract key financial data points seamlessly.",
        "Developed an interactive analytics dashboard featuring real-time data visualization of spending habits and trends."
      ],
      technologies: ["React.js", "Node.js", "Express", "MongoDB", "OCR AI"],
      liveUrl: "https://github.com/varun-program/upgrade-finance",
      githubUrl: "https://github.com/varun-program/upgrade-finance",
      updatedAt: "2025"
    },
    {
      id: "upgrade-finance",
      title: "Upgrade Finance",
      subtitle: "Privacy-first personal finance tracker",
      category: "fullstack",
      categoryLabel: "Full-Stack",
      featured: true,
      image: "Images/Project-3.png",
      badge: "Finance",
      shortDescription: "A modern, privacy-first, offline-first personal finance tracker to manage budgets, transactions, and expense analytics.",
      highlights: [
        "Offline-first architecture with fast local data storage.",
        "Category budgets with visual progression indicators and spending alerts.",
        "Clean, intuitive interface optimized for tracking daily expenses."
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
      liveUrl: "https://github.com/varun-program/upgrade-finance",
      githubUrl: "https://github.com/varun-program/upgrade-finance",
      updatedAt: "2025"
    },
    {
      id: "event-registration-portal",
      title: "Event Registration Portal",
      subtitle: "Event registration system with admin management",
      category: "react",
      categoryLabel: "React.js",
      featured: true,
      image: "Images/Project-2.png",
      badge: "React",
      shortDescription: "A responsive event registration system with real-time form validation, participant management admin panel, and CSV export functionality.",
      highlights: [
        "Built a responsive event registration system with real-time form validation.",
        "Developed an admin panel for managing participants and event details efficiently.",
        "Enabled CSV export functionality to streamline reporting and data analysis."
      ],
      technologies: ["React.js", "JavaScript", "CSS", "CSV Export"],
      liveUrl: "https://github.com/varun-program",
      githubUrl: "https://github.com/varun-program",
      updatedAt: "2025"
    },
    {
      id: "weather-app",
      title: "Weather Application",
      subtitle: "Live weather forecast application with API integration",
      category: "javascript",
      categoryLabel: "JavaScript",
      featured: false,
      image: "Images/Project-1.png",
      badge: "JavaScript",
      shortDescription: "A simple weather application that integrates a public weather API to fetch and display real-time forecast data with error handling and dynamic updates.",
      highlights: [
        "Integrated a public weather API to fetch and display real-time forecast data.",
        "Implemented error handling for invalid inputs and API failures to ensure reliability.",
        "Designed a simple, intuitive interface with dynamic updates based on user location or search."
      ],
      technologies: ["JavaScript", "Weather API", "HTML5", "CSS3"],
      liveUrl: "https://varun-program.github.io/Weather-App/",
      githubUrl: "https://github.com/varun-program/Weather-App",
      updatedAt: "2024"
    },
    {
      id: "personal-portfolio",
      title: "Personal Portfolio",
      subtitle: "Responsive developer portfolio",
      category: "javascript",
      categoryLabel: "HTML / CSS",
      featured: false,
      image: "Images/Project-2.png",
      badge: "HTML & CSS",
      shortDescription: "Designed and implemented a fully responsive layout optimized for mobile, tablet, and desktop with modular CSS for maintainability.",
      highlights: [
        "Designed and implemented a fully responsive layout optimized for mobile, tablet, and desktop.",
        "Applied clean UI principles with semantic HTML and modular CSS for maintainability.",
        "Showcased personal projects and skills with interactive navigation and smooth user experience."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript"],
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
      badge: "Current",
      highlights: "Undergraduate degree in Information Technology with coursework in Data Structures, Java, Database Systems, and Web Technologies."
    },
    {
      degree: "Diploma – Computer Science & Engineering",
      institution: "Konghu Vellalar Polytechnic College, Seenapuram",
      period: "2021 – 2023",
      grade: "73% (Diploma)",
      badge: "Completed",
      highlights: "Coursework in Computer Science fundamentals, programming, and database management."
    },
    {
      degree: "SSLC (10th Standard)",
      institution: "Bharathi Matric Higher Secondary School, Vijayamagalam",
      period: "2020 – 2021",
      grade: "100%",
      badge: "SSLC",
      highlights: "Completed secondary school education with 100% academic score."
    }
  ],

  certifications: [
    {
      title: "JavaScript Certification",
      issuer: "GUVI",
      badge: "GUVI",
      desc: "Certification in JavaScript programming fundamentals, ES6+ features, and DOM manipulation."
    },
    {
      title: "HTML & CSS Certification",
      issuer: "GUVI",
      badge: "GUVI",
      desc: "Certification in HTML5 semantic structure, CSS3 styling, and responsive web design."
    },
    {
      title: "Full Stack Web Development",
      issuer: "CORIZO",
      badge: "CORIZO",
      desc: "Training in Full Stack Web Development covering frontend, backend APIs, and databases."
    }
  ]
};

if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
