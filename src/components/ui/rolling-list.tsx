import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RollingListItem {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  color?: "blue" | "rose";
}

interface RollingTextItemProps {
  item: RollingListItem;
  isActive?: boolean;
  onClick?: () => void;
}

const colorClassMap: Record<NonNullable<RollingListItem["color"]>, string> = {
  blue: "#3b82f6",
  rose: "#e63946",
};

function RollingTextItem({ item, isActive, onClick }: RollingTextItemProps) {
  const color = item.color ?? "rose";
  const accent = colorClassMap[color];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isActive}
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden border-b border-neutral-200 dark:border-neutral-800 py-5 md:py-6 text-left bg-transparent",
        isActive && "border-neutral-300 dark:border-neutral-700",
      )}
    >
      {/* Rolling text */}
      <div className="relative overflow-hidden h-[52px] md:h-20 pr-28 md:pr-40">
        <div
          className={cn(
            "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            "group-hover:-translate-y-1/2",
            isActive && "-translate-y-1/2",
          )}
        >
          {/* State 1: Normal */}
          <div className="h-[52px] md:h-20 flex items-center">
            <span
              className="rolling-list-title text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none"
              style={{ color: "var(--ink)" }}
            >
              {item.title}
            </span>
          </div>

          {/* State 2: Hover / Active (Italic + Red) */}
          <div className="h-[52px] md:h-20 flex items-center">
            <span
              className="rolling-list-title text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none"
              style={{ color: accent }}
            >
              {item.title}
            </span>
          </div>
        </div>
      </div>

      {/* Category Label — hide only on hover when collapsed */}
      <span
        className={cn(
          "absolute top-1/2 right-0 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-neutral-400 transition-opacity duration-300 hidden md:block",
          !isActive && "group-hover:opacity-0",
          isActive && "opacity-100",
        )}
      >
        {item.category}
      </span>

      {/* Image reveal — hover only while collapsed; hidden when expanded */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-1/2 z-20 -translate-y-1/2 overflow-hidden rounded-md shadow-xl",
          "h-14 w-24 md:h-16 md:w-28",
          "transition-all duration-500 ease-out",
          isActive
            ? "opacity-0 scale-90 pointer-events-none invisible"
            : cn(
                "opacity-0 scale-95 rotate-3 translate-x-3",
                "group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:translate-x-0",
              ),
        )}
      >
        <div className="relative h-full w-full">
          <img
            src={item.src}
            alt={item.alt}
            className="absolute inset-0 h-full w-full object-cover object-center grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
          />
          <div
            className={cn(
              "absolute inset-0 mix-blend-overlay",
              color === "rose" ? "bg-red-500/15" : "bg-blue-600/15",
            )}
          />
        </div>
      </div>
    </button>
  );
}

interface RollingTextListProps {
  items: RollingListItem[];
  heading?: string;
  activeId?: string | null;
  onItemClick?: (id: string) => void;
  className?: string;
  renderExpanded?: (id: string) => ReactNode;
}

function RollingTextList({
  items,
  heading = "Categories",
  activeId,
  onItemClick,
  className,
  renderExpanded,
}: RollingTextListProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-0 py-4",
        className,
      )}
    >
      {heading ? (
        <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-neutral-500 self-start">
          {heading}
        </h3>
      ) : null}
      <div className="w-full flex flex-col">
        {items.map((item) => (
          <div key={item.id} className="w-full">
            <RollingTextItem
              item={item}
              isActive={activeId === item.id}
              onClick={() => onItemClick?.(item.id)}
            />
            {activeId === item.id && renderExpanded ? (
              <div className="pb-8 pt-2">{renderExpanded(item.id)}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export { RollingTextList, RollingTextItem };
