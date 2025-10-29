"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../public/logo.png"; // or use /public/logo.png if stored in public/

export function Footer() {
  return (
    <footer className="bg-[#24211F] text-gray-300 py-10 px-8 md:px-20">
      {/* Top Links Section */}
      <div className="flex flex-col md:flex-row justify-between w-241 mx-auto items-center text-center md:text-left space-y-6 md:space-y-0">
        <div className="md:space-y-4">
          <Link href="/shelves" className="hover:text-white cursor-pointer block text-3xl">
            On Our Shelves
          </Link>
          <Link href="/residents" className="hover:text-white cursor-pointer block text-3xl">
            Our Residents
          </Link>
        </div>
        <div className="md: space-y-4">
          <Link href="/inside" className="hover:text-white cursor-pointer block text-3xl">
            Inside Our Doors
          </Link>
          <Link href="/elevators" className="hover:text-white cursor-pointer block text-3xl">
            Elevator’s Waiting
          </Link>
        </div>
        <div className="md: space-y-4">
          <Link href="/grants" className="hover:text-white cursor-pointer block text-3xl">
            Grant Program
          </Link>
          <Link href="/inside" className="hover:text-white cursor-pointer block text-3xl">
            Inside Our Doors
          </Link>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center items-center space-x-5 my-8">
        <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
          <FaLinkedinIn className="text-white hover:text-gray-400 text-2xl" />
        </Link>
        <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
          <FaInstagram className="text-white hover:text-gray-400 text-2xl" />
        </Link>
        <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
          <FaXTwitter className="text-white hover:text-gray-400 text-2xl" />
        </Link>
      </div>

      <hr className="border-gray-600 my-6" />

      {/* Logo + Info Section */}
      <div className="flex flex-col items-center text-center space-y-3">
        <Image src={logo} alt="Apartment Logo" width={60} height={60} />
        <h1 className="text-white text-lg font-bold">APARTMENT</h1>
        <h1 className="text-white text-lg font-bold">ELEVEN ELEVEN</h1>

        <p className="text-white mt-2 font-medium text-sm">
          What If Everything Turns Out Exactly The Way You Dreamt?
        </p>

        <p className="mt-2 text-gray-400 text-sm">
          <span className="font-semibold text-white">Reach us at:</span>{" "}
          hello@apartmenteleveneleven.com
        </p>

        <p className="text-gray-400 text-sm">
          AltF Coworking Space, Success Tower, Sector - 65, Gurugram, Haryana 125849
        </p>

        <p className="text-gray-500 text-xs mt-3">Made with intention and purpose</p>

        {/* Policies */}
        <div className="flex flex-wrap justify-center space-x-4 text-sm mt-2">
          <Link href="/terms" className="hover:text-white">
            Terms & Conditions
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
    </footer>
  );
}
