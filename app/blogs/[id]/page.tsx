"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { BiShare, BiShareAlt } from "react-icons/bi"

interface Article {
  id: number
  documentId: string
  article_name: string
  title_introduction: string
  image_position: string | null
  summary: string
  conclusion_heading: string
  conclusion_description: string
  conclusion?: Array<{
    id: number
    conclusion_heading?: string
    conclusion_description?: string
    slogan?: string | null
  }>
  // article_reference may be returned by Strapi as an array of references with id, url and label
  article_reference?: Array<{
    id: number
    url?: string
    label?: string
  }> | null
  audio?: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  thumbnail?: {
    url: string
    alternativeText: string | null
    // optional formats and dimensions returned by Strapi
    formats?: any
    width?: number
    height?: number
  }
  title_image?: {
    url: string
    alternativeText: string | null
    // optional formats and dimensions returned by Strapi
    formats?: any
    width?: number
    height?: number
  }
  article_heading?: Array<{
    id: number
    heading_title: string
    slogan: string
    article_subheading: Array<{
      id: number
      title: string
      description: string
      image?: {
        url: string
        alternativeText: string | null
        // optional formats and dimensions returned by Strapi
        formats?: any
        width?: number
        height?: number
      }
      video: any | null
      pdf: any | null
    }>
  }>
}

export default function BlogDetail() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://proper-friendship-29e4bdb47f.strapiapp.com/api/articles/${params.id}?populate[thumbnail]=true&populate[audio]=true&populate[title_image]=true&populate[article_heading][populate][article_subheading][populate]=*&populate[conclusion]=true&populate[article_reference]=*`
        )
        if (!res.ok) throw new Error("Failed to fetch article")
        const data = await res.json()
        // Normalize Strapi shapes (attributes/data) similar to deepdives page
        const normalize = (item: any) => {
          if (!item) return item
          if (item.attributes) {
            const base = { id: item.id, ...item.attributes } as any

            const unwrap = (val: any) => {
              if (!val) return val
              if (val.data === null) return null
              const d = val.data
              if (Array.isArray(d)) return d.map((x: any) => (x.attributes ? { id: x.id, ...x.attributes } : x))
              return d.attributes ? { id: d.id, ...d.attributes } : d
            }

            base.article_reference = unwrap(base.article_reference) ?? base.article_reference
            base.audio = unwrap(base.audio) ?? base.audio
            base.thumbnail = unwrap(base.thumbnail) ?? base.thumbnail
            base.title_image = unwrap(base.title_image) ?? base.title_image
            base.article_heading = unwrap(base.article_heading) ?? base.article_heading
            base.conclusion = unwrap(base.conclusion) ?? base.conclusion

            // unwrap subheading media
            if (Array.isArray(base.article_heading)) {
              base.article_heading = base.article_heading.map((h: any) => {
                if (h.article_subheading && h.article_subheading.data) {
                  h.article_subheading = Array.isArray(h.article_subheading.data)
                    ? h.article_subheading.data.map((s: any) => (s.attributes ? { id: s.id, ...s.attributes } : s))
                    : (h.article_subheading.data.attributes ? { id: h.article_subheading.data.id, ...h.article_subheading.data.attributes } : h.article_subheading.data)
                }

                if (Array.isArray(h.article_subheading)) {
                  h.article_subheading = h.article_subheading.map((s: any) => {
                    if (s.image && s.image.data) s.image = s.image.data.attributes ? { id: s.image.data.id, ...s.image.data.attributes } : s.image.data
                    if (s.video && s.video.data) s.video = s.video.data.attributes ? { id: s.video.data.id, ...s.video.data.attributes } : s.video.data
                    if (s.pdf && s.pdf.data) s.pdf = s.pdf.data.attributes ? { id: s.pdf.data.id, ...s.pdf.data.attributes } : s.pdf.data
                    return s
                  })
                }

                return h
              })
            }

            return base
          }
          return item
        }

        const normalized = normalize(data.data)
        setArticle(normalized)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D5C7B3] flex items-center justify-center">
        <p className="text-2xl ">Loading...</p>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#D5C7B3] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-4">Error loading article</p>
          <Link href="/blogs" className="text-blue-600 hover:underline">
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  return (

    <div className="pt-20">
      <div className="flex flex-col md:flex-row justify-between bg-[#0E4943] w-full items-center px-4 py-6 md:py-6 gap-3 md:gap-4 relative z-10">

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
          className="flex items-center gap-2 justify-center flex-shrink-0 text-white"
        >
          <BiShareAlt size={45} color="white" className="" />
          <span className="text-white text-sm md:text-lg font-[Goudy_Old_Style] font-semibold">{copied ? 'Copied!' : ''}</span>
        </button>

        <div className="flex-1 flex items-center justify-center text-center min-w-0">
          <h1 className="text-white text-2xl max-w-[630px] mx-auto text-center md:text-4xl font-[OPTIGoudy_Agency] font-bold ">
            {article.article_name}
          </h1>
        </div>

        <div className="">
          <button className="text-2xl px-16  md:text-4xl bg-[#FFAE00AB] py-1.5  md:py-2 md:px-8 text-white text-center font-[Goudy_Old_Style] rounded-full whitespace-nowrap font-semibold">
            Subscribe
          </button>
        </div>

      </div>

      <div className="min-h-screen bg-[#D5C7B3]">
        <main className="max-w-7xl mx-auto px-8 py-12 text-lg md:text-xl">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-block mb-8  hover:text-gray-600 font-['Goudy_Bookletter_1911'] text-xl md:text-2xl transition-colors"
          >
            ← Back to Blogs
          </Link>

          {/* Article Header */}
          <article className="bg-[#D5C7B3]   border-gray-800 overflow-hidden ">
            {/* Title Image */}
            {(() => {
              const srcCandidate = article.title_image ?? article.thumbnail
              const fmt = srcCandidate?.formats?.large ?? srcCandidate?.formats?.medium ?? srcCandidate?.formats?.small ?? srcCandidate?.formats?.thumbnail ?? srcCandidate
              const url = fmt?.url
              const w = fmt?.width
              const h = fmt?.height
              if (!url) return null
              const finalUrl = url.startsWith('http') ? url : url
              return (
                <div className="w-full mb-6">
                  <div className="w-full rounded-3xl overflow-hidden relative h-64 md:h-[796px]">
                    <Image src={finalUrl} alt={srcCandidate?.alternativeText || article.article_name} fill className="object-cover" />
                  </div>
                </div>
              )
            })()}

            <div className="p-2 text-justify md:text-left">
              {/* Article Title */}
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-['OPTIGoudy_Agency'] font-bold md:text-left text-center leading-tight tracking-tight mb-6 w-full">
                {article.article_name}
              </h1>

              <div className="mt-8  text-center mb-8 mx-auto">
                <p className="text-xl md:text-2xl text-center mx-auto">
                  {new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                </p>
              </div>
              {/* Introduction */}
              <div className="mb-8">
                <p className="text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] leading-relaxed">
                  {article.title_introduction}
                </p>
              </div>

              {/* Audio (placed after introduction) */}
              {(() => {
                const a: any = article.audio
                // audio may be an array or single object
                const first = Array.isArray(a) ? a[0] : a
                const audioUrl = first?.url ?? first?.data?.attributes?.url ?? first?.data?.url
                if (!audioUrl) return null
                return (
                  <div className="mb-6">
                    <audio controls src={audioUrl} className="w-full md:h-[123px] ">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )
              })()}

              {/* Summary */}


              {/* Article Headings and Subheadings */}
              {article.article_heading && article.article_heading.length > 0 && (
                <div className="space-y-12">
                  {article.article_heading.map((heading, idx) => (
                    <div key={heading.id} className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl md:text-5xl font-bold text-[#111] w-10 md:w-12 flex-shrink-0 text-right">
                          {idx + 1}.
                        </div>
                        <h2 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] font-bold mb-2">
                          {heading.heading_title}
                        </h2>
                      </div>

                      {/* Subheadings */}
                      {heading.article_subheading && heading.article_subheading.length > 0 && (
                        <div className="space-y-8">
                          {heading.article_subheading.map((subheading) => (
                            <div key={subheading.id} className="space-y-4">
                              <h3 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] underline ">
                                {subheading.title}
                              </h3>
                              <p className="text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] leading-relaxed">
                                {subheading.description}
                              </p>

                              {/* Subheading Image */}
                              {subheading.image?.url && (
                                <div className="relative w-full h-80 rounded-3xl overflow-hidden my-6">
                                  <Image
                                    src={subheading.image.url}
                                    alt={subheading.image.alternativeText || subheading.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}

                              {/* Subheading Video (render in place if provided) */}
                              {(() => {
                                const v: any = subheading.video
                                const vUrl = v?.url ?? v?.data?.attributes?.url ?? v?.data?.url
                                if (!vUrl) return null
                                return (
                                  <div className="w-full my-6 rounded-2xl overflow-hidden flex justify-center">
                                    <div className="relative w-full h-64 md:h-[720px] bg-black flex items-center justify-center">
                                      <video controls src={vUrl} className="w-full h-full object-contain" />
                                    </div>
                                  </div>
                                )
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
                  ))}
                </div>
              )}

              {article.summary && (
                // Show summary text with optional thumbnail image side-by-side on larger screens
                <div className="mb-8 p-6 rounded-2xl">
                  {(() => {
                    const thumb: any = article.thumbnail
                    // prefer large -> medium -> small -> thumbnail -> direct url so full image is used when available
                    const imgFormat = thumb?.formats?.large ?? thumb?.formats?.medium ?? thumb?.formats?.small ?? thumb?.formats?.thumbnail ?? thumb
                    const imgUrl = imgFormat?.url
                    const imgW = imgFormat?.width
                    const imgH = imgFormat?.height
                    const hasImage = Boolean(imgUrl)
                    const isLeft = article.image_position === 'left'

                    if (!hasImage) {
                      return (
                        <div className="flex items-center justify-center text-center py-6">
                          <p className="text-lg leading-relaxed mx-auto">{article.summary}</p>
                        </div>
                      )
                    }

                    const finalUrl = imgUrl!.startsWith('http') ? imgUrl! : imgUrl!

                    // On md+ screens, layout is row; when image_position === 'left' we reverse the row so image appears left
                    const rowClass = isLeft ? 'md:flex-row-reverse' : 'md:flex-row'

                    return (
                      <div className={`flex flex-col-reverse md:items-center md:gap-6 ${rowClass}`}>
                        <div className="flex-1 col-span-2 flex items-center justify-center text-center py-6">
                          <p className="text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] underline">{article.summary}</p>
                        </div>

                        <div className="mt-4 md:mt-0 md:w-1/3 md:shrink-0">
                          <div className="w-full rounded-3xl overflow-hidden">
                            <Image src={finalUrl} alt={article.article_name} width={imgW || 800} height={imgH || 600} className="object-cover w-full h-48 md:h-64 rounded-3xl" />
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* Conclusion (Strapi returns an array) */}
              {article.conclusion && article.conclusion.length > 0 && (
                <div className="mt-12 pt-8  space-y-8">
                  <h1 className="text-4xl md:text-7xl text-center font-['OPTIGoudy_Agency'] font-bold">Conclusion</h1>
                  {article.conclusion.map((c) => (
                    <div key={c.id}>
                      {c.conclusion_heading && (
                        <h2 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] underline font-bold text-gray-900 mb-2">
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

              {/* References (article_reference) */}
              {article.article_reference && article.article_reference.length > 0 && (
                <div className="mt-12 pt-8">
                  {/* <h1 className="text-2xl md:text-4xl text-center font-['OPTIGoudy_Agency'] font-bold">References</h1> */}
                  <ul className="mt-4 space-y-3 list-disc list-inside text-lg">
                    {(article.article_reference as any[]).map((r) => {
                      const urlRaw = (r?.url ?? "").trim();
                      const label = r?.label?.trim();
                      const ensureProtocol = (s: string) => (s.startsWith("http") ? s : `https://${s}`);
                      return (
                        <li key={r.id}>
                          {label && <span className="font-medium">{label}</span>}
                          <br />
                          <a href={ensureProtocol(urlRaw)} target="_blank" rel="noopener noreferrer" className="text-[#0E4943] hover:underline">
                            {urlRaw}
                          </a>
                        </li>
                      )
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
  )
}
