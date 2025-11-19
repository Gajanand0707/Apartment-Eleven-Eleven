"use client";
import { useEffect, useState } from "react";
import library from "../../public/library.png";
import { TabNavigation } from "@/components/Tab";
import { LatestSection } from "@/components/LatestSection";
import type { Blog } from "@/types/blog";
import type { Tab } from "@/types/navigation";
import blogCard from "../../public/blogcard.png";

const TABS: Tab[] = [
  { id: "latest", label: "Latest", href: "/library" },
  { id: "blogs", label: "Our Blogs", href: "/blogs" },
  { id: "playbooks", label: "Playbooks", href: "/playbooks" },
  { id: "deepdives", label: "Deep Dives", href: "/deepdives" },
]

export default function Library() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [playbooks, setPlaybooks] = useState<Blog[]>([]);
  const [deepDives, setDeepDives] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch blogs/articles
        const blogsRes = await fetch("https://proper-friendship-29e4bdb47f.strapiapp.com/api/articles?populate[thumbnail]=true&populate[title_image]=true&populate[article_heading][populate][article_subheading][populate]=*");
        const blogsData = await blogsRes.json();
        const mappedBlogs: Blog[] = blogsData.data.map((article: any) => ({
          id: article.id,
          title: article.article_name || "Untitled Article",
          description: article.title_introduction || article.summary || "No description available",
          imageUrl: article.thumbnail?.url || blogCard.src,
          readMoreUrl: `/blogs/${article.documentId}`,
        }));

        // Fetch playbooks
        const playbooksRes = await fetch("https://proper-friendship-29e4bdb47f.strapiapp.com/api/playbooks?populate=*");
        const playbooksData = await playbooksRes.json();
        const mappedPlaybooks: Blog[] = playbooksData.data.map((playbook: any) => ({
          id: playbook.id,
          title: playbook.title || "Untitled Playbook",
          description: playbook.introduction || playbook.summary || "No description available",
          imageUrl: blogCard.src,
          readMoreUrl: `/playbooks/${playbook.documentId}`,
        }));

        // Fetch deep dives
        const deepDivesRes = await fetch("https://proper-friendship-29e4bdb47f.strapiapp.com/api/deepdives?populate=*");
        const deepDivesData = await deepDivesRes.json();
        const mappedDeepDives: Blog[] = deepDivesData.data.map((deepdive: any) => ({
          id: deepdive.id,
          title: deepdive.title || "Untitled Deep Dive",
          description: deepdive.introduction || deepdive.summary || "No description available",
          imageUrl: blogCard.src,
          readMoreUrl: `/deepdives/${deepdive.documentId}`,
        }));

        setBlogs(mappedBlogs.slice(0, 4)); // Max 4 for blogs layout (1 horizontal + 3 grid)
        setPlaybooks(mappedPlaybooks.slice(0, 2)); // Max 2 for playbooks layout (1 featured + 1 horizontal)
        setDeepDives(mappedDeepDives.slice(0, 3)); // Max 3 for deepdives layout (3 grid)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching library data:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="bg-[#D5C7B3]">
      <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden">
        <img
          src={library.src}
          alt="Deepdives"
          className="w-full h-full object-cover"
        />

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display'] font-bold text-center">
            Library
          </h1>
        </div>

        {/* The feathered overlay ON TOP of the image */}

        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-12 md:h-16
                        bg-gradient-to-b from-transparent to-[#D5C7B3]" />

      </div>
      <TabNavigation tabs={TABS} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {loading ? (
          <div className="text-center py-8 md:py-12 text-base md:text-lg">Loading...</div>
        ) : (
          <>
            <LatestSection 
              title="Our Blogs" 
              items={blogs} 
              sectionType="blogs" 
              layout="blogs" 
              viewAllLink="/blogs" 
            />

            <LatestSection
              title="Playbooks"
              items={playbooks}
              sectionType="playbooks"
              layout="playbooks"
              viewAllLink="/playbooks"
            />

            <LatestSection
              title="Deep Dives"
              items={deepDives}
              sectionType="deepdives"
              layout="deepdives"
              viewAllLink="/deepdives"
            />
          </>
        )}
      </div>

    </div>
  );
}




