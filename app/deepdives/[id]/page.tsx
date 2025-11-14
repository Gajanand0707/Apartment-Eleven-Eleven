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
        const res = await fetch(
          `http://localhost:1337/api/articles/${id}?populate[thumbnail]=true&populate[title_image]=true&populate[heading][populate][deepdive_subheading][populate]=*`
        );
        const json = await res.json();
        setArticle(json.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchArticle();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!article) return <div className="text-center py-20">No article found</div>;

  const { attributes } = article;
  const data = article; // directly since Strapi v4 gives flat data

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Thumbnail */}
      {data.thumbnail && (
        <Image
          src={`http://localhost:1337${data.thumbnail.url}`}
          alt={data.thumbnail.alternativeText || "Thumbnail"}
          width={800}
          height={500}
          className="rounded-2xl object-cover"
        />
      )}

      {/* Title Image */}
      {data.title_image && (
        <Image
          src={`http://localhost:1337${data.title_image.url}`}
          alt="Title image"
          width={800}
          height={400}
          className="rounded-2xl object-cover"
        />
      )}

      {/* Title & Introduction */}
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-lg text-gray-700">{data.introduction}</p>

      {/* Headings and Subheadings */}
      {data.heading?.map((h) => (
        <div key={h.id} className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">{h.heading_title}</h2>

          {h.deepdive_subheading?.map((sub) => (
            <div key={sub.id} className="pl-4 border-l-4 border-gray-300 mb-4">
              <h3 className="text-xl font-medium">{sub.title}</h3>
              <p className="text-gray-700">{sub.description}</p>

              {sub.image && (
                <Image
                  src={`http://localhost:1337${sub.image.url}`}
                  alt={sub.image.alternativeText || "Subheading image"}
                  width={700}
                  height={400}
                  className="rounded-xl mt-2"
                />
              )}

              {sub.video && (
                <video
                  controls
                  src={`http://localhost:1337${sub.video.url}`}
                  className="rounded-xl mt-2 w-full"
                />
              )}
            </div>
          ))}

          {h.slogan && (
            <p className="italic text-gray-500 mt-2">{h.slogan}</p>
          )}
        </div>
      ))}

      {/* Summary, Conclusion, Reference */}
      {data.summary && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Summary</h2>
          <p>{data.summary}</p>
        </div>
      )}

      {data.conclusion_heading && (
        <div>
          <h2 className="text-xl font-semibold mt-6">{data.conclusion_heading}</h2>
          <p>{data.conclusion_description}</p>
        </div>
      )}

      {data.reference_label && data.reference_url && (
        <div>
          <a
            href={data.reference_url}
            target="_blank"
            className="text-blue-600 underline"
          >
            {data.reference_label}
          </a>
        </div>
      )}
    </div>
  );
}
