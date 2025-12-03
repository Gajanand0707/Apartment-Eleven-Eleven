
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import headerLogo from "../public/headerLogo.png";
import navLogo from "../public/navLogo.png";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const prevOverflow = typeof document !== 'undefined' ? document.body.style.overflow : '';
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflow || '';
    }
    return () => {
      if (typeof document !== 'undefined') document.body.style.overflow = prevOverflow || '';
    };
  }, [open]);

  // Close on route change (optional, if used in multiple pages with same layout)
  // You can wire this to next/navigation if needed.

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/elevators", label: "Elevator's Waiting" },
    { href: "/residents", label: "Our Residents" },
    { href: "/library", label: "Library" },
    { href: "/inside", label: "Inside Our Doors" },
  ];

  return (
    <div>
    <header className="w-full border-b border-black/10 bg-white sticky top-0 z-40">
    <style jsx global>{`
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          transform: translateY(0);
          z-index: 40;
        }
        header.navbar-hidden {
          transform: translateY(-100%);
          transition: transform 0.3s ease-in-out;
        }
        header.navbar-visible {
          transform: translateY(0);
          transition: transform 0.3s ease-in-out;
        }
        /* spacer that pushes page content below the fixed header when visible */
        header + #nav-spacer {
          height: 5rem; /* matches header's .h-20 */
          transition: height 0.3s ease-in-out;
        }
        header.navbar-hidden + #nav-spacer {
          height: 0;
        }
        header.navbar-visible + #nav-spacer {
          height: 5rem;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center">
          {/* Container with absolute positioning for mobile hamburger */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 border border-black/20 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black"
            >
              {open ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo - Centered on mobile, left on desktop */}
          <div className="flex-1 flex justify-center md:justify-start bg-white">
            <Link href="/" className="flex items-center bg-white">
              <Image
                src={headerLogo}
                alt="Logo"
                width={250}
                height={60}
                className="object-contain w-[180px] md:w-[250px] bg-white"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav - Right side */}
          <nav className="hidden md:flex items-center order-3">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-black hover:text-gray-700 text-xl md:text-2xl font-['Goudy_Bookletter_1911'] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu (full-page slide from left) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#D6CBBB] transform transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : '-translate-x-full'
          } z-50`}
      >
        {/* Header with close button and centered logo */}
        <div className="h-20 flex items-center justify-between bg-[#D6CBBB] px-4 border-b border-black/10">
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-black/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src={headerLogo}
              alt="Nav Logo"
              width={250}
              height={60}
              className="object-contain w-[180px]"
            />
          </div>
        </div>

        {/* Navigation Links - Centered */}
        <div className="flex flex-col h-full bg-[#D6CBBB]">

          <nav className="flex items-start bg-[#D6CBBB] w-full h-[100%] justify-center">
            <ul className="flex flex-col items-center gap-6 w-full h-[100vh] bg-[#D6CBBB]">
              {navItems.map((item) => (
                <li key={item.href} className="w-full text-center bg-[#D6CBBB]">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-2xl md:text-4xl bg-[#D6CBBB] font-['Goudy_Bookletter_1911'] text-black hover:text-gray-600 py-2 font-['Goudy_Bookletter_1911']"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        {/* NavLogo at bottom */}
        
        </div>
      </div>
    </header>

    {/* spacer: keeps page content from being hidden under the fixed header
      its height follows header visibility (collapsed when header is hidden) */}
    <div id="nav-spacer" aria-hidden="true" />

    </div>
  );
}

export default Navbar;

