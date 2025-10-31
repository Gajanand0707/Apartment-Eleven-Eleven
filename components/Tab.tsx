"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Tab } from "@/types/navigation";

import pathbg from "../public/pathbg.png";
import texture from "../public/texture.png"

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
        relative mx-auto w-full max-w-5xl h-16
        rounded-2xl overflow-hidden border border-black/40
        bg-transparent bg-white
        shadow-[0_6px_14px_rgba(0,0,0,0.25)]
      "
    >
      {/* BG image (visible) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={texture}
          alt="Navigation background"
          fill
          priority
          className="object-cover "
        />
      </div>

      {/* Optional subtle vignette for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/10" />

      {/* Tabs (above bg) */}
      <div
        className="relative z-10 grid h-full divide-x-2 divide-black/60"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((tab, i) => {
          const isActive = activeTab.id === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={[
                "flex items-center justify-center h-full",
                "text-3xl font-serif font-bold transition-all duration-300",
                // Marble shows through these semi-opaque layers:
                isActive
                  ? "bg-orange-300/90 text-gray-900 shadow-[inset_0_-2px_0_rgba(0,0,0,0.35)]"
                  : "bg-white/55 hover:bg-white/70 text-gray-900",
                i === 0 ? "rounded-l-2xl" : "",
                i === tabs.length - 1 ? "rounded-r-2xl" : "",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
              ].join(" ")}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
