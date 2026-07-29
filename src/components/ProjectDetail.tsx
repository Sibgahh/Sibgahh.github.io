import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import VideoMockup from "./VideoMockup";
import CategoryProjects from "./CategoryProjects";
import PathTrail from "./PathTrail";
import { brandVideoProjects, isVideoBrand } from "@/data/videos";
import { creativeBrands, type CreativeBrandId } from "@/data/creative";
import { categoryKeyFromLabel, getPortfolioItem } from "@/data/portfolio";

/* ─── Project images ─── */
import eatease1 from "@/eatease/design (1).jpg";
import eatease2 from "@/eatease/design (2).jpg";
import eatease3 from "@/eatease/design (3).jpg";
import eatease4 from "@/eatease/design (4).jpg";
import eatease5 from "@/eatease/design (5).jpg";
import eatease6 from "@/eatease/design (6).jpg";

import sms1 from "@/summarecon/1.jpg";
import sms2 from "@/summarecon/2.jpg";
import sms3 from "@/summarecon/3.jpg";
import sms4 from "@/summarecon/4.jpg";
import sms5 from "@/summarecon/5.jpg";

import pos9 from "@/POS/9.jpg";
import pos10 from "@/POS/10.jpg";
import pos11 from "@/POS/11.jpg";
import pos12 from "@/POS/12.jpg";
import pos13 from "@/POS/13.jpg";
import pos14 from "@/POS/14.jpg";
import pos15 from "@/POS/15.jpg";

import eateaseThumbnail from "@/3dAssetThumbnail/eatease.jpeg";
import smsThumbnail from "@/3dAssetThumbnail/sms.jpeg";
import cangopiThumbnail from "@/3dAssetThumbnail/cangopi.jpeg";
import anakpipaThumbnail from "@/3dAssetThumbnail/anakpipa.jpeg";
import todoThumbnail from "@/3dAssetThumbnail/todo.jpeg";
import banner1 from "@/Website Banner/Banner1 (1).jpg";
import banner2 from "@/Website Banner/Banner1 (2).jpg";
import banner3 from "@/Website Banner/Banner1 (3).jpg";
import banner4 from "@/Website Banner/Banner1 (4).jpg";
import cheetask1 from "@/cheetask/design (1).png";
import cheetask2 from "@/cheetask/design (2).png";
import cheetask3 from "@/cheetask/design (3).png";
import cheetask4 from "@/cheetask/design (4).png";
import anakpipa9 from "@/anakpipa/9.jpg";
import anakpipa10 from "@/anakpipa/10.jpg";
import anakpipa11 from "@/anakpipa/11.jpg";
import anakpipa12 from "@/anakpipa/12.jpg";

function isCreativeBrandId(id: string): id is CreativeBrandId {
  return creativeBrands.some((brand) => brand.id === id);
}

interface CaseStudy {
  overview: string[];
  challenge: string;
  problem: string[];
  solution: string[];
  journey: string[];
  outcomes: string[];
  links?: string;
  responsibilities: string[];
  impact: string[];
}

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  type: string;
  stack: string[];
  description: string;
  highlights: string[];
  thumbnail: string;
  images: string[];
  /** Case-study narrative for Software Development projects */
  caseStudy?: CaseStudy;
}

const CASE_STUDY_SECTIONS = [
  { id: "challenge", label: "The Challenge", field: "challenge" as const },
  { id: "problem", label: "Problem", field: "problem" as const },
  { id: "solution", label: "Solution", field: "solution" as const },
  { id: "journey", label: "The Journey", field: "journey" as const },
  { id: "outcomes", label: "Outcomes", field: "outcomes" as const },
] as const;

const projectsData: Record<string, ProjectData> = {
  "pradita-canteen": {
    id: "pradita-canteen",
    title: "Pradita Canteen",
    subtitle: "Food Order System",
    period: "Mar 2025 – May 2025",
    role: "Fullstack Developer",
    type: "Mobile Application",
    stack: ["Flutter", "Dart", "Firebase Auth", "Firestore", "FCM"],
    description:
      "Designed and developed a full-featured mobile food ordering application for the university canteen using Flutter and Firebase, handling both frontend and backend responsibilities.",
    highlights: [
      "Implemented secure user authentication with role-based access control for three user types: customer, seller, and admin.",
      "Built an end-to-end order flow including food browsing, cart management, and payment gateway integration for seamless in-app transactions.",
      "Developed a real-time push notification system to keep customers informed of order status updates from placement to completion.",
    ],
    thumbnail: eateaseThumbnail,
    images: [eatease1, eatease2, eatease3, eatease4, eatease5, eatease6],
    caseStudy: {
      overview: [
        "Pradita Canteen is a full-stack mobile food ordering platform built for a university canteen environment. The product connects students, stall sellers, and platform admins in one Flutter application backed by Firebase Auth, Firestore, and Cloud Messaging.",
        "Beyond a simple menu browser, the system was designed as an operational tool: customers can browse, cart, pay, and track orders; sellers manage menus and fulfill requests in real time; admins oversee users, approvals, and transaction health. The goal was to shrink peak-hour queues while keeping every role informed without leaving the app.",
        "I owned both frontend and backend responsibilities end to end — from information architecture and UI implementation to authentication models, order state machines, payment integration, and push notification flows.",
      ],
      challenge:
        "Campus canteen demand spikes hard between class blocks. Paper tickets and verbal updates could not keep students, sellers, and admins aligned. The challenge was to design and ship a single mobile product that feels fast for customers, practical for sellers under pressure, and observable for admins — without fragmenting into three disconnected apps.",
      problem: [
        "Long queues and unclear wait times during peak campus hours.",
        "No shared system for customers, sellers, and admins to stay in sync.",
        "Manual order handling made status updates easy to miss.",
        "Sellers lacked a simple panel to manage menus and incoming orders.",
        "Admins had limited visibility into platform health and seller onboarding.",
      ],
      solution: [
        "Role-based authentication with dedicated customer, seller, and admin experiences.",
        "End-to-end order flow covering browse, cart, checkout, and payment gateway.",
        "Realtime push notifications via FCM so status changes reach users immediately.",
        "Seller tooling for menu CRUD and live order fulfillment.",
        "Admin controls for users, seller approval, and transaction monitoring.",
      ],
      journey: [
        "Mapped roles, permissions, and order states across the full canteen workflow.",
        "Built Flutter screens and Firestore schemas for menus, carts, and orders.",
        "Integrated payment handling and FCM feedback loops for transactional clarity.",
        "Iterated seller and admin panels against real operational edge cases.",
        "Hardened authentication and history views for reliable day-to-day use.",
      ],
      outcomes: [
        "Shipped a production-ready multi-role ordering app on Flutter and Firebase.",
        "Students gained clear order history and live status tracking.",
        "Sellers and admins operated from the same product surface.",
        "Established a reusable pattern for campus-scale food commerce experiences.",
      ],
      links: "—",
      responsibilities: [
        "Defining multi-role product flows for customers, sellers, and admins",
        "Building Flutter UI across ordering, fulfillment, and management screens",
        "Implementing Firebase Auth, Firestore models, and FCM notifications",
        "Integrating payment gateway and order status lifecycle",
        "Iterating features from operational feedback during development",
      ],
      impact: [
        "Unified three user roles into one cohesive mobile product",
        "Enabled realtime order status updates from placement to completion",
        "Reduced reliance on manual queue and verbal status handling",
        "Delivered seller and admin tooling ready for live canteen operations",
      ],
    },
  },
  summarecon: {
    id: "summarecon",
    title: "Summarecon Serpong",
    subtitle: "Internal Document System",
    period: "Sep 2023 – Dec 2023",
    role: "UI/UX Designer",
    type: "Software Application",
    stack: ["Figma", "User Research", "Design System", "Prototyping"],
    description:
      "Designed an intuitive interface for an internal document management system used by employees, aimed at streamlining access, organization, and retrieval of documents.",
    highlights: [
      "Created user flows, wireframes, and high-fidelity mockups using Figma.",
      "Conducted user research and requirement analysis to understand employee workflows.",
      "Developed interactive prototypes for usability testing and stakeholder presentations.",
    ],
    thumbnail: smsThumbnail,
    images: [sms1, sms2, sms3, sms4, sms5],
    caseStudy: {
      overview: [
        "Summarecon Serpong’s internal document system needed a clearer interface for employees who handle large volumes of workplace files every day. The project focused on making discovery, organization, and retrieval feel intentional rather than overwhelming.",
        "Working as UI/UX Designer, I translated employee workflows into information architecture, wireframes, and high-fidelity Figma screens. Interactive prototypes supported usability testing and stakeholder alignment before engineering committed to build.",
        "The engagement closed with a design system and handoff documentation so future features could stay consistent with the validated foundation.",
      ],
      challenge:
        "Internal teams were losing time inside a dense document landscape. Navigation did not match how people actually searched and filed work, and stakeholders needed proof of a better direction before investing in development.",
      problem: [
        "Document discovery felt slow across large volumes of internal files.",
        "Navigation and hierarchy did not match real employee workflows.",
        "Stakeholders needed early validation before engineering investment.",
        "No shared design system to keep screens consistent as features grew.",
      ],
      solution: [
        "User research and requirement analysis grounded in employee pain points.",
        "End-to-end flows, wireframes, and high-fidelity Figma mockups.",
        "Interactive prototypes for usability tests and stakeholder reviews.",
        "Design-system documentation to support scalable implementation.",
      ],
      journey: [
        "Interviewed workflows and mapped core document tasks.",
        "Translated findings into information architecture and wireframes.",
        "Raised fidelity in Figma and ran prototype walkthroughs.",
        "Partnered with developers to hand off specs and system tokens.",
      ],
      outcomes: [
        "A clearer, research-backed document UX for internal staff.",
        "Validated prototypes that reduced ambiguity before build.",
        "Reusable components and documentation for future iterations.",
        "Stronger alignment between design intent and engineering delivery.",
      ],
      links: "—",
      responsibilities: [
        "Crafting user flows for document discovery and retrieval",
        "Creating wireframes and information architecture",
        "Designing high-fidelity mockups in Figma",
        "Building interactive prototypes for testing and presentations",
        "Documenting a design system for scalable handoff",
      ],
      impact: [
        "Reduced ambiguity in document navigation before engineering build",
        "Aligned stakeholders around a tested interaction model",
        "Delivered reusable UI patterns for future internal tooling",
        "Improved clarity for employees handling dense document workloads",
      ],
    },
  },
  "cangopi-pos": {
    id: "cangopi-pos",
    title: "Cangopi POS",
    subtitle: "Point of Sale Application",
    period: "Jun 2024 – Dec 2024",
    role: "Frontend Developer",
    type: "Web Application",
    stack: ["Laravel", "Blade", "PHP", "JavaScript", "CSS"],
    description:
      "Built a web-based Point of Sale (POS) application using Laravel, covering end-to-end frontend implementation for cashier and warehouse management workflows.",
    highlights: [
      "Developed a cashier transaction module for order processing and receipts.",
      "Implemented menu management with real-time reflection on the cashier UI.",
      "Created stock reporting for inventory levels and warehouse movements.",
    ],
    thumbnail: cangopiThumbnail,
    images: [pos9, pos10, pos11, pos12, pos13, pos14, pos15],
    caseStudy: {
      overview: [
        "Cangopi POS is a Laravel-based point-of-sale web application built for daily store operations. It covers cashier transactions, menu management, and warehouse stock reporting in one frontend surface coordinated with backend APIs.",
        "As Frontend Developer, I focused on speed and clarity under rush conditions: cashiers needed short paths to complete sales, while staff needed menu and inventory updates to appear immediately on the selling interface.",
        "The work spanned Blade views, interactive JavaScript behaviors, and reusable UI patterns — always in close collaboration with the backend team so contracts stayed reliable as features expanded.",
      ],
      challenge:
        "A busy storefront cannot afford fragile POS flows. The product had to keep cashiers moving quickly while still giving operations staff trustworthy control over menus and stock visibility.",
      problem: [
        "Cashier flows needed to stay fast and error-resistant under rush conditions.",
        "Menu updates had to reflect immediately on the selling interface.",
        "Inventory visibility across warehouse movements was fragmented.",
        "Frontend and backend contracts needed tight alignment for reliable data.",
      ],
      solution: [
        "Cashier module for orders, payments, and receipt generation.",
        "Menu CRUD that syncs live with the cashier experience.",
        "Stock reporting for levels, movements, and summary views.",
        "Component-oriented Blade/JS UI coordinated with backend APIs.",
      ],
      journey: [
        "Broke POS work into cashier, menu, and warehouse reporting tracks.",
        "Implemented Laravel Blade views and interactive frontend behaviors.",
        "Synced API contracts with the backend team for stable data flow.",
        "Hardened reusable UI patterns for maintainable storefront operations.",
      ],
      outcomes: [
        "A production POS frontend ready for daily cashier use.",
        "Faster menu and stock visibility for staff.",
        "Clearer separation of transaction vs inventory workflows.",
        "Reusable frontend patterns for future POS expansions.",
      ],
      links: "—",
      responsibilities: [
        "Building cashier transaction and receipt flows",
        "Implementing menu management reflected on the live POS UI",
        "Developing stock reporting for warehouse movements",
        "Collaborating on API contracts with the backend team",
        "Creating reusable frontend components across POS modules",
      ],
      impact: [
        "Supported reliable day-to-day cashier operations",
        "Cut lag between menu changes and what cashiers sell",
        "Gave staff clearer warehouse stock visibility",
        "Established maintainable UI patterns for later POS growth",
      ],
    },
  },
  anakpipa: {
    id: "anakpipa",
    title: "Anak Pipa",
    subtitle: "Visual Identity & Design",
    period: "2024",
    role: "UI / Visual Designer",
    type: "Software / Design System",
    stack: ["Figma", "Branding", "UI Design"],
    description:
      "Visual identity and interface exploration for Anak Pipa, focusing on distinctive branding, clear hierarchy, and polished presentation assets.",
    highlights: [
      "Developed visual direction and supporting design assets aligned with the brand personality.",
      "Crafted clean layouts that balance illustration, typography, and product messaging.",
      "Delivered presentation-ready visuals suitable for digital and promotional use.",
    ],
    thumbnail: anakpipaThumbnail,
    images: [anakpipa9, anakpipa10, anakpipa11, anakpipa12],
    caseStudy: {
      overview: [
        "Anak Pipa needed a visual identity that could travel from brand mark to product UI without losing personality. The project explored how illustration, typography, and layout hierarchy could work together across digital and promotional surfaces.",
        "As UI / Visual Designer, I shaped a direction that felt distinctive yet practical — strong enough for brand storytelling, clear enough for interface presentation, and flexible enough for future extensions.",
        "The final deliverables focused on presentation-ready frames and reusable layout patterns that keep messaging, illustration, and product context in balance.",
      ],
      challenge:
        "The brand needed more than a logo. It required a visual system that still held up inside product and promotional compositions without collapsing into noise.",
      problem: [
        "Existing visuals lacked a cohesive personality across touchpoints.",
        "Typography, illustration, and product messaging competed for attention.",
        "Assets needed to work for both interface and promotional contexts.",
      ],
      solution: [
        "Established a clear visual direction tied to brand character.",
        "Balanced illustration and type into clean, scannable layouts.",
        "Produced digital-ready assets for product and promo use.",
      ],
      journey: [
        "Explored mood, mark, and layout directions in Figma.",
        "Refined hierarchy across sample product and promo frames.",
        "Packaged final visuals for consistent reuse.",
      ],
      outcomes: [
        "A sharper brand presence for Anak Pipa.",
        "Reusable layouts ready for digital presentation.",
        "A foundation for future UI and marketing extensions.",
      ],
      links: "—",
      responsibilities: [
        "Defining visual direction and brand personality cues",
        "Designing layout systems across product and promo frames",
        "Balancing illustration, typography, and messaging hierarchy",
        "Delivering presentation-ready digital assets",
      ],
      impact: [
        "Created a cohesive visual language across brand touchpoints",
        "Improved clarity of product and promotional storytelling",
        "Established reusable assets for future design work",
      ],
    },
  },
  cheetask: {
    id: "cheetask",
    title: "Cheetask",
    subtitle: "Task Management UI",
    period: "2024",
    role: "UI/UX Designer",
    type: "Software Application",
    stack: ["Figma", "UI/UX", "Prototyping"],
    description:
      "UI/UX design exploration for a task management product, covering key screens, interaction patterns, and a cohesive visual system for productivity workflows.",
    highlights: [
      "Designed core task flows with clear information hierarchy and lightweight interactions.",
      "Built high-fidelity screens and prototype-ready layouts in Figma.",
      "Focused on readability, density balance, and a calm productivity aesthetic.",
    ],
    thumbnail: todoThumbnail,
    images: [cheetask1, cheetask2, cheetask3, cheetask4],
    caseStudy: {
      overview: [
        "Cheetask is a task-management UI exploration focused on everyday productivity: creating tasks, scanning lists, and moving work forward without visual fatigue. The project covers core screens, interaction patterns, and a calm system for dense information.",
        "As UI/UX Designer, I prioritized hierarchy and lightweight interactions so primary actions stay obvious while secondary controls remain available. High-fidelity Figma layouts were built to be prototype-ready for validation.",
        "The visual language aims for a productive calm — readable density, restrained color, and spacing that supports long sessions rather than flashy novelty.",
      ],
      challenge:
        "Most task tools tip into clutter. Cheetask needed a structure that stays light under dense workloads while still feeling cohesive and intentional.",
      problem: [
        "Task lists can become visually noisy and hard to scan.",
        "Key actions were easy to bury under secondary controls.",
        "The product needed a cohesive look without feeling sterile.",
      ],
      solution: [
        "Core task flows with clear hierarchy and lightweight interactions.",
        "High-fidelity Figma screens ready for prototyping.",
        "A calm productivity aesthetic balancing density and readability.",
      ],
      journey: [
        "Defined primary task states and navigation patterns.",
        "Designed key screens and micro-interactions in Figma.",
        "Tuned spacing, type, and color for sustained daily use.",
      ],
      outcomes: [
        "A cohesive task UI system ready for prototype validation.",
        "Clearer scanning and action priority across screens.",
        "A reusable visual language for future productivity features.",
      ],
      links: "—",
      responsibilities: [
        "Crafting user flows for core task management journeys",
        "Creating wireframes and high-fidelity productivity screens",
        "Designing interaction patterns for dense list views",
        "Preparing prototype-ready layouts in Figma",
      ],
      impact: [
        "Improved scanability of dense task information",
        "Clarified primary actions across key productivity screens",
        "Delivered a reusable UI system for future feature exploration",
      ],
    },
  },
  "website-banner": {
    id: "website-banner",
    title: "Website Banner",
    subtitle: "Digital Marketing Banners",
    period: "2023 – 2025",
    role: "Frontend / Visual Designer",
    type: "Creative Design",
    stack: ["Photoshop", "Banner Design", "Marketing"],
    description:
      "A series of website and campaign banners created for digital marketing placements, emphasizing strong hierarchy, product focus, and conversion-oriented composition.",
    highlights: [
      "Created multiple banner variations tailored for web hero and promotional placements.",
      "Balanced product imagery with concise messaging for quick scanning.",
      "Maintained brand consistency across sizes and campaign themes.",
    ],
    thumbnail: banner1,
    images: [banner1, banner2, banner3, banner4],
  },
};

function CaseStudyBlock({
  caseStudy,
  role,
  timeline,
  tools,
}: {
  caseStudy: CaseStudy;
  role: string;
  timeline: string;
  tools: string[];
}) {
  return (
    <div className="project-case-study">
      <motion.section
        id="overview"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="project-case-study-section project-case-study-overview"
      >
        <span className="project-case-study-index">01</span>
        <div className="project-case-study-content">
          <h2>Overview</h2>
          {caseStudy.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="project-brief"
      >
        <dl className="project-brief-facts">
          <div>
            <dt>Role</dt>
            <dd>{role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{timeline}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{tools.join(", ")}</dd>
          </div>
          <div>
            <dt>Links</dt>
            <dd>{caseStudy.links ?? "—"}</dd>
          </div>
        </dl>

        <div className="project-brief-lists">
          <div>
            <h3>Key Responsibilities</h3>
            <ul>
              {caseStudy.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Impact &amp; Results</h3>
            <ul>
              {caseStudy.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.aside>

      <div className="project-case-study-sections">
        {CASE_STUDY_SECTIONS.map((section, idx) => {
          const value = caseStudy[section.field];
          const isList = Array.isArray(value);

          return (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.04 }}
              className="project-case-study-section"
            >
              <span className="project-case-study-index">
                {String(idx + 2).padStart(2, "0")}
              </span>
              <div className="project-case-study-content">
                <h2>{section.label}</h2>
                {isList ? (
                  <ul>
                    {(value as string[]).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{value as string}</p>
                )}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (id === "social-media") {
    return <Navigate to={`/creative/${creativeBrands[0].id}`} replace />;
  }

  if (id === "uol") {
    return <Navigate to="/creative/umn-online-learning" replace />;
  }

  if (id && isCreativeBrandId(id)) {
    return <Navigate to={`/creative/${id}`} replace />;
  }

  if (id && isVideoBrand(id)) {
    return <VideoMockup project={brandVideoProjects[id]} />;
  }

  const project = id ? projectsData[id] : undefined;

  if (!project) {
    return (
      <section className="project-detail-section">
        <div className="project-detail-not-found">
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/portfolio" className="project-back-link">
            Home / Portfolio
          </Link>
        </div>
      </section>
    );
  }

  const portfolioItem = getPortfolioItem(project.id);
  const category = portfolioItem?.category ?? "Software Development";
  const categoryKey = categoryKeyFromLabel(category);

  return (
    <section className="project-detail-section">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="project-detail-nav"
      >
        <PathTrail
          className="project-back-link"
          items={[
            { label: "Home", to: "/" },
            { label: "Portfolio", to: "/portfolio" },
            {
              label: category,
              to: `/portfolio?category=${categoryKey}`,
            },
            { label: project.title },
          ]}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="project-detail-hero"
      >
        <div className="project-detail-hero-content">
          <span className="project-detail-type">{project.type}</span>
          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-subtitle">{project.subtitle}</p>
        </div>

        <div className="project-detail-meta">
          <div className="project-detail-meta-item">
            <span className="meta-label">ROLE</span>
            <span className="meta-value">{project.role}</span>
          </div>
          <div className="project-detail-meta-item">
            <span className="meta-label">PERIOD</span>
            <span className="meta-value">{project.period}</span>
          </div>
          <div className="project-detail-meta-item">
            <span className="meta-label">TYPE</span>
            <span className="meta-value">{project.type}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="project-detail-thumbnail"
      >
        <img src={project.thumbnail} alt={project.title} />
      </motion.div>

      {project.caseStudy ? (
        <CaseStudyBlock
          caseStudy={project.caseStudy}
          role={project.role}
          timeline={project.period}
          tools={project.stack}
        />
      ) : (
        <>
          <div className="project-detail-body">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="project-detail-description"
            >
              <h2>About This Project</h2>
              <p>{project.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="project-detail-stack-card"
            >
              <h3>Tech Stack</h3>
              <div className="project-detail-stack-tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="project-detail-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="project-detail-highlights"
          >
            <h2>Key Highlights</h2>
            <div className="project-detail-highlights-grid">
              {project.highlights.map((h, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="highlight-card"
                >
                  <span className="highlight-number">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p>{h}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="project-detail-gallery"
      >
        <h2>Project Gallery</h2>
        <div className="project-gallery-grid">
          {project.images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="gallery-item"
            >
              <img src={img} alt={`${project.title} screenshot ${idx + 1}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CategoryProjects currentId={project.id} />
    </section>
  );
}
