"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        // Fetch all deepdives with populate and filter by documentId
        const res = await fetch(
          `https://proper-friendship-29e4bdb47f.strapiapp.com/api/deepdives?populate=*`
        );
        const json = await res.json();
        
        // Find the deepdive by documentId or id
        const articleData = json.data?.find((item: any) => 
          item.documentId === id || item.id === Number(id)
        );
        
        setArticle(articleData);
      } catch (err) {
        console.error("Error fetching deepdive:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchArticle();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!article) return <div className="text-center py-20">No article found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Thumbnail */}
      {article.thumbnail && (
        <Image
          src={article.thumbnail.url}
          alt={article.thumbnail.alternativeText || "Thumbnail"}
          width={800}
          height={500}
          className="rounded-2xl object-cover"
        />
      )}

      {/* Title Image */}
      {article.title_image && (
        <Image
          src={article.title_image.url}
          alt="Title image"
          width={800}
          height={400}
          className="rounded-2xl object-cover"
        />
      )}

      {/* Title & Introduction */}
      <h1 className="text-3xl font-bold">{article.article_name}</h1>
      <p className="text-lg text-gray-700">{article.title_introduction}</p>

      {/* Headings and Subheadings */}
      {article.article_heading?.map((h: any) => (
        <div key={h.id} className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">{h.heading_title}</h2>

          {h.article_subheading?.map((sub: any) => (
            <div key={sub.id} className="pl-4 border-l-4 border-gray-300 mb-4">
              <h3 className="text-xl font-medium">{sub.title}</h3>
              <p className="text-gray-700">{sub.description}</p>

              {sub.image && (
                <Image
                  src={sub.image.url}
                  alt={sub.image.alternativeText || "Subheading image"}
                  width={700}
                  height={400}
                  className="rounded-xl mt-2"
                />
              )}

              {sub.video && (
                <video
                  controls
                  src={sub.video.url}
                  className="rounded-xl mt-2 w-full"
                />
              )}

              {sub.pdf && (
                <a
                  href={sub.pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline block mt-2"
                >
                  View PDF
                </a>
              )}
            </div>
          ))}

          {h.slogan && (
            <p className="italic text-gray-500 mt-2">{h.slogan}</p>
          )}
        </div>
      ))}

      {/* Summary, Conclusion, Reference */}
      {article.summary && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Summary</h2>
          <p>{article.summary}</p>
        </div>
      )}

      {article.conclusion_heading && (
        <div>
          <h2 className="text-xl font-semibold mt-6">{article.conclusion_heading}</h2>
          <p>{article.conclusion_description}</p>
        </div>
      )}
    </div>
  );
}
