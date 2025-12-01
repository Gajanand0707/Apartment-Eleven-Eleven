"use client"

import { ArticlesList } from "@/components/Articles-list"
import type { Article } from "@/types/article"
import DeepDiveScroll from "@/components/DeepDiveScroll";
import deepdive from "../../public/deepdive.png";
import { TabNavigation } from "@/components/Tab";
import { useState, useEffect } from "react";

interface Tab {
    id: string;
    label: string;
    href: string;
}

const TABS: Tab[] = [
    { id: "latest", label: "Latest", href: "/library" },
    { id: "blogs", label: "Our Blogs", href: "/blogs" },
    { id: "playbooks", label: "Playbooks", href: "/playbooks" },
    { id: "deepdives", label: "Deep Dives", href: "/deepdives" },
]

export default function DeepDives() {

    const [blogs, setBlogs] = useState<Article[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("https://proper-friendship-29e4bdb47f.strapiapp.com/api/deepdives?populate=*");
                if (!res.ok) throw new Error("Failed to fetch deepdives");
                const json = await res.json();

                // Map Strapi entries to the app Article shape
                const mapped = (json.data || []).map((entry: any) => {
                    return {
                        id: entry.id,
                        title: entry.title ?? '',
                        subtitle: entry.introduction ?? '',
                        description: entry.summary ?? '',
                        imageUrl: entry.thumbnail?.url || '',
                        readMoreUrl: `/deepdives/${entry.documentId}`,
                        date: entry.publishedAt || entry.createdAt,
                    }
                })

                setBlogs(mapped)
            } catch (error) {
                console.error("Error fetching deepdives:", error);
            }
        }
        fetchBlogs();
    }, []);
    const handleLoadMore = () => {
        console.log("Load more articles clicked")
    }
    return (
        <div className="bg-[#D5C7B3]">
            <div className="relative w-full h-5/12 md:h-[420px] overflow-hidden">
                <img
                    src={deepdive.src}
                    alt="Deepdives"
                    className="w-full h-full object-cover"
                />

                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-5xl md:text-8xl font-['Playfair_Display'] font-bold">
                        Deepdives
                    </h1>
                </div>

                {/* The feathered overlay ON TOP of the image */}

                <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-28
                        bg-gradient-to-b from-transparent to-[#D5C7B3]" />

            </div>


            <TabNavigation tabs={TABS} />
            <DeepDiveScroll
                direction="right"
                items={blogs.map(blog => ({
                    id: blog.id,
                    title: blog.title,
                    description: (blog.subtitle || blog.description).slice(0, 50) + '...',
                    image: blog.imageUrl,
                }))}
            />
            <DeepDiveScroll
                direction="left"
                items={blogs.map(blog => ({
                    id: blog.id,
                    title: blog.title,
                    description: (blog.subtitle || blog.description).slice(0, 50) + '...',
                    image: blog.imageUrl,
                }))}
            />
            <main className="min-h-screen bg-[#D5C7B3]">
                <div className="max-w-7xl mx-auto">
                    <ArticlesList articles={blogs} onLoadMore={handleLoadMore} />
                </div>
            </main>
        </div>
    );
}



