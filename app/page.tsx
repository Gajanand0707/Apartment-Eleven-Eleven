import Image from "next/image";
import { EB_Garamond } from "next/font/google";
// import {Sorts_Mill_Goudy_TT} from "next/font/google";
import frame from "../public/frame.png"
import statue1 from "../public/statue1.png";
import midsec from "../public/midsec.png";
import HeroSection from "@/components/HeroSection";
import ideas1 from "../public/ideas1.png";
import ideas2 from "../public/ideas2.png";
import ideas3 from "../public/ideas3.png";
import texture from "../public/texture.png";
import residency from "../public/residency.png";
import resident_bg from "../public/resident_bg.png";
import { TextureButton } from "@/components/texture-button";
import meet from "../public/meet.png";
import meet_logo from "../public/meet_logo.png";
import media from "../public/media.png";
import gif from "../public/gif.png";
import { SpiralAnimation } from "@/components/SpiralAnimation";
import sahiba from "../public/sahiba.png";
import MediaMentions from "@/components/MediaMentions";
import IdeasSection from "@/components/IdeasSection";
import ScienceSection from "@/components/ScienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const ebg = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-ebg",
});

const demoImages = [
  sahiba.src,
  sahiba.src,
  sahiba.src,
  sahiba.src,
  sahiba.src,
  sahiba.src,
  sahiba.src,
  sahiba.src,
  sahiba.src,
  sahiba.src,
];

export default function Home() {
  return (
    // Apply EB Garamond to the whole page
    <div className={ebg.className}>
      <HeroSection />

      <section className="relative overflow-hidden bg-[#D8CCBA] text-black">
        {/* Background texture */}
        <Image
          src={midsec}
          alt="Section background texture"
          fill priority style={{ objectFit: "cover", objectPosition: "center" }}
          className="opacity-80" />
        {/* Content */}
        <div className="relative z-1 max-w-[1063px] mx-auto px-6 py-16 lg:py-20 text-center">
          {/* Top heading */}
          <h2 className="font-bold text-3xl sm:text-6xl md:text-7xl  leading-[1.15] text-[#0E4943] font-['OPTIGoudy_Agency']"> Praxis For The New Renaissance </h2>

          <p className="text-3xl md:text-4xl leading-[1.15] justify-center font-['Goudy_Bookletter_1911'] my-8 md:my-12"> It is not artists, engineers, or architects that can actualize dreams.
            It is the person who can bring all the required resources together that can.</p>
          {/* Divider line */}
          <div className="mt-8 w-full flex justify-center">
            <div className="h-0.5 w-full max-w-[900px] bg-black" />
          </div>
          {/* Second heading */}
          <h3 className="mt-10 font-bold text-4xl sm:text-5xl md:text-7xl  font-['OPTIGoudy_Agency'] leading-[1.15] text-black"> Ideas distilled to brilliance </h3>
          {/* Icon row */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center w-full mx-auto">
              <div className="w-[204px] h-[204px] relative">
                <Image
                  src={ideas1}
                  alt="The Patrons of Progress"
                  fill style={{ objectFit: "contain" }}
                  className="object-cover"
                />
              </div>
              <h4 className="font-semibold text-3xl md:text-4xl mt-6 font-['Goudy_Old_Style'] text-black"> The Patrons of Progress </h4>
              <p className="mt-4 text-[20px] md:text-2xl leading-relaxed font-['Goudy_Bookletter_1911'] text-black max-w-[320px]"> More than backers, we are enablers of the ‘new India,’ providing the strategic architecture for its creation. </p>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center text-center w-full mx-auto">
              <div className="w-[204px] h-[204px] relative">
                <Image
                  src={ideas2}
                  alt="Where Foresight Meets Fortitude"
                  fill style={{ objectFit: "contain" }} />
              </div>
              <h4 className="font-semibold text-3xl md:text-4xl mt-6 font-['Goudy_Old_Style'] text-black"> Where Foresight Meets Fortitude </h4>
              <p className="mt-4 text-[20px] md:text-2xl leading-relaxed font-['Goudy_Bookletter_1911'] text-black max-w-[340px]"> With foresight, we identify defining opportunities early; with fortitude and conviction, we build them alongside you. </p>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center text-center w-full mx-auto">
              <div className="w-[204px] h-[204px] relative">
                <Image
                  src={ideas3}
                  alt="The Sculptor’s Gaze"
                  fill style={{ objectFit: "contain" }}
                />
              </div>
              <h4 className="font-semibold text-3xl md:text-4xl mt-6 font-['Goudy_Old_Style'] text-black max-w-[230px]"> The Sculptor’s Gaze </h4>
              <p className="mt-4 text-[20px] md:text-2xl leading-relaxed text-black max-w-[340px] font-['Goudy_Bookletter_1911']"> We see the potential others miss, guiding you to remove noise and reveal your lasting value. </p>
            </div>
          </div>
        </div>
      </section>
      <ScienceSection />



      <section className="relative flex flex-col justify-center items-center overflow-hidden bg-[#D8CCBA] text-black min-h-[680px] text-center px-6">
        {/* Background texture */}
        <Image
          src={residency}
          alt="Section background texture"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="opacity-70"
        />

        {/* Content */}
        <div className="relative z-1 max-w-[1200px] mx-auto flex flex-col items-center gap-8">
          {/* Main heading */}
          <h1 className="text-4xl md:text-7xl  font-bold font-[OPTIGoudy_Agency]">
            The Residency
          </h1>

          {/* Quote */}
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl sm:text-4xl font-[Goudy_Bookletter_1911] leading-snug">
              Everything should be made as simple as possible, but no simpler
            </h2>
            <p className="text-right text-xl mt-2 font-[Goudy_Bookletter_1911]">
              ~ Albert Einstein
            </p>
          </div>

          {/* Button */}
          <TextureButton className="text-lg px-8 py-3 mt-4 font-[Goudy_Bookletter_1911]">
            Elevator’s Waiting
          </TextureButton>

          {/* Tagline */}
          <p className="text-lg sm:text-xl mt-6 font-[Goudy_Bookletter_1911] text-center">
            ~ Bringing clarity and making the decision process easier for your residency goals. ~
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#D8CCBA] text-black px-6 py-16">
        {/* background texture */}
        <Image
          src={meet}
          alt="Section background texture"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="opacity-70"
        />

        {/* content wrapper */}
        <div className="relative z-1 max-w-[1400px] mx-auto text-center">
          {/* heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-[OPTIGoudy_Agency] text-black">
            Meet our Residency Panel
          </h1>

          {/* paragraph */}
          <p className="mt-8 text-[20px] sm:text-2xl leading-relaxed text-black max-w-[1400px] font-[Goudy_Bookletter_1911] mx-auto">
            We bring authenticity and clarity to premium living with collaboration with
            the industry’s best professionals and experts. Learn more about our process
            and how we redefine modern residency with care, transparency, and excellence.
            Our residency panel is composed of highly accomplished architects, designers,
            and consultants who bring years of experience in creating spaces that merge
            modern aesthetics with functionality. Together, they ensure that every project
            reflects innovation, sustainability, and unmatched quality, providing residents
            with a lifestyle they can truly be proud of.
          </p>

          <div className="mt-10 flex flex-col items-center">{/* divider/ornament optional */}</div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#D8CCBA] text-black px-6 py-16">
        {/* content wrapper */}
        <div className="relative z-1 max-w-[1400px] mx-auto flex flex-col gap-12">
          <h1 className="text-center font-bold text-4xl  md:text-7xl font-[OPTIGoudy_Agency]">
            Our Residents
          </h1>

          {/* 2-column block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mx-4 lg:mx-20">
            {/* LEFT TEXT COLUMN */}
            <div className="flex flex-col text-left max-w-[700px] order-2 lg:order-1">
              <h2 className="font-semibold text-4xl  lg:text-7xl leading-[1.15] font-[OPTIGoudy_Agency] text-black">
                Resident Expertise
                <br />
                Derived Naturally
              </h2>

              <p className="mt-6 text-2xl md:text-4xl leading-relaxed font-[Goudy_Bookletter_1911] text-black max-w-[680px]">
                Apartment Eleven Eleven residents are thoughtfully selected
                using diverse professional backgrounds sourced from various
                industries and expertise areas.
              </p>

              <div className="mt-10">
                <TextureButton className="text-lg px-8 py-3 font-[Goudy_Bookletter_1911]">
                  View all Residents
                </TextureButton>
              </div>
            </div>

            {/* RIGHT IMAGE COLUMN */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-[650px] mb-8 lg:mb-0 bg-[#DCCCAF] overflow-visible">
                <SpiralAnimation {...({
                  images: demoImages,
                  duration: 12,
                  radiusX: 325,
                  radiusY: 200,
                  radialExponent: 1.25,
                  angleOffsetDeg: 180,
                  containerWidth: 650,
                  containerHeight: 400,
                  guidelineWidth: 6,
                } as any)} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection />


      <MediaMentions />
    </div>
  );
}
