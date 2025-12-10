import Image from "next/image";
import Link from "next/link";

export interface CaseStudyCardProps {
  image: string | any;
  title: string;
  buttonText: string;
  description?: string | null;
  readMoreUrl?: string;
}

export default function CaseStudyCard({
  image,
  title,
  buttonText,
  description,
  readMoreUrl,
}: CaseStudyCardProps) {
  const maxIntro = 180;
  const intro = description ? (description.length > maxIntro ? description.slice(0, maxIntro).trimEnd() + '...' : description) : '';

  return (
    <Link href={readMoreUrl || "#"}>
      <div className="bg-[#EBEBEB] rounded-[56px] overflow-hidden shadow-md w-full md:max-w-[467px] mx-auto cursor-pointer">
        <div className="flex flex-col">
          {/* Image on top */}
          <div className="relative w-full h-[309px]">
            <Image src={image} alt={title} fill className="object-cover object-center" sizes="100vw" />
          </div>

          {/* Content below image */}
          <div className="p-6 flex flex-col items-center justify-between">
            <div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-center max-w-[321px] text-black font-[Goudy_Old_Style] ">
                {title}
              </h3>
            </div>

            <div className="mt-14 flex items-center justify-center gap-4">
              <span
                className="text-white text-2xl md:text-4xl font-['Goudy_Bookletter_1911'] text-nowrap font-semibold px-6 py-3 rounded-4xl transition-all pointer-events-none block"
                style={{
                  backgroundImage: "url('/texture.png')",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {buttonText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
