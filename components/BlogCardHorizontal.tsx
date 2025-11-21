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
      className={`flex flex-col items-stretch gap-0 rounded-[56px] border-2 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow min-h-[460px] md:flex-row md:gap-0 ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Image */}
      <div className="w-full h-[200px] md:w-2/5 md:h-auto relative shrink-0">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">{blog.title}</h3>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">{blog.description}</p>
        <Link href={blog.readMoreUrl || "#"} className="text-blue-500 font-medium text-sm md:text-base hover:underline">
          Read more...
        </Link>
      </div>
    </div>
  )
}
