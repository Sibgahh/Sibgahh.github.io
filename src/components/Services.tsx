import { motion } from "framer-motion";
import { type ComponentType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Folder from "./Folder";
import eateaseThumbnail from "@/3dAssetThumbnail/eatease.jpeg";
import cangopiThumbnail from "@/3dAssetThumbnail/cangopi.jpeg";
import smsThumbnail from "@/3dAssetThumbnail/sms.jpeg";
import umnGraduateThumb from "@/3dAssetThumbnail/umngraduatevideo.png";
import videoUolThumb from "@/3dAssetThumbnail/VideoUOL.png";
import type { CategoryKey } from "@/data/portfolio";
import { brandVideoProjects } from "@/data/videos";
import { coverForBrand } from "@/data/creative";

interface Service {
  title: string;
  images: string[];
  category: CategoryKey;
  href?: string;
}

const creativeCovers = [
  coverForBrand("umn-online-learning"),
  coverForBrand("umn-graduate"),
  coverForBrand("ajwa-naeem"),
].filter(Boolean) as string[];

const services: Service[] = [
  {
    title: "Software Development",
    images: [eateaseThumbnail, cangopiThumbnail, smsThumbnail],
    category: "software",
  },
  {
    title: "Creative Design",
    images: creativeCovers,
    category: "creative",
  },
  {
    title: "Video Editing",
    images: [
      umnGraduateThumb,
      videoUolThumb,
      brandVideoProjects.siloam.thumbnail,
    ],
    category: "video",
  },
];

const folderColors = ["#e63946", "#4ecdc4", "#ff6b7a"];

type FolderProps = {
  color?: string;
  size?: number;
  items?: ReactNode[];
  className?: string;
};

const TypedFolder = Folder as ComponentType<FolderProps>;

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const folderItems = service.images
    .slice(0, 3)
    .map((img) => (
      <img className="service-folder-img" src={img} alt="" key={img} />
    ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="service-card-wrap"
    >
      <span className="service-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="service-folder-slot">
        <TypedFolder
          size={2.1}
          color={folderColors[index % folderColors.length]}
          items={folderItems}
        />
      </div>

      <h3 className="service-title">{service.title}</h3>

      <Link
        to={service.href ?? `/portfolio?category=${service.category}`}
        className="service-card-cta"
      >
        View Projects <span className="service-card-cta-arrow">→</span>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="services-section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="services-header"
      >
        <h2>SPECIALIST SERVICES</h2>
        <div className="services-header-line" />
      </motion.div>

      {/* Services grid */}
      <div className="services-grid">
        {services.map((service, idx) => (
          <ServiceCard key={service.title} service={service} index={idx} />
        ))}
      </div>
    </section>
  );
}
