import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import {
  boardSlots,
  creativeBrands,
  getBrand,
  postsByBrand,
  type CreativeBrand,
  type CreativeBrandId,
  type CreativePost,
} from "@/data/creative";
import CategoryProjects from "./CategoryProjects";
import PathTrail from "./PathTrail";

function isBrandId(value: string | undefined): value is CreativeBrandId {
  return creativeBrands.some((brand) => brand.id === value);
}

function BrandBoardPage({
  brand,
  activeBrandId,
  onOpen,
}: {
  brand: CreativeBrand;
  activeBrandId: CreativeBrandId;
  onOpen: (post: CreativePost) => void;
}) {
  const { posts, hero, featured, social, gallery, carousel } = boardSlots(
    brand.id,
  );

  if (!hero) return null;

  return (
    <article
      className="brand-board-page"
      style={
        {
          "--bb-primary": brand.primary,
          "--bb-surface": brand.surface,
          "--bb-accent": brand.accent,
          "--bb-on-primary": brand.onPrimary,
        } as CSSProperties
      }
    >
      <header className="brand-board-topbar">
        <PathTrail
          className="brand-board-back"
          items={[
            { label: "Home", to: "/" },
            { label: "Portfolio", to: "/portfolio" },
            { label: "Creative Design", to: "/portfolio?category=creative" },
            { label: brand.name },
          ]}
        />
        <nav className="brand-board-nav" aria-label="Other brands">
          {creativeBrands.map((item) => {
            return (
              <Link
                key={item.id}
                to={`/creative/${item.id}`}
                className={`brand-board-nav-chip ${item.id === activeBrandId ? "is-active" : ""}`}
                aria-current={item.id === activeBrandId ? "page" : undefined}
                title={item.name}
              >
                <img src={item.logo} alt="" />
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="brand-board-hero">
        <div className="brand-board-hero-media is-logo">
          <img src={brand.logo} alt={`${brand.name} logo`} />
        </div>

        <div className="brand-board-hero-panel">
          <span className="brand-board-kicker">Brand Campaign</span>
          <h1 className="brand-board-name">{brand.name}</h1>
          <p className="brand-board-tagline">{brand.tagline}</p>
          <p className="brand-board-desc">{brand.description}</p>
          <div className="brand-board-tags">
            {brand.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="brand-board-count">{posts.length} creatives</p>
        </div>
      </div>

      <section className="brand-board-section">
        <header className="brand-board-section-head">
          <h2>Color Palette</h2>
          <p>Core brand colors with hex codes for consistent creative use.</p>
        </header>
        <div className="brand-board-palette">
          {brand.palette.map((color) => (
            <div
              key={`${color.name}-${color.hex}`}
              className="brand-board-swatch"
            >
              <span
                className="brand-board-swatch-chip"
                style={{ background: color.swatch ?? color.hex }}
                aria-hidden
              />
              <span className="brand-board-swatch-name">{color.name}</span>
              <code className="brand-board-swatch-hex">{color.hex}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="brand-board-section">
        <header className="brand-board-section-head">
          <h2>Typography</h2>
          <p>Font families used across headlines and body creatives.</p>
        </header>
        <div className="brand-board-fonts">
          {brand.fonts.map((font) => (
            <div
              key={`${font.role}-${font.family}`}
              className="brand-board-font"
            >
              <span className="brand-board-font-role">{font.role}</span>
              <p
                className="brand-board-font-sample"
                style={{ fontFamily: font.stack }}
              >
                Aa
              </p>
              <strong
                className="brand-board-font-name"
                style={{ fontFamily: font.stack }}
              >
                {font.family}
              </strong>
              <code className="brand-board-font-stack">{font.stack}</code>
              <span className="brand-board-font-usage">{font.usage}</span>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="brand-board-section">
          <header className="brand-board-section-head">
            <h2>Key Visuals</h2>
            <p>Signature campaign frames that define the brand look.</p>
          </header>
          <div
            className={`brand-board-key-grid cols-${Math.min(featured.length, 3)}`}
          >
            {featured.map((post) => (
              <button
                key={post.id}
                type="button"
                className="brand-board-tile"
                onClick={() => onOpen(post)}
              >
                <img src={post.src} alt={post.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}

      {(social.length > 0 || carousel.length > 0) && (
        <section className="brand-board-section brand-board-split">
          {social.length > 0 && (
            <div className="brand-board-split-col">
              <header className="brand-board-section-head">
                <h2>Social Media Style</h2>
                <p>Feed-ready compositions and storytelling posts.</p>
              </header>
              <div className="brand-board-social-grid">
                {social.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    className="brand-board-tile is-portrait"
                    onClick={() => onOpen(post)}
                  >
                    <img src={post.src} alt={post.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {carousel.length > 0 && (
            <div className="brand-board-split-col">
              <header className="brand-board-section-head">
                <h2>Carousel Series</h2>
                <p>Multi-slide sequences built for swipe storytelling.</p>
              </header>
              <div className="brand-board-carousel-grid">
                {carousel.slice(0, 4).map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    className="brand-board-tile"
                    onClick={() => onOpen(post)}
                  >
                    <img src={post.src} alt={post.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {gallery.length > 0 && (
        <section className="brand-board-section">
          <header className="brand-board-section-head">
            <h2>Campaign Gallery</h2>
            <p>More creatives from the {brand.name} system.</p>
          </header>
          <div className="brand-board-gallery-grid">
            {gallery.map((post) => (
              <button
                key={post.id}
                type="button"
                className="brand-board-tile"
                onClick={() => onOpen(post)}
              >
                <img src={post.src} alt={post.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}

      <footer className="brand-board-footer">
        <strong>{brand.name}</strong>
        <span>{brand.tagline}</span>
      </footer>
    </article>
  );
}

export default function CreativeGallery() {
  const { brandId } = useParams<{ brandId?: string }>();
  const [active, setActive] = useState<CreativePost | null>(null);

  const validBrandId = isBrandId(brandId) ? brandId : null;
  const brand = validBrandId ? getBrand(validBrandId) : undefined;

  const lightboxList = useMemo(
    () => (validBrandId ? postsByBrand(validBrandId) : []),
    [validBrandId],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setActive(null);
  }, [brandId]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = lightboxList.findIndex((post) => post.id === active.id);
        if (idx < 0) return;
        const next =
          e.key === "ArrowRight"
            ? lightboxList[(idx + 1) % lightboxList.length]
            : lightboxList[
                (idx - 1 + lightboxList.length) % lightboxList.length
              ];
        setActive(next);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, lightboxList]);

  if (!brandId) {
    return <Navigate to={`/creative/${creativeBrands[0].id}`} replace />;
  }

  if (brandId === "uol") {
    return <Navigate to="/creative/umn-online-learning" replace />;
  }

  if (!brand || !validBrandId) {
    return <Navigate to="/portfolio?category=creative" replace />;
  }

  return (
    <>
      <BrandBoardPage
        key={validBrandId}
        brand={brand}
        activeBrandId={validBrandId}
        onOpen={setActive}
      />

      <div className="creative-related-wrap">
        <CategoryProjects currentId={validBrandId} />
      </div>

      {active && (
        <div
          className="creative-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="creative-lightbox-close"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X aria-hidden />
          </button>
          <figure
            className="creative-lightbox-figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={active.src} alt={active.alt} />
            <figcaption>
              <strong>{active.brandName}</strong>
              <span>{active.alt}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
