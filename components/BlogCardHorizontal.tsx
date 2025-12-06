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
      className={`flex flex-col  rounded-[56px] border-2 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow min-h-[450px] md:flex-row md:gap-0 ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Image */}
      <div className="w-full h-[200px] md:w-2/5 md:h-auto relative shrink-0">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-center">
        <h3 className="text-2xl md:text-4xl font-['Goudy_Old_Style'] font-bold text-gray-900 underline mb-3">{blog.title}</h3>
        <p className=" text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] leading-relaxed mb-4 line-clamp-3">{blog.description}</p>
        <Link href={blog.readMoreUrl || "#"} className="text-blue-500 font-['Goudy_Bookletter_1911'] text-xl md:text-2xl hover:underline text-right">
          Read more...
        </Link>
      </div>
    </div>
  )
}
