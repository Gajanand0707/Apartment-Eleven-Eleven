"use client";
import wall from '../../public/wall.png';
import Image from 'next/image';
import { useState } from 'react';
import texture from '../../public/texture.png';
import pathbg from '../../public/pathbg.png';
import { BiArrowFromBottom, BiArrowToBottom, BiArrowToTop, BiUpArrow } from 'react-icons/bi';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

function ParchmentButton({
  children = "Convene with Us",
  className = "",
  onClick,
}: {
  children?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
   <button
  onClick={onClick}
  className={[
    // layout
    "relative inline-flex items-center justify-center",
    "px-6 py-3 rounded-2xl min-w-[240px]",
    // base surface (solid underlay so texture reads clearly)
    "bg-transparent ",              // ← light parchment base
    "border border-black/35",
    "shadow-[0_2px_6px_rgba(0,0,0,0.25)]",
    "transition-all duration-200",
    "active:translate-y-[1px]",
    "hover:shadow-[0_4px_14px_rgba(0,0,0,0.3)]",
    "focus:outline-none focus:ring-2 focus:ring-black/20",
    "overflow-hidden",
    className,
  ].join(" ")}
  aria-label={typeof children === "string" ? children : "Convene with Us"}
>
  {/* base soft white wash to lift the texture */}
  <span className="absolute inset-0 -z-20 bg-white" />

  {/* p<button
  onClick={onClick}
  className={[
    // layout
    "relative inline-flex items-center justify-center",
    "px-6 py-3 rounded-2xl min-w-[240px]",
    // base (clean/whitish surface)
    "bg-white",                        // ← whitish base
    "border border-black/35",
    "shadow-[0_2px_6px_rgba(0,0,0,0.25)]",
    "transition-all duration-200",
    "active:translate-y-[1px]",
    "hover:shadow-[0_4px_14px_rgba(0,0,0,0.3)]",
    "focus:outline-none focus:ring-2 focus:ring-black/20",
    "overflow-hidden",
    className,
  ].join(" ")}
  aria-label={typeof children === "string" ? children : "Convene with Us"}
>
  {/* texture layer (sits ABOVE white base) */}
  <span className="absolute inset-0 -z-10">
    <Image
      src={texture}
      alt="texture"
      fill
      // keep texture visible but subtle; multiplied over white
      className="object-cover object-center opacity-80  "
      priority
    />
  </span>

  {/* soft vignette + inner highlight for depth */}
  <span className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.10)_100%)]" />
  <span className="pointer-events-none absolute inset-0 -z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.12)] rounded-2xl" />

  {/* optional warm tint (VERY light) — comment out if you want pure white */}
  {/* <span className="absolute inset-0 -z-10 bg-[#F5EDE0]/35" /> */}

  {/* label */}
  <span className="text-[18px] sm:text-[20px] font-semibold text-black tracking-wide drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">
    {children}
  </span>
</button>


  );
}

export default function Elevators() {
  const faqs = [
    {
      q: "Can International Startups Apply?",
      a: "Lorem gayudvgau bc adhisabchik usadh aicui ahd uisanbcI gfbdsyuivbysudkvbahuk bdsuivabdhusivbyud bvuysdbnvnjskayudks abdysa bioa ycvds ai dsayuv as u an cjdsIhuiv danjkl",
    },
    {
      q: "Can International Startups Apply?",
      a: "This is a placeholder answer for the second item. Replace with your real copy.",
    },
    {
      q: "Can International Startups Apply?",
      a: "This is a placeholder answer for the third item. Replace with your real copy.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  function toggleFAQ(index: number) {
    setOpenIndex(prev => (prev === index ? null : index));
  }

  return (
    <div>
      <section className="relative flex w-full items-stretch bg-[#1C1C1C] overflow-hidden min-h-[380px] sm:min-h-[460px] md:min-h-[560px] lg:min-h-[720px]">
        {/* LEFT – image */}
        <div className="relative basis-1/2 shrink-0">
          <div className="absolute inset-0 bg-[#1C1C1C]" />
          <img
            src={wall.src}
            alt="colosseum"
            className="absolute inset-0 w-full h-full object-cover object-left-bottom"
          />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-14 md:w-24 bg-gradient-to-l from-[#1C1C1C] to-transparent" />
        </div>

        {/* RIGHT – text */}
        <div className="relative basis-1/2 flex flex-col justify-center items-end text-right text-[#F5F5F5] px-4 sm:px-6 md:px-10 lg:px-16 gap-2 sm:gap-3 md:gap-4">
          <h1 className="font-['Playfair_Display'] font-bold leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] text-[clamp(2.25rem,8vw,6rem)]">
            GREAT
          </h1>

          <h2 className="font-['Playfair_Display'] font-semibold leading-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] pr-1 text-[clamp(1.25rem,4.8vw,3.25rem)]">
            IDEAS DESERVE
          </h2>

          <h1 className="font-['Playfair_Display'] font-bold leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] mt-2 sm:mt-4 text-[clamp(2.25rem,8vw,6rem)]">
            GREAT
          </h1>

          <h2 className="font-['Playfair_Display'] font-semibold leading-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] pr-1 text-[clamp(1.25rem,4.8vw,3.25rem)]">
            PARTNERSHIPS
          </h2>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#D8CCBA] text-black py-16 px-6">
        {/* parchment background texture */}
        <Image
          src={pathbg}
          alt="Section background texture"
          fill
          priority
          className="object-cover object-center opacity-80"
        />

        {/* content wrapper */}
        <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col items-center text-center">
          <h2 className="font-['Playfair_Display'] font-bold text-black leading-tight text-[64px] md:text-[72px]">
            Three Paths to Our Engagement
          </h2>

          <p className="font-['Playfair_Display'] font-semibold text-black leading-snug text-2xl md:text-[32px] max-w-[1000px] mt-6">
            Choose the passage that best aligns with your vision, and let our shared journey commence.
          </p>

          {/* Cards row */}
          <div className="mt-16 flex flex-col md:flex-row gap-10 md:gap-8">
            {/* Card 1 */}
            <div className="relative w-full md:w-[380px] bg-[#D8CCBA] rounded-[28px] text-white px-10 pt-10 pb-10 flex flex-col items-center text-center overflow-hidden">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center mix-blend-multiply opacity-90"
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-white mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 stroke-white fill-none stroke-[3]" viewBox="0 0 24 24">
                    <path d="M9 18h6M10 21h4M9 14a5 5 0 1 1 6 0c-.6.5-1 1.5-1 2.5V18h-4v-1.5c0-1-.4-2-1-2.5Z" />
                  </svg>
                </div>
                <h3 className="font-['Playfair_Display'] font-semibold text-[28px] leading-snug">
                  Align with Our Cadre
                </h3>
                <p className="font-['Playfair_Display'] text-[20px] leading-relaxed mt-6">
                  Forge ties with our pioneering founders and captains of industry.
                  If you are acquainted with a team from our esteemed lineage,
                  they can vouch for your expedited inclusion amongst us.
                </p>

                {/* NEW button */}
                <div className="mt-10">
                  <ParchmentButton>Convene with Us</ParchmentButton>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative w-full md:w-[380px] bg-[#D8CCBA] rounded-[28px] text-white px-10 pt-10 pb-10 flex flex-col items-center text-center overflow-hidden">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center mix-blend-multiply opacity-90"
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-white mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 fill-white" viewBox="0 0 24 24">
                    <path d="M9 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM3 20c0-2.2 2.7-4 6-4s6 1.8 6 4v1H3v-1Zm12 0c0-1.4-.7-2.6-2-3.3.6-.1 1.3-.2 2-.2 3.3 0 6 1.8 6 4v1h-6v-1Z" />
                  </svg>
                </div>
                <h3 className="font-['Playfair_Display'] font-semibold text-[28px] leading-snug">
                  Unveil Your Vision
                </h3>
                <p className="font-['Playfair_Display'] text-[20px] leading-relaxed mt-6">
                  Possess a groundbreaking concept? You may consult with our guild of
                  visionary minds and patrons. Together, we shall sculpt your ideas
                  into enduring reality through collaborative mastery.
                </p>

                {/* NEW button */}
                <div className="mt-10">
                  <ParchmentButton>Convene with Us</ParchmentButton>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative w-full md:w-[380px] bg-[#D8CCBA] rounded-[28px] text-white px-10 pt-10 pb-10 flex flex-col items-center text-center overflow-hidden">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center mix-blend-multiply opacity-90"
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-white mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 stroke-white fill-none stroke-[3]" viewBox="0 0 24 24">
                    <path d="M14 10c-1.5 1.5-3 4-3 4s2.5-1.5 4-3c1.2-1.2 1.8-2.4 2-3.5.2-1 .2-2.1.2-2.1s-1.1 0-2.1.2C16.4 6.2 15.2 6.8 14 8c-1.5 1.5-3 4-3 4s2.5-1.5 4-3ZM8 14l-2 2c-.5.5-.8 1.1-.9 1.8L5 20l2.2-.1c.7-.1 1.3-.4 1.8-.9l2-2" />
                  </svg>
                </div>
                <h3 className="font-['Playfair_Display'] font-semibold text-[28px] leading-snug">
                  Offer Your Proposal
                </h3>
                <p className="font-['Playfair_Display'] text-[20px] leading-relaxed mt-6">
                  Deliver your application via our well-ordered method.
                  Each founder&apos;s submission is justly assessed, and
                  personalized insights are bestowed.
                </p>

                {/* NEW button */}
                <div className="mt-10">
                  <ParchmentButton>Convene with Us</ParchmentButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border border-black bg-[#D2CDBD] text-black py-16 px-6 flex justify-center">
        <div className="w-full max-w-[960px] flex flex-col items-center text-center">
          <h2 className="font-['Playfair_Display'] font-bold text-[64px] leading-[1.1] text-black">
            Common Inquiries
          </h2>

          <p className="font-['Playfair_Display'] font-semibold text-[28px] leading-snug text-black max-w-[900px] mt-6">
            All you need discern regarding alliance with us.
          </p>

          <div className="w-full mt-12 flex flex-col gap-6">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="w-full">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex justify-between items-start bg-[#EDE3CF] text-black font-['Playfair_Display'] text-left text-[28px] leading-snug rounded-[20px] px-6 py-5 border border-black/20"
                  >
                    <span className="pr-4">{item.q}</span>
                    <span className="text-[32px] leading-none select-none font-semibold text-black">
                      {isOpen ? <FaArrowUp/> : <FaArrowDown/>}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="bg-[#676767] text-white font-['Playfair_Display'] text-[24px] leading-relaxed px-6 py-8 rounded-b-[20px] border border-black/20 border-t-0 max-w-full">
                      <p className="text-white text-left whitespace-pre-line">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
