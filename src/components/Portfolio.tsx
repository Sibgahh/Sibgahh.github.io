import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DarkVeil from "./DarkVeil";
import PathTrail from "./PathTrail";
import {
  RollingTextList,
  type RollingListItem,
} from "@/components/ui/rolling-list";
import {
  CATEGORY_FROM_QUERY,
  CATEGORY_META,
  CategoryKey,
  countByCategoryKey,
  itemsByCategoryKey,
  PortfolioItem,
  portfolioItems,
} from "@/data/portfolio";

function ProjectCard({ item, index }: { item: PortfolioItem; index: number }) {
  const visibleTags = item.tags.slice(0, 3);
  const extra = item.tags.length - visibleTags.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Link to={item.href ?? `/project/${item.id}`} className="portfolio-card">
        <div
          className={`portfolio-card-media ${
            item.thumbnailFit === "contain" ? "is-logo" : ""
          }`}
        >
          <img src={item.thumbnail} alt={item.title} />
        </div>
        <h3 className="portfolio-card-title">{item.title}</h3>
        <p className="portfolio-card-subtitle">{item.subtitle}</p>
        <div className="portfolio-card-tags">
          {visibleTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          {extra > 0 && <span>+{extra}</span>}
        </div>
        <span className="portfolio-card-cta">
          View Details <span aria-hidden="true">→</span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function Portfolio() {
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category") ?? "";
  const initial = CATEGORY_FROM_QUERY[queryCategory] ?? ("all" as CategoryKey);

  const [active, setActive] = useState<CategoryKey | null>(initial);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const next = CATEGORY_FROM_QUERY[queryCategory];
    if (next) setActive(next);
  }, [queryCategory]);

  const rollingItems: RollingListItem[] = useMemo(
    () =>
      CATEGORY_META.map((cat) => {
        const items = itemsByCategoryKey(cat.key);
        const count = countByCategoryKey(cat.key);
        const preview = items[0] ?? portfolioItems[0];

        return {
          id: cat.key,
          title: cat.shortTitle,
          category: `${count} ${count === 1 ? "Project" : "Projects"}`,
          src: preview?.thumbnail ?? "",
          alt: `${cat.label} preview`,
          color: "rose" as const,
        };
      }),
    [],
  );

  function handleCategoryClick(id: string) {
    setActive((prev) => (prev === id ? null : (id as CategoryKey)));
  }

  return (
    <section className="portfolio-page">
      <div className="page-veil" aria-hidden="true">
        <DarkVeil
          hueShift={241}
          scanlineIntensity={0.25}
          speed={1.1}
          scanlineFrequency={2.6}
          warpAmount={2.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="portfolio-page-header"
      >
        <PathTrail
          items={[{ label: "Home", to: "/" }, { label: "Portfolio" }]}
        />
        <span className="portfolio-badge">My Projects</span>
        <h1>Portfolio</h1>
        <p>
          Explore my recent projects and creative work across software, design,
          and video.
        </p>
      </motion.div>

      <RollingTextList
        heading="Categories"
        items={rollingItems}
        activeId={active}
        onItemClick={handleCategoryClick}
        renderExpanded={(id) => {
          const items = itemsByCategoryKey(id as CategoryKey);

          return (
            <AnimatePresence mode="wait">
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="portfolio-grid"
              >
                {items.map((item, idx) => (
                  <ProjectCard key={item.id} item={item} index={idx} />
                ))}
              </motion.div>
            </AnimatePresence>
          );
        }}
      />
    </section>
  );
}
