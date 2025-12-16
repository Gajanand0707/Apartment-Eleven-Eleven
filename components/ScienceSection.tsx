"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import texture from "../public/texture.png";

interface ScienceCard {
  title: string;
  description: string;
}

export default function ScienceSection() {
  const cards: ScienceCard[] = [
    {
      title: "First Principal Thinking",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, risus nec commodo dictum, nulla turpis cursus turpis, non tincidunt est nisl a eros. Integer dignissim metus ac convallis ultricies. Pellentesque vel ligula id mauris porttitor gravida. Donec nec justo at nisl sagittis aliquet.",

    },
    {
      title: "Root Cause Analysis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, risus nec commodo dictum, nulla turpis cursus turpis, non tincidunt est nisl a eros. Integer dignissim metus ac convallis ultricies. Pellentesque vel ligula id mauris porttitor gravida. Donec nec justo at nisl sagittis aliquet.  ",

    },
    {
      title: "User-Centric Ideation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, risus nec commodo dictum, nulla turpis cursus turpis, non tincidunt est nisl a eros. Integer dignissim metus ac convallis ultricies. Pellentesque vel ligula id mauris porttitor gravida. Donec nec justo at nisl sagittis aliquet.  ",

    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle card (index 1) as center
  const [animateDirection, setAnimateDirection] = useState<"left" | "right" | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const [centerHeight, setCenterHeight] = useState<number | null>(null);

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < cards.length - 1);
  }, [currentIndex, cards.length]);

  useEffect(() => {
    if (!centerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (centerRef.current) setCenterHeight(centerRef.current.offsetHeight);
    });
    ro.observe(centerRef.current);
    // measure once after layout
    setTimeout(() => {
      if (centerRef.current) setCenterHeight(centerRef.current.offsetHeight);
    }, 60);
    return () => ro.disconnect();
  }, [centerRef.current]);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setAnimateDirection("left");
      setCurrentIndex((i) => (i > 0 ? i - 1 : cards.length - 1));
    } else if (direction === "right") {
      setAnimateDirection("right");
      setCurrentIndex((i) => (i < cards.length - 1 ? i + 1 : 0));
    }
    setTimeout(() => setAnimateDirection(null), 500);
  };

  // Get previous, current, and next cards
  const getVisibleCards = () => {
    const prev = currentIndex > 0 ? cards[currentIndex - 1] : cards[cards.length - 1];
    const current = cards[currentIndex];
    const next = currentIndex < cards.length - 1 ? cards[currentIndex + 1] : cards[0];
    return [prev, current, next];
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="relative bg-[#D8CCBA]  overflow-hidden pb-[78px]">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="font-goudy-agency font-bold text-4xl sm:text-5xl lg:text-7xl mt-[61px] leading-[1.15] text-black mb-8">
          In Science we Trust
        </h2>

        {/* ✅ Mobile Carousel with Center Card Focus */}
        <div className="relative block md:hidden">
          {/* Animation styles */}
          <style jsx global>{`
            @keyframes cardEnterFromRight {
              0% {
                opacity: 0;
                transform: translateX(32px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
            @keyframes cardEnterFromLeft {
              0% {
                opacity: 0;
                transform: translateX(-32px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
            .enter-right {
              animation: cardEnterFromRight 480ms cubic-bezier(0.22, 1, 0.36, 1);
            }
            .enter-left {
              animation: cardEnterFromLeft 480ms cubic-bezier(0.22, 1, 0.36, 1);
            }
          `}</style>

          <div className="relative w-full flex items-center justify-center z-10">
              <button
                onClick={() => scroll("left")}
                className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-[30] bg-black/80 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black transition-colors active:scale-95"
                aria-label="Scroll left"
              >
                <FaChevronLeft size={20} />
              </button>

            <div className="w-full max-w-7xl px-2 sm:px-4 md:px-12">
              <div className="flex items-stretch justify-center relative py-6 sm:py-8 gap-2 sm:gap-4 md:gap-6">
                {/* Left card - small */}
                <CarouselCard
                  card={visibleCards[0]}
                  size="small"
                  centerHeight={centerHeight}
                  animateClass={
                    animateDirection === "right"
                      ? "enter-right"
                      : animateDirection === "left"
                      ? "enter-left"
                      : ""
                  }
                />
                {/* Center card - large */}
                <CarouselCard
                  card={visibleCards[1]}
                  size="large"
                  centerRef={centerRef}
                  centerHeight={centerHeight}
                  animateClass={
                    animateDirection === "right"
                      ? "enter-right"
                      : animateDirection === "left"
                      ? "enter-left"
                      : ""
                  }
                />
                {/* Right card - small */}
                <CarouselCard
                  card={visibleCards[2]}
                  size="small"
                  centerHeight={centerHeight}
                  animateClass={
                    animateDirection === "right"
                      ? "enter-right"
                      : animateDirection === "left"
                      ? "enter-left"
                      : ""
                  }
                />
              </div>
            </div>

              <button
                onClick={() => scroll("right")}
                className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-[30] bg-black/80 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black transition-colors active:scale-95"
                aria-label="Scroll right"
              >
                <FaChevronRight size={20} />
              </button>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center z-10">
            <div className="h-[2px] w-[200px] sm:w-[240px] md:w-[260px] bg-gray-300 rounded-full" />
            <div
              className="h-[2px] bg-black rounded-full -mt-[2px] transition-all duration-300 max-w-[200px] sm:max-w-[240px] md:max-w-[260px]"
              style={{
                width: `${((currentIndex + 1) / cards.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* ✅ Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative rounded-[32px] overflow-hidden text-white -mt-2"
            >
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="relative z-[1] p-8 sm:p-10 flex flex-col items-center text-center">
                <h3 className="font-semibold font-goudy-old md:text-2xl lg:text-4xl mb-4 -my-4 max-w-[275px]">
                  {card.title}
                </h3>
                <div className="border-b-white border w-screen -mx-8 sm:-mx-10 my-2"></div>
                <p className=" md:text-xl lg:text-2xl leading-relaxed font-goudy max-w-[360px] text-center">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ✅ Internal Carousel Card */
function CarouselCard({
  card,
  size,
  animateClass,
  centerRef,
  centerHeight,
}: {
  card: ScienceCard;
  size: "small" | "large";
  animateClass?: string;
  centerRef?: React.RefObject<HTMLDivElement | null>;
  centerHeight?: number | null;
}) {
  const sizeClass =
    size === "large"
      ? "z-10 w-[80vw] sm:w-[24rem] md:w-[30rem] lg:w-[32rem]"
      : "w-[55vw] sm:w-60 md:w-[24rem] lg:w-[26rem] scale-85 sm:scale-90 opacity-60 sm:opacity-70 md:opacity-90";

  const marginClass = size === "large" ? "" : "-mx-8 sm:-mx-12 md:-mx-24";

  // Overlay class: center card should overlap and sit above side cards
  const overlayClass = size === "large"
    ? "z-20 -translate-y-8 shadow-[0_22px_48px_rgba(0,0,0,0.28)]"
    : "z-0 translate-y-6";

  // Use explicit heights: center card shows full content; side cards are fixed/shorter
  const heightClass = size === "large"
    ? "min-h-[420px] sm:min-h-[520px] md:min-h-[560px]" // center card taller than side cards on mobile and up
    : "h-[280px] sm:h-[300px] md:h-[340px] overflow-hidden";

  const contentPadding =
    size === "large"
      ? "pt-5 pb-2 sm:pt-6 sm:pb-3 md:pt-8 md:pb-4"
      : "p-4 pb-2 sm:p-6 md:p-8";

  return (
    <div className={`flex-shrink-0 ${sizeClass} ${marginClass} transition-all duration-300 ${overlayClass} rounded-[32px] overflow-hidden`}>
      <div
        ref={size === "large" ? centerRef : undefined}
        className={`relative rounded-[32px] overflow-hidden text-white ${heightClass} flex flex-col items-center justify-start ${animateClass || ""}`}
      >
        <Image
          src={texture}
          alt="Terracotta background"
          fill
          priority
          className="object-cover object-center rounded-[32px]"
        />
              <div className={`relative z-[1] ${contentPadding} flex flex-col items-center text-center w-full min-w-0 ${size === 'large' ? 'h-auto md:h-full' : 'h-full'}`}>
            <h3 className={`font-semibold ${size === "small" ? "text-2xl mb-1 sm:mb-2 line-clamp-2 overflow-hidden" : "text-2xl md:text-4xl mb-2 sm:mb-3"} break-words`}>
              {card.title}
            </h3>
            <div className={`border-b-white border w-screen my-1 ${size === 'large' ? '-mx-5 sm:-mx-6 md:-mx-8' : '-mx-4 sm:-mx-6 md:-mx-8'}`} />
              <div className="w-full max-w-[95%] sm:max-w-[90%] flex-1 min-h-0 flex flex-col justify-center items-center mt-6">
                <p className={`${size === "small" ? "text-xl line-clamp-3 sm:line-clamp-4 overflow-hidden text-center" : "text-xl md:text-2xl flex-1 min-h-0 overflow-auto text-center"} leading-relaxed break-words`}>
              {card.description}
            </p>
              </div>
        </div>
      </div>
    </div>
  );
}

