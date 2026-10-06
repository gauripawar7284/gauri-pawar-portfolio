import ProfileImage from "../assets/Profile_Image.jpeg";
import ProfileCutout from "../assets/Profile_Cutout.webp";
import MediboatImage from "../assets/mediboat.webp";
import SapCtoolImage from "../assets/sap-ctool.png";
import LocalMartImage from "../assets/localmart.png";
import FixMateImage from "../assets/fixmate.png";
import PortFolioImage from "../assets/personal_portfolio.png";

// All real content below comes from the original frontend-craft portfolio.

export const profile = {
  name: "Gauri Pawar",
  firstName: "Gauri",
  initials: "GP",
  role: "Frontend Developer",
  tagline: ["Frontend", "Developer"],
  intro:
    "Frontend Developer passionate about building modern, responsive web experiences.",
  highlight: "responsive, user-friendly interfaces",
  profileImage: ProfileImage,
  profileCutout: ProfileCutout,
  resume: `${import.meta.env.BASE_URL}GAURI_PAWAR_RESUME.pdf`,
  github: "https://github.com/gauripawar7284",
  linkedin: "https://www.linkedin.com/in/gauri-pawar-b7464a420",
  email: "gauripawar7284@gmail.com",
  phone: "+91 7057567284",
  formEndpoint: "https://formspree.io/f/xqerlvdl",
};

export const about = {
  paragraph:
    "Results-driven Front-End Developer with 2.8 years of experience in designing and developing scalable web applications using React.js and modern JavaScript. Experienced in building responsive, user-friendly interfaces with a strong focus on performance and clean code practices. Worked on SAP-based enterprise applications involving API integration, debugging, and optimization. Familiar with Agile methodologies and tools like Git and Jira.",
  quote:
    "Currently enhancing skills in full-stack development to build end-to-end solutions.",
  stats: [
    { label: "Projects", value: 5, suffix: "+", caption: "Projects Delivered" },
    {
      label: "Experience",
      value: 2.8,
      suffix: "+",
      caption: "Years of Experience",
      decimals: 1,
    },
    {
      label: "Full-Stack",
      value: 2,
      suffix: "",
      caption: "End-to-End MERN Builds",
    },
  ],
};

export const projects = [
  {
    id: 1,
    title: "SAP CTOOL",
    category: "Enterprise Web App",
    description:
      "Internal SAP tool for configuring and managing customer promotion workflows across email, SMS and social channels. Built responsive UI with React and Redux, API integration and performance tuning.",
    tags: ["React", "Redux", "Enterprise"],
    year: "2025",
    image: SapCtoolImage,
    isPrivate: true,
  },
  {
    id: 2,
    title: "MediBot AI",
    category: "AI Healthcare App",
    description:
      "AI-powered chatbot for medical queries, health tracking, and connecting with nearby healthcare services.",
    tags: ["React", "AI", "REST API", "Tailwind"],
    year: "2025",
    image: MediboatImage,
    link: "https://medibot-ai.com/",
  },
  {
    id: 3,
    title: "Frontend Portfolio",
    category: "Personal Project",
    description:
      "Modern responsive portfolio built with React and Tailwind showcasing UI skills.",
    tags: ["React", "Tailwind", "Framer Motion"],
    year: "2025",
    image: PortFolioImage,
    link: "https://gauripawar7284.github.io/frontend-craft/",
  },
  {
    id: 4,
    title: "LocalMart",
    category: "Full Stack Project",
    description:
      "Multi-vendor marketplace for local shopkeepers with shop-specific products, inventory, cart, orders, role-based access, JWT authentication and Cloudinary image management.",
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    year: "2026",
    image: LocalMartImage,
    link: "https://localmart-pi.vercel.app/",
  },
  {
    id: 5,
    title: "FixMate",
    category: "Full Stack Project",
    description:
      "Urban Company-style local service marketplace with customer, provider and admin roles, JWT auth, real-time booking notifications, reviews and Cloudinary uploads.",
    tags: ["React", "Socket.IO", "MongoDB", "JWT"],
    year: "2026",
    image: FixMateImage,
    link: "https://client-ntmjsgiw0-gauri-pawar1.vercel.app/",
  },
];

export const process = [
  { title: "Understand", text: "Requirements, users, APIs" },
  { title: "Plan", text: "Structure & components" },
  { title: "Build", text: "React, clean code" },
  { title: "Style", text: "Responsive UI" },
  { title: "Test", text: "Debug & optimize" },
  { title: "Ship", text: "Deploy & iterate" },
];

export const expertise = [
  {
    id: "frontend",
    title: "Frontend Development",
    metric: "2.8+ years with React.js",
  },
  { id: "responsive", title: "Responsive UI", metric: "Mobile-first layouts" },
  { id: "api", title: "API Integration", metric: "Axios · REST · Redux state" },
  {
    id: "fullstack",
    title: "Full-Stack Builds",
    metric: "2 MERN projects shipped",
  },
  {
    id: "perf",
    title: "Performance & Debugging",
    metric: "Tuned SAP enterprise apps",
  },
  { id: "agile", title: "Agile Collaboration", metric: "Git · GitHub · Jira" },
];

export const tools = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Tailwind CSS",
  "Axios",
  "Node.js",
  "MongoDB",
  "Git",
  "GitHub",
];

export const availableFor = [
  "Frontend Developer Role",
  "React Developer Role",
  "Freelance UI Projects",
  "Fullstack Developer Role",
];
