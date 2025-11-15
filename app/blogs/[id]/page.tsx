"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface Article {
  id: number
  documentId: string
  article_name: string
  title_introduction: string
  image_position: string | null
  summary: string
  conclusion_heading: string
  conclusion_description: string
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
          `https://proper-friendship-29e4bdb47f.strapiapp.com/api/articles/${params.id}?populate[thumbnail]=true&populate[title_image]=true&populate[article_heading][populate][article_subheading][populate]=*`
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
        <p className="text-2xl text-gray-800">Loading...</p>
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
    <div className="min-h-screen bg-[#D5C7B3]">
      <main className="max-w-5xl mx-auto px-8 py-12">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-block mb-8 text-gray-800 hover:text-gray-600 font-medium"
        >
          ← Back to Blogs
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-3xl border-2 border-gray-800 overflow-hidden shadow-lg">
          {/* Title Image */}
          {(article.title_image?.url || article.thumbnail?.url) && (
            <div className="relative w-full h-96">
              <Image
                src={article.title_image?.url || article.thumbnail?.url || ""}
                alt={article.title_image?.alternativeText || article.article_name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-12">
            {/* Article Title */}
            <h1 className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">
              {article.article_name}
            </h1>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-xl text-gray-700 leading-relaxed">
                {article.title_introduction}
              </p>
            </div>

            {/* Summary */}
            {article.summary && (
              <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            )}

            {/* Article Headings and Subheadings */}
            {article.article_heading && article.article_heading.length > 0 && (
              <div className="space-y-12">
                {article.article_heading.map((heading) => (
                  <div key={heading.id} className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-2">
                        {heading.heading_title}
                      </h2>
                      {heading.slogan && (
                        <p className="text-lg text-gray-600 italic">{heading.slogan}</p>
                      )}
                    </div>

                    {/* Subheadings */}
                    {heading.article_subheading && heading.article_subheading.length > 0 && (
                      <div className="space-y-8">
                        {heading.article_subheading.map((subheading) => (
                          <div key={subheading.id} className="space-y-4">
                            <h3 className="text-2xl font-semibold text-gray-800">
                              {subheading.title}
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                              {subheading.description}
                            </p>

                            {/* Subheading Image */}
                            {subheading.image?.url && (
                              <div className="relative w-full h-80 rounded-2xl overflow-hidden my-6">
                                <Image
                                  src={subheading.image.url}
                                  alt={subheading.image.alternativeText || subheading.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Conclusion */}
            {article.conclusion_heading && (
              <div className="mt-12 pt-8 border-t-2 border-gray-200">
                <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
                  {article.conclusion_heading}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {article.conclusion_description}
                </p>
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
  )
}
