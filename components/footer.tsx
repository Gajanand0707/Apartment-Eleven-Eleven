"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../public/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#24211F] text-gray-300">
      <div className="mx-auto max-w-[850px] px-6 sm:px-8 lg:px-12 py-4 sm:py-6">
        {/* Top Links */}
       <nav
  aria-label="Footer"
  className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 md:gap-4 max-w-5xl mx-auto text-center place-items-center"
>

  {/* Column 1 */}
  <div className="space-y-2 font-['Goudy_Bookletter_1911']">
    <Link href="/" className="block text-xl md:text-2xl hover:text-white">
      Home
    </Link>

    <Link href="/residents" className="block text-xl md:text-2xl hover:text-white">
      Our Residents
    </Link>

    {/* Mobile only */}
    <Link href="/library" className="block text-xl md:text-2xl hover:text-white md:hidden">
      Library
    </Link>

    {/* Desktop only (empty for mobile, prevents layout shift) */}
    <div className="hidden md:block h-0"></div>
  </div>

  {/* Column 2 */}
  <div className="space-y-2 font-['Goudy_Bookletter_1911']">

    {/* Mobile only */}
    <Link href="/elevators" className="block text-xl md:text-2xl hover:text-white md:hidden">
      Elevator's Waiting
    </Link>

    {/* Desktop + Mobile */}
    <Link href="/library" className="block text-xl md:text-2xl hover:text-white">
      Library
    </Link>

    <Link href="/inside" className="block text-xl md:text-2xl hover:text-white">
      Inside Our Doors
    </Link>
     <div className="md:hidden h-0"></div>
    
  </div>

  {/* Column 3 */}
  <div className="space-y-2 font-['Goudy_Bookletter_1911']">

    {/* Desktop only */}
    <Link href="/faq" className="hidden md:block text-xl md:text-2xl hover:text-white">
      FAQ's
    </Link>

    {/* Desktop only */}
    <Link href="/elevators" className="hidden md:block text-xl md:text-2xl hover:text-white">
      Elevator's Waiting
    </Link>

    {/* Mobile empty placeholders to keep grid height equal */}
    <div className="md:hidden h-0"></div>
    <div className="md:hidden h-0"></div>
  </div>

</nav>

        {/* Social Icons */}
        <hr className="border-white my-2 sm:my-3 mx-auto w-[323px] md:hidden" />
        <div className="flex flex-col justify-center items-center gap-2 my-2 sm:gap-3 sm:my-3 font-['Goudy_Bookletter_1911']">
          <h1 className="text-xl text-2xl font-['Goudy_Bookletter_1911'] md:hidden ">Our Socials:</h1>
          <div className="flex flex-row gap-2">
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <div className="w-[48px] h-[50px] flex items-center justify-center rounded-full bg-white">
                <FaLinkedinIn className="text-black text-xl md:text-3xl" />
              </div>
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="w-[48px] h-[50px] flex items-center justify-center rounded-full bg-white">
                <FaInstagram className="text-black text-xl md:text-3xl" />
              </div>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
              <div className="w-[48px] h-[50px] flex items-center justify-center rounded-full bg-white">
                <FaXTwitter className="text-black text-xl md:text-3xl" />
              </div>
            </Link>
          </div>
        </div>
        <hr className="border-white my-2 sm:my-3 mx-auto w-[323px] md:w-auto" />
        {/* Logo + Info */}
        <div className="flex flex-col items-center text-center space-y-0.5 sm:space-y-1">
          <div className="w-[293px] h-[75px] flex items-center gap-2">
            <Image
              src={logo}
              alt="Apartment Eleven Eleven logo"
              width={85}
              height={85}
              priority
              className="rounded-full w-[68px] h-[68px] md:w-[85px] md:h-[85px]"
            />
            <div className="flex flex-col leading-tight">
              <h1 className="text-white font-bold text-3xl md:text-4xl text-center ">
                APARTMENT
              </h1>
              <h2 className="text-white text-2xl md:text-3xl text-nowrap text-center ">
                ELEVEN ELEVEN
              </h2>
            </div>
          </div>
          <p className="mt-0.5 sm:mt-1 text-[#BFBFBF] text-sm md:text-2xl font-['Goudy_Bookletter_1911']">
            <span className="font-semibold ">Reach us at:</span>{" "}
            <a href="mailto:hello@apartmenteleveneleven.com" className="underline decoration-white/40 underline-offset-2 hover:text-white">
              pitch@apartmenteleveneleven.com
            </a>
          </p>
          <p className="text-[#BFBFBF] text-sm md:text-2xl mt-0.5 sm:mt-1 font-['Goudy_Bookletter_1911']">Made with intention and purpose</p>
          
          {/* Policies */}
          <div className="flex flex-wrap justify-center text-[#BFBFBF] gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-sm md:text-2xl mt-0.5 font-['Goudy_Bookletter_1911']">
            <Link href="/terms" className="hover:text-white underline">
              Terms &amp; Conditions |
            </Link>
            <Link href="/privacy" className="hover:text-white underline">
              Privacy Policy |
            </Link>
            <Link href="/cookies" className="hover:text-white underline">
              Cookies Policy |
            </Link>
          </div>
          <p className="text-[#BFBFBF] text-sm md:text-2xl mt-0.5 sm:mt-1 font-['Goudy_Bookletter_1911']">
            © 2025 Apartment Eleven Eleven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;