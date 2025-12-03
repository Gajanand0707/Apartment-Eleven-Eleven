"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BiShareAlt } from "react-icons/bi";

interface DeepDive {
  id: number;
  documentId: string;
  // Blog-style fields
  article_name?: string;
  title_introduction?: string;
  // DeepDive API-style fields
  title?: string;
  introduction?: string;
  image_position: string | null;
  summary: string;
  conclusion_heading: string;
  conclusion_description: string;
  conclusion?: Array<{
    id: number;
    conclusion_heading?: string;
    conclusion_description?: string;
    slogan?: string | null;
  }>;
  reference?: Array<{
    id: number;
    label?: string;
    url?: string;
  }>;
  audio?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail?: {
    url: string;
    alternativeText: string | null;
    formats?: any;
    width?: number;
    height?: number;
  };
  title_image?: {
    url: string;
    alternativeText: string | null;
    formats?: any;
    width?: number;
    height?: number;
  };
  // blog-style headings
  article_heading?: Array<{
    id: number;
    heading_title: string;
    slogan: string;
    article_subheading: Array<{
      id: number;
      title: string;
      description: string;
      image?: {
        url: string;
        alternativeText: string | null;
        formats?: any;
        width?: number;
        height?: number;
      };
      video: any | null;
      pdf: any | null;
    }>;
  }>;
  // deepdive-style headings
  heading?: Array<{
    id: number;
    heading_title: string;
    slogan: string | null;
    deepdive_subheading?: Array<{
      id: number;
      title: string;
      description: string;
      image?: {
        url: string;
        alternativeText: string | null;
        formats?: any;
        width?: number;
        height?: number;
      };
      video?: any | null;
      pdf?: any | null;
    }>;
  }>;
}

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<DeepDive | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(
          `https://proper-friendship-29e4bdb47f.strapiapp.com/api/case-studies/${params.id}?populate[audio]=true&populate[title_image]=true&populate[heading][populate][subheading][populate]=*&populate[conclusion]=true&populate[reference]=*
`
        );

       
        if (!res.ok) throw new Error("Failed to fetch deepdive");

        const data = await res.json();

        // data.data can be an object or an array depending on the endpoint/config.
        // Normalize to the same shape the blog page expects by mapping field names.
        const resData = data.data;
        let raw: any = null;
        if (Array.isArray(resData)) {
          raw = resData.find((item: any) => item.documentId === params.id || item.id === Number(params.id)) ?? resData[0];
        } else {
          raw = resData;
        }

        if (!raw) {
          throw new Error('DeepDive not found')
        }

        // Normalize Strapi response shapes: some endpoints return { id, attributes }
        const normalize = (item: any) => {
          if (!item) return item;
          // If Strapi v4 shape
          if (item.attributes) {
            const base = { id: item.id, ...item.attributes } as any;

            // Helper to unwrap relation fields that come as { data: ... }
            const unwrap = (val: any) => {
              if (!val) return val;
              if (val.data === null) return null;
              const d = val.data;
              if (Array.isArray(d)) return d.map((x: any) => (x.attributes ? { id: x.id, ...x.attributes } : x));
              return d.attributes ? { id: d.id, ...d.attributes } : d;
            };

            // Unwrap common populated fields
            base.reference = unwrap(base.reference) ?? base.reference;
            base.audio = unwrap(base.audio) ?? base.audio;
            base.thumbnail = unwrap(base.thumbnail) ?? base.thumbnail;
            base.title_image = unwrap(base.title_image) ?? base.title_image;
            base.heading = unwrap(base.heading) ?? base.heading;
            base.conclusion = unwrap(base.conclusion) ?? base.conclusion;

            // If heading items contain deepdive_subheading in nested data, normalize them too
            if (Array.isArray(base.heading)) {
              base.heading = base.heading.map((h: any) => {
                if (h.deepdive_subheading && h.deepdive_subheading.data) {
                  h.deepdive_subheading = Array.isArray(h.deepdive_subheading.data)
                    ? h.deepdive_subheading.data.map((s: any) => (s.attributes ? { id: s.id, ...s.attributes } : s))
                    : (h.deepdive_subheading.data.attributes ? { id: h.deepdive_subheading.data.id, ...h.deepdive_subheading.data.attributes } : h.deepdive_subheading.data);
                }

                // If subheadings exist, unwrap their media fields too
                if (Array.isArray(h.deepdive_subheading)) {
                  h.deepdive_subheading = h.deepdive_subheading.map((s: any) => {
                    if (s.image && s.image.data) s.image = s.image.data.attributes ? { id: s.image.data.id, ...s.image.data.attributes } : s.image.data;
                    if (s.video && s.video.data) s.video = s.video.data.attributes ? { id: s.video.data.id, ...s.video.data.attributes } : s.video.data;
                    if (s.pdf && s.pdf.data) s.pdf = s.pdf.data.attributes ? { id: s.pdf.data.id, ...s.pdf.data.attributes } : s.pdf.data;
                    return s;
                  });
                }

                return h;
              });
            }

            return base;
          }
          return item;
        };

        const normalized = normalize(raw);
        setArticle(normalized as DeepDive);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchArticle();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D5C7B3] flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#D5C7B3] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-4">Error loading article</p>
          <Link href="/deepdive" className="text-blue-600 hover:underline">
            Back to Deep Dive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between bg-[#0E4943] w-full items-center px-4 py-4 md:py-0">

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
          className="flex items-center gap-2 justify-center md:justify-start w-full md:w-auto mb-2 md:mb-0 text-white"
        >
          <BiShareAlt size={28} color="white" className="" />
          <span className="text-white text-lg md:text-2xl font-[Goudy_Old_Style] font-semibold">{copied ? 'Copied!' : 'Share'}</span>
        </button>

        <div className="w-full md:w-auto text-center my-2 md:my-0 px-2">
          <h1 className="text-white text-xl md:text-4xl font-[Goudy_Old_Style] font-bold max-w-[630px] mx-auto wrap-break-word">
            {article.title ?? article.article_name}
          </h1>
        </div>

        <div className="flex justify-center w-full md:w-auto mt-2 md:mt-0">
          <button className="text-lg md:text-2xl bg-[#FFAE00] py-2 px-5 font-['Goudy_Bookletter_1911'] text-white rounded-full">
            Subscribe
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-[#D5C7B3]">
        <main className="max-w-7xl mx-auto px-8 py-12 text-lg md:text-xl">
          {/* Back Button */}
          <Link
            href="/caseStudy"
            className="inline-block mb-8 hover:text-gray-600 font-medium"
          >
            ← Back to Case Studies
          </Link>

          {/* Article Header */}
          <article className="bg-[#D5C7B3] border-gray-800 overflow-hidden">
            {/* Title Image */}
            {(() => {
              // Prefer title_image -> thumbnail -> first subheading image
              let srcCandidate: any = article.title_image ?? article.thumbnail ?? null;

              // Try to find a subheading image if top-level images are missing
              if (!srcCandidate && Array.isArray(article.heading)) {
                for (const h of article.heading) {
                  const hh: any = h;
                  const subs = hh.subheading ?? hh.deepdive_subheading ?? hh.article_subheading ?? [];
                  if (Array.isArray(subs)) {
                    for (const s of subs) {
                      const img = Array.isArray(s.image) ? s.image[0] : s.image;
                      if (img) {
                        srcCandidate = img;
                        break;
                      }
                    }
                  }
                  if (srcCandidate) break;
                }
              }

              if (!srcCandidate) return null;

              // srcCandidate may be a string URL or an object with formats/url
              const resolveUrl = (c: any) => {
                if (!c) return null;
                if (typeof c === 'string') return c;
                const fmt = c?.formats ?? c;
                // prefer small/medium/thumbnail/large
                const chosen = fmt?.small?.url ?? fmt?.medium?.url ?? fmt?.thumbnail?.url ?? fmt?.large?.url ?? fmt?.url ?? c?.url;
                return chosen;
              };

              const url = resolveUrl(srcCandidate);
              if (!url) return null;
              const finalUrl = url.startsWith('http') ? url : url;
              const alt = (srcCandidate?.alternativeText ?? srcCandidate?.caption) || (article.title ?? article.article_name) || '';

              return (
                <div className="w-full mb-6">
                  <div className="w-full rounded-3xl overflow-hidden relative h-64 md:h-[650px]">
                    <Image src={finalUrl} alt={alt} fill className="object-cover" />
                  </div>
                </div>
              );
            })()}

            <div className="p-2 text-justify md:text-left">
              {/* Article Title */}
              <h1 className="text-4xl md:text-7xl font-['OPTIGoudy_Agency'] font-bold text-center mb-6">
                {article.title ?? article.article_name}
              </h1>

              {/* Published date (placed below title) */}
              <div className="mb-4 text-center">
                <p className="text-sm md:text-base ">{new Date(article.publishedAt || article.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] leading-relaxed">
                  {article.introduction ?? article.title_introduction}
                </p>
              </div>

              {/* Audio (placed after introduction) */}
              {(() => {
                const a: any = article.audio;
                let audioUrl: string | undefined;
                if (Array.isArray(a)) {
                  audioUrl = a[0]?.url ?? a[0]?.data?.attributes?.url ?? a[0]?.data?.url;
                } else {
                  audioUrl = a?.url ?? a?.data?.attributes?.url ?? a?.data?.url;
                }
                if (!audioUrl) return null;
                return (
                  <div className="mb-6">
                    <audio controls src={audioUrl} className="w-full">Your browser does not support the audio element.</audio>
                  </div>
                );
              })()}

              {/* Article Headings and Subheadings */}
              {(() => {
                const headings = (article.article_heading ?? article.heading) as any[] | undefined;
                if (!headings || headings.length === 0) return null;
                return (
                  <div className="space-y-12">
                    {headings.map((heading, idx) => {
                      const subs = heading.article_subheading ?? heading.deepdive_subheading ?? heading.subheading ?? [];
                      return (
                        <div key={heading.id} className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="text-4xl md:text-5xl font-bold text-[#111] w-10 md:w-12 shrink-0 text-right">
                              {idx + 1}.
                            </div>
                            <h2 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] font-bold mb-2">
                              {heading.heading_title}
                            </h2>
                          </div>

                          {/* Subheadings */}
                          {subs && subs.length > 0 && (
                            <div className="space-y-8">
                              {subs.map((subheading: any) => (
                                <div key={subheading.id} className="space-y-4">
                                  <h3 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] font-semibold">
                                    {subheading.title}
                                  </h3>
                                  <p className="text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] leading-relaxed">
                                    {subheading.description}
                                  </p>

                                  {/* Subheading Image */}
                                  {(subheading.image && (subheading.image.url || (Array.isArray(subheading.image) && subheading.image[0]?.url))) && (
                                    <div className="relative w-full h-80 rounded-3xl overflow-hidden my-6">
                                      <Image
                                        src={(Array.isArray(subheading.image) ? subheading.image[0]?.url : subheading.image.url)}
                                        alt={(Array.isArray(subheading.image) ? subheading.image[0]?.alternativeText : subheading.image.alternativeText) || subheading.title}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  )}

                                  {/* Subheading Video */}
                                  {(() => {
                                    const v: any = subheading.video;
                                    const firstV = Array.isArray(v) ? v[0] : v;
                                    const vUrl = firstV?.url ?? firstV?.data?.attributes?.url ?? firstV?.data?.url;
                                    if (!vUrl) return null;
                                    return (
                                      <div className="w-full my-6 rounded-2xl overflow-hidden">
                                        <div className="relative w-full h-64 bg-black">
                                          <video controls src={vUrl} className="w-full h-full object-contain" />
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  {/* Subheading PDF */}
                                  {(() => {
                                    const p: any = subheading.pdf;
                                    const firstP = Array.isArray(p) ? p[0] : p;
                                    const pdfUrl = firstP?.url ?? firstP?.data?.attributes?.url ?? firstP?.data?.url;
                                    if (!pdfUrl) return null;
                                    return (
                                      <div className="my-4">
                                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#0E4943] text-white px-6 py-3 rounded-full hover:bg-[#0d3f3a] transition">View PDF Document</a>
                                      </div>
                                    );
                                  })()}
                                </div>
                              ))}
                            </div>
                          )}

                          <div>
                            {heading.slogan && (
                              <p className="text-2xl md:text-4xl text-center font-semibold font-['OPTIGoudy_Agency'] max-w-[670px] justify-center mx-auto mb-4">{heading.slogan}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Summary */}
              {article.summary && (
                <div className="mb-8 p-6 rounded-2xl">
                  {(() => {
                    const thumb: any = article.thumbnail;
                    const imgFormat = thumb?.formats?.large ?? thumb?.formats?.medium ?? thumb?.formats?.small ?? thumb?.formats?.thumbnail ?? thumb;
                    const imgUrl = imgFormat?.url;
                    const imgW = imgFormat?.width;
                    const imgH = imgFormat?.height;
                    const hasImage = Boolean(imgUrl);
                    const isLeft = article.image_position === 'left';

                    if (!hasImage) {
                      return (
                        <div className="flex items-center justify-center text-center py-6">
                          <p className="text-[20px] md:text-2xl leading-relaxed mx-auto font-['Goudy_Bookletter_1911']">{article.summary}</p>
                        </div>
                      );
                    }

                    const finalUrl = imgUrl!.startsWith('http') ? imgUrl! : imgUrl!;
                    const rowClass = isLeft ? 'md:flex-row-reverse' : 'md:flex-row';

                    return (
                      <div className={`flex flex-col md:items-center md:gap-6 ${rowClass}`}>
                          <div className="flex-1 col-span-2 flex items-center justify-center text-center py-6">
                          <p className="text-[20px] md:text-2xl leading-relaxed font-['Goudy_Bookletter_1911']">{article.summary}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:w-1/3 md:shrink-0">
                          <div className="w-full rounded-3xl overflow-hidden">
                            <Image src={finalUrl} alt={(article.title ?? article.article_name) ?? ''} width={imgW || 800} height={imgH || 600} className="object-cover w-full h-48 md:h-64 rounded-3xl" />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Conclusion */}
              {article.conclusion && article.conclusion.length > 0 && (
                <div className="mt-12 pt-8 space-y-8">
                  <h1 className="text-2xl md:text-4xl text-center font-['OPTIGoudy_Agency'] font-bold">Conclusion</h1>
                  {article.conclusion.map((c) => (
                    <div key={c.id}>
                      {c.conclusion_heading && (
                        <h2 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] font-bold text-gray-900 mb-2">
                          {c.conclusion_heading}
                        </h2>
                      )}
                      {c.conclusion_description && (
                        <p className="text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] leading-relaxed">
                          {c.conclusion_description}
                        </p>
                      )}
                      {c.slogan && (
                        <p className="text-2xl md:text-4xl text-center font-semibold font-['OPTIGoudy_Agency'] max-w-[670px] justify-center mx-auto mb-4">{c.slogan}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* References */}
              {article.reference && article.reference.length > 0 && (
                <div className="mt-12 pt-8">
                  <h1 className="text-2xl md:text-4xl text-center font-['OPTIGoudy_Agency'] font-bold">References</h1>
                  <ul className="mt-4 space-y-3 list-disc list-inside text-lg">
                    {article.reference.map((r) => {
                      const urlRaw = (r.url ?? "").trim();
                      const label = r.label?.trim();
                      const ensureProtocol = (s: string) => (s.startsWith("http") ? s : `https://${s}`);

                      return (
                        <li key={r.id}>
                          {label && <span className="font-medium">{label}</span>}
                          <br />
                          <a
                            href={ensureProtocol(urlRaw)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0E4943] hover:underline"
                          >
                            {urlRaw}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Article Metadata */}
             
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}