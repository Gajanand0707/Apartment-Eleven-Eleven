"use client"

import Link from "next/link"
import type { Blog } from "@/types/blog"
import { BlogCardHorizontal } from "./BlogCardHorizontal"
import { BlogCardGrid } from "./BlogCardGrid"
import { BlogCardFeatured } from "./BlogCardFeatured"

interface LatestSectionProps {
  title: string
  items: Blog[]
  sectionType: "blogs" | "playbooks" | "deepdives"
  layout: "blogs" | "playbooks" | "deepdives"
  viewAllLink: string
}

export function LatestSection({ title, items, sectionType, layout, viewAllLink }: LatestSectionProps) {
  const renderBlogsLayout = () => (
    <div className="space-y-8 md:space-y-6 mt-8 md:mt-16">
      {items[0] && <BlogCardHorizontal blog={items[0]} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14 md:py-12">
        {items.slice(1, 4).map((item) => (
          <BlogCardGrid key={item.id} blog={item} />
        ))}
      </div>
    </div>
  )

  const renderPlaybooksLayout = () => (
    <div className="space-y-8 md:space-y-6 mt-8 md:mt-16">
      {items[0] && <BlogCardFeatured blog={items[0]} />}
      {items[1] && <BlogCardHorizontal blog={items[1]} />}
    </div>
  )

  const renderDeepDivesLayout = () => (
    <div className="mt-8 md:mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
        {items.slice(0, 3).map((item) => (
          <BlogCardGrid key={item.id} blog={item} />
        ))}
      </div>
    </div>
  )

  const renderLayout = () => {
    switch (layout) {
      case "blogs":
        return renderBlogsLayout()
      case "playbooks":
        return renderPlaybooksLayout()
      case "deepdives":
        return renderDeepDivesLayout()
      default:
        return null
    }
  }

  return (
    <section className="pb-8">
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-goudy-agency font-bold mb-8 mt-8">{title}</h2>
        {/* <div className="border border-b-2 w-[319px] mb-10 -mt-6"/> */}
      {renderLayout()}
      <div className="flex justify-center mt-8 md:mt-10">
        <Link
          href={viewAllLink}
          className="px-8 py-4  border-2  text-2xl md:text-4xl border-gray-900 rounded-3xl font-goudy-old font-bold md:w-[355px] text-center md:h-[70px] hover:bg-gray-900 bg-white hover:text-white transition-colors flex items-center justify-center"
        >
          Load More
        </Link>
      </div>
    </section>
  )
}
