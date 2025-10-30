// import Image from "next/image";
// import Link from "next/link";
// import logo from "../public/logo.png";

// export function Navbar() {
//     return (
//         <div className="w-full flex justify-between items-center px-8 h-30">
//             {/* Left side: Logo + Title */}
//             <div className="flex items-center space-x-2 ml-30">
//                 <Image
//                     src={logo}
//                     alt="Logo"
//                     width={60}
//                     height={60}
//                     className="object-contain"
//                 />

//                 <div className="flex flex-col leading-[0.6] -space-y-2">
//                     <h1 className="text-black text-2xl font-bold p-0">APARTMENT</h1>
//                     <h1 className="text-black text-2xl p-0">ELEVEN ELEVEN</h1>
//                 </div>
//             </div>

//             {/* Right side: Navigation */}
//             <ul className="flex space-x-6 mr-30">
//                 <li>
//                     <Link href="/" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Home</Link>
//                 </li>
//                 <li>
//                     <Link href="/elevators" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Elevator's Waiting</Link>
//                 </li>
//                 <li>
//                     <Link href="/residents" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Our Residents</Link>
//                 </li>
//                 <li>
//                     <Link href="/library" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Library</Link>
//                 </li>
//                 <li>
//                     <Link href="/inside" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Inside Our Doors</Link>
//                 </li>
//             </ul>
//         </div>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <header className="w-full border-b border-black/10 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
              <div className="leading-[0.9]">
                <h1 className="text-black text-xl sm:text-2xl font-bold">APARTMENT</h1>
                <h2 className="text-black text-xl sm:text-2xl">ELEVEN ELEVEN</h2>
              </div>
            </Link>
          </div>

          {/* Right: Desktop Nav */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-black hover:text-gray-700 text-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 border border-black/20 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black"
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
      </div>

      {/* Mobile Menu (slide-down) */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-4 sm:px-6 lg:px-8 pb-4">
          <ul className="flex flex-col gap-2 pt-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-md px-3 py-3 text-base text-black hover:bg-black/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

