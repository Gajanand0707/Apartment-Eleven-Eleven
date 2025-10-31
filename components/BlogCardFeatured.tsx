"use client"

import Image from "next/image"
import Link from "next/link"

interface BlogCardFeaturedProps {
  blog: {
    id: string | number
    title: string
    description: string
    imageUrl: string
    readMoreUrl?: string
  }
}

export function BlogCardFeatured({ blog }: BlogCardFeaturedProps) {
  return (
    <div className="rounded-3xl border-2 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow">
      {/* Large Image */}
      <div className="relative w-full h-64">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">{blog.title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">{blog.description}</p>
        <Link href={blog.readMoreUrl || "#"} className="text-blue-500 font-medium hover:underline">
          Read more...
        </Link>
      </div>
    </div>
  )
}
