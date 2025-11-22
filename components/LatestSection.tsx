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
    <div className="space-y-6">
      {items[0] && <BlogCardHorizontal blog={items[0]} />}
      <div className="grid md:grid-cols-3 grid-col-2 gap-6">
        {items.slice(1, 4).map((item) => (
          <BlogCardGrid key={item.id} blog={item} />
        ))}
      </div>
    </div>
  )

  const renderPlaybooksLayout = () => (
    <div className="space-y-6">
      {items[0] && <BlogCardFeatured blog={items[0]} />}
      {items[1] && <BlogCardHorizontal blog={items[1]} />}
    </div>
  )

  const renderDeepDivesLayout = () => (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
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
    <section className="mb-16">
      <h2 className="text-4xl md:text-7xl font-['OPTIGoudy_Agency'] font-bold mb-8">{title}</h2>
        <div className="border border-b-2 w-[319px] mb-4 -mt-6"/>
      {renderLayout()}
      <div className="flex justify-center mt-8">
        <Link
          href={viewAllLink}
          className="px-8 py-2 border-2 bg-white border-gray-900 rounded-full text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors"
        >
          Load More
        </Link>
      </div>
    </section>
  )
}
