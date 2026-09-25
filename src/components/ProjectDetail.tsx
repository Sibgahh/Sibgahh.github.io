import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, ExternalLink } from "lucide-react";
import VideoMockup from "./VideoMockup";
import CategoryProjects from "./CategoryProjects";
import PathTrail from "./PathTrail";
import LineSidebar from "./LineSidebar";
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

// UKM Finance
import ukm9 from "@/UKM/9.jpg";
import ukm10 from "@/UKM/10.jpg";
import ukm11 from "@/UKM/11.jpg";
import ukm12 from "@/UKM/12.jpg";
import ukm13 from "@/UKM/13.jpg";
import ukm14 from "@/UKM/14.jpg";
import ukmThumb from "@/3dAssetThumbnail/ukm.jpeg";

// Thesis Portal
import thesisThumb from "@/3dAssetThumbnail/thesis.png";
import thesisHome from "@/Thesis website/screencapture-localhost-Thesis-Website-main-homepage-php-2026-09-23-00_48_42 1.png";
import thesisBerkas from "@/Thesis website/screencapture-localhost-Thesis-Website-main-berkas-skripsi-php-2026-09-23-00_49_02 1.png";
import thesisBerkas2 from "@/Thesis website/screencapture-localhost-Thesis-Website-main-berkas-skripsi-php-2026-09-23-00_49_20 1.png";
import thesisLogbook from "@/Thesis website/screencapture-localhost-Thesis-Website-main-logbook-php-2026-09-23-00_50_07 1.png";
import thesisProposal from "@/Thesis website/screencapture-localhost-Thesis-Website-main-proposal-php-2026-09-23-00_49_49 1.png";

// Sibertahan
import sibertahanThumb from "@/3dAssetThumbnail/Sibertahan.png";
import sibertahanHero from "@/Sibertahan/Group 315.png";
import sibertahanAbout from "@/Sibertahan/screencapture-localhost-5173-about-2026-09-23-00_02_06 1.png";
import sibertahanCareer from "@/Sibertahan/screencapture-localhost-5173-career-2026-09-23-00_00_38 1.png";
import sibertahanContact from "@/Sibertahan/screencapture-localhost-5173-contact-2026-09-22-23_59_27 1.png";

// Hypermart WMS
import hypermartThumb from "@/3dAssetThumbnail/Hypermart Warehouse.png";
import hypermartDashboard from "@/Hypermart Warehouse management/screencapture-localhost-5174-2026-09-23-01_11_38 1.png";
import hypermartOrders from "@/Hypermart Warehouse management/screencapture-localhost-5174-orders-2026-09-23-01_12_01 1.png";
import hypermartReports from "@/Hypermart Warehouse management/screencapture-localhost-5174-reports-2026-09-23-01_13_02 1.png";
import hypermartUsers from "@/Hypermart Warehouse management/screencapture-localhost-5174-users-2026-09-23-01_14_20 1.png";
import hypermartItem1 from "@/Hypermart Warehouse management/image 10960.png";
import hypermartItem2 from "@/Hypermart Warehouse management/image 10961.png";

// IoT Smart Traffic Light
import iotThumb from "@/3dAssetThumbnail/IoT.png";
import iotDetection from "@/IoT Smart Traffic Light/1749530697598.jpg";
import iotModelComparison from "@/IoT Smart Traffic Light/1749530731894.jpg";
import iotLiveView1 from "@/IoT Smart Traffic Light/Screenshot 2026-09-25 190034.png";
import iotLiveView2 from "@/IoT Smart Traffic Light/Screenshot 2026-09-25 190944.png";

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
  { id: "challenge", label: "The Challenge", field: "challenge" as const, kicker: "CHALLENGES" },
  { id: "problem", label: "Problem Statement", field: "problem" as const, kicker: "THE FRICTION" },
  { id: "solution", label: "Our Solution", field: "solution" as const, kicker: "ARCHITECTURE & APPROACH" },
  { id: "journey", label: "The Journey", field: "journey" as const, kicker: "DEVELOPMENT PROCESS" },
  { id: "outcomes", label: "Outcomes & Impact", field: "outcomes" as const, kicker: "RESULTS & KEY TAKEAWAYS" },
] as const;

import telkomsigmaImg1 from "@/telkomsigma/ChatGPT Image Aug 27, 2026, 11_16_50 AM.png";
import telkomsigmaImg2 from "@/telkomsigma/ChatGPT Image Aug 27, 2026, 11_23_20 AM.png";

const projectsData: Record<string, ProjectData> = {
  "telkomsigma": {
    id: "telkomsigma",
    title: "Employee Self System",
    subtitle: "Enterprise Application",
    period: "2024",
    role: "Mobile Developer & Frontend",
    type: "Mobile Application",
    stack: ["Mobile Development", "UI/UX", "Enterprise Architecture"],
    description: "An integrated Employee Self System application allowing staff to manage their data, timesheets, and track productivity within a unified enterprise ecosystem.",
    highlights: [
      "Developed a cohesive mobile application interface for internal employee management.",
      "Implemented features for timesheet tracking, leave requests, and performance monitoring.",
      "Ensured secure and intuitive access to personal and professional data."
    ],
    thumbnail: telkomsigmaImg2,
    images: [telkomsigmaImg1, telkomsigmaImg2],
    caseStudy: {
      overview: [
        "The Employee Self System by Telkomsigma is a mobile-first enterprise application aimed at unifying employee management tasks.",
        "As a developer, the goal was to create an intuitive and accessible platform for employees to handle their daily administrative needs such as timesheets, leave (cuti), and performance tracking."
      ],
      challenge: "Enterprise applications often suffer from fragmented experiences. The main challenge was to consolidate various employee functions—timesheets, data management, and performance ratings—into a single, easy-to-use mobile interface.",
      problem: [
        "Employees had to navigate multiple systems for different HR functions.",
        "Tracking daily tasks and timesheets was tedious and error-prone.",
        "Lack of a centralized dashboard for personal productivity and achievements."
      ],
      solution: [
        "A unified mobile dashboard presenting key actions like clock-in and timesheet submissions upfront.",
        "A streamlined Profile Data section for easy updates of basic information and emergency contacts.",
        "A visually clear Achievement section tracking utilization and productivity."
      ],
      journey: [
        "Started with mapping the core employee journeys: daily check-ins, profile updates, and performance reviews.",
        "Designed and implemented the UI focused on clarity and ease of access.",
        "Integrated the front-end with enterprise backend systems to ensure real-time data sync."
      ],
      outcomes: [
        "Delivered a centralized mobile app that simplifies daily HR tasks.",
        "Improved employee engagement with the timesheet and performance systems.",
        "Reduced administrative overhead by providing self-service capabilities."
      ],
      responsibilities: [
        "Implementing the mobile user interface based on design specifications.",
        "Ensuring smooth navigation and state management across different app modules.",
        "Integrating with backend APIs for real-time data fetching and updates."
      ],
      impact: [
        "Streamlined internal processes for employee data management.",
        "Provided a clear, accessible overview of employee performance and utilization.",
        "Enhanced the overall digital workplace experience for the staff."
      ]
    }
  },
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
    title: "Cangopi POS & Order System",
    subtitle: "Point of Sale & Order Management Application",
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
  "ukm-finance": {
    id: "ukm-finance",
    title: "UKM Finance",
    subtitle: "Financial Management System",
    period: "2025",
    role: "Frontend Developer",
    type: "Web Application",
    stack: ["Laravel", "PHP", "JavaScript", "CSS", "Chart.js"],
    description:
      "A web-based financial management dashboard for a university student organization (UKM), enabling transparent budgeting, transaction tracking, and fund request workflows.",
    highlights: [
      "Built a financial dashboard with real-time charts showing income, expenses, and UKM fund distribution.",
      "Implemented transaction management with category filtering and date-based search.",
      "Created a fund request workflow with approval/rejection and notification system.",
    ],
    thumbnail: ukmThumb,
    images: [ukm9, ukm10, ukm11, ukm12, ukm13, ukm14],
    caseStudy: {
      overview: [
        "UKM Finance is a web-based financial management system built for a university student organization (UKM Fotografi). It centralizes budgeting, transaction records, fund requests, and balance visibility in one dashboard accessible to administrators and members.",
        "As Frontend Developer, I built the interface layer — from the analytics dashboard with chart visualizations to the transaction CRUD flows and fund request approvals — ensuring the system felt approachable for non-technical student committee members.",
        "The stack combined Laravel on the backend with a clean CSS and JavaScript frontend, with Chart.js powering the financial breakdown charts.",
      ],
      challenge:
        "Student organizations manage real money but rarely have proper financial tooling. The challenge was to build a system that is transparent enough for all members to trust, yet structured enough for treasurers to maintain control.",
      problem: [
        "Financial records were scattered across spreadsheets with no audit trail.",
        "Fund requests had no formal approval flow, causing delays and disputes.",
        "Members lacked visibility into how the organization's budget was spent.",
        "No centralized notification system for transaction and request updates.",
      ],
      solution: [
        "A centralized dashboard with real-time income, expense, and balance charts.",
        "Transaction management with category tagging, filtering, and date search.",
        "Structured fund request flow with approval, rejection, and member notifications.",
        "Role-based access for treasurers and standard members.",
      ],
      journey: [
        "Mapped the UKM treasurer's daily workflow to define core data models.",
        "Built the Laravel backend and Blade-based frontend layer in parallel.",
        "Integrated Chart.js for live financial breakdown visualizations.",
        "Refined the request approval UX based on committee feedback.",
      ],
      outcomes: [
        "A transparent, audit-friendly financial dashboard for the student organization.",
        "Structured fund request process replacing informal approval chains.",
        "Improved financial literacy and trust among UKM members.",
        "Reusable financial module patterns applicable to other campus organizations.",
      ],
      responsibilities: [
        "Designing and building the financial dashboard UI with Chart.js",
        "Implementing transaction CRUD with filtering and search",
        "Building the fund request approval flow and notification system",
        "Coordinating frontend–backend API contracts with the team",
        "Ensuring role-appropriate views for treasurer and member access",
      ],
      impact: [
        "Replaced spreadsheet chaos with a centralized, auditable system",
        "Gave all members real-time visibility into organizational finances",
        "Reduced approval delays with a structured fund request workflow",
        "Established a reusable financial module for future campus projects",
      ],
    },
  },
  "thesis-portal": {
    id: "thesis-portal",
    title: "Thesis Portal",
    subtitle: "Academic Thesis Management",
    period: "2025",
    role: "Fullstack Developer",
    type: "Web Application",
    stack: ["PHP", "MySQL", "JavaScript", "CSS", "Bootstrap"],
    description:
      "A university thesis management portal allowing students to browse published theses, submit proposals, upload final documents, and manage logbooks — all in one academic platform.",
    highlights: [
      "Built a searchable thesis repository for students to discover and download published research.",
      "Implemented proposal and logbook submission flows with status tracking.",
      "Designed a clean, academic-focused UI for Pradita University's information systems program.",
    ],
    thumbnail: thesisThumb,
    images: [thesisHome, thesisBerkas, thesisBerkas2, thesisProposal, thesisLogbook],
    caseStudy: {
      overview: [
        "The Thesis Portal is a web-based academic management system for Pradita University's Information Systems department. It provides students and supervisors with a unified platform to browse published theses, manage proposals, upload final documents, and track logbook entries.",
        "As Fullstack Developer, I handled both the server-side PHP logic and the frontend interface — building a repository that is discoverable and a submission flow that is structured enough to replace manual paperwork handoffs.",
        "The platform was designed to serve multiple roles: students submitting and tracking their work, and administrators overseeing the full thesis pipeline across cohorts.",
      ],
      challenge:
        "Thesis administration at universities is paper-heavy and fragmented. Students struggled to find reference research and track their own submission status without chasing supervisors for updates.",
      problem: [
        "No central repository for students to discover and download published theses.",
        "Proposal and document submissions were handled via email with no status tracking.",
        "Logbook progress tracking was manual and inconsistently monitored.",
        "Administrators lacked a consolidated view of cohort submission pipelines.",
      ],
      solution: [
        "A searchable thesis repository with PDF download and author/date filtering.",
        "Structured proposal submission flow with status updates visible to students.",
        "Logbook management for progressive entry tracking throughout the thesis journey.",
        "Admin dashboard for overseeing submissions, approvals, and cohort progress.",
      ],
      journey: [
        "Designed the database schema for theses, proposals, users, and logbooks.",
        "Built PHP backend routes and controllers for each submission flow.",
        "Created the student-facing UI with Bootstrap and custom CSS.",
        "Tested repository search performance and submission edge cases.",
      ],
      outcomes: [
        "A working academic portal covering the full thesis lifecycle.",
        "Students gained self-service access to the research repository and their own status.",
        "Supervisors and admins reduced manual status-check overhead.",
        "A reusable academic management template for future university projects.",
      ],
      responsibilities: [
        "Designing database schema for thesis, proposal, and logbook entities",
        "Building PHP backend for submission, review, and repository flows",
        "Implementing the student and admin frontend in Bootstrap and custom CSS",
        "Creating search and filter functionality for the thesis repository",
        "Testing submission lifecycle and access control for multiple roles",
      ],
      impact: [
        "Centralized thesis discovery and submission in one accessible platform",
        "Reduced email-based back-and-forth for proposals and documents",
        "Gave students clear visibility into their own thesis pipeline status",
        "Delivered a reusable foundation for academic management tooling",
      ],
    },
  },
  sibertahan: {
    id: "sibertahan",
    title: "Sibertahan",
    subtitle: "Cybersecurity Consulting Website",
    period: "2025",
    role: "Frontend Developer",
    type: "Web Application",
    stack: ["React", "TypeScript", "Vite", "CSS"],
    description:
      "A professional company profile website for Sibertahan (PT Humanis Siber Indonesia), a cybersecurity consulting firm offering offensive, defensive, and governance services.",
    highlights: [
      "Built a dark-themed, professional marketing site communicating Sibertahan's cybersecurity service portfolio.",
      "Implemented pages for services (SiberSerang, SiberPatuh, SiberJaga), About Us, Career, and Contact.",
      "Ensured a polished, trust-inspiring visual presence aligned with the firm's security and compliance positioning.",
    ],
    thumbnail: sibertahanThumb,
    images: [sibertahanHero, sibertahanCareer, sibertahanAbout, sibertahanContact],
    caseStudy: {
      overview: [
        "Sibertahan is the company profile website for PT Humanis Siber Indonesia, a cybersecurity consulting firm providing offensive, defensive, and governance advisory services to enterprise clients.",
        "As Frontend Developer, I built the full React + TypeScript site: from the hero landing section and service portfolio pages to the career listings and contact form. The visual direction needed to communicate technical credibility and institutional trust.",
        "The site needed to work as a sales and recruitment surface — representing three core service pillars (SiberSerang, SiberPatuh, SiberJaga) clearly while projecting the brand's positioning as certified cyber security experts.",
      ],
      challenge:
        "Cybersecurity firms walk a line between approachability and authority. The site needed to feel credible and serious without being cold — and had to communicate complex service distinctions to diverse business audiences.",
      problem: [
        "Service offerings (offensive, defensive, governance) needed clear, distinct presentation.",
        "Visual design had to project authority and trust for an enterprise security audience.",
        "Recruitment pages needed to attract technical talent without overwhelming general visitors.",
        "Contact pathways had to be accessible across all company service contexts.",
      ],
      solution: [
        "Dark-themed, professional visual language aligned with cybersecurity sector norms.",
        "Dedicated service pages for SiberSerang (offensive), SiberPatuh (compliance), and SiberJaga (defensive).",
        "Career and About pages structured for both talent and enterprise buyer audiences.",
        "React + TypeScript implementation for maintainable, component-driven delivery.",
      ],
      journey: [
        "Mapped brand values and service distinctions into page hierarchy and copy architecture.",
        "Built React component structure for service, career, about, and contact pages.",
        "Tuned dark-mode visual system for trust and readability across sections.",
        "Refined contact and career flows for conversion-oriented clarity.",
      ],
      outcomes: [
        "A production-ready company profile site for Sibertahan's enterprise and recruitment audiences.",
        "Clear service differentiation across three cybersecurity practice areas.",
        "A professional web presence that reflects the firm's technical credibility.",
        "Component-driven codebase ready for future service and content expansion.",
      ],
      responsibilities: [
        "Building the full React + TypeScript frontend architecture",
        "Implementing service, about, career, and contact page layouts",
        "Crafting the dark-themed visual system for cybersecurity brand alignment",
        "Ensuring responsive, accessible layout across device sizes",
        "Collaborating on content structure and information hierarchy",
      ],
      impact: [
        "Gave Sibertahan a professional web presence for enterprise and recruitment outreach",
        "Communicated three distinct service pillars clearly to diverse audiences",
        "Established a component library for future site extensions",
        "Supported the firm's positioning as certified, trusted cyber security experts",
      ],
    },
  },
  "hypermart-wms": {
    id: "hypermart-wms",
    title: "Hypermart WMS",
    subtitle: "Warehouse Management System",
    period: "Sep 2026",
    role: "Fullstack Developer",
    type: "Web Application",
    stack: ["React", "TypeScript", "Laravel", "MySQL", "Vite"],
    description:
      "A warehouse management system for Hypermart, covering purchase order tracking, supplier and item master data, multi-warehouse inventory, user access management, and operational reporting.",
    highlights: [
      "Built a dashboard with real-time KPIs: total orders, active suppliers, item count, and warehouse tally.",
      "Implemented a full purchase order lifecycle from Open through InTransit to Receiving Verified.",
      "Developed role-based access control and user management for warehouse admin operations.",
    ],
    thumbnail: hypermartThumb,
    images: [hypermartDashboard, hypermartOrders, hypermartReports, hypermartUsers, hypermartItem1, hypermartItem2],
    caseStudy: {
      overview: [
        "Hypermart WMS is a full-stack warehouse management system built for Hypermart's internal logistics operations. It covers the complete purchase order lifecycle, supplier and item master data, multi-warehouse inventory tracking, and role-based user management.",
        "As Fullstack Developer, I built the React + TypeScript frontend and Laravel backend end to end — from the KPI dashboard and order tables to the access control system and operational reports.",
        "The system was designed to give warehouse admins a clear, actionable view of daily operations while ensuring that purchasing and receiving flows are structured and auditable.",
      ],
      challenge:
        "Warehouse operations at retail scale generate high transaction volumes across multiple locations. The system needed to keep order status clear at all times while controlling who could perform which actions across a multi-role team.",
      problem: [
        "No unified view of purchase order status across warehouse locations.",
        "Supplier, item, and warehouse master data was fragmented across systems.",
        "Receiving workflows lacked structured verification and audit trails.",
        "User access was not role-controlled, creating operational security risks.",
      ],
      solution: [
        "A real-time KPI dashboard with order, supplier, item, and warehouse summaries.",
        "Full purchase order lifecycle: Open → InTransit → Receiving Started → Receiving Verified.",
        "Master data management for suppliers, items, warehouses, and menus.",
        "Role-based access control with configurable permissions per user role.",
      ],
      journey: [
        "Designed database schema for orders, master data, warehouses, and users.",
        "Built Laravel API endpoints and React frontend components in parallel.",
        "Implemented order status state machine with receiving verification logic.",
        "Developed access control system covering roles, menus, and submenus.",
        "Refined reporting views and dashboard KPIs against real logistics scenarios.",
      ],
      outcomes: [
        "A production-ready WMS covering the full warehouse operations lifecycle.",
        "Clear, real-time order status visibility for admin and warehouse staff.",
        "Structured receiving verification replacing informal manual sign-offs.",
        "Role-based access ready for multi-team warehouse deployment.",
      ],
      responsibilities: [
        "Designing and building the React + TypeScript frontend dashboard and flows",
        "Implementing Laravel backend API for orders, master data, and users",
        "Building the purchase order lifecycle state machine",
        "Developing role-based access control and permission configuration",
        "Creating reports and operational KPI visualizations",
      ],
      impact: [
        "Unified purchase order visibility across Hypermart warehouse locations",
        "Replaced informal receiving processes with structured verification flows",
        "Enabled granular role-based access across warehouse operation teams",
        "Delivered a scalable WMS foundation ready for multi-warehouse expansion",
      ],
    },
  },
  "iot-smart-traffic-light": {
    id: "iot-smart-traffic-light",
    title: "IoT Smart Traffic Light",
    subtitle: "AI-Powered Traffic Management System",
    period: "Jun 2025",
    role: "AI / IoT Engineer",
    type: "Embedded System & Computer Vision",
    stack: ["Python", "YOLOv8", "OpenCV", "Raspberry Pi", "Arduino", "MQTT", "IoT"],
    description:
      "An intelligent traffic light control system that uses real-time computer vision (YOLOv8) to detect and count vehicles across four lanes, dynamically adjusting signal timing based on traffic density to reduce congestion.",
    highlights: [
      "Trained and benchmarked 11 YOLOv8 custom models; surveillance.pt achieved the highest detection score of 0.9838 with 7 detections per frame.",
      "Built a real-time 4-lane vehicle detection pipeline using OpenCV and Raspberry Pi with live signal phase control.",
      "Integrated physical LED traffic light hardware with the AI decision engine via GPIO and MQTT for closed-loop feedback.",
    ],
    thumbnail: iotThumb,
    images: [iotLiveView1, iotDetection, iotModelComparison, iotLiveView2],
    caseStudy: {
      overview: [
        "The IoT Smart Traffic Light is an AI-driven embedded system that replaces fixed-timer traffic signals with a dynamic, vision-based controller. It monitors four road lanes using camera feeds, detects and counts vehicles in real time with a custom YOLOv8 model, then computes optimal signal phases to minimize wait times and congestion.",
        "As the AI / IoT Engineer, I designed the full pipeline — from dataset collection and model training to OpenCV integration, Raspberry Pi deployment, and physical traffic-light hardware control. The system brings together computer vision, embedded computing, and real-time hardware actuation in a single closed-loop solution.",
        "Eleven custom detection models were trained and benchmarked against a standardized test scenario. The final recommended model, surveillance.pt, achieved an overall score of 0.9838 — detecting 7 vehicles per frame across classes including car, bus, truck, mobil, and motor.",
      ],
      challenge:
        "Fixed-cycle traffic lights cannot respond to real-world demand. Rush-hour bottlenecks on under-loaded signal phases waste green time while congested lanes idle. The challenge was to build an embedded AI system that could detect multi-class vehicles on a live camera feed and actuate physical signal hardware fast enough to make a practical difference.",
      problem: [
        "Static signal timing ignores actual traffic density, causing unnecessary delays.",
        "Standard camera-based detection models were not trained on local vehicle classes (mobil, motor, bus).",
        "Eleven candidate models needed systematic benchmarking for detection count, speed, and confidence.",
        "The decision engine had to run in real time on resource-constrained Raspberry Pi hardware.",
        "Physical LED signals needed reliable GPIO and MQTT integration with the AI pipeline.",
      ],
      solution: [
        "Custom YOLOv8 models trained on locally-collected vehicle imagery covering car, bus, truck, mobil, and motor classes.",
        "Automated model benchmarking pipeline comparing detection count, processing time, and average confidence across 11 models.",
        "Real-time 4-lane vehicle counting with OpenCV feeding a phase-selection algorithm.",
        "Raspberry Pi deployment with GPIO-driven LED control and MQTT for hardware signal actuation.",
        "Modular pipeline separating detection, counting, phase logic, and hardware output for maintainability.",
      ],
      journey: [
        "Collected and labeled a custom dataset of local Indonesian vehicle types for YOLOv8 fine-tuning.",
        "Trained 11 model variants and built an automated benchmarking script comparing detection performance.",
        "Selected surveillance.pt (score 0.9838) and integrated it into the 4-lane OpenCV detection pipeline.",
        "Deployed the inference engine on Raspberry Pi and wired GPIO outputs to physical traffic light LEDs.",
        "Tuned the phase-switching algorithm using real road footage to minimize average wait time.",
      ],
      outcomes: [
        "A working smart traffic light prototype with real-time AI-driven phase control.",
        "surveillance.pt model achieving 0.9838 overall benchmark score with 7 detections per frame.",
        "4-lane simultaneous monitoring with dynamic green-phase allocation based on vehicle density.",
        "Closed-loop hardware integration from camera input to physical LED signal output.",
        "A reusable benchmarking framework for future traffic-detection model iterations.",
      ],
      links: "—",
      responsibilities: [
        "Collecting and labeling a custom vehicle detection dataset",
        "Training and benchmarking 11 YOLOv8 model variants",
        "Building the real-time 4-lane OpenCV detection pipeline",
        "Deploying the inference system on Raspberry Pi hardware",
        "Integrating GPIO and MQTT for physical traffic light actuation",
        "Designing the phase-selection algorithm for dynamic signal timing",
      ],
      impact: [
        "Replaced static timer logic with AI-driven, demand-responsive signal control",
        "Achieved 0.9838 benchmark score with the custom surveillance.pt model",
        "Demonstrated feasibility of edge-AI traffic management on low-cost hardware",
        "Established a reusable pipeline for future smart city IoT deployments",
      ],
    },
  },
};

const SIDEBAR_SECTIONS = [
  { id: "overview",   label: "Overview"      },
  { id: "challenge",  label: "The Challenge"  },
  { id: "problem",    label: "Problem"        },
  { id: "solution",   label: "Solution"       },
  { id: "journey",    label: "The Journey"    },
  { id: "outcomes",   label: "Outcomes"       },
];

const SIDEBAR_LABELS = SIDEBAR_SECTIONS.map((s) => s.label);

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
  const [activeSection, setActiveSection] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll to section when sidebar item is clicked
  const handleSidebarClick = useCallback((index: number) => {
    const sectionId = SIDEBAR_SECTIONS[index]?.id;
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Sync active sidebar item with scroll position via IntersectionObserver
  useEffect(() => {
    const entries = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          entries.set(entry.target.id, entry.intersectionRatio);
        });
        // Pick the section with the highest intersection ratio
        let bestId = "";
        let bestRatio = 0;
        entries.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) {
          const idx = SIDEBAR_SECTIONS.findIndex((s) => s.id === bestId);
          if (idx !== -1) setActiveSection(idx);
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], rootMargin: "-10% 0px -60% 0px" }
    );

    SIDEBAR_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="project-case-study">
      {/* ── Two-column layout: sticky sidebar + scrollable content ── */}
      <div className="case-study-layout">
        {/* Sticky left sidebar */}
        <aside className="case-study-sidebar">
          <LineSidebar
            items={SIDEBAR_LABELS}
            accentColor="var(--accent)"
            textColor="var(--ink-muted)"
            markerColor="var(--line-strong)"
            showIndex
            showMarker
            proximityRadius={120}
            maxShift={22}
            falloff="smooth"
            markerLength={48}
            markerGap={8}
            tickScale={0.5}
            scaleTick
            itemGap={24}
            fontSize={0.88}
            smoothing={120}
            defaultActive={activeSection}
            onItemClick={handleSidebarClick}
          />
        </aside>

        {/* Scrollable right content */}
        <div className="case-study-content">
          <motion.section
            id="overview"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="project-case-study-section project-case-study-overview"
          >
            <div className="project-case-study-content">
              <span className="case-study-kicker">OVERVIEW</span>
              <h2>Project Overview</h2>
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
                  <div className="project-case-study-content">
                    <span className="case-study-kicker">{section.kicker}</span>
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
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setPreviewIndex(null);
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

  // Keyboard navigation & lock scroll during full-size preview modal
  useEffect(() => {
    if (previewIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewIndex(null);
      } else if (e.key === "ArrowLeft") {
        setPreviewIndex((curr) =>
          curr !== null && project.images.length > 0
            ? curr > 0
              ? curr - 1
              : project.images.length - 1
            : null
        );
      } else if (e.key === "ArrowRight") {
        setPreviewIndex((curr) =>
          curr !== null && project.images.length > 0
            ? curr < project.images.length - 1
              ? curr + 1
              : 0
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewIndex, project.images.length]);

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
          <span className="project-detail-date">{project.period}</span>
          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-subtitle">{project.subtitle || project.description}</p>
          <div className="project-detail-hero-tags">
            {project.stack.map((tech) => (
              <span key={tech} className="project-detail-hero-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {!project.caseStudy && (
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
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="project-detail-thumbnail"
      >
        <img src={project.thumbnail} alt={project.title} />
      </motion.div>

      {/* ── Project Gallery (directly below thumbnail) ── */}
      {project.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="project-detail-gallery"
        >
          <div className="project-detail-gallery-header">
            <div>
              <h2>Project Gallery</h2>
              <p className="project-detail-gallery-sub">
                Interface screens &amp; software prototype views. Click any screen to view full size preview.
              </p>
            </div>
            <span className="project-gallery-count-badge">
              {project.images.length} {project.images.length === 1 ? "Screen" : "Screens"}
            </span>
          </div>

          <div className="project-gallery-grid">
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="gallery-item"
                onClick={() => setPreviewIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPreviewIndex(idx);
                  }
                }}
                aria-label={`View full preview of ${project.title} screen ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  loading="lazy"
                />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-badge">
                    Screen {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="gallery-item-action">
                    <Maximize2 size={14} />
                    <span>Preview</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
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

      {/* Full-size preview lightbox modal */}
      <AnimatePresence>
        {previewIndex !== null && project.images[previewIndex] && (
          <motion.div
            className="software-preview-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPreviewIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} Full-size Preview`}
          >
            {/* Topbar */}
            <div
              className="software-preview-topbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="software-preview-info">
                <span className="software-preview-project-title">
                  {project.title}
                </span>
                <span className="software-preview-counter">
                  Screen {previewIndex + 1} of {project.images.length}
                </span>
              </div>
              <div className="software-preview-actions">
                <a
                  href={project.images[previewIndex]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="software-preview-btn-pill"
                  title="Open original high-res image in new tab"
                >
                  <ExternalLink size={14} />
                  <span>Original</span>
                </a>
                <button
                  type="button"
                  className="software-preview-close-btn"
                  onClick={() => setPreviewIndex(null)}
                  aria-label="Close full size preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Stage */}
            <div
              className="software-preview-stage"
              onClick={(e) => e.stopPropagation()}
            >
              {project.images.length > 1 && (
                <button
                  type="button"
                  className="software-preview-nav software-preview-prev"
                  onClick={() =>
                    setPreviewIndex((curr) =>
                      curr !== null
                        ? curr > 0
                          ? curr - 1
                          : project.images.length - 1
                        : 0
                    )
                  }
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              <div className="software-preview-viewport">
                <motion.img
                  key={previewIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  src={project.images[previewIndex]}
                  alt={`${project.title} software prototype full preview ${previewIndex + 1}`}
                  className="software-preview-img"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {project.images.length > 1 && (
                <button
                  type="button"
                  className="software-preview-nav software-preview-next"
                  onClick={() =>
                    setPreviewIndex((curr) =>
                      curr !== null
                        ? curr < project.images.length - 1
                          ? curr + 1
                          : 0
                        : 0
                    )
                  }
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </div>

            {/* Thumbnails strip at the bottom */}
            {project.images.length > 1 && (
              <div
                className="software-preview-strip-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="software-preview-strip">
                  {project.images.map((thumb, tIdx) => (
                    <button
                      key={tIdx}
                      type="button"
                      className={`software-preview-thumb-btn ${
                        tIdx === previewIndex ? "is-active" : ""
                      }`}
                      onClick={() => setPreviewIndex(tIdx)}
                      aria-label={`View screen ${tIdx + 1}`}
                    >
                      <img
                        src={thumb}
                        alt={`Screen thumbnail ${tIdx + 1}`}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <CategoryProjects currentId={project.id} />
    </section>
  );
}
