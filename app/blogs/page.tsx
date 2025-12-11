
"use client"
import ourblogs from "../../public/ourblogs.png";
import { TabNavigation } from "@/components/Tab"
import { BlogsList } from "@/components/BlogsList"
import type { Tab } from "@/types/navigation"
import type { Blog } from "@/types/blog"
import blogcard from "../../public/blogcard.png";
import { useEffect, useState } from "react";

const TABS: Tab[] = [
  { id: "latest", label: "Latest", href: "/library" },
  { id: "blogs", label: "Our Blogs", href: "/blogs" },
  { id: "playbooks", label: "Playbooks", href: "/playbooks" },
  { id: "deepdives", label: "Deep Dives", href: "/deepdives" },
]

const SAMPLE_BLOGS: Blog[] = [
  {
    id: 1,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    imageUrl: ourblogs.src,
    variant: "horizontal-left",
  },
  {
    id: 2,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: ourblogs.src,
    variant: "horizontal-right",
  },
  {
    id: 3,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: ourblogs.src,
    variant: "grid",
  },
  {
    id: 4,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: ourblogs.src,
    variant: "grid",
  },
  {
    id: 5,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    imageUrl:   ourblogs.src,
    variant: "featured",
  },
  {
    id: 6,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: ourblogs.src,
    variant: "grid",
  },
  {
    id: 7,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: ourblogs.src,
    variant: "grid",
  },
  {
    id: 8,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    imageUrl: ourblogs.src,
    variant: "horizontal-left",
  },
]

export default function OurBlogs() {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://proper-friendship-29e4bdb47f.strapiapp.com/api/articles?populate[thumbnail]=true&populate[title_image]=true&populate[article_heading][populate][article_subheading][populate]=*");
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();

        // Map API response to Blog interface
        const mappedBlogs: Blog[] = data.data.map((article: any) => ({
          id: article.id,
          title: article.article_name || "Untitled Article",
          subtitle: article.article_heading?.article_subheading?.article_subheading || article.summary || "",
          description: article.title_introduction || article.summary || "No description available",
          imageUrl: article.thumbnail?.url || blogcard.src,
          readMoreUrl: `/blogs/${article.documentId}`,
        }));

        setBlogs(mappedBlogs);
      } catch (error) {
        console.error('Blogs - fetch error:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <main className="min-h-screen bg-[#D5C7B3]">


  <div className="relative w-full h-screen overflow-hidden">
          <img
           src={ourblogs.src} alt="Our Blogs" className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4 pb-20">
            <h1 className="text-white text-4xl md:text-7xl font-['OPTIGoudy_Agency'] font-bold text-center">
              Our Blogs
            </h1>
          </div>
          
          {/* The feathered overlay ON TOP of the image */}
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 md:h-32
                        bg-gradient-to-b from-transparent to-[#D5C7B3]" />
          
          {/* Tab Navigation positioned at bottom */}
          <div className="absolute bottom-12 left-0 right-0 ">
            <TabNavigation tabs={TABS} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 md:py-4 mt-8">
          <BlogsList blogs={blogs} />
        </div>
      </main>
    </div>
  )
}
