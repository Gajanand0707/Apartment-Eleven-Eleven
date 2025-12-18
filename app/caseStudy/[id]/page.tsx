"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ArticleDetailLayout from "@/components/ArticleDetailLayout";

interface DeepDive {
  id: number;
  documentId: string;
  article_name?: string;
  title_introduction?: string;
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
    subheading?: Array<{
      id: number;
      title: string;
      description: string;
      image?: any;
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
          <Link href="/caseStudy" className="text-blue-600 hover:underline">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ArticleDetailLayout 
      article={article} 
      backLink="/caseStudy" 
      backLabel="Back to Case Studies" 
    />
  );
}