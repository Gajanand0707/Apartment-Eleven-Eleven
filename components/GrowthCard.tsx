"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import blogcard from "../public/blogcard.png"

type CardItem = {
  id: number
  title: string
  description: string
  image: string
  link: string
}

export default function Technology({ data }: { data?: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [playbooks, setPlaybooks] = useState<CardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [animateDirection, setAnimateDirection] = useState<"left" | "right" | null>(null)

  useEffect(() => {
    if (data && data.length > 0) {
      const mapped = data.map((item: any) => ({
        id: item.id,
        title: item.title || '',
        description: item.introduction || '',
        image: item.thumbnail?.url || blogcard.src,
        link: `/playbooks/${item.documentId}`
      }));
      setPlaybooks(mapped);
    }
  }, [data]);

  useEffect(() => {
    if (playbooks.length > 0) {
      setCanScrollLeft(currentIndex > 0)
      setCanScrollRight(currentIndex < Math.max(0, playbooks.length - 3))
    }
  }, [currentIndex, playbooks.length])

  useEffect(() => {
    // Reset to first index when data changes
    setCurrentIndex(0)
  }, [playbooks])

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) {
      setAnimateDirection("left")
      setCurrentIndex((i) => i - 1)
    } else if (direction === "right" && currentIndex < Math.max(0, playbooks.length - 3)) {
      setAnimateDirection("right")
      setCurrentIndex((i) => i + 1)
    }
    // Reset the direction after the animation ends so next click retriggers
    setTimeout(() => setAnimateDirection(null), 500)
  }

  if (playbooks.length === 0) {
    return null; // Don't render if no items
  }

  // Handle cases with fewer than 3 items by showing what we have
  const visibleCards = [
    playbooks[currentIndex],
    playbooks[currentIndex + 1] || null,
    playbooks[currentIndex + 2] || null,
  ].filter(Boolean)

  return (
    <>
      {/* Direction-aware entry animations */}
      <style jsx global>{`
        @keyframes cardEnterFromRight {
          0%   { opacity: 0; transform: translateX(32px) scale(0.98); }
          100% { opacity: 1; transform: translateX(0)    scale(1); }
        }
        @keyframes cardEnterFromLeft {
          0%   { opacity: 0; transform: translateX(-32px) scale(0.98); }
          100% { opacity: 1; transform: translateX(0)     scale(1); }
        }
        .enter-right { animation: cardEnterFromRight 480ms cubic-bezier(.22,1,.36,1); }
        .enter-left  { animation: cardEnterFromLeft  480ms cubic-bezier(.22,1,.36,1); }
        @media (prefers-reduced-motion: reduce) {
          .enter-right, .enter-left { animation: none !important; }
        }
      `}</style>

      <div ref={sectionRef} className="bg-[#D5C7B3] py-10 sm:py-14 md:py-16 px-4">
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-8xl font-bold font-[Playfair_Display] text-[#111] mb-3 sm:mb-4">
            Growth
          </h2>
          <div className="w-1/2 sm:w-[420px] h-[2px] bg-[#111] mx-auto" />
          <div className="w-2/5 sm:w-[360px] h-[2px] bg-[#111] mx-auto mt-2" />
        </div>

        {/* Carousel */}
        <div className="relative w-full flex items-center justify-center">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 bg-[#111] text-white p-3 sm:p-4 rounded-full hover:bg-[#333] transition-colors active:scale-95"
              aria-label="Scroll left"
            >
              ←
            </button>
          )}

          <div className="w-full max-w-7xl px-2 sm:px-6 md:px-12">
            {/* Composition container */}
            <div className="flex items-center justify-center relative py-2 sm:py-4 md:py-0 md:h-[700px]">
              {visibleCards.length >= 3 ? (
                <>
                  {/* Left Card */}
                  <Card
                    item={visibleCards[0]}
                    size="small"
                    animateClass={animateDirection === "right" ? "enter-right" : animateDirection === "left" ? "enter-left" : ""}
                  />
                  {/* Center Card */}
                  <Card
                    item={visibleCards[1]}
                    size="large"
                    animateClass={animateDirection === "right" ? "enter-right" : animateDirection === "left" ? "enter-left" : ""}
                  />
                  {/* Right Card */}
                  <Card
                    item={visibleCards[2]}
                    size="small"
                    animateClass={animateDirection === "right" ? "enter-right" : animateDirection === "left" ? "enter-left" : ""}
                  />
                </>
              ) : (
                // For fewer than 3 items, show them centered
                visibleCards.map((card, idx) => (
                  <Card
                    key={card.id}
                    item={card}
                    size={idx === 0 && visibleCards.length === 1 ? "large" : "small"}
                    animateClass={animateDirection === "right" ? "enter-right" : animateDirection === "left" ? "enter-left" : ""}
                  />
                ))
              )}
            </div>
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 bg-[#111] text-white p-3 sm:p-4 rounded-full hover:bg-[#333] transition-colors active:scale-95"
              aria-label="Scroll right"
            >
              →
            </button>
          )}
        </div>
      </div>
    </>
  )
}

/** Card component with keyed inner content so animation always plays on item change */
function Card({
  item,
  size,
  animateClass,
}: {
  item: CardItem
  size: "small" | "large"
  animateClass?: string
}) {
  const sizeClass =
    size === "large"
      ? "z-10 w-[68vw] sm:w-[26rem] md:w-[30rem] lg:w-[34rem]"
      : "w-[54vw] sm:w-80 md:w-96 lg:w-[26rem] scale-95"
  const marginClass = size === "large" ? "" : "-mx-6 sm:-mx-12 md:-mx-40"

  return (
    <div className={`flex-shrink-0 ${sizeClass} ${marginClass} aspect-[3/4] transition-all duration-300`}>
      {/* The key is crucial so React re-mounts on change and the animation runs */}
      <div key={item.id} className={`h-full w-full border-2 border-[#111] rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xl ${animateClass || ""}`}>
        <div className="relative w-full h-[50%] sm:h-[55%] overflow-hidden">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
        </div>
        <div className="p-4 sm:p-5 flex flex-col h-[50%] sm:h-[45%]">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#111] mb-2 line-clamp-2">{item.title}</h3>
          <p className="text-[#333] text-xs sm:text-sm md:text-base leading-relaxed flex-1 line-clamp-4">
            {item.description}
          </p>
          <a href={item.link} className="inline-block text-[#111] font-semibold hover:underline mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
            Learn More →
          </a>
        </div>
      </div>
    </div>
  )
}
