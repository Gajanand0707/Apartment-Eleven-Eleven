"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BiShareAlt } from "react-icons/bi";

export default function PlaybookPage() {
  const params = useParams();
  const [playbook, setPlaybook] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  if (loading) return <div className="text-center py-20 font-goudy">Loading...</div>;
  if (!playbook) return <div className="text-center py-20 font-goudy">No playbook found</div>;

  return (
    <div className="pt-20">
      <div className="flex flex-col md:flex-row justify-between bg-[#0E4943] w-full items-center px-4 py-6 md:py-6 gap-3 md:gap-4 relative z-10">

        <div className="flex-1 flex items-center justify-center text-center px-2 min-w-0 order-1 md:order-2 w-full md:w-auto">
          <h1 className="text-white text-2xl max-w-[630px] mx-auto text-center md:text-4xl font-goudy-old font-bold md:line-clamp-2">{playbook?.title}</h1>
        </div>

        <div className="w-full md:w-auto flex flex-row items-center justify-center gap-3 md:gap-0 order-2 md:contents">
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href)
              } catch (e) {
                const ta = document.createElement('textarea')
                ta.value = window.location.href
                document.body.appendChild(ta)
                ta.select()
                document.execCommand('copy')
                document.body.removeChild(ta)
              }
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            aria-label="Copy page URL"
            className="flex items-center gap-2 justify-center text-white flex-shrink-0 md:w-[200px] md:order-1"
          >
            <BiShareAlt size={45} color="white" className="" />
            <span className="text-white text-sm md:text-lg font-goudy-old font-semibold">{copied ? 'Copied!' : ''}</span>
          </button>

          <div className="flex-shrink-0 md:w-[200px] flex justify-end md:order-3">
            <button className="text-2xl px-16  md:text-4xl bg-[#FFAE00AB] py-1.5  md:py-1 md:px-8 md:mx-2 text-white text-center font-goudy rounded-full whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="min-h-screen bg-[#D5C7B3]">
        <main className="max-w-7xl mx-auto px-8 py-12 text-lg md:text-xl">
          {/* Back Button */}
          <Link
            href="/playbooks"
            className="inline-block mb-8  hover:text-gray-600 font-goudy text-xl md:text-2xl transition-colors"
          >
            ← Back to Playbooks
          </Link>

          <article className="bg-[#D5C7B3]   border-gray-800 overflow-hidden ">
            {/* Title Image */}
            {(() => {
              const timg: any = playbook.title_image ?? playbook.thumbnail;
              const fmt = timg?.formats?.large ?? timg?.formats?.medium ?? timg?.formats?.small ?? timg?.formats?.thumbnail ?? timg;
              const url = fmt?.url;
              if (!url) return null;
              return (
                <div className="w-full mb-6">
                  <div className="w-full rounded-4xl overflow-hidden relative h-64 md:h-[796px]">
                    <Image src={url} alt={timg?.alternativeText || "Title image"} fill className="object-cover" />
                  </div>
                </div>
              );
            })()}

            <div className="p-2 text-justify md:text-left">
              {/* Title & Introduction */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-goudy-old font-bold text-center  leading-tight tracking-tight mb-6 w-full">{playbook.title}</h1>

              <div className="mt-8 text-center mb-8 mx-auto">
                <p className="text-xl md:text-2xl text-center font-goudy mx-auto">
                  {new Date(playbook.publishedAt || playbook.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

            <div className="mb-8">
              <p className="text-[20px] md:text-2xl font-goudy leading-relaxed">{playbook.introduction}</p>
            </div>

            {/* Type Badge */}


            {/* PDF Viewer */}
            {(() => {
              const p: any = playbook.pdf;
              const pdfUrl = p?.url ?? p?.data?.attributes?.url ?? p?.data?.url;
              if (!pdfUrl) return null;
              return (
                <div className="mt-12 pt-8">
                  <div className="w-full h-[800px] border rounded overflow-hidden mt-6">
                    <iframe src={pdfUrl} className="w-full h-full" title="Playbook PDF" />
                  </div>
                </div>
              );
            })()}

            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
