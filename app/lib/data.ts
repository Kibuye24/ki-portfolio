export type ProjectCategory = "all" | "fullstack" | "ai" | "blog" | "ecommerce";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  color: string;
  category: ProjectCategory[];
  year: string;
  num: string;
  url?: string;
  featured?: boolean;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    title: "KooKoo: AI-Powered Sales & Inventory",
    description: "A comprehensive AI-driven ecosystem for commercial butchery and kitchens, featuring smart inventory tracking, automated WhatsApp ordering, and full ERP integration.",
    tags: ["AI", "Next.js", "Inventory Management", "WhatsApp API"],
    color: "#ff8c00",
    category: ["ai", "fullstack"],
    year: "2026",
    num: "01",
    url: "https://kookoo-qr.vercel.app",
    featured: true,
  },
  {
    title: "Appetite Blog",
    description: "A sleek, contemporary blog platform designed for culinary enthusiasts and lifestyle content creators.",
    tags: ["Next.js", "CMS", "Vercel", "Design"],
    color: "#e11d48",
    category: ["fullstack", "blog"],
    year: "2025",
    num: "02",
    url: "https://appetite.blog",
    featured: true,
  },
  {
    title: "TNKT News",
    description: "A high-performance Kenyan news blog delivering real-time updates and localized content for a broad audience.",
    tags: ["SEO", "Performance", "Next.js", "News"],
    color: "#2563eb",
    category: ["fullstack", "blog"],
    year: "2025",
    num: "03",
    url: "https://tnkt.co.ke",
    featured: true,
  },
  {
    title: "Nexus Data & Design",
    description: "The official platform for Nexus Data & Design, showcasing data-driven design solutions and high-end digital products.",
    tags: ["Data Visualisation", "React", "Branding"],
    color: "#10b981",
    category: ["fullstack"],
    year: "2025",
    num: "04",
    url: "https://dataxdesign.co.ke",
  },
  {
    title: "HLCC Africa",
    description: "A comprehensive hiring and staffing portal connecting top-tier talent with opportunities across the African continent.",
    tags: ["HRTech", "Full-Stack", "Employment"],
    color: "#8b5cf6",
    category: ["fullstack"],
    year: "2025",
    num: "05",
    url: "https://hlcc.africa",
  },
  {
    title: "Joga Bonito Haus",
    description: "A premium e-commerce destination for exclusive football jerseys and athletic apparel.",
    tags: ["E-commerce", "Stripe", "Next.js"],
    color: "#f59e0b",
    category: ["fullstack", "ecommerce"],
    year: "2024",
    num: "06",
    url: "https://jogabonitohaus.com",
  },
  {
    title: "Nexus CMS",
    description: "A specialized content management system designed for agility and high-level enterprise requirements.",
    tags: ["CMS", "Architecture", "API First"],
    color: "#64748b",
    category: ["fullstack"],
    year: "2024",
    num: "07",
    url: "https://nexus-cms-liard.vercel.app",
  },
  {
    title: "PRK Eight",
    description: "A high-end interface project for luxury real estate and architectural showcases.",
    tags: ["UI/UX", "Vercel", "Visualization"],
    color: "#0f172a",
    category: ["fullstack"],
    year: "2024",
    num: "08",
    url: "https://prk-eight.vercel.app",
  },
  {
    title: "AGSAK",
    description: "The official digital platform for the Association of Gender Studies in Africa, facilitating academic research and community advocacy.",
    tags: ["Academic", "Next.js", "Social Impact"],
    color: "#4f46e5",
    category: ["fullstack"],
    year: "2023",
    num: "09",
    url: "https://agsak.vercel.app",
  },
  {
    title: "Elima Program",
    description: "A digital sanctuary and community program dedicated to mentoring and empowering young girls.",
    tags: ["Community", "Mentorship", "Social Impact"],
    color: "#db2777",
    category: ["fullstack"],
    year: "2023",
    num: "10",
    url: "https://elima-ochre.vercel.app",
  }
];

export const experiences: Experience[] = [
  {
    period: "April 2025 — Present",
    role: "Software Engineer",
    company: "Digital Qatalyst",
    description: "Architecting and building high-performance software solutions for diverse digital initiatives.",
    tech: ["Next.js", "Node.js", "AI Integrations", "Vercel"],
  },
  {
    period: "September 2025 — Present",
    role: "Software Engineer",
    company: "Kenzugi",
    description: "Contributing to cutting-edge software development and product innovation within the Kenzugi ecosystem.",
    tech: ["TypeScript", "Full-Stack", "System Design"],
  },
  {
    period: "Jan 2024 — Present",
    role: "Full Stack / Mobile Developer",
    company: "Somastreaming",
    description: "Leading the development of cross-platform mobile experiences and robust full-stack applications.",
    tech: ["React Native", "Next.js", "Backend Systems"],
  },
  {
    period: "April 2023 — March 2025",
    role: "Full Stack Developer",
    company: "Reactionpower",
    description: "Built scalable web architectures and performed end-to-end full-stack development for enterprise-grade tools.",
    tech: ["React", "Express", "Microservices"],
  },
  {
    period: "April 2022 — March 2023",
    role: "Software Engineer",
    company: "Pawa IT",
    description: "Engineered robust technical solutions and collaborated on infrastructure projects for dynamic software requirements.",
    tech: ["GCP", "DevOps", "Node.js"],
  },
];

export const contact = {
  email: "joshkibbz@gmail.com",
  github: "https://github.com/Kibuye24/",
  linkedin: "https://www.linkedin.com/in/joshua-kibuye-2ab4b6140/",
  twitter: "https://x.com/KibuyeJosh",
};
