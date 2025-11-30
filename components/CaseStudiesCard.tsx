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
    <div className="bg-[#E6E3DE] rounded-3xl overflow-hidden shadow-md w-full">
      <div className="flex flex-col md:flex-row">
        {/* Image on left for md+, top for mobile */}
        <div className="relative w-full md:w-1/3 h-56 md:h-auto">
          <Image src={image} alt={title} fill className="object-cover object-center" sizes="(max-width:768px) 100vw, 33vw" />
        </div>

        {/* Content on right */}
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-black font-['Playfair_Display'] leading-snug">
              {title}
            </h3>

            {intro && (
              <p className="mt-3 text-xl md:text-2xl  font-['Goudy_Bookletter_1911'] leading-relaxed">
                {intro}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            {readMoreUrl ? (
              <Link
                href={readMoreUrl}
                className="text-white text-xl md:text-2xl font-['Goudy_Bookletter_1911'] font-semibold px-6 py-3 rounded-md transition-all"
                style={{
                  backgroundImage: "url('/texture.png')",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {buttonText}
              </Link>
            ) : (
              <button
                className="text-white text-xl md:text-2xl font-['Goudy_Bookletter_1911'] font-semibold px-6 py-3 rounded-md transition-all"
                style={{
                  backgroundImage: "url('/texture.png')",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
