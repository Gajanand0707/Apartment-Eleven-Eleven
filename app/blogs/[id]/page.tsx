"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import ArticleDetailLayout from "@/components/ArticleDetailLayout"

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
  article_reference?: Array<{
    id: number
    url?: string
    label?: string
  }>
  audio_title?: string
  audio?: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  thumbnail?: {
    url: string
    alternativeText: string | null
    formats?: any
    width?: number
    height?: number
  }
  title_image?: {
    url: string
    alternativeText: string | null
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
        formats?: any
        width?: number
        height?: number
      }
      video_title?: string
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
    <ArticleDetailLayout 
      article={article} 
      backLink="/blogs" 
      backLabel="Back to Blogs" 
    />
  )
}
