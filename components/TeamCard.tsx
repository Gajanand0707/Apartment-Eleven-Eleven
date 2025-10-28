import Image, { StaticImageData } from "next/image";

export interface TeamCardProps {
  image: StaticImageData;
  name: string;
}

export default function TeamCard({ image, name }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center w-[280px] md:w-[350px] rounded-[24px] overflow-hidden shadow-sm">
      {/* Image Container */}
      <div className="relative w-full h-[350px] md:h-[420px] rounded-t-[24px] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(max-width:768px) 100vw, 350px"
        />
      </div>

      {/* Name Box */}
      <div className="bg-[#EDEAE4] text-black text-xl md:text-2xl font-semibold font-['Playfair_Display'] text-center py-6 w-full rounded-b-[24px]">
        {name}
      </div>
    </div>
  );
}
