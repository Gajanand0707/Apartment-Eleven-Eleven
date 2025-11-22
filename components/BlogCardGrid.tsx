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
  <div className="rounded-[56px] border-2 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col min-h-[520px]">
      {/* Image */}
      <div className="relative w-full h-80">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-10 flex flex-col justify-between grow">
        <div>
          <h3 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] font-bold text-gray-900 mb-2">{blog.title}</h3>
          <p className=" text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] leading-relaxed line-clamp-2 mb-3">{blog.description}</p>
        </div>
        <Link href={blog.readMoreUrl || "#"} className="text-blue-500 font-medium text-base hover:underline">
          Read more...
        </Link>
      </div>
    </div>
  )
}
