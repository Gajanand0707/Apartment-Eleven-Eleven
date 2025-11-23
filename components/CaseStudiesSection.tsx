"use client";
import Image from "next/image";
import Link from "next/link";
import CaseStudyCard from "./CaseStudiesCard";

// bg texture
import pathbg from "../public/pathbg.png";

// card images (replace with your actual imports)
import case1 from "../public/case1.png";
import case2 from "../public/case2.png";
import { useEffect, useState } from "react";

type Article = {
  image: any
  title: string
  buttonText: string
  description: string
  readMoreUrl: string
  date: string
}

export default function CaseStudiesSection({ limit }: { limit?: number }) {
  const [blogs, setBlogs] = useState<Article[]>([]);

  // Note: image extraction is done inline in the fetch mapping below.

  useEffect( () =>{
    const fetchedBlogs = async () =>{
      try {
        const res = await fetch("https://proper-friendship-29e4bdb47f.strapiapp.com/api/case-studies/?populate=*");

         if (!res.ok) throw new Error("Failed to fetch deepdives");
                const json = await res.json();

          const mapped  = (json.data || []).map((entry:any) =>{
                // Use the same simple extraction as the Deepdives list: prefer direct thumbnail.url
                const img = entry.thumbnail?.url || (Array.isArray(entry.thumbnail) && entry.thumbnail[0]?.url) || entry.summary_image?.url || entry.title_image?.url || ''

                return {
                  image: img,
                  title: entry.title ?? '',
                  buttonText: entry.button_text ?? 'Read Full Case Study',
                  description: entry.introduction,
                  readMoreUrl: `/caseStudy/${entry.documentId}`,
                  date: entry.publishedAt || entry.createdAt,
                }
              })
          setBlogs(mapped);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      }
    }
    fetchedBlogs();
  }, []) 


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
        <h1 className="text-4xl md:text-7xl font-[OPTIGoudy_Agency] font-bold mb-4 leading-[1.1]">
          Case Studies
        </h1>

        <p className="text-2xl md:text-4xl" style={{ fontFamily: "'Goudy_Old_Style', serif" }}>
          Deep dives into transformative projects that showcase innovation,
          impact, and measurable results.
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 max-w-6xl w-full">
        {(typeof limit === "number" ? blogs.slice(0, limit) : blogs).map((item, i) => (
          <CaseStudyCard
            key={i}
            image={item.image}
            title={item.title}
            buttonText={item.buttonText}
            readMoreUrl={item.readMoreUrl}
          />
        ))}
      </div>

      {/* Bottom CTA button (only show when limited) */}
      {typeof limit === "number" && (
        <Link href="/caseStudy" className="relative z-10 mt-16 inline-block">
          <span className="bg-[#014A43] text-white text-lg font-semibold px-8 py-4 rounded-md hover:bg-[#016A60] transition-colors">
            Access All Case Studies
          </span>
        </Link>
      )}
    </section>
  );
}
