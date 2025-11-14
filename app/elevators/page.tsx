"use client";
import wall from '../../public/wall.png';
import Image from 'next/image';
import { useState } from 'react';
import texture from '../../public/texture.png';
import pathbg from '../../public/pathbg.png';
import toggle1 from "../../public/toggle1.png"
import path1 from "../../public/path1.png"
import path2 from "../../public/path2.png"
import path3 from "../../public/path3.png"
import buttonbg from "../../public/buttonbg.png"
import { BiArrowFromBottom, BiArrowToBottom, BiArrowToTop, BiUpArrow } from 'react-icons/bi';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';



export function ParchmentButton({
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
        "relative inline-flex items-center justify-center",
        "px-8 py-3 min-w-[220px] rounded-md overflow-hidden",
        "transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-black/20",
        className,
      ].join(" ")}
    >
      {/* Background image */}
      <Image
        src={buttonbg}
        alt="Button background"
        fill
        priority
        className="object-cover object-center absolute inset-0 -z-10"
      />

      {/* Optional dark overlay for text visibility */}
      <span className="absolute inset-0 bg-black/5 -z-0" />

      {/* Button Text */}
      <span className="relative z-10 text-3xl font-['Playfair_Display'] font-bold text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
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
          <h1 className="font-[Sorts_Mill_Goudy_TT] font-bold leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] text-[clamp(2.25rem,8vw,6rem)]">
            GREAT
          </h1>

          <h2 className="font-[Sorts_Mill_Goudy_TT] font-semibold leading-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] pr-1 text-[clamp(1.25rem,4.8vw,3.25rem)]">
            IDEAS DESERVE
          </h2>

          <h1 className="font-[Sorts_Mill_Goudy_TT] font-bold leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] mt-2 sm:mt-4 text-[clamp(2.25rem,8vw,6rem)]">
            GREAT
          </h1>

          <h2 className="font-[Sorts_Mill_Goudy_TT] font-semibold leading-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] pr-1 text-[clamp(1.25rem,4.8vw,3.25rem)]">
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
          <h2 className="font-[Sorts_Mill_Goudy_TT] font-bold text-black leading-tight text-[64px] md:text-[72px]">
            Three Paths to Our Engagement
          </h2>

          <p className="font-[Sorts_Mill_Goudy_TT] font-semibold text-black leading-snug text-2xl md:text-[32px] max-w-[1000px] mt-6">
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
                {/* Image Container */}
                <div className="text-white mb-6 w-[200px] h-[200px] flex justify-center items-center overflow-hidden rounded-[20px]">
                  <img
                    src={path1.src}
                    alt="path1"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <h3 className="font-[Sorts_Mill_Goudy_TT] font-semibold text-[28px] leading-snug">
            Align with Our Cadre
                </h3>

                <p className="font-[Goudy_Bookletter_1911] text-[20px] leading-relaxed mt-2">
                  Forge ties with our pioneering founders and captains of industry. If you are acquainted with a team from our esteemed lineage, they can vouch for your expedited inclusion amongst us.
                </p>

                {/* NEW button */}
                <div className="mt-5">
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
                {/* Image Container */}
                <div className="text-white mb-6 w-[200px] h-[200px] flex justify-center items-center overflow-hidden rounded-[20px]">
                  <img
                    src={path2.src}
                    alt="path1"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <h3 className="font-[Sorts_Mill_Goudy_TT] font-semibold text-[28px] leading-snug">
                  Unveil Your Vision
                </h3>

                <p className="font-[Sorts_Mill_Goudy_TT] text-[20px] leading-relaxed mt-2">
                  Possess a groundbreaking concept? You may consult with our guild of
                  visionary minds and patrons. Together, we shall sculpt your ideas
                  into enduring reality through collaborative mastery.
                </p>

                {/* NEW button */}
                <div className="mt-5">
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
                {/* Image Container */}
                <div className="text-white mb-6 w-[200px] h-[200px] flex justify-center items-center overflow-hidden rounded-[20px]">
                  <img
                    src={path3.src}
                    alt="path1"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <h3 className="font-[Sorts_Mill_Goudy_TT] font-semibold text-[28px] leading-snug">
                Offer Your Proposal
                </h3>

                <p className="font-[Sorts_Mill_Goudy_TT] text-[20px] leading-relaxed mt-2">
                  Possess a groundbreaking concept? You may consult with our guild of
                  visionary minds and patrons. Together, we shall sculpt your ideas
                  into enduring reality through collaborative mastery.
                </p>

                {/* NEW button */}
                <div className="mt-5">
                  <ParchmentButton>Convene with Us</ParchmentButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border border-black bg-[#D2CDBD] text-black py-16 px-6 flex justify-center">
        <div className="w-full max-w-[960px] flex flex-col items-center text-center">
          <h2 className="font-[Sorts_Mill_Goudy_TT] font-bold text-[64px] leading-[1.1] text-black">
            Common Inquiries
          </h2>

          <p className="font-[Sorts_Mill_Goudy_TT] font-semibold text-[28px] leading-snug text-black max-w-[900px] mt-6">
            All you need discern regarding alliance with us.
          </p>

          <div className="w-full mt-12 flex flex-col gap-6">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="w-full">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex justify-between items-start bg-[#EDE3CF] text-black font-[Sorts_Mill_Goudy_TT] text-left text-[28px] leading-snug rounded-[20px] px-6 py-5 border border-black/20"
                  >
                    <span className="pr-4">{item.q}</span>
                    <span className="text-[32px] leading-none select-none font-semibold text-black">
                      {isOpen ? <img src={toggle1.src} alt='toggle1' className="w-[40px] h-[60px] rotate-180" /> : <img src={toggle1.src} alt='toggle1' className="w-[40px] h-[60px] " />}
                    </span>
                  </button>

                 {isOpen && (
  <div className="bg-[#676767] text-white text-[24px] leading-relaxed px-6 py-8 rounded-b-[20px] border border-black/20 border-t-0 w-[90%] mx-auto" style={{ fontFamily: "'Goudy Bookletter 1911', serif" }}>
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