"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import frame from "../public/frame.png";

export default function TestimonialsSection() {
  const frames = [frame, frame, frame]; // You can replace these with different images later
  const [currentIndex, setCurrentIndex] = useState(1);
  const [animateDirection, setAnimateDirection] = useState<"left" | "right" | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < frames.length - 1);
  }, [currentIndex, frames.length]);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) {
      setAnimateDirection("left");
      setCurrentIndex((i) => i - 1);
    } else if (direction === "right" && currentIndex < frames.length - 1) {
      setAnimateDirection("right");
      setCurrentIndex((i) => i + 1);
    }
    setTimeout(() => setAnimateDirection(null), 500);
  };

  const getVisibleFrames = () => {
    const prev = currentIndex > 0 ? frames[currentIndex - 1] : frames[frames.length - 1];
    const current = frames[currentIndex];
    const next = currentIndex < frames.length - 1 ? frames[currentIndex + 1] : frames[0];
    return [prev, current, next];
  };

  const visibleFrames = getVisibleFrames();

  return (
    <section className="relative flex flex-col justify-center items-center overflow-hidden bg-[#D8CCBA] text-black min-h-[680px] text-center px-6 py-16">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-goudy-agency font-bold mb-12">
        Residents Testimonies
      </h1>

      {/* ✅ Mobile Carousel (same as Science Section style) */}
      <div className="relative block md:hidden w-full max-w-[480px] mx-auto">
        {/* Animations */}
        <style jsx global>{`
          @keyframes frameEnterFromRight {
            0% {
              opacity: 0;
              transform: translateX(32px) scale(0.98);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          @keyframes frameEnterFromLeft {
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
            animation: frameEnterFromRight 480ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .enter-left {
            animation: frameEnterFromLeft 480ms cubic-bezier(0.22, 1, 0.36, 1);
          }
        `}</style>

        <div className="relative flex items-center justify-center">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white p-3 rounded-full"
            >
              ←
            </button>
          )}

          <div className="flex items-center justify-center relative py-8">
            {/* Left Frame */}
            <CarouselFrame
              image={visibleFrames[0]}
              size="small"
              animateClass={animateDirection === "right" ? "enter-right" : animateDirection === "left" ? "enter-left" : ""}
            />
            {/* Center Frame */}
            <CarouselFrame
              image={visibleFrames[1]}
              size="large"
              animateClass={animateDirection === "right" ? "enter-right" : animateDirection === "left" ? "enter-left" : ""}
            />
            {/* Right Frame */}
            <CarouselFrame
              image={visibleFrames[2]}
              size="small"
              animateClass={animateDirection === "right" ? "enter-right" : animateDirection === "left" ? "enter-left" : ""}
            />
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white p-3 rounded-full"
            >
              →
            </button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex flex-col items-center z-10">
          <div className="h-[2px] w-[220px] bg-gray-300 rounded-full" />
          <div
            className="h-[2px] bg-black rounded-full -mt-[2px] transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / frames.length) * 220}px`,
            }}
          />
        </div>
      </div>

      {/* ✅ Desktop Static Layout */}
      <div className="hidden md:flex justify-center items-center gap-8 md:gap-12 flex-wrap max-w-[960px] mx-auto">
        {frames.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`testimonial ${i + 1}`}
            className="w-[260px] h-auto object-contain"
          />
        ))}
      </div>
    </section>
  );
}

/* ✅ Internal Carousel Frame (similar to ScienceSection Card) */
function CarouselFrame({
  image,
  size,
  animateClass,
}: {
  image: any;
  size: "small" | "large";
  animateClass?: string;
}) {
  const sizeClass =
    size === "large"
      ? "z-10 w-[65vw] sm:w-[22rem]"
      : "w-[45vw] sm:w-64 scale-90 opacity-90";

  const marginClass = size === "large" ? "" : "-mx-10 sm:-mx-8";
  const heightClass = size === "large" ? "h-[340px]" : "h-[260px]";

  return (
    <div
      className={`flex-shrink-0 ${sizeClass} ${marginClass} transition-all duration-300`}
    >
      <div
        className={`relative rounded-[24px] overflow-hidden ${heightClass} flex items-center justify-center bg-white shadow-lg ${animateClass || ""}`}
      >
        <Image
          src={image}
          alt="testimonial"
          fill
          className="object-contain p-4"
          priority
        />
      </div>
    </div>
  );
}
