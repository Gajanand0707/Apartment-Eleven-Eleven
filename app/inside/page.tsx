import MeetTeamSection from "@/components/MeetTeamSection"
import insdie from "../../public/inside.png"
import inside1 from "../../public/inside1.png"
import inside2 from "../../public/inside2.png"
import inside3 from "../../public/inside3.png"

export default function InsidePage() {
  return (
    <div>
      {/* Hero */}
      <div className="w-full">
        <img src={insdie.src} alt="inside image" className="w-full h-auto" />
      </div>

      <MeetTeamSection />

      <section className="w-full">
        {/* Row 1 — text left, image right (side-by-side on ALL breakpoints) */}
        <div className="w-full bg-[#E5E5E7] text-black">
          <div
            className="
              mx-auto max-w-7xl
              flex flex-row items-start justify-between
              gap-4 sm:gap-6 md:gap-12
              px-4 sm:px-6 lg:px-12
              py-8 sm:py-10 lg:py-16
            "
          >
            {/* Left text */}
            <div className="basis-1/2 min-w-0 max-w-full">
              <h2 className="font-['Playfair_Display'] font-bold leading-tight tracking-[-0.02em]
                             text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block">A Legacy</span>
                <span className="block">of Creation</span>
              </h2>

              <p className="mt-4 sm:mt-6 font-serif leading-relaxed
                             text-sm sm:text-base md:text-xl lg:text-[1.3rem]">
                We partner with founders who don’t just build companies, but create legacies.
                For us, every investment is a chapter in a story that will be remembered.
              </p>
            </div>

            {/* Right image */}
            <div className="basis-1/2 min-w-0 flex items-start justify-end">
              <img
                src={inside1.src}
                alt="Hands holding light"
                className="h-auto object-contain
                           w-28 xs:w-32 sm:w-40 md:w-56 lg:w-64"
              />
            </div>
          </div>
        </div>

        {/* Row 2 — image left, text right (side-by-side on ALL breakpoints) */}
        <div className="w-full bg-[#d9d1bf] text-black">
          <div
            className="
              mx-auto max-w-7xl
              flex flex-row items-start justify-between
              gap-4 sm:gap-6 md:gap-12
              px-4 sm:px-6 lg:px-12
              py-8 sm:py-10 lg:py-16
            "
          >
            {/* Left image */}
            <div className="basis-1/2 min-w-0 flex items-start justify-start">
              <img
                src={inside2.src}
                alt="Hand reaching upward"
                className="h-auto object-contain
                           w-32 sm:w-44 md:w-60 lg:w-64"
              />
            </div>

            {/* Right text */}
            <div className="basis-1/2 min-w-0 max-w-full">
              <h2 className="font-['Playfair_Display'] font-bold leading-tight tracking-[-0.02em]
                             text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-left">
                <span className="block">The Architecture</span>
                <span className="block">of Belief</span>
              </h2>

              <p className="mt-4 sm:mt-6 font-serif leading-relaxed
                             text-sm sm:text-base md:text-xl lg:text-[1.3rem] text-left">
                Great ventures are built on conviction. We invest in founders whose ideas rest
                on foundations as strong as their purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3 — text left, image right (side-by-side on ALL breakpoints) */}
        <div className="w-full bg-[#E5E5E7] text-black">
          <div
            className="
              mx-auto max-w-7xl
              flex flex-row items-start justify-between
              gap-4 sm:gap-6 md:gap-12
              px-4 sm:px-6 lg:px-12
              py-8 sm:py-10 lg:py-16
            "
          >
            {/* Left text */}
            <div className="basis-1/2 min-w-0 max-w-full">
              <h2 className="font-['Playfair_Display'] font-bold leading-tight tracking-[-0.02em]
                             text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block">The Light</span>
                <span className="block">Within</span>
              </h2>

              <p className="mt-4 sm:mt-6 font-serif leading-relaxed
                             text-sm sm:text-base md:text-xl lg:text-[1.3rem]">
                Progress begins with an inner spark — curiosity, courage, and the will to
                shape something greater than oneself. We exist to nurture that light.
              </p>
            </div>

            {/* Right image */}
            <div className="basis-1/2 min-w-0 flex items-start justify-end">
              <img
                src={inside3.src}
                alt="Figure with glowing heart"
                className="h-auto object-contain
                           w-32 sm:w-44 md:w-60 lg:w-64"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
