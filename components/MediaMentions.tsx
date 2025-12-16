// app/components/MediaMentions.tsx
"use client"

import { useEffect, useState } from "react"

type Mention = {
  id: number
  outlet?: string
  intro?: string
  headline: string
  quote?: string
  logo?: string
  imageUrl?: string
}

// const SAMPLE: Mention[] = [
//   { id: 1, outlet: "Inc.", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
//   { id: 2, outlet: "FT | FINANCIAL TIMES", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
//   { id: 3, outlet: "The New York Times", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
//   { id: 4, outlet: "BUSINESS INSIDER", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
//   { id: 5, outlet: "WSJ", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
// ]


export default function MediaMentions({
  title = "Our Media Mentions",
}: {
  title?: string
}) {
  const [mention, setMentions] = useState<Mention[]>([])
  const [active, setActive] = useState(0)
  const n = mention.length
  const next = () => n > 0 && setActive((i) => (i + 1) % n)
  const prev = () => n > 0 && setActive((i) => (i - 1 + n) % n)

  const slotOf = (i: number) => {
    const rel = (i - active + n) % n
    if (rel === 0) return "center"
    if (rel === 1) return "right1"
    if (rel === 2) return "right2"
    if (rel === n - 1) return "left1"
    if (rel === n - 2) return "left2"
    return "hidden"
  }

  // Balanced offsets so the stack stays centered
  const slotClass = (slot: string) => {
    switch (slot) {
      case "center":
        return "z-30 -translate-x-[140px] md:-translate-x-[185px] lg:-translate-x-[200px] rotate-0 scale-100 opacity-100"
      case "left1":
        return "z-20 -translate-x-[240px] lg:-translate-x-[340px] md:-translate-x-[380px] lg:-translate-x-[420px] scale-[0.85] sm:scale-[0.9] md:scale-[0.8]  opacity-90"
      case "right1":
        return "z-20 -translate-x-[40px] lg:-translate-x-[60px] md:-translate-x-[20px] lg:translate-x-[20px] scale-[0.85] sm:scale-[0.9] md:scale-[0.8]  opacity-90"
      case "left2":
        return "hidden sm:block z-10 -translate-x-[340px] mx-10 lg:-translate-x-[560px] lg:-translate-x-[640px] scale-[0.7] sm:scale-[0.8] md:scale-[0.6]  opacity-75"
      case "right2":
        return "hidden sm:block z-10  -mx-10 lg:translate-x-[240px] scale-[0.7] sm:scale-[0.8] md:scale-[0.6]  opacity-75"
      default:
        return "opacity-0 pointer-events-none scale-75"
    }
  }

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch("https://proper-friendship-29e4bdb47f.strapiapp.com/api/media-mentions?populate=*")
        if (!res.ok) throw new Error("Failed to fetch media mentions")
        const data = await res.json();

        const mappedMentions: Mention[] = (data?.data || []).map((entry: any) => ({
          id: entry.id || 0,
          outlet: entry.outlet || '',
          headline: entry.heading || '',
          intro: entry.intro || '',
          quote: entry.quote || '',
          logo: entry.logo?.url || '',
          imageUrl: entry.image?.url || '',
        }));

        setMentions(mappedMentions);
      } catch (error) {
        console.error("Error fetching media mentions:", error);
      }
    };

    fetchMedia();
  }, [])
  
  return (
    <section className="relative bg-[#D5C7B3] py-4 sm:py-6 overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-6 sm:mb-8 px-4">
        <h2 className="font-['OPTIGoudy_Agency'] text-4xl md:text-5xl lg:text-7xl  leading-tight font-bold text-black ">
          {title}
        </h2>
      </div>

      {/* Stage - centered container */}

      <div className="max-w-7xl mx-auto relative">
        <div className="relative h-[400px] sm:h-[460px] md:h-[520px] lg:h-[560px] flex items-center justify-center">
          {/* Cards */}
          <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px]">
            {mention.map((m, i) => {
              const slot = slotOf(i)
              return (
                <article
                  key={m.id}
                  className={[
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    // Responsive card sizes
                    "w-[clamp(260px,70vw,340px)] sm:w-[clamp(280px,60vw,380px)] md:w-[clamp(300px,50vw,420px)] lg:w-[clamp(320px,40vw,460px)]",
                    "h-[clamp(300px,65vh,380px)] sm:h-[clamp(340px,70vh,420px)] md:h-[clamp(380px,75vh,460px)] lg:h-[clamp(420px,80vh,500px)]",
                    "transition-all duration-500 ease-out",
                    slotClass(slot),
                  ].join(" ")}
                >
                  <NewspaperCard mention={m} emphasized={slot === "center"} />
                </article>
              )
            })}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute z-20 left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-focus text-white hover:bg-black active:bg-black/90 flex items-center justify-center shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute z-20 right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-focus text-white hover:bg-black active:bg-black/90 flex items-center justify-center shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

/** Single “vintage newspaper” card */
function NewspaperCard({
  mention,
  emphasized,
}: {
  mention: Mention
  emphasized?: boolean
}) {
  return (
    <div
      className={[
        "relative h-full border border-[#5b3f21] shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden",
      ].join(" ")}
      style={{
        backgroundImage: `url('/media2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background texture overlays */}
      <div className="absolute inset-0 pointer-events-none rounded-md mix-blend-multiply [background:radial-gradient(transparent_40%,rgba(0,0,0,.15)),linear-gradient(to_bottom,rgba(0,0,0,.08),transparent_40%,rgba(0,0,0,.12))]" />
      {/* inner decorative border removed to simplify card appearance */}

      {/* Content */}
      <div className="relative z-10 h-full px-3 sm:px-4 md:px-5 pt-4 sm:pt-6 pb-10 sm:pb-12 flex flex-col text-white">

        {/* Top: Logo (replaces outlet text) */}
        <div className="border border-b-2 border-black"></div>
        <div className="border border-b-1 mt-1 mb-1 border-black"></div>
        <div className="flex items-center justify-center mb-1">
          {mention.logo ? (
            // use plain img for external URL — larger on all breakpoints
            <img src={mention.logo} alt={`${mention.outlet || 'Outlet'} logo`} className="h-20 sm:h-28 md:h-36 object-contain" />
          ) : (
            <p className="font-['OPTIGoudy_Agency'] text-2xl sm:text-3xl md:text-4xl font-semibold">{mention.outlet}</p>
          )}
        </div>
        <div className="border border-b-2 border-black"></div>
        <div className="border border-b-1 mt-1 mb-1 border-black"></div>

        {/* <div className="w-full h-0.5 bg-[#4a331d]/80 mb-1" /> */}

        {/* Heading where previous static subheading was */}
        <div className={`text-center font-['OPTIGoudy_Agency'] tracking-wide mb-1 font-bold text-black ${emphasized ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg md:text-xl'}`}>
          {mention.headline}
        </div>
        <div className="border border-b-1 -mt-1 border-black"></div>

        {/* Quote (left) and Image (right) */}
        <div className="flex gap-3 mt-2 mb-4 flex-1 items-start">
          <div className="flex-1">
            <blockquote className={`italic text-sm sm:text-base md:text-lg leading-snug text-black font-['Goudy_Bookletter_1911']  font-bold  ${emphasized ? 'text-lg sm:text-xl' : ''}`}>
              {mention.quote || '"No quote available."'}
            </blockquote>
          </div>
          <div className="w-28 sm:w-36 md:w-44 h-20 sm:h-24 md:h-28 bg-[#84502a]/10 border-2 border-black  rounded-sm overflow-hidden flex-shrink-0">
            {mention.imageUrl ? (
              <img src={mention.imageUrl} alt={`${mention.headline} image`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#caa889]" />
            )}
          </div>
        </div>

        {/* Footer Intro */}
        <p className="text-[11px] sm:text-[12px] md:text-[13px] leading-snug font-semibold text-black font-['Goudy_Bookletter_1911'] mt-auto">
          {mention.intro || ''}
        </p>

        {/* Divider after intro */}
        <div className="w-full h-0.5 bg-black mt-4" />
      </div>
    </div>
  )
}
