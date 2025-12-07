"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Card = { id: number | string; title: string; subtitle?: string; description: string; image: string };

type Props = {
  items: Card[];
  /** pixels per second */
  speed?: number; // default 80
  /** card width in px (kept fixed to avoid layout shift) */
  cardWidth?: number; // default 320
  gap?: number; // px between cards, default 32
  className?: string;
  /** scroll direction: 'left' (left to right) or 'right' (right to left) */
  direction?: "left" | "right"; // default "left"
};

export default function AutoScrollCarousel({
  items,
  speed = 120,
  cardWidth = 320,
  gap = 32,
  className,
  direction = "left",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(30); // seconds
  const [paused, setPaused] = useState(false);

  // duplicate once for seamless loop
  const loopItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    // measure half-row width (one set of items)
    const track = trackRef.current;
    if (!track) return;

    // total width of one set = n * cardWidth + (n-1) * gap
    const n = items.length;
    const oneSetWidth = n > 0 ? n * cardWidth + (n - 1) * gap : 0;

    // duration = distance / speed
    const seconds = oneSetWidth > 0 ? oneSetWidth / speed : 30;
    setDuration(seconds);
  }, [items, speed, cardWidth, gap]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#D5C7B3] py-8 select-none ${className ?? ""}`}
      // onMouseEnter={() => setPaused(true)}
      // onMouseLeave={() => setPaused(false)}
      // onTouchStart={() => setPaused(true)}
      // onTouchEnd={() => setPaused(false)}
    >
      {/* The moving track */}
      <div
        ref={trackRef}
        className="flex items-stretch"
        style={{
          gap: `${gap}px`,
          // move left by 50% of the track (one set), loop forever
          animation: direction === "left" 
            ? `marquee-left ${duration}s linear infinite`
            : `marquee-right ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          // Improve perf on Safari/Chrome
          willChange: "transform",
        }}
      >
        {loopItems.map((it, i) => (
          <article
            key={`${it.id}-${i}`}
            className="bg-white rounded-[28px] border border-[#111] overflow-hidden shadow items-center"
            style={{ width: `${cardWidth}px`, flex: "0 0 auto" }}
          >
            <div className="relative w-full h-80">
              <Image src={it.image} alt={it.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#111] mb-1 text-center font-[Goudy_Old_Style] px-10 line-clamp-1">{it.title}</h3>
              {it.subtitle && (
                <p className="text-lg md:text-xl text-[#222] font-bold text-center px-10 font-[Goudy_Old_Style] line-clamp-2 mb-1">{it.subtitle}</p>
              )}
              <p className="text-xl md:text-2xl text-[#333] text-center mx-auto max-w-[423px] font-[Goudy_Bookletter_1911] line-clamp-4">{it.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* nice edge fades (optional) */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#D5C7B3] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#D5C7B3] to-transparent" /> */}

      {/* Keyframes local to this component */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: marquee"] {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}
