"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiShareAlt } from "react-icons/bi";

interface ArticleDetailLayoutProps {
  article: {
    id: number;
    documentId?: string;
    article_name?: string;
    title?: string;
    title_introduction?: string;
    introduction?: string;
    image_position: string | null;
    summary: string;
    conclusion_heading?: string;
    conclusion_description?: string;
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
    article_reference?: Array<{
      id: number;
      url?: string;
      label?: string;
    }>;
    audio_title?: string;
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
        video_title?: string;
        video: any | null;
        pdf: any | null;
      }>;
    }>;
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
        video_title?: string;
        video?: any | null;
        pdf?: any | null;
      }>;
      subheading?: Array<{
        id: number;
        title: string;
        description: string;
        image?: any;
        video_title?: string;
        video?: any | null;
        pdf?: any | null;
      }>;
    }>;
  };
  backLink: string;
  backLabel: string;
}

export default function ArticleDetailLayout({
  article,
  backLink,
  backLabel,
}: ArticleDetailLayoutProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const articleTitle = article.title ?? article.article_name ?? "";
  const articleIntroduction =
    article.introduction ?? article.title_introduction ?? "";
  const references = article.reference ?? article.article_reference ?? [];

  return (
    <div className="pt-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between bg-[#0E4943] w-full items-center px-4 py-6 md:py-6 gap-3 md:gap-4 relative z-10">
        <div className="flex-1 flex items-center justify-center text-center px-2 min-w-0 order-1 md:order-2 w-full md:w-auto">
          <h1 className="text-white text-2xl max-w-[630px] mx-auto text-center md:text-4xl font-goudy-old font-bold md:line-clamp-2">
            {articleTitle}
          </h1>
        </div>

        <div className="w-full md:w-auto flex flex-row items-center justify-center gap-3 md:gap-0 order-2 md:contents">
          <div className="flex-shrink-0 md:w-[200px] md:order-1">
            <button
              onClick={handleCopyLink}
              aria-label="Copy page URL"
              className="flex items-center gap-2 justify-center text-white"
            >
              <BiShareAlt size={45} color="white" className="" />
              <span className="text-white text-sm md:text-lg font-goudy-old font-semibold">
                {copied ? "Copied!" : ""}
              </span>
            </button>
          </div>

          <div className="flex-shrink-0 md:w-[200px] flex justify-end md:order-3">
            <button className="text-2xl px-16 md:text-3xl lg:text-4xl bg-[#FFAE00AB] py-1.5 md:py-1 md:px-6 md:mx-2 text-white text-center font-goudy rounded-full whitespace-nowrap ">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#D5C7B3]">
        <main className="max-w-7xl mx-auto px-8 py-12 text-lg md:text-xl">
          {/* Back Button */}
          <Link
            href={backLink}
            className="inline-block mb-8 hover:text-gray-600 font-goudy text-xl md:text-2xl transition-colors"
          >
            ← {backLabel}
          </Link>

          {/* Article Header */}
          <article className="bg-[#D5C7B3] border-gray-800 overflow-hidden">
            {/* Title Image */}
            {(() => {
              let srcCandidate: any = article.title_image ?? article.thumbnail ?? null;

              // Try to find a subheading image if top-level images are missing
              if (!srcCandidate && Array.isArray(article.heading)) {
                for (const h of article.heading) {
                  const hh: any = h;
                  const subs =
                    hh.subheading ??
                    hh.deepdive_subheading ??
                    hh.article_subheading ??
                    [];
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

              const resolveUrl = (c: any) => {
                if (!c) return null;
                if (typeof c === "string") return c;
                const fmt = c?.formats ?? c;
                const chosen =
                  fmt?.large?.url ??
                  fmt?.medium?.url ??
                  fmt?.small?.url ??
                  fmt?.thumbnail?.url ??
                  fmt?.url ??
                  c?.url;
                return chosen;
              };

              const url = resolveUrl(srcCandidate);
              if (!url) return null;
              const finalUrl = url.startsWith("http") ? url : url;
              const alt =
                srcCandidate?.alternativeText ??
                srcCandidate?.caption ??
                articleTitle;

              return (
                <div className="w-full mb-6">
                  <div className="w-full rounded-3xl overflow-hidden relative h-64 md:h-[796px]">
                    <Image
                      src={finalUrl}
                      alt={alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })()}

            <div className="p-2 text-justify md:text-left">
              {/* Article Title */}
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-goudy-old font-bold text-center  leading-tight tracking-tight mb-6 w-full">
                {articleTitle}
              </h1>

              <div className="mt-8 text-center mb-8 mx-auto">
                <p className="text-xl md:text-2xl text-center mx-auto">
                  {new Date(article.publishedAt).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Introduction */}
              {articleIntroduction && (
                <div className="mb-8">
                  <p className="text-[20px] md:text-2xl font-goudy leading-relaxed">
                    {articleIntroduction}
                  </p>
                </div>
              )}

              {/* Audio (placed after introduction) */}
              {(() => {
                const a: any = article.audio;
                let audioUrl: string | undefined;
                if (Array.isArray(a)) {
                  audioUrl =
                    a[0]?.url ??
                    a[0]?.data?.attributes?.url ??
                    a[0]?.data?.url;
                } else {
                  audioUrl = a?.url ?? a?.data?.attributes?.url ?? a?.data?.url;
                }
                if (!audioUrl) return null;
                return (
                  <div className="mb-6">
                    {article.audio_title && (
                      <h3 className="text-xl md:text-3xl font-goudy text-left mt-3">
                        {article.audio_title}
                      </h3>
                    )}
                    <audio controls src={audioUrl} className="w-full">
                      
                      Your browser does not support the audio element.
                    </audio>
                    
                  </div>
                );
              })()}

              {/* Article Headings and Subheadings */}
              {(() => {
                const headings =
                  (article.article_heading ?? article.heading) as
                    | any[]
                    | undefined;
                if (!headings || headings.length === 0) return null;
                return (
                  <div className="space-y-12">
                    {headings.map((heading, idx) => {
                      const subs =
                        heading.article_subheading ??
                        heading.deepdive_subheading ??
                        heading.subheading ??
                        [];
                      return (
                        <div key={heading.id} className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="text-4xl md:text-5xl font-bold font-goudy-old text-[#111] w-10 md:w-12 shrink-0 text-right">
                              {idx + 1}.
                            </div>
                            <h2 className="text-2xl md:text-4xl font-goudy-old text-left font-bold mb-2">
                              {heading.heading_title}
                            </h2>
                          </div>

                          {/* Subheadings */}
                          {subs && subs.length > 0 && (
                            <div className="space-y-8">
                              {subs.map((subheading: any) => (
                                <div key={subheading.id} className="space-y-4">
                                  <h3 className="text-2xl md:text-4xl font-goudy text-left">
                                    {subheading.title}
                                  </h3>
                                  <p className="text-[20px] md:text-2xl font-goudy leading-relaxed">
                                    {subheading.description}
                                  </p>

                                  {/* Subheading Image */}
                                  {(() => {
                                    const img = Array.isArray(subheading.image)
                                      ? subheading.image[0]
                                      : subheading.image;
                                    if (!img?.url) return null;
                                    return (
                                      <div className="relative w-full h-80 rounded-3xl overflow-hidden my-6">
                                        <Image
                                          src={img.url}
                                          alt={
                                            img.alternativeText ||
                                            subheading.title
                                          }
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    );
                                  })()}

                                  {/* Subheading Video */}
                                  {(() => {
                                    const v: any = subheading.video;
                                    const firstV = Array.isArray(v) ? v[0] : v;
                                    const vUrl =
                                      firstV?.url ??
                                      firstV?.data?.attributes?.url ??
                                      firstV?.data?.url;
                                    const vTitle = subheading?.video_title;
                                    if (!vUrl) return null;
                                    return (
                                      <div className="w-full my-6">
                                        <div className="relative w-full h-64 md:h-[720px] bg-black flex items-center justify-center rounded-2xl overflow-hidden">
                                          <video
                                            controls
                                            src={vUrl}
                                            className="w-full h-full object-contain"
                                          />
                                        </div>
                                        {vTitle ? (
                                          <div className="text-center mt-2 font-goudy-old text-2xl md:text-3xl lg:text-4xl"><span className="">~</span> {vTitle} <span className="">~</span></div>
                                        ) : null}
                                      </div>
                                    );
                                  })()}
                                </div>
                              ))}
                            </div>
                          )}

                          <div>
                            {heading.slogan && (
                              <p className="text-2xl md:text-4xl text-center font-semibold font-goudy-old max-w-[670px] justify-center mx-auto mb-4">
                                {heading.slogan}
                              </p>
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
                    const imgFormat =
                      thumb?.formats?.large ??
                      thumb?.formats?.medium ??
                      thumb?.formats?.small ??
                      thumb?.formats?.thumbnail ??
                      thumb;
                    const imgUrl = imgFormat?.url;
                    const imgW = imgFormat?.width;
                    const imgH = imgFormat?.height;
                    const hasImage = Boolean(imgUrl);
                    const isLeft = article.image_position === "left";

                    if (!hasImage) {
                      return (
                        <div className="flex items-center justify-center text-center py-6">
                          <p className="text-[20px] md:text-2xl leading-relaxed mx-auto font-goudy">
                            {article.summary}
                          </p>
                        </div>
                      );
                    }

                    const finalUrl = imgUrl!.startsWith("http")
                      ? imgUrl!
                      : imgUrl!;
                    const rowClass = isLeft
                      ? "md:flex-row-reverse"
                      : "md:flex-row";

                    return (
                      <div
                        className={`flex flex-col-reverse md:items-center md:gap-6 ${rowClass}`}
                      >
                        <div className="flex-1 col-span-2 flex items-center justify-center text-center py-6">
                          <p className="text-[20px] md:text-2xl font-goudy ">
                            {article.summary}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0 md:w-1/3 md:shrink-0">
                          <div className="w-full rounded-3xl overflow-hidden">
                            <Image
                              src={finalUrl}
                              alt={articleTitle}
                              width={imgW || 800}
                              height={imgH || 600}
                              className="object-cover w-full h-48 md:h-64 rounded-3xl"
                            />
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
                  <h1 className="text-4xl md:text-7xl text-center font-goudy-old font-bold">
                    Conclusion
                  </h1>
                  {article.conclusion.map((c) => (
                    <div key={c.id}>
                      {c.conclusion_heading && (
                        <h2 className="text-2xl md:text-4xl font-goudy-old font-bold text-left text-gray-900 mb-2">
                          {c.conclusion_heading}
                        </h2>
                      )}
                      {c.conclusion_description && (
                        <p className="text-[20px] md:text-2xl font-goudy leading-relaxed">
                          {c.conclusion_description}
                        </p>
                      )}
                      {c.slogan && (
                        <p className="text-2xl md:text-4xl text-center font-semibold font-goudy-old max-w-[670px] justify-center mx-auto mb-4">
                          {c.slogan}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* References */}
              {references && references.length > 0 && (
                <div className="mt-12 pt-8">
                  <ul className="mt-4 space-y-3  list-inside text-lg">
                    {references.map((r: any) => {
                      const urlRaw = (r?.url ?? "").trim();
                      const label = r?.label?.trim();
                      const ensureProtocol = (s: string) =>
                        s.startsWith("http") ? s : `https://${s}`;

                      return (
                        <li key={r.id}>
                          {label && <span className="font-medium text-2xl md:text-4xl font-goudy-old">{label}</span>}
                          <br />
                          <a
                            href={ensureProtocol(urlRaw)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl md:text-2xl hover:underline mt-2"
                          >
                            {urlRaw}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
