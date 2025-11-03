"use client";
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


const SAMPLE_BLOGS: Blog[] = [
  {
    id: 1,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    imageUrl: blogCard.src,
    variant: "horizontal-left",
  },
  {
    id: 2,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: blogCard.src,
    variant: "grid",
  },
  {
    id: 3,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
  imageUrl: blogCard.src,
    variant: "grid",
  },
  {
    id: 4,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: blogCard.src,
    variant: "grid",
  },
]

const SAMPLE_PLAYBOOKS: Blog[] = [
  {
    id: 1,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum. A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    imageUrl: blogCard.src,
    variant: "featured",
  },
  {
    id: 2,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: blogCard.src,
    variant: "horizontal-left",
  },
]

const SAMPLE_DEEP_DIVES: Blog[] = [
  {
    id: 1,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
     imageUrl: blogCard.src,
    variant: "grid",
  },
  {
    id: 2,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
  imageUrl: blogCard.src,
    variant: "grid",
  },
  {
    id: 3,
    title: "Building in Public for Indian Startups",
    description: "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum",
    imageUrl: blogCard.src,
    variant: "grid",
  },
]

export default function Library() {

  return (
    <div className=" bg-[#D5C7B3] ">
      <div className="relative w-full h-5/12 md:h-[420px] overflow-hidden">
        <img
          src={library.src}
          alt="Deepdives"
          className="w-full h-full object-cover"
        />

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-8xl font-['Playfair_Display'] font-bold">
            Library
          </h1>
        </div>

        {/* The feathered overlay ON TOP of the image */}

        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-16
                        bg-gradient-to-b from-transparent to-[#D5C7B3]" />

      </div>
      <TabNavigation tabs={TABS} />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <LatestSection title="Our Blogs" items={SAMPLE_BLOGS} sectionType="blogs" layout="blogs" viewAllLink="/blogs" />

        <LatestSection
          title="Playbooks"
          items={SAMPLE_PLAYBOOKS}
          sectionType="playbooks"
          layout="playbooks"
          viewAllLink="/playbooks"
        />

        <LatestSection
          title="Deep Dives"
          items={SAMPLE_DEEP_DIVES}
          sectionType="deepdives"
          layout="deepdives"
          viewAllLink="/deep-dives"
        />
      </div>

    </div>
  );
}




