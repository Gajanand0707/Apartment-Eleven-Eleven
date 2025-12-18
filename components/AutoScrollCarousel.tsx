"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Card = { id: number | string; title: string; subtitle?: string; description: string; image: string };

type Props = {
  items: Card[];
  speed?: number;
  cardWidth?: number;
  gap?: number;
  className?: string;
  direction?: "left" | "right";
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
  const [duration, setDuration] = useState(30);
  const [paused, setPaused] = useState(false);

  const loopItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const n = items.length;
    const oneSetWidth = n > 0 ? n * cardWidth + (n - 1) * gap : 0;
    const seconds = oneSetWidth > 0 ? oneSetWidth / speed : 30;
    setDuration(seconds);
  }, [items, speed, cardWidth, gap]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#D5C7B3] py-8 flex select-none ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex items-stretch flex-none"
        style={{
          // gap: `${gap}px`,
          // LONGHAND ONLY - no shorthand conflicts
          animationName: direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {loopItems.map((it, i) => (
          <article
            key={`${it.id}-${i}`}
            className="bg-white rounded-[28px] mx-4 border border-[#111] overflow-hidden shadow items-center"
            style={{ width: `calc(100vw - 32px)`, flex: "0 0 auto", maxWidth: `${cardWidth}px` }}
          >
            <div className="relative w-full h-48 md:h-80">
              <Image src={it.image} alt={it.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#111] mb-1 text-center font-goudy-old px-10 line-clamp-1">{it.title}</h3>
              {it.subtitle && (
                <p className="text-lg md:text-xl text-[#222] font-bold text-center px-10 font-goudy-agency line-clamp-2 mb-1">{it.subtitle}</p>
              )}
              <p className="text-xl md:text-2xl text-[#333] text-center mx-auto max-w-[423px] font-goudy line-clamp-4">{it.description}</p>
            </div>
          </article>
        ))}
        {loopItems.map((it, i) => (
          <article
            key={`${it.id}-${i}`}
            className="bg-white rounded-[28px] border mx-4 border-[#111] overflow-hidden shadow items-center"
            style={{ width: `calc(100vw - 32px)`, flex: "0 0 auto", maxWidth: `${cardWidth}px` }}
          >
            <div className="relative w-full h-48 md:h-80">
              <Image src={it.image} alt={it.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#111] mb-1 text-center font-goudy-old px-10 line-clamp-1">{it.title}</h3>
              {it.subtitle && (
                <p className="text-lg md:text-xl text-[#222] font-bold text-center px-10 font-goudy-agency line-clamp-2 mb-1">{it.subtitle}</p>
              )}
              <p className="text-xl md:text-2xl text-[#333] text-center mx-auto max-w-[423px] font-goudy line-clamp-4">{it.description}</p>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animationName"] {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}
