"use client";

import React, { useRef, useState, useEffect, type FormEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

/* ──────────────────────────────────────────────
   Reusable animated section wrapper
   ────────────────────────────────────────────── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Stagger children animation wrapper
   ────────────────────────────────────────────── */
function StaggerContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ──────────────────────────────────────────────
   SVG Icon Components
   ────────────────────────────────────────────── */
function IconGlobe() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function IconMegaphone() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconBot() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconShoppingCart() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function IconCpu() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function IconTrendingUp() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function IconX() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#why-nexus" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: <IconGlobe />,
    title: "Custom Website Development",
    description:
      "Bespoke, high-performance websites engineered to convert visitors into customers. From sleek landing pages to complex web applications — built with cutting-edge technology and pixel-perfect design.",
  },
  {
    icon: <IconMegaphone />,
    title: "Digital Marketing & SEO",
    description:
      "Data-driven campaigns that put your brand in front of the right audience. We combine strategic SEO, paid media, and content marketing to deliver measurable, sustainable growth in organic and paid channels.",
  },
  {
    icon: <IconPhone />,
    title: "AI Calling Agents",
    description:
      "Intelligent voice agents that handle inbound and outbound calls with human-like fluency. Qualify leads, book appointments, and follow up — around the clock, without adding headcount.",
  },
  {
    icon: <IconBot />,
    title: "AI Chatbots",
    description:
      "Smart conversational chatbots trained on your business data. Engage website visitors instantly, answer FAQs, capture leads, and route enquiries — delivering instant responses 24/7.",
  },
  {
    icon: <IconHeadset />,
    title: "24/7 AI Customer Service",
    description:
      "End-to-end AI-powered support systems that never sleep. Automate ticket resolution, provide instant answers, and escalate complex issues seamlessly — reducing costs while boosting customer satisfaction.",
  },
];

const AUDIENCES = [
  {
    icon: <IconBriefcase />,
    title: "Service-Based Businesses",
    description:
      "Consultants, agencies, and professional firms looking to scale their pipeline and automate client interactions.",
  },
  {
    icon: <IconShoppingCart />,
    title: "E-Commerce Brands",
    description:
      "Online retailers seeking higher conversions, smarter marketing spend, and AI-powered customer engagement.",
  },
  {
    icon: <IconCpu />,
    title: "Tech & SaaS Companies",
    description:
      "Software companies ready to implement intelligent automation for sales, support, and lead qualification.",
  },
  {
    icon: <IconBuilding />,
    title: "Enterprises & SMEs",
    description:
      "Established businesses that want to modernise operations with AI integration and digital transformation.",
  },
];

const VALUE_PROPS = [
  {
    icon: <IconTrendingUp />,
    title: "ROI-Driven Results",
    description:
      "Every strategy is engineered around your bottom line. We measure success in revenue generated, not vanity metrics.",
  },
  {
    icon: <IconZap />,
    title: "Cutting-Edge AI Integration",
    description:
      "We deploy the latest in AI and automation to give your business a competitive edge that compounds over time.",
  },
  {
    icon: <IconMapPin />,
    title: "UK-Based Expertise",
    description:
      "A local team that understands the UK market, regulations, and business culture — with a global technology outlook.",
  },
  {
    icon: <IconUsers />,
    title: "Seamless Customer Experiences",
    description:
      "We design every touchpoint to delight your customers — from first click to lifelong loyalty, powered by intelligent systems.",
  },
];

const CASE_STUDIES = [
  {
    tag: "Web Experience",
    title: "Immersive 3D Website",
    metric: "+240%",
    metricLabel: "User Engagement",
    description:
      "Developed a stunning WebGL-powered 3D web experience that immersed visitors in the brand's universe, significantly boosting dwell time and lead generation.",
  },
  {
    tag: "Voice AI",
    title: "AI Outbound Calling Agent",
    metric: "15k+",
    metricLabel: "Calls Handled / Month",
    description:
      "Built a custom conversational voice AI that dials thousands of leads, handles objections seamlessly, and books qualified appointments on autopilot.",
  },
  {
    tag: "Customer Service",
    title: "Autonomous AI Helpdesk",
    metric: "85%",
    metricLabel: "Ticket Deflection",
    description:
      "Integrated a custom-trained language model into the client's support portal, enabling human-like resolution of complex queries in seconds.",
  },
  {
    tag: "E-Commerce",
    title: "E-Commerce Growth Engine",
    metric: "300%",
    metricLabel: "ROI Increase",
    description:
      "Transformed an underperforming online store with strategic SEO, targeted paid media, and AI-powered product recommendations.",
  },
  {
    tag: "Lead Generation",
    title: "B2B Acquisition Pipeline",
    metric: "5x",
    metricLabel: "Qualified Leads",
    description:
      "Engineered a high-converting landing page ecosystem paired with an AI qualification chatbot that captures and scores leads 24/7.",
  },
  {
    tag: "Digital Marketing",
    title: "Omnichannel Scale",
    metric: "4.2x",
    metricLabel: "ROAS Achieved",
    description:
      "Executed a multi-platform performance marketing campaign utilizing predictive AI targeting to dramatically lower customer acquisition costs.",
  },
];

/* ──────────────────────────────────────────────
   NAVIGATION
   ────────────────────────────────────────────── */
function Navigation({
  theme,
  onToggleTheme,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--theme-border)] bg-[var(--theme-nav-bg)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-[0.2em] text-[var(--theme-fg)]"
        >
          NEXUS SOLUTIONS
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--theme-muted)] transition-colors duration-300 hover:text-[var(--theme-fg)]"
            >
              {link.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            id="theme-toggle"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-card)] text-[var(--theme-fg)] transition-all duration-300 hover:bg-[var(--theme-card-hover)]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                {theme === "dark" ? <IconSun /> : <IconMoon />}
              </motion.span>
            </AnimatePresence>
          </button>

          <a
            href="#contact"
            className="rounded-full border border-[var(--theme-fg)] bg-[var(--theme-fg)] px-5 py-2 text-sm font-medium text-[var(--theme-bg)] transition-all duration-300 hover:bg-transparent hover:text-[var(--theme-fg)]"
          >
            Book a Free Growth Call
          </a>
        </div>

        {/* Mobile: Theme toggle + Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-card)] text-[var(--theme-fg)] transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                {theme === "dark" ? <IconSun /> : <IconMoon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[var(--theme-fg)]"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[var(--theme-border)] bg-[var(--theme-nav-bg)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-[var(--theme-muted)] transition-colors hover:text-[var(--theme-fg)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full border border-[var(--theme-fg)] bg-[var(--theme-fg)] px-5 py-3 text-center text-sm font-medium text-[var(--theme-bg)] transition-all duration-300 hover:bg-transparent hover:text-[var(--theme-fg)]"
              >
                Book a Free Growth Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="noise-bg grid-pattern relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Radial gradient accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-wider text-gray-400"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          UK-BASED B2B GROWTH AGENCY
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-heading)] text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          We Build the Digital
          <br />
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Future of Your Business
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
        >
          Nexus Solutions transforms ambitious UK businesses through cutting-edge web
          development, data-driven digital marketing, and intelligent AI
          automation — unlocking growth that compounds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            id="hero-cta"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Book a Free Growth Call
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              <IconArrowRight />
            </span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-gray-600">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <IconChevronDown />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   TARGET AUDIENCE SECTION
   ────────────────────────────────────────────── */
function AudienceSection() {
  return (
    <section id="audience" className="relative py-28 lg:py-36">
      <div className="gradient-line mb-20" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-gray-500">
            WHO WE PARTNER WITH
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built for Businesses
            <br />
            Ready to Scale
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            We work exclusively with growth-minded organisations that are ready
            to leverage digital and AI to dominate their market.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerChild}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                {item.icon}
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SERVICES SECTION (Accordion)
   ────────────────────────────────────────────── */
function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="services" className="relative py-28 lg:py-36">
      <div className="gradient-line mb-20" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection className="mb-16">
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-gray-500">
            OUR SERVICES
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            End-to-End Solutions
            <br />
            for Digital Dominance
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid gap-0 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Accordion */}
          <motion.div variants={staggerChild} className="space-y-0">
            {SERVICES.map((service, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={service.title}
                  className="border-b border-white/5"
                >
                  <button
                    onClick={() => setOpenIndex(idx)}
                    className="flex w-full items-center justify-between py-6 text-left transition-colors duration-300"
                    id={`service-accordion-${idx}`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-600"
                          }`}
                      >
                        {service.icon}
                      </span>
                      <span
                        className={`font-[family-name:var(--font-heading)] text-lg font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-500"
                          }`}
                      >
                        {service.title}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-600"
                        }`}
                    >
                      <IconChevronDown />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-12 pr-4 text-sm leading-relaxed text-gray-400">
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Feature highlight card */}
          <motion.div
            variants={staggerChild}
            className="mt-10 flex items-center lg:mt-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glow w-full rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent p-10 lg:p-14"
              >
                <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                  {SERVICES[openIndex].icon}
                </div>
                <h3 className="mb-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-white lg:text-3xl">
                  {SERVICES[openIndex].title}
                </h3>
                <p className="mb-8 leading-relaxed text-gray-400">
                  {SERVICES[openIndex].description}
                </p>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gray-300"
                >
                  Get started
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    <IconArrowRight />
                  </span>
                </a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   VALUE PROPOSITION SECTION
   ────────────────────────────────────────────── */
function ValuePropSection() {
  return (
    <section id="why-nexus" className="relative py-28 lg:py-36">
      <div className="gradient-line mb-20" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-gray-500">
            WHY NEXUS SOLUTIONS
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The Unfair Advantage
            <br />
            Your Competitors Don&apos;t Have
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={staggerChild}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="mb-2 font-[family-name:var(--font-heading)] text-5xl font-bold text-white/[0.06]">
                0{idx + 1}
              </div>
              <div className="mb-4 text-white">{item.icon}</div>
              <h3 className="mb-3 font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   RESULTS / CASE STUDIES SECTION
   ────────────────────────────────────────────── */
function ResultsSection() {
  return (
    <section id="results" className="relative py-28 lg:py-36">
      <div className="gradient-line mb-20" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-gray-500">
            PORTFOLIO & RESULTS
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Proven Impact,
            <br />
            Measurable Growth
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Every engagement is designed to deliver tangible results. Here&apos;s
            a snapshot of the outcomes we drive.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <motion.div
              key={study.title}
              variants={staggerChild}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05] lg:p-10"
            >
              {/* Background metric */}
              <div className="pointer-events-none absolute -right-4 -top-4 font-[family-name:var(--font-heading)] text-[8rem] font-bold leading-none text-white/[0.03] transition-all duration-500 group-hover:text-white/[0.06] lg:text-[10rem]">
                {study.metric}
              </div>

              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wider text-gray-400">
                  {study.tag}
                </span>
                <h3 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-semibold text-white lg:text-2xl">
                  {study.title}
                </h3>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-white">
                    {study.metric}
                  </span>
                  <span className="text-sm text-gray-400">
                    {study.metricLabel}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">
                  {study.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTACT & FOOTER SECTION
   ────────────────────────────────────────────── */
function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // We are using Web3Forms (password-free form forwarding).
      // 1. Go to https://web3forms.com/
      // 2. Enter your email and click "Create Access Key".
      // 3. Check your email for the key, and paste it here:
      const accessKey = "7b325b3d-e17a-4d6b-a65f-8c54b95e118e";

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New Enquiry from Nexus Solutions Website",
          from_name: "Nexus Solutions Website",
          ...formState,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitted(true);
      setFormState({ name: "", email: "", business: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div className="gradient-line mb-20" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: CTA */}
          <AnimatedSection>
            <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-gray-500">
              GET IN TOUCH
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Scale?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-400">
              Book a free, no-obligation growth call with our team. We&apos;ll
              analyse your current digital presence, identify the highest-impact
              opportunities, and map out a clear path to growth.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white">
                  <IconZap />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    Free Growth Audit
                  </h4>
                  <p className="text-sm text-gray-500">
                    We&apos;ll review your digital presence and provide
                    actionable insights — no strings attached.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white">
                  <IconTrendingUp />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    Custom Strategy
                  </h4>
                  <p className="text-sm text-gray-500">
                    Receive a tailored growth roadmap designed specifically for
                    your business and industry.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 lg:p-10"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder="John Smith"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors duration-300 focus:border-white/30 focus:bg-white/[0.08]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="john@company.co.uk"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors duration-300 focus:border-white/30 focus:bg-white/[0.08]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-business"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="contact-business"
                    required
                    value={formState.business}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, business: e.target.value }))
                    }
                    placeholder="Acme Ltd"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors duration-300 focus:border-white/30 focus:bg-white/[0.08]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    placeholder="Tell us about your project and goals..."
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors duration-300 focus:border-white/30 focus:bg-white/[0.08]"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="contact-submit"
                disabled={loading}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : submitted ? (
                  "Message Sent ✓"
                ) : (
                  <>
                    Book a Free Growth Call
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      <IconArrowRight />
                    </span>
                  </>
                )}
              </button>

              {error && (
                <p className="mt-3 text-center text-sm text-red-400">
                  {error}
                </p>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-[0.2em] text-white">
              NEXUS SOLUTIONS
            </span>
            <span className="text-xs text-gray-600">
              Elevating UK businesses through digital innovation & AI.
            </span>
          </div>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1 md:items-end">
            <span className="text-xs text-gray-600">
              © {new Date().getFullYear()} Nexus Solutions. All rights reserved.
            </span>
            <span className="text-xs text-gray-700">
              UK-Based Digital Growth Agency
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   FLOATING WHATSAPP BUTTON
   ────────────────────────────────────────────── */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/447000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      id="whatsapp-float"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
    >
      <span className="absolute h-14 w-14 rounded-full bg-green-500/30 animate-pulse-ring" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/20 transition-transform duration-300 hover:scale-110">
        <IconWhatsApp />
      </span>
    </a>
  );
}

/* ──────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────── */
export default function NexusSolutionsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("nexus-theme") as
      | "dark"
      | "light"
      | null;
    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("nexus-theme", next);
  };

  return (
    <>
      <Navigation theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <AudienceSection />
        <ServicesSection />
        <ValuePropSection />
        <ResultsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
