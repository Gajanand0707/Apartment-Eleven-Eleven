"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
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
    const n = playbooks.length
    if (n === 0) return
    setAnimateDirection(direction === "left" ? "left" : "right")
    setCurrentIndex((i) => {
      if (n >= 3) {
        return direction === "left" ? (i - 1 + n) % n : (i + 1) % n
      }
      return direction === "left" ? (i - 1 + n) % n : (i + 1) % n
    })
    // Reset the direction after the animation ends so next click retriggers
    setTimeout(() => setAnimateDirection(null), 500)
  }

  if (playbooks.length === 0) {
    return null; // Don't render if no items
  }

  const n = playbooks.length
  let visibleCards: CardItem[] = []
  if (n >= 3) {
    visibleCards = [
      playbooks[currentIndex % n],
      playbooks[(currentIndex + 1) % n],
      playbooks[(currentIndex + 2) % n],
    ]
  } else {
    visibleCards = [playbooks[0], playbooks[1]].filter(Boolean)
  }

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

      <div ref={sectionRef} className="bg-[#D5C7B3]  px-4 md:-mt-16">
        {/* Section Title */}
        <div className="text-center ">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-goudy-agency text-[#111] -mt-4 ">
            Growth
          </h2>
          {/* <div className="w-1/2 sm:w-[420px] h-0.5 bg-[#111] mx-auto" /> */}
         
        </div>

        {/* Carousel */}
        <div className="relative w-full flex items-center md:-mt-8 justify-center">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className={`absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 bg-focus text-white p-3 sm:p-4 rounded-full hover:bg-[#333] transition-colors active:scale-95`}
          >
            <FaChevronLeft size={24} />
          </button>

          <div className="w-full max-w-7xl px-2 sm:px-6 md:px-12 md:-mt-4 py-8">
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

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 bg-focus text-white p-3 sm:p-4 rounded-full hover:bg-[#333] transition-colors active:scale-95`}
          >
            <FaChevronRight size={24} />
          </button>
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
      : "w-[54vw] sm:w-80 md:w-96 lg:w-[26rem]"
  const marginClass = size === "large" ? "" : "-mx-6 sm:-mx-12 md:-mx-40"
  const imageHeight = size === "large" ? "h-64 sm:h-80" : "h-48 sm:h-60"
  const scaleClass = size === "small" ? "scale-90 md:scale-95" : ""
  const contentHeight = size === "large" ? "min-h-[200px]" : "min-h-[180px]"

  return (
    <div className={`shrink-0 ${sizeClass} ${marginClass} ${scaleClass} transition-all duration-300`}>
      {/* The key is crucial so React re-mounts on change and the animation runs */}
      <Link href={item.link} className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111] focus:ring-offset-white rounded-4xl">
        <div key={item.id} className={`w-full border-2 border-[#111] rounded-4xl overflow-hidden bg-white shadow-xl ${animateClass || ""}`}>
          <div className={`relative w-full ${imageHeight} overflow-hidden`}>
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          </div>
          <div className={`p-4 sm:p-5 flex flex-col ${contentHeight}`}>
            <h3 className="text-xl md:text-2xl font-goudy-agency font-bold  mb-2 text-center line-clamp-2 min-h-[3.5rem]">{item.title}</h3>
            <p className="font-goudy text-[14px] md:text-xl text-center leading-relaxed line-clamp-4 mb-3 min-h-[5.6rem] md:min-h-[6.4rem]">
              {item.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
