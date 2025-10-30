"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../public/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#24211F] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10">
        {/* Top Links */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 text-center md:text-left"
        >
          <div className="space-y-3 md:space-y-4">
            <Link href="/shelves" className="block text-xl md:text-2xl hover:text-white">
              On Our Shelves
            </Link>
            <Link href="/residents" className="block text-xl md:text-2xl hover:text-white">
              Our Residents
            </Link>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Link href="/inside" className="block text-xl md:text-2xl hover:text-white">
              Inside Our Doors
            </Link>
            <Link href="/elevators" className="block text-xl md:text-2xl hover:text-white">
              Elevator’s Waiting
            </Link>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Link href="/grants" className="block text-xl md:text-2xl hover:text-white">
              Grant Program
            </Link>
            <Link href="/inside" className="block text-xl md:text-2xl hover:text-white">
              Inside Our Doors
            </Link>
          </div>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-5 my-8">
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

        <hr className="border-gray-700/70 my-6" />

        {/* Logo + Info */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Image src={logo} alt="Apartment Eleven Eleven logo" width={60} height={60} priority />
          <h1 className="text-white text-lg font-bold leading-none">APARTMENT</h1>
          <h2 className="text-white text-lg font-bold leading-none">ELEVEN ELEVEN</h2>

          <p className="text-white mt-2 font-medium text-sm sm:text-base">
            What If Everything Turns Out Exactly The Way You Dreamt?
          </p>

          <p className="mt-2 text-gray-300 text-sm">
            <span className="font-semibold text-white">Reach us at:</span>{" "}
            <a href="mailto:hello@apartmenteleveneleven.com" className="underline decoration-white/40 underline-offset-2 hover:text-white">
              hello@apartmenteleveneleven.com
            </a>
          </p>

          <address className="not-italic text-gray-400 text-sm text-center max-w-xl">
            AltF Coworking Space, Success Tower, Sector - 65, Gurugram, Haryana 125849
          </address>

          <p className="text-gray-500 text-xs mt-3">Made with intention and purpose</p>

          {/* Policies */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm mt-2">
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookies Policy
            </Link>
          </div>

          <p className="text-gray-500 text-xs mt-3">
            © 2025 Apartment Eleven Eleven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
