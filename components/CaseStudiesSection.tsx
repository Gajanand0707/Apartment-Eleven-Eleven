import Image from "next/image";
import CaseStudyCard from "./CaseStudiesCard";

// bg texture
import pathbg from "../images/pathbg.png";

// card images (replace with your actual imports)
import case1 from "../images/case1.png";
import case2 from "../images/case2.png";

export default function CaseStudiesSection() {
  const caseStudies = [
    {
      image: case1,
      title: "A.I Transformation in New Age",
      buttonText: "Read full Case Study",
    },
    {
      image: case1,
      title: "A.I Transformation in New Age",
      buttonText: "Read full Case Study",
    },
    {
      image: case2,
      title: "A.I Transformation in New Age",
      buttonText: "Read full Case Study",
    },
    {
      image: case2,
      title: "A.I Transformation in New Age",
      buttonText: "Read full Case Study",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#D8CCBA] text-black flex flex-col items-center py-24 px-8">
      {/* Background texture */}
      <Image
        src={pathbg}
        alt="Section background texture"
        fill
        priority
        className="object-cover object-center opacity-60"
      />

      {/* Heading + subheading */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold mb-4 leading-[1.1]">
          Case Studies
        </h1>

        <p className="text-2xl md:text-3xl font-medium leading-snug">
          Deep dives into transformative projects that showcase innovation,
          impact, and measurable results.
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 max-w-6xl w-full">
        {caseStudies.map((item, i) => (
          <CaseStudyCard
            key={i}
            image={item.image}
            title={item.title}
            buttonText={item.buttonText}
          />
        ))}
      </div>

      {/* Bottom CTA button */}
      <button className="relative z-10 mt-16 bg-[#014A43] text-white text-lg font-semibold px-8 py-4 rounded-md hover:bg-[#016A60] transition-colors">
        Access All Case Studies
      </button>
    </section>
  );
}
