export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  type: 'Internship' | 'Freelance' | 'Full-time'
  location: string
  highlights: string[]
  stack: string[]
}

export interface ProjectItem {
  id: string
  title: string
  period: string
  role: string
  stack: string[]
  description: string
  highlights: string[]
  image: string
  accent: string
  link?: string
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'telkomsigma',
    role: 'Mobile Developer',
    company: 'PT Sigma Cipta Caraka (Telkomsigma)',
    period: 'June 2025 – December 2025',
    type: 'Internship',
    location: 'Indonesia',
    stack: ['React Native', 'TypeScript', 'Redux', 'REST API', 'Git'],
    highlights: [
      'Engineered and deployed a high-performance cross-platform mobile application using React Native to digitise key HR and administrative functions for 2300+ employees and enhancing operational efficiency, enabling secure and responsive user experiences on both iOS and Android.',
      'Performed application maintenance and bug fixing on live products, consistently maintaining app stability and performance.',
      'Integrated REST APIs into the mobile application to enable real-time data exchange between client and server.',
      'Managed application state using Redux to ensure a consistent and efficient data flow across all components.',
      'Collaborated actively with backend engineers and UI/UX designers throughout the feature development lifecycle, from requirement analysis to implementation and testing.',
      'Utilized Git/GitHub for version control, code reviews, and branch management within an organized team development workflow.',
    ],
  },
  {
    id: 'humanis',
    role: 'Frontend Developer',
    company: 'PT Humanis Siber Indonesia',
    period: 'Apr 2025 – Jun 2025',
    type: 'Freelance',
    location: 'Indonesia',
    stack: ['Vue.js', 'Tailwind CSS', 'JavaScript'],
    highlights: [
      'Designed and developed conversion-focused landing pages using Vue.js and Tailwind CSS with clear CTAs and intuitive user flows.',
      'Ensured full responsiveness and WCAG-aligned accessibility across mobile, tablet, and desktop viewports.',
    ],
  },
  {
    id: 'cangopi',
    role: 'Frontend Developer',
    company: 'Cangopi',
    period: 'June 2024 – December 2024',
    type: 'Internship',
    location: 'Indonesia',
    stack: ['Laravel', 'Blade', 'PHP', 'JavaScript', 'CSS'],
    highlights: [
      'Built a web-based Point of Sale (POS) application using Laravel, covering end-to-end frontend implementation for cashier and warehouse management workflows.',
      'Developed a cashier transaction module enabling smooth order processing, payment handling, and receipt generation for daily operations.',
      'Implemented a menu management feature allowing staff to add, update, and remove menu items with real-time reflection on the cashier interface.',
      'Created a stock reporting module to track inventory levels, monitor warehouse movements, and generate stock summary reports.',
      'Collaborated closely with the backend team to align API contracts, ensuring seamless data flow between frontend views and server-side logic.',
      'Applied component-based UI development principles to build reusable, maintainable frontend components across the application.',
    ],
  },
  {
    id: 'anakpipa',
    role: 'UI/UX Designer',
    company: 'CV. Anakpipa Sinergi Pratama',
    period: 'Jun 2023 – Jul 2023',
    type: 'Freelance',
    location: 'Indonesia',
    stack: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
    highlights: [
      'Designed a web interface for a B2B sales employee platform (pipe & system components), focusing on task efficiency and navigation clarity.',
      'Conducted user research to identify pain points, then translated findings into wireframes and high-fidelity Figma mockups with interactive prototypes.',
      'Iterated designs through two client feedback rounds, balancing aesthetic and functional requirements within tight timeline constraints.',
    ],
  },
]

export const PROJECTS: ProjectItem[] = [
  {
    id: 'pradita-canteen',
    title: 'Pradita Canteen — Food Order System',
    period: 'Mar 2025 – May 2025',
    role: 'Fullstack Developer',
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'FCM'],
    description:
      'Designed and developed a full-featured mobile food ordering application for the university canteen using Flutter and Firebase, handling both frontend and backend responsibilities.',
    highlights: [
      'Implemented secure user authentication with role-based access control for three user types: customer, seller, and admin.',
      'Built an end-to-end order flow including food browsing, cart management, and payment gateway integration for seamless in-app transactions.',
      'Developed a real-time push notification system to keep customers informed of order status updates from placement to completion.',
      'Created an order history module allowing users to view past transactions with detailed order summaries.',
      'Built a seller panel for merchants to manage their menu listings, track incoming orders, and update order statuses in real time.',
      'Developed an admin panel for overall platform management including user management, seller approval, and transaction monitoring.',
    ],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop',
    accent: 'from-orange-500 to-pink-500',
  },
  {
    id: 'summarecon',
    title: 'Summarecon Serpong — Internal Document System',
    period: 'Sep 2023 – Dec 2023',
    role: 'UI/UX Designer',
    stack: ['Figma', 'User Research', 'Design System', 'Prototyping'],
    description:
      'Designed an intuitive interface for an internal document management system used by employees, aimed at streamlining access, organization, and retrieval of documents.',
    highlights: [
      'Created user flows, wireframes, and high-fidelity mockups using Figma, ensuring a seamless and consistent user experience across the platform.',
      'Conducted user research and requirement analysis to understand employee workflows and pain points, directly informing design decisions.',
      'Developed interactive prototypes for usability testing and stakeholder presentations, enabling early feedback and iterative design improvements.',
      'Applied UI/UX best practices to enhance navigation, reduce complexity, and improve task efficiency for users handling large volumes of data.',
      'Collaborated closely with developers and project stakeholders to ensure accurate implementation of design specifications.',
      'Delivered final design assets and a design system documentation to support future scalability and development consistency.',
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop',
    accent: 'from-blue-500 to-cyan-500',
  },
]

export const EDUCATION = [
  {
    id: 'pradita',
    degree: 'Bachelor of Computer Science (S.Kom)',
    school: 'Pradita University',
    location: 'Tangerang, Indonesia',
  },
  {
    id: 'smk',
    degree: 'Senior High School — Multimedia',
    school: 'SMK Islamic Village',
    location: 'Tangerang, Indonesia',
  },
]
