"use client";
import Image from "next/image";
import HallwayCard, { HallwayCardProps } from "./HallwayCard";
import hallwaysbg from "../images/hallwaysbg.png";

export default function HallwaysSection() {
  const hallwayConversations: HallwayCardProps[] = [
    {
      quote:
        "Met a nonprofit leader who showed us how our technology could provide clean water to millions.",
      name: "Alex Kumar",
      title: "Impact Officer",
      company: "CleanTech",
    },
    {
      quote:
        "Met a nonprofit leader who showed us how our technology could provide clean water to millions.",
      name: "Alex Kumar",
      title: "Impact Officer",
      company: "CleanTech",
    },
    {
      quote:
        "Met a nonprofit leader who showed us how our technology could provide clean water to millions.",
      name: "Alex Kumar",
      title: "Impact Officer",
      company: "CleanTech",
    },
    {
      quote:
        "Met a nonprofit leader who showed us how our technology could provide clean water to millions.",
      name: "Alex Kumar",
      title: "Impact Officer",
      company: "CleanTech",
    },
    {
      quote:
        "Met a nonprofit leader who showed us how our technology could provide clean water to millions.",
      name: "Alex Kumar",
      title: "Impact Officer",
      company: "CleanTech",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#D8CCBA] text-black flex flex-col items-center py-24 px-6 md:px-8">
      {/* BG image */}
      <Image
        src={hallwaysbg}
        alt="Hallway background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* dark radial at top to help heading pop */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_0.1%,rgba(0,0,0,0.55)_30%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,0.65)_100%)] md:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.55)_40%,rgba(0,0,0,0.6)_65%,rgba(0,0,0,0.65)_100%)] pointer-events-none" /> */}

      {/* HEADER */}
      <div className="relative z-[2] text-center max-w-5xl">
        <h1 className="text-[2.5rem] leading-[1.15] md:text-[3.5rem] md:leading-[1.15] font-['Playfair_Display'] font-bold text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]">
          Conversations in the Hallways
        </h1>

        <p className="mt-4 text-xl md:text-2xl font-['Playfair_Display'] font-semibold leading-snug text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] max-w-4xl mx-auto">
          Where serendipitous encounters spark innovation and change. The most
          important innovations often happen in the spaces between meetings.
        </p>
      </div>

      {/* SCROLLABLE CARD STRIP */}
      <div className="relative z-[2] mt-16 w-full max-w-[1400px]">
        <div
          className={`
            flex
            flex-nowrap
            items-start
            gap-6 md:gap-8
            px-4 md:px-8
            overflow-x-auto
            snap-x snap-mandatory
            scroll-smooth
            [-ms-overflow-style:none]         /* hide scrollbar IE/Edge */
            [scrollbar-width:none]            /* hide scrollbar Firefox */
          `}
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* hide scrollbar Chrome/Safari */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {hallwayConversations.map((card, idx) => (
            <div
              key={idx}
              className={`
                snap-center
                flex-shrink-0
                ${idx === 1 ? "md:-translate-y-[20px]" : ""}
                ${idx === 0 || idx === 2 ? "md:translate-y-[40px]" : ""}
              `}
            >
              <HallwayCard {...card} highlight={idx === 1} />
            </div>
          ))}
        </div>

        {/* PROGRESS BAR (fake scroller UI from figma) */}
        <div className="mt-12 flex flex-col items-center">
          {/* white track */}
          <div className="h-[2px] w-[260px] bg-white rounded-full" />
          {/* black thumb */}
          <div className="h-[2px] w-[90px] bg-black rounded-full -mt-[2px]" />
        </div>
      </div>
    </section>
  );
}
