"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HallwayCardProps } from "./HallwayCard";
import hallwaysbg from "../public/hallwaysbg.png";

export default function HallwaysSection() {
  // initial fallback conversations (will be replaced by API data if fetch succeeds)
  const initialConversations: HallwayCardProps[] = [
    {
      quote:
        "Met a nonprofit leader who showed us how our technology could provide clean water to millions.",
      name: "Alex Kumar",
      title: "Impact Officer",
      company: "CleanTech",
    },
    {
      quote:
        "Casual hallway conversations led to partnerships that shaped our mission.",
      name: "Priya Sharma",
      title: "Program Manager",
      company: "FutureBridge",
    },
    {
      quote:
        "It’s in the hallways where innovation often starts — between ideas and execution.",
      name: "Rahul Mehta",
      title: "Product Strategist",
      company: "Visionary Labs",
    },
  ];

  const [hallwayConversations, setHallwayConversations] = useState<HallwayCardProps[]>(
    initialConversations
  );
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateDirection, setAnimateDirection] = useState<
    "left" | "right" | null
  >(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < Math.max(0, hallwayConversations.length - 3));
  }, [currentIndex, hallwayConversations.length]);

  // fetch hallways cards from Strapi and map to HallwayCardProps
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await fetch(
          "https://proper-friendship-29e4bdb47f.strapiapp.com/api/hallways-cards?populate=*"
        );
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const json = await res.json();
        const items: any[] = json?.data ?? [];
        const mapped: HallwayCardProps[] = items.map((it) => {
          const quote = it.quote ?? "";
          const name = it.name ?? "";
          const designation = it.designation ?? "";
          // parse designation like "(Program Manager) FutureBridge"
          let title = "";
          let company = "";
          const m = String(designation).match(/^\s*\(([^)]+)\)\s*(.*)$/);
          if (m) {
            title = m[1].trim();
            company = (m[2] ?? "").trim();
          } else {
            // fallback: try split by ') ' or use full designation as company
            const parts = String(designation).split(")");
            if (parts.length > 1) {
              title = parts[0].replace("(", "").trim();
              company = parts.slice(1).join(")").trim();
            } else {
              company = designation;
            }
          }

          return {
            quote,
            name,
            title,
            company,
          } as HallwayCardProps;
        });
        if (mounted && mapped.length > 0) {
          setHallwayConversations(mapped);
          setCurrentIndex(0);
        }
      } catch (err: any) {
        console.error("Failed fetching hallways cards:", err);
        if (mounted) setFetchError(err?.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) {
      setAnimateDirection("left");
      setCurrentIndex((i) => i - 1);
    } else if (direction === "right" && currentIndex < hallwayConversations.length - 3) {
      setAnimateDirection("right");
      setCurrentIndex((i) => i + 1);
    }
    setTimeout(() => setAnimateDirection(null), 500);
  };

  const visibleCards = hallwayConversations.slice(
    currentIndex,
    currentIndex + 3
  );
  // if less than 3, pad with last element so carousel layout remains stable
  while (visibleCards.length < 3 && visibleCards.length > 0) {
    visibleCards.push(visibleCards[visibleCards.length - 1]);
  }

  return (
    <>
      {/* Direction-aware entry animations */}
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

    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-black py-24 px-6 md:px-8">
  {/* ✅ Background image */}
  <div className="absolute inset-0 -z-10">
    <Image
      src={hallwaysbg}
      alt="Hallway background"
      fill
      priority
      quality={100}
      sizes="100vw"
      className="object-cover object-center blur-0"
    />
    {/* ✅ Soft dark overlay for contrast */}
    <div className="absolute inset-0  " />
  </div>


        {/* ✅ Heading */}
        <div className="relative z-10 text-center max-w-5xl mb-16">
          <h1 className="text-4xl md:text-7xl font-['OPTIGoudy_Agency'] font-bold text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]">
            Conversations in the Hallways
          </h1>
          <p className="mt-4 text-2xl md:text-4xl font-['Goudy_Old_Style'] font-semibold leading-snug text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] max-w-4xl mx-auto">
            Where serendipitous encounters spark innovation and change. The most
            important innovations often happen in the spaces between meetings.
          </p>
        </div>

        {/* ✅ Carousel */}
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
            <div className="flex items-center justify-center relative py-8 md:h-[600px]">
              {/* Left card */}
              <CarouselCard
                item={visibleCards[0]}
                size="small"
                animateClass={
                  animateDirection === "right"
                    ? "enter-right"
                    : animateDirection === "left"
                    ? "enter-left"
                    : ""
                }
              />
              {/* Center card */}
              <CarouselCard
                item={visibleCards[1]}
                size="large"
                animateClass={
                  animateDirection === "right"
                    ? "enter-right"
                    : animateDirection === "left"
                    ? "enter-left"
                    : ""
                }
              />
              {/* Right card */}
              <CarouselCard
                item={visibleCards[2]}
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

        {/* Loading / error indicator */}
        {loading && (
          <div className="mt-6 text-sm text-gray-700">Loading conversations…</div>
        )}
        {fetchError && (
          <div className="mt-6 text-sm text-red-600">{fetchError}</div>
        )}

        {/* ✅ Progress bar */}
        <div className="mt-12 flex flex-col items-center z-10">
          <div className="h-0.5 w-[260px] bg-white rounded-full" />
          <div className="h-0.5 w-[90px] bg-black rounded-full -mt-0.5" />
        </div>
      </section>
    </>
  );
}

/* ✅ Internal Carousel Card */
function CarouselCard({
  item,
  size,
  animateClass,
}: {
  item: HallwayCardProps;
  size: "small" | "large";
  animateClass?: string;
}) {
  const sizeClass =
  size === "large"
    ? "z-10 w-[65vw] sm:w-[22rem] md:w-[28rem] lg:w-[30rem]"
    : "w-[45vw] sm:w-64 md:w-[22rem] lg:w-[24rem] scale-90 opacity-90";

  const marginClass = size === "large" ? "" : "-mx-10 sm:-mx-8 md:-mx-16";

  return (
    <div
      className={`shrink-0 ${sizeClass} ${marginClass} transition-all duration-300`}
    >
    <div
  key={item.name}
  className={`h-[380px] md:h-[460px] lg:h-[520px] w-full rounded-4xl 
  bg-white/20 border border-white/30 shadow-2xl backdrop-blur-md

  flex flex-col justify-center items-center text-center p-10 ${animateClass}`}
>
  <p className={`font-['Goudy_Bookletter_1911'] text-[20px] md:text-2xl italic leading-snug max-w-[85%] mx-auto text-black ${size === 'small' ? 'max-h-20 overflow-auto md:max-h-none' : ''}`}>
    "{item.quote}"
  </p>
  <h3 className="mt-8 text-2xl md:text-4xl font-semibold font-['OPTIGoudy_Agency'] text-black">
    {item.name}
  </h3>
  <p className="text-2xl md:text-4xl font-['Goudy_Old_Style'] mt-2 text-gray-900">
    ({item.title}) <br /> {item.company}
  </p>
</div>

    </div>
  );
}
