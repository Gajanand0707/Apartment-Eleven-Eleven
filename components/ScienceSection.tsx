"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import texture from "../public/texture.png";

interface ScienceCard {
  title: string;
  description: string;
}

export default function ScienceSection() {
  const cards: ScienceCard[] = [
    {
      title: "Sustainable Living: Green Building Standards and Energy Efficiency",
      description:
        "We bring authenticity and clarity to premium living with collaboration with the industry's best professionals and experts. Learn more about our process and how we redefine modern residency with care, transparency, and excellence. Our residency panel is composed of highly accomplished architects, designers, and consultants who bring years of experience in creating spaces that merge modern aesthetics with functionality.",
    },
    {
      title: "Sustainable Living: Green Building Standards and Energy Efficiency",
      description:
        "We bring authenticity and clarity to premium living with collaboration with the industry's best professionals and experts. Learn more about our process and how we redefine modern residency with care, transparency, and excellence. Our residency panel is composed of highly accomplished architects, designers, and consultants who bring years of experience in creating spaces that merge modern aesthetics with functionality.",
    },
    {
      title: "Sustainable Living: Green Building Standards and Energy Efficiency",
      description:
        "We bring authenticity and clarity to premium living with collaboration with the industry's best professionals and experts. Learn more about our process and how we redefine modern residency with care, transparency, and excellence. Our residency panel is composed of highly accomplished architects, designers, and consultants who bring years of experience in creating spaces that merge modern aesthetics with functionality.",
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
    <section className="relative bg-[#D8CCBA] py-2 overflow-hidden pb-10">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="font-['OPTIGoudy_Agency'] font-bold text-4xl sm:text-5xl md:text-7xl  leading-[1.15] text-black mb-16">
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
                className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black transition-colors active:scale-95 text-lg sm:text-xl"
                aria-label="Scroll left"
              >
                ←
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
                className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black transition-colors active:scale-95 text-lg sm:text-xl"
                aria-label="Scroll right"
              >
                →
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
              className="relative rounded-[24px] overflow-hidden text-white"
            >
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="relative z-[1] p-8 sm:p-10 flex flex-col items-center text-center">
                <h3 className="font-semibold font-['Goudy_Old_Style'] text-2xl md:text-4xl mb-4">
                  {card.title}
                </h3>
                <div className="border-b-white border w-full my-2"></div>
                <p className="text-xl md:text-2xl leading-relaxed font-['Goudy_Bookletter_1911'] max-w-[360px]">
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
      ? "z-10 w-[75vw] sm:w-[22rem] md:w-[28rem] lg:w-[30rem]"
      : "w-[50vw] sm:w-56 md:w-[22rem] lg:w-[24rem] scale-85 sm:scale-90 opacity-60 sm:opacity-70 md:opacity-90";

  const marginClass = size === "large" ? "" : "-mx-8 sm:-mx-12 md:-mx-24";

  // Overlay class: center card should overlap and sit above side cards
  const overlayClass = size === "large"
    ? "z-20 -translate-y-8 shadow-[0_22px_48px_rgba(0,0,0,0.28)]"
    : "z-0 translate-y-6";

  // Use explicit heights: center card shows full content; side cards are fixed/shorter
  const heightClass = size === "large"
    ? "min-h-[480px] sm:min-h-[520px] md:min-h-[560px]"
    : "h-[280px] sm:h-[300px] md:h-[340px] overflow-hidden";

  const contentPadding =
    size === "large"
      ? "pt-5 pb-2 sm:pt-6 sm:pb-3 md:pt-8 md:pb-4"
      : "p-4 sm:p-6 md:p-8";

  return (
    <div className={`flex-shrink-0 ${sizeClass} ${marginClass} transition-all duration-300 ${overlayClass}`}>
      <div
        ref={size === "large" ? centerRef : undefined}
        className={`relative rounded-[24px] overflow-hidden text-white ${heightClass} flex flex-col items-center justify-start ${animateClass || ""}`}
      >
        <Image
          src={texture}
          alt="Terracotta background"
          fill
          priority
          className="object-cover object-center"
        />
          <div className={`relative z-[1] ${contentPadding} flex flex-col items-center text-center w-full min-w-0 h-full`}>
            <h3 className={`font-semibold ${size === "small" ? "text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 overflow-hidden" : "text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3"} break-words`}>
              {card.title}
            </h3>
            <div className="border-b-white border w-full my-1" />
              <div className="w-full max-w-[95%] sm:max-w-[90%] flex-1 min-h-0 flex flex-col">
                <p className={`${size === "small" ? "text-xs sm:text-sm line-clamp-3 sm:line-clamp-4 overflow-hidden" : "text-lg sm:text-[16px] md:text-[18px] lg:text-[19px] flex-1 min-h-0 overflow-auto"} leading-relaxed break-words`}>
              {card.description}
            </p>
              </div>
        </div>
      </div>
    </div>
  );
}

