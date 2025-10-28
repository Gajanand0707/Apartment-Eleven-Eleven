import Image, { StaticImageData } from "next/image";

export interface CaseStudyCardProps {
  image: StaticImageData;
  title: string;
  buttonText: string;
}

export default function CaseStudyCard({
  image,
  title,
  buttonText,
}: CaseStudyCardProps) {
  return (
    <div className="bg-[#E6E3DE] rounded-2xl overflow-hidden shadow-md flex flex-col">
      {/* Image */}
      <div className="w-full h-[250px] relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center py-6 px-4 gap-4">
        <h3 className="text-xl font-semibold text-center text-black font-['Playfair_Display'] leading-snug">
          {title}
        </h3>

        <button className="bg-[#001B70] text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-[#0025A0] transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
