import Image, { StaticImageData } from "next/image";

export interface TeamCardProps {
  image: StaticImageData;
  name: string;
}

export default function TeamCard({ image, name }: TeamCardProps) {
  return (
    <div className="relative bg-[#EBEBEB] rounded-[56px] border-2 overflow-hidden flex flex-col text-center w-[380px] md:w-[540px] h-[400px]  md:h-[600px] shadow-md">
      {/* Image Section */}
      <div className="relative w-full h-[90%] rounded-t-none overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top rounded-t-none"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="relative z-10 bg-[#EBEBEB] border-t-2 py-4">
        <h3 className="font-[Goudy_Old_Style] text-center font-semibold text-2xl md:text-4xl leading-snug text-black">
          {name}
        </h3>
      </div>
    </div>
  );
}
