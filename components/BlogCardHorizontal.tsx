"use client"

import Image from "next/image"
import Link from "next/link"

interface BlogCardHorizontalProps {
  blog: {
    id: string | number
    title: string
    subtitle?: string
    description: string
    imageUrl: string
    readMoreUrl?: string
  }
  imagePosition?: "left" | "right"
}

export function BlogCardHorizontal({ blog, imagePosition = "left" }: BlogCardHorizontalProps) {
  const isImageLeft = imagePosition === "left"

  return (
    <Link href={blog.readMoreUrl || "#"}>
      <div
        className={`flex flex-col rounded-[56px] border-2 my-8 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow min-h-[450px] md:flex-row md:gap-0 cursor-pointer ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      >
        {/* Image */}
        <div className="w-full h-[200px] md:w-2/5 md:h-auto relative shrink-0 rounded-none">
          <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-center md:justify-between">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-['Goudy Old Style'] font-bold text-black mb-3">{blog.title}</h3>
          {blog.subtitle && (
            <p className="text-xl md:text-2xl font-['Goudy Old Style'] text-black font-bold mb-3 line-clamp-2">
              {blog.subtitle}
            </p>
          )}
          <div>
          <p className=" text-[20px] md:text-2xl font-['Goudy Bookletter 1911'] leading-relaxed mb-4 line-clamp-3">{blog.description}</p>
          <span
            className="block text-blue-500 font-['Goudy Bookletter 1911'] text-xl md:text-2xl hover:underline text-right ml-auto pointer-events-none"
          >
            Read more...
          </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
