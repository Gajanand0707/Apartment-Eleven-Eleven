"use client";
import wall from '../../public/wall.png';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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
        "focus:outline-none focus:ring-2 bg-white focus:ring-black/20",
        className,
      ].join(" ")}
    >
      {/* Background image */}
      {/* <Image
        src={buttonbg}
        alt="Button background"
        fill
        priority
        className="object-cover object-center absolute inset-0 -z-10"
      /> */}

      {/* Optional dark overlay for text visibility */}
      <span className="absolute inset-0 bg-black/5 -z-0" />

      {/* Button Text */}
      <span className="relative z-10 text-2xl md:text-4xl font-['OPTIGoudy_Agency'] text-nowrap font-extrabold text-black ">
        {children}
      </span>
    </button>
  );
}
export default function Elevators() {
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchFaqs = async () => {
      try {
        const res = await fetch(
          'https://proper-friendship-29e4bdb47f.strapiapp.com/api/faqs?populate=*'
        );
        if (!res.ok) throw new Error('Failed to fetch faqs');
        const json = await res.json();
        const items = (json.data ?? []).map((it: any) => ({
          q: it.faq_ques ?? '',
          a: Array.isArray(it.faq_ans)
            ? it.faq_ans.map((x: any) => x.faq_ans).join('\n')
            : it.faq_ans?.faq_ans ?? '',
        }));
        if (mounted) setFaqs(items);
      } catch (err) {
        // keep behavior simple — console error and leave faqs empty
        // optionally show UI feedback
        // eslint-disable-next-line no-console
        console.error('Error fetching faqs:', err);
      } finally {
        if (mounted) setLoadingFaqs(false);
      }
    };

    fetchFaqs();
    return () => {
      mounted = false;
    };
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  function toggleFAQ(index: number) {
    setOpenIndex(prev => (prev === index ? null : index));
  }

  return (
    <div>
      <section className="relative flex w-full justify-between items-stretch bg-[#1C1C1C] overflow-hidden h-[456px] sm:min-h-[460px] md:min-h-[1000px] ">
        {/* Mobile: full-bleed background image */}
        <div className="absolute inset-0 block md:hidden z-0">
          <img
            src={wall.src}
            alt="colosseum"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#1C1C1C] to-transparent" />
        </div>
        {/* LEFT – image */}
        <div className="relative basis-7/12 shrink-0 hidden md:block">
          <div className="absolute inset-0 bg-[#1C1C1C]" />
          <img
            src={wall.src}
            alt="colosseum"
            className="absolute inset-0 w-full h-full object-cover  "
          />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-14 md:w-32 bg-gradient-to-l from-[#1C1C1C] to-transparent" />
        </div>

        {/* RIGHT – text */}
        <div className="relative z-20 w-full md:basis-3/12 h-full flex flex-col justify-center items-center text-center md:items-end md:mr-10  text-[#F5F5F5] px-1 sm:px-2 md:px-3 lg:px-4 gap-0 sm:gap-0.5 md:gap-3 ">
          <h1 className="font-[OPTIGoudy_Agency] font-bold leading-tight md:leading-none text-white mx-auto text-4xl sm:text-6xl md:text-[124px]">
            Great
          </h1>

          <h2 className="font-[OPTIGoudy_Agency] font-semibold leading-tight md:leading-none text-white mx-auto  pr-1 text-2xl sm:text-3xl text-nowrap md:text-7xl">
            Ideas Deserve
          </h2>

          <h1 className="font-[OPTIGoudy_Agency] font-bold leading-tight md:leading-none text-white mx-auto  mt-0 text-4xl sm:text-6xl md:text-[124px]">
            Great
          </h1>

          <h2 className="font-[OPTIGoudy_Agency] font-semibold leading-tight md:leading-none mx-auto text-white  pr-1 text-2xl sm:text-3xl md:text-7xl">
            Partnerships
          </h2>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#D8CCBA] text-black py-10 px-6">
        {/* parchment background texture */}
        <Image
          src={pathbg}
          alt="Section background texture"
          fill
          priority
          className="object-cover object-center opacity-80"
        />

        {/* content wrapper */}
        <div className="relative z-10  mx-auto flex flex-col items-center text-center">
          <h2 className="font-[OPTIGoudy_Agency] font-bold text-black leading-tight text-4xl md:text-7xl">
            Three Paths to Our Engagement
          </h2>

          <p className="font-['OPTIGoudy_Agency'] font-extrabold text-black  text-2xl md:text-4xl max-w-[850px] my-2">
            Choose the Passage that aligns with your vision, and let our shared Journey Commence.
          </p>

          {/* Cards row */}
          <div className="mt-8 flex flex-col md:flex-row gap-10 md:gap-6">
            {/* Card 1 */}
            <div className="relative w-full md:w-[420px] bg-[#D8CCBA] rounded-[28px] text-white px-10 pt-10 pb-10 flex flex-col items-center text-center overflow-hidden h-full">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center "
              />

              <div className="relative z-10 flex flex-col items-center justify-between h-full">
                {/* Image Container */}
                <div className="text-white mb-6 w-[200px] h-[200px] flex justify-center items-center overflow-hidden rounded-[20px]">
                  <img
                    src={path1.src}
                    alt="path1"
                    className="w-[130%] h-[130%] object-cover object-center"
                  />
                </div>

                <h3 className="font-[Goudy_Old_Style] font-semibold text-2xl md:text-4xl leading-snug tracking-wide">
                  Align with Our Cadre
                </h3>

                <p className="font-['Goudy_Bookletter_1911'] text-[20px] md:text-2xl mt-2 flex-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, risus nec commodo dictum, nulla turpis cursus turpis, non tincidunt est nisl a eros.
                </p>

                {/* NEW button */}
                <div className="mt-5">
                  <Link href="/contactUs" className="inline-block">
                    <ParchmentButton>Convene with Us</ParchmentButton>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative w-full md:w-[420px] bg-[#D8CCBA] rounded-[28px] text-white px-10 pt-10 pb-10 flex flex-col items-center text-center overflow-hidden h-full">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className=" w-[130%] h-[130%] object-cover object-center "
              />

              <div className="relative z-10 flex flex-col items-center justify-between h-full">
                {/* Image Container */}
                <div className="text-white mb-6 w-[200px] h-[200px] flex justify-center items-center overflow-hidden rounded-[20px]">
                  <img
                    src={path2.src}
                    alt="path1"
                    className="w-[110%] h-[110%] object-cover object-center"
                  />
                </div>

                <h3 className="font-[Goudy_Old_Style] font-semibold text-2xl md:text-4xl leading-snug tracking-wide ">
                  Unveil Your Vision
                </h3>

                <p className="font-['Goudy_Bookletter_1911'] text-[20px] md:text-2xl  mt-2 flex-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, risus nec commodo dictum, nulla turpis cursus turpis, non tincidunt est nisl a eros.
                </p>

                {/* NEW button */}
                <div className="mt-5">
                  <Link href="/contactUs" className="inline-block">
                    <ParchmentButton>Convene with Us</ParchmentButton>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative w-full md:w-[420px] bg-[#D8CCBA] rounded-[28px] text-white px-10 pt-10 pb-10 flex flex-col items-center text-center overflow-hidden h-full">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center "
              />

              <div className="relative z-10 flex flex-col items-center justify-between h-full">
                {/* Image Container */}
                <div className="text-white mb-6 w-[200px] h-[200px] flex justify-center items-center overflow-hidden rounded-[20px]">
                  <img
                    src={path3.src}
                    alt="path1"
                    className=" w-[110%] h-[110%]  object-cover object-center"
                  />
                </div>

                <h3 className="font-[Goudy_Old_Style] font-semibold text-2xl md:text-4xl  leading-snug tracking-wide">
                  Offer Your Proposal
                </h3>

                <p className="font-['Goudy_Bookletter_1911'] text-[20px] md:text-2xl  mt-2 flex-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, risus nec commodo dictum, nulla turpis cursus turpis, non tincidunt est nisl a eros.
                </p>

                {/* NEW button */}
                <div className="mt-5">
                  <Link href="/contactUs" className="inline-block">
                    <ParchmentButton>Convene with Us</ParchmentButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border border-black bg-[#D2CDBD] text-black py-16 px-6 flex justify-center">
        <div className="w-full max-w-[960px] flex flex-col items-center text-center">
          <h2 className="font-[OPTIGoudy_Agency] font-bold text-4xl md:text-7xl leading-[1.1] text-black">
            Common Inquiries
          </h2>

          <p className="font-[Goudy_Old_Style] font-semibold text-2xl md:text-4xl leading-snug text-black max-w-[900px] mt-6">
            All you need discern regarding alliance with us.
          </p>

          <div className="w-full mt-12 flex flex-col gap-6 items-center">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="w-full md:min-w-[1080px]">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex justify-between items-start bg-[#F1E0C9] text-black font-[Goudy_Old_Style] font-extrabold text-left text-2xl md:text-4xl leading-snug rounded-[20px] px-6 py-2 border border-black/20"
                  >
                    <span className="pr-4 ">{item.q}</span>
                    <span className="text-[32px] leading-none select-none font-semibold text-black">
                      {isOpen ? <img src={toggle1.src} alt='toggle1' className="w-[40px] h-[45px] md:h-[60px] rotate-180" /> : <img src={toggle1.src} alt='toggle1' className="w-[40px] h-[45px] md:h-[60px] " />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="bg-[#F2F2F2] text-black text-[20px] sm:text-[24px] px-6 py-4 rounded-b-[20px] border border-black/20 border-t-0 w-[90%] mx-auto" style={{ fontFamily: "'Goudy Bookletter 1911', serif" }}>
                      <p className="text-black text-left whitespace-pre-line">{item.a}</p>
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