import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getPortfolioItem,
  relatedByCategory,
  type PortfolioItem,
} from "@/data/portfolio";

function ProjectLinkCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Link
        to={item.href ?? `/project/${item.id}`}
        className="next-project-card"
      >
        <div
          className={`next-project-img ${
            item.thumbnailFit === "contain" ? "is-logo" : ""
          }`}
        >
          <img src={item.thumbnail} alt={item.title} />
        </div>
        <div className="next-project-info">
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
          <span className="next-project-cta">
            View Project <span>→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/** Lists every other portfolio item in the same category as `currentId`. */
export default function CategoryProjects({ currentId }: { currentId: string }) {
  const current = getPortfolioItem(currentId);
  const related = relatedByCategory(currentId);

  if (!current || related.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="project-detail-next"
    >
      <span className="next-label">More in {current.category}</span>
      <div className="next-project-grid">
        {related.map((item, index) => (
          <ProjectLinkCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
