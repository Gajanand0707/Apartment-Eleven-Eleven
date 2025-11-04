"use client";

import { useState, useEffect, useRef, type TouchEvent } from "react";
import Image from "next/image";

import midsec from "../public/midsec.png";
import ideas1 from "../public/ideas1.png";
import ideas2 from "../public/ideas2.png";
import ideas3 from "../public/ideas3.png";

export default function IdeasSection() {
  const cards = [
    {
      image: ideas1,
      title: "The Patrons of Progress",
      desc: "More than backers, we are enablers of the 'new India,' providing the strategic architecture for its creation.",
    },
    {
      image: ideas2,
      title: "Where Foresight Meets Fortitude",
      desc: "With foresight, we identify defining opportunities early; with fortitude and conviction, we build them alongside you.",
    },
    {
      image: ideas3,
      title: "The Sculptor's Gaze",
      desc: "We see the potential others miss, guiding you to remove noise and reveal your lasting value.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % cards.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + cards.length) % cards.length);

  // Auto-slide every 5s when not swiping
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSwiping) nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isSwiping]);

  // Swipe handling
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    if (distance > swipeThreshold) nextSlide();
    else if (distance < -swipeThreshold) prevSlide();
    setIsSwiping(false);
  };

  return (
    <section className="relative isolate z-50 overflow-hidden bg-[#D8CCBA] text-black min-h-[600px]">
      {/* ✅ Background texture */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={midsec}
          alt="Background texture"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="opacity-80 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* ✅ Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 lg:py-20 text-center">
        {/* Headings */}
        <h2 className="font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-[#0E4943]">
          Praxis For The New Renaissance
        </h2>

        <div className="mt-8 w-full flex justify-center">
          <div className="h-[2px] w-full max-w-[900px] bg-black" />
        </div>

        <h3 className="mt-10 font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-black">
          Ideas distilled to brilliance
        </h3>

        {/* ✅ Mobile Carousel with Card Style */}
        <div className="relative mt-16 block md:hidden">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-3 rounded-full z-20 hover:bg-black transition-colors active:scale-95"
            >
              ←
            </button>

            <div className="overflow-hidden w-full px-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="min-w-full flex-shrink-0 flex justify-center px-4"
                  >
                    <div className="bg-[#F5F2EE]/80 text-black shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-black/5 rounded-[24px] flex flex-col items-center text-center px-8 py-10 w-full max-w-[320px]">
                      <div className="w-[140px] h-[140px] relative">
                        <Image src={card.image} alt={card.title} fill style={{ objectFit: "contain" }} />
                      </div>
                      <h4 className="font-semibold text-2xl mt-6 text-black">{card.title}</h4>
                      <p className="mt-4 text-base leading-relaxed text-black">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-3 rounded-full z-20 hover:bg-black transition-colors active:scale-95"
            >
              →
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {cards.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === current ? "bg-black scale-125" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ✅ Desktop Grid */}
        <div className="hidden md:grid mt-16 grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-[380px] mx-auto"
            >
              <div className="w-[140px] h-[140px] relative">
                <Image src={card.image} alt={card.title} fill style={{ objectFit: "contain" }} />
              </div>
              <h4 className="font-semibold text-2xl mt-6 text-black">{card.title}</h4>
              <p className="mt-4 text-base leading-relaxed text-black max-w-[340px]">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
