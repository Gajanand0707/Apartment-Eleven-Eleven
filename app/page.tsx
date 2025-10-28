
import Image from "next/image";
import statue1 from "../images/statue1.png";
import midsec from "../images/midsec.png";
import ideas1 from "../images/ideas1.png";
import ideas2 from "../images/ideas2.png";
import ideas3 from "../images/ideas3.png";
import texture from "../images/texture.png";
import residency from "../images/residency.png";
import { TextureButton } from "@/components/texture-button";
import meet from "../images/meet.png";
import meet_logo from "../images/meet_logo.png";
import media from "../images/media.png";
import gif from "../images/gif.png";

export default function Home() {
  return (
    <div>
      <section className="relative flex justify-between items-center bg-[#0E4C45] text-[#F5EDE0] h-full  overflow-hidden">
        {/* Left Text Section */}
        <div className="flex flex-col gap-4 ml-10">
          <h2 className="text-[86px] font-['Playfair_Display'] font-medium leading-tight">
            Welcome to
          </h2>
          <h1 className="text-[108px] leading-[1.05] font-['Playfair_Display'] font-bold">
            APARTMENT<br />ELEVEN ELEVEN
          </h1>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-end ">
          <img
            src={statue1.src}
            alt="statue"
            
            className="w-[400px] h-auto object-cover ml-8 top-0 bottom-0 "
          />
        </div>
      </section>


      <section className="relative overflow-hidden bg-[#D8CCBA] text-black">
        {/* Background texture */}
        <Image
          src={midsec}
          alt="Section background texture"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="opacity-80"
        />

        {/* Content */}
        <div className="relative z-[1] max-w-[1400px] mx-auto px-6 py-16 lg:py-20 text-center">
          {/* Top heading */}
          <h2 className="font-['Playfair_Display'] font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-[#0E4943]">
            Praxis For The New Renaissance
          </h2>

          {/* Divider line */}
          <div className="mt-8 w-full flex justify-center">
            <div className="h-[2px] w-full max-w-[900px] bg-black" />
          </div>

          {/* Second heading */}
          <h3 className="mt-10 font-['Playfair_Display'] font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-black">
            Ideas distilled to brilliance
          </h3>

          {/* Icon row */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center max-w-[380px] mx-auto">
              <div className="w-[140px] h-[140px] relative">
                <Image
                  src={ideas1}
                  alt="The Patrons of Progress"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>

              <h4 className="font-['Playfair_Display'] font-semibold text-2xl mt-6 text-black">
                The Patrons of Progress
              </h4>

              <p className="mt-4 text-base leading-relaxed text-black max-w-[320px]">
                More than backers, we are enablers of the ‘new India,’ providing
                the strategic architecture for its creation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center max-w-[380px] mx-auto">
              <div className="w-[140px] h-[140px] relative">
                <Image
                  src={ideas2}
                  alt="Where Foresight Meets Fortitude"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>

              <h4 className="font-['Playfair_Display'] font-semibold text-2xl mt-6 text-black">
                Where Foresight Meets Fortitude
              </h4>

              <p className="mt-4 text-base leading-relaxed text-black max-w-[340px]">
                With foresight, we identify defining opportunities early; with
                fortitude and conviction, we build them alongside you.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center max-w-[380px] mx-auto">
              <div className="w-[140px] h-[140px] relative">
                <Image
                  src={ideas3}
                  alt="The Sculptor’s Gaze"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>

              <h4 className="font-['Playfair_Display'] font-semibold text-2xl mt-6 text-black">
                The Sculptor’s Gaze
              </h4>

              <p className="mt-4 text-base leading-relaxed text-black max-w-[340px]">
                We see the potential others miss, guiding you to remove noise and
                reveal your lasting value.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="relative bg-[#D8CCBA] py-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="font-['Playfair_Display'] font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-black mb-16">
            In Science we Trust
          </h2>

          {/* 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* CARD 1 */}
            <div className="relative rounded-[24px] overflow-hidden text-white">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center"
              />

              <div className="relative z-[1] p-8 sm:p-10 flex flex-col items-center text-center">
                <h3 className="font-['Playfair_Display'] font-semibold text-xl sm:text-2xl mb-4">
                  Sustainable Living: Green Building Standards and Energy Efficiency
                </h3>
                <p className="text-[16px] leading-relaxed max-w-[360px]">
                  We bring authenticity and clarity to premium living with collaboration
                  with the industry’s best professionals and experts. Learn more about
                  our process and how we redefine modern residency with care, transparency,
                  and excellence. Our residency panel is composed of highly accomplished
                  architects, designers, and consultants who bring years of experience in
                  creating spaces that merge modern aesthetics with functionality.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="relative rounded-[24px] overflow-hidden text-white">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center"
              />

              <div className="relative z-[1] p-8 sm:p-10 flex flex-col items-center text-center">
                <h3 className="font-['Playfair_Display'] font-semibold text-xl sm:text-2xl mb-4">
                  Sustainable Living: Green Building Standards and Energy Efficiency
                </h3>
                <p className="text-[16px] leading-relaxed max-w-[360px]">
                  We bring authenticity and clarity to premium living with collaboration
                  with the industry’s best professionals and experts. Learn more about
                  our process and how we redefine modern residency with care, transparency,
                  and excellence. Our residency panel is composed of highly accomplished
                  architects, designers, and consultants who bring years of experience in
                  creating spaces that merge modern aesthetics with functionality.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="relative rounded-[24px] overflow-hidden text-white">
              <Image
                src={texture}
                alt="Terracotta background"
                fill
                priority
                className="object-cover object-center"
              />

              <div className="relative z-[1] p-8 sm:p-10 flex flex-col items-center text-center">
                <h3 className="font-['Playfair_Display'] font-semibold text-xl sm:text-2xl mb-4">
                  Sustainable Living: Green Building Standards and Energy Efficiency
                </h3>
                <p className="text-[16px] leading-relaxed max-w-[360px]">
                  We bring authenticity and clarity to premium living with collaboration
                  with the industry’s best professionals and experts. Learn more about
                  our process and how we redefine modern residency with care, transparency,
                  and excellence. Our residency panel is composed of highly accomplished
                  architects, designers, and consultants who bring years of experience in
                  creating spaces that merge modern aesthetics with functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col justify-center items-center overflow-hidden bg-[#D8CCBA] text-black min-h-[680px] text-center px-6">
        {/* Background texture */}
        <Image
          src={residency}
          alt="Section background texture"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="opacity-70"
        />

        {/* Content */}
        <div className="relative z-[1] max-w-[1200px] mx-auto flex flex-col items-center gap-8">
          {/* Main heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold font-['Playfair_Display']">
            The Residency
          </h1>

          {/* Quote */}
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-['Playfair_Display'] leading-snug">
              Everything should be made as simple as possible, but no simpler
            </h2>
            <p className="text-right text-xl mt-2 font-['STIX_Two_Text']">
              ~ Albert Einstein
            </p>
          </div>

          {/* Button */}
          <TextureButton className="text-lg px-8 py-3 mt-4">
            Elevator’s Waiting
          </TextureButton>

          {/* Tagline */}
          <p className="text-lg sm:text-xl font-['STIX_Two_Text'] mt-6 text-center">
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
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="opacity-70"
        />

        {/* content wrapper */}
        <div className="relative z-[1] max-w-[1400px] mx-auto text-center">
          {/* heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] text-black">
            Meet our Residency Panel
          </h1>

          {/* paragraph */}
          <p className="mt-8 text-lg sm:text-xl leading-relaxed font-['Inter'] text-black max-w-[1400px] mx-auto">
            We bring authenticity and clarity to premium living with collaboration with
            the industry’s best professionals and experts. Learn more about our process
            and how we redefine modern residency with care, transparency, and excellence.
            Our residency panel is composed of highly accomplished architects, designers,
            and consultants who bring years of experience in creating spaces that merge
            modern aesthetics with functionality. Together, they ensure that every project
            reflects innovation, sustainability, and unmatched quality, providing residents
            with a lifestyle they can truly be proud of.
          </p>

          {/* divider line + ornament */}
          <div className="mt-10 flex flex-col items-center">
            {/* thin line */}
            <div className="h-[2px] w-[320px] bg-black" />

            {/* ornament graphic */}
            <Image
              src={meet_logo}
              alt="Decorative flourish"
              className="mt-2 h-auto w-[200px] object-contain"
            />
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#D8CCBA] text-black px-6 py-16">


        {/* content wrapper */}
        <div className="relative z-[1] max-w-[1400px] mx-auto flex flex-col gap-12">
          {/* Top heading */}
          <h1 className="text-center font-['Playfair_Display'] font-bold text-4xl sm:text-5xl lg:text-6xl">
            Our Residents
          </h1>

          {/* 2-column block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mx-20">
            {/* LEFT TEXT COLUMN */}
            <div className="flex flex-col text-left max-w-[700px]">
              <h2 className="font-['Playfair_Display'] font-semibold text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-black">
                Resident Expertise
                <br />
                Derived Naturally
              </h2>

              <p className="mt-6 text-lg sm:text-xl leading-relaxed font-['Inter'] text-black max-w-[680px]">
                Apartment Eleven Eleven residents are thoughtfully selected
                using diverse professional backgrounds sourced from various
                industries and expertise areas.
              </p>

              <div className="mt-10">
                <TextureButton className="text-lg px-8 py-3">
                  View all Residents
                </TextureButton>
              </div>
            </div>

            {/* RIGHT IMAGE COLUMN */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] border-[3px] border-[#003E6B] bg-[#DCCCAF]">

                <Image
                  src={gif}
                  alt="Resident Expertise Graphic"
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col justify-center items-center overflow-hidden bg-[#D8CCBA] text-black min-h-[680px]  text-center px-6">
        <h1 className="text-6xl font-['Playfair_Display']">Residents Testimonials</h1>
      </section>

      <section className="relative flex flex-col justify-center items-center overflow-hidden bg-[#D8CCBA] text-black min-h-[680px]  text-center px-6 pb-10">
        <h1 className="text-6xl font-['Playfair_Display'] text-black">Our Media Mentions </h1>
        <div>
          <Image
            src={media}
            alt="Terracotta background"
            // fill
            // priority
            className="object-cover object-center mt-5"
          />
        </div>
      </section>

    </div>

  );
}


