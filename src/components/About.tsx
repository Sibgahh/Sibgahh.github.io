import { useEffect, useRef, useState, type SVGProps } from "react";
import { motion, useInView } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { Mail, Phone, ExternalLink, Award, X } from "lucide-react";
import Lanyard from "./Lanyard/Lanyard";
import frontImg from "@/image/1767262655546.png";
import backImg from "@/logo/Sibgah Rabbani Kusuma (2).png";
import cardGLB from "./Lanyard/card.glb";

import logoTelkom from "@/logo/Company_Logo/TelkomSigma.webp";
import logoSummarecon from "@/logo/Company_Logo/Summarecon_Agung.svg";
import logoTriverie from "@/logo/Company_Logo/Logo_Triverie_PT.png";
import logoMain from "@/logo/Company_Logo/logo-main.png";
import logoFooter from "@/logo/Company_Logo/logofooter.png";
import logoNew from "@/logo/Company_Logo/newlogos.png";
import logoImg02 from "@/logo/Company_Logo/img-02.webp";
import logoHash from "@/logo/Company_Logo/680f3bfb25c9fae7ad98b43a61f90593.png";
import logoUmn from "@/logo/Company_Logo/Logo-UMN-e1634700898276 (1).png";
import logoSiloam from "@/logo/Company_Logo/Siloam_Hospitals.svg";
import certAssembly from "@/sertifikat/previews/Sibgah Rabbani Kusuma.jpg";
import certAppreciation from "@/sertifikat/Sertifikat_OFFLINE_DANAID8-16.png";
import certEthicalHacking from "@/sertifikat/previews/Coursera 6RC8BTBXNNLA.jpg";
import certNetworkDefense from "@/sertifikat/previews/Coursera QQV8W9X2VHTT.jpg";
import certDigitalForensics from "@/sertifikat/previews/DFE.jpg";

useGLTF.preload(cardGLB);

const companyLogos = [
  { src: logoTelkom, alt: "Telkomsigma" },
  { src: logoSummarecon, alt: "Summarecon Agung" },
  { src: logoTriverie, alt: "Triverie" },
  { src: logoUmn, alt: "UMN" },
  { src: logoSiloam, alt: "Siloam Hospitals" },
  { src: logoMain, alt: "Partner" },
  { src: logoFooter, alt: "Partner" },
  { src: logoNew, alt: "Partner" },
  { src: logoImg02, alt: "Partner" },
  { src: logoHash, alt: "Partner" },
];

const certifications = [
  { src: certAssembly, alt: "IT Security Awareness — Pradita University" },
  { src: certAppreciation, alt: "Certificate of Appreciation — DANA Indonesia" },
  { src: certEthicalHacking, alt: "Ethical Hacking Essentials — EC-Council" },
  { src: certNetworkDefense, alt: "Network Defense Essentials — EC-Council" },
  { src: certDigitalForensics, alt: "Digital Forensics Essentials — EC-Council" },
];

const skills = [
  "User-Centered Design",
  "Clean Code Implementation",
  "Design-to-Code Handoff",
  "Mobile Development",
  "UX Research",
  "Prototyping",
  "Systematic Thinking",
  "Interface Interaction",
  "Problem Solving",
  "Visual Design Strategy",
];

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sibgah/",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:sibgahrk190@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    href: "tel:+6281314147941",
    icon: Phone,
  },
];

export default function About() {
  const lanyardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lanyardRef, { once: true, amount: 0.15 });
  const [ready, setReady] = useState(false);
  const [activeCert, setActiveCert] = useState<(typeof certifications)[number] | null>(null);

  useEffect(() => {
    if (inView) setReady(true);
  }, [inView]);

  useEffect(() => {
    if (!activeCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCert(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeCert]);

  const logoLoop = [...companyLogos, ...companyLogos];

  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-layout">
          {/* Left: identity + lanyard + certifications */}
          <motion.aside
            className="about-left"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="about-role">Mobile & Frontend Developer</p>
            <h2 className="about-name">Sibgah Rabbani Kusuma</h2>

            <div ref={lanyardRef} className="about-lanyard">
              {ready && (
                <motion.div
                  className="about-lanyard-stage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Lanyard
                    position={[0, 0, 12]}
                    gravity={[0, -40, 0]}
                    fov={20}
                    transparent
                    frontImage={frontImg}
                    backImage={backImg}
                    imageFit="cover"
                    lanyardWidth={1.25}
                  />
                </motion.div>
              )}
            </div>

            <div className="about-certs">
              <div className="about-block-head">
                <Award className="about-block-icon" aria-hidden />
                <span>Certifications</span>
                <span className="about-block-line" />
              </div>
              <div className="about-certs-grid">
                {certifications.map((cert) => (
                  <button
                    key={cert.alt}
                    type="button"
                    className="about-cert-thumb"
                    title={cert.alt}
                    aria-label={`View ${cert.alt}`}
                    onClick={() => setActiveCert(cert)}
                  >
                    <img src={cert.src} alt={cert.alt} />
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Right: about, logos marquee, skills, socials */}
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="about-block">
              <div className="about-block-head">
                <span>Why Hire Me, Not AI</span>
                <span className="about-block-line" />
              </div>
              <h3 className="about-headline">
                AI can generate code. <em>It can&apos;t own the outcome.</em>
              </h3>
              <p className="about-body">
                A prompt gives you a guess. I give you a product — I sit with
                the real problem, connect <strong>business goals</strong> with{" "}
                <strong>user needs</strong>, and make the judgment calls no
                model can: what to build, what to cut, and why it matters.
              </p>
              <p className="about-body">
                I catch the edge cases, debug the weird stuff, talk to
                stakeholders, and take full ownership from wireframe to
                production — accountable, adaptable, and invested in getting it
                right, not just getting it done.
              </p>
              <p className="about-quote">
                AI writes code. I ship products people can trust.
              </p>
            </div>

            <div className="about-block">
              <div className="about-block-head">
                <span>Collaborating with Industry Leaders</span>
                <span className="about-block-line" />
              </div>
              <div className="about-logo-marquee" aria-label="Company logos">
                <div className="about-logo-track">
                  {logoLoop.map((logo, i) => (
                    <div key={`${logo.alt}-${i}`} className="about-logo-item">
                      <img src={logo.src} alt={logo.alt} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-block">
              <div className="about-block-head">
                <span>Core Values & Skills</span>
                <span className="about-block-line" />
              </div>
              <div className="about-skills">
                {skills.map((skill) => (
                  <span key={skill} className="about-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="about-socials">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="about-social"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                >
                  <Icon className="about-social-icon" />
                  <ExternalLink className="about-social-ext" aria-hidden />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {activeCert && (
        <div
          className="about-cert-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.alt}
          onClick={() => setActiveCert(null)}
        >
          <button
            type="button"
            className="about-cert-modal-close"
            onClick={() => setActiveCert(null)}
            aria-label="Close"
          >
            <X aria-hidden />
          </button>
          <figure
            className="about-cert-modal-figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={activeCert.src} alt={activeCert.alt} />
            <figcaption>{activeCert.alt}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
