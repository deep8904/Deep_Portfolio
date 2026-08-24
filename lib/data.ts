export const SITE = {
  name: "Deep Chadamiya",
  tagline: "PRODUCT · DESIGN · DEV",
  location: "Tempe · AZ",
  locationLong: "Based in Tempe · AZ",
  email: "deeppatel8904@gmail.com",
  phone: "+14805726950",
  phoneDisplay: "+1 (480) 572-6950",
  linkedin: "https://www.linkedin.com",
  github: "https://github.com",
  instagram: "https://www.instagram.com/",
  twitter: "https://x.com",
  youtube: "https://www.youtube.com/",
};

export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "work", label: "Work", href: "/work" },
  { id: "visuals", label: "Visuals", href: "/visuals" },
  { id: "about", label: "About", href: "/about" },
  { id: "resume", label: "Resume", href: "/resume" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: SITE.instagram },
  { label: "Twitter-X", href: SITE.twitter },
  { label: "Linkedin", href: SITE.linkedin },
  { label: "Youtube", href: SITE.youtube },
];

export const PILLARS = [
  {
    num: "01 -",
    title: "Product Thinking",
    meta: "RESEARCH · STRATEGY · SYSTEMS",
    body: "I look beyond the screen to understand the user, workflow, business goal, and system behind the product. That helps me decide what should be built before deciding what it should look like.",
  },
  {
    num: "02 -",
    title: "Experience Design",
    meta: "UX · UI · INTERACTION",
    body: "I turn complex workflows into clear information architecture, user flows, interfaces, and reusable design systems that make products easier to understand and use.",
  },
  {
    num: "03 -",
    title: "Engineering",
    meta: "FRONTEND · FULL STACK · IMPLEMENTATION",
    body: "I carry ideas into working software, building interfaces, connecting data and APIs, handling edge cases, and refining performance until the experience works beyond the prototype.",
  },
];

export const HOME_PROJECTS = [
  { slug: "creatorflow", name: "CreatorFlow", meta: "PRODUCT / 2025-26", placeholder: "[ COVER IMAGE — CREATORFLOW ]" },
  { slug: "kramflow", name: "KramFlow", meta: "PRODUCT / 2026", placeholder: "[ COVER IMAGE — KRAMFLOW ]" },
  { slug: "care", name: "C.A.R.E. for Horses", meta: "UX RESEARCH / 2025", placeholder: "[ COVER IMAGE — C.A.R.E. ]" },
  { slug: "glyph", name: "Glyph", meta: "APP DESIGN / 2025-26", placeholder: "[ COVER IMAGE — GLYPH ]" },
];

export const PROCESS = [
  {
    num: "/01",
    title: "Discover & Define",
    body: "I start by understanding the users, goals, workflows, constraints, and technical context. This helps me frame the right problem and define what success should look like before designing anything.",
  },
  {
    num: "/02",
    title: "Design & Validate",
    body: "I translate the problem into flows, information architecture, wireframes, and interface systems, then test assumptions and refine the experience before investing heavily in implementation.",
  },
  {
    num: "/03",
    title: "Build & Refine",
    body: "I bring the product into working software, connect real data and APIs, test responsive behavior and edge cases, improve performance, and iterate until the experience is ready for real use.",
  },
];

export const TESTIMONIALS = [
  {
    text: "“Reliable, creative, and always willing to take ownership. He consistently delivered thoughtful solutions and was a great person to have on the team.”",
    name: "Arjun Shinojiya",
    role: "CMO, Tibicle",
    avatar: "/images/testimonials/avatar-1.png",
  },
  {
    text: "“The redesign gave our business a completely new presence online. He understood our products, our customers, and created something that genuinely represented our brand.”",
    name: "Dev Patel",
    role: "Founder, Akshar Antique",
    avatar: "/images/testimonials/avatar-2.png",
  },
  {
    text: "“Having him on the team made a real difference during the event. He adapted quickly, handled technical needs smoothly, and brought a great creative eye to the photography.”",
    name: "Scarlett Kim",
    role: "Co-Founder, Worlds in Play",
    avatar: "/images/testimonials/avatar-3.webp",
  },
  {
    text: "“He made complicated student data much easier for us to understand and work with. The dashboards and visualizations were clear, practical, and genuinely useful.”",
    name: "Melissa Dickman",
    role: "ASU HIDA",
    avatar: "/images/testimonials/avatar-1.png",
  },
  {
    text: "“He has a strong eye for design and understands how to turn an idea into something polished. The work he created for our department was consistently excellent.”",
    name: "Nicholas Seidel",
    role: "ASU HIDA",
    avatar: "/images/testimonials/avatar-1.png",
  },
];

export const CAPABILITIES = [
  { label: "PRODUCT", value: "Systems & strategy" },
  { label: "DESIGN", value: "UX & interfaces" },
  { label: "ENGINEERING", value: "Full-stack implementation" },
  { label: "VISUAL", value: "Photography & storytelling" },
];

export const JOURNEY = [
  { org: "Endless", role: "(Software & Game Development)", years: "2026 – Present", logo: "/images/logos/endless-journey.png" },
  { org: "Arizona State University", role: "(Data & Dashboard Designer)", years: "2025", logo: "/images/logos/asu-journey.png" },
  { org: "Tibicle", role: "(Software Developer & UI/UX Designer)", years: "2022 – 2023", logo: "/images/logos/tibicle-journey.png" },
];

export const EDUCATION = [
  { school: "Arizona State University, Tempe, AZ", degree: "Master of Science in Information Technology, GPA: 4.0/4.0", year: "Dec 2025" },
  { school: "Vidush Somany Institute of Technology and Research, India", degree: "Bachelor of Engineering in Computer Engineering, GPA: 8.95/10.0", year: "Apr 2023" },
];

export const INTERESTS = [
  { title: "Photography", body: "Learning to notice light, composition, and moments." },
  { title: "Film & Video", body: "Thinking through pacing, motion, sound, and story." },
  { title: "Games", body: "Exploring interaction, feedback, systems, and player experience." },
  { title: "Live Production / AV", body: "Where software, hardware, people, and timing have to work together." },
];

export type WorkProject = {
  slug: string;
  num: string;
  title: string;
  year: string;
  category: string;
  description: string;
  coverLabel: string;
  layout: "landscape" | "split" | "wide";
  /** Bespoke text arrangement, matching the source design's per-card layout. */
  titleBlock: "title-year_category" | "category-year_title" | "title_category-year" | "title-category-year";
  status?: string;
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: "creatorflow",
    num: "PROJECT 01",
    title: "CreatorFlow",
    year: "2025–26",
    category: "PRODUCT · FULL STACK · AI",
    description:
      "A creator workflow platform bringing content planning, brand deals, repurposing, analytics, and automation into one connected system.",
    coverLabel: "[ COVER IMAGE — CREATORFLOW ]",
    layout: "landscape",
    titleBlock: "title-year_category",
  },
  {
    slug: "kramflow",
    num: "PROJECT 02",
    title: "KramFlow",
    year: "2026",
    category: "PRODUCT · REALTIME SYSTEMS · UX",
    description:
      "A live-event operating system that keeps operators, presenters, volunteers, and displays aligned around what is happening now and what happens next.",
    coverLabel: "[ COVER IMAGE — KRAMFLOW ]",
    layout: "landscape",
    titleBlock: "category-year_title",
  },
  {
    slug: "care",
    num: "PROJECT 03",
    title: "C.A.R.E. for Horses",
    year: "2025",
    category: "UX RESEARCH · ACCESSIBILITY",
    description:
      "A research-led redesign focused on simplifying information architecture, donation and volunteer journeys, usability, and accessibility for an equine nonprofit.",
    coverLabel: "[ COVER IMAGE — C.A.R.E. ]",
    layout: "split",
    titleBlock: "title_category-year",
  },
  {
    slug: "glyph",
    num: "PROJECT 04",
    title: "Glyph",
    year: "2026",
    category: "PRODUCT STRATEGY · FULL STACK",
    description:
      "An indie game developer platform exploring developer identity, projects, devlogs, structured playtesting feedback, collaboration, and local community.",
    coverLabel: "[ COVER IMAGE — GLYPH ]",
    layout: "wide",
    titleBlock: "title-category-year",
    status: "IN DEVELOPMENT",
  },
];

export const WORK_STUBS: Record<string, { label: string; title: string; body: string }> = {
  kramflow: {
    label: "KramFlow",
    title: "KramFlow — case study in progress.",
    body: "The full case study, covering product thinking, system design, and build, is coming in the next phase.",
  },
  care: {
    label: "C.A.R.E. for Horses",
    title: "C.A.R.E. for Horses — case study in progress.",
    body: "The full case study, covering research and redesign, is coming in the next phase.",
  },
  glyph: {
    label: "Glyph",
    title: "Glyph — case study in progress.",
    body: "The full case study, covering product strategy and build, is coming in the next phase.",
  },
};

// Ticketify, X-PASS, and Inventory System UI were removed after a targeted
// verification pass (local files + GitHub) found no repo, design export, or
// other real material behind any of the three — see the evidence summary.
export const MORE_WORK = [{ name: "Xbox Game Camp" }, { name: "ZoomBuddy+" }];

// Real photography data now lives in lib/photography-data.ts.

export const RESUME_EXPERIENCE = [
  {
    id: "endless",
    dates: "Aug 2026 — Present",
    org: "Endless Games Studio",
    location: "Mesa, AZ",
    role: "Software and Game Development",
    bullets: [
      "Support software and game development across lab programs through prototyping, coding support, playtesting, feature testing, bug documentation, and technical troubleshooting.",
      "Assist with development environments, builds, demo stations, workshops, and events while helping students and participants solve technical problems during hands-on projects.",
      "Collaborate on game development and special projects, including Endstar platform support, while identifying technical issues and communicating project risks to the team.",
    ],
  },
  {
    id: "asu",
    dates: "Oct 2024 — Dec 2025",
    org: "Arizona State University",
    location: "Tempe, AZ",
    role: "Design Technology Teaching Assistant / Database Assistant",
    bullets: [
      "Assisted design students with digital tools, prototyping, visual communication, portfolio development, and technical implementation, helping connect design ideas with practical technology.",
      "Designed Airtable systems with linked records, structured fields, views, and automated workflows, reducing manual processing time by 60% across 3 academic datasets.",
      "Built 6 Power BI and Tableau dashboards across 5+ programs, turning enrollment, academic standing, and graduation data into clear visual reports for faculty and staff.",
    ],
  },
  {
    id: "tibicle",
    dates: "Jan 2022 — Nov 2023",
    org: "Tibicle LLP",
    location: "Ahmedabad, India",
    role: "Software Developer Intern / Full-Stack Software Developer",
    bullets: [
      "Worked across product, design, and engineering on 3 SaaS and EdTech products, turning requirements and interface concepts into responsive applications using Angular, TypeScript, Java, REST APIs, and relational databases.",
      "Built reusable UI components, forms, dashboards, navigation, and role-based workflows for platforms supporting 500+ users, improving consistency and usability across product interfaces.",
      "Improved frontend architecture, state management, and API performance, reducing page load times by 40%; rebuilt third-party integrations and reduced integration defects by 60%.",
    ],
  },
];

export const RESUME_PROJECTS = [
  {
    title: "CreatorFlow",
    tagline: "AI Workspace for Creators",
    stack: "Product Design · React · Next.js · TypeScript · Supabase · AI",
    route: "creatorflow",
    bullets: [
      "Designed and built a full-stack creator platform for sponsorship management, content planning, analytics, AI-assisted repurposing, automation, and team collaboration.",
      "Defined information architecture, user flows, responsive interfaces, reusable UI patterns, and role-based experiences across 5 user roles, then implemented them in React and Next.js.",
      "Built authentication, PostgreSQL RLS, permissions, Edge Functions, and Gmail and YouTube API integrations connecting real creator data with AI and automation workflows.",
    ],
  },
  {
    title: "C.A.R.E. for Horses",
    tagline: "UX Research & Website Redesign",
    stack: "UX Research · UI/UX Design · Prototyping · Accessibility",
    route: "care",
    bullets: [
      "Conducted surveys, heuristic evaluation, competitive analysis, personas, and journey mapping to identify navigation, usability, accessibility, and content problems.",
      "Used findings from 16 survey responses to redesign information architecture, user flows, page hierarchy, and interaction patterns around clearer user tasks.",
    ],
  },
  {
    title: "ACM",
    tagline: "AI Content Publishing System",
    stack: "TypeScript · Gemini API · PostgreSQL · GitHub Actions · Vercel",
    route: null as string | null,
    bullets: [
      "Designed and built an AI workflow for trend discovery, source-backed research, content generation, editorial review, human approval, publishing, and deployment verification.",
      "Built structured LLM workflows with Gemini API, Zod validation, PostgreSQL state, retry handling, approval gates, and resumable automation.",
    ],
  },
];

export const RESUME_SKILLS = [
  {
    category: "Product & UX",
    items: ["Product Design", "UI/UX Design", "User-Centered Design", "Interaction Design", "Information Architecture", "User Flows", "Wireframing", "Prototyping", "User Research", "Usability Testing", "Accessibility", "WCAG"],
  },
  {
    category: "Design Systems & Tools",
    items: ["Figma", "Framer", "Design Systems", "Component Libraries", "Auto Layout", "Variables", "Design Tokens", "Responsive Design", "Data Visualization"],
  },
  {
    category: "Development",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Angular", "Node.js", "Java", "REST APIs", "Supabase", "PostgreSQL", "Git", "GitHub Actions", "Vercel"],
  },
  {
    category: "AI & Prototyping",
    items: ["LLM Integration", "Gemini API", "Claude Code", "Structured Outputs", "AI-Assisted Prototyping", "Workflow Automation", "Human-in-the-Loop Workflows", "Playtesting"],
  },
];

export const RESUME_SUMMARY =
  "Product Designer and Design Engineer with 4+ years building digital products across professional, academic, and independent work. Experience spans product design, UI/UX, frontend development, design systems, game technology, data visualization, and AI-powered products. Comfortable taking ideas from research and user flows through prototypes, responsive interfaces, production code, APIs, testing, and deployment.";
