"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../public/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#24211F] text-gray-300">
      <div className="mx-auto max-w-[712px]  px-6 sm:px-8 lg:px-12 py-4 sm:py-6">
        {/* Top Links */}
        <nav
  aria-label="Footer"
  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 md:gap-4 max-w-5xl mx-auto text-center place-items-center"
>
  <div className="space-y-0.5 sm:space-y-1 md:space-y-2 font-['Goudy_Bookletter_1911'] ">
    <Link href="/shelves" className="block text-xl md:text-2xl hover:text-white">
      On Our Shelves
    </Link>
    <Link href="/residents" className="block text-xl md:text-2xl hover:text-white">
      Our Residents
    </Link>
     <Link href="/inside" className="block text-xl md:text-2xl hover:text-white md:hidden">
      Inside Our Doors
    </Link>
  </div>

  <div className="space-y-0.5 sm:space-y-1 hidden  md:block space-y-2 font-['Goudy_Bookletter_1911']">
    <Link href="/inside" className="block text-xl md:text-2xl hover:text-white">
      Inside Our Doors
    </Link>
    <Link href="/elevators" className="block text-xl md:text-2xl hover:text-white">
      Elevator’s Waiting
    </Link>
  </div>

  <div className="space-y-0.5 sm:space-y-1 md:space-y-2 font-['Goudy_Bookletter_1911']">
     <Link href="/elevators" className="block text-xl md:text-2xl hover:text-white md:hidden">
      Elevator’s Waiting
    </Link>
    <Link href="/grants" className="block text-xl md:text-2xl hover:text-white">
      Grant Program
    </Link>
    <Link href="/inside" className="block text-xl md:text-2xl hover:text-white">
      Inside Our Doors
    </Link>
  </div>
</nav>


        {/* Social Icons */}
         <hr className="border-gray-400 my-2 sm:my-3  mx-auto " />

        <div className="flex flex-col justify-center items-center gap-2 my-2 sm:gap-3 sm:my-3 font-['Goudy_Bookletter_1911']">
          <h1 className="text-xl text-2xl font-['Goudy_Bookletter_1911'] ">Our Social Media</h1>
          <div className="flex flex-row gap-2">
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn className="text-white hover:text-gray-400 text-xl md:text-2xl" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-white hover:text-gray-400 text-xl md:text-2xl" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
            <FaXTwitter className="text-white hover:text-gray-400 text-xl md:text-2xl" />
          </Link>
          
          </div>
        </div>

        <hr className="border-gray-400 my-2 sm:my-3  mx-auto" />

        {/* Logo + Info */}
        <div className="flex flex-col items-center text-center space-y-0.5 sm:space-y-1">
          <div className="flex items-center gap-1">
  {/* Logo Image */}
  <Image
    src={logo}
    alt="Apartment Eleven Eleven logo"
    width={60}
    height={60}
    priority
    className="rounded-full"
  />

  {/* Text Section */}
  <div className="flex flex-col leading-tight">
    <h1 className="text-white font-bold text-2xl tracking-wide">
      APARTMENT<span className="align-super text-xs">™</span>
    </h1>
    <h2 className="text-gray-300 text-sm font-semibold tracking-[0.3em]">
      ELEVEN ELEVEN
    </h2>
  </div>
</div>

          {/* <p className="text-white mt-0.5 sm:mt-1 font-medium text-sm sm:text-base font-['Goudy_Bookletter_1911']">
            What If Everything Turns Out Exactly The Way You Dreamt?
          </p> */}

          <p className="mt-0.5 sm:mt-1 text-gray-300 text-sm md:text-2xl font-['Goudy_Bookletter_1911']">
            <span className="font-semibold text-white">Reach us at:</span>{" "}
            <a href="mailto:hello@apartmenteleveneleven.com" className="underline decoration-white/40 underline-offset-2 hover:text-white">
              pitch@apartmenteleveneleven.com
            </a>
          </p>

          {/* <address className="not-italic text-gray-400 text-sm font-['Goudy_Bookletter_1911'] text-center max-w-xl">
            AltF Coworking Space, Success Tower, Sector - 65, Gurugram, Haryana 125849
          </address> */}

          <p className="text-gray-500 text-sm md:text-2xl mt-0.5 sm:mt-1 font-['Goudy_Bookletter_1911']">Made with intention and purpose</p>
          {/* Policies */}
          <div className="flex flex-wrap justify-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-sm md:text-2xl mt-0.5 font-['Goudy_Bookletter_1911']">
            <Link href="/terms" className="hover:text-white underline">
              Terms &amp; Conditions |
            </Link>
            <Link href="/privacy" className="hover:text-white underline" >
              Privacy Policy |
            </Link>
            <Link href="/cookies" className="hover:text-white underline">
              Cookies Policy |
            </Link>
          </div>

          <p className="text-gray-500 text-sm md:text-2xl mt-0.5 sm:mt-1 font-['Goudy_Bookletter_1911']">
            © 2025 Apartment Eleven Eleven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
