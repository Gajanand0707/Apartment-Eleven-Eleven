import Image from "next/image";
import Link from "next/link";

export interface CaseStudyCardProps {
  image: string | any;
  title: string;
  buttonText: string;
  readMoreUrl?: string;
}

export default function CaseStudyCard({
  image,
  title,
  buttonText,
  readMoreUrl,
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

        {readMoreUrl ? (
          <Link href={readMoreUrl} className="bg-[#001B70] text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-[#0025A0] transition-colors">
            {buttonText}
          </Link>
        ) : (
          <button className="bg-[#001B70] text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-[#0025A0] transition-colors">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
