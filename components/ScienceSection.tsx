"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < cards.length - 1);
  }, [currentIndex, cards.length]);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) {
      setAnimateDirection("left");
      setCurrentIndex((i) => i - 1);
    } else if (direction === "right" && currentIndex < cards.length - 1) {
      setAnimateDirection("right");
      setCurrentIndex((i) => i + 1);
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
    <section className="relative bg-[#D8CCBA] py-20 overflow-hidden">
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
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white p-3 sm:p-4 rounded-full hover:bg-black transition-colors active:scale-95"
                aria-label="Scroll left"
              >
                ←
              </button>
            )}

            <div className="w-full max-w-7xl px-4 md:px-12">
              <div className="flex items-center justify-center relative py-8">
                {/* Left card - small */}
                <CarouselCard
                  card={visibleCards[0]}
                  size="small"
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

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white p-3 sm:p-4 rounded-full hover:bg-black transition-colors active:scale-95"
                aria-label="Scroll right"
              >
                →
              </button>
            )}
          </div>

          {/* Progress indicator */}
          <div className="mt-12 flex flex-col items-center z-10">
            <div className="h-[2px] w-[260px] bg-gray-300 rounded-full" />
            <div
              className="h-[2px] bg-black rounded-full -mt-[2px] transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / cards.length) * 260}px`,
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
}: {
  card: ScienceCard;
  size: "small" | "large";
  animateClass?: string;
}) {
  const sizeClass =
    size === "large"
      ? "z-10 w-[65vw] sm:w-[22rem] md:w-[28rem] lg:w-[30rem]"
      : "w-[45vw] sm:w-64 md:w-[22rem] lg:w-[24rem] scale-90 opacity-90";

  const marginClass = size === "large" ? "" : "-mx-10 sm:-mx-8 md:-mx-16";
  const heightClass = size === "large" 
    ? "h-[400px] sm:h-[450px] md:h-[500px]"
    : "h-[320px] sm:h-[360px] md:h-[400px]";

  return (
    <div
      className={`flex-shrink-0 ${sizeClass} ${marginClass} transition-all duration-300`}
    >
      <div
        className={`relative rounded-[24px] overflow-hidden text-white ${heightClass} flex flex-col items-center justify-center ${animateClass || ""}`}
      >
        <Image
          src={texture}
          alt="Terracotta background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-[1] p-6 sm:p-8 md:p-10 flex flex-col items-center text-center w-full min-w-0">
          <h3 className={`font-semibold text-lg sm:text-xl md:text-2xl ${size === "small" ? "mb-2 line-clamp-2" : "mb-4"} wrap-break-word`}>
            {card.title}
          </h3>
          <p className={`text-sm sm:text-[15px] md:text-[16px] leading-relaxed max-w-[90%] wrap-break-word ${size === "small" ? "line-clamp-4" : ""}`}>
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}

