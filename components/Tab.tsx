"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Tab } from "@/types/navigation";

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
      className="relative mx-auto w-[90%] sm:w-[95%] lg:w-full max-w-6xl h-12 sm:h-14 md:h-18 rounded-xl sm:rounded-2xl overflow-visible border border-black/40 bg-white shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
    >
      {/* Tabs */}
      <div
        className="relative z-10 grid h-full divide-x "
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
                "font-['OPTIGoudy Agency'] font-bold transition-all duration-300 ease-out",
                "text-[14px] md:text-2xl   lg:text-4xl ",
                "px-1 sm:px-2 md:px-4",

                // Active tab (persistent highlighted style)
                isActive
                  ? "bg-[#1F857A] text-white md:scale-[1.09] scale-[1.06]  border-2 border-black outline outline-2 outline-black outline-offset-[-1px] shadow-lg z-50 will-change-transform "
                  : "text-black hover:bg-white/80 hover:-translate-y-1  hover:shadow-[0_6px_12px_rgba(0,0,0,0.25)] z-10",

                // Rounded corners
                i === 0 ? "rounded-l-xl sm:rounded-l-2xl" : "",
                i === tabs.length - 1 ? "rounded-r-xl sm:rounded-r-2xl" : "",

                // Focus visible
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* No background image: solid white nav, selected tab will get teal bg */}
              <span className="relative z-20">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
