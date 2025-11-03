import Image, { StaticImageData } from "next/image";

export interface TeamCardProps {
  image: StaticImageData;
  name: string;
}

export default function TeamCard({ image, name }: TeamCardProps) {
  return (
    <div className="relative bg-[#E7DFD2] rounded-[24px]  overflow-hidden flex flex-col text-center w-[380px] h-[400px] md:w-[440px] md:h-[320px] shadow-md">
      {/* Image Section */}
      <div className="relative w-full h-[80%] rounded-t-none overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top rounded-t-none"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="relative z-10 bg-[#E7DFD2] py-4">
        <h3 className="font-['Playfair_Display'] font-semibold text-[22px] leading-snug text-black">
          {name}
        </h3>
      </div>
    </div>
  );
}
