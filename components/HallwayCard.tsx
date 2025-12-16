import React from "react";

export interface HallwayCardProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  highlight?: boolean; // center card gets bigger radius and size
}

export default function HallwayCard({
  quote,
  name,
  title,
  company,
  highlight = false,
}: HallwayCardProps) {
  return (
    <div
      className={
        [
          // base shared styles
          "bg-[#F5F2EE]/80 text-black",
          "shadow-[0_30px_60px_rgba(0,0,0,0.4)]",
          "flex flex-col items-center text-center",
          "border border-black/5",
          // figma rounded corners: outer=24px, center=28px+
          highlight ? "rounded-[28px]" : "rounded-[20px]",
          // spacing / sizing
          highlight
            ? "px-8 py-10 w-[360px] md:w-[420px]"
            : "px-8 py-10 w-[320px] md:w-[360px]"
        ].join(" ")
      }
    >
      <p className="text-xl md:text-2xl font-normal leading-snug font-['Goudy Bookletter 1911'] mb-8">
        &quot;{quote}&quot;
      </p>

      <div className="text-2xl md:text-3xl font-['Goudy Old Style'] font-medium leading-tight mb-4">
        {name}
      </div>

      <div className="text-lg md:text-xl font-['Goudy Old Style'] leading-tight italic">
        ({title})
      </div>

      <div className="text-lg md:text-xl font-['Goudy Old Style'] leading-tight mt-2">
        {company}
      </div>
    </div>
  );
}
