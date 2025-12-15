"use client";

import { useEffect, useState } from "react";
import MeetTeamSection from "@/components/MeetTeamSection"
import InsideHero from "@/components/InsideHero"
import inside1 from "../../public/inside1.png"
import inside2 from "../../public/inside2.png"
import inside4 from "../../public/inside4.png"
import colours from "../../public/colours.png"

export default function InsidePage() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past the hero section completely
      const heroHeight = window.innerHeight;
      setShowNavbar(window.scrollY > heroHeight - 250);
    };

    // Set initial state to hide navbar
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Control navbar visibility via CSS class
    const navbar = document.querySelector("header");
    if (navbar) {
      if (showNavbar) {
        navbar.classList.remove("navbar-hidden");
        navbar.classList.add("navbar-visible");
      } else {
        navbar.classList.remove("navbar-visible");
        navbar.classList.add("navbar-hidden");
      }

    }
  }, [showNavbar]);

  return (
    <div>
      <InsideHero />

      <MeetTeamSection />

      <section className="w-full">
        {/* Row 1 — text left, image right (side-by-side on ALL breakpoints) */}
        <div className="w-full  bg-[#D5C7B3] text-black md:h-[460px] h-full ">
          <div
            className="
              mx-auto 
              flex md:flex-row flex-col  md:justify-between
             py-12 px-8 md:py-16 md:px-12
            "
          >

            {/* Left image */}
            <div className=" min-w-0 w-[200px] h-[200px] md:w-[360px] md:h-full items-center mx-auto">
              <img
                src={colours.src}
                alt="Hands holding light"
                className="h-auto object-contain
                           "
              />
            </div>

            {/* Right text */}
            <div className=" max-w-full md:pr-10 md:text-right">
              <h2 className="font-['OPTIGoudy_Agency'] font-extrabold  md:text-right text-center
                             text-4xl md:text-7xl ">
                <span className="block">A Legacy</span>
                <span className="block">of Creation</span>
              </h2>

              <p className="mt-4 sm:mt-6 font-['Goudy_Bookletter_1911'] 
                             text-xl md:text-4xl md:max-w-[785px] md:text-right text-center ">
                We partner with founders who don’t just build companies, but create legacies.
                For us, every investment is a chapter in a story that will be remembered.
              </p>
            </div>


          </div>
        </div>

        {/* Row 2 — text left, image right (side-by-side on ALL breakpoints) */}
        <div className="w-full bg-[#d9d1bf] text-black md:h-[460px] h-full ">
          <div
            className="
              mx-auto 
              flex md:flex-row flex-col  md:justify-between
             py-12 px-8 md:py-16 md:px-12
            "
          >

            {/* Left text */}
            <div className=" max-w-full md:pr-10 order-2 md:order-1 py-4 md:py-0">
              <h2 className="font-['OPTIGoudy_Agency'] font-extrabold  md:text-left text-center
                             text-4xl md:text-7xl ">
                <span className="block">The Architecture</span>
                <span className="block">of Belief</span>
              </h2>

              <p className="mt-4 sm:mt-6 font-['Goudy_Bookletter_1911'] 
                             text-xl md:text-4xl md:max-w-[683px] md:text-left text-center">
                Great ventures are built on conviction. We invest in founders whose ideas rest
                on foundations as strong as their purpose.
              </p>
            </div>

            {/* Right image */}
            <div className=" min-w-0 w-[200px] h-[200px] md:w-[360px] md:h-[318px] mx-auto order-1 md:order-2">
              <img
                src={inside2.src}
                alt="Hand reaching upward"
                className="h-auto object-contain
                           "
              />
            </div>
          </div>
        </div>

        {/* Row 3 — image left, text right (side-by-side on ALL breakpoints) */}
        <div className="w-full bg-[#E5E5E7] text-black md:h-[460px] h-full ">
          <div
            className="
              mx-auto 
              flex md:flex-row flex-col  md:justify-between
             py-12 px-8 md:py-16 md:px-12
            "
          >

            {/* Left image */}
            <div className=" min-w-0 w-[200px] h-[200px] md:w-[360px] md:h-[318px] md:bottom-0 mx-auto">
              <img
                src={inside4.src}
                alt="Figure with glowing heart"
                className="h-auto object-contain
                           "
              />
            </div>

            {/* Right text */}
            <div className=" max-w-full md:pr-10 py-4 md:py-0">
              <h2 className="font-['OPTIGoudy_Agency'] font-extrabold md:leading-20 md:text-right text-center
                             text-4xl md:text-7xl ">
                <span className="block">The Light</span>
                <span className="block">Within</span>
              </h2>

              <p className="mt-4 sm:mt-6 font-['Goudy_Bookletter_1911'] 
                             text-xl md:text-4xl md:max-w-[695px] md:text-right text-center">
                Progress begins with an inner spark — curiosity, courage, and the will to
                shape something greater than oneself. We exist to nurture that light.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
