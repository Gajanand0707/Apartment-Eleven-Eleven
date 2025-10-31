"use client"

import Image from "next/image"
import Link from "next/link"

interface BlogCardGridProps {
  blog: {
    id: string | number
    title: string
    description: string
    imageUrl: string
    readMoreUrl?: string
  }
}

export function BlogCardGrid({ blog }: BlogCardGridProps) {
  return (
    <div className="rounded-2xl border-2 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col">
      {/* Image */}
      <div className="relative w-full h-40">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{blog.title}</h3>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-3">{blog.description}</p>
        </div>
        <Link href={blog.readMoreUrl || "#"} className="text-blue-500 font-medium text-sm hover:underline">
          Read more...
        </Link>
      </div>
    </div>
  )
}
