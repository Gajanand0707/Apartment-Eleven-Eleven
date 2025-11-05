"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Tab } from "@/types/navigation";

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
        bg-transparent bg-white
        shadow-[0_6px_14px_rgba(0,0,0,0.25)]
      "
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={texture}
          alt="Navigation background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/10" />

      {/* Tabs */}
      <div
        className="relative z-10 grid h-full divide-x divide-black/50"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((tab, i) => {
          const isActive = activeTab.id === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={[
                "flex items-center justify-center h-full text-center leading-none select-none",
                "font-serif font-bold transition-all duration-300 ease-out",
                "text-base sm:text-lg md:text-2xl lg:text-3xl",
                "px-1 sm:px-2 md:px-4",

                // Active tab (persistent highlighted style)
                isActive
                  ? "bg-orange-400 text-gray-900 scale-[1.08] -translate-y-[4px] shadow-[0_8px_18px_rgba(0,0,0,0.35)] border-b-4 border-orange-600"
                  : "bg-white/60 text-gray-800 hover:bg-white/80 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_6px_12px_rgba(0,0,0,0.25)]",

                // Rounded corners
                i === 0 ? "rounded-l-xl sm:rounded-l-2xl" : "",
                i === tabs.length - 1 ? "rounded-r-xl sm:rounded-r-2xl" : "",

                // Focus visible
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
