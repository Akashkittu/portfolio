import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MonitorSmartphone,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Trophy,
  Workflow,
  ScanSearch,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const projectTabs = ["All", "Backend", "AI", "Full-Stack", "Mobile"];

const projectTypeMeta = {
  Backend: { icon: Server, tone: "from-cyan-400/20 via-sky-400/10 to-transparent" },
  AI: { icon: BrainCircuit, tone: "from-violet-400/20 via-fuchsia-400/10 to-transparent" },
  "Full-Stack": { icon: Layers3, tone: "from-indigo-400/20 via-violet-400/10 to-transparent" },
  Mobile: { icon: MonitorSmartphone, tone: "from-emerald-400/20 via-cyan-400/10 to-transparent" },
};

const projects = [
  {
    title: "Ground Pass Prediction Engine",
    type: "Backend",
    category: "Backend · Space Tech",
    description:
      "A backend system that predicts when satellites will be visible from ground stations and gives optimized scheduling APIs.",
    highlights: [
      "FastAPI backend",
      "Satellite pass prediction",
      "Scheduling logic",
      "PostgreSQL storage",
    ],
    stack: ["FastAPI", "Python", "PostgreSQL", "Alembic", "Docker", "SGP4"],
    link: "https://github.com/Akashkittu/digantara_assignment",
    stats: [
      { label: "Role", value: "Backend" },
      { label: "Focus", value: "APIs" },
      { label: "Depth", value: "Optimization" },
    ],
    accent: "from-cyan-400/30 via-sky-400/10 to-transparent",
  },
  {
    title: "Spike AI Multi-Agent Analytics Platform",
    type: "AI",
    category: "AI · Multi-Agent Systems",
    description:
      "A system that answers business questions by combining analytics data, SEO data, and LLM-based planning.",
    highlights: [
      "Multi-agent flow",
      "GA4 analytics",
      "SEO insights",
      "LLM planning",
    ],
    stack: [
      "FastAPI",
      "Python",
      "LiteLLM",
      "Gemini",
      "GA4 API",
      "Google Sheets",
    ],
    link: "https://github.com/Akashkittu/Batman_350-Spike-AI-BuildX-Project",
    stats: [
      { label: "Mode", value: "AI Workflows" },
      { label: "Input", value: "Business Data" },
      { label: "Output", value: "Actionable Answers" },
    ],
    accent: "from-violet-400/30 via-fuchsia-400/10 to-transparent",
  },
  {
    title: "Status Monitor & Incident Manager",
    type: "Full-Stack",
    category: "Full-Stack · Realtime",
    description:
      "A service monitoring platform with incident tracking, live updates, and AI-generated summaries.",
    highlights: [
      "Realtime updates",
      "Incident tracking",
      "JWT auth",
      "AI summaries",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Gemini"],
    link: "https://github.com/Akashkittu/status_website_frequency",
    stats: [
      { label: "Type", value: "Realtime App" },
      { label: "Auth", value: "Secure" },
      { label: "Experience", value: "Live UI" },
    ],
    accent: "from-indigo-400/30 via-violet-400/10 to-transparent",
  },
  {
    title: "KGP Yatri Mobility Platform",
    type: "Mobile",
    category: "Mobile · Full-Stack",
    description:
      "A ride-booking app for campus transport with maps, payments, authentication, and ride management.",
    highlights: ["Mobile UI", "Maps integration", "Payments flow", "User auth"],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Clerk",
      "Neon Postgres",
      "Stripe",
    ],
    link: "https://github.com/Akashkittu/kgp_yatri",
    stats: [
      { label: "Platform", value: "Mobile" },
      { label: "Flow", value: "Booking" },
      { label: "Product", value: "Campus Use" },
    ],
    accent: "from-emerald-400/25 via-cyan-400/10 to-transparent",
  },
];

const experience = [
  {
    role: "Backend Intern",
    company: "Enerzyflow",
    period: "Dec 2024 – Feb 2025",
    icon: Database,
    summary:
      "Worked on backend improvements for speed, security, SEO-related work, and overall product quality.",
    points: [
      "Improved backend-side SEO and discoverability",
      "Worked on performance and scalability",
      "Used MongoDB for backend data workflows",
      "Worked with JWT, RBAC, and OAuth2 auth",
    ],
    impact: "Improved product quality from both engineering and discoverability side.",
    theme: "from-cyan-400/25 via-sky-400/10 to-transparent",
  },
  {
    role: "Python Backend Intern",
    company: "developMyAi",
    period: "May 2025 – Jul 2025",
    icon: Server,
    summary:
      "Built backend flows for contact forms, chatbot support, and user communication.",
    points: [
      "Built Django backend for contact flow",
      "Integrated MySQL and email workflows",
      "Worked with Voiceflow chatbot integration",
      "Improved support and lead capture flow",
    ],
    impact: "Connected user communication, backend automation, and support workflows.",
    theme: "from-violet-400/25 via-fuchsia-400/10 to-transparent",
  },
  {
    role: "Backend Code Review and Optimization Trainee",
    company: "Outlier",
    period: "Oct 2024 – Nov 2024",
    icon: ShieldCheck,
    summary:
      "Reviewed backend code and improved structure, async flow, and maintainability.",
    points: [
      "Reviewed backend code quality",
      "Improved error handling",
      "Worked on cleaner async logic",
      "Made code easier to maintain",
    ],
    impact: "Focused on cleaner architecture and better maintainability.",
    theme: "from-amber-400/20 via-orange-400/10 to-transparent",
  },
  {
    role: "UI/UX and Software Developer Intern",
    company: "AdventureMonk",
    period: "Dec 2022 – Jan 2023",
    icon: MonitorSmartphone,
    summary:
      "Worked on frontend product pages, user flow design, and deployment tasks.",
    points: [
      "Built React-based pages and UI sections",
      "Worked with maps and calendar features",
      "Improved product flow and usability",
      "Deployed app on AWS EC2",
    ],
    impact: "Learned how product polish and deployment work together.",
    theme: "from-emerald-400/20 via-cyan-400/10 to-transparent",
  },
];

const skills = [
  {
    title: "Frontend and Product",
    icon: Layers3,
    items: [
      "React",
      "React Native",
      "TypeScript",
      "Responsive UI",
      "Product Thinking",
    ],
  },
  {
    title: "Backend and APIs",
    icon: Database,
    items: [
      "FastAPI",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
    ],
  },
  {
    title: "AI and Intelligent Workflows",
    icon: BrainCircuit,
    items: [
      "LangChain",
      "RAG",
      "LiteLLM",
      "Gemini",
      "Tool Calling",
      "Agent Flows",
    ],
  },
  {
    title: "Engineering Mindset",
    icon: TerminalSquare,
    items: [
      "System Design",
      "Scalability",
      "Performance",
      "Reliability",
      "Clean Code",
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    value: "github.com/Akashkittu",
    href: "https://github.com/Akashkittu",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/akash-burnwal-457463236",
    href: "https://www.linkedin.com/in/akash-burnwal-457463236/",
    icon: Linkedin,
  },
  {
    label: "Codeforces",
    value: "codeforces.com/profile/VRMcryptor",
    href: "https://codeforces.com/profile/VRMcryptor",
    icon: Trophy,
  },
  {
    label: "Email",
    value: "akashburnwal350@gmail.com",
    href: "mailto:akashburnwal350@gmail.com",
    icon: Mail,
  },
];

function SectionHeader({ badge, title, text }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-zinc-300 backdrop-blur-xl">
        <Sparkles className="h-3.5 w-3.5 text-violet-300" />
        <span>{badge}</span>
      </div>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-base leading-8 text-zinc-400 md:text-lg">{text}</p>
    </div>
  );
}

function Chip({ children, className = "" }) {
  return (
    <span
      className={`rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] text-zinc-300 ${className}`}
    >
      {children}
    </span>
  );
}

function Glow({ className }) {
  return <div className={`absolute rounded-full blur-3xl ${className}`} />;
}

function SectionShell({ id, tone = "violet", className = "", children }) {
  const tones = {
    violet: {
      border: "border-violet-400/15",
      topLine: "via-violet-400/60",
      sideGlow: "bg-violet-400/70",
      orb: "bg-violet-500/10",
    },
    cyan: {
      border: "border-cyan-400/15",
      topLine: "via-cyan-400/60",
      sideGlow: "bg-cyan-400/70",
      orb: "bg-cyan-500/10",
    },
    indigo: {
      border: "border-indigo-400/15",
      topLine: "via-indigo-400/60",
      sideGlow: "bg-indigo-400/70",
      orb: "bg-indigo-500/10",
    },
    amber: {
      border: "border-amber-400/15",
      topLine: "via-amber-400/60",
      sideGlow: "bg-amber-400/70",
      orb: "bg-amber-500/10",
    },
    emerald: {
      border: "border-emerald-400/15",
      topLine: "via-emerald-400/60",
      sideGlow: "bg-emerald-400/70",
      orb: "bg-emerald-500/10",
    },
    fuchsia: {
      border: "border-fuchsia-400/15",
      topLine: "via-fuchsia-400/60",
      sideGlow: "bg-fuchsia-400/70",
      orb: "bg-fuchsia-500/10",
    },
  };

  const theme = tones[tone] || tones.violet;

  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24 ${className}`}>
      <div
        className={`relative overflow-hidden rounded-[34px] border bg-white/[0.03] shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl ${theme.border}`}
      >
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${theme.topLine} to-transparent`}
        />
        <div className={`absolute left-0 top-10 h-24 w-[3px] rounded-r-full ${theme.sideGlow}`} />
        <div className={`absolute right-8 top-8 h-28 w-28 rounded-full blur-3xl ${theme.orb}`} />
        <div className="relative p-6 md:p-8 lg:p-10">{children}</div>
      </div>
    </section>
  );
}

function MiniStat({ label, value, glow }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
      <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
        {label}
      </div>
      <div className={`mt-2 text-xl font-semibold ${glow}`}>{value}</div>
    </div>
  );
}

function ProgressLine({ label, widthClass }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span>active</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-300 ${widthClass}`}
        />
      </div>
    </div>
  );
}

function Header({ mounted }) {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-10">
        <motion.div
          initial={mounted ? { opacity: 0, y: -18 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
          <div className="absolute -left-10 top-0 h-24 w-32 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute right-0 top-0 h-24 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex items-center justify-between gap-4 px-5 py-4 lg:px-6">
            <a href="#top" className="group flex items-center gap-4" data-cursor="true">
              <div className="relative">
                <div className="absolute -inset-[1.5px] rounded-[22px] bg-gradient-to-br from-violet-400/70 via-indigo-400/40 to-cyan-400/60 opacity-80 blur-[2px] transition duration-300 group-hover:opacity-100" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/10 bg-black/40 text-sm font-semibold tracking-[0.28em] text-white">
                  AB
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <div className="text-base font-semibold leading-none text-white lg:text-lg">
                   
                  </div>
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 md:flex">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  data-cursor="true"
                  whileHover={{ y: -2 }}
                  className="group relative overflow-hidden rounded-full px-5 py-3 text-sm font-medium text-zinc-300 transition hover:text-white"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-300 opacity-0 transition duration-300 group-hover:opacity-100" />
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contact"
              data-cursor="true"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative hidden items-center overflow-hidden rounded-full border border-violet-300/20 bg-gradient-to-r from-violet-500/90 via-indigo-500/90 to-cyan-500/80 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(99,102,241,0.35)] md:inline-flex"
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_35%)]" />
              <span className="relative">Let&apos;s Connect</span>
              <ArrowRight className="relative ml-2 h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function HeroSection({ mounted, reduceMotion, heroDots }) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {heroDots.map((dot) => (
          <motion.span
            key={dot.id}
            className="absolute rounded-full bg-violet-400/70"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              boxShadow: "0 0 14px rgba(129,140,248,0.45)",
            }}
            animate={
              reduceMotion
                ? {}
                : {
                    opacity: [0.22, 0.95, 0.22],
                    scale: [1, 1.55, 1],
                  }
            }
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-[4%] top-[2%] h-14 w-14 rounded-full border border-violet-300/40"
        >
          <span className="absolute -left-1 top-3 h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
        </motion.div>

        <motion.div
          animate={reduceMotion ? {} : { rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute right-[8%] top-[16%] h-20 w-20 rounded-full border border-cyan-300/20"
        >
          <span className="absolute bottom-2 right-3 h-2 w-2 rounded-full bg-cyan-300/60 shadow-[0_0_10px_rgba(103,232,249,0.6)]" />
        </motion.div>

        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: ["-10%", "10%", "-10%"], opacity: [0.1, 0.24, 0.1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] top-[14%] h-px w-[60%] rotate-[-12deg] bg-gradient-to-r from-transparent via-violet-300/40 to-transparent blur-[1px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: ["10%", "-8%", "10%"], opacity: [0.08, 0.2, 0.08] }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[56%] h-px w-[55%] rotate-[10deg] bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent blur-[1px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, 40, 0], y: [0, -18, 0], opacity: [0.12, 0.18, 0.12] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[16%] top-[35%] h-44 w-44 rounded-full bg-violet-500/10 blur-3xl"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, -35, 0], y: [0, 12, 0], opacity: [0.08, 0.16, 0.08] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[30%] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
      </div>

      <div className="relative max-w-5xl">
        <motion.div
          initial={mounted ? { opacity: 0, y: 12 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-zinc-200 shadow-[0_10px_35px_rgba(0,0,0,0.2)] backdrop-blur-xl"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-400/15">
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
          </span>
          Building backend, full-stack, and AI products
        </motion.div>

        <motion.h1
          initial={mounted ? { opacity: 0, y: 18 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-8 max-w-5xl font-semibold leading-[0.95] tracking-tight text-white"
        >
          <span className="block text-[0.9rem] font-medium uppercase tracking-[0.1em] text-zinc-400 md:text-[1rem] lg:text-[1.1rem]">
            I am
          </span>

          <span className="mt-2 block bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-5xl text-transparent md:text-7xl lg:text-[5.8rem]">
            Akash Burnwal.
          </span>
        </motion.h1>

        <motion.p
          initial={mounted ? { opacity: 0, y: 18 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-7 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg"
        >
          I am a software engineer who enjoys building backend systems, full-stack
          products, and practical AI tools. I like working on real problems and
          turning them into simple, useful products.
        </motion.p>

        <motion.div
          initial={mounted ? { opacity: 0, y: 18 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Chip>Backend Engineer</Chip>
          <Chip>Full-Stack Builder</Chip>
          <Chip>AI Projects</Chip>
          <Chip>Problem Solving</Chip>
        </motion.div>

        <motion.div
          initial={mounted ? { opacity: 0, y: 18 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            data-cursor="true"
            className="inline-flex items-center rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_40px_rgba(99,102,241,0.35)] transition hover:scale-[1.02]"
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>

          <a
            href="#experience"
            data-cursor="true"
            className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3.5 text-[13px] font-medium text-white transition hover:bg-white/[0.08]"
          >
            See Experience
          </a>
        </motion.div>

        <motion.div
          initial={mounted ? { opacity: 0, y: 18 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"
        >
          {[
            { label: "Projects", value: "04" },
            { label: "Internships", value: "04" },
            { label: "Codeforces", value: "1714" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_12px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                {item.label}
              </div>
              <div className="mt-2 text-xl font-semibold text-white">
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        initial={mounted ? { opacity: 0, y: 8 } : false}
        animate={mounted ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.7, delay: 0.45 }}
        href="#about"
        data-cursor="true"
        className="mx-auto mt-16 flex w-fit items-center gap-2 text-[13px] text-zinc-500 transition hover:text-zinc-300"
      >
        Scroll to explore
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}

function AboutSection() {
  return (
    <SectionShell id="about" tone="violet">
      <SectionHeader
        badge="About Me"
        title="Who I am and what I like building."
        text="I am a final-year Dual Degree student at IIT Kharagpur. I enjoy working on products from both sides — how they work inside and how they feel to users. That is why I like backend engineering, full-stack work, and AI systems that solve useful problems."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: GraduationCap,
            title: "Final-year at IIT Kharagpur",
            text: "I am currently in my final year at IIT Kharagpur, where I have been building both technical depth and practical problem-solving skills.",
          },
          {
            icon: Server,
            title: "I like backend work",
            text: "I enjoy APIs, databases, auth systems, scheduling logic, and making systems reliable.",
          },
          {
            icon: BrainCircuit,
            title: "I use AI in useful ways",
            text: "I like AI when it improves a workflow, saves time, or makes a system more helpful.",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                <Icon className="h-5 w-5 text-violet-300" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{item.text}</p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function HowIWorkSection({ reduceMotion }) {
  const steps = [
    {
      icon: BrainCircuit,
      title: "Understand the problem first",
      text: "I first try to understand what the product really needs and what should stay simple.",
    },
    {
      icon: Server,
      title: "Build the backend carefully",
      text: "I like working on APIs, database flow, auth, scheduling, and reliability.",
    },
    {
      icon: Code2,
      title: "Make the product feel clear",
      text: "I want users to feel that the product is clean, easy to use, and useful.",
    },
  ];

  const quickCards = [
    {
      icon: Briefcase,
      label: "Open To",
      value: "Backend / Full-Stack Roles",
    },
    {
      icon: Trophy,
      label: "Codeforces",
      value: "1714 · VRMcryptor",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: "IIT Kharagpur · Dual Degree",
    },
  ];

  return (
    <SectionShell tone="cyan" className="py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            badge="How I Work"
            title="I build simple products with strong backend thinking."
            text="I like turning ideas into systems that are easy to understand, reliable inside, and useful for real people."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {quickCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                      <Icon className="h-5 w-5 text-violet-300" />
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                        {card.label}
                      </div>
                      <div className="mt-1 text-sm font-medium text-zinc-200">
                        {card.value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <motion.div
            animate={
              reduceMotion
                ? {}
                : { y: [0, -10, 0], rotate: [-4, -2, -4], opacity: [0.65, 0.9, 0.65] }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-8 h-52 w-44 rounded-[30px] border border-violet-300/15 bg-gradient-to-br from-violet-500/10 via-violet-400/5 to-transparent backdrop-blur-2xl"
          />

          <motion.div
            animate={
              reduceMotion
                ? {}
                : { y: [0, 12, 0], rotate: [5, 7, 5], opacity: [0.55, 0.8, 0.55] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-10 h-64 w-52 rounded-[30px] border border-indigo-300/15 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent backdrop-blur-2xl"
          />

          <div className="relative z-10 rounded-[34px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Builder overview
                </div>

                <h3 className="mt-3 text-3xl font-semibold leading-tight text-white">
                  Clean backend logic.
                  <br />
                  Useful product thinking.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">
                  I enjoy building systems that are stable, practical, and easy to
                  understand. I care about both the logic inside the product and the
                  experience outside.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-3">
                <Rocket className="h-6 w-6 text-violet-300" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MiniStat label="Focus" value="Backend" glow="text-white" />
              <MiniStat label="Build Style" value="Simple" glow="text-violet-200" />
              <MiniStat label="Goal" value="Useful" glow="text-cyan-200" />
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-zinc-200">My usual flow</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    problem → backend → product → polish
                  </div>
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-zinc-300">
                  simple process
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {steps.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                        <Icon className="h-4 w-4 text-violet-300" />
                      </div>

                      <div>
                        <div className="text-sm font-medium text-zinc-200">
                          {item.title}
                        </div>
                        <div className="mt-1 text-xs leading-6 text-zinc-400">
                          {item.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-4">
                <ProgressLine label="Backend systems" widthClass="w-[88%]" />
                <ProgressLine label="Full-stack products" widthClass="w-[76%]" />
                <ProgressLine label="Practical AI workflows" widthClass="w-[70%]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}

function ProjectCard({ project, index, shouldAnimate }) {
  const meta = projectTypeMeta[project.type] || { icon: Rocket, tone: project.accent };
  const Icon = meta.icon;

  return (
    <motion.article
      initial={shouldAnimate ? { opacity: 0, y: 34 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={shouldAnimate ? { once: true, amount: 0.18 } : undefined}
      transition={shouldAnimate ? { duration: 0.55, delay: index * 0.06 } : undefined}
      whileHover={shouldAnimate ? { y: -6 } : undefined}
      className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-[1px] shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
    >
      <div className="relative h-full rounded-[31px] bg-[#070913]/95 p-7 backdrop-blur-2xl">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70 transition duration-500 group-hover:opacity-100`}
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-0 top-1/2 h-32 w-32 rounded-full bg-violet-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                <ScanSearch className="h-3.5 w-3.5 text-violet-300" />
                {project.category}
              </div>
              <h3 className="mt-5 text-2xl font-semibold leading-tight text-white md:text-[1.85rem]">
                {project.title}
              </h3>
            </div>

            <motion.div
              whileHover={shouldAnimate ? { rotate: 10, scale: 1.04 } : undefined}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border border-white/10 bg-black/30 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
            >
              <Icon className="h-6 w-6 text-violet-300" />
            </motion.div>
          </div>

          <p className="relative mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-[15px]">
            {project.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition duration-300 group-hover:bg-white/[0.055]"
              >
                <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                  {stat.label}
                </div>
                <div className="mt-2 text-sm font-medium text-zinc-200">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.highlights.map((item) => (
              <Chip
                key={item}
                className="bg-white/[0.03] text-zinc-200 transition duration-300 group-hover:border-white/15"
              >
                {item}
              </Chip>
            ))}
          </div>

          <div className="mt-7 rounded-[24px] border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">Tech stack</div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                <Workflow className="h-3.5 w-3.5" />
                build snapshot
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-zinc-300 transition duration-300 group-hover:bg-white/[0.07]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="text-sm text-zinc-500">Hover card for polish. Click for repo.</div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              data-cursor="true"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              View Project
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectsSection({ activeTab, setActiveTab, filteredProjects, reduceMotion }) {
  const tabCounts = useMemo(
    () =>
      projectTabs.reduce((acc, tab) => {
        acc[tab] = tab === "All" ? projects.length : projects.filter((p) => p.type === tab).length;
        return acc;
      }, {}),
    []
  );

  return (
    <SectionShell id="projects" tone="indigo">
      <SectionHeader
        badge="Projects"
        title="Projects that show how I think and how I build."
        text="These projects show backend logic, product thinking, and practical engineering. I kept the descriptions simple so anyone can quickly understand what I built."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {projectTabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            data-cursor="true"
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm transition ${
              activeTab === tab
                ? "border-violet-300/50 bg-violet-400/15 text-white shadow-[0_8px_30px_rgba(139,92,246,0.15)]"
                : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
            }`}
          >
            <span>{tab}</span>
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-zinc-400">
              {tabCounts[tab]}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 xl:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} index={index} shouldAnimate={!reduceMotion} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionShell>
  );
}

function ExperienceCard({ item, index, shouldAnimate }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 26 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={shouldAnimate ? { once: true, amount: 0.2 } : undefined}
      transition={shouldAnimate ? { duration: 0.55, delay: index * 0.06 } : undefined}
      whileHover={shouldAnimate ? { y: -4 } : undefined}
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-[1px]"
    >
      <div className="relative rounded-[29px] bg-[#070913]/95 p-6 backdrop-blur-2xl md:p-7">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.theme} opacity-70 transition duration-500 group-hover:opacity-100`}
        />
        <div className="relative z-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/25 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <Icon className="h-6 w-6 text-violet-300" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                  <Clock3 className="h-3.5 w-3.5 text-violet-300" />
                  {item.period}
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-white md:text-[1.85rem]">
                  {item.role}
                </h3>

                <p className="mt-1 text-base text-zinc-300">{item.company}</p>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-300">
                Internship
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 md:max-w-[240px]">
                {item.impact}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {item.points.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition duration-300 group-hover:bg-white/[0.05]"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                  <CheckCircle2 className="h-4 w-4 text-violet-300" />
                </div>
                <div className="text-sm leading-6 text-zinc-300">{point}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceSection({ reduceMotion }) {
  return (
    <SectionShell id="experience" tone="amber">
      <SectionHeader
        badge="Experience"
        title="Internships where I learned by building real things."
        text="I have worked in backend, product, and code quality focused roles. I wrote the experience in normal language so it feels more natural and easy to read."
      />

      <div className="relative mt-12">
        <div className="absolute left-[27px] top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-violet-400/40 via-white/10 to-transparent md:block" />

        <div className="grid gap-6">
          {experience.map((item, index) => (
            <div key={`${item.role}-${item.company}`} className="relative">
              <div className="absolute left-4 top-10 hidden h-5 w-5 rounded-full border border-violet-300/50 bg-[#0a0d17] shadow-[0_0_0_6px_rgba(139,92,246,0.08)] md:block" />
              <div className="md:pl-14">
                <ExperienceCard item={item} index={index} shouldAnimate={!reduceMotion} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function SkillsSection() {
  return (
    <SectionShell id="skills" tone="emerald">
      <SectionHeader
        badge="Skills"
        title="Tools and areas I use the most."
        text="I did not try to list every single technology. I only kept the things that best match the kind of work I want to do."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {skills.map((group) => {
          const Icon = group.icon;

          return (
            <div
              key={group.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  <Icon className="h-5 w-5 text-violet-300" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">Main working areas</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function ContactSection() {
  return (
    <SectionShell id="contact" tone="fuchsia" className="pb-20 pt-10 lg:pb-28">
      <div className="rounded-[30px] border border-white/10 bg-black/10 backdrop-blur-2xl">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.24em] text-zinc-300">
              <Mail className="h-3.5 w-3.5" />
              Contact
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Let&apos;s build something meaningful.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
              I am open to backend, backend-leaning full-stack, and product engineering
              roles. I am especially interested in teams solving real problems with
              strong engineering.
            </p>
          </div>

          <div className="grid gap-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http");

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  data-cursor="true"
                  className="group rounded-3xl border border-white/10 bg-black/20 p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                        <Icon className="h-5 w-5 text-violet-300" />
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                          {item.label}
                        </div>
                        <div className="mt-1 text-sm text-zinc-200">{item.value}</div>
                      </div>
                    </div>

                    <ExternalLink className="h-4 w-4 text-zinc-500 transition group-hover:text-zinc-300" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [cursorActive, setCursorActive] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const pointerFrame = useRef(0);
  const pointerPoint = useRef({ x: 0, y: 0 });

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(124,58,237,0.11), transparent 42%)`;

  const cursorX = useSpring(mouseX, {
    stiffness: 420,
    damping: 28,
    mass: 0.32,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 420,
    damping: 28,
    mass: 0.32,
  });

  const cursorDotX = useSpring(mouseX, {
    stiffness: 520,
    damping: 34,
    mass: 0.2,
  });

  const cursorDotY = useSpring(mouseY, {
    stiffness: 520,
    damping: 34,
    mass: 0.2,
  });

  const outerCursorLeft = useTransform(cursorX, (v) => v - 18);
  const outerCursorTop = useTransform(cursorY, (v) => v - 18);
  const dotCursorLeft = useTransform(cursorDotX, (v) => v - 3);
  const dotCursorTop = useTransform(cursorDotY, (v) => v - 3);

  const { scrollYProgress } = useScroll();

  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const enableInteractiveEffects = showCursor && !reduceMotion;

  const heroDots = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${4 + ((i * 19) % 92)}%`,
      top: `${7 + ((i * 17) % 80)}%`,
      size: 2 + (i % 3),
      delay: (i % 7) * 0.22,
      duration: 3.2 + (i % 4) * 0.65,
    }));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return projects;
    return projects.filter((project) => project.type === activeTab);
  }, [activeTab]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      pointerPoint.current = { x: e.clientX, y: e.clientY };

      if (pointerFrame.current) return;

      pointerFrame.current = window.requestAnimationFrame(() => {
        mouseX.set(pointerPoint.current.x);
        mouseY.set(pointerPoint.current.y);
        pointerFrame.current = 0;
      });
    },
    [mouseX, mouseY]
  );

  const handleMouseOver = useCallback((e) => {
    const target = e.target instanceof Element ? e.target : null;
    setCursorActive(Boolean(target && target.closest("a, button, [data-cursor='true']")));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updatePointerMode = () => {
      setShowCursor(mediaQuery.matches && !reduceMotion);
    };

    updatePointerMode();

    if (mediaQuery.matches && !reduceMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseover", handleMouseOver);
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePointerMode);
    } else {
      mediaQuery.addListener(updatePointerMode);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);

      if (pointerFrame.current) {
        window.cancelAnimationFrame(pointerFrame.current);
        pointerFrame.current = 0;
      }

      if (mediaQuery.addEventListener) {
        mediaQuery.removeEventListener("change", updatePointerMode);
      } else {
        mediaQuery.removeListener(updatePointerMode);
      }
    };
  }, [reduceMotion, handleMouseMove, handleMouseOver]);

  return (
    <div className={`min-h-screen bg-[#04050a] text-white ${enableInteractiveEffects ? "cursor-none" : ""}`}>
      {enableInteractiveEffects && (
        <>
          <motion.div
            animate={{
              scale: cursorActive ? 1.7 : 1,
              opacity: cursorActive ? 1 : 0.62,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.32 }}
            style={{ left: outerCursorLeft, top: outerCursorTop }}
            className="pointer-events-none fixed z-[100] h-9 w-9 rounded-full border border-violet-300/70 bg-violet-400/10 backdrop-blur-sm"
          />
          <motion.div
            animate={{
              scale: cursorActive ? 1.4 : 1,
            }}
            transition={{ type: "spring", stiffness: 480, damping: 30, mass: 0.2 }}
            style={{ left: dotCursorLeft, top: dotCursorTop }}
            className="pointer-events-none fixed z-[101] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]"
          />
        </>
      )}

      {enableInteractiveEffects ? (
        <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: spotlight }} />
      ) : (
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.10),transparent_35%)]" />
      )}

      <motion.div
        className="fixed left-0 top-0 z-[110] h-1 w-full origin-left bg-gradient-to-r from-violet-400 via-sky-400 to-fuchsia-400"
        style={{ scaleX: progressScaleX }}
      />

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#04050a]"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 text-2xl font-semibold tracking-[0.35em] text-white shadow-[0_0_80px_rgba(120,119,255,0.18)]">
                AB
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.35em] text-zinc-500">
                Loading Portfolio
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden">
        <Glow className="left-[-8rem] top-[-6rem] h-72 w-72 bg-violet-600/20" />
        <Glow className="right-[-6rem] top-20 h-80 w-80 bg-cyan-500/12" />
        <Glow className="bottom-16 left-1/3 h-72 w-72 bg-fuchsia-500/10" />

        <Header mounted={mounted} />

        <main id="top" className="relative z-10">
          <HeroSection
            mounted={mounted}
            reduceMotion={reduceMotion}
            heroDots={heroDots}
          />

          <AboutSection />

          <HowIWorkSection reduceMotion={reduceMotion} />

          <ProjectsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredProjects={filteredProjects}
            reduceMotion={reduceMotion}
          />

          <ExperienceSection reduceMotion={reduceMotion} />

          <SkillsSection />

          <ContactSection />
        </main>

        <footer className="border-t border-white/8 px-6 py-6 text-center text-sm text-zinc-500 lg:px-10">
          Built to present Akash Burnwal in a clean, modern, and strong way.
        </footer>
      </div>
    </div>
  );
}