"use client"

import Image from "next/image"
import Link from "next/link"

interface BlogCardHorizontalProps {
  blog: {
    id: string | number
    title: string
    description: string
    imageUrl: string
    readMoreUrl?: string
  }
  imagePosition?: "left" | "right"
}

export function BlogCardHorizontal({ blog, imagePosition = "left" }: BlogCardHorizontalProps) {
  const isImageLeft = imagePosition === "left"

  return (
    <div
      className={`flex items-stretch gap-6 rounded-3xl border-2 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow ${isImageLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Image */}
      <div className="w-2/5 relative flex-shrink-0">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="w-3/5 p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{blog.title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">{blog.description}</p>
        <Link href={blog.readMoreUrl || "#"} className="text-blue-500 font-medium text-sm hover:underline">
          Read more...
        </Link>
      </div>
    </div>
  )
}
