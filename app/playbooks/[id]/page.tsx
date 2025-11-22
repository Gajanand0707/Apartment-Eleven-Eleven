"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { BiShareAlt } from "react-icons/bi";

export default function PlaybookPage() {
  const params = useParams();
  const [playbook, setPlaybook] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaybook() {
      try {
        // Fetch playbook by id (or documentId) and populate relations
        const res = await fetch(`https://proper-friendship-29e4bdb47f.strapiapp.com/api/playbooks/${params.id}?populate=*`);
        const json = await res.json();

        // json.data may be an object (Strapi single) or an array depending on endpoint used
        let raw: any = json.data;
        if (Array.isArray(raw)) {
          raw = raw.find((item: any) => item.documentId === params.id || item.id === Number(params.id)) ?? raw[0];
        }

        // Normalizer to unwrap Strapi v4 shapes (attributes / data)
        const unwrap = (val: any) => {
          if (!val) return val;
          if (val.data === null) return null;
          const d = val.data;
          if (Array.isArray(d)) return d.map((x: any) => (x.attributes ? { id: x.id, ...x.attributes } : x));
          return d.attributes ? { id: d.id, ...d.attributes } : d;
        };

        const normalize = (item: any) => {
          if (!item) return item;
          if (item.attributes) {
            const base = { id: item.id, ...item.attributes } as any;
            base.thumbnail = unwrap(base.thumbnail) ?? base.thumbnail;
            base.title_image = unwrap(base.title_image) ?? base.title_image;
            base.pdf = unwrap(base.pdf) ?? base.pdf;
            base.audio = unwrap(base.audio) ?? base.audio;
            return base;
          }
          return item;
        };

        const normalized = normalize(raw);
        setPlaybook(normalized ?? null);
      } catch (err) {
        console.error("Error fetching playbook:", err);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchPlaybook();
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!playbook) return <div className="text-center py-20">No playbook found</div>;

  return (
    <div>
      <div className="flex justify-between bg-[#0E4943] w-full min-h-20 items-center px-4 flex-wrap">
        <div className="flex items-center gap-2">
          <BiShareAlt size={28} color="white" className="" />
          <h1 className="text-white text-xl md:text-2xl  font-['Goudy_Old_style']]">Share</h1>
        </div>
        <div className="w-full md:w-auto text-center my-2 md:my-0">
          <h1 className="text-white text-2xl md:text-4xl font-['Goudy_Old_style']">{playbook?.title}</h1>
        </div>
        <div className="flex justify-center">
          <button className="text-xl md:text-2xl font-['Goudy_Old_style'] bg-[#FFAE00] py-2 px-5 text-white rounded-full">
            Subscribe
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-[#D5C7B3]">
        <main className="max-w-7xl mx-auto px-8 py-12 text-lg md:text-xl">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Thumbnail */}
      {(() => {
        const thumb: any = playbook.thumbnail;
        const fmt = thumb?.formats?.large ?? thumb?.formats?.medium ?? thumb?.formats?.small ?? thumb?.formats?.thumbnail ?? thumb;
        const url = fmt?.url;
        if (!url) return null;
        return (
          <div className="w-full rounded-2xl overflow-hidden">
            <div className="relative w-full h-64 md:h-[400px]">
              <Image src={url} alt={thumb?.alternativeText || "Thumbnail"} fill className="object-cover rounded-2xl" />
            </div>
          </div>
        );
      })()}

      {/* Title Image */}
      {(() => {
        const timg: any = playbook.title_image;
        const fmt = timg?.formats?.large ?? timg?.formats?.medium ?? timg?.formats?.small ?? timg?.formats?.thumbnail ?? timg;
        const url = fmt?.url;
        if (!url) return null;
        return (
          <div className="w-full rounded-2xl overflow-hidden">
            <div className="relative w-full h-52 md:h-[300px]">
              <Image src={url} alt={timg?.alternativeText || "Title image"} fill className="object-cover rounded-2xl" />
            </div>
          </div>
        );
      })()}

      {/* Title & Introduction */}
      <h1 className="text-4xl md:text-7xl font-['OPTIGoudy_Agency'] font-bold text-center mb-6">{playbook.title}</h1>
      <div className="mb-8">
        <p className="text-xl md:text-2xl font-['Goudy_Bookletter_1911'] leading-relaxed">{playbook.introduction}</p>
      </div>

      {/* Type Badge */}
     

      {/* PDF Viewer */}
      {(() => {
        const p: any = playbook.pdf;
        const pdfUrl = p?.url ?? p?.data?.attributes?.url ?? p?.data?.url;
        if (!pdfUrl) return null;
        return (
          <div className="mt-12 pt-8">
            {/* <h1 className="text-4xl md:text-5xl text-center font-bold">Download / View PDF</h1>
            <div className="text-center mt-4">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block mb-4 text-[#0E4943] hover:underline text-lg">
                Open PDF in new tab
              </a>
            </div> */}
            <div className="w-full h-[800px] border rounded overflow-hidden mt-6">
              <iframe src={pdfUrl} className="w-full h-full" title="Playbook PDF" />
            </div>
          </div>
        );
      })()}
          </div>
        </main>
      </div>
    </div>
  );
}
