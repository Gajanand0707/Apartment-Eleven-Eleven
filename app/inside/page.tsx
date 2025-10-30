import MeetTeamSection from "@/components/MeetTeamSection"
import insdie from "../../public/inside.png"
import inside1 from "../../public/inside1.png"
import inside2 from "../../public/inside2.png"
import inside3 from "../../public/inside3.png"
export default function InsidePage() {
    return (
        <div>
            <div className="h-full w-full">
                <img src={insdie.src} alt="inside image" />
            </div>

            <MeetTeamSection />
            <section className="w-full">
  {/* Row 1 */}
  <div className="w-full bg-[#E5E5E7] text-black">
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-start md:gap-12 lg:px-12 lg:py-16">
      {/* Left text */}
      <div className="max-w-xl">
        <h2 className="font-['Playfair_Display'] font-bold text-4xl leading-tight tracking-[-0.02em] md:text-5xl lg:text-6xl">
          <span className="block">A Legacy</span>
          <span className="block">of Creation</span>
        </h2>

        <p className="mt-6 font-serif text-lg leading-relaxed md:text-xl lg:text-[1.3rem] lg:leading-relaxed">
          We partner with founders who don’t just build companies, but create legacies.
          For us, every investment is a chapter in a story that will be remembered.
        </p>
      </div>

      {/* Right image */}
      <div className="shrink-0 flex items-start justify-end md:w-auto">
        <img
          src={inside1.src}
          alt="Hands holding light"
          className="w-[180px] md:w-[220px] lg:w-[260px] h-auto object-contain"
        />
      </div>
    </div>
  </div>

  {/* Row 2 */}
  <div className="w-full bg-[#d9d1bf] text-black">
    <div className="mx-auto flex max-w-7xl flex-col-reverse items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-start md:gap-12 lg:px-12 lg:py-16">
      {/* Left image */}
      <div className="shrink-0 flex items-start justify-start md:w-auto">
        <img
          src={inside2.src}
          alt="Hand reaching upward"
          className="w-[200px] md:w-[240px] lg:w-[260px] h-auto object-contain"
        />
      </div>

      {/* Right text */}
      <div className="max-w-2xl text-center md:text-left md:max-w-xl self-center md:self-start">
        <h2 className="font-['Playfair_Display'] font-bold text-4xl leading-tight tracking-[-0.02em] md:text-5xl lg:text-6xl text-center md:text-left">
          <span className="block">The Architecture</span>
          <span className="block">of Belief</span>
        </h2>

        <p className="mt-6 font-serif text-lg leading-relaxed md:text-xl lg:text-[1.3rem] lg:leading-relaxed text-center md:text-left">
          Great ventures are built on conviction. We invest in founders whose ideas rest
          on foundations as strong as their purpose.
        </p>
      </div>
    </div>
  </div>

  {/* Row 3 */}
  <div className="w-full bg-[#E5E5E7] text-black">
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-start md:gap-12 lg:px-12 lg:py-16">
      {/* Left text */}
      <div className="max-w-xl">
        <h2 className="font-['Playfair_Display'] font-bold text-4xl leading-tight tracking-[-0.02em] md:text-5xl lg:text-6xl">
          <span className="block">The Light</span>
          <span className="block">Within</span>
        </h2>

        <p className="mt-6 font-serif text-lg leading-relaxed md:text-xl lg:text-[1.3rem] lg:leading-relaxed">
          Progress begins with an inner spark — curiosity, courage, and the will to
          shape something greater than oneself. We exist to nurture that light.
        </p>
      </div>

      {/* Right image */}
      <div className="shrink-0 flex items-start justify-end md:w-auto">
        <img
          src={inside3.src}
          alt="Figure with glowing heart"
          className="w-[200px] md:w-[240px] lg:w-[260px] h-auto object-contain"
        />
      </div>
    </div>
  </div>
</section>

        </div>
    )
}