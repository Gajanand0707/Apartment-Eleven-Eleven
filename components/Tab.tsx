"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Tab } from "@/types/navigation";
import tabbg from "../public/tabbg.jpg"
import tabbg2 from "../public/tabbg2.png"

import texture from "../public/texture.png";

interface TabNavigationProps {
  tabs: Tab[];
}

export function TabNavigation({ tabs }: TabNavigationProps) {
  const pathname = usePathname();
  const activeTab =
    tabs.find((t) => pathname === t.href || pathname.startsWith(t.href + "/")) ||
    tabs[0];

  return (
    <nav
      className="
        relative mx-auto w-[90%] sm:w-[95%] md:w-full 
        max-w-5xl h-12 sm:h-14 md:h-16
        rounded-xl sm:rounded-2xl overflow-hidden border border-black/40
        bg-[#D5C7B3]
        shadow-[0_6px_14px_rgba(0,0,0,0.25)]
      "
    >
      {/* Tabs */}
      <div
        className="relative z-10 grid h-full divide-x"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((tab, i) => {
          const isActive = activeTab.id === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={[
                "relative flex items-center justify-center h-full text-center leading-none select-none overflow-hidden",
                "font-serif font-bold transition-all duration-300 ease-out",
                "text-base sm:text-lg md:text-2xl lg:text-3xl",
                "px-1 sm:px-2 md:px-4",

                // Active tab (persistent highlighted style)
                isActive
                  ? "text-gray-900 scale-[1.06] -translate-y-1 border-2 border-black/60 shadow-[0_12px_30px_rgba(0,0,0,0.45)] z-20 will-change-transform"
                  : "text-gray-800 hover:bg-white/80 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_6px_12px_rgba(0,0,0,0.25)] z-10",

                // Rounded corners
                i === 0 ? "rounded-l-xl sm:rounded-l-2xl" : "",
                i === tabs.length - 1 ? "rounded-r-xl sm:rounded-r-2xl" : "",

                // Focus visible
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Background image - tabbg for all tabs */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={tabbg}
                  alt=""
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              
              {/* Color overlay only for active tab */}
              {/* No additional side block; keep only the subtle shadow for the active tab */}
              <span className="relative z-20">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
