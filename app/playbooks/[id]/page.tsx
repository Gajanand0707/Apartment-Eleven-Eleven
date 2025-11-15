"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PlaybookPage() {
  const { id } = useParams();
  const [playbook, setPlaybook] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaybook() {
      try {
        // Fetch all playbooks with populate and filter by documentId
        const res = await fetch(
          `https://proper-friendship-29e4bdb47f.strapiapp.com/api/playbooks?populate=*`
        );
        const json = await res.json();
        
        // Find the playbook by documentId or id - json.data is the array
        const playbookData = json.data?.find((item: any) => 
          item.documentId === id || item.id === Number(id)
        );
        
        setPlaybook(playbookData);
      } catch (err) {
        console.error("Error fetching playbook:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPlaybook();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!playbook) return <div className="text-center py-20">No playbook found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Thumbnail */}
      {playbook.thumbnail?.url && (
        <Image
          src={playbook.thumbnail.url}
          alt={playbook.thumbnail.alternativeText || "Thumbnail"}
          width={800}
          height={500}
          className="rounded-2xl object-cover"
        />
      )}

      {/* Title Image */}
      {playbook.title_image?.url && (
        <Image
          src={playbook.title_image.url}
          alt="Title image"
          width={800}
          height={400}
          className="rounded-2xl object-cover"
        />
      )}

      {/* Title & Introduction */}
      <h1 className="text-3xl font-bold">{playbook.title}</h1>
      <p className="text-lg text-gray-700">{playbook.introduction}</p>

      {/* Type Badge */}
      {playbook.type && (
        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          {playbook.type}
        </span>
      )}

      {/* Summary */}
      {playbook.summary && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Summary</h2>
          <p>{playbook.summary}</p>
        </div>
      )}
    </div>
  );
}
