// app/components/MediaMentions.tsx
"use client"

import { useState } from "react"

type Mention = {
  id: number
  outlet: string
  headline: string
  deck?: string
  logo?: string
}

const SAMPLE: Mention[] = [
  { id: 1, outlet: "Inc.", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
  { id: 2, outlet: "FT | FINANCIAL TIMES", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
  { id: 3, outlet: "The New York Times", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
  { id: 4, outlet: "BUSINESS INSIDER", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
  { id: 5, outlet: "WSJ", headline: "Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium Living Experience" },
]

export default function MediaMentions({
  items = SAMPLE,
  title = "Our Media Mentions",
}: {
  items?: Mention[]
  title?: string
}) {
  const [active, setActive] = useState(2)
  const n = items.length
  const next = () => setActive((i) => (i + 1) % n)
  const prev = () => setActive((i) => (i - 1 + n) % n)

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
        return "z-30 -translate-x-[140px] sm:-translate-x-[200px] rotate-0 scale-100 opacity-100"
      case "left1":
        return "z-20 -translate-x-[240px] sm:-translate-x-[340px] md:-translate-x-[380px] lg:-translate-x-[420px] scale-[0.85] sm:scale-[0.9] md:scale-[0.8]  opacity-90"
      case "right1":
        return "z-20 -translate-x-[40px] sm:-translate-x-[60px] md:-translate-x-[20px] lg:translate-x-[20px] scale-[0.85] sm:scale-[0.9] md:scale-[0.8]  opacity-90"
      case "left2":
        return "hidden sm:block z-10 -translate-x-[340px] mx-10 md:-translate-x-[560px] lg:-translate-x-[640px] scale-[0.7] sm:scale-[0.8] md:scale-[0.6]  opacity-75"
      case "right2":
        return "hidden sm:block z-10  -mx-10 lg:translate-x-[240px] scale-[0.7] sm:scale-[0.8] md:scale-[0.6]  opacity-75"
      default:
        return "opacity-0 pointer-events-none scale-75"
    }
  }

  return (
    <section className="relative bg-[#D5C7B3] py-4 sm:py-6 overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-6 sm:mb-8 px-4">
        <h2 className="font-[Sorts_Mill_Goudy_TT] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold text-black drop-shadow-[0_2px_0_rgba(0,0,0,0.2)] sm:drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
          {title}
        </h2>
      </div>

      {/* Stage - centered container */}
      
      <div className="max-w-7xl mx-auto relative">
        <div className="relative h-[400px] sm:h-[460px] md:h-[520px] lg:h-[560px] flex items-center justify-center">
          {/* Cards */}
          <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px]">
            {items.map((m, i) => {
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
            className="absolute z-50 left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 text-white hover:bg-black active:bg-black/90 flex items-center justify-center shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute z-50 right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 text-white hover:bg-black active:bg-black/90 flex items-center justify-center shadow-lg"
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
        "relative h-full rounded-md border border-[#5b3f21] shadow-lg sm:shadow-xl md:shadow-2xl",
      ].join(" ")}
      style={{
        backgroundImage: `url('/mentions_bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background texture overlays */}
      <div className="absolute inset-0 pointer-events-none rounded-md mix-blend-multiply [background:radial-gradient(transparent_40%,rgba(0,0,0,.15)),linear-gradient(to_bottom,rgba(0,0,0,.08),transparent_40%,rgba(0,0,0,.12))]" />
      <div className="absolute inset-2.5 border border-[#4a331d]/70 rounded-sm" />
      <div className="absolute left-2.5 right-2.5 bottom-16 h-0.5 bg-[#4a331d]/80" />

      {/* Content */}
  <div className="relative z-10 h-full px-3 sm:px-4 md:px-5 pt-6 sm:pt-7 pb-3 sm:pb-4 flex flex-col text-white">
        
        {/* Outlet Name */}
        <p
          className={`font-['Playfair_Display'] tracking-tight break-words whitespace-normal text-balance text-center
            ${emphasized
              ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            } leading-tight mb-4 max-w-full overflow-hidden`}
        >
          {mention.outlet}
        </p>

        {/* Divider line (moved below text dynamically) */}
        <div className="w-full h-0.5 bg-[#4a331d]/80 mb-4"></div>

        {/* Subheading */}
  <div className="text-center font-['Playfair_Display'] text-sm sm:text-base md:text-lg tracking-wide mb-2 sm:mb-3 text-white/90">
          APARTMENT ELEVEN ELEVEN
        </div>

        {/* Headline and Thumbnail */}
        <div className="mt-auto mb-2 sm:mb-3 grid grid-cols-[1fr_1fr] gap-2 sm:gap-3">
          <p className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-snug font-serif text-white/85">
            {mention.headline}
          </p>
          <div className="aspect-4/3 bg-[#84502a]/20 border border-[#4a331d]/50 rounded-sm" />
        </div>

        {/* Footer Text */}
  <p className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] leading-snug font-serif text-white/75">
          Revolutionizing luxury residential spaces with innovative community-driven approaches.
        </p>
      </div>
    </div>
  )
}
