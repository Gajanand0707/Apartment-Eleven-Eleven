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
  audio?: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  thumbnail?: {
    url: string
    alternativeText: string | null
  }
  title_image?: {
    url: string
    alternativeText: string | null
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

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://proper-friendship-29e4bdb47f.strapiapp.com/api/articles/${params.id}?populate[thumbnail]=true&populate[title_image]=true&populate[article_heading][populate][article_subheading][populate]&populate[conclusion]=*`
        )
        if (!res.ok) throw new Error("Failed to fetch article")
        const data = await res.json()
        setArticle(data.data)
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

    <div>
      <div className="flex justify-between bg-[#0E4943] w-full min-h-20 items-center px-4 flex-wrap">

  <div className="flex items-center gap-2">
    <BiShareAlt size={28} color="white" className="" />
    <h1 className="text-white text-xl font-semibold">Share</h1>
  </div>

  <div className="w-full md:w-auto text-center my-2 md:my-0">
    <h1 className="text-white text-2xl md:text-3xl font-bold">
      {article.article_name}
    </h1>
  </div>

  <div className="flex justify-center">
    <button className="text-lg md:text-2xl bg-[#FFAE00] py-2 px-5 text-white rounded-full">
      Subscribe
    </button>
  </div>

</div>

      <div className="min-h-screen bg-[#D5C7B3]">
        <main className="max-w-7xl mx-auto px-8 py-12 text-lg md:text-xl">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-block mb-8  hover:text-gray-600 font-medium"
          >
            ← Back to Blogs
          </Link>

          {/* Article Header */}
          <article className="bg-[#D5C7B3]   border-gray-800 overflow-hidden shadow-lg">
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
                  <div className="w-full rounded-3xl overflow-hidden relative h-64 md:h-[650px]">
                    <Image src={finalUrl} alt={srcCandidate?.alternativeText || article.article_name} fill className="object-cover" />
                  </div>
                </div>
              )
            })()}

            <div className="p-12">
              {/* Article Title */}
              <h1 className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-center  mb-6">
                {article.article_name}
              </h1>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-xl md:text-2xl leading-relaxed">
                  {article.title_introduction}
                </p>
              </div>

                    {/* Audio (placed after introduction) */}
                    {(() => {
                      const a: any = article.audio
                      const audioUrl = a?.url ?? a?.data?.attributes?.url
                      if (!audioUrl) return null
                      return (
                        <div className="mb-6">
                          <audio controls src={audioUrl} className="w-full">
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
                        <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold mb-2">
                          {heading.heading_title}
                        </h2>
                      </div>

                      {/* Subheadings */}
                      {heading.article_subheading && heading.article_subheading.length > 0 && (
                        <div className="space-y-8">
                          {heading.article_subheading.map((subheading) => (
                            <div key={subheading.id} className="space-y-4">
                              <h3 className="text-3xl md:text-4xl font-semibold ">
                                {subheading.title}
                              </h3>
                              <p className="text-xl md:text-2xl leading-relaxed">
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
                                const vUrl = v?.url ?? v?.data?.attributes?.url
                                if (!vUrl) return null
                                return (
                                  <div className="w-full my-6 rounded-2xl overflow-hidden">
                                    <div className="relative w-full h-64 bg-black">
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
                          <p className="text-5xl md:text-6xl text-center font-semibold mb-4">{heading.slogan}</p>
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
                      <div className={`flex flex-col md:items-center md:gap-6 ${rowClass}`}>
                        <div className="flex-1 col-span-2 flex items-center justify-center text-center py-6">
                          <p className="text-xl md:text-2xl leading-relaxed">{article.summary}</p>
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
                  <h1 className="text-4xl md:text-5xl text-center font-bold">Conclusion</h1>
                  {article.conclusion.map((c) => (
                    <div key={c.id}>
                      {c.conclusion_heading && (
                        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-2">
                          {c.conclusion_heading}
                        </h2>
                      )}
                      {c.conclusion_description && (
                        <p className="text-xl md:text-2xl  leading-relaxed">
                          {c.conclusion_description}
                        </p>
                      )}
                      {c.slogan && (
                        <p className="text-4xl md:text-5xl text-center font-semibold mt-2">{c.slogan}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Article Metadata */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
                <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}
