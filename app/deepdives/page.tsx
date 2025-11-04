"use client"

import { ArticlesList } from "@/components/Articles-list"
import type { Article } from "@/types/article"
import DeepDiveScroll from "@/components/DeepDiveScroll";
import deepdive from "../../public/deepdive.png";
import case1 from "../../public/case1.png";
import { TabNavigation } from "@/components/Tab";

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
const SAMPLE_ARTICLES: Article[] = [
    {
        id: 1,
        title: "Building in Public for Indian Startups",
        subtitle: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
        description:
            "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
        imageUrl: case1.src,
        readMoreUrl: "/article/1",
    },
    {
        id: 2,
        title: "Building in Public for Indian Startups",
        subtitle: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
        description:
            "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
        imageUrl: case1.src,
        readMoreUrl: "/article/2",
    },
    {
        id: 3,
        title: "Building in Public for Indian Startups",
        subtitle: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
        description:
            "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
        imageUrl: case1.src,
        readMoreUrl: "/article/3",
    },
    {
        id: 4,
        title: "Building in Public for Indian Startups",
        subtitle: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
        description:
            "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
        imageUrl: case1.src,
        readMoreUrl: "/article/4",
    },
    {
        id: 5,
        title: "Building in Public for Indian Startups",
        subtitle: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
        description:
            "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
        imageUrl: case1.src,
        readMoreUrl: "/article/5",
    },
    {
        id: 6,
        title: "Building in Public for Indian Startups",
        subtitle: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
        description:
            "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
        imageUrl: case1.src,
        readMoreUrl: "/article/6",
    },
]


export default function DeepDives() {

    const handleLoadMore = () => {
        console.log("Load more articles clicked")
        // Add your API call here later
    }
    return (
        // Make sure the next section background matches this color
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
            <DeepDiveScroll direction="right" />
            <DeepDiveScroll direction="left" />
            <main className="min-h-screen bg-[#D5C7B3]">
                <div className="py-12">
                    <ArticlesList articles={SAMPLE_ARTICLES} onLoadMore={handleLoadMore} />
                </div>
            </main>
        </div>
    );
}



